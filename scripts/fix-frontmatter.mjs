#!/usr/bin/env node
/**
 * DockStart Documentation —— front matter 转义损坏修复
 *
 * 背景
 * ----
 * 某些 Markdown「文档编辑器」（例如把 .md 关联为默认程序的 Word 类/富文本编辑器）
 * 在【打开】文件时就会把 Markdown 解析成内部文档模型，并在自动保存时重新序列化
 * 覆盖原文件。即使使用者没有做任何编辑，文件也会被改写。
 *
 * 这类改写对正文通常是无损的，但会破坏 YAML front matter：
 *
 *   正常                        被改写后
 *   ---                         \---␣␣        ← 分隔符被转义 + 行尾多出 2 个空格
 *   title: "..."                title: "..."␣␣
 *   sidebar_position: 1         sidebar_position: 1␣␣
 *   ---                         \---          ← 分隔符被转义
 *
 * （另外 HTML 注释 <!-- ... --> 通常会被整行丢弃，本脚本无法还原。）
 *
 * 本脚本做什么
 * ------------
 *   1. 扫描 docs/ 下所有 .md
 *   2. 只修复 front matter 区块：把 `\---` 还原成 `---`，去掉该区块内的行尾空白
 *   3. 正文一个字节都不动（正文里的行尾两个空格是合法的 Markdown 硬换行，必须保留）
 *   4. 报告无法自动修复的情况（缺 front matter、front matter 之外出现 `\---` 等）
 *
 * 用法
 * ----
 *   node scripts/fix-frontmatter.mjs              # 就地修复
 *   node scripts/fix-frontmatter.mjs --dry-run    # 只报告，不写盘
 *   node scripts/fix-frontmatter.mjs --root <目录> # 指定项目根目录（默认脚本的上两级）
 *   node scripts/fix-frontmatter.mjs --quiet      # 只输出汇总
 *
 * 退出码：0 = 无需修复或已全部修复；1 = 存在需要人工处理的问题或写盘失败。
 * 本脚本是幂等的，重复运行不会产生额外改动。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);

const DRY_RUN = argv.includes('--dry-run');
const QUIET = argv.includes('--quiet');
const rootFlag = argv.indexOf('--root');
const ROOT = rootFlag >= 0 && argv[rootFlag + 1]
  ? path.resolve(argv[rootFlag + 1])
  : path.resolve(HERE, '..');
const DOCS = path.join(ROOT, 'docs');

/** front matter 的分隔符行：`---` 或损坏后的 `\---`，允许行尾空白。 */
const DELIMITER = /^\\?---[ \t]*$/;
/** 被转义的分隔符：以 `\---` 开头。 */
const ESCAPED_DELIMITER = /^\\---/;

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

/**
 * 识别文件开头的 front matter 区块（无论是否被转义）。
 * @param {string[]} lines - 已按 \n 切分的文件行
 * @returns {{end: number} | null} 结束分隔符的行号；无法识别时返回 null
 */
function findFrontMatter(lines) {
  if (lines.length === 0 || !DELIMITER.test(lines[0])) return null;
  for (let i = 1; i < lines.length; i += 1) {
    if (DELIMITER.test(lines[i])) return { end: i };
  }
  return null;
}

/**
 * 修复单个文件的 front matter 区块。
 * @param {string} text - 原始文件内容
 * @returns {{status: string, text: string}} status ∈ changed|clean|no-front-matter|body-escaped
 */
function repairText(text) {
  const lines = text.split('\n');
  const fm = findFrontMatter(lines);

  if (!fm) {
    return { status: 'no-front-matter', text };
  }

  const out = lines.slice();
  let touched = false;

  // 只规范 front matter 区块（第 0 行 ~ 第 end 行），正文完全不碰。
  for (let i = 0; i <= fm.end; i += 1) {
    const before = out[i];
    out[i] = before.replace(ESCAPED_DELIMITER, '---').replace(/[ \t]+$/, '');
    if (out[i] !== before) touched = true;
  }

  // front matter 之外（正文）若出现 `\---`，只报告不修改。
  const bodyEscaped = out
    .slice(fm.end + 1)
    .some((line) => ESCAPED_DELIMITER.test(line));

  const next = out.join('\n');
  if (!touched) return { status: bodyEscaped ? 'body-escaped' : 'clean', text };
  return { status: bodyEscaped ? 'changed+body-escaped' : 'changed', text: next };
}

/** 递归收集 docs/ 下的全部 .md 文件。 */
function collectMarkdown(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectMarkdown(full, acc);
    else if (/\.mdx?$/i.test(entry.name)) acc.push(full);
  }
  return acc;
}

/* ------------------------------- main ------------------------------- */

if (!fs.existsSync(DOCS)) {
  console.error(`[错误] 找不到 docs 目录：${DOCS}`);
  process.exit(1);
}

const files = collectMarkdown(DOCS).sort();
const changed = [];
const noFrontMatter = [];
const bodyEscaped = [];
const failed = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const { status, text } = repairText(original);

  if (status === 'no-front-matter') {
    noFrontMatter.push(file);
    continue;
  }
  if (status.includes('body-escaped')) bodyEscaped.push(file);
  if (status.startsWith('changed')) {
    changed.push(file);
    if (!DRY_RUN) {
      try {
        fs.writeFileSync(file, text, 'utf8');
      } catch (error) {
        failed.push(`${rel(file)}: ${error.message}`);
      }
    }
  }
}

/* ------------------------------- 输出 ------------------------------- */

if (!QUIET) {
  console.log('DockStart Documentation —— front matter 修复');
  console.log(`项目根目录：${ROOT}`);
  console.log(`扫描 ${files.length} 个 Markdown 文件${DRY_RUN ? '（--dry-run，不写盘）' : ''}`);
  console.log('');

  if (changed.length) {
    console.log(`${DRY_RUN ? '待修复' : '已修复'} ${changed.length} 个文件：`);
    for (const f of changed) console.log(`  ${DRY_RUN ? '·' : '✓'} ${rel(f)}`);
  } else {
    console.log('未发现需要修复的 front matter。');
  }
  console.log('');
}

if (noFrontMatter.length) {
  console.log(`[需人工处理] ${noFrontMatter.length} 个文件无法识别 front matter 区块：`);
  for (const f of noFrontMatter) console.log(`  ! ${rel(f)}`);
  console.log('  → 这些文件的 front matter 可能已整体损坏，请手工补回或参考同级页面重建。');
  console.log('');
}

if (bodyEscaped.length) {
  console.log(`[需人工确认] ${bodyEscaped.length} 个文件在 front matter 之外出现了 \\--- ：`);
  for (const f of bodyEscaped) console.log(`  ? ${rel(f)}`);
  console.log('  → 正文中的 \\--- 本脚本不修改，请确认是否为编辑器的误转义。');
  console.log('');
}

if (failed.length) {
  console.log(`[写盘失败] ${failed.length} 个文件：`);
  for (const f of failed) console.log(`  x ${f}`);
  console.log('');
}

const summary = DRY_RUN
  ? `结果：待修复 ${changed.length}，需人工处理 ${noFrontMatter.length + failed.length}`
  : `结果：已修复 ${changed.length}，需人工处理 ${noFrontMatter.length + failed.length}`;
console.log(summary);

process.exit(noFrontMatter.length + failed.length > 0 ? 1 : 0);

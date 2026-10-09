import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import {toString} from 'mdast-util-to-string';
import {visit} from 'unist-util-visit';
import {createSlugger, parseMarkdownHeadingId} from '@docusaurus/utils';

// Use the Markdown parser and slugger already installed with Docusaurus.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'docs');
const englishRoot = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
const syncAnchors = process.argv.includes('--sync-heading-ids');
const failures = [];
const fail = message => failures.push(message);
const normalize = value => value.replaceAll(path.sep, '/');

function files(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? files(full) : /\.mdx?$/.test(entry.name) ? [full] : [];
  });
}

function read(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const frontMatter = text.match(/^---\n([\s\S]*?)\n---\n/);
  const fields = {};
  for (const line of (frontMatter?.[1] || '').split('\n')) {
    const match = line.match(/^(\w+):\s*(.*?)\s*$/);
    if (match) fields[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
  const body = text.slice(frontMatter?.[0].length || 0);
  const slugs = createSlugger();
  const headings = [];
  visit(unified().use(remarkParse).parse(body), 'heading', node => {
    const visible = node.children.filter(child => !['html', 'jsx'].includes(child.type));
    const parsed = parseMarkdownHeadingId(toString(visible.length ? visible : node), 'classic');
    headings.push({depth: node.depth, line: node.position.start.line, id: parsed.id ?? slugs.slug(parsed.text)});
  });
  const tokens = expression => [...body.matchAll(expression)].map(match => match[1]).sort();
  return {text, prefix: frontMatter?.[0] || '', body, fields, headings, tokens};
}

const originals = files(sourceRoot);
const englishFiles = new Set(files(englishRoot).map(file => normalize(path.relative(englishRoot, file))));
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);

for (const sourceFile of originals) {
  const relative = normalize(path.relative(sourceRoot, sourceFile));
  if (!englishFiles.delete(relative)) {
    fail(`${relative}: missing English article`);
    continue;
  }
  const targetFile = path.join(englishRoot, relative);
  const source = read(sourceFile);
  let english = read(targetFile);

  for (const field of ['id', 'slug', 'sidebar_position']) {
    if (source.fields[field] !== english.fields[field]) fail(`${relative}: ${field} differs`);
  }
  for (const field of ['title', 'sidebar_label']) {
    if (english.fields[field] && /\p{Script=Han}/u.test(english.fields[field])) fail(`${relative}: untranslated ${field}`);
  }
  const headingShape = document => document.headings.map(heading => heading.depth);
  if (!equal(headingShape(source), headingShape(english))) {
    fail(`${relative}: headings differ (${source.headings.length} Chinese / ${english.headings.length} English); review corresponding sections`);
  } else {
    if (syncAnchors) {
      const lines = english.body.split('\n');
      english.headings.forEach((heading, index) => {
        lines[heading.line - 1] = lines[heading.line - 1].replace(/\s*\{#[^}]+\}\s*$/, '') + ` {#${source.headings[index].id}}`;
      });
      fs.writeFileSync(targetFile, english.prefix + lines.join('\n'));
      english = read(targetFile);
    }
    if (!equal(source.headings.map(heading => heading.id), english.headings.map(heading => heading.id))) {
      fail(`${relative}: section anchors differ; align translated headings and run --sync-heading-ids`);
    }
  }
  for (const [name, expression] of [
    ['numbered notes', /<DocNote\s+number=\{(\d+)\}/g],
    ['note references', /<NoteRef\s+number=\{(\d+)\}/g],
    ['official example components', /<(?:OfficialExampleFiles|DocNotes)\s+example="([^"]+)"/g],
    ['interactive demos', /<((?:PoseExplorer|BoxExplorer|SearchExplorer|PoseFilterExplorer|InteractionExplorer|StereochemistryExplorer|FlexibilityExplorer|GridMapExplorer|ScoringExplorer|RmsdExplorer)\b[^>]*)\/>/g],
  ]) {
    if (!equal(source.tokens(expression), english.tokens(expression))) fail(`${relative}: ${name} differ`);
  }
  const imageFiles = (document, file) => document.tokens(/!\[[^\]]*\]\(([^)\s]+)\)/g).map(url => normalize(
    url.startsWith('/') ? path.join(root, 'static', url) : path.resolve(path.dirname(file), url)
  )).sort();
  if (!equal(imageFiles(source, sourceFile), imageFiles(english, targetFile))) fail(`${relative}: screenshots differ`);
}

for (const extra of englishFiles) fail(`${extra}: English article has no Chinese counterpart`);
for (const file of [
  'i18n/en/code.json',
  'i18n/en/docusaurus-plugin-content-docs/current.json',
  'i18n/en/docusaurus-theme-classic/navbar.json',
  'i18n/en/docusaurus-theme-classic/footer.json',
]) {
  for (const [key, entry] of Object.entries(JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')))) {
    if (!entry.message?.trim() || /\p{Script=Han}/u.test(entry.message)) fail(`${file}: missing English message for ${key}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Bilingual coverage: ${originals.length} matched articles; routes, sections, screenshots, notes and UI catalogs passed.`);
}

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clean = value => value.replace(/<!--[\s\S]*?-->/g, ' ').replace(/^```[^\n]*$/gm, ' ').replace(/\{#[^}]+\}/g, ' ').replace(/<[^>]*>/g, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*`>|~]/g, ' ').replace(/\s+/g, ' ').trim();

function buildIndex(directory) {
  const root = path.join(siteRoot, directory);
  const items = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (/\.mdx?$/.test(entry.name)) {
        const relative = path.relative(root, file).replaceAll(path.sep, '/');
        const original = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
        const frontMatter = original.match(/^---\n([\s\S]*?)\n---\n/);
        const title = frontMatter?.[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || relative;
        const body = original.slice(frontMatter?.[0].length || 0).replace(/^import\s+[^\n]+;[ \t]*$/gm, '').trimStart();
        const lead = body.split(/\n\s*\n/).find(paragraph => paragraph.trim() && !/^(?:#|<|!\[)/.test(paragraph.trim()));
        const top = relative.split('/')[0];
        const category = ['intro', 'part-a', 'part-b', 'part-c', 'appendix'].includes(top) ? top : 'appendix';
        items.push({title, path: '/docs/' + relative.replace(/\.mdx?$/, ''), category, description: clean(lead || '').slice(0, 180), text: clean(body)});
      }
    }
  }
  walk(root);
  return items;
}

for (const locale of [
  {name: 'zh-Hans', directory: 'docs', output: 'search-index.json'},
  {name: 'en', directory: 'i18n/en/docusaurus-plugin-content-docs/current', output: 'search-index.en.json'},
]) {
  const entries = buildIndex(locale.directory);
  fs.writeFileSync(path.join(siteRoot, 'static', locale.output), JSON.stringify(entries));
  console.log(`${locale.name} search index: ${entries.length} articles`);
}

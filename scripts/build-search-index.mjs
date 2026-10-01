import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs');
const items=[];
function walk(dir){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const file=path.join(dir,ent.name);
    if(ent.isDirectory()) walk(file);
    else if(ent.name.endsWith('.md')) {
      const relative=path.relative(root,file).replaceAll(path.sep,'/');
      const original=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n');
      const fm=original.match(/^---\n([\s\S]*?)\n---\n/);
      const title=fm?.[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || relative;
      const body=original.slice(fm?.[0].length||0).replace(/^import\s+[^\n]+;[ \t]*$/gm,'').trimStart();
      const clean=(value)=>value.replace(/<!--[\s\S]*?-->/g,' ').replace(/^```[^\n]*$/gm,' ').replace(/\{#[^}]+\}/g,' ').replace(/<[^>]*>/g,' ').replace(/!\[[^\]]*\]\([^)]*\)/g,' ').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/[#*`>|_~]/g,' ').replace(/\s+/g,' ').trim();
      const plain=clean(body);
      const overview=body.match(/(?:^|\n)## 简单概括[ \t]*\n+[ \t]*([\s\S]*?)(?=\n[ \t]*\n|$)/)?.[1];
      const description=clean(overview||body.replace(/^# .+\n+/,'')).slice(0,150);
      const top=relative.split('/')[0];
      const category=({'intro':'序章','part-a':'第一章','part-b':'第二章','part-c':'第三章','appendix':'附录'})[top]||'附录';
      items.push({title,path:'/docs/'+relative.replace(/\.md$/,''),category,description,text:plain});
    }
  }
}
walk(root);
fs.writeFileSync('static/search-index.json',JSON.stringify(items));
console.log(`检索索引：${items.length} 篇文章`);

import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Entry = {title:string; path:string; category:string; description:string; text:string};
const groups = ['全部','序章','第一章','第二章','第三章','附录'];

export default function Search(): React.JSX.Element {
  const [entries,setEntries]=useState<Entry[]>([]);
  const [query,setQuery]=useState('');
  const [group,setGroup]=useState('全部');
  const [ready,setReady]=useState(false);
  const indexUrl=useBaseUrl('/search-index.json');
  useEffect(()=>{
    setQuery(new URLSearchParams(window.location.search).get('q')||'');
    fetch(indexUrl).then(r=>{if(!r.ok) throw new Error('index'); return r.json()}).then(data=>{setEntries(data);setReady(true)}).catch(()=>setReady(true));
  },[indexUrl]);
  const results=useMemo(()=>{
    const q=query.trim().toLocaleLowerCase();
    return entries.filter(e=>(group==='全部'||e.category===group) && (!q || (e.title+' '+e.description+' '+e.text).toLocaleLowerCase().includes(q))).sort((a,b)=>{
      if(!q) return 0;
      const score=(e:Entry)=> (e.title.toLocaleLowerCase().includes(q)?4:0)+(e.description.toLocaleLowerCase().includes(q)?2:0);
      return score(b)-score(a);
    });
  },[entries,query,group]);
  return <Layout title="检索文档" description="搜索 DockStart 帮助文档中的概念、案例与排错内容。"><main className="guide-search-page container"><h1>检索帮助文档</h1><p>按关键词查找文章的标题与正文，也可以按章节缩小范围。</p><div className="guide-search-page__input"><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="例如：质子化、AutoGrid4、RMSD" aria-label="搜索文档关键词" autoFocus/></div><div className="guide-filters" role="group" aria-label="章节筛选">{groups.map(g=><button key={g} className={g===group?'is-active':''} aria-pressed={g===group} onClick={()=>setGroup(g)}>{g}</button>)}</div><div className="guide-results-head">{ready?`${results.length} 篇结果`:'正在读取索引…'}</div><div className="guide-results">{results.map(e=><Link key={e.path} to={e.path} className="guide-result"><span>{e.category}</span><h2>{e.title}</h2><p>{e.description}</p></Link>)}{ready&&results.length===0&&<div className="guide-no-results"><h2>没有找到匹配的文章</h2><p>试试更短的关键词，或从完整文档目录进入。</p><Link to="/docs/intro/what-docking-solves">打开文档目录</Link></div>}</div></main></Layout>;
}

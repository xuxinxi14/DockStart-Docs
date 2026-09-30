import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const paths = [
  {number:'01', eyebrow:'起点 / Orientation', title:'认识分子对接', description:'先弄清它能回答什么，以及不能证明什么。', href:'/docs/intro/what-docking-solves', count:'6 篇', tone:'cyan'},
  {number:'02', eyebrow:'原理 / Foundations', title:'理解一次对接', description:'结构文件、受体配体、Box、评分、参数与结果。', href:'/docs/part-a/structure-and-files/structure-file-formats', count:'32 篇', tone:'blue'},
  {number:'03', eyebrow:'实作 / Cases', title:'跟着案例操作', description:'从 1IEP 入门，延伸到柔性、批量、水合与 AD4 maps。', href:'/docs/part-b/cases/basic-docking-1iep', count:'8 个主题', tone:'orange'},
  {number:'04', eyebrow:'排错 / Troubleshooting', title:'解决操作问题', description:'安装、结构准备、运行限制、结果解释与常见报错。', href:'/docs/part-c/common-errors-and-recovery', count:'13 篇', tone:'violet'},
];

const cases = [
  {title:'Basic Docking', code:'1IEP', tag:'第一条路线', href:'/docs/part-b/cases/basic-docking-1iep', image:'/img/cases/basic-docking-1iep/08-result-vina-poses.webp'},
  {title:'Flexible Docking', code:'1FPU', tag:'柔性侧链', href:'/docs/part-b/cases/flexible-docking-1fpu', image:'/img/cases/flexible-docking-1fpu/08-result-poses.webp'},
  {title:'Hydrated Docking', code:'1UW6', tag:'水分子协议', href:'/docs/part-b/cases/hydrated-docking-1uw6', image:'/img/cases/hydrated-docking-1uw6/09-result-poses.webp'},
  {title:'AutoDock4 Maps', code:'AD4', tag:'预计算网格', href:'/docs/part-b/cases/autodock4-maps-workflow', image:'/img/cases/autodock4-maps-workflow/08-result-poses.webp'},
];

export default function Home(): React.JSX.Element {
  const searchUrl = useBaseUrl('/search');
  const base = useBaseUrl('/');
  return <Layout title="从结构到证据" description="DockStart 中文帮助文档：分子对接概念、真实案例、软件操作和排错。">
    <main className="guide-home">
      <section className="guide-hero">
        <div className="guide-hero__inner container">
          <div className="guide-hero__copy">
            <div className="guide-kicker"><span className="guide-kicker__line"/>DOCKSTART FIELD GUIDE <span> / 01—67</span></div>
            <h1>从结构开始，<br/><em>把每一步对接讲清楚。</em></h1>
            <p className="guide-hero__lead">一份面向实际操作的中文帮助文档。沿着概念、参数、案例与排错路线，理解你输入了什么、软件做了什么、结果意味着什么。</p>
            <form className="guide-search" action={searchUrl} method="get" role="search">
              <span aria-hidden="true" className="guide-search__icon">⌕</span>
              <input name="q" type="search" placeholder="搜索 Box、PDBQT、RMSD、错误信息…" aria-label="搜索帮助文档"/>
              <button type="submit">检索文档</button>
            </form>
            <div className="guide-hero__actions"><Link className="guide-primary" to="/docs/part-b/cases/basic-docking-1iep">从 1IEP 案例开始</Link><Link className="guide-text-link" to="/docs/intro/what-docking-solves">先了解分子对接</Link></div>
          </div>
          <div className="guide-orbit" aria-label="文档阅读路线：输入结构，设定搜索，运行计算，解释结果">
            <div className="guide-orbit__head"><span>WORKFLOW / 001</span><span>一条完整的阅读线索</span></div>
            <div className="guide-orbit__nodes">
              <div><b>01</b><span>结构准备<small>PDB · SDF · PDBQT</small></span></div>
              <div><b>02</b><span>搜索与评分<small>Box · Maps · 参数</small></span></div>
              <div><b>03</b><span>执行与排错<small>Vina · AutoGrid4</small></span></div>
              <div><b>04</b><span>结果解释<small>Pose · Affinity · RMSD</small></span></div>
            </div>
            <div className="guide-orbit__foot"><span>INPUT</span><span>可追溯的运行过程</span><span>INTERPRETATION</span></div>
          </div>
        </div>
      </section>

      <section className="guide-section container" aria-labelledby="route-title">
        <div className="guide-section__head"><div><p className="guide-overline">READING ROUTES / 阅读路线</p><h2 id="route-title">按当前问题，找到下一页</h2></div><Link to="/docs/intro/what-docking-solves">查看文档目录</Link></div>
        <div className="guide-paths">{paths.map(p=><Link to={p.href} key={p.number} className={`guide-path guide-path--${p.tone}`}><div className="guide-path__top"><span>{p.number} / {p.eyebrow}</span><span>{p.count}</span></div><h3>{p.title}</h3><p>{p.description}</p><span className="guide-path__bottom">打开这一章 <span aria-hidden="true">↗</span></span></Link>)}</div>
      </section>

      <section className="guide-section guide-section--cases" aria-labelledby="cases-title"><div className="container"><div className="guide-section__head"><div><p className="guide-overline">OBSERVED CASES / 图文实战</p><h2 id="cases-title">把抽象参数放回一次真实运行</h2></div><p>截图、输入条件、结果对照与偏差解释并列呈现。</p></div><div className="guide-cases">{cases.map(c=><Link to={c.href} key={c.title} className="guide-case"><div className="guide-case__image"><img src={`${base}${c.image.slice(1)}`} alt={`${c.title} 案例中的 DockStart 结果界面`} loading="lazy"/></div><div className="guide-case__meta"><span>{c.tag}</span><b>{c.code}</b></div><h3>{c.title}</h3></Link>)}</div><p className="guide-case-note">AD4Zn 章节目前提供协议边界与资料入口，尚无经过验证的逐步实测案例。<Link to="/docs/part-b/cases/zinc-ad4zn">查看章节状态</Link></p></div></section>

      <section className="guide-section guide-end container"><div><p className="guide-overline">A NOTE ON EVIDENCE</p><h2>分数是模型输出，<br/>结论需要更多证据。</h2><p>文档区分软件流程复现、与官方示例的数值对照，以及关于结合与实验效应的科学推断。遇到不同结果时，先检查输入结构、质子化、Box、评分函数和工具版本。</p><div className="guide-end__links"><Link to="/docs/part-a/understanding-results/scientific-limits">理解科学边界</Link><Link to="/docs/part-c/why-results-differ">排查结果差异</Link></div></div><aside><span>版本提示 / VERSION NOTE</span><p>本套正文依据资料包中的 DockStart v0.14.3 时期内容整理。GitHub 仓库的当前源码和候选版本可能继续变化；安装能力与发布状态请以项目仓库及 Releases 为准。</p><a href="https://github.com/xuxinxi14/DockStart" target="_blank" rel="noopener noreferrer">查看 DockStart 项目 ↗</a></aside></section>
    </main>
  </Layout>;
}

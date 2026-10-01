import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ReliableImage from '../components/ReliableImage';

const chapters = [
  {title: '入门概念', links: [
    {title: '分子对接能做什么', href: '/docs/intro/what-docking-can-do'},
    {title: '科学边界', href: '/docs/part-a/understanding-results/scientific-limits'},
    {title: 'AutoDock Vina 与 DockStart', href: '/docs/intro/autodock-vina-dockstart'},
  ]},
  {title: '基础原理', links: [
    {title: '结构文件格式', href: '/docs/part-a/structure-and-files/structure-file-formats'},
    {title: '对接箱体', href: '/docs/part-a/search-space-and-scoring/search-box'},
    {title: 'Vina 参数与评分', href: '/docs/appendix/vina-parameters-quick-reference'},
  ]},
  {title: '实战案例', links: [
    {title: 'Basic Docking — 1IEP', href: '/docs/part-b/cases/basic-docking-1iep'},
    {title: 'Flexible Docking — 1FPU', href: '/docs/part-b/cases/flexible-docking-1fpu'},
    {title: 'AutoDock4 Maps', href: '/docs/part-b/cases/autodock4-maps-workflow'},
  ]},
  {title: '使用与排错', links: [
    {title: '安装与工具链', href: '/docs/part-c/toolchain'},
    {title: '结构准备问题', href: '/docs/part-c/faq-structure-preparation'},
    {title: '如何解读结果', href: '/docs/part-c/interpreting-results'},
  ]},
];

export default function Home(): React.JSX.Element {
  const searchUrl = useBaseUrl('/search');
  const imageUrl = useBaseUrl('/img/cases/basic-docking-1iep/08-result-vina-poses.webp');
  return <Layout title="帮助文档" description="DockStart 中文帮助文档：分子对接入门、实操与排错。">
    <main className="guide-home guide-container">
      <section className="guide-intro" aria-labelledby="home-title">
        <h1 id="home-title">DockStart 帮助文档</h1>
        <p className="guide-intro__lead">分子对接入门、实操与排错。</p>
        <form className="guide-search" action={searchUrl} method="get" role="search">
          <input name="q" type="search" placeholder="搜索文档，例如 Box、PDBQT、RMSD" aria-label="搜索帮助文档"/>
          <button type="submit">搜索</button>
        </form>
        <div className="guide-intro__links">
          <Link className="guide-link-accent" to="/docs/part-b/cases/basic-docking-1iep">从 1IEP 案例开始</Link>
          <Link to="/docs/intro/what-docking-solves">浏览全部文档</Link>
        </div>
      </section>
      <div className="guide-home__grid">
        <section className="guide-directory" aria-labelledby="directory-title">
          <h2 id="directory-title">文档目录</h2>
          {chapters.map(chapter => <div className="guide-chapter" key={chapter.title}>
            <h3>{chapter.title}</h3>
            <ul>{chapter.links.map(link => <li key={link.href}><Link to={link.href}>{link.title}</Link></li>)}</ul>
          </div>)}
        </section>
        <aside className="guide-home__aside" aria-label="案例与常用参考">
          <section className="guide-featured" aria-labelledby="featured-title">
            <h2 id="featured-title">推荐案例</h2>
            <div className="guide-featured__image">
              <ReliableImage src={imageUrl} alt="DockStart 的 1IEP 对接结果界面" width={1438} height={898} loading="eager"/>
            </div>
            <h3><Link to="/docs/part-b/cases/basic-docking-1iep">Basic Docking — 1IEP</Link></h3>
            <p>从结构准备到结果检查，<br/>完成第一条对接流程。</p>
            <Link className="guide-link-accent" to="/docs/part-b/cases/basic-docking-1iep">阅读案例</Link>
          </section>
          <section className="guide-quick-links" aria-labelledby="reference-title">
            <h2 id="reference-title">常用参考</h2>
            <ul>
              <li><Link to="/docs/appendix/glossary-zh-en">术语解释</Link></li>
              <li><Link to="/docs/appendix/vina-parameters-quick-reference">参数速查</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  </Layout>;
}

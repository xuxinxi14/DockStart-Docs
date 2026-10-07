import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ReliableImage from '../components/ReliableImage';
import useGuideLocale from '../components/useGuideLocale';

const chapters = (t: (zh: string, en: string) => string) => [
  {title: t('入门概念', 'Getting started'), links: [
    {title: t('分子对接能做什么', 'What docking can do'), href: '/docs/intro/what-docking-can-do'},
    {title: t('科学边界', 'Scientific limits'), href: '/docs/part-a/understanding-results/scientific-limits'},
    {title: t('AutoDock Vina 与 DockStart', 'Vina and DockStart'), href: '/docs/intro/autodock-vina-dockstart'},
  ]},
  {title: t('基础原理', 'Fundamentals'), links: [
    {title: t('结构文件格式', 'Structure formats'), href: '/docs/part-a/structure-and-files/structure-file-formats'},
    {title: t('对接箱体', 'Docking box'), href: '/docs/part-a/search-space-and-scoring/search-box'},
    {title: t('Vina 参数与评分', 'Parameters and scoring'), href: '/docs/appendix/vina-parameters-quick-reference'},
  ]},
  {title: t('实战案例', 'Worked examples'), links: [
    {title: 'Basic Docking — 1IEP', href: '/docs/part-b/cases/basic-docking-1iep'},
    {title: 'Flexible Docking — 1FPU', href: '/docs/part-b/cases/flexible-docking-1fpu'},
    {title: 'AutoDock4 Maps', href: '/docs/part-b/cases/autodock4-maps-workflow'},
  ]},
  {title: t('使用与排错', 'Using DockStart'), links: [
    {title: t('安装与工具链', 'Toolchain setup'), href: '/docs/part-c/toolchain'},
    {title: t('结构准备问题', 'Structure preparation'), href: '/docs/part-c/faq-structure-preparation'},
    {title: t('如何解读结果', 'Reading results'), href: '/docs/part-c/interpreting-results'},
  ]},
];

export default function Home(): React.JSX.Element {
  const {t} = useGuideLocale();
  const searchUrl = useBaseUrl('/search');
  const imageUrl = useBaseUrl('/img/cases/basic-docking-1iep/08-result-vina-poses.webp');
  return <Layout title={t('帮助文档', 'Documentation')} description={t('DockStart 中文帮助文档：分子对接入门、实操与排错。', 'DockStart documentation for molecular docking, worked examples and troubleshooting.')}>
    <main className="guide-home guide-container">
      <section className="guide-intro" aria-labelledby="home-title">
        <h1 id="home-title">{t('DockStart 帮助文档', 'DockStart Documentation')}</h1>
        <p className="guide-intro__lead">{t('分子对接入门、实操与排错。', 'Molecular docking, from your first run to reading the results.')}</p>
        <p>{t('当前下载：v1.0.4 · Windows x64 · Assisted 试用版。', 'Current download: v1.0.4 · Windows x64 · Assisted trial.')}</p>
        <form className="guide-search" action={searchUrl} method="get" role="search">
          <input name="q" type="search" placeholder={t('搜索文档，例如 Box、PDBQT、RMSD', 'Search the docs, e.g. box, PDBQT, RMSD')} aria-label={t('搜索帮助文档', 'Search the documentation')}/>
          <button type="submit">{t('搜索', 'Search')}</button>
        </form>
        <div className="guide-intro__links">
          <Link className="guide-link-accent" to="/docs/part-c/quick-start-v1-0-4">{t('下载 v1.0.4 与快速开始', 'Download v1.0.4 and get started')}</Link>
          <Link to="/docs/part-b/cases/basic-docking-1iep">{t('1IEP 完整案例', 'The complete 1IEP example')}</Link>
          <Link to="/docs/intro/what-docking-solves">{t('浏览全部文档', 'Browse the docs')}</Link>
        </div>
      </section>
      <div className="guide-home__grid">
        <section className="guide-directory" aria-labelledby="directory-title">
          <h2 id="directory-title">{t('文档目录', 'Explore the guide')}</h2>
          {chapters(t).map(chapter => <div className="guide-chapter" key={chapter.title}>
            <h3>{chapter.title}</h3>
            <ul>{chapter.links.map(link => <li key={link.href}><Link to={link.href}>{link.title}</Link></li>)}</ul>
          </div>)}
        </section>
        <aside className="guide-home__aside" aria-label={t('案例与常用参考', 'Featured example and quick references')}>
          <section className="guide-featured" aria-labelledby="featured-title">
            <h2 id="featured-title">{t('推荐案例', 'Start with an example')}</h2>
            <div className="guide-featured__image">
              <ReliableImage src={imageUrl} alt={t('DockStart 的 1IEP 对接结果界面', 'DockStart results for the 1IEP docking example')} width={1438} height={898} loading="eager"/>
            </div>
            <h3><Link to="/docs/part-b/cases/basic-docking-1iep">Basic Docking — 1IEP</Link></h3>
            <p>{t('从结构准备到结果检查，完成第一条对接流程。历史结果截图为 v1.0.3。', 'Complete your first docking workflow, from preparation to checking the results. The result screenshot is from v1.0.3.')}</p>
            <Link className="guide-link-accent" to="/docs/part-b/cases/basic-docking-1iep">{t('阅读案例', 'Read the example')}</Link>
          </section>
          <section className="guide-quick-links" aria-labelledby="reference-title">
            <h2 id="reference-title">{t('常用参考', 'Quick references')}</h2>
            <ul>
              <li><Link to="/docs/appendix/glossary-zh-en">{t('术语解释', 'Glossary')}</Link></li>
              <li><Link to="/docs/appendix/vina-parameters-quick-reference">{t('参数速查', 'Parameters')}</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  </Layout>;
}

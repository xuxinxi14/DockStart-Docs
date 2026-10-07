import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useHistory, useLocation} from '@docusaurus/router';
import useGuideLocale from '../components/useGuideLocale';

type Entry = {title: string; path: string; category: string; description: string; text: string};
const groups = [
  {id: 'all', zh: '全部', en: 'All'},
  {id: 'intro', zh: '序章', en: 'Introduction'},
  {id: 'part-a', zh: '第一章', en: 'Fundamentals'},
  {id: 'part-b', zh: '第二章', en: 'Examples'},
  {id: 'part-c', zh: '第三章', en: 'Using DockStart'},
  {id: 'appendix', zh: '附录', en: 'Appendix'},
];

export default function Search(): React.JSX.Element {
  const {t, isEnglish} = useGuideLocale();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [group, setGroup] = useState('all');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search).get('q') || '';
  const indexUrl = useBaseUrl(isEnglish ? '/search-index.en.json' : '/search-index.json');

  useEffect(() => {
    const controller = new AbortController();
    setReady(false);
    setFailed(false);
    fetch(indexUrl, {signal: controller.signal})
      .then(response => {if (!response.ok) throw new Error('index'); return response.json();})
      .then(data => {setEntries(data); setReady(true);})
      .catch(() => {if (!controller.signal.aborted) {setFailed(true); setReady(true);}});
    return () => controller.abort();
  }, [indexUrl]);

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(location.search);
    if (value) params.set('q', value); else params.delete('q');
    history.replace({...location, search: params.size ? `?${params}` : ''});
  };
  const categoryLabel = (id: string) => {
    const item = groups.find(item => item.id === id) || groups[5];
    return t(item.zh, item.en);
  };
  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    const score = (entry: Entry) => (entry.title.toLocaleLowerCase().includes(q) ? 4 : 0) + (entry.description.toLocaleLowerCase().includes(q) ? 2 : 0);
    return entries.filter(entry => (group === 'all' || entry.category === group) && (!q || `${entry.title} ${entry.description} ${entry.text}`.toLocaleLowerCase().includes(q)))
      .sort((a, b) => q ? score(b) - score(a) : 0);
  }, [entries, query, group]);

  return <Layout title={t('检索文档', 'Search the docs')} description={t('搜索 DockStart 帮助文档中的概念、案例与排错内容。', 'Search concepts, worked examples and troubleshooting in the DockStart documentation.')}>
    <main className="guide-search-page container">
      <h1>{t('检索帮助文档', 'Search the documentation')}</h1>
      <p>{t('按关键词查找文章的标题与正文，也可以按章节缩小范围。', 'Search article titles and text by keyword, or narrow the results by chapter.')}</p>
      <div className="guide-search-page__input"><input type="search" value={query} onChange={event => updateQuery(event.target.value)} placeholder={t('例如：质子化、AutoGrid4、RMSD', 'For example: protonation, AutoGrid4, RMSD')} aria-label={t('搜索文档关键词', 'Search documentation keywords')} autoFocus/></div>
      <div className="guide-filters" role="group" aria-label={t('章节筛选', 'Filter by chapter')}>
        {groups.map(item => <button key={item.id} className={item.id === group ? 'is-active' : ''} aria-pressed={item.id === group} onClick={() => setGroup(item.id)}>{t(item.zh, item.en)}</button>)}
      </div>
      <div className="guide-results-head" role="status">{ready ? failed ? t('索引读取失败', 'Search index unavailable') : t(`${results.length} 篇结果`, `${results.length} results`) : t('正在读取索引…', 'Loading the search index…')}</div>
      <div className="guide-results">
        {results.map(entry => <Link key={entry.path} to={entry.path} className="guide-result"><span>{categoryLabel(entry.category)}</span><h2>{entry.title}</h2><p>{entry.description}</p></Link>)}
        {ready && (failed || results.length === 0) && <div className="guide-no-results">
          <h2>{failed ? t('暂时无法搜索', 'Search is temporarily unavailable') : t('没有找到匹配的文章', 'No matching articles')}</h2>
          <p>{failed ? t('请检查网络后刷新页面，也可以直接浏览完整文档。', 'Check your connection and reload the page, or browse the full documentation.') : t('试试更短的关键词，或从完整文档目录进入。', 'Try a shorter keyword, or browse the full documentation.')}</p>
          <Link to="/docs/intro/what-docking-solves">{t('打开文档目录', 'Browse the docs')}</Link>
        </div>}
      </div>
    </main>
  </Layout>;
}

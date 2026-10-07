import React, {useEffect} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {getOfficialExample, officialRepository, officialRevision, type OfficialExampleId} from '../data/officialExamples';
import useGuideLocale from './useGuideLocale';

export function NoteRef({number = 1}: {number?: number}): React.JSX.Element {
  const {t} = useGuideLocale();
  return <sup className="guide-note-ref"><a href={`#doc-note-${number}`} aria-label={t(`查看注释 ${number}`, `Read note ${number}`)} onClick={() => {
    const notes = document.getElementById(`doc-note-${number}`)?.closest('details');
    if (notes) notes.open = true;
  }}>[{number}]</a></sup>;
}

export function DocNote({number, title, children}: {number: number; title: string; children: React.ReactNode}): React.JSX.Element {
  return <li id={`doc-note-${number}`} value={number} tabIndex={-1}>
    <p className="guide-notes__label"><strong>{title}</strong></p>
    <div>{children}</div>
  </li>;
}

export default function DocNotes({example, children}: {example?: OfficialExampleId; children: React.ReactNode}): React.JSX.Element {
  const {t, isEnglish} = useGuideLocale();
  const manifestUrl = useBaseUrl('/example-inputs-manifest.json');
  useEffect(() => {
    const revealNote = () => {
      if (!/^#(?:doc-note-\d+|article-notes)$/.test(window.location.hash)) return;
      const target = document.getElementById(window.location.hash.slice(1));
      const details = target?.closest<HTMLDetailsElement>('.guide-notes');
      if (details) {
        details.open = true;
        target?.scrollIntoView();
      }
    };
    revealNote();
    window.addEventListener('hashchange', revealNote);
    return () => window.removeEventListener('hashchange', revealNote);
  }, []);

  const entry = example ? getOfficialExample(example, isEnglish) : undefined;
  const folder = entry ? `example/${entry.folder}` : '';
  return <details className="guide-notes">
    <summary id="article-notes">{t('注释', 'Notes')}</summary>
    <ol>
      {entry && <DocNote number={1} title={t('示例文件来源', 'Example file sources')}>
        <p>{entry.note}</p>
        <p>{t('下载链接固定于 AutoDock Vina 官方提交', 'Download links are pinned to the official AutoDock Vina commit')} <code>{officialRevision.slice(0, 12)}</code>{t('；', '. ')}<a href={manifestUrl}>{t('输入校验清单', 'The input manifest')}</a>{t('记录文件大小与 SHA256。历史截图的输入未据此重新校验。', ' records file sizes and SHA256 hashes. Inputs in historical screenshots have not been rechecked against this manifest.')}</p>
        <p><a href={`${officialRepository}/tree/${officialRevision}/${folder}`} target="_blank" rel="noopener noreferrer">{t('官方示例目录', 'Official example directory')}</a> · <a href={`${officialRepository}/tree/${officialRevision}/${folder}/solution`} target="_blank" rel="noopener noreferrer">{t('官方参考结果与配置', 'Official reference results and configuration')}</a></p>
      </DocNote>}
      {children}
    </ol>
  </details>;
}

import React, {useEffect} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {officialExamples, officialRepository, officialRevision, type OfficialExampleId} from '../data/officialExamples';

export function NoteRef({number = 1}: {number?: number}): React.JSX.Element {
  return <sup className="guide-note-ref"><a href={`#doc-note-${number}`} aria-label={`查看注释 ${number}`} onClick={() => {
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

  const entry = example ? officialExamples[example] : undefined;
  const folder = entry ? `example/${entry.folder}` : '';
  return <details className="guide-notes">
    <summary id="article-notes">注释</summary>
    <ol>
      {entry && <DocNote number={1} title="示例文件来源">
        <p>{entry.note}</p>
        <p>下载链接固定于 AutoDock Vina 官方提交 <code>{officialRevision.slice(0, 12)}</code>；<a href={manifestUrl}>输入校验清单</a>记录文件大小与 SHA256。历史截图的输入未据此重新校验。</p>
        <p><a href={`${officialRepository}/tree/${officialRevision}/${folder}`} target="_blank" rel="noopener noreferrer">官方示例目录</a> · <a href={`${officialRepository}/tree/${officialRevision}/${folder}/solution`} target="_blank" rel="noopener noreferrer">官方参考结果与配置</a></p>
      </DocNote>}
      {children}
    </ol>
  </details>;
}

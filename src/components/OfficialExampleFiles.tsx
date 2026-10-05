import React from 'react';
import {NoteRef} from './DocNotes';
import {officialExamples, officialRepository, officialRevision, type OfficialExampleId} from '../data/officialExamples';

export default function OfficialExampleFiles({example}: {example: OfficialExampleId}): React.JSX.Element {
  const entry = officialExamples[example];
  const folder = `example/${entry.folder}`;
  return <section className="guide-official-files" aria-labelledby="official-structure-files">
    <p>{entry.instruction}<NoteRef/></p>
    <table>
      <thead><tr><th scope="col">用途</th><th scope="col">文件</th><th scope="col">获取</th></tr></thead>
      <tbody>{entry.files.map(file => {
        const path = `${folder}/${file.path}`;
        return <tr key={file.path}>
          <td>{file.role}</td>
          <td><a href={`${officialRepository}/blob/${officialRevision}/${path}`} target="_blank" rel="noopener noreferrer">{file.path.split('/').pop()}</a></td>
          <td><a href={`https://raw.githubusercontent.com/ccsb-scripps/AutoDock-Vina/${officialRevision}/${path}`} aria-label={`下载 ${file.path.split('/').pop()}`}>下载</a></td>
        </tr>;
      })}</tbody>
    </table>
    <p className="guide-official-files__note">若下载后显示文本，右键“下载”选择“链接另存为”。</p>
  </section>;
}

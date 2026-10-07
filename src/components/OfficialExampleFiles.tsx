import React from 'react';
import {NoteRef} from './DocNotes';
import {getOfficialExample, officialRepository, officialRevision, type OfficialExampleId} from '../data/officialExamples';
import useGuideLocale from './useGuideLocale';

export default function OfficialExampleFiles({example}: {example: OfficialExampleId}): React.JSX.Element {
  const {t, isEnglish} = useGuideLocale();
  const entry = getOfficialExample(example, isEnglish);
  const folder = `example/${entry.folder}`;
  return <section className="guide-official-files" aria-labelledby="official-structure-files">
    <p>{entry.instruction}<NoteRef/></p>
    <table>
      <thead><tr><th scope="col">{t('用途', 'Use')}</th><th scope="col">{t('文件', 'File')}</th><th scope="col">{t('获取', 'Get')}</th></tr></thead>
      <tbody>{entry.files.map(file => {
        const path = `${folder}/${file.path}`;
        return <tr key={file.path}>
          <td>{file.role}</td>
          <td><a href={`${officialRepository}/blob/${officialRevision}/${path}`} target="_blank" rel="noopener noreferrer">{file.path.split('/').pop()}</a></td>
          <td><a href={`https://raw.githubusercontent.com/ccsb-scripps/AutoDock-Vina/${officialRevision}/${path}`} aria-label={t(`下载 ${file.path.split('/').pop()}`, `Download ${file.path.split('/').pop()}`)}>{t('下载', 'Download')}</a></td>
        </tr>;
      })}</tbody>
    </table>
    <p className="guide-official-files__note">{t('若下载后显示文本，右键“下载”选择“链接另存为”。', 'If the link opens as text, right-click “Download” and choose “Save link as”.')}</p>
  </section>;
}

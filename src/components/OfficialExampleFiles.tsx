import React from 'react';
import {officialExamples, officialRepository, officialRevision, type OfficialExampleId} from '../data/officialExamples';

export default function OfficialExampleFiles({example}: {example: OfficialExampleId}): React.JSX.Element {
  const entry = officialExamples[example];
  const folder = `example/${entry.folder}`;
  return <section className="guide-official-files" aria-labelledby="official-structure-files">
    <p>以下文件来自 AutoDock Vina 官方 GitHub 仓库，可按本节流程选择原始结构或准备后的 PDBQT。</p>
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
    <div className="guide-official-files__sources">
      <a href={`${officialRepository}/tree/${officialRevision}/${folder}`} target="_blank" rel="noopener noreferrer">查看官方示例目录</a>
      <a href={`${officialRepository}/tree/${officialRevision}/${folder}/solution`} target="_blank" rel="noopener noreferrer">查看官方参考结果与配置</a>
    </div>
    <p>{entry.note}</p>
    <p className="guide-official-files__note">如点击下载后显示文本，可右键“下载”选择“链接另存为”，并保留原扩展名。文件固定在官方提交 3c65c0b3e6c2；<a href="https://xuxinxi14.github.io/DockStart-Docs/example-inputs-manifest.json">输入校验清单</a>记录 SHA256。该冻结不追认历史截图使用了这些精确字节。</p>
  </section>;
}

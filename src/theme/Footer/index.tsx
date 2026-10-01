import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';

export default function Footer():ReactNode {
  return <footer className="guide-footer">
    <div className="guide-container guide-footer__inner">
      <p>Docking score 仅供结构结合趋势参考，不能替代实验验证。</p>
      <Link to="/">DockStart · 帮助文档</Link>
    </div>
  </footer>;
}

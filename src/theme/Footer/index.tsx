import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useGuideLocale from '../../components/useGuideLocale';

export default function Footer():ReactNode {
  const {t} = useGuideLocale();
  return <footer className="guide-footer">
    <div className="guide-container guide-footer__inner">
      <p>{t('Docking score 仅供结构结合趋势参考，不能替代实验验证。', 'Docking scores indicate modeled binding trends and cannot replace experimental validation.')}</p>
      <Link to="/">DockStart · {t('帮助文档', 'Documentation')}</Link>
    </div>
  </footer>;
}

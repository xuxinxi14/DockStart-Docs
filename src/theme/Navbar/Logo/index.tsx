import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useGuideLocale from '../../../components/useGuideLocale';

export default function NavbarLogo():ReactNode {
  const {t} = useGuideLocale();
  return <Link className="navbar__brand" to={useBaseUrl('/')} aria-label={t('DockStart 帮助文档首页', 'DockStart documentation home')}>
    <span className="guide-brand__name">DockStart</span>
    <span className="guide-brand__description">{t('帮助文档', 'Documentation')}</span>
  </Link>;
}

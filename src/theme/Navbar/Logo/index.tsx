import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarLogo():ReactNode {
  return <Link className="navbar__brand" to={useBaseUrl('/')} aria-label="DockStart 帮助文档首页">
    <span className="guide-brand__name">DockStart</span>
    <span className="guide-brand__description">帮助文档</span>
  </Link>;
}

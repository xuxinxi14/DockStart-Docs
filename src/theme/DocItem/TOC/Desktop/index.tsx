import React, {type ReactNode} from 'react';
import OriginalTOC from '@theme-original/DocItem/TOC/Desktop';

export default function DocItemTOCDesktop():ReactNode {
  return <aside className="guide-page-toc" aria-label="本页目录">
    <h2>本页目录</h2>
    <OriginalTOC/>
  </aside>;
}

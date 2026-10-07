import React, {type ReactNode} from 'react';
import OriginalTOC from '@theme-original/DocItem/TOC/Desktop';
import useGuideLocale from '../../../../components/useGuideLocale';

export default function DocItemTOCDesktop():ReactNode {
  const {t} = useGuideLocale();
  return <aside className="guide-page-toc" aria-label={t('本页目录', 'On this page')}>
    <h2>{t('本页目录', 'On this page')}</h2>
    <OriginalTOC/>
  </aside>;
}

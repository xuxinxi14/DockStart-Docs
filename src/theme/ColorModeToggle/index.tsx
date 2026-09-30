import React, {useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/ColorModeToggle';
import {useGuidePreferences, type GuideTheme} from '../../components/GuidePreferences';

const order:GuideTheme[]=['dark','light','prism'];
const labels={dark:'深海',light:'明昼',prism:'霓彩'};
function ThemeIcon({theme}:{theme:GuideTheme}) {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    {theme==='dark'?<path d="M20.5 14.5A9 9 0 0 1 9.5 3.5 9 9 0 1 0 20.5 14.5Z"/>:theme==='light'?<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>:<><path d="m12 2 9 10-9 10L3 12Z"/><path d="M3 12h18M12 2l-4 10 4 10 4-10Z"/></>}
  </svg>;
}

export default function ColorModeToggle({className,buttonClassName,onChange}:Props):ReactNode {
  const {theme,ready,chooseTheme}=useGuidePreferences();
  const next=order[(order.indexOf(theme)+1)%order.length]!;
  useEffect(()=>{if(ready) onChange(theme==='light'?'light':'dark')},[ready,theme,onChange]);
  const label=`当前主题：${labels[theme]}。点击切换为${labels[next]}主题`;
  return <div className={clsx('guide-theme-toggle',className)}><button className={clsx('clean-btn',buttonClassName)} type="button" disabled={!ready} title={label} aria-label={label} onClick={()=>chooseTheme(next)}><ThemeIcon theme={theme}/><span>{labels[theme]}</span></button></div>;
}

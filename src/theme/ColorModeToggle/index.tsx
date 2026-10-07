import React, {useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import type {Props} from '@theme/ColorModeToggle';
import {useGuidePreferences} from '../../components/GuidePreferences';
import useGuideLocale from '../../components/useGuideLocale';

export default function ColorModeToggle({className, buttonClassName, onChange}:Props):ReactNode {
  const {theme, ready, chooseTheme} = useGuidePreferences();
  const {t} = useGuideLocale();
  const next = theme === 'light' ? 'dark' : 'light';
  useEffect(() => {if (ready) onChange(theme)}, [ready, theme, onChange]);
  const label = t(`当前为${theme === 'light' ? '浅色' : '深色'}主题，切换为${next === 'light' ? '浅色' : '深色'}主题`, `Current theme: ${theme}. Switch to ${next} theme`);
  return <div className={clsx('guide-theme-toggle', className)}>
    <button className={clsx('clean-btn', buttonClassName)} type="button" disabled={!ready} title={label} aria-label={label} onClick={() => chooseTheme(next)}>
      {theme === 'light' ? <IconLightMode/> : <IconDarkMode/>}
    </button>
  </div>;
}

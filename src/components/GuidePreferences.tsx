import React, {createContext, useContext, useEffect, useState, type ReactNode} from 'react';

export type GuideTheme = 'dark' | 'light' | 'prism';
const themeKey = 'dockstart-guide-theme';
const themes: GuideTheme[] = ['dark', 'light', 'prism'];
const Preferences = createContext<{theme:GuideTheme; ready:boolean; chooseTheme:(theme:GuideTheme)=>void}>({theme:'dark',ready:false,chooseTheme:()=>{}});

export function GuidePreferences({children}:{children:ReactNode}) {
  const [theme,setTheme] = useState<GuideTheme>('dark');
  const [ready,setReady] = useState(false);
  useEffect(()=>{
    let saved: string | null = null;
    try {saved=localStorage.getItem(themeKey)} catch {}
    const initial=themes.includes(saved as GuideTheme)?saved as GuideTheme:document.documentElement.dataset.theme==='light'?'light':'dark';
    setTheme(initial);
    document.documentElement.dataset.guideTheme=initial;
    setReady(true);
  },[]);
  const chooseTheme=(next:GuideTheme)=>{
    setTheme(next);
    document.documentElement.dataset.guideTheme=next;
    try {localStorage.setItem(themeKey,next)} catch {}
  };
  return <Preferences.Provider value={{theme,ready,chooseTheme}}>{children}</Preferences.Provider>;
}

export const useGuidePreferences=()=>useContext(Preferences);

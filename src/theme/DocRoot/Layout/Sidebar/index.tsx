import React, {useEffect, useRef, useState, type ReactNode, type PointerEvent, type KeyboardEvent} from 'react';
import OriginalSidebar from '@theme-original/DocRoot/Layout/Sidebar';
import type {Props} from '@theme/DocRoot/Layout/Sidebar';

const minimum=224;
const defaultWidth=296;
const storageKey='dockstart-guide-sidebar-width';
const maximum=()=>Math.min(480, Math.max(minimum,Math.floor(window.innerWidth*.43)));

export default function ResizableSidebar(props:Props):ReactNode {
  const [width,setWidth]=useState(defaultWidth);
  const [maxWidth,setMaxWidth]=useState(480);
  const drag=useRef<{pointerId:number;startX:number;startWidth:number}|null>(null);
  const current=useRef(defaultWidth);
  const apply=(next:number,persist=false)=>{
    const size=Math.max(minimum,Math.min(maximum(),next));
    current.current=size;
    setWidth(size);
    document.documentElement.style.setProperty('--doc-sidebar-width',`${size}px`);
    if(persist) try {localStorage.setItem(storageKey,String(size))} catch {}
  };
  useEffect(()=>{
    let saved=defaultWidth;
    try {const stored=Number(localStorage.getItem(storageKey)); if(Number.isFinite(stored)&&stored>=minimum) saved=stored} catch {}
    apply(saved);
    setMaxWidth(maximum());
    const resize=()=>{setMaxWidth(maximum());apply(current.current)};
    window.addEventListener('resize',resize);
    return ()=>{window.removeEventListener('resize',resize);delete document.documentElement.dataset.sidebarResizing};
  },[]);
  const stop=(event:PointerEvent<HTMLDivElement>)=>{
    if(!drag.current || event.pointerId!==drag.current.pointerId) return;
    drag.current=null;
    delete document.documentElement.dataset.sidebarResizing;
    apply(current.current,true);
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const keydown=(event:KeyboardEvent<HTMLDivElement>)=>{
    const increment=event.shiftKey?48:16;
    const next=event.key==='ArrowLeft'?width-increment:event.key==='ArrowRight'?width+increment:event.key==='Home'?minimum:event.key==='End'?maximum():null;
    if(next!==null){event.preventDefault();apply(next,true)}
  };
  return <><OriginalSidebar {...props}/>{!props.hiddenSidebarContainer&&<div className="guide-sidebar-resizer" role="separator" aria-label="调整左侧目录宽度" aria-orientation="vertical" aria-valuemin={minimum} aria-valuemax={maxWidth} aria-valuenow={Math.round(width)} aria-valuetext={`${Math.round(width)} 像素`} tabIndex={0} title="拖动调整目录宽度；双击恢复默认宽度" onDoubleClick={()=>apply(defaultWidth,true)} onKeyDown={keydown} onPointerDown={event=>{
    if(event.button!==0)return;
    event.preventDefault();
    drag.current={pointerId:event.pointerId,startX:event.clientX,startWidth:current.current};
    event.currentTarget.setPointerCapture(event.pointerId);
    document.documentElement.dataset.sidebarResizing='true';
  }} onPointerMove={event=>{if(drag.current&&event.pointerId===drag.current.pointerId)apply(drag.current.startWidth+event.clientX-drag.current.startX)}} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}/>}</>;
}

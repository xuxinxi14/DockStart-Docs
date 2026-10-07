import React, {useEffect, useRef, useState, type ImgHTMLAttributes} from 'react';
import useGuideLocale from './useGuideLocale';

type Phase = 'loading' | 'retrying' | 'ready' | 'failed';
const MAX_AUTO_RETRIES = 2;
const LOAD_TIMEOUT_MS = 25000;

// Keep the original resource and base URL; bypass a cached failure on retries.
function retryUrl(src: string, attempt: number): string {
  if (!attempt || /^(data:|blob:)/i.test(src)) return src;
  const hashAt = src.indexOf('#');
  const path = hashAt < 0 ? src : src.slice(0, hashAt);
  const hash = hashAt < 0 ? '' : src.slice(hashAt);
  return `${path}${path.includes('?') ? '&' : '?'}dockstart_image_retry=${attempt}${hash}`;
}

export default function ReliableImage({
  src = '', alt, className, loading, onLoad, onError, ...props
}: ImgHTMLAttributes<HTMLImageElement>): React.JSX.Element {
  const {t} = useGuideLocale();
  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);
  const retriesUsed = useRef(0);
  const [active, setActive] = useState(loading === 'eager');
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    if (imageRef.current?.naturalWidth) setPhase('ready');
    if (!('IntersectionObserver' in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setActive(true);
        observer.disconnect();
      }
    }, {rootMargin: '600px'});
    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || phase === 'ready' || phase === 'failed') return;
    if (phase === 'retrying') {
      if (retriesUsed.current >= MAX_AUTO_RETRIES) {
        setPhase('failed');
        return;
      }
      const timer = window.setTimeout(() => {
        retriesUsed.current += 1;
        setAttempt(value => value + 1);
        setPhase('loading');
      }, (retriesUsed.current + 1) * 1000);
      return () => window.clearTimeout(timer);
    }
    // A cached image can finish before React attaches its event handlers.
    const image = imageRef.current;
    if (image?.complete) {
      setPhase(image.naturalWidth ? 'ready' : 'retrying');
      return;
    }
    const timer = window.setTimeout(() => setPhase('retrying'), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [active, attempt, phase]);

  return (
    <span ref={frameRef} className="guide-image-frame">
      {/* The dimensions provided by Docusaurus reserve space while loading. */}
      <img
        {...props}
        key={attempt}
        ref={imageRef}
        src={retryUrl(src, attempt)}
        alt={alt}
        className={className}
        loading={active ? 'eager' : loading ?? 'lazy'}
        decoding="async"
        onLoad={event => {setPhase('ready'); onLoad?.(event);}}
        onError={event => {setPhase('retrying'); onError?.(event);}}
      />
      {active && phase !== 'ready' && (
        <span className="guide-image-status" role="status" aria-live="polite">
          <span>{phase === 'failed'
            ? t('图片暂时无法加载，请检查网络后重试。', 'The image could not load. Check your connection and try again.')
            : phase === 'retrying' ? t('图片加载失败，正在自动重试…', 'Image failed to load. Retrying…') : t('正在加载图片…', 'Loading image…')}</span>
          {phase === 'failed' && (
            <span className="guide-image-actions">
              <button type="button" onClick={() => {
                retriesUsed.current = 0;
                setAttempt(value => value + 1);
                setPhase('loading');
              }}>{t('重新加载图片', 'Retry image')}</button>
              <a href={src} target="_blank" rel="noopener noreferrer">{t('打开原图', 'Open original')}</a>
            </span>
          )}
        </span>
      )}
    </span>
  );
}

import {useCallback, useEffect, useRef, useState} from 'react';

export default function useDemoPlayback(frameCount: number) {
  const rootRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const visibility = () => {if (document.hidden) setPlaying(false);};
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {observer.disconnect(); document.removeEventListener('visibilitychange', visibility);};
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => setStep((current) => Math.min(current + 1, frameCount - 1)), 800);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion, frameCount]);

  useEffect(() => {if (step >= frameCount - 1) setPlaying(false);}, [step, frameCount]);

  const rewind = useCallback(() => {setPlaying(false); setStep(0);}, []);
  const advance = () => {setPlaying(false); setStep((current) => Math.min(current + 1, frameCount - 1));};
  const toggle = () => {
    if (reducedMotion) return;
    if (step >= frameCount - 1) setStep(0);
    setPlaying((current) => !current);
  };
  return {rootRef, step, playing, reducedMotion, rewind, advance, toggle};
}

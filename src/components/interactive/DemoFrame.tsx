import React, {useId, type ReactNode, type Ref} from 'react';
import useGuideLocale from '../useGuideLocale';
import {projectPoint, type Vec3, type View} from './teachingModels.mjs';
import styles from './styles.module.css';

type FrameProps = {
  name: string; title: string; instruction: string; caption: string;
  onReset: () => void; children: ReactNode; conclusion: ReactNode;
  rootRef?: Ref<HTMLElement>;
};

export default function DemoFrame({name, title, instruction, caption, onReset, children, conclusion, rootRef}: FrameProps) {
  const {t} = useGuideLocale();
  const titleId = useId();
  return <section className={styles.demo} aria-labelledby={titleId} data-demo={name} ref={rootRef}>
    <div className={styles.heading}>
      <div>
        <span className={styles.eyebrow}>{t('动手理解', 'Explore the concept')}</span>
        <h3 id={titleId}>{title}</h3>
      </div>
      <button type="button" className={styles.reset} onClick={onReset}>{t('重置', 'Reset')}</button>
    </div>
    <p className={styles.instruction}>{instruction}</p>
    {children}
    <div className={styles.conclusion}>{conclusion}</div>
    <p className={styles.caption}>{caption}</p>
  </section>;
}

export function RangeControl({label, code, value, min, max, step = 1, unit = '', disabled = false, onChange}: {
  label: string; code?: string; value: number; min: number; max: number; step?: number;
  unit?: string; disabled?: boolean; onChange: (value: number) => void;
}) {
  const id = useId();
  const digits = step < 1 ? 1 : 0;
  const display = `${value.toFixed(digits)}${unit ? ` ${unit}` : ''}`;
  return <div className={styles.range}>
    <div className={`${styles.rangeLabel} ${code ? styles.rangeWithCode : ''}`}>
      <label htmlFor={id}><span>{label}</span>{code && <small>{code}</small>}</label>
      <output htmlFor={id}>{display}</output>
    </div>
    <input id={id} type="range" min={min} max={max} step={step} value={value} disabled={disabled}
      aria-label={`${label}${code ? ` ${code}` : ''}`} aria-valuetext={display} onChange={(event) => onChange(Number(event.target.value))} />
  </div>;
}

export function Choices({label, options, value, onChange, columns = options.length}: {
  label: string; options: {value: string; label: string}[]; value: string; onChange: (value: string) => void; columns?: number;
}) {
  return <div className={styles.choices} role="group" aria-label={label} style={{gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`}}>
    {options.map((option) => <button type="button" key={option.value} aria-pressed={value === option.value}
      onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>;
}

export function ViewChoices({value, onChange}: {value: View; onChange: (value: View) => void}) {
  const {t} = useGuideLocale();
  return <Choices label={t('观察视角', 'Viewing angle')} value={value} onChange={(next) => onChange(next as View)}
    options={[{value: 'oblique', label: t('立体视角', 'Oblique view')}, {value: 'front', label: t('正面视角', 'Front view')}]} />;
}

export function Scene({title, description, children, viewBox = '0 0 560 280', className = ''}: {
  title: string; description: string; children: ReactNode; viewBox?: string; className?: string;
}) {
  const id = useId();
  return <svg className={`${styles.scene} ${className}`} viewBox={viewBox} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{title}</title>
    <desc id={`${id}-desc`}>{description}</desc>
    {children}
  </svg>;
}

export function canvasPoint(point: Vec3, view: View, scale = 32): [number, number] {
  const [x, y] = projectPoint(point, view);
  return [280 + x * scale, 140 - y * scale];
}

import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {Choices, RangeControl, Scene, ViewChoices} from './DemoFrame';
import {projectPoint, type View} from './teachingModels.mjs';
import {stereoAtoms, stereoBonds, transformStereochemistry} from './teachingBasics.mjs';
import styles from './styles.module.css';

export default function StereochemistryExplorer() {
  const {t} = useGuideLocale();
  const [mode, setMode] = useState('torsion');
  const [angle, setAngle] = useState(60);
  const [view, setView] = useState<View>('oblique');
  const mirror = mode === 'mirror';
  const changed = transformStereochemistry(mirror ? {mirror: true, rotation: angle} : {torsion: angle});
  const reset = () => {setMode('torsion'); setAngle(60); setView('oblique');};
  const atoms = [stereoAtoms, changed].map((points, side) => points.map((point) => {
    const [x, y] = projectPoint(point, view);
    return [90 + side * 180 + x * 23, 130 - y * 23];
  }));
  const depth = (point: number[]) => {
    const yaw = view === 'front' ? 0 : -Math.PI / 6;
    const pitch = view === 'front' ? 0 : 22 * Math.PI / 180;
    return point[1] * Math.sin(pitch) + (-point[0] * Math.sin(yaw) + point[2] * Math.cos(yaw)) * Math.cos(pitch);
  };
  return <DemoFrame name="stereochemistry" title={t('改变形状，还是改变手性？', 'Change a shape, or change handedness?')}
    instruction={t('先转动支链，再切换镜像对照，观察四个不同基团 A–D。', 'Rotate the tail, then compare a mirror image. Follow the four distinct groups A–D.')}
    caption={t('同一个四面体中心 · A–D 表示四种不同基团', 'One tetrahedral center · A–D represent four distinct groups')}
    onReset={reset} conclusion={<p>{mirror
      ? t('右侧是相反手性的镜像。整体转动不会把它变成左侧的空间构型。', 'The right structure is a mirror image with opposite handedness. Whole-body rotation cannot turn it into the left configuration.')
      : t('支链转动改变了构象，中心周围 A–D 的手性关系保持不变。', 'Rotating the tail changes the conformation while preserving the handed arrangement of A–D around the center.')}</p>}>
    <div className={styles.visualLayout}>
      <div className={styles.visualPanel}>
        <Scene viewBox="0 0 360 240" className={styles.comparisonScene} title={t('构象与镜像对照', 'Conformation and mirror comparison')}
          description={t('两侧使用同样的基团标记。右侧可以转动支链，或显示镜像并整体旋转。', 'Both structures use the same group labels. The right tail can rotate, or the mirror structure can rotate as a whole.')}>
          <line x1="180" y1="52" x2="180" y2="221" className={styles.distanceLine} />
          {atoms.map((points, side) => <g key={side} data-structure={side === 0 ? 'reference' : 'changed'}>
            <text x={90 + side * 180} y="30" textAnchor="middle" className={styles.diagramLabel}>{side === 0 ? t('原结构', 'Reference') : mirror ? t('镜像', 'Mirror') : t('转动支链', 'Turned tail')}</text>
            {stereoBonds.map(([a, b]) => {
              const [ax, ay] = points[a], [bx, by] = points[b];
              const front = a === 0 ? depth((side === 0 ? stereoAtoms : changed)[b]) : 0;
              const active = side === 1 && (mirror || a >= 4);
              if (front > 0.4) {
                const length = Math.hypot(bx - ax, by - ay);
                const dx = -(by - ay) / length * 5, dy = (bx - ax) / length * 5;
                return <polygon key={`${a}-${b}`} points={`${ax},${ay} ${bx + dx},${by + dy} ${bx - dx},${by - dy}`} className={active ? styles.frontAccentBond : styles.frontBond} />;
              }
              return <line key={`${a}-${b}`} x1={ax} y1={ay} x2={bx} y2={by}
                className={active ? styles.accentBond : styles.bond} strokeDasharray={front < -0.4 ? '2 4' : undefined} />;
            })}
            {points.map(([x, y], index) => <g key={index}>
              <circle cx={x} cy={y} r={index === 0 ? 8 : index <= 4 ? 13 : 5}
                className={side === 1 && index > 4 ? styles.accentAtom : styles.atom} />
              {index > 0 && index <= 4 && <text x={x} y={y + 6} textAnchor="middle" className={styles.atomLetter}>{'ABCD'[index - 1]}</text>}
            </g>)}
          </g>)}
        </Scene>
        <p className={styles.diagramHint}>{t('楔形键朝向你，虚线键远离你。', 'Wedges point toward you; dashed bonds point away.')}</p>
        <ViewChoices value={view} onChange={setView} />
      </div>
      <div className={styles.controlPanel}>
        <Choices label={t('比较方式', 'Comparison mode')} value={mode}
          options={[{value: 'torsion', label: t('单键转动', 'Bond rotation')}, {value: 'mirror', label: t('镜像对照', 'Mirror image')}]}
          onChange={(next) => {setMode(next); setAngle(next === 'mirror' ? 0 : 60);}} />
        <RangeControl label={mirror ? t('镜像整体转动', 'Rotate the mirror') : t('支链转动', 'Tail rotation')}
          value={angle} min={-180} max={180} step={5} unit="°" onChange={setAngle} />
        <p className={styles.readout} aria-live="polite"><small>{t('中心的手性关系', 'Handedness at the center')}</small>
          <strong>{mirror ? t('相反', 'Opposite') : t('保持不变', 'Preserved')}</strong></p>
      </div>
    </div>
  </DemoFrame>;
}

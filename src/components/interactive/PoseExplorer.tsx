import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {canvasPoint, Choices, RangeControl, Scene, ViewChoices} from './DemoFrame';
import {ligandAtoms, ligandBonds, transformLigand, type View} from './teachingModels.mjs';
import styles from './styles.module.css';

type Mode = 'translation' | 'orientation' | 'torsion';

export default function PoseExplorer({initialMode = 'translation'}: {initialMode?: Mode}) {
  const {t} = useGuideLocale();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [value, setValue] = useState(0);
  const [view, setView] = useState<View>('oblique');
  const parameters = {[mode]: value};
  const atoms = transformLigand(parameters).map((point) => canvasPoint(point, view));
  const original = ligandAtoms.map((point) => canvasPoint(point, view));
  const labels = {
    translation: t('移动位置', 'Translate'),
    orientation: t('改变朝向', 'Orient'),
    torsion: t('转动一个键', 'Twist a bond'),
  };
  const lessons = {
    translation: t('整个配体一起移动，内部形状保持不变。', 'The whole ligand moves together; its internal shape stays the same.'),
    orientation: t('整个配体改变朝向，原子之间的距离保持不变。', 'The whole ligand changes orientation; distances between its atoms stay the same.'),
    torsion: t('围绕高亮的键转动一侧原子，改变配体内部形状。', 'Atoms on one side rotate around the highlighted bond, changing the ligand’s internal shape.'),
  };
  const reset = () => {setMode(initialMode); setValue(0); setView('oblique');};
  return <DemoFrame name="pose" title={t('一个配体，三种变化', 'One ligand, three kinds of change')}
    instruction={t('选一种变化，拖动滑块，观察实线相对虚线的位置。', 'Choose a change and drag the slider. Compare the solid shape with the dashed original.')}
    onReset={reset} conclusion={<p>{lessons[mode]}</p>}
    caption={t('简化配体示意 · 视角只改变观察方向', 'Simplified ligand · Viewing angle changes the display only')}>
    <Choices label={t('配体的变化方式', 'Kind of ligand movement')} value={mode}
      onChange={(next) => {setMode(next as Mode); setValue(0);}}
      options={Object.entries(labels).map(([key, label]) => ({value: key, label}))} />
    <Scene title={t('配体变化示意', 'Ligand movement diagram')} compactViewBox={mode === 'translation' ? '115 15 350 250' : '160 15 250 250'}
      description={`${labels[mode]}: ${value} ${mode === 'translation' ? 'Å' : '°'}. ${lessons[mode]}`}>
      {(['X', 'Y', 'Z'] as const).map((axis, index) => {
        const vector: [number, number, number] = [0, 0, 0]; vector[index] = 1.5;
        const projected = canvasPoint(vector, view);
        const x = 60 + projected[0] - 280;
        const y = 220 + projected[1] - 140;
        return <g key={axis}><line x1="60" y1="220" x2={x} y2={y} className={styles.axis} />
          {(view !== 'front' || axis !== 'Z') && <text x={x + 5} y={y - 5} className={styles.svgLabel}>{axis}</text>}</g>;
      })}
      <g className={styles.ghost}>
        {ligandBonds.map(([a, b]) => <line key={`${a}-${b}`} x1={original[a][0]} y1={original[a][1]} x2={original[b][0]} y2={original[b][1]} />)}
        {original.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="8" />)}
      </g>
      {ligandBonds.map(([a, b]) => <line key={`${a}-${b}`} x1={atoms[a][0]} y1={atoms[a][1]} x2={atoms[b][0]} y2={atoms[b][1]}
        className={mode === 'torsion' && a === 2 ? styles.accentBond : styles.bond} />)}
      {atoms.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="9"
        className={mode !== 'torsion' || index > 3 ? styles.accentAtom : styles.atom} />)}
      {mode === 'torsion' && <line x1={atoms[2][0] * 2 - atoms[3][0]} y1={atoms[2][1] * 2 - atoms[3][1]}
        x2={atoms[3][0] * 2 - atoms[2][0]} y2={atoms[3][1] * 2 - atoms[2][1]}
        className={styles.ghost} />}
    </Scene>
    <div className={styles.legend}>
      <span><i className={styles.dash} aria-hidden="true" />{t('原始位置', 'Original shape')}</span>
      <span><i className={styles.dot} aria-hidden="true" />{t('当前变化', 'Current change')}</span>
    </div>
    <RangeControl label={mode === 'translation' ? t('沿 X 轴移动', 'Move along X') : mode === 'orientation' ? t('整体转动角度', 'Whole-ligand rotation') : t('内部扭转角度', 'Internal torsion angle')}
      value={value} min={mode === 'translation' ? -2 : -180} max={mode === 'translation' ? 2 : 180}
      step={mode === 'translation' ? 0.1 : 5} unit={mode === 'translation' ? 'Å' : '°'} onChange={setValue} />
    <ViewChoices value={view} onChange={setView} />
  </DemoFrame>;
}

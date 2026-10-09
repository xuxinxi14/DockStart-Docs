import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {Choices, RangeControl, Scene, ViewChoices, canvasPoint} from './DemoFrame';
import {ligandAtoms, ligandBonds, transformLigand, type View} from './teachingModels.mjs';
import {fixedFrameRmsd} from './teachingBasics.mjs';
import styles from './styles.module.css';

export default function RmsdExplorer() {
  const {t} = useGuideLocale();
  const [mode, setMode] = useState('translation');
  const [value, setValue] = useState(1);
  const [view, setView] = useState<View>('oblique');
  const candidate = transformLigand({[mode]: value});
  const result = fixedFrameRmsd(ligandAtoms, candidate);
  const reference = ligandAtoms.map((point) => canvasPoint(point, view));
  const current = candidate.map((point) => canvasPoint(point, view));
  const translation = mode === 'translation';
  const reset = () => {setMode('translation'); setValue(1); setView('oblique');};
  return <DemoFrame name="rmsd" title={t('对着固定参考，看偏差如何变化', 'Measure deviation from a fixed reference')}
    instruction={t('移动绿色构象。细线连接对应原子，参考构象始终保持不动。', 'Move the green pose. Thin lines connect corresponding atoms; the reference stays fixed.')}
    caption={t('固定原子对应 · 共同坐标系 · 不做叠合', 'Fixed atom correspondence · Shared coordinate frame · No alignment')}
    onReset={reset} conclusion={<p>{translation
      ? t('整体平移时，每个原子移动相同距离，RMSD 就等于平移距离的绝对值。', 'For a pure translation, every atom moves by the same distance, so RMSD equals the absolute translation distance.')
      : mode === 'orientation'
        ? t('整体转动没有改变内部形状，但原子在共同坐标系中的位置变了，因此 RMSD 仍会变化。', 'Whole-body rotation preserves internal shape, but changes positions in the shared coordinate frame, so RMSD changes.')
        : t('只有支链上的原子移动时，RMSD 仍对全部六个原子的平方偏差取平均。', 'When only tail atoms move, RMSD still averages the squared deviations of all six atoms.')}</p>}>
    <div className={styles.visualLayout}>
      <div className={styles.visualPanel}>
        <Scene viewBox={translation ? '110 45 365 190' : '140 0 280 285'} className={translation ? styles.rmsdTranslationScene : styles.rmsdRotationScene}
          title={t('参考构象与当前构象的逐原子偏差', 'Per-atom deviations between reference and current poses')}
          description={`${t('六个原子固定对应，不进行坐标叠合。当前 RMSD', 'Six fixed atom pairs, without coordinate alignment. Current RMSD')} ${result.rmsd.toFixed(2)} Å`}>
          <g data-part="reference">{ligandBonds.map(([a, b]) => <line key={`${a}-${b}`} x1={reference[a][0]} y1={reference[a][1]} x2={reference[b][0]} y2={reference[b][1]} className={styles.referenceLine} />)}
            {reference.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" className={styles.referenceLine} />)}</g>
          {reference.map(([x, y], i) => <line key={i} x1={x} y1={y} x2={current[i][0]} y2={current[i][1]} className={styles.matchLine} data-distance={result.distances[i].toFixed(4)} />)}
          <g data-part="candidate">{ligandBonds.map(([a, b]) => <line key={`${a}-${b}`} x1={current[a][0]} y1={current[a][1]} x2={current[b][0]} y2={current[b][1]} className={styles.accentBond} />)}
            {current.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="7" className={styles.accentAtom} />
              <text x={x} y={y - 13} textAnchor="middle" className={styles.numberLabel}>{i + 1}</text></g>)}</g>
        </Scene>
        <div className={styles.legend}>
          <span><i className={styles.dash} />{t('固定参考', 'Fixed reference')}</span>
          <span><i className={styles.dot} />{t('当前构象', 'Current pose')}</span>
          <span><i className={`${styles.dash} ${styles.greenDash}`} />{t('对应原子', 'Paired atoms')}</span>
        </div>
        <ViewChoices value={view} onChange={setView} />
      </div>
      <div className={styles.controlPanel}>
        <Choices label={t('改变方式', 'Transformation')} value={mode}
          options={[{value: 'translation', label: t('平移', 'Translate')}, {value: 'orientation', label: t('转动', 'Rotate')}, {value: 'torsion', label: t('扭转', 'Twist')}]}
          onChange={(next) => {setMode(next); setValue(next === 'translation' ? 1 : 60);}} />
        <RangeControl label={translation ? t('整体平移', 'Whole-body translation') : mode === 'orientation' ? t('整体转动', 'Whole-body rotation') : t('单键扭转', 'Bond torsion')}
          value={value} min={translation ? -2 : -180} max={translation ? 2 : 180} step={translation ? 0.1 : 5} unit={translation ? 'Å' : '°'} onChange={setValue} />
        <p className={styles.readout} aria-live="polite"><small>RMSD</small><strong data-rmsd={result.rmsd.toFixed(4)}>{result.rmsd.toFixed(2)} Å</strong></p>
        <p className={styles.formula}>RMSD = √[(d₁² + … + d₆²) / 6]</p>
        <p className={styles.formula}>{t('d 表示一对对应原子之间的三维距离。', 'd is the 3D distance between a corresponding atom pair.')}</p>
      </div>
    </div>
  </DemoFrame>;
}

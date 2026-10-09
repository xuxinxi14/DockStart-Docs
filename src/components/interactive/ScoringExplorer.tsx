import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {Choices, RangeControl, Scene} from './DemoFrame';
import {pairScoreIllustration, type PairKind} from './teachingBasics.mjs';
import styles from './styles.module.css';

export default function ScoringExplorer() {
  const {t} = useGuideLocale();
  const [distance, setDistance] = useState(3.8);
  const [kind, setKind] = useState<PairKind>('steric');
  const result = pairScoreIllustration(distance, kind);
  const curve = Array.from({length: 105}, (_, index) => ({distance: 1.8 + index * 0.05, ...pairScoreIllustration(1.8 + index * 0.05, kind)}));
  const plotX = (separation: number) => 44 + (separation - 1.8) / 5.2 * 252;
  const plotY = (score: number) => 270 - (score + 2) / 10 * 140;
  const path = (component: 'repulsion' | 'attraction' | 'total') => curve.map((entry, index) => `${index === 0 ? 'M' : 'L'}${plotX(entry.distance).toFixed(2)},${plotY(entry[component]).toFixed(2)}`).join(' ');
  const reset = () => {setDistance(3.8); setKind('steric');};
  return <DemoFrame name="scoring" title={t('靠得更近，评分一定更低吗？', 'Does closer always mean a lower score?')}
    instruction={t('拖动原子间距，让上方接触图与下方曲线一起变化。', 'Change the atom separation to move the contact diagram and curve marker together.')}
    caption={t('定性距离模型 · 示意评分无单位', 'Qualitative distance model · The illustrated score has no units')}
    onReset={reset} conclusion={<p>{result.gap < -0.5
      ? t('过近时排斥迅速增加，合成评分升高。把原子挤在一起并不会更有利。', 'At very short distances, repulsion rises quickly and increases the combined score. Squeezing atoms together is unfavorable.')
      : distance > 6
        ? t('远离之后，局部接触贡献趋于减弱。', 'At a larger separation, the local contact contribution weakens.')
        : t('合适距离处的有利接触与过近排斥共同决定这条示意曲线。完整评分还要汇总其他贡献。', 'Favorable contact and short-range repulsion together shape this curve. A complete score also includes other contributions.')}</p>}>
    <div className={styles.visualLayout}>
      <div className={styles.visualPanel}>
        <Scene viewBox="0 0 320 325" className={styles.squareScene} title={t('原子距离与示意评分曲线', 'Atom separation and an illustrated score curve')}
          description={t('绿色曲线为合成示意评分，棕色为排斥，虚线为有利接触。标记与间距联动。', 'The green curve is the combined illustrative score, brown is repulsion, and the dashed curve is favorable contact. The marker follows the atom separation.')}>
          <circle cx="70" cy="60" r="42.5" className={result.gap < 0 ? styles.clashEnvelope : styles.contactEnvelope} />
          <circle cx={70 + distance * 25} cy="60" r="42.5" className={result.gap < 0 ? styles.clashEnvelope : styles.contactEnvelope} />
          <circle cx="70" cy="60" r="10" className={styles.atom} />
          <circle cx={70 + distance * 25} cy="60" r="10" className={styles.accentAtom} />
          <line x1="70" y1="114" x2={70 + distance * 25} y2="114" className={styles.distanceLine} />
          <text x={70 + distance * 12.5} y="106" textAnchor="middle" className={styles.diagramLabel}>{distance.toFixed(1)} Å</text>
          {[-2, 0, 4, 8].map((value) => <g key={value}>
            <line x1="44" y1={plotY(value)} x2="296" y2={plotY(value)} className={styles.axis} />
            <text x="35" y={plotY(value) + 5} textAnchor="end" className={styles.diagramLabel}>{value}</text>
          </g>)}
          <path d={path('repulsion')} className={styles.repulsionLine} />
          <path d={path('attraction')} className={styles.attractionLine} />
          <path d={path('total')} className={styles.plotLine} />
          <line x1={plotX(distance)} y1="130" x2={plotX(distance)} y2="270" className={styles.distanceLine} />
          <circle cx={plotX(distance)} cy={plotY(result.total)} r="5" className={styles.accentAtom} data-score={result.total.toFixed(4)} />
          {[2, 4, 6].map((value) => <text key={value} x={plotX(value)} y="292" textAnchor="middle" className={styles.diagramLabel}>{value}</text>)}
          <text x="172" y="317" textAnchor="middle" className={styles.diagramLabel}>{t('原子间距 / Å', 'Atom separation / Å')}</text>
        </Scene>
        <div className={styles.legend}>
          <span><i className={styles.dot} />{t('合成评分', 'Combined')}</span>
          <span><i className={`${styles.dot} ${styles.warmDot}`} />{t('排斥', 'Repulsion')}</span>
          <span><i className={styles.dash} />{t('有利接触', 'Favorable contact')}</span>
        </div>
      </div>
      <div className={styles.controlPanel}>
        <Choices label={t('距离示例', 'Distance examples')} value={distance === 1.9 ? 'close' : distance === 3.8 ? 'contact' : distance === 6.6 ? 'far' : ''}
          options={[{value: 'close', label: t('过近', 'Too close')}, {value: 'contact', label: t('接触', 'Contact')}, {value: 'far', label: t('远离', 'Far apart')}]}
          onChange={(value) => setDistance(value === 'close' ? 1.9 : value === 'contact' ? 3.8 : 6.6)} />
        <RangeControl label={t('原子间距', 'Atom separation')} value={distance} min={1.8} max={7} step={0.1} unit="Å" onChange={setDistance} />
        <Choices label={t('示意接触类型', 'Illustrative contact type')} columns={1} value={kind}
          options={[{value: 'steric', label: t('基本接触', 'Basic contact')}, {value: 'nonpolar', label: t('增加非极性接触', 'Add nonpolar contact')}, {value: 'hbond', label: t('增加供体–受体接触', 'Add donor–acceptor contact')}]}
          onChange={(value) => setKind(value as PairKind)} />
        <p className={styles.readout} aria-live="polite"><small>{t('合成示意评分（无单位）', 'Combined illustrative score (unitless)')}</small><strong>{result.total.toFixed(2)}</strong></p>
      </div>
    </div>
    <div className={`${styles.metrics} ${styles.threeMetrics}`}>
      <span><small>{t('原子间距', 'Atom separation')}</small>{distance.toFixed(1)} Å</span>
      <span><small>{t('排斥贡献', 'Repulsion contribution')}</small>{result.repulsion.toFixed(2)}</span>
      <span><small>{t('有利接触贡献', 'Favorable contribution')}</small>{result.attraction.toFixed(2)}</span>
    </div>
  </DemoFrame>;
}

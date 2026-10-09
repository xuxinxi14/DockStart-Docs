import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {Choices, RangeControl, Scene} from './DemoFrame';
import {contactGeometry} from './teachingBasics.mjs';
import styles from './styles.module.css';

export default function InteractionExplorer() {
  const {t} = useGuideLocale();
  const [distance, setDistance] = useState(3);
  const [rotation, setRotation] = useState(0);
  const [donor, setDonor] = useState(true);
  const contact = contactGeometry(distance, rotation, donor);
  const ox = 65, cy = 120, scale = 32, nx = ox + distance * scale;
  const hx = ox + contact.hydrogen[0] * scale, hy = cy - contact.hydrogen[1] * scale;
  const reset = () => {setDistance(3); setRotation(0); setDonor(true);};
  const conclusions = {
    possible: t('距离和方向都合适时，这对基团可能形成氢键。', 'At a suitable distance and direction, these groups may form a hydrogen bond.'),
    clash: t('靠得太近会产生拥挤。更多接触不一定更有利。', 'Moving too close causes a clash. More contact is not always favorable.'),
    far: t('距离较远时，这对基团的局部接触减弱。', 'At a larger separation, local contact between these groups weakens.'),
    incompatible: t('距离合适还不够：这里的 C 基团不能提供 N–H 氢键供体。', 'Distance alone is insufficient: this C group does not provide an N–H hydrogen-bond donor.'),
    short: t('这对基团距离偏近。继续调整间距，观察接触状态如何变化。', 'These groups are close together. Adjust their separation to explore how the contact changes.'),
    misaligned: t('改变 N–H 的方向，就可能失去原来合适的氢键几何。', 'Turning the N–H group can disrupt otherwise suitable hydrogen-bond geometry.'),
  };
  const statuses = {
    possible: t('可能的氢键', 'Possible H bond'), clash: t('局部拥挤', 'Local clash'),
    far: t('距离较远', 'Far apart'), incompatible: t('基团不匹配', 'Incompatible groups'),
    short: t('距离偏近', 'Close separation'),
    misaligned: t('方向不合适', 'Misaligned'),
  };
  const examples = [
    {value: 'far', label: t('远离', 'Far apart'), distance: 5, rotation: 0},
    {value: 'near', label: t('接近', 'Approach'), distance: 3, rotation: 0},
    {value: 'clash', label: t('拥挤', 'Clash'), distance: 1.8, rotation: 0},
    {value: 'angle', label: t('转动方向', 'Turn the group'), distance: 3, rotation: 85},
  ];
  return <DemoFrame name="interactions" title={t('接近之后，还要看方向', 'Distance and direction both matter')}
    instruction={t('移动配体上的基团，观察距离、方向和局部拥挤。', 'Move a ligand group to explore distance, direction, and local clashes.')}
    caption={t('局部接触几何示意', 'Illustrated local-contact geometry')} onReset={reset}
    conclusion={<p>{conclusions[contact.status]}</p>}>
    <div className={styles.visualLayout}>
      <div className={styles.visualPanel}>
        <Scene viewBox="0 0 360 240" className={styles.comparisonScene}
          title={t('受体与配体之间的局部接触', 'Local contact between a receptor and ligand')}
          description={`${statuses[contact.status]} · ${distance.toFixed(1)} Å`}>
          <path d="M20 60 L40 80 L25 120 L40 160 L20 190" className={styles.bond} fill="none" />
          <line x1="25" y1={cy} x2={ox} y2={cy} className={styles.bond} />
          <circle cx={ox} cy={cy} r="38.4" className={contact.clash ? styles.clashEnvelope : styles.contactEnvelope} />
          <circle cx={nx} cy={cy} r="38.4" className={contact.clash ? styles.clashEnvelope : styles.contactEnvelope} />
          <line x1={nx} y1={cy} x2={nx + 32} y2={cy + 22} className={styles.accentBond} />
          <line x1={nx + 32} y1={cy + 22} x2={nx + 48} y2={cy + 4} className={styles.accentBond} />
          {donor && <>
            <line x1={nx} y1={cy} x2={hx} y2={hy} className={styles.accentBond} />
            {contact.possibleHydrogenBond && <line x1={ox} y1={cy} x2={hx} y2={hy} className={styles.hydrogenBond} />}
            <circle cx={hx} cy={hy} r="10" className={styles.atom} />
            <text x={hx} y={hy + 5} textAnchor="middle" className={styles.atomLetter}>H</text>
          </>}
          <circle cx={ox} cy={cy} r="16" className={styles.atom} />
          <text x={ox} y={cy + 6} textAnchor="middle" className={styles.atomLetter}>O</text>
          <circle cx={nx} cy={cy} r="16" className={styles.accentAtom} />
          <text x={nx} y={cy + 6} textAnchor="middle" className={styles.filledAtomLetter}>{donor ? 'N' : 'C'}</text>
          <line x1={ox} y1="190" x2={nx} y2="190" className={styles.distanceLine} />
          <text x={(ox + nx) / 2} y="214" textAnchor="middle" className={styles.diagramLabel}>{distance.toFixed(1)} Å</text>
          <text x="42" y="30" className={styles.diagramLabel}>{t('受体', 'Receptor')}</text>
          <text x="255" y="30" textAnchor="middle" className={styles.diagramLabel}>{t('配体', 'Ligand')}</text>
        </Scene>
        <div className={styles.legend}><span><i className={`${styles.dot} ${styles.outlineDot}`} />{t('受体基团', 'Receptor group')}</span>
          <span><i className={styles.dot} />{t('配体基团', 'Ligand group')}</span></div>
      </div>
      <div className={styles.controlPanel}>
        <Choices label={t('接触示例', 'Contact examples')} columns={2} value={examples.find((e) => e.distance === distance && e.rotation === rotation)?.value ?? ''}
          options={examples} onChange={(value) => {const example = examples.find((e) => e.value === value)!; setDistance(example.distance); setRotation(example.rotation);}} />
        <RangeControl label={t('基团间距', 'Group separation')} value={distance} min={1.6} max={5.8} step={0.1} unit="Å" onChange={setDistance} />
        <RangeControl label={t('N–H 转动', 'N–H rotation')} value={rotation} min={0} max={100} step={5} unit="°" disabled={!donor} onChange={setRotation} />
        <Choices label={t('配体基团', 'Ligand group')} value={donor ? 'donor' : 'carbon'}
          options={[{value: 'donor', label: t('含 N–H', 'With N–H')}, {value: 'carbon', label: t('仅 C 基团', 'C group only')}]} onChange={(value) => setDonor(value === 'donor')} />
      </div>
    </div>
    <div className={`${styles.metrics} ${styles.threeMetrics}`}>
      <span><small>{t('基团间距', 'Group separation')}</small>{distance.toFixed(1)} Å</span>
      <span><small>{t('N–H···O 角度', 'N–H···O angle')}</small>{donor ? `${contact.dhaAngle.toFixed(0)}°` : '—'}</span>
      <span aria-live="polite"><small>{t('当前接触', 'Current contact')}</small>{statuses[contact.status]}</span>
    </div>
  </DemoFrame>;
}

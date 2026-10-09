import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {Choices, RangeControl, Scene, ViewChoices, canvasPoint} from './DemoFrame';
import {ligandBonds, transformLigand, type Vec3, type View} from './teachingModels.mjs';
import {receptorBackbone, sidechainAtoms, transformSidechain} from './teachingBasics.mjs';
import styles from './styles.module.css';

export default function FlexibilityExplorer() {
  const {t} = useGuideLocale();
  const [flexible, setFlexible] = useState(false);
  const [ligandAngle, setLigandAngle] = useState(0);
  const [sidechainAngle, setSidechainAngle] = useState(0);
  const [view, setView] = useState<View>('oblique');
  const toCanvas = (point: Vec3) => canvasPoint(point, view, 28);
  const backbone = receptorBackbone.map(toCanvas);
  const sidechain = transformSidechain(sidechainAngle, flexible).map(toCanvas);
  const original = sidechainAtoms.map(toCanvas);
  const ligand = transformLigand({torsion: ligandAngle}).map((point) => toCanvas(point.map((value, axis) => value * 0.55 + [-0.6, -0.5, 0][axis]) as Vec3));
  const reset = () => {setFlexible(false); setLigandAngle(0); setSidechainAngle(0); setView('oblique');};
  return <DemoFrame name="flexibility" title={t('只让允许的部分改变构象', 'Only selected parts can change shape')}
    instruction={t('转动配体，再开启局部柔性，转动指定侧链。', 'Rotate the ligand, then enable limited flexibility and rotate the selected sidechain.')}
    caption={t('灰色受体骨架固定 · 绿色部分按当前设置移动', 'The gray receptor backbone stays fixed · Green parts move as allowed')}
    onReset={reset} conclusion={<p>{flexible
      ? t('指定侧链和配体可以改变构象，受体其余部分仍然固定。', 'The selected sidechain and ligand can change conformation. The rest of the receptor stays fixed.')
      : t('刚性受体保持不动，配体仍可以改变构象。', 'A rigid receptor stays fixed while the ligand can still change conformation.')}</p>}>
    <div className={styles.visualLayout}>
      <div className={styles.visualPanel}>
        <Scene viewBox="155 35 250 200" className={styles.wideScene} title={t('受体的局部柔性', 'Limited receptor flexibility')}
          description={t('固定的受体骨架、指定侧链和可扭转的配体。', 'A fixed receptor backbone, a selected sidechain, and a ligand with a rotatable bond.')}>
          <g data-part="backbone"><polyline points={backbone.map((p) => p.join(',')).join(' ')} className={styles.bond} fill="none" />
            {backbone.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" className={styles.atom} />)}</g>
          {flexible && <polyline points={original.map((p) => p.join(',')).join(' ')} className={styles.ghost} />}
          <g data-part="sidechain"><polyline points={sidechain.map((p) => p.join(',')).join(' ')} className={flexible ? styles.accentBond : styles.bond} fill="none" />
            {sidechain.slice(1).map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" className={flexible ? styles.accentAtom : styles.atom} />)}</g>
          <g data-part="ligand">{ligandBonds.map(([a, b]) => <line key={`${a}-${b}`} x1={ligand[a][0]} y1={ligand[a][1]} x2={ligand[b][0]} y2={ligand[b][1]} className={styles.accentBond} />)}
            {ligand.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" className={styles.ligandOutline} />)}</g>
        </Scene>
        <div className={styles.legend}>
          <span><i className={`${styles.dot} ${styles.regionDot}`} />{t('固定受体', 'Fixed receptor')}</span>
          <span><i className={`${styles.dot} ${flexible ? '' : styles.regionDot}`} />{t('指定侧链', 'Selected sidechain')}</span>
          <span><i className={`${styles.dot} ${styles.greenOutline}`} />{t('配体', 'Ligand')}</span>
        </div>
        <ViewChoices value={view} onChange={setView} />
      </div>
      <div className={styles.controlPanel}>
        <Choices label={t('受体设置', 'Receptor setup')} value={flexible ? 'flexible' : 'rigid'}
          options={[{value: 'rigid', label: t('刚性受体', 'Rigid receptor')}, {value: 'flexible', label: t('局部柔性', 'Limited flexibility')}]}
          onChange={(value) => {setFlexible(value === 'flexible'); setSidechainAngle(0);}} />
        <RangeControl label={t('配体单键转动', 'Ligand bond rotation')} value={ligandAngle} min={-180} max={180} step={5} unit="°" onChange={setLigandAngle} />
        <RangeControl label={t('指定侧链转动', 'Selected sidechain rotation')} value={sidechainAngle} min={-100} max={100} step={5} unit="°" disabled={!flexible} onChange={setSidechainAngle} />
        <p className={styles.readout}><small>{t('受体可动部分', 'Movable receptor parts')}</small>
          <strong>{flexible ? t('仅指定侧链', 'Selected sidechain only') : t('无', 'None')}</strong></p>
      </div>
    </div>
  </DemoFrame>;
}

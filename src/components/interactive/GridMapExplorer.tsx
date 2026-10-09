import React, {useId, useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {Choices, RangeControl, Scene} from './DemoFrame';
import {createTeachingGrid, type MapAtomType} from './teachingBasics.mjs';
import styles from './styles.module.css';

export default function GridMapExplorer() {
  const {t} = useGuideLocale();
  const clipId = useId();
  const [phase, setPhase] = useState('box');
  const [size, setSize] = useState(12);
  const [spacing, setSpacing] = useState(2);
  const [atomType, setAtomType] = useState<MapAtomType>('C');
  const [probeColumn, setProbeColumn] = useState(4);
  const grid = createTeachingGrid({size, spacing, atomType});
  const probe = grid.samples[Math.floor(grid.count / 2) * grid.count + probeColumn % grid.count];
  const scale = 13.5, cx = 150, cy = 145, half = size * scale / 2;
  const point = (x: number, y: number) => [cx + x * scale, cy - y * scale];
  const [px, py] = point(probe.x, probe.y);
  const reset = () => {setPhase('box'); setSize(12); setSpacing(2); setAtomType('C'); setProbeColumn(4);};
  const conclusions = {
    box: t('Box 划定搜索范围。改变边长，范围随之改变。', 'The box defines the search region. Changing its side length changes that region.'),
    grid: t('Grid 在空间中设置采样点。间距越小，同一范围内的采样点越多。', 'A grid samples positions in space. Smaller spacing gives more samples within the same region.'),
    map: t('Map 为采样点保存数值。切换原子类型，同一位置的数值可以不同。配体仍可处在采样点之间。', 'A map stores values at samples. Different atom types can have different values at the same position. A ligand can still lie between samples.'),
  };
  return <DemoFrame name="grid-maps" title={t('范围、采样点与 Map 数值', 'Region, samples, and map values')}
    instruction={t('在同一幅图中依次切换 Box、Grid 和 Map。', 'Switch between Box, Grid, and Map in the same diagram.')}
    caption={t('二维截面 · 构造的相对 Map 值，无单位', 'A 2D slice · Synthetic relative map values, without units')}
    onReset={reset} conclusion={<p>{conclusions[phase]}</p>}>
    <div className={styles.visualLayout}>
      <div className={styles.visualPanel}>
        <Scene viewBox="0 0 300 300" className={styles.squareScene} title={t('搜索箱体的二维截面', 'A two-dimensional slice through the search box')}
          description={t('箱体限定范围，网格增加采样点，Map 用颜色表示各点的相对数值。', 'The box defines a region, the grid adds sample positions, and the map colors each sample by its relative value.')}>
          <defs><clipPath id={clipId}><rect x={cx - half} y={cy - half} width={half * 2} height={half * 2} /></clipPath></defs>
          <text x="150" y="22" textAnchor="middle" className={styles.diagramLabel}>{phase === 'map' ? `${atomType} Map` : phase === 'grid' ? 'Grid' : 'Box'}</text>
          <line x1="30" y1={cy} x2="270" y2={cy} className={styles.axis} />
          <line x1={cx} y1="32" x2={cx} y2="258" className={styles.axis} />
          <g clipPath={`url(#${clipId})`}>
            {phase === 'map' && grid.samples.map(({x, y, value}, index) => {
              const [gx, gy] = point(x, y);
              return <rect key={index} x={gx - spacing * scale / 2} y={gy - spacing * scale / 2} width={spacing * scale} height={spacing * scale}
                fill={value > 0 ? '#bd8e70' : 'var(--guide-accent)'} fillOpacity={0.08 + Math.min(Math.abs(value) / 3, 1) * 0.5} />;
            })}
            {phase !== 'box' && grid.samples.map(({x, y}, index) => {
              const [gx, gy] = point(x, y);
              return <circle key={index} cx={gx} cy={gy} r={phase === 'map' ? 1.8 : 2.5} className={styles.mapPoint} data-sample={`${x},${y}`} />;
            })}
          </g>
          <rect x={cx - half} y={cy - half} width={half * 2} height={half * 2} className={styles.boxLine} />
          {phase === 'map' && <circle cx={px} cy={py} r="6" className={styles.ligandOutline} data-probe={`${probe.x},${probe.y}`} />}
          <text x="150" y="279" textAnchor="middle" className={styles.diagramLabel}>{size} × {size} Å</text>
          <text x="276" y={cy + 5} className={styles.diagramLabel}>x</text>
          <text x="158" y="44" className={styles.diagramLabel}>y</text>
        </Scene>
        {phase === 'map' && <div className={styles.legend}>
          <span><i className={styles.dot} />{t('较低值', 'Lower values')}</span>
          <span><i className={`${styles.dot} ${styles.warmDot}`} />{t('较高值', 'Higher values')}</span>
        </div>}
      </div>
      <div className={styles.controlPanel}>
        <Choices label={t('显示层', 'Display layer')} value={phase} options={['box', 'grid', 'map'].map((value) => ({value, label: value === 'box' ? 'Box' : value === 'grid' ? 'Grid' : 'Map'}))} onChange={setPhase} />
        <RangeControl label={t('箱体边长', 'Box side length')} value={size} min={8} max={16} step={4} unit="Å"
          onChange={(value) => {setSize(value); setProbeColumn(Math.floor((Math.floor(value / spacing) + 1) / 2) + 1);}} />
        <RangeControl label={t('采样间距', 'Sample spacing')} value={spacing} min={1} max={4} unit="Å" disabled={phase === 'box'}
          onChange={(value) => {setSpacing(value); setProbeColumn(Math.floor((Math.floor(size / value) + 1) / 2) + 1);}} />
        {phase === 'map' && <>
          <Choices label={t('Map 原子类型', 'Map atom type')} value={atomType} options={[{value: 'C', label: 'C Map'}, {value: 'O', label: 'O Map'}]}
            onChange={(value) => setAtomType(value as MapAtomType)} />
          <button type="button" onClick={() => setProbeColumn((column) => (column + 1) % grid.count)}>{t('查看下一个采样点', 'Inspect the next sample')}</button>
          <p className={styles.readout} aria-live="polite"><small>{t('所选点的坐标 / 相对值', 'Selected coordinates / relative value')}</small>
            <strong>({probe.x.toFixed(1)}, {probe.y.toFixed(1)}) Å / {probe.value.toFixed(2)}</strong></p>
        </>}
      </div>
    </div>
    <div className={`${styles.metrics} ${styles.threeMetrics}`}>
      <span><small>{t('截面范围', 'Slice dimensions')}</small>{size} × {size} Å</span>
      <span><small>{t('采样间距', 'Sample spacing')}</small>{phase === 'box' ? '—' : `${spacing} Å`}</span>
      <span><small>{t('截面采样点数', 'Samples in the slice')}</small>{phase === 'box' ? '—' : `${grid.count} × ${grid.count} = ${grid.samples.length}`}</span>
    </div>
  </DemoFrame>;
}

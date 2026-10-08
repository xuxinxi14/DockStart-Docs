import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {canvasPoint, Choices, RangeControl, Scene, useCompactScene, ViewChoices} from './DemoFrame';
import {boxBounds, boxCorners, boxCoversRegion, boxEdges, boxVolume, projectPoint, teachingRegion, type Vec3, type View} from './teachingModels.mjs';
import styles from './styles.module.css';

const presets: {key: string; center: Vec3; size: Vec3}[] = [
  {key: 'offset', center: [8, 4, 0], size: [12, 10, 10]},
  {key: 'small', center: [0, 0, 0], size: [6, 4, 4]},
  {key: 'covered', center: [0, 0, 0], size: [16, 14, 12]},
  {key: 'large', center: [0, 0, 0], size: [26, 24, 22]},
];
const tuple = (values: Vec3) => `(${values.join(', ')})`;

export default function BoxExplorer({focus = 'box'}: {focus?: 'box' | 'coordinates'}) {
  const {t} = useGuideLocale();
  const [center, setCenter] = useState<Vec3>([0, 0, 0]);
  const [size, setSize] = useState<Vec3>([16, 14, 12]);
  const [mode, setMode] = useState<'center' | 'size'>('center');
  const [view, setView] = useState<View>('oblique');
  const [preset, setPreset] = useState('covered');
  const [moreAxes, setMoreAxes] = useState(false);
  const compact = useCompactScene();
  const worldCorners = boxCorners(center, size);
  const receptorOutline: Vec3[] = Array.from({length: 73}, (_, index) => {
    const angle = index / 72 * Math.PI * 2;
    const radius = 11 + 1.4 * Math.sin(angle * 6) + 0.7 * Math.cos(angle * 3);
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.8, Math.sin(angle * 3) * 2];
  });
  const projection = [...worldCorners, ...receptorOutline].map((position) => projectPoint(position, view));
  const scale = Math.min(9, (compact ? 130 : 245) / Math.max(1, ...projection.map(([x]) => Math.abs(x))), 118 / Math.max(1, ...projection.map(([, y]) => Math.abs(y))));
  const corners = worldCorners.map((position) => canvasPoint(position, view, scale));
  const projectedCenter = canvasPoint(center, view, scale);
  const bounds = boxBounds(center, size);
  const covered = boxCoversRegion(center, size);
  const coverage = covered ? t('完整覆盖示意区域', 'Covers the illustrated region') : t('未完整覆盖示意区域', 'Does not cover the whole illustrated region');
  const presetLabels = [t('偏离区域', 'Offset'), t('箱体过小', 'Too small'), t('覆盖区域', 'Covered'), t('扩大范围', 'Larger')];
  const changeAxis = (axis: number, value: number) => {
    const next = [...(mode === 'center' ? center : size)] as Vec3;
    next[axis] = value;
    if (mode === 'center') setCenter(next); else setSize(next);
    setPreset('');
  };
  const reset = () => {setCenter([0, 0, 0]); setSize([16, 14, 12]); setMode('center'); setView('oblique'); setPreset('covered'); setMoreAxes(false);};
  const regionRings = [0, 1, 2].map((fixedAxis) => {
    const axes = [0, 1, 2].filter((axis) => axis !== fixedAxis);
    return Array.from({length: 49}, (_, index) => {
      const angle = index / 48 * Math.PI * 2;
      const point: Vec3 = [0, 0, 0];
      point[axes[0]] = Math.cos(angle) * teachingRegion.halfSize[axes[0]];
      point[axes[1]] = Math.sin(angle) * teachingRegion.halfSize[axes[1]];
      return canvasPoint(point, view, scale).join(',');
    }).join(' ');
  });
  const axisControl = (axis: number) => <RangeControl key={axis}
    label={mode === 'center' ? t(`${'XYZ'[axis]} 轴中心`, `${'XYZ'[axis]} center`) : t(`${'XYZ'[axis]} 方向边长`, `${'XYZ'[axis]} side length`)}
    code={`${mode === 'center' ? 'center' : 'size'}_${'xyz'[axis]}`}
    value={(mode === 'center' ? center : size)[axis]} min={mode === 'center' ? -8 : 4} max={mode === 'center' ? 8 : 26}
    unit="Å" onChange={(value) => changeAxis(axis, value)} />;
  return <DemoFrame name="box" title={focus === 'coordinates' ? t('坐标决定箱体放在哪里', 'Coordinates place the box') : t('把箱体放到合适的位置', 'Place and size the search box')}
    instruction={t('先试四种设置，再分别调整中心和边长。受体与示意区域始终不动。', 'Try the four settings, then change the center or side lengths. The receptor and illustrated region stay fixed.')}
    onReset={reset} conclusion={<p>{coverage}{t('。', '. ')}{t('边长是完整长度：X 轴范围 = center_x ± size_x / 2。', 'Side lengths are full lengths: X bounds = center_x ± size_x / 2.')}</p>}
    caption={t('空间关系示意 · 视角与自动缩放只影响显示', 'Spatial illustration · View and automatic zoom affect the display only')}>
    <Choices label={t('箱体设置示例', 'Example box settings')} value={preset}
      options={presets.map((item, index) => ({value: item.key, label: presetLabels[index]}))}
      onChange={(key) => {const item = presets.find((entry) => entry.key === key)!; setCenter([...item.center]); setSize([...item.size]); setPreset(key);}} />
    <Scene title={t('对接箱体、受体和示意区域', 'Search box, receptor and illustrated region')} compactViewBox="130 10 300 260"
      description={`${t('中心', 'Center')} ${tuple(center)} Å; ${t('边长', 'Side lengths')} ${tuple(size)} Å. ${coverage}.`}>
      <polygon points={receptorOutline.map((position) => canvasPoint(position, view, scale).join(',')).join(' ')} className={styles.receptor} />
      {regionRings.map((points, index) => <polygon key={index} points={points} className={styles.target} />)}
      {[0, 1, 2].map((axis) => {
        const point: Vec3 = [0, 0, 0]; point[axis] = 12;
        const [x, y] = canvasPoint(point, view, scale);
        return <g key={axis}>
          <line x1="280" y1="140" x2={x} y2={y} className={styles.axis} />
          <text x={x + 6} y={y - 6} className={styles.svgLabel}>{'XYZ'[axis]}</text>
        </g>;
      })}
      {boxEdges.map(([a, b], index) => <line key={index} x1={corners[a][0]} y1={corners[a][1]} x2={corners[b][0]} y2={corners[b][1]}
        className={`${styles.boxLine} ${a < 4 && b < 4 ? styles.boxBack : ''}`} />)}
      <line x1="280" y1="140" x2={projectedCenter[0]} y2={projectedCenter[1]} className={styles.ghost} />
      <circle cx={projectedCenter[0]} cy={projectedCenter[1]} r="4.5" className={styles.centerDot} />
    </Scene>
    <div className={styles.legend}>
      <span><i className={`${styles.dot} ${styles.regionDot}`} aria-hidden="true" />{t('受体轮廓', 'Receptor outline')}</span>
      <span><i className={styles.dash} aria-hidden="true" />{t('示意区域', 'Illustrated region')}</span>
      <span><i className={styles.dot} aria-hidden="true" />{t('箱体中心', 'Box center')}</span>
    </div>
    <Choices label={t('调整箱体', 'Adjust the box')} value={mode} onChange={(next) => setMode(next as 'center' | 'size')}
      options={[{value: 'center', label: t('移动中心', 'Move center')}, {value: 'size', label: t('改变尺寸', 'Change size')}]} />
    {axisControl(0)}
    <details className={styles.secondary} open={moreAxes} onToggle={(event) => setMoreAxes(event.currentTarget.open)}>
      <summary>{t('也调整 Y / Z 轴', 'Adjust Y / Z as well')}</summary>
      <div className={styles.controls}>{axisControl(1)}{axisControl(2)}</div>
    </details>
    <ViewChoices value={view} onChange={setView} />
    <div className={styles.metrics}>
      <span><small>{t('中心坐标', 'Center coordinates')}</small>{tuple(center)} Å</span>
      <span><small>{t('完整边长', 'Full side lengths')}</small>{tuple(size)} Å</span>
      <span><small>{t('体积', 'Volume')}</small>{boxVolume(size).toLocaleString('en-US')} Å³</span>
      <span><small>{t('X 轴范围', 'X bounds')}</small>{bounds[0].join(' … ')} Å</span>
    </div>
  </DemoFrame>;
}

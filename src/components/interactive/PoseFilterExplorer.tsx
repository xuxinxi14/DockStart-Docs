import React, {useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {RangeControl} from './DemoFrame';
import {exampleCandidates, filterPoseCandidates} from './teachingModels.mjs';
import styles from './styles.module.css';

export default function PoseFilterExplorer({focus = 'range'}: {focus?: 'range' | 'count' | 'ranking'}) {
  const {t} = useGuideLocale();
  const [count, setCount] = useState(9);
  const [range, setRange] = useState(1);
  const result = filterPoseCandidates(exampleCandidates, count, range);
  const title = focus === 'count' ? t('输出上限不等于最终数量', 'A count limit is not a guaranteed count') : focus === 'ranking' ? t('哪些构象会写入文件？', 'Which poses reach the output file?') : t('两个条件，一起筛选构象', 'Two settings filter the output together');
  const message = t(`保存 ${result.saved.length} / ${exampleCandidates.length} 个构象`, `Save ${result.saved.length} of ${exampleCandidates.length} poses`);
  return <DemoFrame name="filter" title={title}
    instruction={t('这组候选构象保持不变。拖动两个滑块，看哪些构象会被保存。', 'This candidate set stays fixed. Drag either slider to see which poses would be saved.')}
    onReset={() => {setCount(9); setRange(1);}}
    conclusion={<p>{t('先保留能量窗口内的构象，再按评分排序，最多保存 Num Modes 个。', 'Keep poses within the energy window, rank them by score, and save at most Num Modes poses.')}</p>}
    caption={t('固定候选集的输出示意 · 评分单位 kcal/mol', 'Output illustration with a fixed candidate set · Scores in kcal/mol')}>
    <div className={styles.controls}>
      <RangeControl label={t('输出构象上限', 'Maximum output poses')} code="num_modes" value={count} min={1} max={12} onChange={setCount} />
      <RangeControl label={t('与最佳评分的最大差值', 'Maximum difference from the best')} code="energy_range" value={range} min={0} max={3} step={0.1} unit="kcal/mol" onChange={setRange} />
    </div>
    <div className={styles.resultLine}>
      <output aria-live="polite"><strong>{message}</strong></output>
      <span>{t('评分阈值', 'Score threshold')}: {result.best!.toFixed(1)} + {range.toFixed(1)} = {result.threshold!.toFixed(1)}</span>
    </div>
    <div className={styles.tableWrap}>
      <table className={styles.poseTable} aria-label={t('固定候选构象的输出筛选', 'Output filtering of a fixed candidate set')}>
        <thead><tr><th scope="col">{t('候选', 'Candidate')}</th><th scope="col">{t('评分', 'Score')}</th><th scope="col">{t('差值 Δ', 'Difference Δ')}</th><th scope="col">{t('文件输出', 'File output')}</th></tr></thead>
        <tbody>{result.rows.map((row) => <tr key={row.id} className={row.status === 'saved' ? styles.savedRow : styles.excludedRow}>
          <td>#{row.id}</td><td>{row.score.toFixed(1)}</td><td>{row.delta.toFixed(1)}</td>
          <td>{row.status === 'saved' ? `MODEL ${result.saved.findIndex((pose) => pose.id === row.id) + 1}` : row.status === 'range' ? t('超出能量窗口', 'Outside range') : t('达到数量上限', 'Count limit')}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </DemoFrame>;
}

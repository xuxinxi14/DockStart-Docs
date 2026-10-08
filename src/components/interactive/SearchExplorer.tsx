import React, {useMemo, useState} from 'react';
import useGuideLocale from '../useGuideLocale';
import DemoFrame, {RangeControl, Scene} from './DemoFrame';
import {createSearchRuns, searchWells, type SearchFrame, type Vec2} from './teachingModels.mjs';
import useDemoPlayback from './useDemoPlayback';
import styles from './styles.module.css';

const point = ([x, y]: Vec2): Vec2 => [280 + x * 38, 140 - y * 38];
const stages: SearchFrame['stage'][] = ['perturb', 'optimize', 'accept', 'retain'];

export default function SearchExplorer({focus = 'process'}: {focus?: 'process' | 'exhaustiveness' | 'seed'}) {
  const {t} = useGuideLocale();
  const [count, setCount] = useState(8);
  const [seed, setSeed] = useState(42);
  const [seedDraft, setSeedDraft] = useState('42');
  const [selected, setSelected] = useState(0);
  const runs = useMemo(() => createSearchRuns({seed, count}), [seed, count]);
  const playback = useDemoPlayback(runs[0].frames.length);
  const frame = runs[selected].frames[playback.step];
  const title = focus === 'seed' ? t('同一个种子，同一组示意路径', 'Same seed, same illustrated paths') : focus === 'exhaustiveness' ? t('增加独立搜索，探索更多起点', 'More independent searches, more starting points') : t('看一次独立搜索如何推进', 'Follow one independent search');
  const stageLabels: Record<SearchFrame['stage'], string> = {
    start: t('随机起点', 'Random start'), perturb: t('随机扰动', 'Random perturbation'),
    optimize: t('局部优化', 'Local optimization'), accept: t('接受或拒绝', 'Accept or reject'), retain: t('保留最佳', 'Keep the best'),
  };
  const explanation: Record<SearchFrame['stage'], string> = {
    start: t('每条搜索从不同的随机位置开始。选择一条路径，再单步查看。', 'Each search starts at a different random position. Select a path and step through it.'),
    perturb: t('提出一个新的候选位置，不必比当前位置更好。', 'Propose a new candidate position; it does not have to be better than the current one.'),
    optimize: t('在候选位置附近寻找更低的示意评分。', 'Find a lower illustrative score near the proposed position.'),
    accept: frame.accepted ? t('接受这次候选，当前位置随之改变。', 'Accept this candidate and update the current position.') : t('拒绝这次候选，仍从原来的位置继续。', 'Reject this candidate and continue from the previous position.'),
    retain: t('记录目前找到的最佳位置，继续下一轮探索。', 'Record the best position found so far, then continue exploring.'),
  };
  const applySeed = (next: number) => {
    setSeed(next); setSeedDraft(String(next)); playback.rewind();
  };
  const commitSeed = () => {
    const next = Number(seedDraft);
    if (Number.isInteger(next) && next >= 1 && next <= 9999) {
      if (next !== seed) applySeed(next);
      else setSeedDraft(String(next));
    }
    else setSeedDraft(String(seed));
  };
  const reset = () => {setCount(8); setSelected(0); applySeed(42);};
  const [candidateX, candidateY] = point(frame.candidate);
  const [currentX, currentY] = point(frame.current);
  const [bestX, bestY] = point(frame.best);
  const seedId = React.useId();
  const pathId = React.useId();
  return <DemoFrame name="search" rootRef={playback.rootRef} title={title}
    instruction={t('空心圆是起点。选一条搜索路径，用“下一步”观察四个阶段。', 'Hollow circles mark starting points. Select a search path and use “Next step” to follow the four stages.')}
    onReset={reset} conclusion={<p>{explanation[frame.stage]}</p>}
    caption={playback.reducedMotion ? t('二维算法示意 · 已按减少动态效果偏好启用单步查看', '2D algorithm illustration · Step through with reduced motion enabled') : t('二维算法示意 · 评分越低，示意位置越优', '2D algorithm illustration · Lower scores indicate better illustrative positions')}>
    <div className={styles.controls}>
      <div>
        <RangeControl label={t('独立搜索数量', 'Independent searches')} code="exhaustiveness" value={count} min={1} max={32}
          onChange={(next) => {setCount(next); setSelected((index) => Math.min(index, next - 1)); playback.rewind();}} />
      </div>
      <div>
        <div className={styles.field}>
          <label htmlFor={seedId}>{t('随机种子', 'Seed')}</label>
          <input id={seedId} type="number" min={1} max={9999} step={1} value={seedDraft}
            title={t('演示种子范围：1–9999', 'Demo seed range: 1–9999')}
            onChange={(event) => setSeedDraft(event.target.value)} onBlur={commitSeed}
            onKeyDown={(event) => {if (event.key === 'Enter') {event.preventDefault(); commitSeed();}}} />
          <button type="button" onClick={() => applySeed(seed >= 9999 ? 1 : seed + 1)}>{t('换一个种子', 'Change seed')}</button>
        </div>
        <div className={styles.field}>
          <label htmlFor={pathId}>{t('观察路径', 'Follow path')}</label>
          <select id={pathId} value={selected} onChange={(event) => setSelected(Number(event.target.value))}>
            {runs.map((run, index) => <option value={index} key={run.id}>{t(`搜索 ${run.id}`, `Search ${run.id}`)}</option>)}
          </select>
        </div>
      </div>
    </div>
    <Scene title={t('多条独立搜索在示意评分地形上探索', 'Independent searches on an illustrative score landscape')} compactViewBox="140 10 280 260"
      description={`${t('观察搜索', 'Following search')} ${selected + 1}; ${stageLabels[frame.stage]}; ${explanation[frame.stage]}`}>
      {searchWells.map((well, index) => {
        const [x, y] = point(well.point);
        return <g key={index}>{[1, 1.5, 2].map((radius) => <circle key={radius} cx={x} cy={y} r={well.width * 38 * radius} className={styles.well} />)}</g>;
      })}
      {runs.map((run, index) => {
        const trail = run.frames.slice(0, playback.step + 1).filter((entry) => entry.stage === 'start' || entry.stage === 'accept').map((entry) => point(entry.current).join(',')).join(' ');
        const [x, y] = point(run.frames[0].current);
        const [lastX, lastY] = point(run.frames[playback.step].current);
        return <g key={run.id}>
          <polyline points={trail} className={`${styles.searchPath} ${index === selected ? styles.focusedPath : ''}`} />
          <circle cx={x} cy={y} r={index === selected ? 4 : 3} className={styles.searchStart} />
          {index !== selected && <circle cx={lastX} cy={lastY} r="2.5" className={styles.searchCurrent} opacity="0.4" />}
        </g>;
      })}
      {(frame.stage === 'perturb' || frame.stage === 'optimize' || (frame.stage === 'accept' && !frame.accepted)) &&
        <line x1={currentX} y1={currentY} x2={candidateX} y2={candidateY} className={styles.proposal} />}
      <path d={`M${bestX},${bestY - 6} l6,6 l-6,6 l-6,-6 Z`} className={styles.searchBest} />
      <circle cx={candidateX} cy={candidateY} r="5" className={styles.searchCurrent} />
      {frame.stage === 'accept' && !frame.accepted && <circle cx={currentX} cy={currentY} r="4" className={styles.searchStart} />}
    </Scene>
    <div className={styles.legend}>
      <span><i className={`${styles.dot} ${styles.outlineDot}`} aria-hidden="true" />{t('起点', 'Start')}</span>
      <span><i className={styles.dot} aria-hidden="true" />{t('当前候选', 'Candidate')}</span>
      <span><i className={`${styles.dot} ${styles.diamond}`} aria-hidden="true" />{t('已找到的最佳', 'Best so far')}</span>
      <span><i className={styles.dash} aria-hidden="true" />{t('候选变化', 'Proposal change')}</span>
    </div>
    <div className={styles.playback}>
      <button type="button" className={styles.primaryButton} onClick={playback.toggle} disabled={playback.reducedMotion}>
        {playback.playing ? t('暂停', 'Pause') : playback.step === runs[0].frames.length - 1 ? t('重播', 'Replay') : t('播放', 'Play')}
      </button>
      <button type="button" onClick={playback.advance} disabled={playback.step === runs[0].frames.length - 1}>{t('下一步', 'Next step')}</button>
      <button type="button" onClick={playback.rewind}>{t('回到起点', 'Back to start')}</button>
      <span className={styles.stepCount}>{playback.step} / {runs[0].frames.length - 1}</span>
    </div>
    <div className={styles.stage} aria-label={t('搜索阶段', 'Search stages')}>
      {stages.map((stage, index) => <span key={stage} className={frame.stage === stage ? styles.currentStage : ''}
        aria-current={frame.stage === stage ? 'step' : undefined}>{index + 1}. {stageLabels[stage]}</span>)}
    </div>
    <div className={styles.metrics}>
      <span><small>{t('当前阶段', 'Current stage')}</small>{stageLabels[frame.stage]}</span>
      <span><small>{t('候选示意评分', 'Candidate’s illustrative score')}</small>{frame.score.toFixed(2)}</span>
      <span><small>{t('最佳示意评分', 'Best illustrative score')}</small>{frame.bestScore.toFixed(2)}</span>
      <span><small>{t('扰动轮次', 'Perturbation cycle')}</small>{frame.cycle} / 6</span>
    </div>
  </DemoFrame>;
}

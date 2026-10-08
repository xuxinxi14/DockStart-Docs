import React from 'react';
import useGuideLocale from '../useGuideLocale';

export function LigandModelNote() {
  const {t} = useGuideLocale();
  return <p>{t('图中使用六个点组成的简化配体，分别展示整体平移、整体转动和单键扭转。它不代表特定分子的化学结构或实际结合轨迹；真实配体的可旋转键由结构与准备结果决定。', 'The six-point ligand model illustrates whole-body translation, whole-body rotation, and torsion around one bond. It does not represent a particular chemical structure or an actual binding trajectory. A real ligand’s rotatable bonds depend on its structure and preparation.')}</p>;
}

export function BoxModelNote() {
  const {t} = useGuideLocale();
  return <p>{t('图中的受体轮廓与示意区域是构造几何，覆盖判断只检查箱体是否包含这个固定区域，不进行口袋检测。视角和自动缩放只改变投影显示，中心和尺寸的数值保持不变；尺寸按完整边长而非半径计算。', 'The receptor outline and illustrated region are constructed geometry. Coverage only checks whether the box contains this fixed region; it does not detect a binding pocket. View changes and automatic zoom affect only the projection, while the center and size remain unchanged. Dimensions are full side lengths, not radii.')}</p>;
}

export function SearchModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '交互演示使用自定义二维评分地形和简化的局部优化，便于观察独立搜索、随机种子及接受/拒绝的关系。它不运行 Vina，也不复现 Vina 的 BFGS 优化或真实分子轨迹。实际搜索还涉及完整构象空间、候选保留、精化与聚类；固定 Seed 的可复现性需同时固定输入、参数和工具环境。',
    'The interactive model uses a synthetic 2D score landscape and simplified local optimization to illustrate independent searches, seeds, and acceptance or rejection. It does not run Vina or reproduce its BFGS optimization or real molecular trajectories. Actual searches also involve the full pose space, candidate retention, refinement, and clustering. Reproducibility with a fixed seed also requires fixed inputs, parameters, and tool environment.',
  )} {t('参考', 'See')} <a href="https://autodock-vina.readthedocs.io/en/latest/faq.html">AutoDock Vina FAQ</a>{t('。', '.')}</p>;
}

export function PoseFilterModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '演示中的评分是构造数据，并固定候选集，只展示输出筛选：与最佳评分的差值不超过 Energy Range，且数量不超过 Num Modes。实际 Vina 的 Num Modes 还影响搜索中的候选保留，所以重新运行并改变它，候选集或日志也可能改变。文件中的 MODEL 数量和日志中的行数可能不同。',
    'Scores here are constructed data, and the candidate set is held fixed to show output filtering: the difference from the best score must not exceed Energy Range, and the output count must not exceed Num Modes. In actual Vina, Num Modes also affects candidate retention during search, so changing it in a new run may change the candidates or log. The number of MODEL records in the file may differ from the number of log rows.',
  )} {t('参考', 'See')} <a href="https://vina.scripps.edu/manual/#output">{t('Vina 输出说明', 'Vina output documentation')}</a> {t('及', 'and')} <a href="https://github.com/ccsb-scripps/AutoDock-Vina/blob/v1.2.7/src/lib/vina.cpp#L512">{t('Vina 源码', 'Vina source code')}</a>{t('。', '.')}</p>;
}

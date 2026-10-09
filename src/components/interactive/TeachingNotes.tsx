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

export function InteractionModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '图中预设 O 为氢键受体、N–H 为氢键供体，用局部几何解释可能的氢键与拥挤。供体—受体距离 2.6–3.5 Å、N–H···O 角度至少 140° 和拥挤阈值 2.4 Å 均为本演示的教学规则，圆圈也不是实际范德华半径。这些条件不能代替真实结构中的基团识别、氢键分析或结合判断；距离与方向需结合具体化学环境。',
    'The diagram assumes an O acceptor and an N–H donor. Its 2.6–3.5 Å donor–acceptor range, minimum 140° N–H···O angle, and 2.4 Å clash threshold are teaching rules. The circles are not actual van der Waals radii. These rules do not replace group identification, hydrogen-bond analysis, or binding assessment in real structures; distance and direction depend on the chemical environment.',
  )} {t('参考', 'See')} <a href="https://publications.iupac.org/pac/83/8/1637/index.html">{t('IUPAC 氢键定义', 'IUPAC hydrogen-bond definition')}</a>{t('。', '.')}</p>;
}

export function StereochemistryModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '演示采用带有四个不同基团 A–D 的四面体中心。单键转动只移动 D 基团的尾部，镜像则反转该中心的手性；整体旋转保持手性。字母不是具体取代基，不进行 R/S 或 CIP 指派。正面和立体视角都是三维坐标的二维投影，不能仅凭某一视角中看似重合就判断三维结构相同。',
    'The model uses a tetrahedral center with four distinct groups A–D. Bond rotation moves only the tail of D; reflection reverses the center’s handedness, while whole-body rotation preserves it. Letters do not denote specific substituents, and no R/S or CIP assignment is made. Both views are 2D projections of 3D coordinates; apparent overlap in one view does not establish identical 3D structures.',
  )} {t('参考', 'See')} <a href="https://goldbook.iupac.org/terms/view/C01258">{t('IUPAC 构象', 'IUPAC conformation')}</a> {t('与', 'and')} <a href="https://goldbook.iupac.org/terms/view/C01058">{t('手性定义', 'chirality definitions')}</a>{t('。', '.')}</p>;
}

export function FlexibilityModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '受体骨架、侧链和配体均为构造几何。演示只比较允许哪些坐标改变，不读取真实蛋白、不筛选柔性残基，也不进行能量优化或分子动力学。实际 Vina 的柔性受体工作流需要准备刚性部分与指定柔性侧链；侧链选择应根据结构和任务决定。',
    'The backbone, sidechain, and ligand are constructed geometry. The model compares which coordinates may change; it does not read a protein, select flexible residues, optimize energy, or run molecular dynamics. Actual Vina flexible-receptor workflows require a rigid portion and selected flexible sidechains, chosen according to the structure and task.',
  )} {t('参考', 'See')} <a href="https://autodock-vina.readthedocs.io/en/latest/docking_flexible.html">{t('Vina 柔性受体教程', 'Vina flexible-receptor tutorial')}</a>{t('。', '.')}</p>;
}

export function GridMapModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '图中只画三维网格的二维截面。1–4 Å 的粗采样便于辨认，不是 Vina 的默认网格间距；点数仅统计该截面。C/O 标签和相对数值用于说明不同原子类型的 Map，不生成实际 Vina 或 AutoGrid 文件，颜色也不是实测能量。真实计算可通过插值查询网格点之间的值，配体坐标无需落在采样点上。',
    'Only a 2D slice of a 3D grid is drawn. The coarse 1–4 Å spacing aids visibility and is not Vina’s default; counts refer only to this slice. C/O labels and relative values illustrate atom-type-specific maps. No Vina or AutoGrid files are produced, and colors are not measured energies. Real calculations can interpolate between samples; ligand coordinates need not coincide with grid points.',
  )} {t('参考', 'See')} <a href="https://autodock-vina.readthedocs.io/en/latest/docking_basic.html">{t('Vina 与 AutoDock4 Maps 工作流', 'Vina and AutoDock4 map workflows')}</a>{t('。', '.')}</p>;
}

export function ScoringModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '曲线使用自定义、无单位的原子对距离模型，定性展示有利接触与短程排斥的组合；它不是 Vina 的公式或 kcal/mol 评分。附加接触按示意类型启用，不自动识别化学基团。该演示不包括完整原子对求和、配体内部项或扭转贡献，也不设置氢键角度项；Vina 的氢键项是非定向的，不能与相互作用页面的几何判定混为一谈。',
    'The curve uses a custom, unitless atom-pair model to illustrate favorable contact and short-range repulsion. It is not Vina’s equation or a kcal/mol score. Additional contact depends on the selected illustrative type, without chemical-group detection. The model omits full atom-pair sums, ligand internal terms, and torsional contributions. It has no hydrogen-bond angle term; Vina’s hydrogen-bond term is nondirectional and differs from the geometry check on the interactions page.',
  )} {t('参考', 'See')} <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/">{t('Vina 评分项的研究说明', 'Research description of Vina scoring terms')}</a>{t('。', '.')}</p>;
}

export function RmsdModelNote() {
  const {t} = useGuideLocale();
  return <p>{t(
    '演示固定六个示意原子的对应顺序，直接对三维距离的平方取平均再开方，不做叠合、最近同元素匹配或对称性修正。它帮助理解固定对应下的 RMSD，不复现 Vina 的 l.b. 算法，也不构成对真实构象的验证。与晶体配体比较时，需要正确的参考结构、原子对应和共同受体坐标系；Vina 输出中的参考是本次计算的 Mode 1。',
    'The six illustrative atoms have fixed correspondence. RMSD is the square root of their mean squared 3D distances, without alignment, nearest-element matching, or symmetry correction. This demonstrates fixed-correspondence RMSD, not Vina’s lower-bound algorithm or validation of a real pose. Crystal-ligand comparisons require the appropriate reference, atom correspondence, and shared receptor frame. Vina’s output instead uses Mode 1 of the current run as its reference.',
  )} {t('参考', 'See')} <a href="https://vina.scripps.edu/manual/#output">{t('Vina RMSD 输出定义', 'Vina RMSD output definitions')}</a>{t('。', '.')}</p>;
}

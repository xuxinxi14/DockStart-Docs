export type OfficialFile = {role: string; path: string};
export type OfficialExample = {folder: string; note: string; files: OfficialFile[]};

const basic: OfficialExample = {
  folder: 'basic_docking',
  note: '从 PDB/SDF 开始时按正文准备结构；已有 PDBQT 可直接导入。solution 文件是官方准备结果，不等同于本次 DockStart 自动准备的输出。',
  files: [
    {role: '原始受体（已加氢）', path: 'data/1iep_receptorH.pdb'},
    {role: '原始配体', path: 'data/1iep_ligand.sdf'},
    {role: '准备后的受体', path: 'solution/1iep_receptor.pdbqt'},
    {role: '准备后的配体', path: 'solution/1iep_ligand.pdbqt'},
  ],
};
const multiple: OfficialExample = {
  folder: 'mulitple_ligands_docking',
  note: '官方目录名确实拼作 mulitple_ligands_docking。P59 与 P69 是两个独立配体，请保留各自的文件与身份。',
  files: [
    {role: '原始受体（已加氢）', path: 'data/5x72_receptorH.pdb'},
    {role: '原始配体 P59', path: 'data/5x72_ligand_p59.sdf'},
    {role: '原始配体 P69', path: 'data/5x72_ligand_p69.sdf'},
    {role: '准备后的受体', path: 'solution/5x72_receptor.pdbqt'},
    {role: '准备后的配体 P59', path: 'solution/5x72_ligand_p59.pdbqt'},
    {role: '准备后的配体 P69', path: 'solution/5x72_ligand_p69.pdbqt'},
  ],
};

export const officialExamples = {
  basic,
  flexible: {
    folder: 'flexible_docking',
    note: '1FPU 案例的配体沿用 1iep_ligand.pdbqt。受体刚性部分与柔性侧链是两份配套文件；使用官方拆分结果时必须保持配套，不能将柔性侧链当作配体。',
    files: [
      {role: '原始受体（已加氢）', path: 'data/1fpu_receptorH.pdb'},
      {role: '准备后的配体', path: 'data/1iep_ligand.pdbqt'},
      {role: '受体刚性部分', path: 'solution/1fpu_receptor_rigid.pdbqt'},
      {role: '受体柔性侧链', path: 'solution/1fpu_receptor_flex.pdbqt'},
    ],
  },
  batch: {
    ...multiple,
    note: '本页批量演示复用官方 5X72 多配体示例的输入，分别运行 P59 与 P69。它们不是官方独立的 batch 数据集，也不是本页批量结果的官方参考答案。',
  },
  multiple,
  macrocycle: {
    folder: 'docking_with_macrocycles',
    note: '原始配体为 MOL2；若选择官方 PDBQT，保留其中的断环与伪原子信息。准备策略与结果偏差仍需按正文核对。',
    files: [
      {role: '原始受体（已加氢）', path: 'data/BACE_1_receptorH.pdb'},
      {role: '原始大环配体', path: 'data/BACE_1_ligand.mol2'},
      {role: '准备后的受体', path: 'solution/BACE_1_receptor.pdbqt'},
      {role: '准备后的大环配体', path: 'solution/BACE_1_ligand.pdbqt'},
    ],
  },
  hydrated: {
    folder: 'hydrated_docking',
    note: '水合对接使用专用 AD4 协议；不能将该协议的准备结果与普通 Vina/Vinardo 对接混用。配体质子化、候选水和水分子 map 仍需按正文检查。',
    files: [
      {role: '原始受体（已加氢）', path: 'data/1uw6_receptorH.pdb'},
      {role: '原始配体', path: 'data/1uw6_ligand.sdf'},
      {role: '准备后的受体', path: 'solution/1uw6_receptor.pdbqt'},
      {role: '官方配体 PDBQT', path: 'solution/1uw6_ligand.pdbqt'},
    ],
  },
  ad4: {
    ...basic,
    note: '与 Basic Docking 使用同一组 1IEP 结构。AD4 还需要匹配的 affinity maps；结构文件不能代替 maps，也不能跨评分协议混用。',
  },
  zinc: {
    folder: 'docking_with_zinc_metalloproteins',
    note: '这里提供官方 1S63 参考输入，不表示 DockStart 已完成本例的实测验证。protein_tz.pdbqt 含专用 TZ 伪原子；使用前需核对 AD4Zn 参数与 AutoGrid4 兼容性。',
    files: [
      {role: '原始受体（已加氢）', path: 'data/proteinH.pdb'},
      {role: '原始配体', path: 'data/1s63_ligand.sdf'},
      {role: '含 TZ 的受体', path: 'solution/protein_tz.pdbqt'},
      {role: '准备后的配体', path: 'solution/1s63_ligand.pdbqt'},
      {role: 'AD4Zn 参数（非结构）', path: 'data/AD4Zn.dat'},
    ],
  },
} satisfies Record<string, OfficialExample>;

export type OfficialExampleId = keyof typeof officialExamples;
export const officialRepository = 'https://github.com/ccsb-scripps/AutoDock-Vina';
export const officialRevision = '3c65c0b3e6c2c1d183f6a175ecb65e3c5ba91645';

export type OfficialFile = {role: string; path: string};
export type OfficialExample = {folder: string; instruction: string; note: string; files: OfficialFile[]};

const basic: OfficialExample = {
  folder: 'basic_docking',
  instruction: '已有 PDBQT 可直接导入；从 PDB/SDF 开始时，先按下文准备结构。',
  note: 'solution 目录中的 PDBQT 是官方准备结果；从原始结构在 DockStart 中重新准备，可能得到不同的文件。',
  files: [
    {role: '原始受体（已加氢）', path: 'data/1iep_receptorH.pdb'},
    {role: '原始配体', path: 'data/1iep_ligand.sdf'},
    {role: '准备后的受体', path: 'solution/1iep_receptor.pdbqt'},
    {role: '准备后的配体', path: 'solution/1iep_ligand.pdbqt'},
  ],
};
const multiple: OfficialExample = {
  folder: 'mulitple_ligands_docking',
  instruction: '下载受体和 P59、P69 两份配体，保留两个配体各自的名称。',
  note: '官方目录名拼作 mulitple_ligands_docking。P59 与 P69 是两个独立配体。',
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
    instruction: '配体使用 1iep_ligand.pdbqt。rigid 与 flex 是配套的受体文件，请一起保留。',
    note: '1FPU 案例复用 1IEP 的配体。flex 文件记录受体柔性侧链，不能放入配体槽位。',
    files: [
      {role: '原始受体（已加氢）', path: 'data/1fpu_receptorH.pdb'},
      {role: '准备后的配体', path: 'data/1iep_ligand.pdbqt'},
      {role: '受体刚性部分', path: 'solution/1fpu_receptor_rigid.pdbqt'},
      {role: '受体柔性侧链', path: 'solution/1fpu_receptor_flex.pdbqt'},
    ],
  },
  batch: {
    ...multiple,
    instruction: '将 P59、P69 两份配体一起导入配体库，随后逐个运行。',
    note: '本页批量演示复用官方 5X72 多配体示例的输入。官方未提供独立的 batch 数据集或本页批量结果的参考答案。',
  },
  multiple,
  macrocycle: {
    folder: 'docking_with_macrocycles',
    instruction: '从 MOL2 开始时，按下文审查断环方案；直接用 PDBQT 时，保留其中的伪原子。',
    note: '官方 PDBQT 已包含大环断环与伪原子信息。重新准备时，应一并记录断环方案和扭转数。',
    files: [
      {role: '原始受体（已加氢）', path: 'data/BACE_1_receptorH.pdb'},
      {role: '原始大环配体', path: 'data/BACE_1_ligand.mol2'},
      {role: '准备后的受体', path: 'solution/BACE_1_receptor.pdbqt'},
      {role: '准备后的大环配体', path: 'solution/BACE_1_ligand.pdbqt'},
    ],
  },
  hydrated: {
    folder: 'hydrated_docking',
    instruction: '这些文件用于水合 AD4，请按下文进入水合向导。',
    note: '水合准备结果属于专用 AD4 协议，不与普通 Vina/Vinardo 混用。使用前仍需核对配体质子化、候选水和水分子 map。',
    files: [
      {role: '原始受体（已加氢）', path: 'data/1uw6_receptorH.pdb'},
      {role: '原始配体', path: 'data/1uw6_ligand.sdf'},
      {role: '准备后的受体', path: 'solution/1uw6_receptor.pdbqt'},
      {role: '官方配体 PDBQT', path: 'solution/1uw6_ligand.pdbqt'},
    ],
  },
  ad4: {
    ...basic,
    instruction: '导入这组 1IEP 结构后，还需按下文生成 AD4 maps。',
    note: '本页与 Basic Docking 使用同一组 1IEP 结构。AD4 需要匹配的 affinity maps，分数不与 Vina/Vinardo 直接比较。',
  },
  zinc: {
    folder: 'docking_with_zinc_metalloproteins',
    instruction: '使用前需配置 AutoGrid4 4.2.7+，并准备 AD4Zn.dat 参数文件。',
    note: '这里提供官方 1S63 参考输入；DockStart 的逐步操作和实测验证尚未完成。protein_tz.pdbqt 含专用 TZ 伪原子。',
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

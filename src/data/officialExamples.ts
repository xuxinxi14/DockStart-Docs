const englishRoles = {
  '原始受体（已加氢）': 'Original receptor (with hydrogens)',
  '原始配体': 'Original ligand',
  '准备后的受体': 'Prepared receptor',
  '准备后的配体': 'Prepared ligand',
  '原始配体 P59': 'Original ligand P59',
  '原始配体 P69': 'Original ligand P69',
  '准备后的配体 P59': 'Prepared ligand P59',
  '准备后的配体 P69': 'Prepared ligand P69',
  '受体刚性部分': 'Rigid receptor portion',
  '受体柔性侧链': 'Flexible receptor side chains',
  '原始大环配体': 'Original macrocyclic ligand',
  '准备后的大环配体': 'Prepared macrocyclic ligand',
  '官方配体 PDBQT': 'Official ligand PDBQT',
  '含 TZ 的受体': 'Receptor with TZ pseudoatoms',
  'AD4Zn 参数（非结构）': 'AD4Zn parameters (not a structure)',
};

export type OfficialFile = {role: keyof typeof englishRoles; path: string};
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

const englishExamples: Record<OfficialExampleId, {instruction: string; note: string}> = {
  basic: {
    instruction: 'Import existing PDBQT files directly, or prepare the PDB/SDF structures as shown below.',
    note: 'PDBQT files in solution are the official preparation outputs. Preparing the original structures again in DockStart may produce different files.',
  },
  flexible: {
    instruction: 'Use 1iep_ligand.pdbqt as the ligand. Keep the paired rigid and flex receptor files together.',
    note: 'The 1FPU example reuses the 1IEP ligand. The flex file describes receptor side chains and must not be imported as a ligand.',
  },
  batch: {
    instruction: 'Import both P59 and P69 into the ligand library, then run them individually.',
    note: 'This batch example reuses the inputs from the official 5X72 multiple-ligand example. There is no separate official batch dataset or reference result for this page.',
  },
  multiple: {
    instruction: 'Download the receptor and both ligands, P59 and P69. Keep the ligand names distinct.',
    note: 'The official directory is spelled mulitple_ligands_docking. P59 and P69 are two separate ligands.',
  },
  macrocycle: {
    instruction: 'For MOL2 input, review the ring-breaking strategy below. For prepared PDBQT input, preserve its pseudoatoms.',
    note: 'The official PDBQT already contains ring-breaking and pseudoatom information. If you prepare it again, also record the ring-breaking strategy and torsion count.',
  },
  hydrated: {
    instruction: 'These files are for hydrated AD4 docking. Follow the hydrated docking wizard below.',
    note: 'Hydrated preparation belongs to a dedicated AD4 protocol and must not be mixed with ordinary Vina/Vinardo. Check ligand protonation, candidate waters and water maps before use.',
  },
  ad4: {
    instruction: 'After importing these 1IEP structures, generate AD4 maps as shown below.',
    note: 'This page uses the same 1IEP structures as Basic Docking. AD4 requires matching affinity maps; its scores are not directly comparable with Vina/Vinardo.',
  },
  zinc: {
    instruction: 'Configure AutoGrid4 4.2.7+ and supply AD4Zn.dat before using these inputs.',
    note: 'These are the official 1S63 reference inputs. The DockStart walkthrough and validation are not yet complete. protein_tz.pdbqt contains dedicated TZ pseudoatoms.',
  },
};

export function getOfficialExample(example: OfficialExampleId, english: boolean) {
  const entry = officialExamples[example];
  return english ? {
    ...entry,
    ...englishExamples[example],
    files: entry.files.map(file => ({...file, role: englishRoles[file.role]})),
  } : entry;
}

export const officialRepository = 'https://github.com/ccsb-scripps/AutoDock-Vina';
export const officialRevision = '3c65c0b3e6c2c1d183f6a175ecb65e3c5ba91645';

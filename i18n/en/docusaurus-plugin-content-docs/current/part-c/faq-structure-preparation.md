---
title: "Structure Preparation FAQ"
sidebar_position: 4
sidebar_label: "Structure preparation"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Structure Preparation FAQ {#结构准备-faq}

Assisted converts supported raw structures into PDBQT. Review the resulting chemistry before docking; successful conversion alone does not establish a suitable model.

## What to check first {#准备结构时先检查什么}

Confirm the target chain, completeness, protonation, formal charge, chirality, alternate locations, waters, metals and cofactors. In Basic, prepare inputs externally and apply the same review.

## PDB or CIF for the receptor? {#受体用-pdb-还是-cif}

Both are accepted. Use a suitable single-model structure and check chain and residue identity after conversion. Select a model externally when needed; see [supported formats](../appendix/supported-formats.md).<NoteRef number={1}/>

## Can the ligand start from SMILES? {#配体可以从-smiles-来吗}

The preparation workflow accepts SDF, MOL and single-molecule MOL2. Prefer SDF with a reviewed structure. SMILES is not an automatic input conversion route, and multi-record MOL2 is unsupported. For PubChem queries, review candidates and explicitly select the intended molecule.

## What about hydrogens? {#氢原子要不要加dockstart-会自动加吗}

Hydrogens and their placement affect protonation and donor/acceptor assignment. Inspect prepared inputs. Ordinary Vina uses a united-atom treatment, so displayed hydrogen orientations in output poses should not be interpreted as a fully optimized physical model.

## Who chooses protonation states? {#质子化状态谁来定}

You must choose states appropriate to the question and conditions. Consider pH, ligand tautomers, histidine states and metal-binding residues. Automatic preparation does not settle every chemical ambiguity.

## How do charges matter? {#电荷是怎么回事}

Ordinary Vina scoring does not use PDBQT partial charges directly. Formal charge, protonation, connectivity and donor/acceptor assignment still affect the molecular model. AD4 uses a different scoring treatment, so do not generalize the Vina rule to AD4.

## Does chirality matter? {#手性要不要管}

Yes. Verify that the input and prepared ligand preserve the intended stereochemistry; a different stereoisomer is a different input.

## What if residues are missing? {#缺失残基怎么办}

Missing atoms or residues near the binding site can affect docking. Use a more complete structure or repair it with an appropriate external method. DockStart does not reconstruct missing segments automatically.

## How should alternate locations be handled? {#alternate-locationaltloc怎么处理}

Choose a consistent, appropriate conformer. Location A or the highest occupancy can be useful starting points, but neither is a universal rule. Review the local environment.

## Keep or remove water? {#水分子要删掉还是保留}

Decide according to the protocol and binding-site evidence. Ordinary Vina does not model explicit water exchange. Hydrated AD4 is an experimental workflow with narrower assumptions; see [advanced protocols](./advanced-protocols.md).

## What about metal ions? {#金属离子怎么办}

Do not remove a functional metal just to bypass an error. Standard AD4 rejects zinc inputs in this workflow; AD4Zn beta covers a specific **mononuclear, three-coordinate zinc** setup. It is not a general solution for Mg, Fe, Ca or multinuclear metal sites.

## Keep cofactors? {#辅因子cofactor要不要留}

Retain or remove them according to their role in the modeled site and your research question. Record the decision; automatic preparation cannot infer it reliably.

## What if the structure is incomplete? {#结构不完整怎么办}

Check missing residues, occupancy, backbone-only regions and chain selection. Obtain a better structure or repair it externally, then prepare again. A warning is information to review, not proof that docking is scientifically valid.

## What if preparation fails? {#准备失败怎么办}

Read the error and check format, structure integrity, multiple records, tool detection and output locks. A failed preparation does not replace working outputs. Fix the cause and create a new preparation record.

## Related pages {#相关页面}

- [Supported formats](../appendix/supported-formats.md)
- [Hydrogens, protonation and charges](../part-a/structure-and-files/hydrogens-protonation-and-charges.md)
- [Special structure cases](../part-a/structure-and-files/special-cases-in-structures.md)
- [Toolchain](./toolchain.md) and [common errors](./common-errors-and-recovery.md)

<DocNotes>

<DocNote number={1} title="CIF conversion checks">

Gemmi converts CIF to an intermediate PDB before Meeko preparation. DockStart rejects conversions with unreliable atom counts, chain or residue identity, and unsupported multiple models. Input and intermediate snapshots are retained. These format checks do not establish scientific suitability.

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Meeko and RDKit documentation.
2. [AutoDock Vina documentation](https://autodock-vina.readthedocs.io/en/latest/).
3. DockStart structure preparation, structure review and mmCIF conversion modules.

</details>

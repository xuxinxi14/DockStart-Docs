---
title: "References and Official Resources"
sidebar_position: 7
sidebar_label: "References"
---

# References and Official Resources {#推荐文献与官方资料}

Choose a resource for the question you need to answer. This list covers official documentation cited in the guide and a small set of foundational papers.

## Where to begin {#怎么挑}

For parameters, use the Vina manual. For unexpected behavior, start with its FAQ. For AD4 maps, consult the AutoDock4 User Guide. Preparation and format details belong in Meeko, RDKit and Gemmi documentation. DockStart-specific behavior is documented in its repository.

## 1. Official software and documentation {#一官方软件与文档}

| Resource | Main use |
| --- | --- |
| [AutoDock Vina manual](https://vina.scripps.edu/manual/) | Configuration, parameters and tasks |
| [Vina basic docking tutorial](https://autodock-vina.readthedocs.io/en/latest/docking_basic.html) | Standard workflow |
| [Vina FAQ](https://autodock-vina.readthedocs.io/en/latest/faq.html) | Behavior and scientific interpretation |
| `vina --help_advanced` | Options advertised by your executable |
| [AutoDock Vina source](https://github.com/ccsb-scripps/AutoDock-Vina) | Implementation and examples |
| AutoDock4.2 User Guide | AutoGrid, affinity maps and AD4 parameters |
| [AutoGrid source](https://github.com/ccsb-scripps/AutoGrid) | Source and versions |
| [Meeko documentation](https://meeko.readthedocs.io/en/release/) | Preparation and PDBQT generation |
| [RDKit documentation](https://www.rdkit.org/docs/) | Molecular parsing, representation and chemistry |
| [Gemmi documentation](https://gemmi.readthedocs.io/en/latest/) | Structure formats and CIF processing |
| [AutoDock website](https://autodock.scripps.edu/) | Suite overview |

## 2. Useful Vina FAQ topics {#二官方-faq-里最值得读的几条}

Read the explanations of accuracy, box size, scoring functions, reproducibility, hydrogen positions, exhaustiveness, missed binding modes, visualization, output mode counts and partial charges. These topics underpin the guide's advice on interpreting results.

## 3. Structure databases {#三结构数据库}

| Resource | Use |
| --- | --- |
| [RCSB PDB](https://www.rcsb.org/) | Macromolecular structures |
| [PubChem](https://pubchem.ncbi.nlm.nih.gov/) | Small-molecule information and SDF |

Explicit online retrieval uses the network. Database structures still need review for protonation, waters, metals, missing residues and suitability; see [structure preparation](../part-c/faq-structure-preparation.md).

## 4. Foundational papers {#四基础文献}

Check publisher records for formal citation details.

| Paper | Topic |
| --- | --- |
| Trott & Olson. *AutoDock Vina: improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading.* J Comput Chem, 2010. | Original Vina method |
| Eberhardt et al. *AutoDock Vina 1.2.0: New Docking Methods, Expanded Force Field, and Python Bindings.* J Chem Inf Model, 2021. | Vina 1.2 methods |
| Morris et al. *AutoDock4 and AutoDockTools4: Automated docking with selective receptor flexibility.* J Comput Chem, 2009. | AutoDock4 and flexible receptors |
| Quiroga & Villarreal. *Vinardo: A Scoring Function Based on AutoDock Vina Improves Scoring, Docking, and Virtual Screening.* PLoS ONE, 2016. | Vinardo scoring |
| Forli et al. *Computational protein–ligand docking and virtual drug screening with the AutoDock suite.* Nat Protoc, 2016. | Practical suite workflow |
| Wojdyr. *GEMMI: A library for structural biology.* J Open Source Softw, 2022. | Gemmi structure processing |

These papers explain computational methods. Citing them does not turn a docking prediction into experimental evidence.

## 5. DockStart resources {#五dockstart-自身资料}

The [DockStart repository](https://github.com/xuxinxi14/DockStart) contains:

| File | Topic |
| --- | --- |
| `README.md` | Release status and profiles |
| `docs/demo_projects.md` | Example projects |
| `docs/manual_pdbqt_preparation.md` | External PDBQT preparation |
| `docs/toolchain_repair_guide.md` | Toolchain repair |
| `docs/release/release_artifact_profile.md` | Bundled resources by profile |
| `docs/release/release_checklist.md` | Release acceptance |

Source entry points are `backend/dockstart_core/`, `backend/adapters/`, `apps/desktop/src/` and `apps/desktop/src-tauri/src/`. References at the bottom of individual articles identify the relevant modules.

## 6. Assessing a source {#六怎么判断一份资料能不能用}

Use official documentation and source for behavior, checking that the version matches your executable. Treat tutorials and forum answers as leads to verify. Defaults and supported options can change between versions.

## Related pages {#相关页面}

- [Supported formats](./supported-formats.md) and [toolchain](../part-c/toolchain.md)
- [Vina parameters](./vina-parameters-quick-reference.md)
- [English–Chinese glossary](./glossary-zh-en.md)
- [Interpreting results](../part-c/interpreting-results.md)
- [Projects and reproducibility](../part-c/projects-versions-reproducibility.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart README, project documentation and source.
2. AutoDock Vina manual, basic tutorial and FAQ.
3. AutoDock4.2 User Guide.
4. Meeko, RDKit and Gemmi official documentation.

</details>

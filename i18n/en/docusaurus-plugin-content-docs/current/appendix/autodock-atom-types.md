---
title: "AutoDock Atom Types"
sidebar_position: 3
sidebar_label: "AutoDock atom types"
---

# AutoDock Atom Types {#autodock-atom-types-简表}

An atom type describes a role in a scoring model, not just an element. AD4 types such as `OA` and Vina XS types such as `O_A` belong to different schemes. For the concept, see [atom types](../part-a/search-space-and-scoring/atom-types.md).

## Where types appear in DockStart {#dockstart-里-atom-type-出现在哪三处}

- AD4 maps: names such as `receptor.OA.map` and `receptor.HD.map`.
- Vina / Vinardo maps: XS names such as `receptor.C_H.map`.
- AD4Zn: the dedicated `TZ` directional pseudoatom.

## AD4 type inventory {#ad4-的类型清单}

### Standard nonmetal types {#标准非金属类型20-种}

| Type | Description |
| --- | --- |
| `C` | Aliphatic carbon |
| `A` | Aromatic carbon |
| `N` | Nitrogen |
| `NA` | Hydrogen-bond acceptor nitrogen |
| `NS` | Additional nitrogen type |
| `O` | Oxygen |
| `OA` | Hydrogen-bond acceptor oxygen |
| `OS` | Additional oxygen type |
| `S` | Sulfur |
| `SA` | Hydrogen-bond acceptor sulfur |
| `H` | Hydrogen |
| `HD` | Donor hydrogen |
| `HS` | Additional hydrogen type |
| `P` | Phosphorus |
| `F` | Fluorine |
| `Cl` | Chlorine |
| `Br` | Bromine |
| `I` | Iodine |
| `Si` | Silicon |
| `B` | Boron |

### Metal types {#金属类型8-种}

| Type | Element |
| --- | --- |
| `Ca` | Calcium |
| `Co` | Cobalt |
| `Cu` | Copper |
| `Fe` | Iron |
| `Mg` | Magnesium |
| `Mn` | Manganese |
| `Ni` | Nickel |
| `Zn` | Zinc |

### Special types {#特殊类型2-种}

| Type | Description |
| --- | --- |
| `TZ` | AD4Zn tetrahedral-direction pseudoatom, not an element |
| `W` | Water |

These groups contain 30 recognized names. Consult the official parameter file and User Guide for numerical parameters; this inventory does not establish protocol support for every listed element.

## Vina XS types {#vina-的类型清单xs-types}

| Type | Role |
| --- | --- |
| `C_H` | Hydrophobic carbon |
| `C_P` | Polar carbon |
| `N_P` | Polar nitrogen |
| `N_D` | Donor nitrogen |
| `N_A` | Acceptor nitrogen |
| `N_DA` | Donor/acceptor nitrogen |
| `O_P` | Polar oxygen |
| `O_D` | Donor oxygen |
| `O_A` | Acceptor oxygen |
| `O_DA` | Donor/acceptor oxygen |
| `S_P` | Polar sulfur |
| `P_P` | Polar phosphorus |
| `F_H` | Hydrophobic fluorine |
| `Cl_H` | Hydrophobic chlorine |
| `Br_H` | Hydrophobic bromine |
| `I_H` | Hydrophobic iodine |
| `Si` | Silicon |
| `At` | Astatine |
| `Met_D` | Metal donor type |
| `W` | Water |

Suffixes indicate hydrophobic (`_H`), polar (`_P`), donor (`_D`), acceptor (`_A`) or combined donor/acceptor (`_DA`) roles.

### Differences between the schemes {#两套清单的对照差异}

| Feature | AD4 | Vina XS |
| --- | --- | --- |
| Carbon | Aliphatic `C`, aromatic `A` | Hydrophobic `C_H`, polar `C_P` |
| Oxygen / nitrogen | Short chemical-environment types | Explicit `_P`, `_D`, `_A`, `_DA` roles |
| Astatine | Not in the listed standard set | `At` |
| Boron | `B` | Not in the listed set |
| Sulfur | `S`, `SA` | `S_P` |
| Water | `W` | `W` |

## Case normalization {#类型的大小写会被规范化}

Recognized names are normalized, for example `cl` to `Cl`. Unknown types remain unchanged for later validation; they are not silently converted to a guessed known type.

## How DockStart uses types {#实际使用中dockstart-会怎么处理}

Preparation tools assign types in PDBQT. DockStart reads the actual types and checks map and parameter coverage. Users normally do not type atoms manually. Missing coverage requires suitable preparation, maps or parameters rather than renaming atoms to bypass checks.

## Three special details {#三个需要单独记住的类型细节}

### 1. AD4Zn TZ {#1-ad4zn-的-tz}

The beta protocol creates TZ to represent the unoccupied tetrahedral direction of a supported mononuclear, three-coordinate zinc site.

### 2. AD4Zn coordinating types {#2-ad4zn-的配位原子类型}

This workflow checks these candidate coordinating atom types:

```text
O  OA  NA  N  S  SA
```

### 3. Hydrogen types {#3-氢类型}

Multiple-ligand validation treats `H` and `HD` as hydrogen types. Ordinary Vina output does not provide physically optimized hydrogen positions; do not base a conclusion on their displayed orientation alone.

## Related pages {#相关页面}

- [Atom types](../part-a/search-space-and-scoring/atom-types.md)
- [Grid and maps](../part-a/search-space-and-scoring/grid-and-maps.md)
- [Vina scoring](../part-a/search-space-and-scoring/vina-scoring.md), [Vinardo](../part-a/search-space-and-scoring/vinardo.md) and [AD4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- [Supported formats](./supported-formats.md)
- [Advanced protocols](../part-c/advanced-protocols.md)
- [File extensions](./file-extensions.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart AutoGrid, Vina maps, AD4Zn and multiple-ligand modules.
2. AutoDock4.2 User Guide and official parameter files.
3. AutoDock Vina manual and XS atom typing source.
4. Meeko documentation.

</details>

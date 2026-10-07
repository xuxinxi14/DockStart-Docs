---
title: "Website Fonts and Third-Party Resources"
sidebar_position: 6
---

# Website Fonts and Third-Party Resources {#网站字体与第三方资源}

This page records visual resources used by the documentation website. For desktop tools and distribution, see the [DockStart license notes](https://github.com/xuxinxi14/DockStart/blob/main/docs/license_notes.md).

| Resource | Use | License | Integration | Included? | User installation? |
| --- | --- | --- | --- | --- | --- |
| Noto Serif SC, weight 700 | Chinese and English headings | SIL Open Font License 1.1 | A WOFF2 character subset served with the site | Website only, not the desktop installer | No |
| Docusaurus theme icons | Standard controls, including menus and theme switching | MIT | Existing Docusaurus theme components | Existing website dependencies | No |
| Official AutoDock Vina example files | Sources for structures, prepared inputs and reference configurations | As declared by the upstream repository and files | Links to official repository files | Structures are not copied into the website | Download as needed |

Font source: [Google Fonts / Noto Serif SC](https://github.com/google/fonts/tree/main/ofl/notoserifsc). The copyright and license are in the [font OFL file](/fonts/OFL-NotoSerifSC.txt).

The subset covers current heading characters; other characters use local serif fallbacks. Maintainers can refresh it with `python scripts/update-heading-font.py`. Generating the font requires network access; browsing the website does not require Google Fonts.

The bilingual website adds no npm runtime dependencies. Existing sources and license terms continue to apply to text, screenshots and scientific tools.

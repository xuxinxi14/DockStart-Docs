import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'DockStart 帮助文档',
  tagline: '从结构准备到结果解释的分子对接指南',
  url: 'https://xuxinxi14.github.io',
  baseUrl: '/DockStart-Docs/',
  organizationName: 'xuxinxi14',
  projectName: 'DockStart-Docs',
  favicon: 'img/favicon.svg',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          breadcrumbs: true,
          sidebarItemsGenerator: async (args) => {
            const items = await args.defaultSidebarItemsGenerator(args);
            const chapterLabels: Record<string, string> = {
              '序章：认识分子对接': '入门概念',
              '第一章：理解一次分子对接': '基础原理',
              '第二章：真实案例': '实战案例',
              '第三章：使用、排错与科学边界': '使用与排错',
            };
            const flatten = (list: typeof items): typeof items => list.flatMap((item) => {
              if (item.type !== 'category') return ['label' in item && typeof item.label === 'string' ? {...item, label: item.label.replace(/^[A-Z]\.\s*/, '')} : item];
              const children = flatten(item.items);
              return item.label === '实战案例' ? children : [{...item, label: chapterLabels[item.label] ?? item.label.replace(/^[A-Z]\.\s*/, ''), items: children}];
            });
            return flatten(items);
          },
        },
        blog: false,
        pages: {},
        theme: {customCss: ['./src/css/custom.css', './src/css/preferences.css']},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: false},
    navbar: {
      title: 'DockStart',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'right',
          label: '全部文档',
        },
        {to: '/docs/part-b/cases/basic-docking-1iep', label: '实战案例', position: 'right'},
        {to: '/search', label: '搜索', position: 'right'},
        {href: 'https://github.com/xuxinxi14/DockStart', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [
        {title: '阅读', items: [{label: '入门概念', to: '/docs/intro/what-docking-solves'}, {label: '实战案例', to: '/docs/part-b/cases/basic-docking-1iep'}, {label: '常见排错', to: '/docs/part-c/common-errors-and-recovery'}]},
        {title: '项目', items: [{label: '源代码', href: 'https://github.com/xuxinxi14/DockStart'}, {label: '版本与发布', href: 'https://github.com/xuxinxi14/DockStart/releases'}, {label: '反馈问题', href: 'https://github.com/xuxinxi14/DockStart/issues'}]},
      ],
      copyright: `DockStart 帮助文档 · 内容供学习与流程复现参考 · ${new Date().getFullYear()}`,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.vsDark},
    metadata: [{name: 'description', content: 'DockStart 中文帮助文档：分子对接基础、真实案例、软件操作、故障排查与结果解释。'}],
  } satisfies Preset.ThemeConfig,
};

export default config;

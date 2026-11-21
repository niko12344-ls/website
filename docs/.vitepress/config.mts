import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '个人文档',
  description: '个人知识库与项目文档',
  cleanUrls: false,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    anchor: {
      permalink: true
    }
  },
  themeConfig: {
    logo: undefined,
    siteTitle: '个人文档',
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除搜索条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    nav: [
  { text: '首页', link: '/' },
  { text: '使用指南', link: '/guide/getting-started' },
  { text: '项目记录', link: '/projects/' }
],
    sidebar: [
      {
        text: '概览',
        items: [
          { text: '文档首页', link: '/' },
          { text: '关于本站', link: '/about' }
        ]
      },
      {
        text: '使用指南',
        collapsed: false,
        items: [
          { text: '开始使用', link: '/guide/getting-started' },
          { text: 'Markdown 写作', link: '/guide/markdown' }
        ]
      },
      {
        text: '项目记录',
        collapsed: false,
        items: [
          { text: '项目索引', link: '/projects/' },
          { text: '示例项目', link: '/projects/example' }
        ]
      }
    ],
    socialLinks: [],
    footer: {
      message: '由 VitePress 驱动',
      copyright: '个人文档'
    }
  }
})

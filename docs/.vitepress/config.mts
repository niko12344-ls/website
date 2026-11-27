import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 文档目录
const docsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)

const wikiDir = path.join(docsDir, 'wiki')

// 获取 Markdown 标题
function getTitle(file: string, fallback: string): string {
  const content = fs.readFileSync(file, 'utf-8')

  const frontmatter = content.match(
    /^---\s*\n([\s\S]*?)\n---/
  )

  const titleMatch = frontmatter?.[1].match(
    /^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))\s*$/m
  )

  if (titleMatch) {
    const title =
      titleMatch[1] ?? titleMatch[2] ?? titleMatch[3]

    if (title) return title.trim()
  }

  const heading = content.match(/^#\s+(.+)$/m)

  return heading?.[1].trim() || fallback
}

// 自动生成维基侧边栏
function generateWikiSidebar(dir = wikiDir): any[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(item =>
      !item.name.startsWith('.') &&
      item.name !== 'index.md'
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(item => {
      const fullPath = path.join(dir, item.name)

      // 文件夹
      if (item.isDirectory()) {
        const indexFile = path.join(fullPath, 'index.md')
        const hasIndex = fs.existsSync(indexFile)
        const children = generateWikiSidebar(fullPath)

        // 忽略没有 Markdown 内容的空文件夹
        if (!hasIndex && children.length === 0) return null

        const relativePath = path.relative(wikiDir, fullPath)
          .split(path.sep)
          .join('/')

        return {
          text: hasIndex
            ? getTitle(indexFile, item.name)
            : item.name,

          // 有 index.md 时，文件夹名称可以点击跳转
          ...(hasIndex
            ? { link: `/wiki/${relativePath}/` }
            : {}),

          // 保留独立的展开/收起按钮
          collapsed: true,
          items: children
        }
      }

      // Markdown 文件
      if (!item.name.endsWith('.md')) return null

      const name = item.name.replace(/\.md$/, '')

      const relativePath = path.relative(wikiDir, fullPath)
        .split(path.sep)
        .join('/')
        .replace(/\.md$/, '')

      return {
        text: getTitle(fullPath, name),
        link: `/wiki/${relativePath}`
      }
    })
    .filter(item => item !== null)
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Liang Wiki',
  description: '个人知识库与项目',

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
    siteTitle: 'Liang Wiki',

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于'
    },

    // 关闭上一篇/下一篇按钮
    docFooter: {
      prev: false,
      next: false
    },

    // 全文搜索
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

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '维基', link: '/wiki/' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏
    sidebar: {
      // 维基：自动扫描
      '/wiki/': [
        {
          text: '维基',
          collapsed: true,
          items: [
            { text: '维基首页', link: '/wiki/' },
            ...generateWikiSidebar()
          ]
        }
      ],

      // 原有文档导航：保留
      '/': [
        {
          text: '概览',
          collapsed: false,
          items: [
            { text: '维基首页', link: '/' },
            { text: '关于本站', link: '/about' },
										{ text: '写作方法', link: '/markdown' }
          ]
        },
        // 维基分组
        {
          text: '维基',
          collapsed: true,
          items: [
            { text: '维基首页', link: '/wiki/' },
            ...generateWikiSidebar()
          ]
        }
      ]
    },

    socialLinks: [],

    footer: {
      message: '由 VitePress 驱动',
      copyright: 'Liang Wiki'
    }
  }
})

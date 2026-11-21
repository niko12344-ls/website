# 开始使用

本网站由 Markdown 文档生成。每个 `.md` 文件对应一个页面，导航菜单由 `.vitepress/config.mts` 管理。

## 新增一篇文档

例如，新增 `docs/guide/network.md`：

```markdown
# 网络笔记

这里写正文。

## 配置步骤

1. 第一步
2. 第二步
```

然后在 `.vitepress/config.mts` 的 `sidebar` 对应分组中加入：

```ts
{ text: '网络笔记', link: '/guide/network' }
```

## 发布更新

保存并提交到 GitHub 的 `main` 分支。Cloudflare Pages 会自动重新构建。

::: tip 提示
文件名建议使用英文小写、数字和连字符；页面标题可以正常使用中文。
:::

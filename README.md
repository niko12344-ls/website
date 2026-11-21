# 个人文档站

基于 VitePress 的中文个人文档站，采用 Material Design 风格的自定义样式，支持深色模式、响应式布局、代码高亮和本地全文搜索。

## Cloudflare Pages 部署

将本项目文件上传到 GitHub 仓库根目录，然后在 Cloudflare Pages 中导入该仓库。

| 设置项 | 值 |
| --- | --- |
| Framework preset | `None` |
| Production branch | `main` |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Environment variable | `NODE_VERSION` = `22` |

首次部署时 Cloudflare Pages 会安装 `package.json` 中的依赖并执行构建。以后修改 Markdown 并提交到 GitHub，Pages 会自动重新部署。

## 添加文档

1. 在 `docs/` 中创建 `.md` 文件。
2. 在 `docs/.vitepress/config.mts` 的 `sidebar` 中加入页面路径。
3. 提交到 GitHub，等待 Cloudflare Pages 构建。

例如新增 `docs/notes/example.md`，侧边栏路径写成 `/notes/example`。

## 修改站点名称和导航

编辑 `docs/.vitepress/config.mts`：
- `title`：浏览器标题和站点名称
- `description`：站点描述
- `themeConfig.nav`：顶部导航
- `themeConfig.sidebar`：左侧目录

## 本地预览（可选）

需要 Node.js 20 或更高版本：

```bash
npm install
npm run docs:dev
```

## 搜索

已启用 VitePress 内置 Local Search。搜索索引在构建时生成，访客无需连接第三方搜索服务，也不需要数据库或 API 密钥。

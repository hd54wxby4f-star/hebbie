# hebbie · 个人主页

React + Vite + TypeScript 构建的暗色科技感个人博客。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

构建时会自动执行 `scripts/fetch-notion.mjs`:

- 未配置 `NOTION_TOKEN` 时,使用内置示例文章(`src/data/sample-posts.json`)。
- 配置后,从 Notion 数据库拉取文章并生成 `src/generated/posts.json`。

## 站点配置

所有站点信息(站名、简介、社交链接、Giscus、统计)集中在 `src/config.ts`。

## 部署

推送 `main` 分支触发 GitHub Actions 自动部署到 GitHub Pages。首次使用需:

1. 仓库 Settings → Pages → Source 选择 **GitHub Actions**。
2. 如需 Giscus 评论:在仓库开启 Discussions,并把仓库名写入 `src/config.ts`。
3. 可选:在仓库 Secrets 中配置 `NOTION_TOKEN`、`NOTION_DATABASE_ID`,启用 Notion 文章拉取。

## Notion 数据库字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| 标题 | Title | 文章标题 |
| slug | Text | URL 标识,需唯一 |
| 摘要 | Rich text | 列表页摘要 |
| 标签 | Multi-select | 标签 |
| 封面 | URL | 封面图片地址 |
| 发布日期 | Date | 发布时间 |
| 置顶 | Checkbox | 置顶文章 |

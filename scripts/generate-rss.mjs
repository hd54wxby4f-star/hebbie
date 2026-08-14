import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const postsPath = path.join(root, 'src/generated/posts.json')
const outDir = path.join(root, 'dist')
const outPath = path.join(outDir, 'rss.xml')

// 站点地址:部署到 GitHub Pages 后请改为你的真实地址
const SITE_URL = 'https://hebbie.github.io'
const SITE_NAME = 'hebbie'
const SITE_DESC = 'hebbie 的个人主页与博客'

const posts = JSON.parse(await readFile(postsPath, 'utf8'))
const items = posts
  .map((post) => {
    const link = `${SITE_URL}/#/blog/${encodeURIComponent(post.slug)}`
    const tags = (post.tags ?? [])
      .map((t) => `<category>${escapeXml(t)}</category>`)
      .join('')
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="false">${link}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt ?? ''}]]></description>
      ${tags}
    </item>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

await mkdir(outDir, { recursive: true })
await writeFile(outPath, xml)
console.log(`[rss] 已生成 ${outPath}(${posts.length} 篇文章)`)

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

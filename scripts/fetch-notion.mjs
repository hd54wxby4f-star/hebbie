import 'dotenv/config'
import { Client } from '@notionhq/client'
import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const generatedPath = path.join(root, 'src/generated/posts.json')
const samplePath = path.join(root, 'src/data/sample-posts.json')
const notionImagesDir = path.join(root, 'public/images/notion')

const token = process.env.NOTION_TOKEN
const databaseId = process.env.NOTION_DATABASE_ID

if (!token || !databaseId) {
  await copyFile(samplePath, generatedPath)
  console.log('[fetch-notion] 未配置 NOTION_TOKEN,使用内置示例文章。')
  process.exit(0)
}

const notion = new Client({ auth: token })

function richText(block, key) {
  return (block[key]?.rich_text ?? []).map((t) => t.plain_text).join('')
}

async function downloadImage(url, pageId, index) {
  try {
    const res = await fetch(url)
    if (!res.ok) return url
    const buf = Buffer.from(await res.arrayBuffer())
    await mkdir(notionImagesDir, { recursive: true })
    const ext = url.split('?')[0].match(/\.(png|jpe?g|webp|gif)$/i)?.[1] ?? 'png'
    const name = `${pageId}-${index}.${ext.replace('jpeg', 'jpg')}`
    const filePath = path.join(notionImagesDir, name)
    await writeFile(filePath, buf)
    return `/images/notion/${name}`
  } catch {
    return url
  }
}

async function convertBlocks(blocks, pageId) {
  const out = []
  let i = 0
  for (const block of blocks) {
    const b = block[block.type]
    if (!b) continue
    let imgIndex = 0
    switch (block.type) {
      case 'paragraph':
        out.push({ type: 'paragraph', text: richText(block, 'paragraph') })
        break
      case 'heading_1':
        out.push({ type: 'heading', level: 1, text: richText(block, 'heading_1') })
        break
      case 'heading_2':
        out.push({ type: 'heading', level: 2, text: richText(block, 'heading_2') })
        break
      case 'heading_3':
        out.push({ type: 'heading', level: 3, text: richText(block, 'heading_3') })
        break
      case 'bulleted_list_item':
        out.push({ type: 'bulleted_list', text: richText(block, 'bulleted_list_item') })
        break
      case 'numbered_list_item':
        out.push({ type: 'numbered_list', text: richText(block, 'numbered_list_item') })
        break
      case 'quote':
        out.push({ type: 'quote', text: richText(block, 'quote') })
        break
      case 'divider':
        out.push({ type: 'divider' })
        break
      case 'callout':
        out.push({ type: 'callout', text: richText(block, 'callout') })
        break
      case 'code': {
        const lang = b.language || 'text'
        out.push({ type: 'code', language: lang, text: richText(block, 'code') })
        break
      }
      case 'image': {
        imgIndex += 1
        const src = b.type === 'external' ? b.external.url : b.file?.url
        if (!src) break
        const url = b.type === 'file' ? await downloadImage(src, pageId, imgIndex) : src
        const caption = b.caption?.map((t) => t.plain_text).join('') || undefined
        out.push({ type: 'image', url, caption })
        break
      }
      default:
        break
    }
  }
  return out
}

async function fetchBlocks(pageId) {
  const blocks = []
  let cursor
  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: cursor,
    })
    blocks.push(...res.results)
    cursor = res.next_cursor
  } while (cursor)
  return blocks
}

async function main() {
  const res = await notion.databases.query({
    database_id: databaseId,
    filter: { property: '标题', title: { is_not_empty: true } },
    sorts: [{ property: '发布日期', direction: 'descending' }],
  })

  const posts = []
  for (const page of res.results) {
    const p = page.properties
    const title = p['标题']?.title?.[0]?.plain_text ?? ''
    const slug = p['slug']?.rich_text?.[0]?.plain_text ?? ''
    if (!title || !slug) continue
    const blocks = await fetchBlocks(page.id)
    const content = await convertBlocks(blocks, page.id)
    posts.push({
      id: page.id,
      slug,
      title,
      excerpt: p['摘要']?.rich_text?.[0]?.plain_text ?? '',
      tags: (p['标签']?.multi_select ?? []).map((t) => t.name),
      cover: p['封面']?.url ?? '',
      date: p['发布日期']?.date?.start ?? '',
      pinned: p['置顶']?.checkbox ?? false,
      content,
    })
  }

  await mkdir(path.dirname(generatedPath), { recursive: true })
  await writeFile(generatedPath, JSON.stringify(posts, null, 2))
  console.log(`[fetch-notion] 已从 Notion 拉取 ${posts.length} 篇文章。`)
}

main().catch((err) => {
  console.error('[fetch-notion] 拉取失败:', err.message)
  process.exit(1)
})

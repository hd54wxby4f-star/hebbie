import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import 'highlight.js/styles/atom-one-dark.css'
import type { Block } from '../types'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('md', markdown)

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

interface ListGroup {
  type: 'bulleted_list' | 'numbered_list'
  items: string[]
}

function groupBlocks(blocks: Block[]): (Block | ListGroup)[] {
  const out: (Block | ListGroup)[] = []
  let current: ListGroup | null = null

  for (const b of blocks) {
    if (b.type === 'bulleted_list' || b.type === 'numbered_list') {
      if (!current || current.type !== b.type) {
        current = { type: b.type, items: [] }
        out.push(current)
      }
      current.items.push(b.text)
    } else {
      current = null
      out.push(b)
    }
  }
  return out
}

function CodeBlock({ text, language }: { text: string; language: string }) {
  const lang = hljs.getLanguage(language) ? language : null
  const html = lang ? hljs.highlight(text, { language: lang }).value : escapeHtml(text)
  return (
    <div className="code-block">
      <span className="code-lang">{language || 'text'}</span>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  )
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="post-body">
      {groupBlocks(blocks).map((block, i) => {
        if ('items' in block) {
          const Tag = block.type === 'numbered_list' ? 'ol' : 'ul'
          return (
            <Tag key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </Tag>
          )
        }
        switch (block.type) {
          case 'paragraph':
            return <p key={i}>{block.text}</p>
          case 'heading': {
            const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3'
            return <Tag key={i}>{block.text}</Tag>
          }
          case 'quote':
            return (
              <blockquote key={i}>
                <p>{block.text}</p>
              </blockquote>
            )
          case 'code':
            return <CodeBlock key={i} text={block.text} language={block.language} />
          case 'image':
            return (
              <figure key={i} className="post-figure">
                <img src={block.url} alt={block.caption ?? ''} loading="lazy" />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            )
          case 'divider':
            return <hr key={i} />
          case 'callout':
            return (
              <div key={i} className="callout">
                {block.text}
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

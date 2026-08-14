import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getSortedPosts, getAllTags } from '../lib/posts'
import PostCard from '../components/PostCard'
import Reveal from '../components/Reveal'

export default function Blog() {
  const all = useMemo(() => getSortedPosts(), [])
  const tags = useMemo(() => getAllTags(), [])
  const [searchParams] = useSearchParams()
  const [activeTag, setActiveTag] = useState(searchParams.get('tag') ?? '全部')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter((p) => {
      const matchTag = activeTag === '全部' || (p.tags ?? []).includes(activeTag)
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
      return matchTag && matchQuery
    })
  }, [all, activeTag, query])

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <p className="page-eyebrow">Blog</p>
        <h1 className="page-title">博客文章</h1>
        <p className="page-desc">记录技术、设计与生活,共 {all.length} 篇。</p>
      </header>

      <div className="blog-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="搜索文章标题、摘要或标签…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="tag-row tag-filter">
          {['全部', ...tags].map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-chip${activeTag === t ? ' active' : ''}`}
              onClick={() => setActiveTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="post-grid">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="empty glass">
          <p>没有找到匹配的文章</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setActiveTag('全部')
              setQuery('')
            }}
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  )
}

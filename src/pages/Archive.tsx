import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getSortedPosts, formatDate } from '../lib/posts'
import Reveal from '../components/Reveal'

export default function Archive() {
  const posts = useMemo(() => getSortedPosts(), [])

  const years = useMemo(() => {
    const map = new Map<string, typeof posts>()
    for (const p of posts) {
      const year = p.date.slice(0, 4) || '未分类'
      if (!map.has(year)) map.set(year, [])
      map.get(year)!.push(p)
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]))
  }, [posts])

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <p className="page-eyebrow">Archive</p>
        <h1 className="page-title">归档</h1>
        <p className="page-desc">按时间整理的全部文章,共 {posts.length} 篇。</p>
      </header>

      {years.map(([year, list], y) => (
        <Reveal key={year} delay={y * 60}>
          <section className="archive-year">
            <h2 className="archive-year-title">{year}</h2>
            <ul className="archive-list">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="archive-item">
                    <time className="archive-date">{formatDate(p.date)}</time>
                    <span className="archive-title">{p.title}</span>
                    <span className="archive-tags">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="tag">#{t}</span>
                      ))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  )
}

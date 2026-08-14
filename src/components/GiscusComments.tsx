import { useEffect, useRef } from 'react'
import { siteConfig } from '../config'

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  const { repo, repoId, category, categoryId } = siteConfig.giscus
  const enabled = Boolean(repo && repoId && category && categoryId)

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    const s = document.createElement('script')
    s.src = 'https://giscus.app/client.js'
    s.async = true
    s.crossOrigin = 'anonymous'
    s.setAttribute('data-repo', repo)
    s.setAttribute('data-repo-id', repoId)
    s.setAttribute('data-category', category)
    s.setAttribute('data-category-id', categoryId)
    s.setAttribute('data-mapping', 'pathname')
    s.setAttribute('data-strict', '0')
    s.setAttribute('data-reactions-enabled', '1')
    s.setAttribute('data-emit-metadata', '0')
    s.setAttribute('data-input-position', 'bottom')
    s.setAttribute('data-theme', 'dark')
    s.setAttribute('data-lang', 'zh-CN')
    s.setAttribute('data-loading', 'lazy')
    el.appendChild(s)
    return () => {
      el.replaceChildren()
    }
  }, [enabled, repo, repoId, category, categoryId])

  if (!enabled) return null
  return (
    <div className="giscus-wrap">
      <h2 className="section-subtitle">评论</h2>
      <div ref={ref} />
    </div>
  )
}

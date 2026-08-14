import { Link, useParams } from 'react-router-dom'
import { getPostBySlug, formatDate } from '../lib/posts'
import BlockRenderer from '../components/BlockRenderer'
import GiscusComments from '../components/GiscusComments'
import NotFound from './NotFound'

export default function PostDetail() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <NotFound />

  return (
    <article className="page page-narrow post-detail">
      {post.cover && (
        <div className="post-hero">
          <img src={post.cover} alt={post.title} />
        </div>
      )}
      <header className="post-head">
        <div className="post-meta">
          <time>{formatDate(post.date)}</time>
          {post.pinned && <span className="badge">置顶</span>}
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="tag-row">
          {post.tags.map((t) => (
            <Link key={t} to={`/blog?tag=${encodeURIComponent(t)}`} className="tag tag-link">
              #{t}
            </Link>
          ))}
        </div>
        {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      </header>

      <BlockRenderer blocks={post.content} />

      <div className="post-nav">
        <Link to="/blog" className="text-link">← 返回博客列表</Link>
      </div>

      <GiscusComments />
    </article>
  )
}

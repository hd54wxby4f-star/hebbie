import { Link } from 'react-router-dom'
import type { Post } from '../types'
import { formatDate } from '../lib/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post-card">
      {post.cover && (
        <div className="post-card-cover">
          <img src={post.cover} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="post-card-body">
        <div className="post-card-meta">
          <time>{formatDate(post.date)}</time>
          {post.pinned && <span className="badge">置顶</span>}
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-foot">
          <div className="tag-row">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="tag">#{t}</span>
            ))}
          </div>
          <span className="post-card-more">阅读全文 →</span>
        </div>
      </div>
    </Link>
  )
}

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page notfound">
      <p className="page-eyebrow">404</p>
      <h1 className="page-title">页面不存在</h1>
      <p className="page-desc">你访问的页面可能已被移动或删除。</p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-primary">返回首页</Link>
        <Link to="/blog" className="btn btn-ghost">去博客</Link>
      </div>
    </div>
  )
}

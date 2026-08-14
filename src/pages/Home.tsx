import { Link } from 'react-router-dom'
import { asset } from '../lib/asset'
import { siteConfig } from '../config'
import { getSortedPosts, getPinnedPosts } from '../lib/posts'
import PostCard from '../components/PostCard'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

export default function Home() {
  const pinned = getPinnedPosts()
  const recent = getSortedPosts()
  const featured = [...pinned, ...recent.filter((r) => !pinned.some((p) => p.slug === r.slug))].slice(0, 3)

  return (
    <>
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${asset('/images/hero.png')})` }}
          aria-hidden="true"
        />
        <div className="hero-content">
          <div className="hero-avatar">
            <img src={asset('/images/avatar.png')} alt={`${siteConfig.name} 的头像`} />
          </div>
          <p className="hero-eyebrow">Hi, I'm</p>
          <h1 className="hero-title">{siteConfig.name}</h1>
          <p className="hero-tagline">{siteConfig.tagline}</p>
          <p className="hero-bio">{siteConfig.bio}</p>
          <div className="hero-actions">
            <Link to="/blog" className="btn btn-primary">阅读博客</Link>
            <Link to="/about" className="btn btn-ghost">关于我</Link>
          </div>
          <div className="hero-social">
            {siteConfig.social.map((s) => (
              <a key={s.label} href={s.href} className="chip-link" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="latest" className="section">
        <div className="section-head">
          <h2 className="section-title">最新文章</h2>
          <Link to="/blog" className="text-link">查看全部 →</Link>
        </div>
        <div className="post-grid">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">项目</h2>
          <span className="section-hint">精选作品</span>
        </div>
        <div className="project-grid">
          {siteConfig.projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="cta-card glass">
            <h2 className="cta-title">想了解更多?</h2>
            <p className="cta-desc">从我的博客开始,或通过社交渠道直接联系我。</p>
            <Link to="/about" className="btn btn-primary">关于我</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

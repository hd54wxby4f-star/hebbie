import { siteConfig } from '../config'
import Reveal from '../components/Reveal'

export default function About() {
  return (
    <div className="page page-narrow about-page">
      <header className="page-head">
        <p className="page-eyebrow">About</p>
        <h1 className="page-title">关于我</h1>
      </header>

      <Reveal>
        <div className="about-card glass">
          <img src="/images/avatar.png" alt={`${siteConfig.name} 的头像`} className="about-avatar" />
          <div className="about-info">
            <h2 className="about-name">{siteConfig.name}</h2>
            <p className="about-tagline">{siteConfig.tagline}</p>
            <p className="about-bio">{siteConfig.bio}</p>
            <div className="about-social">
              {siteConfig.social.map((s) => (
                <a key={s.label} href={s.href} className="chip-link" target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
            <a href={`mailto:${siteConfig.email}`} className="btn btn-primary">
              联系我
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <section className="about-facts">
          <h2 className="section-title">一些事实</h2>
          <div className="facts-grid">
            <div className="fact-card glass">
              <span className="fact-num">4+</span>
              <span className="fact-label">年编程经验</span>
            </div>
            <div className="fact-card glass">
              <span className="fact-num">30+</span>
              <span className="fact-label">开源项目</span>
            </div>
            <div className="fact-card glass">
              <span className="fact-num">∞</span>
              <span className="fact-label">对技术的好奇心</span>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  )
}

import { siteConfig } from '../config'
import Busuanzi from './Busuanzi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-social">
          {siteConfig.social.map((s) => (
            <a key={s.label} href={s.href} className="chip-link" target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} {siteConfig.name} · 用 React 与好奇心构建
        </p>
        {siteConfig.busuanzi && <Busuanzi />}
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteConfig } from '../config'

const links = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '博客' },
  { to: '/archive', label: '归档' },
  { to: '/about', label: '关于' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-mark">h</span>
          <span className="nav-logo-text">{siteConfig.name}</span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className={`nav-toggle${open ? ' open' : ''}`}
          aria-label="切换菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { homeCopy, navLinks } from '../data/home'
import { lockScroll, unlockScroll } from '../utils/scrollLock'
import { useAutoHideNav } from '../hooks/useAutoHideNav'

const menuLinks = [...navLinks]

function isInternalPath(href: string) {
  return href.startsWith('/') && !href.startsWith('/#')
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // Hide sticky header (and journey nav) on scroll down; show on scroll up
  useAutoHideNav(!onHome && !open)

  useEffect(() => {
    document.documentElement.classList.toggle('is-nav-open', open)
    return () => document.documentElement.classList.remove('is-nav-open')
  }, [open])

  useEffect(() => {
    if (open) {
      lockScroll()
      return () => unlockScroll()
    }
    if (onHome) document.body.style.overflow = 'hidden'
  }, [open, onHome])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Brihadishwara Temple home">
          <img
            className="brand-mark"
            src="/assets/brand-logo.png?v=3"
            alt=""
            width={54}
            height={40}
          />
          <span className="brand-name">
            <span className="brand-name-main">{homeCopy.brand}</span>
            <span className="brand-name-sub">{homeCopy.brandSub}</span>
          </span>
        </Link>

        <div className="header-actions">
          <Link className="header-cta" to="/explore">
            {homeCopy.cta}
          </Link>
          <button
            className={`menu-toggle ${open ? 'is-open' : ''}`}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`site-nav-backdrop ${open ? 'is-open' : ''}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={close}
      />

      <nav
        id="site-menu"
        className={`site-nav ${open ? 'is-open' : ''}`}
        aria-label="Primary"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="site-nav-panel">
          <ul>
            {menuLinks.map((link) => (
              <li key={link.href}>
                {isInternalPath(link.href) ? (
                  <Link to={link.href} onClick={close}>
                    {link.label}
                  </Link>
                ) : onHome ? (
                  <a href={link.href} onClick={close}>
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={{ pathname: '/', hash: link.href.replace(/^#/, '') }}
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

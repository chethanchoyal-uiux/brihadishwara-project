import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'brihadishwara_theme'

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
    return null
  } catch {
    return null
  }
}

function readScrollY() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

export function ThemeToggle() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const initialTheme = useMemo(() => readStoredTheme() ?? 'light', [])
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [scrolled, setScrolled] = useState(() => !onHome && readScrollY() > 12)

  useLayoutEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (onHome) {
      setScrolled(false)
      return
    }

    const threshold = 12
    let ticking = false

    const update = () => {
      setScrolled(readScrollY() > threshold)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      document.removeEventListener('scroll', onScroll, true)
    }
  }, [onHome])

  const isDark = theme === 'dark'

  const toggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const button = (
    <button
      type="button"
      className={`theme-pill${isDark ? ' is-dark' : ''}${scrolled ? ' is-scrolled' : ''}`}
      data-tour="theme-toggle"
      aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      aria-pressed={isDark}
      onClick={toggle}
    >
      <svg
        className="theme-pill-sun"
        viewBox="0 0 24 24"
        width="13"
        height="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="19.78" y1="4.22" x2="17.66" y2="6.34" />
        <line x1="6.34" y1="17.66" x2="4.22" y2="19.78" />
      </svg>

      <span className="theme-pill-divider" aria-hidden="true" />

      <svg
        className="theme-pill-moon"
        viewBox="0 0 24 24"
        width="13"
        height="13"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    </button>
  )

  if (typeof document === 'undefined') return null
  return createPortal(button, document.body)
}

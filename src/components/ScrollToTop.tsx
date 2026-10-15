import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

function readScrollY() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (onHome) {
      setVisible(false)
      return
    }

    const threshold = 420
    let ticking = false

    const update = () => {
      setVisible(readScrollY() > threshold)
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

  if (onHome || typeof document === 'undefined') return null

  const button = (
    <button
      type="button"
      className={`scroll-top${visible ? ' is-visible' : ''}`}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 14l6-6 6 6" />
      </svg>
    </button>
  )

  return createPortal(button, document.body)
}

import { useEffect } from 'react'

/**
 * Hide sticky chrome while scrolling down; reveal it again on scroll up.
 * Sets `data-nav-hidden` on <html>. Disabled near the top of the page.
 */
export function useAutoHideNav(enabled: boolean) {
  useEffect(() => {
    const root = document.documentElement

    if (!enabled) {
      delete root.dataset.navHidden
      return
    }

    let lastY = window.scrollY || document.documentElement.scrollTop || 0
    let hidden = false
    let raf = 0

    const setHidden = (next: boolean) => {
      if (next === hidden) return
      hidden = next
      if (hidden) root.dataset.navHidden = 'true'
      else delete root.dataset.navHidden
    }

    const update = () => {
      raf = 0
      // Journey / contents programmatic jumps freeze chrome so layout stays put.
      if (root.dataset.programmaticScroll) {
        lastY = window.scrollY || document.documentElement.scrollTop || 0
        return
      }

      const y = window.scrollY || document.documentElement.scrollTop || 0
      const delta = y - lastY

      if (y <= 56) {
        setHidden(false)
      } else if (delta > 6) {
        setHidden(true)
      } else if (delta < -6) {
        setHidden(false)
      }

      lastY = y
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      delete root.dataset.navHidden
    }
  }, [enabled])
}

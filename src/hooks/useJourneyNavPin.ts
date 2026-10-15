import { useEffect, useState, type RefObject } from 'react'

function readPxVar(name: string, fallback: number) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const value = parseFloat(raw)
  return Number.isFinite(value) ? value : fallback
}

function measureHeaderBottom() {
  const header = document.querySelector('.site-header')
  if (!header) return readPxVar('--header-h', 50)
  const rect = header.getBoundingClientRect()
  // When the header auto-hides (translated up), sit the journey list at the top.
  return Math.max(0, rect.bottom)
}

function measureNavHeight() {
  const nav = document.querySelector('.ex-journey-nav-pin')
  if (!nav) return readPxVar('--ex-journey-nav-h', 53)
  const height = nav.getBoundingClientRect().height
  return height > 0 ? height : readPxVar('--ex-journey-nav-h', 53)
}

/**
 * Keep the journey stop list pinned for the full journey scene.
 * Releases only when the scene has scrolled away (section end).
 *
 * Map backdrop geometry stays locked to the header slot (`--header-h`) so
 * auto-hide show/hide does not resize or re-crop the sticky image.
 */
export function useJourneyNavPin(sceneRef: RefObject<HTMLElement | null>) {
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    let raf = 0

    const update = () => {
      raf = 0
      const programmatic = document.documentElement.dataset.programmaticScroll === 'true'
      const pinTop = programmatic ? 0 : measureHeaderBottom()
      const navH = measureNavHeight()
      const headerSlot = readPxVar('--header-h', 50)
      // Stable map inset — ignore live header translation from auto-hide.
      const mapTop = headerSlot + navH
      const rect = scene.getBoundingClientRect()

      document.documentElement.style.setProperty('--ex-journey-pin-top', `${pinTop}px`)
      document.documentElement.style.setProperty('--ex-journey-map-top', `${mapTop}px`)
      document.documentElement.style.setProperty('--ex-journey-nav-h', `${navH}px`)

      // Pin once the scene reaches the chrome; stay pinned until the scene
      // bottom clears the journey list — i.e. until the journey section ends.
      setPinned(rect.top <= pinTop + 8 && rect.bottom > pinTop + navH)
    }

    const onScrollOrResize = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      document.documentElement.style.removeProperty('--ex-journey-pin-top')
      document.documentElement.style.removeProperty('--ex-journey-map-top')
    }
  }, [sceneRef])

  useEffect(() => {
    const root = document.documentElement
    if (pinned) root.dataset.journeyPinned = 'true'
    else delete root.dataset.journeyPinned
    return () => {
      delete root.dataset.journeyPinned
    }
  }, [pinned])

  return pinned
}

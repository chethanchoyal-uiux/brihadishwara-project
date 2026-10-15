import { useEffect, useState } from 'react'

type ScrollCueState = {
  /** Cue should be visible over the map intro */
  show: boolean
  /** Fixed viewport Y for the cue center */
  top: number
  /** Fixed viewport X for the cue center */
  left: number
}

const HIDDEN: ScrollCueState = { show: false, top: 0, left: 0 }

/**
 * Vertical “Scroll” cue over the journey map intro.
 * Positions over the live map pin; hides once the first card reaches mid-screen.
 */
export function useJourneyScrollCue(firstStopId = 'entrances-maratha') {
  const [state, setState] = useState<ScrollCueState>(HIDDEN)

  useEffect(() => {
    const map = document.querySelector<HTMLElement>('.ex-journey-map-pin')
    const card =
      document.querySelector<HTMLElement>(`#${firstStopId} .ex-journey-panel`) ??
      document.getElementById(firstStopId)
    if (!map || !card) return

    let raf = 0
    let dismissed = false

    const update = () => {
      raf = 0
      const vh = window.innerHeight || 1
      const mapRect = map.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()

      // Card has reached (or passed) the halfway line — hide for good.
      if (cardRect.top < vh * 0.5) {
        dismissed = true
      }

      const mapVisible = Math.max(
        0,
        Math.min(mapRect.bottom, vh) - Math.max(mapRect.top, 0),
      )
      const mapOnScreen = mapRect.height > 0 && mapVisible / vh >= 0.25

      if (dismissed || !mapOnScreen) {
        setState((prev) => (prev.show ? { ...prev, show: false } : prev))
        return
      }

      const top = mapRect.top + Math.min(mapRect.height * 0.2, vh * 0.18)
      const left = mapRect.left + mapRect.width / 2
      setState((prev) => {
        if (
          prev.show &&
          Math.abs(prev.top - top) < 1 &&
          Math.abs(prev.left - left) < 1
        ) {
          return prev
        }
        return { show: true, top, left }
      })
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
    }
  }, [firstStopId])

  return state
}

import { useEffect, useRef } from 'react'
import { getProgrammaticJourneyTarget } from '../utils/scrollToId'

const MOBILE_MQ = '(max-width: 859px)'
const FIRST_CARD_ID = 'entrances-maratha'
const FORWARD_MS = 680
const REVERSE_MS = 620

function pageScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function navChrome() {
  const nav = document.querySelector('.ex-journey-nav-pin')
  if (nav) {
    const h =
      nav.getBoundingClientRect().height ||
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--ex-journey-nav-h',
        ),
      ) ||
      60
    return h + 12
  }
  return 68
}

/** Image 2 — first card under the journey nav. */
function cardParkY(card: HTMLElement) {
  return Math.max(
    0,
    card.getBoundingClientRect().top + pageScrollY() - navChrome(),
  )
}

/**
 * Image 1 — full map filling the screen with THRESHOLDS just peeking.
 * Uses near-bottom peek so the resting map view is inside the snap corridor.
 */
function mapIntroY(card: HTMLElement) {
  const vh = window.innerHeight || 1
  const peekTop = vh - 12
  return Math.max(
    0,
    card.getBoundingClientRect().top + pageScrollY() - peekTop,
  )
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function mapPinVisible() {
  const pin = document.querySelector<HTMLElement>('.ex-journey-map-pin')
  if (!pin) return false
  const r = pin.getBoundingClientRect()
  const vh = window.innerHeight || 1
  const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0)
  return visible > vh * 0.2
}

/**
 * Mobile auto-snap between full-map intro (image 1) and first-card park (image 2).
 * Forward + reverse both complete automatically after the finger lifts.
 */
export function useMobileJourneyIntroSnap(enabled: boolean) {
  const animRaf = useRef(0)
  const touchingRef = useRef(false)
  const lastYRef = useRef(0)
  const dirRef = useRef(0)
  const settleTimer = useRef(0)
  const lockedRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const mq = window.matchMedia(MOBILE_MQ)
    if (!mq.matches) return

    const clearSettle = () => {
      if (settleTimer.current) {
        window.clearTimeout(settleTimer.current)
        settleTimer.current = 0
      }
    }

    const cancelAnim = () => {
      if (animRaf.current) {
        window.cancelAnimationFrame(animRaf.current)
        animRaf.current = 0
      }
    }

    const unlockSoon = () => {
      window.setTimeout(() => {
        lockedRef.current = false
      }, 140)
    }

    const finishProgrammatic = () => {
      delete document.documentElement.dataset.programmaticScroll
      window.dispatchEvent(new CustomEvent('ex-journey-scroll-end'))
      unlockSoon()
    }

    const animateScrollTo = (targetY: number, durationMs: number) => {
      cancelAnim()
      clearSettle()
      lockedRef.current = true

      const startY = pageScrollY()
      const dist = targetY - startY
      if (Math.abs(dist) < 4) {
        window.scrollTo(0, targetY)
        lockedRef.current = false
        return
      }

      const root = document.documentElement
      root.dataset.navHidden = 'true'
      root.dataset.programmaticScroll = 'true'

      if (prefersReducedMotion()) {
        window.scrollTo(0, targetY)
        finishProgrammatic()
        return
      }

      const t0 = performance.now()
      const step = (now: number) => {
        const u = Math.min(1, (now - t0) / durationMs)
        window.scrollTo(0, startY + dist * easeInOutCubic(u))
        if (u < 1) {
          animRaf.current = window.requestAnimationFrame(step)
          return
        }
        animRaf.current = 0
        window.scrollTo(0, targetY)
        requestAnimationFrame(() => {
          /* Remeasure after sticky chrome settles, then hard-stop. */
          const card = document.getElementById(FIRST_CARD_ID)
          if (card) {
            const corrected =
              dist > 0 ? cardParkY(card) : mapIntroY(card)
            window.scrollTo(0, corrected)
          }
          finishProgrammatic()
        })
      }
      animRaf.current = window.requestAnimationFrame(step)
    }

    const measures = () => {
      const card = document.getElementById(FIRST_CARD_ID)
      if (!card) return null
      const y = pageScrollY()
      const intro = mapIntroY(card)
      const park = cardParkY(card)
      if (park <= intro + 40) return null
      return { card, y, intro, park, span: park - intro }
    }

    /** True while user is in the map↔first-card beat. */
    const inBeat = (m: { y: number; intro: number; park: number }) => {
      /* Generous top slack — image 1 often sits slightly above computed intro. */
      if (m.y < m.intro - 220) return false
      /* Leave users alone once they scroll into later cards. */
      if (m.y > m.park + 180) return false
      return true
    }

    const goForward = () => {
      if (lockedRef.current || touchingRef.current) return
      const m = measures()
      if (!m || !inBeat(m)) return
      if (m.y >= m.park - 8) return
      animateScrollTo(m.park, FORWARD_MS)
    }

    const goReverse = () => {
      if (lockedRef.current || touchingRef.current) return
      const m = measures()
      if (!m || !inBeat(m)) return
      if (m.y <= m.intro + 8) return
      animateScrollTo(m.intro, REVERSE_MS)
    }

    const decide = () => {
      if (lockedRef.current || touchingRef.current) return
      if (document.documentElement.dataset.programmaticScroll) return
      /* Nav / marker jumps own the scroll — do not steal them back to the map. */
      if (getProgrammaticJourneyTarget()) return

      const m = measures()
      if (!m || !inBeat(m)) return

      const progress = (m.y - m.intro) / m.span
      const dir = dirRef.current
      const nearIntro = progress < 0.2
      const nearPark = progress > 0.8

      /*
        Parked on card 01 (image 2): stay there.
        Upward inertia from a 13→01 jump must NOT reverse to the full map.
      */
      if (nearPark) return
      if (nearIntro && dir <= 0) return

      /* Reverse only while leaving the card toward the map (mid-corridor up). */
      if (dir < 0 && progress > 0.25) {
        goReverse()
        return
      }

      /* Forward from the map intro toward card 01. */
      if (dir > 0 || (nearIntro && mapPinVisible())) {
        goForward()
      }
    }

    const onTouchStart = () => {
      touchingRef.current = true
      clearSettle()
      if (animRaf.current) {
        cancelAnim()
        delete document.documentElement.dataset.programmaticScroll
        lockedRef.current = false
      }
    }

    const onTouchEnd = () => {
      touchingRef.current = false
      clearSettle()
      /* Wait a beat so scroll position/dir from the gesture are final. */
      settleTimer.current = window.setTimeout(decide, 90)
    }

    const onScroll = () => {
      const y = pageScrollY()
      const dy = y - lastYRef.current
      if (Math.abs(dy) > 0.5) dirRef.current = dy > 0 ? 1 : -1
      lastYRef.current = y

      if (lockedRef.current || touchingRef.current) return
      if (document.documentElement.dataset.programmaticScroll) return

      const m = measures()
      if (!m || !inBeat(m)) {
        clearSettle()
        return
      }

      clearSettle()
      settleTimer.current = window.setTimeout(decide, 100)
    }

    const onJourneyTarget = () => {
      /* Cancel any in-flight intro animation so a nav/marker jump wins. */
      clearSettle()
      if (animRaf.current) {
        cancelAnim()
        lockedRef.current = false
      }
    }

    const onJourneyScrollEnd = () => {
      /*
        After a programmatic jump lands, clear stale upward dir so residual
        scroll events cannot reverse to the map intro.
      */
      dirRef.current = 0
      lastYRef.current = pageScrollY()
      clearSettle()
    }

    lastYRef.current = pageScrollY()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    window.addEventListener('ex-journey-target', onJourneyTarget)
    window.addEventListener('ex-journey-scroll-end', onJourneyScrollEnd)

    return () => {
      clearSettle()
      cancelAnim()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('ex-journey-target', onJourneyTarget)
      window.removeEventListener('ex-journey-scroll-end', onJourneyScrollEnd)
      delete document.documentElement.dataset.programmaticScroll
    }
  }, [enabled])
}

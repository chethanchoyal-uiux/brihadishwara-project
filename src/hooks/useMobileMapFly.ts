import { useEffect, useRef, useState } from 'react'

const MOBILE_MQ = '(max-width: 859px)'
const LABEL_DELAY_MS = 180
const COMPACT_REM = 3.75
const COMPACT_GAP_REM = 0.4
const FIRST_CARD_ID = 'entrances-maratha'

export type MobileMapFly = {
  compact: boolean
  showLabel: boolean
  flying: boolean
  shellCollapsed: boolean
  enabled: boolean
}

const IDLE: MobileMapFly = {
  compact: false,
  showLabel: false,
  flying: false,
  shellCollapsed: false,
  enabled: false,
}

function clearFlightInline(el: HTMLElement) {
  el.style.position = ''
  el.style.left = ''
  el.style.top = ''
  el.style.right = ''
  el.style.bottom = ''
  el.style.width = ''
  el.style.height = ''
  el.style.margin = ''
  el.style.transform = ''
  el.style.transformOrigin = ''
  el.style.borderRadius = ''
  el.style.boxShadow = ''
  el.style.zIndex = ''
  el.style.overflow = ''
  el.style.background = ''
  el.style.pointerEvents = ''
  el.style.willChange = ''
  el.style.backfaceVisibility = ''
  el.style.contain = ''
  el.style.opacity = ''
}

function clearPinFlight(pin: HTMLElement) {
  pin.classList.remove('is-flying-shell')
  pin.style.height = ''
  pin.style.minHeight = ''
  pin.style.overflow = ''
  pin.style.zIndex = ''
  pin.style.background = ''
  pin.style.pointerEvents = ''
}

function remSize() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
}

function compactTargetRect(): { left: number; top: number; size: number } {
  const rem = remSize()
  const size = COMPACT_REM * rem
  const gap = COMPACT_GAP_REM * rem
  const header = document.querySelector<HTMLElement>('.site-header')
  const headerBottom = header?.getBoundingClientRect().bottom ?? rem * 3.5
  const right = Math.max(16, rem)
  const top = Math.max(8, headerBottom + gap)
  return {
    left: Math.max(8, window.innerWidth - right - size),
    top,
    size,
  }
}

function chromeBottom() {
  const nav = document.querySelector<HTMLElement>('.ex-journey-nav-pin')
  if (nav) {
    const b = nav.getBoundingClientRect().bottom
    if (b > 0) return b
  }
  const header = document.querySelector<HTMLElement>('.site-header')
  if (header) return Math.max(0, header.getBoundingClientRect().bottom)
  return remSize() * 3.5
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

/** Match intro-snap easing so scroll + map stay in lockstep. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function card01Progress() {
  const card = document.getElementById(FIRST_CARD_ID)
  if (!card) return 0
  const vh = window.innerHeight || 1
  const cardTop = card.getBoundingClientRect().top
  const chrome = chromeBottom()
  /* Match intro snap: THRESHOLDS peek → card under nav. */
  const start = vh - 12
  const end = chrome + 12
  if (start <= end) return cardTop <= end ? 1 : 0
  return clamp01((start - cardTop) / (start - end))
}

type StartRect = {
  left: number
  top: number
  width: number
  height: number
}

/**
 * Scroll-scrubbed mobile map flight.
 * Morphs the full map into a 1:1 compact control via non-uniform scale
 * (no sudden square crop). Pin stays transparent during flight.
 */
export function useMobileMapFly(
  _activeJourneyId: string | null,
  mapSelector = '.ex-journey-map',
) {
  const [enabled, setEnabled] = useState(false)
  const [compact, setCompact] = useState(false)
  const [showLabel, setShowLabel] = useState(false)
  const [flyingUi, setFlyingUi] = useState(false)
  const [shellCollapsed, setShellCollapsed] = useState(false)

  const labelTimer = useRef(0)
  const rafRef = useRef(0)
  const modeRef = useRef<'docked' | 'scrubbing' | 'compact'>('docked')
  const startRef = useRef<StartRect | null>(null)
  const destRef = useRef({ left: 0, top: 0, size: COMPACT_REM * 16 })
  const labelArmedRef = useRef(false)
  const mapNodeRef = useRef<HTMLElement | null>(null)

  const clearLabelTimer = () => {
    if (labelTimer.current) {
      window.clearTimeout(labelTimer.current)
      labelTimer.current = 0
    }
  }

  const scheduleLabel = () => {
    if (labelArmedRef.current) return
    labelArmedRef.current = true
    clearLabelTimer()
    setShowLabel(false)
    labelTimer.current = window.setTimeout(() => {
      setShowLabel(true)
      labelTimer.current = 0
    }, LABEL_DELAY_MS)
  }

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ)
    const syncMq = () => setEnabled(mq.matches)
    syncMq()
    mq.addEventListener('change', syncMq)
    return () => mq.removeEventListener('change', syncMq)
  }, [])

  useEffect(() => {
    if (!enabled) {
      const node = document.querySelector<HTMLElement>(mapSelector)
      const pin = node?.closest('.ex-journey-map-pin') as HTMLElement | null
      if (node) {
        clearFlightInline(node)
        node.classList.remove('is-flying', 'is-compact', 'is-map-labeled')
      }
      if (pin) {
        pin.classList.remove('is-map-compact')
        clearPinFlight(pin)
      }
      modeRef.current = 'docked'
      startRef.current = null
      labelArmedRef.current = false
      clearLabelTimer()
      setCompact(false)
      setShowLabel(false)
      setFlyingUi(false)
      setShellCollapsed(false)
      return
    }

    const resolveNodes = () => {
      const node = document.querySelector<HTMLElement>(mapSelector)
      const pin = node?.closest('.ex-journey-map-pin') as HTMLElement | null
      mapNodeRef.current = node
      return { node, pin }
    }

    const applyScrubTransform = (p: number, start: StartRect) => {
      const node = mapNodeRef.current
      if (!node) return
      const dest = destRef.current
      const t = easeInOutCubic(p)
      const startCx = start.left + start.width / 2
      const startCy = start.top + start.height / 2
      const endCx = dest.left + dest.size / 2
      const endCy = dest.top + dest.size / 2
      const sx = 1 + (dest.size / start.width - 1) * t
      const sy = 1 + (dest.size / start.height - 1) * t
      const x = (endCx - startCx) * t
      const y = (endCy - startCy) * t
      const radius = 0.15 + (0.7 - 0.15) * t
      node.style.borderRadius = `${radius}rem`
      node.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${sx.toFixed(4)},${sy.toFixed(4)})`
    }

    const promoteFlight = (node: HTMLElement, pin: HTMLElement, start: StartRect) => {
      pin.classList.remove('is-map-compact')
      clearPinFlight(pin)
      pin.classList.add('is-flying-shell')
      pin.style.background = 'transparent'
      pin.style.overflow = 'visible'
      pin.style.zIndex = '60'
      pin.style.pointerEvents = 'none'

      node.classList.add('is-flying')
      node.classList.remove('is-compact', 'is-map-labeled')
      clearFlightInline(node)
      node.style.position = 'fixed'
      node.style.left = `${start.left}px`
      node.style.top = `${start.top}px`
      node.style.width = `${start.width}px`
      node.style.height = `${start.height}px`
      node.style.right = 'auto'
      node.style.bottom = 'auto'
      node.style.margin = '0'
      node.style.zIndex = '1'
      node.style.overflow = 'hidden'
      node.style.background = '#fff'
      node.style.borderRadius = '0.15rem'
      node.style.pointerEvents = 'none'
      node.style.transformOrigin = 'center center'
      node.style.willChange = 'transform'
      node.style.backfaceVisibility = 'hidden'
      node.style.transform = 'translate3d(0,0,0) scale(1,1)'
    }

    const ensureScrubbing = () => {
      const { node, pin } = resolveNodes()
      if (!node || !pin) return false

      if (modeRef.current === 'scrubbing' && startRef.current) return true

      const wasCompact = modeRef.current === 'compact'

      if (wasCompact) {
        node.classList.remove('is-compact', 'is-map-labeled')
        clearFlightInline(node)
        if (!startRef.current || startRef.current.width < 8) {
          const w = Math.min(window.innerWidth, window.innerHeight * 0.72)
          const h = Math.min(window.innerHeight * 0.62, w * 1.15)
          startRef.current = {
            left: (window.innerWidth - w) / 2,
            top: chromeBottom() + 4,
            width: w,
            height: h,
          }
        }
      } else {
        const mapRect = node.getBoundingClientRect()
        if (mapRect.width < 8 || mapRect.height < 8) return false
        /* Full visible map — morph to square via scaleX/scaleY (no crop jump). */
        startRef.current = {
          left: mapRect.left,
          top: mapRect.top,
          width: mapRect.width,
          height: mapRect.height,
        }
      }

      const start = startRef.current
      if (!start || start.width < 8) return false

      destRef.current = compactTargetRect()
      promoteFlight(node, pin, start)
      modeRef.current = 'scrubbing'
      labelArmedRef.current = false
      clearLabelTimer()
      setFlyingUi(true)
      setCompact(false)
      setShowLabel(false)
      if (wasCompact) {
        pin.classList.add('is-map-compact')
        setShellCollapsed(true)
      } else {
        setShellCollapsed(false)
      }
      return true
    }

    const settleDocked = () => {
      const { node, pin } = resolveNodes()
      if (node) {
        clearFlightInline(node)
        node.classList.remove('is-flying', 'is-compact', 'is-map-labeled')
      }
      if (pin) {
        pin.classList.remove('is-map-compact')
        clearPinFlight(pin)
      }
      modeRef.current = 'docked'
      startRef.current = null
      labelArmedRef.current = false
      clearLabelTimer()
      setFlyingUi(false)
      setCompact(false)
      setShowLabel(false)
      setShellCollapsed(false)
    }

    const settleCompact = () => {
      const { node, pin } = resolveNodes()
      if (!node || !pin) return

      clearFlightInline(node)
      node.classList.remove('is-flying')
      node.classList.add('is-compact')
      pin.classList.add('is-map-compact')
      clearPinFlight(pin)

      modeRef.current = 'compact'
      setFlyingUi(false)
      setCompact(true)
      setShellCollapsed(true)
      scheduleLabel()
    }

    const update = () => {
      rafRef.current = 0
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const p = card01Progress()

      if (reduce) {
        if (p >= 0.5 && modeRef.current !== 'compact') settleCompact()
        else if (p < 0.5 && modeRef.current !== 'docked') settleDocked()
        return
      }

      if (modeRef.current === 'compact') {
        if (p >= 0.94) return
      } else if (p >= 0.97) {
        settleCompact()
        return
      }

      if (modeRef.current === 'docked') {
        if (p <= 0.02) return
      } else if (p <= 0.02) {
        settleDocked()
        return
      }

      if (!ensureScrubbing()) return
      const start = startRef.current
      if (!start) return
      applyScrubTransform(p, start)
    }

    const kick = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    window.visualViewport?.addEventListener('resize', kick)
    window.addEventListener('ex-journey-scroll-end', kick)

    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      window.visualViewport?.removeEventListener('resize', kick)
      window.removeEventListener('ex-journey-scroll-end', kick)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      clearLabelTimer()
    }
  }, [enabled, mapSelector])

  if (!enabled) return IDLE

  return {
    compact,
    showLabel: showLabel && compact && !flyingUi,
    flying: flyingUi,
    shellCollapsed,
    enabled,
  }
}

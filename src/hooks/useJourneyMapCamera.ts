import { useEffect, useState } from 'react'

export type MapStopPoint = {
  id: string
  num: number
  label: string
  x: number
  y: number
}

export type JourneyMapCamera = {
  x: number
  y: number
  scale: number
  active: MapStopPoint | null
  labelX: number
  labelY: number
  overview: boolean
  enabled: boolean
}

const DESKTOP_MQ = '(min-width: 860px)'
// 10% zoom-out to prevent the plan from cutting off at the top/bottom.
const ZOOM_OUT = 0.9
const BASE_SCALE = 1.72
const MAX_SCALE = 2.65
const MID_DIP = 0.12
/** Plan image natural aspect (1024 × 679) */
const IMG_ASPECT = 1024 / 679

/** Per-stop framing: entrance towers need headroom above the marker. */
const STOP_SCALE: Record<number, number> = {
  // Slightly reduced so Marker 01 stays within view (no bottom cut).
  1: 1.35,
  2: 1.55,
  3: 1.6,
  // Upper-plan stops need more zoom so the marker can sit mid-viewport
  // without exposing the map pin's white background.
  5: 2.15,
  6: 2.35,
  8: 2.45,
  9: 2.45,
}

/** Vertical look offset in plan % — negative = look above the marker. */
const LOOK_Y_OFFSET: Record<number, number> = {
  // Reduce magnitude so Marker 01 keeps enough head/body space.
  // For Map 01, align exactly with the red dot.
  1: 0,
  2: -6,
  3: -4,
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

function sideForIndex(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'left' : 'right'
}

function focusSlot(side: 'left' | 'right', num: number) {
  // Marker 01 sits lower so the gopura crown clears the sticky nav.
  // Upper-plan markers stay near vertical center of the open map half.
  let fy = 0.5
  if (num === 1) fy = 0.62
  else if (num <= 3) fy = 0.59
  else if (num === 5 || num === 6 || num === 8 || num === 9) fy = 0.48
  return {
    fx: side === 'left' ? 0.72 : 0.28,
    fy,
  }
}

function scaleFor(num: number) {
  return (STOP_SCALE[num] ?? BASE_SCALE) * ZOOM_OUT
}

function containBox(width: number, height: number) {
  // object-fit: contain
  const viewAspect = width / height
  if (viewAspect > IMG_ASPECT) {
    const displayH = height
    const displayW = height * IMG_ASPECT
    return {
      left: (width - displayW) / 2,
      top: 0,
      width: displayW,
      height: displayH,
    }
  }
  const displayW = width
  const displayH = width / IMG_ASPECT
  return {
    left: 0,
    top: (height - displayH) / 2,
    width: displayW,
    height: displayH,
  }
}

function coverBox(width: number, height: number) {
  // object-fit: cover (must match CSS — cases were previously inverted)
  const viewAspect = width / height
  if (viewAspect > IMG_ASPECT) {
    // Container wider than the plan → fill width, crop top/bottom
    const displayW = width
    const displayH = width / IMG_ASPECT
    return {
      offsetX: 0,
      offsetY: (height - displayH) / 2,
      width: displayW,
      height: displayH,
    }
  }
  // Container taller/narrower → fill height, crop left/right
  const displayH = height
  const displayW = height * IMG_ASPECT
  return {
    offsetX: (width - displayW) / 2,
    offsetY: 0,
    width: displayW,
    height: displayH,
  }
}

function markerPixel(
  stop: MapStopPoint,
  width: number,
  height: number,
  lookOffset = false,
  mode: 'contain' | 'cover' = 'cover',
) {
  const yPct = lookOffset
    ? clamp(stop.y + (LOOK_Y_OFFSET[stop.num] ?? 0), 0, 100)
    : stop.y

  if (mode === 'contain') {
    const box = containBox(width, height)
    return {
      x: box.left + (stop.x / 100) * box.width,
      y: box.top + (yPct / 100) * box.height,
    }
  }

  const box = coverBox(width, height)
  return {
    x: box.offsetX + (stop.x / 100) * box.width,
    y: box.offsetY + (yPct / 100) * box.height,
  }
}

function markerPercent(
  stop: MapStopPoint,
  width: number,
  height: number,
  lookOffset = false,
  mode: 'contain' | 'cover' = 'cover',
) {
  const m = markerPixel(stop, width, height, lookOffset, mode)
  return {
    x: (m.x / width) * 100,
    y: (m.y / height) * 100,
  }
}

/**
 * Minimum scale so a marker at (mx, my) can sit at focus (fx, fy)
 * while the scaled plan still fully covers the pin (no white gaps).
 */
function minScaleForFocus(
  mx: number,
  my: number,
  fx: number,
  fy: number,
  width: number,
  height: number,
) {
  const eps = 1
  const needs: number[] = [1]
  if (mx > eps) needs.push((fx * width) / mx)
  if (width - mx > eps) needs.push((width * (1 - fx)) / (width - mx))
  if (my > eps) needs.push((fy * height) / my)
  if (height - my > eps) needs.push((height * (1 - fy)) / (height - my))
  return Math.max(...needs)
}

function cameraAt(
  stop: MapStopPoint,
  side: 'left' | 'right',
  width: number,
  height: number,
) {
  const { fx, fy } = focusSlot(side, stop.num)
  // Use contain mapping (matches live object-fit) so upper-plan markers
  // like 06 are not lost in cover-crop and can be centered opposite the card.
  const m = markerPixel(stop, width, height, true, 'contain')

  const needed = minScaleForFocus(m.x, m.y, fx, fy, width, height)
  const scale = clamp(Math.max(scaleFor(stop.num), needed), 1, MAX_SCALE)

  const minX = width * (1 - scale)
  const minY = height * (1 - scale)
  return {
    x: clamp(fx * width - m.x * scale, minX, 0),
    y: clamp(fy * height - m.y * scale, minY, 0),
    scale,
  }
}

function panelTop(stopId: string) {
  const el =
    document.querySelector<HTMLElement>(`#${stopId} .ex-journey-panel`) ??
    document.getElementById(stopId)
  return el?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY
}

const OVERVIEW: JourneyMapCamera = {
  x: 0,
  y: 0,
  scale: 1,
  active: null,
  labelX: 50,
  labelY: 50,
  overview: true,
  enabled: false,
}

const IDLE: JourneyMapCamera = {
  ...OVERVIEW,
  overview: false,
}

/**
 * Desktop-only scroll-linked map camera.
 * Holds on the current stop; zooms/pans only when the next card enters.
 */
export function useJourneyMapCamera(
  stops: MapStopPoint[],
  pinSelector = '.ex-journey-map-pin',
) {
  const [camera, setCamera] = useState<JourneyMapCamera>(IDLE)

  useEffect(() => {
    if (!stops.length) return

    let raf = 0
    let current: JourneyMapCamera = { ...IDLE }
    let target: JourneyMapCamera = { ...IDLE }

    const mq = window.matchMedia(DESKTOP_MQ)

    const readPinSize = () => {
      const pin = document.querySelector<HTMLElement>(pinSelector)
      if (!pin) return { w: window.innerWidth, h: window.innerHeight }
      const rect = pin.getBoundingClientRect()
      return {
        w: Math.max(1, rect.width),
        h: Math.max(1, rect.height),
      }
    }

    const framed = (
      stop: MapStopPoint,
      index: number,
      w: number,
      h: number,
    ): JourneyMapCamera => {
      const side = sideForIndex(index)
      const cam = cameraAt(stop, side, w, h)
      const label = markerPercent(stop, w, h, true, 'contain')
      return {
        ...cam,
        active: stop,
        labelX: label.x,
        labelY: label.y,
        overview: false,
        enabled: true,
      }
    }

    const computeTarget = (): JourneyMapCamera => {
      if (!mq.matches) return { ...IDLE, enabled: false }

      const { w, h } = readPinSize()
      const vh = window.innerHeight || 1

      // Card “enters” when its panel reaches this line; transition finishes lower.
      const enterLine = vh * 0.78
      const settleLine = vh * 0.48

      const tops = stops.map((stop) => panelTop(stop.id))
      const firstTop = tops[0]

      // Full fit until the first card begins to enter
      if (firstTop >= enterLine) {
        return { ...OVERVIEW, enabled: true }
      }

      // Zoom overview → stop 01 while first card settles
      if (firstTop > settleLine) {
        const t = smoothstep((enterLine - firstTop) / (enterLine - settleLine))
        const zoomTarget = framed(stops[0], 0, w, h)
        return {
          x: lerp(0, zoomTarget.x, t),
          y: lerp(0, zoomTarget.y, t),
          scale: lerp(1, zoomTarget.scale, t),
          // Prevent showing the active label until the camera is
          // sufficiently close to the intended marker.
          active: t > 0.75 ? stops[0] : null,
          labelX: lerp(50, zoomTarget.labelX, t),
          labelY: lerp(50, zoomTarget.labelY, t),
          overview: t < 0.06,
          enabled: true,
        }
      }

      // Which stop is settled? Advance only when the *next* card has entered.
      let index = 0
      for (let i = 1; i < stops.length; i++) {
        if (tops[i] <= enterLine) index = i
        else break
      }

      const curr = framed(stops[index], index, w, h)
      const nextIndex = index + 1
      if (nextIndex >= stops.length) return curr

      const nextTop = tops[nextIndex]
      // Hold on current until next card crosses the enter line
      if (nextTop > enterLine) return curr

      // Smooth shift while the next card travels enter → settle
      if (nextTop > settleLine) {
        const t = smoothstep((enterLine - nextTop) / (enterLine - settleLine))
        const next = framed(stops[nextIndex], nextIndex, w, h)
        const dip = 1 - MID_DIP * Math.sin(Math.PI * t)
        return {
          x: lerp(curr.x, next.x, t),
          y: lerp(curr.y, next.y, t),
          scale: lerp(curr.scale, next.scale, t) * dip,
          // Flip label only after the camera has mostly reached the next marker.
          active: t < 0.35 ? curr.active : next.active,
          labelX: lerp(curr.labelX, next.labelX, t),
          labelY: lerp(curr.labelY, next.labelY, t),
          overview: false,
          enabled: true,
        }
      }

      return framed(stops[nextIndex], nextIndex, w, h)
    }

    const tick = () => {
      raf = 0
      target = computeTarget()

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const ease = reduce || !target.enabled ? 1 : 0.14

      current = {
        x: lerp(current.x, target.x, ease),
        y: lerp(current.y, target.y, ease),
        scale: lerp(current.scale, target.scale, ease),
        active: target.active,
        labelX: lerp(current.labelX, target.labelX, ease),
        labelY: lerp(current.labelY, target.labelY, ease),
        overview: target.overview,
        enabled: target.enabled,
      }

      setCamera(current)

      const dx = Math.abs(current.x - target.x)
      const dy = Math.abs(current.y - target.y)
      const ds = Math.abs(current.scale - target.scale)
      if (dx > 0.35 || dy > 0.35 || ds > 0.002) {
        raf = window.requestAnimationFrame(tick)
      }
    }

    const kick = () => {
      if (raf) return
      raf = window.requestAnimationFrame(tick)
    }

    target = computeTarget()
    current = { ...target }
    setCamera(current)

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    mq.addEventListener('change', kick)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      mq.removeEventListener('change', kick)
    }
  }, [stops, pinSelector])

  return camera
}

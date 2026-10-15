import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

export type CoachStep = {
  selector: string
  title: string
  body: string
  /** Preferred tooltip side relative to the target */
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

type Props = {
  steps: CoachStep[]
  /** Delay before first paint so layout settles */
  startDelayMs?: number
  /** Show Skip + Back alongside Next / Got it (Part 1 & 2 tour). */
  showSkipBack?: boolean
}

type Rect = { top: number; left: number; width: number; height: number }

const PAD = 10
const TOOLTIP_GAP = 14
const TOOLTIP_W = 280

function measure(selector: string): Rect | null {
  const el = document.querySelector(selector)
  if (!(el instanceof HTMLElement)) return null
  const r = el.getBoundingClientRect()
  if (r.width < 2 || r.height < 2) return null
  return {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
  }
}

function tooltipPosition(
  target: Rect,
  placement: CoachStep['placement'] = 'top',
  tooltipH: number,
) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const cx = target.left + target.width / 2
  let top = 0
  let left = cx - TOOLTIP_W / 2
  let side = placement

  const tryPlace = (p: NonNullable<CoachStep['placement']>) => {
    switch (p) {
      case 'bottom':
        return target.top + target.height + PAD + TOOLTIP_GAP
      case 'top':
        return target.top - PAD - TOOLTIP_GAP - tooltipH
      case 'left':
      case 'right':
        return target.top + target.height / 2 - tooltipH / 2
    }
  }

  // Prefer requested side; flip if it would clip
  if (placement === 'top' && tryPlace('top') < 12) side = 'bottom'
  if (placement === 'bottom' && tryPlace('bottom') + tooltipH > vh - 12) side = 'top'

  if (side === 'left' || side === 'right') {
    top = tryPlace(side)
    left =
      side === 'right'
        ? target.left + target.width + PAD + TOOLTIP_GAP
        : target.left - PAD - TOOLTIP_GAP - TOOLTIP_W
    if (left < 12) {
      side = 'right'
      left = target.left + target.width + PAD + TOOLTIP_GAP
    }
    if (left + TOOLTIP_W > vw - 12) {
      side = 'left'
      left = target.left - PAD - TOOLTIP_GAP - TOOLTIP_W
    }
  } else {
    top = tryPlace(side)
    left = Math.min(Math.max(12, left), vw - TOOLTIP_W - 12)
    top = Math.min(Math.max(12, top), vh - tooltipH - 12)
  }

  return { top, left, side }
}

export function CoachMarkTour({
  steps,
  startDelayMs = 700,
  showSkipBack = false,
}: Props) {
  const labelId = useId()
  const descId = useId()
  const cardRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState(0)
  const [target, setTarget] = useState<Rect | null>(null)
  const [cardH, setCardH] = useState(160)
  const [visible, setVisible] = useState(false)

  const finish = useCallback(() => {
    setVisible(false)
    window.setTimeout(() => setActive(false), 280)
  }, [])

  useEffect(() => {
    if (!steps.length) return

    let cancelled = false
    let retryTimer = 0
    let attempts = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = reduce ? 120 : startDelayMs

    const start = () => {
      if (cancelled) return
      const first = steps[0]
      attempts += 1
      if (first && !measure(first.selector) && attempts < 40) {
        retryTimer = window.setTimeout(start, 120)
        return
      }
      setIndex(0)
      setActive(true)
      setVisible(true)
    }

    const t = window.setTimeout(start, delay)
    return () => {
      cancelled = true
      window.clearTimeout(t)
      window.clearTimeout(retryTimer)
    }
  }, [steps, startDelayMs])

  const step = steps[index]

  const refresh = useCallback(() => {
    if (!step) return
    const rect = measure(step.selector)
    setTarget(rect)
  }, [step])

  useLayoutEffect(() => {
    if (!active || !step) return
    refresh()
    const id = window.setInterval(refresh, 200)
    window.addEventListener('resize', refresh)
    window.addEventListener('scroll', refresh, true)
    return () => {
      window.clearInterval(id)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('scroll', refresh, true)
    }
  }, [active, step, refresh])

  useLayoutEffect(() => {
    if (!active || !cardRef.current) return
    setCardH(cardRef.current.offsetHeight)
  }, [active, index, target])

  useEffect(() => {
    if (!active) return
    lockScroll()
    return () => {
      unlockScroll()
    }
  }, [active])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        if (index >= steps.length - 1) finish()
        else setIndex((i) => i + 1)
      }
      if (showSkipBack && e.key === 'ArrowLeft') {
        e.preventDefault()
        setIndex((i) => Math.max(0, i - 1))
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, finish, index, steps.length, showSkipBack])

  if (!active || !step || typeof document === 'undefined') return null

  const spot = target
    ? {
        top: target.top - PAD,
        left: target.left - PAD,
        width: target.width + PAD * 2,
        height: target.height + PAD * 2,
      }
    : null

  const tip = spot
    ? tooltipPosition(
        {
          top: spot.top,
          left: spot.left,
          width: spot.width,
          height: spot.height,
        },
        step.placement ?? 'top',
        cardH,
      )
    : { top: 24, left: 24, side: 'bottom' as const }

  const isLast = index === steps.length - 1
  const isFirst = index === 0

  return createPortal(
    <div
      className={`coach-mark${visible ? ' is-visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      aria-describedby={descId}
    >
      <div className="coach-mark-backdrop" aria-hidden="true" />

      {spot ? (
        <div
          className="coach-mark-spot"
          style={{
            top: spot.top,
            left: spot.left,
            width: spot.width,
            height: spot.height,
          }}
          aria-hidden="true"
        />
      ) : null}

      <div
        ref={cardRef}
        key={index}
        className={`coach-mark-card coach-mark-card--${tip.side}`}
        style={{ top: tip.top, left: tip.left, width: TOOLTIP_W }}
      >
        <p className="coach-mark-step">
          {index + 1} / {steps.length}
        </p>
        <h2 id={labelId} className="coach-mark-title">
          {step.title}
        </h2>
        <p id={descId} className="coach-mark-body">
          {step.body}
        </p>

        <div
          className={`coach-mark-actions${showSkipBack ? ' coach-mark-actions--nav' : ''}`}
        >
          {showSkipBack ? (
            <button type="button" className="coach-mark-skip" onClick={finish}>
              Skip
            </button>
          ) : null}
          <div className="coach-mark-nav">
            {showSkipBack ? (
              <button
                type="button"
                className="coach-mark-back"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={isFirst}
              >
                Back
              </button>
            ) : null}
            {isLast ? (
              <button type="button" className="coach-mark-next" onClick={finish}>
                Got it
              </button>
            ) : (
              <button
                type="button"
                className="coach-mark-next"
                onClick={() => setIndex((i) => i + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

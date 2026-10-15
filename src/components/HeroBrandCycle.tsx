import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

const TITLES = [
  'Brihadishwara Temple',
  'Rajarajeshwaram Temple',
  'Peruvudaiyar Temple',
] as const

const FIRST_HOLD_MS = 1600
const HOLD_MS = 2800
const SWAP_MS = 700

/**
 * Smooth masked vertical text cycle for the homepage brand names.
 * Fixed width/height from the longest title — no layout jump.
 */
export function HeroBrandCycle() {
  const wrapRef = useRef<HTMLParagraphElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const labelId = useId()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'in' | 'out' | 'hold'>('hold')
  const [reduce, setReduce] = useState(false)
  const indexRef = useRef(0)
  const phaseRef = useRef<'in' | 'out' | 'hold'>('hold')

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const measure = measureRef.current
    if (!wrap || !measure) return

    const sizeToLongest = () => {
      let maxW = 0
      for (const title of TITLES) {
        measure.textContent = title
        maxW = Math.max(maxW, measure.offsetWidth)
      }
      // Height = cap-height box only (avoid font metric padding under uppercase)
      const fontPx = Number.parseFloat(getComputedStyle(wrap).fontSize) || 24
      wrap.style.width = `${Math.ceil(maxW)}px`
      wrap.style.height = `${Math.ceil(fontPx)}px`
    }

    sizeToLongest()
    const ro = new ResizeObserver(sizeToLongest)
    ro.observe(wrap)
    if (document.fonts?.ready) {
      void document.fonts.ready.then(sizeToLongest)
    }
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduce(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    let timer = 0
    let first = true
    indexRef.current = index
    phaseRef.current = phase

    const schedule = () => {
      window.clearTimeout(timer)
      if (reduce) {
        timer = window.setTimeout(() => {
          const next = (indexRef.current + 1) % TITLES.length
          indexRef.current = next
          setIndex(next)
          setPhase('hold')
          phaseRef.current = 'hold'
          schedule()
        }, HOLD_MS)
        return
      }

      if (phaseRef.current === 'hold') {
        const hold = first ? FIRST_HOLD_MS : HOLD_MS
        first = false
        timer = window.setTimeout(() => {
          phaseRef.current = 'out'
          setPhase('out')
          schedule()
        }, hold)
      } else if (phaseRef.current === 'out') {
        timer = window.setTimeout(() => {
          const next = (indexRef.current + 1) % TITLES.length
          indexRef.current = next
          setIndex(next)
          phaseRef.current = 'in'
          setPhase('in')
          schedule()
        }, SWAP_MS)
      } else {
        timer = window.setTimeout(() => {
          phaseRef.current = 'hold'
          setPhase('hold')
          schedule()
        }, SWAP_MS)
      }
    }

    schedule()
    return () => window.clearTimeout(timer)
  }, [reduce])

  const title = TITLES[index]
  const motionClass =
    reduce || phase === 'hold'
      ? 'is-hold'
      : phase === 'out'
        ? 'is-out'
        : 'is-in'

  return (
    <p
      ref={wrapRef}
      className="hero-brand hero-brand-cycle"
      aria-labelledby={labelId}
    >
      <span id={labelId} className="hero-brand-sr">
        {title}
      </span>
      <span ref={measureRef} className="hero-brand-measure" aria-hidden="true" />
      <span className="hero-brand-mask" aria-hidden="true">
        <span key={index} className={`hero-brand-line ${motionClass}`}>
          {title}
        </span>
      </span>
    </p>
  )
}

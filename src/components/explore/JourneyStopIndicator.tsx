import { useEffect, useRef } from 'react'
import { mapLabel } from './JourneyExhibit'

type Props = {
  num: number
  title: string
}

/**
 * Sticky stop title beside the card.
 * Fades in over the first 10% of the card, holds, then fades out over the last 20%.
 */
export function JourneyStopFloat({ num, title }: Props) {
  const railRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const rail = railRef.current
    const float = floatRef.current
    if (!rail || !float) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      const rect = rail.getBoundingClientRect()
      const vh = window.innerHeight || 1
      if (rect.height <= 0) {
        float.style.opacity = '0'
        return
      }

      // Progress through the card against viewport mid (0 at card top, 1 at card bottom)
      const probe = vh * 0.5
      const progress = (probe - rect.top) / rect.height

      let opacity = 0
      if (progress > 0 && progress < 1) {
        if (reduce) {
          opacity = progress >= 0.1 && progress <= 0.8 ? 1 : 0
        } else if (progress < 0.1) {
          opacity = progress / 0.1
        } else if (progress > 0.8) {
          opacity = (1 - progress) / 0.2
        } else {
          opacity = 1
        }
      }

      float.style.opacity = String(Math.max(0, Math.min(1, opacity)))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="ex-journey-float-rail" ref={railRef} aria-hidden="true">
      <div className="ex-journey-float-pin">
        <h3 className="ex-journey-float" ref={floatRef}>
          <span className="ex-journey-float-num">{mapLabel(num)}</span>
          <span className="ex-journey-float-title">{title}</span>
        </h3>
      </div>
    </div>
  )
}

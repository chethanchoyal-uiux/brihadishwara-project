import { useEffect, useState } from 'react'

const DESKTOP_MQ = '(min-width: 860px)'

export type JourneyMapSlide = {
  /** Horizontal translate for the map layer (px) */
  x: number
  /** Card has entered — map recentres in the open band */
  shifted: boolean
  /** Desktop slide behaviour active */
  enabled: boolean
  /** Fitted map width inside the pin (px) */
  frameWidth: number
  /** Fitted map height inside the pin (px) */
  frameHeight: number
}

const IDLE: JourneyMapSlide = {
  x: 0,
  shifted: false,
  enabled: false,
  frameWidth: 0,
  frameHeight: 0,
}

/**
 * Desktop-only horizontal map slide.
 * Overview: centred plan that fully covers the pin (no right white gutter).
 * With cards: centred in the open band, then mild left bias.
 */
export function useJourneyMapSlide(
  imageWidth: number,
  imageHeight: number,
  firstStopId = 'entrances-maratha',
  pinSelector = '.ex-journey-map-pin',
) {
  const [slide, setSlide] = useState<JourneyMapSlide>(IDLE)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const mq = window.matchMedia(DESKTOP_MQ)
      const pin = document.querySelector<HTMLElement>(pinSelector)
      const card =
        document.querySelector<HTMLElement>(`#${firstStopId} .ex-journey-panel`) ??
        document.getElementById(firstStopId)

      if (!mq.matches || !pin || !imageWidth || !imageHeight) {
        setSlide(IDLE)
        return
      }

      const W = pin.clientWidth
      const H = pin.clientHeight
      if (W <= 0 || H <= 0) return

      // Scale the map so its height fills the pin, then zoom 5%.
      const fit = (H / imageHeight) * 1.05
      const displayW = Math.round(imageWidth * fit)
      const displayH = Math.round(imageHeight * fit)

      const coverPinX = (raw: number) => {
        if (displayW < W) return Math.round((W - displayW) / 2)
        // Keep artwork covering the full pin — no white gutter on either side.
        return Math.min(0, Math.max(W - displayW, raw))
      }

      if (!card) {
        setSlide({
          x: coverPinX(Math.round((W - displayW) / 2)),
          shifted: false,
          enabled: true,
          frameWidth: displayW,
          frameHeight: displayH,
        })
        return
      }

      const pinRect = pin.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const shifted = cardRect.top < vh * 0.92

      if (!shifted) {
        // Image 1 — full-map view: keep the centred framing, cover the pin.
        setSlide({
          x: coverPinX(Math.round((W - displayW) / 2)),
          shifted: false,
          enabled: true,
          frameWidth: displayW,
          frameHeight: displayH,
        })
        return
      }

  // Image 2 — card on the left: centre in the open band, then pull
  // the plan slightly left so markers sit clearer in the open half.
  const gap = 20
  const bandLeft = Math.max(0, Math.round(cardRect.right - pinRect.left + gap))
  const bandWidth = Math.max(1, W - bandLeft)
  const centered = bandLeft + (bandWidth - displayW) / 2
  const x = Math.round(centered - bandWidth * 0.3)

      setSlide({
        x,
        shifted: true,
        enabled: true,
        frameWidth: displayW,
        frameHeight: displayH,
      })
    }

    const kick = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    window.matchMedia(DESKTOP_MQ).addEventListener('change', kick)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      window.matchMedia(DESKTOP_MQ).removeEventListener('change', kick)
    }
  }, [imageWidth, imageHeight, firstStopId, pinSelector])

  return slide
}

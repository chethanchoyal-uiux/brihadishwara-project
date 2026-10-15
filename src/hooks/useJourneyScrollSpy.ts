import { useEffect, useState } from 'react'
import { getProgrammaticJourneyTarget } from '../utils/scrollToId'

type JourneyScrollSpyOptions = {
  /** Sticky scrolly scene — scrollspy only runs while this element is in view. */
  sceneSelector?: string
}

/** Scrollspy for journey stop panels — active only within the journey scene. */
export function useJourneyScrollSpy(
  stopIds: string[],
  { sceneSelector = '.ex-journey-scene' }: JourneyScrollSpyOptions = {},
) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!stopIds.length) return

    const scene = document.querySelector(sceneSelector)
    if (!scene) return

    const elements = stopIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    let sceneVisible = false
    const ratios = new Map<string, number>()

    const pickActive = () => {
      // Nav / marker jumps: keep the destination active while scrolling past
      // intermediate stops (e.g. 01 → 07 passes 06 and 13 in walk order).
      const pending = getProgrammaticJourneyTarget()
      if (pending && stopIds.includes(pending)) {
        setActiveId(pending)
        return
      }

      if (!sceneVisible) {
        setActiveId(null)
        return
      }

      // Prefer document position (same as Contents) so tall prior stops do not
      // keep winning on intersection ratio after you have scrolled past them.
      const header = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h')
        .trim()
      const nav = getComputedStyle(document.documentElement)
        .getPropertyValue('--ex-journey-nav-h')
        .trim()
      const offset = (parseFloat(header) || 56) + (parseFloat(nav) || 56) + 24
      const probe = window.scrollY + offset + window.innerHeight * 0.28

      let current: string | null = null
      for (const id of stopIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= probe) current = id
      }
      if (current) {
        setActiveId(current)
        return
      }

      let bestId: string | null = null
      let bestRatio = 0
      for (const id of stopIds) {
        const ratio = ratios.get(id) ?? 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestId = id
        }
      }
      setActiveId(bestId)
    }

    const onTarget = (ev: Event) => {
      const id = (ev as CustomEvent<{ id: string }>).detail?.id
      if (id && stopIds.includes(id)) setActiveId(id)
    }

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        sceneVisible = entries.some((entry) => entry.isIntersecting)
        pickActive()
      },
      { threshold: 0 },
    )
    sceneObserver.observe(scene)

    const stopObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        pickActive()
      },
      {
        root: null,
        rootMargin: '-22% 0px -42% 0px',
        threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.75, 1],
      },
    )

    for (const el of elements) stopObserver.observe(el)

    window.addEventListener('ex-journey-target', onTarget)
    window.addEventListener('ex-journey-scroll-end', pickActive)

    return () => {
      sceneObserver.disconnect()
      stopObserver.disconnect()
      window.removeEventListener('ex-journey-target', onTarget)
      window.removeEventListener('ex-journey-scroll-end', pickActive)
    }
  }, [stopIds, sceneSelector])

  return activeId
}

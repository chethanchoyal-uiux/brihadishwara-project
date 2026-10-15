import { useEffect } from 'react'

function blockedByParentReveal(el: Element) {
  return Boolean(
    el.closest(
      '[data-art-reveal]:not(.is-inview), [data-hi-reveal]:not(.is-inview)',
    ),
  )
}

/**
 * Bottom-to-top image reveal for [data-img-reveal].
 * Starts as soon as the figure is on-screen (and any parent text reveal has begun).
 */
export function useImageReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const selector = '[data-img-reveal]:not(.is-revealed)'

    const reveal = (node: Element) => {
      if (node.classList.contains('is-revealed')) return
      node.classList.add('is-revealed')
    }

    if (reduce) {
      const revealAll = () => {
        document.querySelectorAll(selector).forEach(reveal)
      }
      revealAll()
      const mo = new MutationObserver(revealAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const observed = new WeakSet<Element>()
    const waiting = new WeakSet<Element>()
    let rafWait = 0

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const node = entry.target
          observer.unobserve(node)

          if (!blockedByParentReveal(node)) {
            reveal(node)
            continue
          }

          // Parent text-reveal still hidden — poll until it opens, then wipe immediately.
          waiting.add(node)
          if (!rafWait) {
            const tick = () => {
              rafWait = 0
              document.querySelectorAll(selector).forEach((el) => {
                if (!waiting.has(el)) return
                if (blockedByParentReveal(el)) return
                waiting.delete(el)
                reveal(el)
              })
              if (
                [...document.querySelectorAll(selector)].some((el) =>
                  waiting.has(el),
                )
              ) {
                rafWait = requestAnimationFrame(tick)
              }
            }
            rafWait = requestAnimationFrame(tick)
          }
        }
      },
      { root: null, rootMargin: '0px 0px -4% 0px', threshold: 0.05 },
    )

    const scan = () => {
      document.querySelectorAll(selector).forEach((node) => {
        if (observed.has(node)) return
        observed.add(node)
        observer.observe(node)
      })
    }

    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      observer.disconnect()
      if (rafWait) cancelAnimationFrame(rafWait)
    }
  }, [])
}

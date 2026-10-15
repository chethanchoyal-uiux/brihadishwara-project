function pageScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

/**
 * Viewport Y where journey content should begin (flush under the pinned list).
 * Uses the live nav bottom so long jumps don't leave a gap after chrome settles.
 */
function chromeOffset(el: HTMLElement) {
  const inJourney = Boolean(el.closest('.ex-journey-scene'))
  const nav = document.querySelector<HTMLElement>('.ex-journey-nav-pin')
  const header = document.querySelector<HTMLElement>('.site-header')

  if (inJourney && nav) {
    const rect = nav.getBoundingClientRect()
    if (rect.height > 0) {
      // 2px hairline — avoid the old +12px gap under the journey list.
      return Math.max(0, rect.bottom) + 2
    }
    const navH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--ex-journey-nav-h',
        ),
      ) || 60
    return navH + 2
  }

  if (header) {
    return Math.max(0, header.getBoundingClientRect().bottom) + 8
  }

  return (
    (parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
    ) || 56) + 8
  )
}

/** Prefer the visible card panel so we don't park on empty stop chrome. */
function resolveScrollTarget(el: HTMLElement) {
  const panel = el.querySelector<HTMLElement>(':scope > .ex-journey-panel')
  return panel ?? el
}

/** Prefer the readable copy block (e.g. history era text) for the nav flash. */
function resolveFlashTarget(el: HTMLElement) {
  if (el.matches('.hi-era')) {
    const eraText = el.querySelector<HTMLElement>('.hi-era-text, .hi-era-copy')
    if (eraText) return eraText
  }
  // Accomplishments group: flash heading + every topic under it.
  if (el.matches('.hi-legacy-block')) return el
  const legacyBlock = el.closest<HTMLElement>('.hi-legacy-block')
  if (el.matches('.hi-legacy-head') && legacyBlock) return legacyBlock

  // Explicit full-section flash (e.g. Worship daily pooja CTA).
  if (el.matches('[data-nav-flash="section"]')) return el

  // Section jump (Contents): wash the whole section, not only the headline.
  if (el.matches('section, .tp-section, .tp-closing')) {
    return el
  }

  // Journey stop (Explore): flash the left content panel only — never the map.
  if (el.matches('.ex-journey-stop, [data-journey-stop]') || el.closest('.ex-journey-scene')) {
    const panel =
      el.matches('.ex-journey-panel')
        ? el
        : el.querySelector<HTMLElement>(':scope > .ex-journey-panel') ||
          el.closest<HTMLElement>('.ex-journey-panel')
    if (panel) return panel
  }

  return resolveScrollTarget(el)
}

const REVEAL_ATTR_SELECTOR =
  '[data-hi-reveal], [data-art-reveal], [data-wf-reveal], [data-tj-reveal]'

/** Nodes that should play the enter animation before the highlight. */
function collectRevealNodes(el: HTMLElement): HTMLElement[] {
  const flashTarget = resolveFlashTarget(el)
  const found = new Set<HTMLElement>()

  const addRevealHost = (node: HTMLElement) => {
    if (
      node.hasAttribute('data-hi-reveal') ||
      node.hasAttribute('data-art-reveal') ||
      node.hasAttribute('data-wf-reveal') ||
      node.hasAttribute('data-tj-reveal')
    ) {
      found.add(node)
    }
    const host = node.closest<HTMLElement>(REVEAL_ATTR_SELECTOR)
    if (host) found.add(host)
  }

  addRevealHost(el)
  addRevealHost(flashTarget)

  // Full-section / chapter flash: animate every reveal inside before the wash.
  if (
    flashTarget.matches('[data-nav-flash="section"]') ||
    flashTarget.matches('section, .tp-section, .tp-closing, .tp-part-panel')
  ) {
    flashTarget
      .querySelectorAll<HTMLElement>(REVEAL_ATTR_SELECTOR)
      .forEach((child) => found.add(child))
  }

  // Accomplishments only: animate nested topics with the group before flash.
  if (flashTarget.matches('.hi-legacy-block')) {
    flashTarget
      .querySelectorAll<HTMLElement>(REVEAL_ATTR_SELECTOR)
      .forEach((child) => found.add(child))
  }

  return [...found]
}

/**
 * Instantly show other reveals near the viewport that are not part of the
 * pre-highlight animation — stops timeline cards / next sections cascading
 * in after the flash (e.g. under Dynasties of Influence).
 */
function silenceOtherReveals(_el: HTMLElement, animateNodes: HTMLElement[]) {
  const keep = new Set(animateNodes)
  const vh = window.innerHeight || 800

  document.querySelectorAll<HTMLElement>(REVEAL_ATTR_SELECTOR).forEach((node) => {
    if (keep.has(node) || node.classList.contains('is-inview')) return
    const rect = node.getBoundingClientRect()
    const near = rect.top < vh * 1.35 && rect.bottom > -vh * 0.35
    if (!near) return
    node.classList.add('is-reveal-jump')
    node.classList.add('is-inview')
    requestAnimationFrame(() => node.classList.remove('is-reveal-jump'))
  })
}

function parseCssTime(value: string): number {
  const raw = value.trim().split(',')[0]?.trim() ?? ''
  if (!raw) return 0
  if (raw.endsWith('ms')) return parseFloat(raw) || 0
  if (raw.endsWith('s')) return (parseFloat(raw) || 0) * 1000
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}

/**
 * Start (or finish) enter animations, then return ms until they complete.
 * Already-visible nodes are left alone — no replay, highlight can start now.
 */
function ensureRevealBeforeFlash(el: HTMLElement): number {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const nodes = collectRevealNodes(el)

  // Kill post-highlight cascades (e.g. dynasty timeline under the section head).
  silenceOtherReveals(el, nodes)

  if (!nodes.length) return 0
  if (reduce) {
    nodes.forEach((node) => node.classList.add('is-inview'))
    return 0
  }

  let wait = 0
  for (const node of nodes) {
    const alreadyShown = node.classList.contains('is-inview')
    const opacity = parseFloat(getComputedStyle(node).opacity)
    const fullyVisible = alreadyShown && Number.isFinite(opacity) && opacity >= 0.99

    if (fullyVisible) continue

    if (!alreadyShown) node.classList.add('is-inview')

    const styles = getComputedStyle(node)
    const delay =
      parseCssTime(styles.getPropertyValue('--hi-delay')) ||
      parseCssTime(styles.transitionDelay)
    const duration = parseCssTime(styles.transitionDuration) || 700

    if (!alreadyShown) {
      wait = Math.max(wait, delay + duration + 40)
    } else {
      wait = Math.max(
        wait,
        Math.ceil((1 - Math.max(0, opacity)) * duration) + 40,
      )
    }
  }
  return wait
}

let flashToken = 0
let flashClearTimer = 0
let flashStartTimer = 0
let flashOverlay: HTMLElement | null = null

function getFlashOverlay(): HTMLElement {
  if (flashOverlay?.isConnected) return flashOverlay
  const existing = document.querySelector<HTMLElement>('.tp-nav-flash-viewport')
  if (existing) {
    flashOverlay = existing
    return existing
  }
  const el = document.createElement('div')
  el.className = 'tp-nav-flash-viewport'
  el.setAttribute('aria-hidden', 'true')
  document.body.appendChild(el)
  flashOverlay = el
  return el
}

/** Mild ~2s wash over the jump destination (not the full viewport). */
export function flashNavTarget(el: HTMLElement) {
  const overlay = getFlashOverlay()
  overlay.classList.remove('is-on')
  if (flashClearTimer) {
    window.clearTimeout(flashClearTimer)
    flashClearTimer = 0
  }
  if (flashStartTimer) {
    window.clearTimeout(flashStartTimer)
    flashStartTimer = 0
  }

  const token = ++flashToken
  const waitMs = ensureRevealBeforeFlash(el)

  const placeOverlay = () => {
    const target = resolveFlashTarget(el)
    const rect = target.getBoundingClientRect()
    const inJourney = Boolean(target.closest('.ex-journey-scene'))
    const nav = inJourney
      ? document.querySelector<HTMLElement>('.ex-journey-nav-pin')
      : null
    const minTop = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0
    const top = Math.max(minTop, rect.top)
    const left = Math.max(0, rect.left)
    const right = Math.min(window.innerWidth, rect.right)
    const bottom = Math.min(window.innerHeight, rect.bottom)
    const width = Math.max(0, right - left)
    const height = Math.max(0, bottom - top)
    overlay.style.top = `${top}px`
    overlay.style.left = `${left}px`
    overlay.style.width = `${width}px`
    overlay.style.height = `${height}px`
  }

  const startFlash = () => {
    if (token !== flashToken) return
    placeOverlay()
    overlay.classList.remove('is-on')
    void overlay.offsetWidth
    overlay.classList.add('is-on')

    const clearFlash = () => {
      if (token !== flashToken) return
      overlay.classList.remove('is-on')
    }

    const onAnimEnd = (e: AnimationEvent) => {
      if (e.target !== overlay || e.animationName !== 'tp-nav-flash-viewport') return
      overlay.removeEventListener('animationend', onAnimEnd)
      if (flashClearTimer) {
        window.clearTimeout(flashClearTimer)
        flashClearTimer = 0
      }
      clearFlash()
    }
    overlay.addEventListener('animationend', onAnimEnd)

    flashClearTimer = window.setTimeout(() => {
      flashClearTimer = 0
      overlay.removeEventListener('animationend', onAnimEnd)
      clearFlash()
    }, 2100)
  }

  if (waitMs > 0) {
    flashStartTimer = window.setTimeout(() => {
      flashStartTimer = 0
      startFlash()
    }, waitMs)
  } else {
    startFlash()
  }
}

function targetTop(el: HTMLElement) {
  const node = resolveScrollTarget(el)
  return node.getBoundingClientRect().top + pageScrollY() - chromeOffset(node)
}

let scrollToken = 0
/** Journey stop id locked while a programmatic scroll is in flight. */
let pendingJourneyTarget: string | null = null
let pendingClearTimer = 0

/** Active journey destination during nav/marker jumps (null when idle). */
export function getProgrammaticJourneyTarget() {
  return pendingJourneyTarget
}

function clearPendingSoon(cleanId: string, delayMs = 280) {
  if (pendingClearTimer) window.clearTimeout(pendingClearTimer)
  pendingClearTimer = window.setTimeout(() => {
    pendingClearTimer = 0
    if (pendingJourneyTarget === cleanId) pendingJourneyTarget = null
    window.dispatchEvent(new CustomEvent('ex-journey-scroll-end'))
  }, delayMs)
}

/**
 * Scroll an element into view beneath sticky chrome.
 * Prefer this over scrollIntoView — fixed journey nav + auto-hide header
 * change mid-scroll and break native scroll-margin positioning.
 *
 * Long journey jumps (e.g. map 01 → 08) use an instant scroll so the lock
 * cannot expire mid-flight and land on the wrong stop.
 *
 * @param flashEl — optional highlight target (defaults to the scrolled element).
 *   Pass `false` to skip the wash; pass a node (e.g. chapter panel) to flash that instead.
 */
export function scrollToId(
  id: string,
  options?: { flashEl?: HTMLElement | false },
) {
  const cleanId = id.replace(/^#/, '')
  const el = document.getElementById(cleanId)
  if (!el) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const inJourney = Boolean(el.closest('.ex-journey-scene'))
  const token = ++scrollToken
  const root = document.documentElement

  if (pendingClearTimer) {
    window.clearTimeout(pendingClearTimer)
    pendingClearTimer = 0
  }

  // Match settled journey chrome; freeze auto-hide so mid-scroll jitter
  // cannot re-show the header and shift the journey list.
  if (inJourney) {
    root.dataset.navHidden = 'true'
    root.dataset.programmaticScroll = 'true'
    pendingJourneyTarget = cleanId
    window.dispatchEvent(
      new CustomEvent('ex-journey-target', { detail: { id: cleanId } }),
    )
  } else {
    pendingJourneyTarget = null
  }

  const measure = () => Math.max(0, targetTop(el))

  const snapTo = (behavior: ScrollBehavior) => {
    if (token !== scrollToken) return
    window.scrollTo({ top: measure(), behavior })
  }

  const finish = () => {
    if (token !== scrollToken) return
    snapTo('auto')
    requestAnimationFrame(() => {
      if (token !== scrollToken) return
      snapTo('auto')

      const release = () => {
        if (token !== scrollToken) return
        // Final pass after nav pin top transition (0.32s) settles.
        snapTo('auto')
        if (root.dataset.programmaticScroll) {
          delete root.dataset.programmaticScroll
        }
        if (options?.flashEl !== false) {
          flashNavTarget(options?.flashEl ?? el)
        }
        clearPendingSoon(cleanId, inJourney ? 320 : 0)
        if (!inJourney) {
          window.dispatchEvent(new CustomEvent('ex-journey-scroll-end'))
        }
      }

      if (inJourney) {
        window.setTimeout(release, 340)
      } else {
        release()
      }
    })
  }

  const run = () => {
    if (token !== scrollToken) return

    const distance = Math.abs(measure() - pageScrollY())
    const vh = window.innerHeight || 800
    /* Long marker/nav jumps: instant scroll — smooth often dies mid-flight. */
    const longJump = inJourney && distance > vh * 1.15
    const behavior: ScrollBehavior =
      reduce || longJump ? 'auto' : 'smooth'

    snapTo(behavior)

    if (behavior === 'auto') {
      finish()
      return
    }

    let settled = false
    const settle = () => {
      if (settled || token !== scrollToken) return
      settled = true
      window.removeEventListener('scrollend', settle)
      window.clearTimeout(fallback)
      requestAnimationFrame(finish)
    }

    window.addEventListener('scrollend', settle, { once: true })
    const fallbackMs = Math.min(2200, Math.max(900, distance * 0.55 + 400))
    const fallback = window.setTimeout(settle, fallbackMs)
  }

  // Two frames: let header translate / unlock-scroll settle before measuring.
  requestAnimationFrame(() => {
    requestAnimationFrame(run)
  })
}

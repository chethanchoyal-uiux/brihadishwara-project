let locks = 0
let prevHtmlOverflow = ''
let prevBodyOverflow = ''

function scrollbarWidth() {
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth)
}

/** Freeze page scroll without layout jump when the scrollbar disappears. */
export function lockScroll() {
  if (locks === 0) {
    prevHtmlOverflow = document.documentElement.style.overflow
    prevBodyOverflow = document.body.style.overflow
    const offset = scrollbarWidth()
    document.documentElement.style.setProperty(
      '--scroll-lock-offset',
      `${offset}px`,
    )
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('is-scroll-locked')
  }
  locks += 1
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks > 0) return

  document.documentElement.style.overflow = prevHtmlOverflow
  document.body.style.overflow = prevBodyOverflow
  document.documentElement.style.removeProperty('--scroll-lock-offset')
  document.documentElement.classList.remove('is-scroll-locked')
}

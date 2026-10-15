import { useEffect, useRef } from 'react'

/** Flat stop used for scroll-spy / walk order (unchanged numbering in content). */
export type JourneyNavStop = {
  num: number
  id: string
  label: string
}

/** Sticky nav chip — one or more map stops that form a journey stage. */
export type JourneyNavItem = {
  id: string
  nums: number[]
  label: string
  stopIds: string[]
}

type JourneyNavProps = {
  items: JourneyNavItem[]
  activeId: string | null
  onSelect: (id: string) => void
}

function mapLabel(n: number) {
  return String(n).padStart(2, '0')
}

/** True when nums are consecutive integers (e.g. 9–12). */
function isConsecutive(nums: number[]) {
  if (nums.length < 2) return false
  const sorted = [...nums].sort((a, b) => a - b)
  return sorted.every((n, i) => i === 0 || n === sorted[i - 1] + 1)
}

function formatNumJoin(nums: number[]) {
  if (nums.length === 1) return mapLabel(nums[0])
  if (isConsecutive(nums)) {
    const sorted = [...nums].sort((a, b) => a - b)
    return `${mapLabel(sorted[0])}–${mapLabel(sorted[sorted.length - 1])}`
  }
  return nums.map(mapLabel).join(' & ')
}

/** Horizontal journey nav — pinned by the journey backdrop parent. */
export function JourneyNav({ items, activeId, onSelect }: JourneyNavProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const active = activeRef.current
    if (!scroller || !active) return

    // Pin the active stop to the left edge of the visible nav track.
    const delta =
      active.getBoundingClientRect().left - scroller.getBoundingClientRect().left
    const target = Math.max(0, scroller.scrollLeft + delta)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.scrollTo({
      left: target,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [activeId])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const onWheel = (event: WheelEvent) => {
      if (event.deltaX === 0 && event.deltaY === 0) return
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      scroller.scrollLeft += delta
      event.preventDefault()
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      scroller.removeEventListener('wheel', onWheel)
    }
  }, [items.length])

  return (
    <nav className="ex-journey-nav has-hint" aria-label="Temple walk stops">
      <p className="ex-journey-nav-hint" aria-hidden="true">
        <span className="ex-gesture-desktop">Scroll for more</span>
        <span className="ex-gesture-mobile">Swipe for more</span>
        <svg
          className="ex-journey-nav-hint-chevron"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </p>
      <div className="ex-journey-nav-scroll" ref={scrollerRef}>
        <ol className="ex-journey-nav-list">
          {items.map((item) => {
            const activeIndex = activeId ? item.stopIds.indexOf(activeId) : -1
            const isActive = activeIndex >= 0
            const activeNum = isActive ? item.nums[activeIndex] : null
            const isGroup = item.nums.length > 1
            const consecutive = isConsecutive(item.nums)

            return (
              <li key={item.id}>
                <button
                  type="button"
                  ref={isActive ? activeRef : undefined}
                  className={`ex-journey-nav-item${isActive ? ' is-active' : ''}${
                    isGroup ? ' is-group' : ''
                  }`}
                  data-stop-id={isActive && activeId ? activeId : item.stopIds[0]}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={
                    isGroup
                      ? `${formatNumJoin(item.nums)} ${item.label}`
                      : `${mapLabel(item.nums[0])} ${item.label}`
                  }
                  onClick={() => onSelect(item.stopIds[0])}
                >
                  <span className="ex-journey-nav-num" aria-hidden="true">
                    {isGroup && !consecutive
                      ? item.nums.map((num, index) => (
                          <span key={num} className="ex-journey-nav-num-part">
                            {index > 0 ? (
                              <span className="ex-journey-nav-num-sep"> & </span>
                            ) : null}
                            <span
                              className={
                                activeNum === num
                                  ? 'ex-journey-nav-num-current'
                                  : isActive
                                    ? 'ex-journey-nav-num-muted'
                                    : undefined
                              }
                            >
                              {mapLabel(num)}
                            </span>
                          </span>
                        ))
                      : isGroup && consecutive && activeNum != null
                        ? mapLabel(activeNum)
                        : formatNumJoin(item.nums)}
                  </span>
                  <span className="ex-journey-nav-label">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

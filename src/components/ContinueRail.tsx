import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { sectionRoutes } from '../data/home'

type ContinueCard = {
  id: string
  title: string
  blurb: string
  image: string
}

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === 'prev' ? (
        <polyline points="15 6 9 12 15 18" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  )
}

export function ContinueRail({ cards }: { cards: ContinueCard[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateEdges = useCallback(() => {
    const el = listRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const left = el.scrollLeft
    setCanPrev(left > 4)
    setCanNext(left < max - 4)
  }, [])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    const ro = new ResizeObserver(updateEdges)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      ro.disconnect()
    }
  }, [updateEdges, cards])

  const scrollByCard = (dir: -1 | 1) => {
    const el = listRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('li')
    const gap = Number.parseFloat(getComputedStyle(el).gap || '16') || 16
    const step = (card?.offsetWidth ?? el.clientWidth * 0.7) + gap
    const max = Math.max(0, el.scrollWidth - el.clientWidth)
    const next = Math.min(max, Math.max(0, el.scrollLeft + dir * step))
    el.scrollTo({ left: next, behavior: 'smooth' })
  }

  return (
    <div className="tp-continue-rail">
      <div className="tp-continue-controls">
        <button
          type="button"
          className="tp-continue-arrow"
          aria-label="Previous section"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        >
          <Chevron dir="prev" />
        </button>
        <button
          type="button"
          className="tp-continue-arrow"
          aria-label="Next section"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        >
          <Chevron dir="next" />
        </button>
      </div>
      <ul
        className={[
          'tp-continue-list',
          !canPrev ? 'is-at-start' : '',
          !canNext ? 'is-at-end' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        ref={listRef}
      >
        {cards.map((card) => {
          const route = sectionRoutes[card.id]
          const href = route ?? `/#${card.id}`
          return (
            <li key={card.id}>
              <Link
                to={href}
                className={`tp-continue-card tp-continue-card--${card.id}`}
              >
                <span className="tp-continue-media">
                  <img
                    src={card.image}
                    alt=""
                    width={400}
                    height={500}
                    loading="lazy"
                  />
                </span>
                <span className="tp-continue-copy">
                  <span className="tp-continue-title">{card.title}</span>
                  <span className="tp-continue-blurb">{card.blurb}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

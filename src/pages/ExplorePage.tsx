import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ContinueRail } from '../components/ContinueRail'
import { TempleContents } from '../components/TempleContents'
import { JourneyNav } from '../components/explore/JourneyNav'
import { JourneyStopFloat } from '../components/explore/JourneyStopIndicator'
import {
  ExhibitStopHead,
  JourneyExhibit,
  StatStrip,
  TopicCards,
  mapLabel,
} from '../components/explore/JourneyExhibit'
import { useJourneyScrollSpy } from '../hooks/useJourneyScrollSpy'
import { useJourneyNavPin } from '../hooks/useJourneyNavPin'
import { useJourneyScrollCue } from '../hooks/useJourneyScrollCue'
import { useJourneyMapSlide } from '../hooks/useJourneyMapSlide'
import { useMobileMapFly } from '../hooks/useMobileMapFly'
import { useMobileJourneyIntroSnap } from '../hooks/useMobileJourneyIntroSnap'
import { sections } from '../data/home'
import { explorePage as e } from '../data/explore'
import { SectionFigure } from '../components/SectionFigure'
import { lockScroll, unlockScroll } from '../utils/scrollLock'
import { scrollToId } from '../utils/scrollToId'

const continueCards = sections.filter((section) => section.id !== 'explore')

/** Renders text with selective **bold** and {{dimension}} markers. */
function RichText({ text }: { text: string }): ReactNode {
  return text.split(/(\{\{[^}]+\}\}|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return (
        <span key={index} className="ex-dim">
          {part.slice(2, -2)}
        </span>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

type FigureImg = {
  src: string
  alt: string
  caption?: string
  title?: string
  /** When set, used for the sculpture heading instead of title (overlay keeps title) */
  heading?: string
  intro?: string
  objectPosition?: string
  /** Title + intro span full width; next gallery item is the paired image */
  pairLead?: boolean
}

function chunkItems<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
  return chunks
}

function Figure({ image, className = '' }: { image: FigureImg; className?: string }) {
  return <SectionFigure image={image} className={className} />
}

function Prose({ paragraphs, className = '' }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`tp-prose ${className}`.trim()}>
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 40)}`}>
          <RichText text={paragraph} />
        </p>
      ))}
    </div>
  )
}

function Gallery({
  images,
  className = '',
  label,
}: {
  images: FigureImg[]
  className?: string
  label: string
}) {
  return (
    <div className={`ex-gallery ${className}`.trim()} aria-label={label}>
      {images.map((image, index) => (
        <Figure image={image} key={`${image.src}-${index}`} />
      ))}
    </div>
  )
}

const exhibitDeps = {
  RichText,
  Figure,
  Prose,
  Gallery,
}

function Cards({ cards }: { cards: { title: string; body: string }[] }) {
  return <TopicCards cards={cards} RichText={RichText} />
}

function JourneyGroupHead({ title }: { title: string }) {
  return (
    <header className="ex-journey-card-head">
      <h2 className="ex-journey-card-title">{title}</h2>
    </header>
  )
}

function WalkModal({
  open,
  onClose,
  title,
  labelledBy,
  dialogClassName,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  labelledBy: string
  dialogClassName?: string
  children: ReactNode
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    lockScroll()
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="ex-modal" role="presentation">
      <button
        type="button"
        className="ex-modal-backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className={`ex-modal-dialog${dialogClassName ? ` ${dialogClassName}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <div className="ex-modal-chrome">
          <h2 id={labelledBy} className="ex-modal-title">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="ex-modal-close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="ex-modal-body">{children}</div>
      </div>
    </div>
  )
}

function journeySide(_stopId: string) {
  // Journey cards stay on the left so the map stays readable on the right.
  return 'is-left'
}

type MapStop = (typeof e.mapWalk.stops)[number]
type CalloutSide = 'right' | 'left' | 'top' | 'bottom'

/** Pick a callout side that stays on-map and avoids neighbouring markers. */
function calloutSide(active: MapStop, stops: readonly MapStop[]): CalloutSide {
  // Interpretation Centre sits near the left of the framed laptop map — a
  // left callout clips into the text column. Keep the title above the number.
  if (active.num === 8) return 'top'
  // South Cloister — keep the label on the open right side of the map.
  if (active.num === 6) return 'right'
  // North Cloister sits on the right edge — keep the label inside the map.
  if (active.num === 13) return 'left'

  const others = stops.filter((stop) => stop.num !== active.num)
  const blocked = (side: CalloutSide) =>
    others.some((stop) => {
      const dx = stop.x - active.x
      const dy = stop.y - active.y
      if (side === 'right') return dx > 1 && dx < 24 && Math.abs(dy) < 7
      if (side === 'left') return dx < -1 && dx > -24 && Math.abs(dy) < 7
      if (side === 'top') return dy < -1 && dy > -16 && Math.abs(dx) < 12
      return dy > 1 && dy < 16 && Math.abs(dx) < 12
    })

  const order: CalloutSide[] = []
  if (active.x <= 72) order.push('right')
  if (active.x >= 28) order.push('left')
  if (active.y >= 16) order.push('top')
  if (active.y <= 84) order.push('bottom')
  for (const side of ['right', 'left', 'top', 'bottom'] as const) {
    if (!order.includes(side)) order.push(side)
  }

  return order.find((side) => !blocked(side)) ?? 'right'
}

type EtiquetteRule = (typeof e.etiquette.rules)[number]

function EtiquetteRuleBody({ rule }: { rule: EtiquetteRule }) {
  if (rule.kind === 'dress') {
    return (
      <div className="ex-etiquette-dress">
        <div className="ex-etiquette-dress-cols">
          <div className="ex-etiquette-dress-col">
            <h4>{rule.men.title}</h4>
            <ul>
              {rule.men.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          </div>
          <div className="ex-etiquette-dress-col">
            <h4>{rule.women.title}</h4>
            <ul>
              {rule.women.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="ex-etiquette-dress-note">
          <RichText text={rule.note} />
        </p>
        {rule.footwear ? (
          <div className="ex-etiquette-subblock">
            <h4>{rule.footwear.title}</h4>
            <div className="ex-etiquette-acc-body">
              {rule.footwear.paragraphs.map((paragraph, index) => (
                <p key={`${rule.id}-footwear-${index}`}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  if (rule.kind === 'grouped') {
    return (
      <div className="ex-etiquette-acc-body">
        {rule.groups.map((group) => (
          <div key={group.title} className="ex-etiquette-subblock">
            <h4>{group.title}</h4>
            {group.paragraphs.map((paragraph, index) => (
              <p key={`${rule.id}-${group.title}-${index}`}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="ex-etiquette-acc-body">
      {rule.paragraphs.map((paragraph, index) => (
        <p key={`${rule.id}-${index}`}>
          <RichText text={paragraph} />
        </p>
      ))}
    </div>
  )
}

function EtiquetteList({ rules }: { rules: EtiquetteRule[] }) {
  return (
    <ul className="ex-etiquette-acc ex-etiquette-acc--static" aria-label="Visitor etiquette">
      {rules.map((rule) => (
        <li key={rule.id}>
          <h3 className="ex-etiquette-acc-title">{rule.title}</h3>
          <EtiquetteRuleBody rule={rule} />
        </li>
      ))}
    </ul>
  )
}

export function ExplorePage() {
  const [inscriptionsOpen, setInscriptionsOpen] = useState(false)
  const inscriptionsTitleId = useId()
  const [cloisterInscriptionsOpen, setCloisterInscriptionsOpen] = useState(false)
  const cloisterInscriptionsTitleId = useId()
  const [etiquetteOpen, setEtiquetteOpen] = useState(false)
  const etiquetteTitleId = useId()
  const journeySceneRef = useRef<HTMLDivElement>(null)
  const journeyStopIds = useMemo(() => e.journey.stops.map((s) => s.id), [])
  const journeyGroups = useMemo(
    () => Object.fromEntries(e.journey.groups.map((group) => [group.id, group])),
    [],
  )
  const activeJourneyId = useJourneyScrollSpy(journeyStopIds)
  const navPinned = useJourneyNavPin(journeySceneRef)
  const journeyScrollCue = useJourneyScrollCue('entrances-maratha')
  const mapSlide = useJourneyMapSlide(
    e.mapWalk.stickyImage.width,
    e.mapWalk.stickyImage.height,
  )
  const [mapPopupOpen, setMapPopupOpen] = useState(false)
  const mapPopupTitleId = useId()
  const mobileFly = useMobileMapFly(activeJourneyId)
  useMobileJourneyIntroSnap(mobileFly.enabled)

  useEffect(() => {
    if (!mobileFly.compact) setMapPopupOpen(false)
  }, [mobileFly.compact])

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === `#${e.etiquette.id}`) setEtiquetteOpen(true)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const closeEtiquette = () => {
    setEtiquetteOpen(false)
    if (window.location.hash === `#${e.etiquette.id}`) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`,
      )
    }
  }
  const activeMapNum = useMemo(() => {
    const stop = e.journey.stops.find((s) => s.id === activeJourneyId)
    return stop?.num ?? null
  }, [activeJourneyId])
  const [useMobileCoords, setUseMobileCoords] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 859px)')
    const sync = () => setUseMobileCoords(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const goToHash = (href: string) => {
    scrollToId(href)
  }

  return (
    <div id="top" className="page page-scroll">
      <Header />
      <main className="temple-main explore-main">
        <section className="tp-hero tp-hero--split" aria-label={e.hero.title}>
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">{e.hero.eyebrow}</p>
            <h1>{e.hero.title}</h1>
            <p className="tp-lead">
              <RichText text={e.hero.lead} />
            </p>
          </div>
          <div className="tp-hero-media" aria-hidden="true">
            <picture>
              <source media="(max-width: 859px)" srcSet={e.hero.imageMobile} />
              <img src={e.hero.image} alt="" width={2048} height={1988} />
            </picture>
          </div>
        </section>

        <section className="tp-section tp-section-alt ex-etiquette-section" id={e.etiquette.id}>
          <div className="tp-section-inner">
            <div className="ex-etiquette-head">
              <header className="ex-etiquette-head-copy">
                <p className="tp-eyebrow">{e.etiquette.eyebrow}</p>
                <h2>{e.etiquette.title}</h2>
              </header>
              <div className="ex-etiquette-head-aside">
                <p className="tp-section-lead">
                  <RichText text={e.etiquette.lead} />
                </p>
                <button
                  type="button"
                  className="tp-cta"
                  aria-haspopup="dialog"
                  onClick={() => setEtiquetteOpen(true)}
                >
                  {e.etiquette.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="tp-section ex-map-walk-section" id={e.mapWalk.id}>
          <div className="tp-section-inner">
            <div className="ex-section-head">
              <h2>{e.mapWalk.title}</h2>
              <p className="tp-section-lead">
                <RichText text={e.mapWalk.lead} />
              </p>
            </div>
          </div>
        </section>

        <section className="ex-journey" id="journey" aria-label="Temple journey">
          <div className="ex-journey-scene" ref={journeySceneRef}>
            <div
              className={`ex-journey-map-pin${navPinned ? ' is-pinned' : ''}${
                mobileFly.shellCollapsed ? ' is-map-compact' : ''
              }`}
            >
              <div
                className={`ex-journey-map${
                  mobileFly.compact ? ' is-compact' : ''
                }${mobileFly.flying ? ' is-flying' : ''}${
                  mobileFly.showLabel ? ' is-map-labeled' : ''
                }`}
                aria-label={
                  mobileFly.compact
                    ? 'Open temple map'
                    : 'Temple complex'
                }
                role={mobileFly.compact ? 'button' : undefined}
                tabIndex={mobileFly.compact ? 0 : undefined}
                onClick={
                  mobileFly.compact
                    ? () => setMapPopupOpen(true)
                    : undefined
                }
                onKeyDown={
                  mobileFly.compact
                    ? (ev) => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                          ev.preventDefault()
                          setMapPopupOpen(true)
                        }
                      }
                    : undefined
                }
              >
                <div className="ex-journey-map-inner">
                  <div className="ex-journey-map-stage">
                    <div
                      className={`ex-journey-map-slide${
                        mapSlide.shifted ? ' is-shifted' : ''
                      }${mapSlide.enabled ? ' is-live' : ''}`}
                      style={
                        mapSlide.enabled
                          ? { transform: `translate3d(${mapSlide.x}px, 0, 0)` }
                          : undefined
                      }
                    >
                      <div
                        className="ex-journey-map-frame"
                        style={
                          mapSlide.enabled
                            ? {
                                width: `${mapSlide.frameWidth}px`,
                                height: `${mapSlide.frameHeight}px`,
                              }
                            : undefined
                        }
                      >
                        <picture>
                          <source
                            media="(max-width: 859px)"
                            srcSet={e.mapWalk.stickyImageMobile.src}
                            width={e.mapWalk.stickyImageMobile.width}
                            height={e.mapWalk.stickyImageMobile.height}
                          />
                          <img
                            src={e.mapWalk.stickyImage.src}
                            alt={e.mapWalk.stickyImage.alt}
                            width={e.mapWalk.stickyImage.width}
                            height={e.mapWalk.stickyImage.height}
                            decoding="async"
                          />
                        </picture>
                        <div className="ex-map-markers">
                          {e.mapWalk.stops.map((stop) => {
                            const isActive = activeMapNum === stop.num
                            const mx = useMobileCoords ? stop.mobileX : stop.x
                            const my = useMobileCoords ? stop.mobileY : stop.y
                            return (
                              <button
                                key={stop.num}
                                type="button"
                                className={`ex-map-marker${
                                  isActive ? ' is-active' : ''
                                }${
                                  isActive
                                    ? ` is-callout-${calloutSide(
                                        {
                                          ...stop,
                                          x: mx,
                                          y: my,
                                        },
                                        e.mapWalk.stops.map((s) => ({
                                          ...s,
                                          x: useMobileCoords ? s.mobileX : s.x,
                                          y: useMobileCoords ? s.mobileY : s.y,
                                        })),
                                      )}`
                                    : ''
                                }`}
                                style={{
                                  left: `${mx}%`,
                                  top: `${my}%`,
                                }}
                                aria-label={`${mapLabel(stop.num)} ${stop.label}`}
                                aria-current={isActive ? 'true' : undefined}
                                onClick={() => goToHash(stop.href)}
                              >
                                <span className="ex-map-marker-fill">
                                  <span className="ex-map-marker-num">
                                    {mapLabel(stop.num)}
                                  </span>
                                </span>
                                {isActive ? (
                                  <span
                                    className="ex-map-callout"
                                    aria-hidden="true"
                                  >
                                    <span className="ex-map-callout-line" />
                                    <span className="ex-map-callout-title">
                                      {stop.label}
                                    </span>
                                  </span>
                                ) : null}
                              </button>
                            )
                          })}
                        </div>
                        <div className="ex-journey-map-veil" aria-hidden="true" />
                        <span className="ex-journey-map-badge" aria-hidden="true">
                          MAP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`ex-journey-nav-pin${navPinned ? ' is-pinned' : ''}`}>
              <JourneyNav
                items={e.journey.navItems}
                activeId={activeJourneyId}
                onSelect={(id) => goToHash(`#${id}`)}
              />
            </div>

            <button
              type="button"
              className={`ex-journey-scroll-cue${
                journeyScrollCue.show ? ' is-active' : ' is-gone'
              }`}
              style={
                journeyScrollCue.show
                  ? { top: journeyScrollCue.top, left: journeyScrollCue.left }
                  : undefined
              }
              aria-label="Go to first stop"
              tabIndex={journeyScrollCue.show ? 0 : -1}
              onClick={() => goToHash('#entrances-maratha')}
            >
              <span className="ex-journey-scroll-cue-label">
                <span className="ex-gesture-desktop">Scroll</span>
                <span className="ex-gesture-mobile">Swipe</span>
              </span>
              <svg
                className="ex-journey-scroll-cue-arrow"
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="ex-journey-flow">
              <div className="ex-journey-group">
                <article
                  className={`ex-journey-stop ${journeySide('entrances-maratha')}`}
                  id="entrances-maratha"
                  data-journey-stop="entrances-maratha"
                >
                  <JourneyStopFloat
                    num={e.entrances.maratha.mapNum}
                    title={e.entrances.maratha.title}
                  />
                  <div className="ex-journey-panel">
                    <JourneyGroupHead title={journeyGroups['temple-entrance'].title} />
                    <JourneyExhibit
                      storyKey="entrances.overview"
                      content={e.entrances.overview}
                      label="Temple entrances"
                      deps={exhibitDeps}
                    />
                    <div className="ex-exhibit-nested">
                      <ExhibitStopHead
                        mapNum={e.entrances.maratha.mapNum}
                        title={e.entrances.maratha.title}
                        intro={e.entrances.maratha.orientation}
                        RichText={RichText}
                      />
                      <JourneyExhibit
                        storyKey="entrances.maratha"
                        content={e.entrances.maratha}
                        label="Maratha Entrance"
                        deps={exhibitDeps}
                      />
                    </div>
                  </div>
                </article>

                <article
                  className={`ex-journey-stop ${journeySide('entrances-keralantakan')}`}
                  id="entrances-keralantakan"
                  data-journey-stop="entrances-keralantakan"
                >
                  <JourneyStopFloat
                    num={e.entrances.keralantakan.mapNum}
                    title={e.entrances.keralantakan.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.entrances.keralantakan.mapNum}
                      title={e.entrances.keralantakan.title}
                      intro={e.entrances.keralantakan.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="entrances.keralantakan"
                      content={e.entrances.keralantakan}
                      label="Keralantakan Tiruvasal"
                      deps={exhibitDeps}
                    />

                    <section
                      className="ex-observe-section"
                      aria-labelledby="keralantakan-observe-title"
                    >
                      <h3 id="keralantakan-observe-title" className="ex-observe-title">
                        {e.entrances.keralantakan.observe.title}
                      </h3>
                      <div className="ex-observe-views">
                        {e.entrances.keralantakan.observe.views.map((view) => (
                          <div key={view.id} className="ex-observe-view" id={view.id}>
                            <h4 className="ex-observe-view-title">{view.title}</h4>
                            {view.body ? (
                              <p className="ex-observe-view-body">
                                <RichText text={view.body} />
                              </p>
                            ) : null}
                            {'image' in view && view.image ? (
                              <Figure
                                image={view.image}
                                className="ex-exhibit-figure is-compact"
                              />
                            ) : null}
                            {'stats' in view && view.stats?.length ? (
                              <StatStrip
                                items={view.stats}
                                label={`${view.title} figures`}
                              />
                            ) : null}
                            {'showInscriptionsCallout' in view &&
                            view.showInscriptionsCallout ? (
                              <button
                                type="button"
                                className="ex-inline-callout"
                                aria-haspopup="dialog"
                                aria-label="Open inscriptions popup"
                                onClick={() => setInscriptionsOpen(true)}
                              >
                                <p className="tp-eyebrow">Inscriptions · Popup</p>
                                <h3>
                                  {e.entrances.keralantakan.inscriptionsCallout.title}
                                </h3>
                                <p>
                                  <RichText
                                    text={
                                      e.entrances.keralantakan.inscriptionsCallout
                                        .intro?.[0] ??
                                      e.entrances.keralantakan.inscriptionsCallout
                                        .paragraphs[0]
                                    }
                                  />
                                </p>
                                <span
                                  className="ex-inline-callout-action"
                                  aria-hidden="true"
                                >
                                  Open popup
                                  <span className="ex-inline-callout-action-mark">↗</span>
                                </span>
                              </button>
                            ) : null}
                            {'topics' in view && view.topics?.length ? (
                              <div className="ex-observe-topics">
                                {view.topics.map((topic) => (
                                  <article
                                    key={topic.title}
                                    className="ex-observe-topic"
                                  >
                                    <h5 className="ex-observe-topic-title">
                                      {topic.title}
                                    </h5>
                                    <p>
                                      <RichText text={topic.body} />
                                    </p>
                                  </article>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </article>

                <article
                  className={`ex-journey-stop ${journeySide('entrances-rajarajan')}`}
                  id="entrances-rajarajan"
                  data-journey-stop="entrances-rajarajan"
                >
                  <JourneyStopFloat
                    num={e.entrances.rajarajan.mapNum}
                    title={e.entrances.rajarajan.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.entrances.rajarajan.mapNum}
                      title={e.entrances.rajarajan.title}
                      intro={e.entrances.rajarajan.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="entrances.rajarajan"
                      content={e.entrances.rajarajan}
                      label="Rajarajan Tiruvasal"
                      deps={exhibitDeps}
                    />

                    <div className="ex-exhibit-nested">
                      <ExhibitStopHead
                        title={e.entrances.rajarajan.dwarapalaka.title}
                        intro={e.entrances.rajarajan.dwarapalaka.intro?.[0]}
                        RichText={RichText}
                      />
                      <JourneyExhibit
                        storyKey="entrances.rajarajan.dwarapalaka"
                        content={e.entrances.rajarajan.dwarapalaka}
                        label="Dwarapalaka"
                        deps={exhibitDeps}
                      />
                    </div>
                  </div>
                </article>
              </div>

              <div className="ex-journey-group">
                <article
                  className={`ex-journey-stop ${journeySide('nandi')}`}
                  id="nandi"
                  data-journey-stop="nandi"
                >
                  <JourneyStopFloat num={e.nandi.mapNum} title={e.nandi.title} />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.nandi.mapNum}
                      title={e.nandi.title}
                      intro={e.nandi.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="nandi"
                      content={e.nandi}
                      label="Nandi Mandapam"
                      deps={exhibitDeps}
                    />
                    <div className="ex-exhibit-nested">
                      <ExhibitStopHead
                        title={e.nandi.dhwaja.title}
                        intro={e.nandi.dhwaja.intro}
                        RichText={RichText}
                      />
                      <Figure
                        image={e.nandi.images[5]}
                        className="ex-exhibit-figure is-wide"
                      />
                    </div>
                  </div>
                </article>

                <article
                  className={`ex-journey-stop ${journeySide('varahi')}`}
                  id="varahi"
                  data-journey-stop="varahi"
                >
                  <JourneyStopFloat num={e.varahi.mapNum} title={e.varahi.title} />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.varahi.mapNum}
                      title={e.varahi.title}
                      intro={e.varahi.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="varahi"
                      content={e.varahi}
                      label="Varahi Shrine"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>
              </div>

              <div className="ex-journey-group">
                <article
                  className={`ex-journey-stop ${journeySide('cloisters-south')}`}
                  id="cloisters-south"
                  data-journey-stop="cloisters-south"
                >
                  <JourneyStopFloat
                    num={e.cloisters.south.mapNum}
                    title={e.cloisters.south.title}
                  />
                  <div className="ex-journey-panel">
                    <JourneyGroupHead title={journeyGroups['outer-corridor'].title} />
                    <JourneyExhibit
                      storyKey="cloisters.overview"
                      content={e.cloisters.overview}
                      label="Thiruchutru Maligai"
                      deps={exhibitDeps}
                    >
                      <button
                        type="button"
                        className="ex-inline-callout"
                        aria-haspopup="dialog"
                        aria-label="Open cloister inscriptions popup"
                        onClick={() => setCloisterInscriptionsOpen(true)}
                      >
                        <p className="tp-eyebrow">Inscriptions · Popup</p>
                        <h3>{e.cloisters.overview.inscriptionsCallout.title}</h3>
                        <p>
                          <RichText
                            text={
                              e.cloisters.overview.inscriptionsCallout.intro?.[0] ??
                              e.cloisters.overview.inscriptionsCallout.paragraphs[0]
                            }
                          />
                        </p>
                        <span className="ex-inline-callout-action" aria-hidden="true">
                          Open popup
                          <span className="ex-inline-callout-action-mark">↗</span>
                        </span>
                      </button>
                    </JourneyExhibit>
                    <div className="ex-exhibit-nested">
                      <ExhibitStopHead
                        title={e.cloisters.east.title}
                        intro={e.cloisters.east.orientation}
                        RichText={RichText}
                      />
                      <JourneyExhibit
                        storyKey="cloisters.east"
                        content={e.cloisters.east}
                        label="East Cloister Wall"
                        deps={exhibitDeps}
                      />
                    </div>
                    <div className="ex-exhibit-nested">
                      <ExhibitStopHead
                        mapNum={e.cloisters.south.mapNum}
                        title={e.cloisters.south.title}
                        intro={e.cloisters.south.orientation}
                        RichText={RichText}
                      />
                      <JourneyExhibit
                        storyKey="cloisters.south"
                        content={e.cloisters.south}
                        label="South Cloister"
                        deps={exhibitDeps}
                      />
                    </div>
                  </div>
                </article>

                <article
                  className={`ex-journey-stop ${journeySide('cloisters-north')}`}
                  id="cloisters-north"
                  data-journey-stop="cloisters-north"
                >
                  <JourneyStopFloat
                    num={e.cloisters.north.mapNum}
                    title={e.cloisters.north.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.cloisters.north.mapNum}
                      title={e.cloisters.north.title}
                      intro={e.cloisters.north.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="cloisters.north"
                      content={e.cloisters.north}
                      label="North Cloister"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>
              </div>

              <div className="ex-journey-group">
                <article
                  className={`ex-journey-stop ${journeySide('main-temple')}`}
                  id="main-temple"
                  data-journey-stop="main-temple"
                >
                  <JourneyStopFloat
                    num={e.mainTemple.mapNum}
                    title={e.mainTemple.title}
                  />
                  <div className="ex-journey-panel is-wide">
                    <ExhibitStopHead
                      mapNum={e.mainTemple.mapNum}
                      title={e.mainTemple.title}
                      intro={e.mainTemple.orientation}
                      RichText={RichText}
                    />

                    <div className="ex-exhibit-nested" id="dakshina-kailasam">
                      <ExhibitStopHead title={e.mainTemple.dakshinaKailasam.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.dakshinaKailasam"
                        content={e.mainTemple.dakshinaKailasam}
                        label="Dakshina Kailasam"
                        deps={exhibitDeps}
                      />
                    </div>

                    <div className="ex-exhibit-nested" id="halls">
                      <ExhibitStopHead title={e.mainTemple.halls.title} />
                      <p className="tp-section-lead ex-halls-lead">
                        <RichText text={e.mainTemple.halls.lead} />
                      </p>
                      {e.mainTemple.halls.image ? (
                        <Figure
                          image={e.mainTemple.halls.image}
                          className="ex-exhibit-figure is-wide"
                        />
                      ) : null}
                    </div>

                    <div className="ex-exhibit-nested" id="hall-mukha">
                      <ExhibitStopHead title={e.mainTemple.halls.mukha.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.halls.mukha"
                        content={e.mainTemple.halls.mukha}
                        label="Mukha Mandapam"
                        deps={exhibitDeps}
                      />
                    </div>

                    <div className="ex-exhibit-nested" id="hall-maha">
                      <ExhibitStopHead title={e.mainTemple.halls.maha.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.halls.maha"
                        content={e.mainTemple.halls.maha}
                        label="Maha Mandapam"
                        deps={exhibitDeps}
                      />
                    </div>

                    <div className="ex-exhibit-nested" id="hall-antrala">
                      <ExhibitStopHead title={e.mainTemple.halls.antrala.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.halls.antrala"
                        content={e.mainTemple.halls.antrala}
                        label="Ardha Mandapam"
                        deps={exhibitDeps}
                      />
                    </div>

                    <div className="ex-exhibit-nested" id="vimana">
                      <ExhibitStopHead title={e.mainTemple.vimana.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.vimana"
                        content={e.mainTemple.vimana}
                        label="Vimana"
                        deps={exhibitDeps}
                      />
                    </div>

                    <article className="ex-exhibit-nested">
                      <ExhibitStopHead
                        title={e.mainTemple.exteriorSculptures.title}
                        intro={e.mainTemple.exteriorSculptures.lead}
                        RichText={RichText}
                      />
                      <div className="ex-sculpture-sets">
                        {chunkItems(
                          e.mainTemple.exteriorSculptures.gallery.slice(0, -1),
                          4,
                        ).map((set, setIndex) => (
                          <div
                            key={`sculpture-set-${setIndex}`}
                            className="ex-sculpture-set"
                          >
                            <div
                              className={`ex-sculpture-grid${set.length === 1 ? ' is-solo' : ''}`}
                            >
                              {(() => {
                                const nodes: ReactNode[] = []
                                for (let index = 0; index < set.length; index++) {
                                  const item = set[index]
                                  const mate =
                                    item.pairLead && set[index + 1] ? set[index + 1] : null
                                  if (mate) {
                                    nodes.push(
                                      <article
                                        key={`${item.heading ?? item.title ?? item.src}-pair-${setIndex}`}
                                        className="ex-sculpture-pair"
                                      >
                                        {item.heading || item.title ? (
                                          <h3 className="ex-sculpture-title">
                                            {item.heading || item.title}
                                          </h3>
                                        ) : null}
                                        {item.intro ? (
                                          <p className="ex-sculpture-intro">
                                            <RichText text={item.intro} />
                                          </p>
                                        ) : null}
                                        <div className="ex-sculpture-pair-images">
                                          <Figure image={item} />
                                          <Figure image={mate} />
                                        </div>
                                      </article>,
                                    )
                                    index++
                                    continue
                                  }
                                  nodes.push(
                                    <article
                                      key={`${item.title ?? item.src}-${setIndex}-${index}`}
                                      className="ex-sculpture-item"
                                    >
                                      {item.heading || item.title ? (
                                        <h3 className="ex-sculpture-title">
                                          {item.heading || item.title}
                                        </h3>
                                      ) : null}
                                      {item.intro ? (
                                        <p className="ex-sculpture-intro">
                                          <RichText text={item.intro} />
                                        </p>
                                      ) : null}
                                      <Figure
                                        image={item}
                                        className={set.length === 1 ? 'ex-exhibit-figure is-wide' : ''}
                                      />
                                    </article>,
                                  )
                                }
                                return nodes
                              })()}
                            </div>
                          </div>
                        ))}
                      </div>
                      {e.mainTemple.exteriorSculptures.gallery.at(-1) ? (
                        <article className="ex-sculpture-item ex-sculpture-item--wide">
                          {e.mainTemple.exteriorSculptures.gallery.at(-1)!.title ? (
                            <h3 className="ex-sculpture-title">
                              {e.mainTemple.exteriorSculptures.gallery.at(-1)!.title}
                            </h3>
                          ) : null}
                          {e.mainTemple.exteriorSculptures.gallery.at(-1)!.intro ? (
                            <p className="ex-sculpture-intro">
                              <RichText
                                text={e.mainTemple.exteriorSculptures.gallery.at(-1)!.intro!}
                              />
                            </p>
                          ) : null}
                          <Figure
                            image={e.mainTemple.exteriorSculptures.gallery.at(-1)!}
                            className="ex-exhibit-figure is-wide"
                          />
                          <JourneyExhibit
                            content={{ notes: e.mainTemple.exteriorSculptures.notes }}
                            label="Exterior sculptures"
                            deps={exhibitDeps}
                          />
                        </article>
                      ) : null}
                    </article>

                    <div className="ex-exhibit-nested">
                      <ExhibitStopHead title={e.mainTemple.waterspouts.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.waterspouts"
                        content={e.mainTemple.waterspouts}
                        label="Waterspouts"
                        deps={exhibitDeps}
                      />
                    </div>

                    <div className="ex-exhibit-nested">
                      <ExhibitStopHead title={e.mainTemple.innerPassage.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.innerPassage"
                        content={e.mainTemple.innerPassage}
                        label="Inner passage"
                        deps={exhibitDeps}
                      />
                    </div>

                    <div className="ex-exhibit-nested ex-sanctum-panel" id="sanctum">
                      <ExhibitStopHead title={e.mainTemple.sanctum.title} />
                      <JourneyExhibit
                        storyKey="mainTemple.sanctum"
                        content={e.mainTemple.sanctum}
                        label="Sanctum"
                        deps={exhibitDeps}
                      />
                    </div>
                  </div>
                </article>
              </div>

              <div className="ex-journey-group">
                <article
                  className={`ex-journey-stop ${journeySide('cloisters-museum')}`}
                  id="cloisters-museum"
                  data-journey-stop="cloisters-museum"
                >
                  <JourneyStopFloat
                    num={e.cloisters.museum.mapNum}
                    title={e.cloisters.museum.title}
                  />
                  <div className="ex-journey-panel">
                    <JourneyGroupHead title={journeyGroups['interpretation'].title} />
                    <ExhibitStopHead
                      mapNum={e.cloisters.museum.mapNum}
                      title={e.cloisters.museum.title}
                      intro={e.cloisters.museum.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="cloisters.museum"
                      content={e.cloisters.museum}
                      label="Interpretation Centre"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>
              </div>

              <div className="ex-journey-group">
                <div
                  className={`ex-journey-stop ${journeySide('shrines-ganapathi')}`}
                  id="shrines-ganapathi"
                  data-journey-stop="shrines-ganapathi"
                >
                  <JourneyStopFloat
                    num={e.shrines.ganapathi.mapNum}
                    title={e.shrines.ganapathi.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.shrines.ganapathi.mapNum}
                      title={e.shrines.ganapathi.title}
                      intro={e.shrines.ganapathi.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="shrines.ganapathi"
                      content={e.shrines.ganapathi}
                      label="Ganapathi Kovil"
                      deps={exhibitDeps}
                    />
                  </div>
                </div>

                <article
                  className={`ex-journey-stop ${journeySide('shrines-karuvur')}`}
                  id="shrines-karuvur"
                  data-journey-stop="shrines-karuvur"
                >
                  <JourneyStopFloat
                    num={e.shrines.karuvur.mapNum}
                    title={e.shrines.karuvur.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.shrines.karuvur.mapNum}
                      title={e.shrines.karuvur.title}
                      intro={e.shrines.karuvur.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="shrines.karuvur"
                      content={e.shrines.karuvur}
                      label="Karuvur Siddhar Mandapam"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>

                <article
                  className={`ex-journey-stop ${journeySide('shrines-subrahmanya')}`}
                  id="shrines-subrahmanya"
                  data-journey-stop="shrines-subrahmanya"
                >
                  <JourneyStopFloat
                    num={e.shrines.subrahmanya.mapNum}
                    title={e.shrines.subrahmanya.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.shrines.subrahmanya.mapNum}
                      title={e.shrines.subrahmanya.title}
                      intro={e.shrines.subrahmanya.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="shrines.subrahmanya"
                      content={e.shrines.subrahmanya}
                      label="Subrahmanya Shrine"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>

                <article
                  className={`ex-journey-stop ${journeySide('shrines-chandikeshwara')}`}
                  id="shrines-chandikeshwara"
                  data-journey-stop="shrines-chandikeshwara"
                >
                  <JourneyStopFloat
                    num={e.shrines.chandikeshwara.mapNum}
                    title={e.shrines.chandikeshwara.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.shrines.chandikeshwara.mapNum}
                      title={e.shrines.chandikeshwara.title}
                      intro={e.shrines.chandikeshwara.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="shrines.chandikeshwara"
                      content={e.shrines.chandikeshwara}
                      label="Chandikeshwara Shrine"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>
              </div>

              <div className="ex-journey-group">
                <article
                  className={`ex-journey-stop ${journeySide('shrines-amman')}`}
                  id="shrines-amman"
                  data-journey-stop="shrines-amman"
                >
                  <JourneyStopFloat
                    num={e.shrines.amman.mapNum}
                    title={e.shrines.amman.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.shrines.amman.mapNum}
                      title={e.shrines.amman.title}
                      intro={e.shrines.amman.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="shrines.amman"
                      content={e.shrines.amman}
                      label="Amman Shrine"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>

                <article
                  className={`ex-journey-stop ${journeySide('shrines-nataraja')}`}
                  id="shrines-nataraja"
                  data-journey-stop="shrines-nataraja"
                >
                  <JourneyStopFloat
                    num={e.shrines.nataraja.mapNum}
                    title={e.shrines.nataraja.title}
                  />
                  <div className="ex-journey-panel">
                    <ExhibitStopHead
                      mapNum={e.shrines.nataraja.mapNum}
                      title={e.shrines.nataraja.title}
                      intro={e.shrines.nataraja.orientation}
                      RichText={RichText}
                    />
                    <JourneyExhibit
                      storyKey="shrines.nataraja"
                      content={e.shrines.nataraja}
                      label="Nataraja Mandapam"
                      deps={exhibitDeps}
                    />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="tp-closing" id={e.continue.id} aria-labelledby="ex-continue-title">
          <div className="tp-section-inner tp-closing-inner">
            <h2 id="ex-continue-title">{e.continue.title}</h2>
            <p className="tp-lead">
              <RichText text={e.continue.lead} />
            </p>
          </div>
                    <ContinueRail cards={continueCards} />
        </section>
      </main>
      <Footer variant="full" />
      <TempleContents stages={e.contentsStages} activeIdHint={activeJourneyId} />

      <WalkModal
        open={etiquetteOpen}
        onClose={closeEtiquette}
        title={e.etiquette.modalTitle}
        labelledBy={etiquetteTitleId}
        dialogClassName="ex-modal-dialog--etiquette"
      >
        <EtiquetteList rules={e.etiquette.rules} />
        <p className="ex-etiquette-blessing tp-note">
          <RichText text={e.etiquette.note} />
        </p>
      </WalkModal>

      <WalkModal
        open={inscriptionsOpen}
        onClose={() => setInscriptionsOpen(false)}
        title={e.entrances.keralantakan.inscriptionsCallout.title}
        labelledBy={inscriptionsTitleId}
      >
        <Prose
          paragraphs={
            e.entrances.keralantakan.inscriptionsCallout.intro ??
            e.entrances.keralantakan.inscriptionsCallout.paragraphs.slice(0, 1)
          }
        />
        {e.entrances.keralantakan.inscriptionsCallout.stats ? (
          <StatStrip
            items={e.entrances.keralantakan.inscriptionsCallout.stats}
            label="Inscription counts"
          />
        ) : null}
        {e.entrances.keralantakan.inscriptionsCallout.cards ? (
          <Cards cards={e.entrances.keralantakan.inscriptionsCallout.cards} />
        ) : (
          <Prose
            paragraphs={e.entrances.keralantakan.inscriptionsCallout.paragraphs.slice(1)}
          />
        )}
        <Figure
          image={e.entrances.keralantakan.inscriptionsCallout.image}
          className="ex-modal-figure"
        />
      </WalkModal>

      <WalkModal
        open={cloisterInscriptionsOpen}
        onClose={() => setCloisterInscriptionsOpen(false)}
        title={e.cloisters.overview.inscriptionsCallout.title}
        labelledBy={cloisterInscriptionsTitleId}
      >
        <blockquote className="tp-pull-quote">
          {e.cloisters.overview.inscriptionsCallout.intro?.[0] ??
            e.cloisters.overview.inscriptionsCallout.paragraphs[0]}
        </blockquote>
        <Prose
          paragraphs={e.cloisters.overview.inscriptionsCallout.paragraphs.slice(1)}
        />
        {e.cloisters.overview.inscriptionsCallout.image ? (
          <Figure
            image={e.cloisters.overview.inscriptionsCallout.image}
            className="ex-modal-figure"
          />
        ) : null}
      </WalkModal>

      <WalkModal
        open={mapPopupOpen}
        onClose={() => setMapPopupOpen(false)}
        title="Temple plan"
        labelledBy={mapPopupTitleId}
        dialogClassName="ex-map-popup-dialog"
      >
        <div className="ex-map-popup" role="img" aria-label={e.mapWalk.stickyImageMobile.alt}>
          <img
            src={e.mapWalk.stickyImageMobile.src}
            alt=""
            width={e.mapWalk.stickyImageMobile.width}
            height={e.mapWalk.stickyImageMobile.height}
            decoding="async"
          />
          <div className="ex-map-popup-markers">
            {e.mapWalk.stops.map((stop) => {
              const isActive = activeMapNum === stop.num
              return (
                <button
                  key={stop.num}
                  type="button"
                  className={`ex-map-popup-marker${isActive ? ' is-active' : ''}`}
                  style={{
                    left: `${stop.mobileX}%`,
                    top: `${stop.mobileY}%`,
                  }}
                  aria-label={`Go to ${mapLabel(stop.num)} ${stop.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => {
                    setMapPopupOpen(false)
                    goToHash(stop.href)
                  }}
                >
                  <span className="ex-map-popup-marker-fill">
                    {mapLabel(stop.num)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </WalkModal>
    </div>
  )
}

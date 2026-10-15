import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ContinueRail } from '../components/ContinueRail'
import { TempleContents } from '../components/TempleContents'
import { useLightbox } from '../components/ImageLightbox'
import { sections } from '../data/home'
import {
  thanjavurPage as t,
  type AttractionGroup,
  type AttractionItem,
  type ThanjavurImage,
} from '../data/thanjavur'
import { ThanjavurAccessMap } from '../components/ThanjavurAccessMap'

const continueCards = sections.filter((section) => section.id !== 'thanjavur')

function RichText({ text }: { text: string }): ReactNode {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="tj-rich-link"
        >
          {linkMatch[1]}
        </a>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function AttractionMedia({ image, label }: { image: ThanjavurImage; label: string }) {
  const { openLightbox } = useLightbox()

  return (
    <div className="tj-disc-media" data-img-reveal>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
      />
      <button
        type="button"
        className="img-fs-btn"
        aria-label={`View ${label} fullscreen`}
        onClick={(event) => {
          event.stopPropagation()
          openLightbox({
            src: image.lightboxSrc || image.src,
            alt: image.alt,
            title: label,
          })
        }}
      >
        <svg
          className="img-fs-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M9 3H3v6" />
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M15 21h6v-6" />
        </svg>
      </button>
    </div>
  )
}

function mapsDirectionsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function AccessTravelLayout() {
  const modes = t.access.modes
  const [activeId, setActiveId] = useState(modes[0]?.id ?? 'by-air')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const active = modes.find((mode) => mode.id === activeId) ?? modes[0]

  if (!active) return null

  return (
    <div className="tj-access-layout" data-tj-reveal>
      <ThanjavurAccessMap
        className="tj-access-map"
        cardImage={active.map.card.src}
        cardTitle={active.map.card.title}
        cardRegion={active.map.card.region}
        cardObjectPosition={active.map.card.objectPosition}
        mapLabel={active.map.label}
        embedSrc={active.map.embedSrc}
      />
      <ul className="tj-access-modes" role="radiogroup" aria-label="How to get here">
        {modes.map((mode) => {
          const selected = mode.id === active.id
          const expanded = expandedId === mode.id
          return (
            <li key={mode.id} id={mode.id}>
              <div
                role="radio"
                tabIndex={0}
                aria-checked={selected}
                className={`tj-access-mode${selected ? ' is-active' : ''}`}
                onClick={() => setActiveId(mode.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setActiveId(mode.id)
                  }
                }}
              >
                <figure className="tj-access-mode-media">
                  <img
                    src={mode.image.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="tj-access-mode-copy">
                  <h3>{mode.title}</h3>
                  <p className="tj-access-mode-hub">{mode.hub}</p>
                  <button
                    type="button"
                    className="tj-access-mode-more"
                    aria-expanded={expanded}
                    onClick={(event) => {
                      event.stopPropagation()
                      setActiveId(mode.id)
                      setExpandedId((current) => (current === mode.id ? null : mode.id))
                    }}
                  >
                    {expanded ? 'See less' : 'See more'}
                  </button>
                  <div
                    className={`tp-prose tj-access-mode-body${expanded ? ' is-expanded' : ''}`}
                  >
                    <p className="tj-access-mode-body-full">
                      <RichText text={mode.body} />
                    </p>
                    <p className="tj-access-mode-body-detail">
                      <RichText text={mode.detail} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function DirectionsIcon() {
  return <span className="tj-disc-directions-icon" aria-hidden="true" />
}

function AttractionCard({
  item,
  variant,
}: {
  item: AttractionItem
  variant: AttractionGroup['layout']
}) {
  const label = item.title.replace(/\n/g, ' ')

  return (
    <article id={item.id} className={`tj-disc-card tj-disc-card--${variant}`}>
      <AttractionMedia image={item.image} label={label} />
      <div className="tj-disc-copy">
        <h4>
          {item.title.split(/(\([^)]+\))/).map((part, index) =>
            part.startsWith('(') ? (
              <span key={index} className="tj-disc-title-note">
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            ),
          )}
        </h4>
        {item.meta ? <p className="tj-disc-meta">{item.meta}</p> : null}
        <p className="tj-disc-body">
          <RichText text={item.body} />
        </p>
        {item.directionsQuery ? (
          <a
            className="tj-disc-directions"
            href={mapsDirectionsUrl(item.directionsQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DirectionsIcon />
            <span>Get directions</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}

function DiscoveryGallery({ group }: { group: AttractionGroup }) {
  const usesRail = group.layout !== 'craft-duo'
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail || !usesRail) return

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) return
      if (event.deltaX === 0) return
      const atStart = rail.scrollLeft <= 0 && event.deltaX < 0
      const atEnd =
        rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1 && event.deltaX > 0
      if (atStart || atEnd) return
      rail.scrollLeft += event.deltaX
      event.preventDefault()
    }

    rail.addEventListener('wheel', onWheel, { passive: false })
    return () => rail.removeEventListener('wheel', onWheel)
  }, [usesRail, group.id])

  return (
    <section
      id={group.id}
      className={`tj-discovery tj-discovery--${group.layout}`}
      data-tj-reveal
      aria-labelledby={`${group.id}-title`}
    >
      <div className="tj-discovery-head">
        <h3 id={`${group.id}-title`}>{group.title}</h3>
      </div>

      {usesRail ? (
        <div
          ref={railRef}
          className="tj-discovery-rail"
          tabIndex={0}
          role="region"
          aria-label={group.title.replace(/\n/g, ' ')}
        >
          {group.items.map((item) => (
            <AttractionCard key={item.id} item={item} variant={group.layout} />
          ))}
        </div>
      ) : (
        <div className="tj-discovery-duo">
          {group.items.map((item) => (
            <AttractionCard key={item.id} item={item} variant={group.layout} />
          ))}
        </div>
      )}
    </section>
  )
}

function useRevealOnScroll(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = root.querySelectorAll<HTMLElement>('[data-tj-reveal]')
    if (!nodes.length) return

    if (reduce) {
      nodes.forEach((node) => node.classList.add('is-inview'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview')
            observer.unobserve(entry.target)
          }
        }
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [rootRef])
}

export function ThanjavurPage() {
  const mainRef = useRef<HTMLElement>(null)
  useRevealOnScroll(mainRef)

  return (
    <div id="top" className="page page-scroll page-thanjavur">
      <Header />
      <main className="temple-main thanjavur-main" ref={mainRef}>
        <section className="tp-hero tp-hero--split" aria-label={t.hero.title}>
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="tp-lead">
              <RichText text={t.hero.lead} />
            </p>
          </div>
          <div className="tp-hero-media" aria-hidden="true">
            <img src={t.hero.image} alt="" width={1024} height={483} />
          </div>
        </section>

        <section className="tp-section tp-intro" id={t.intro.id} data-nav-flash="section">
          <div className="tp-section-inner">
            <div className="tj-intro" data-tj-reveal>
              <div className="tj-intro-head">
                <p className="tp-eyebrow">{t.intro.eyebrow}</p>
                <h2>{t.intro.title}</h2>
              </div>
              <div className="tp-prose tj-intro-prose">
                {t.intro.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="tp-section tp-section-alt"
          id={t.attractions.id}
          data-nav-flash="section"
        >
          <div className="tp-section-inner">
            <header className="hi-chapter-head" data-tj-reveal>
              <p className="tp-eyebrow">{t.attractions.eyebrow}</p>
              <h2 className="hi-chapter-label" aria-hidden="true">
                {t.attractions.chapterLabel}
              </h2>
              <div className="hi-chapter-heading">
                <h2>{t.attractions.title}</h2>
              </div>
            </header>

            <div className="tj-attraction-groups">
              {t.attractions.groups.map((group) => (
                <DiscoveryGallery key={group.id} group={group} />
              ))}
            </div>
          </div>
        </section>

        <section className="tp-section" id={t.access.id} data-nav-flash="section">
          <div className="tp-section-inner">
            <header className="hi-chapter-head" data-tj-reveal>
              <p className="tp-eyebrow">{t.access.eyebrow}</p>
              <h2 className="hi-chapter-label" aria-hidden="true">
                {t.access.chapterLabel}
              </h2>
              <div className="hi-chapter-heading">
                <h2>{t.access.title}</h2>
              </div>
            </header>

            <p className="tp-section-lead tj-access-lead" data-tj-reveal>
              <RichText text={t.access.lead} />
            </p>

            <AccessTravelLayout />
          </div>
        </section>

        <section
          className="tp-section tp-section-alt"
          id={t.stay.id}
          data-nav-flash="section"
          aria-labelledby="tj-stay-title"
        >
          <div className="tp-section-inner">
            <div className="tj-stay-layout" data-tj-reveal>
              <header className="hi-chapter-head tj-stay-head">
                <p className="tp-eyebrow">{t.stay.eyebrow}</p>
                <h2 className="hi-chapter-label" aria-hidden="true">
                  {t.stay.chapterLabel}
                </h2>
                <div className="hi-chapter-heading">
                  <h2 id="tj-stay-title">{t.stay.title}</h2>
                </div>
              </header>

              <div className="tp-prose tj-stay-lead">
                <p>
                  <RichText text={t.stay.body} />
                </p>
              </div>

              <figure className="tj-stay-media">
                <img
                  src={t.stay.image.src}
                  alt={t.stay.image.alt}
                  loading="lazy"
                  decoding="async"
                  style={
                    t.stay.image.objectPosition
                      ? { objectPosition: t.stay.image.objectPosition }
                      : undefined
                  }
                />
                <figcaption className="tj-stay-media-note">
                  {t.stay.image.note}
                </figcaption>
              </figure>

              <ul className="tj-stay-options">
                {t.stay.options.map((option) => (
                  <li key={option.id} className="tj-stay-option">
                    <h3>{option.title}</h3>
                    <p>
                      <RichText text={option.body} />
                    </p>
                  </li>
                ))}
              </ul>

              <div className="tj-stay-cta">
                <a
                  className="tp-cta tj-stay-cta-link"
                  href={t.stay.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.stay.cta.label}</span>
                  <svg
                    className="tj-stay-cta-external"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="tp-section"
          id={t.resources.id}
          data-nav-flash="section"
          aria-labelledby="tj-resources-title"
        >
          <div className="tp-section-inner">
            <header className="hi-chapter-head" data-tj-reveal>
              <p className="tp-eyebrow">{t.resources.eyebrow}</p>
              <h2 className="hi-chapter-label" aria-hidden="true">
                {t.resources.chapterLabel}
              </h2>
              <div className="hi-chapter-heading">
                <h2 id="tj-resources-title">{t.resources.title}</h2>
              </div>
            </header>
            <p className="tj-resources-lead" data-tj-reveal>
              <RichText text={t.resources.lead} />
            </p>
            <ul className="tj-resource-links" data-tj-reveal>
              {t.resources.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tj-resource-link"
                  >
                    <span className="tj-resource-copy">
                      <span className="tj-resource-label">{link.label}</span>
                      <span className="tj-resource-url">
                        {link.href.replace(/^https?:\/\//, '')}
                      </span>
                    </span>
                    <span className="tj-resource-cta">
                      Visit website
                      <svg
                        className="tj-resource-cta-icon"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fill="currentColor"
                          d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="tp-closing" id={t.continue.id} aria-labelledby="tj-continue-title">
          <div className="tp-section-inner tp-closing-inner">
            <p className="tp-eyebrow">{t.continue.eyebrow}</p>
            <h2 id="tj-continue-title">{t.continue.title}</h2>
            <p className="tp-lead">
              <RichText text={t.continue.lead} />
            </p>
          </div>

                    <ContinueRail cards={continueCards} />
        </section>
      </main>
      <Footer variant="full" />
      <TempleContents stages={t.contentsStages} />
    </div>
  )
}

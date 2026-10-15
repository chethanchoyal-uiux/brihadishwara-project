import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { TempleContents } from '../components/TempleContents'
import { TemplePartDock } from '../components/TemplePartDock'
import { CoachMarkTour } from '../components/CoachMarkTour'
import { ContinueRail } from '../components/ContinueRail'
import { SectionFigure } from '../components/SectionFigure'
import { sections } from '../data/home'
import {
  contentsForPart,
  contentsStartNumber,
  templeChapters as t,
  type TemplePartId,
} from '../data/templeChapters'
import { templeChaptersTourSteps } from '../data/templeTour'
import { scrollToId } from '../utils/scrollToId'

/** Subtle scroll-in for storytelling beats — matches History / Art, respects reduced motion. */
function useRevealOnScroll(
  rootRef: RefObject<HTMLElement | null>,
  resetDeps: unknown[] = [],
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = root.querySelectorAll<HTMLElement>('[data-hi-reveal]')
    if (!nodes.length) return

    nodes.forEach((node) => node.classList.remove('is-inview'))

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
  }, [rootRef, ...resetDeps])
}

const continueCards = sections.filter((s) => s.id !== 'temple')

/** Renders text with selective **bold** markers. */
function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

type FigureImg = { src: string; alt: string; caption?: string; title?: string }

function Figure({ image, className = '' }: { image: FigureImg; className?: string }) {
  return <SectionFigure image={image} className={className} />
}

function IntroAccordion({
  blocks,
}: {
  blocks: { title: string; body: string }[]
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(blocks.map((b) => [b.title, false])),
  )

  const renderItem = (block: { title: string; body: string }, index: number) => {
    const isOpen = Boolean(open[block.title])
    const panelId = `intro-panel-${block.title.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <li
        key={block.title}
        className={isOpen ? 'is-open' : ''}
        style={{ order: index + 1 }}
      >
        <button
          type="button"
          className="tp-acc-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() =>
            setOpen((prev) => ({ ...prev, [block.title]: !prev[block.title] }))
          }
        >
          <h3>{block.title}</h3>
          <span className="tp-acc-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          id={panelId}
          className="tp-acc-panel"
          role="region"
          hidden={!isOpen}
        >
          <p>
            <RichText text={block.body} />
          </p>
        </div>
      </li>
    )
  }

  const left = blocks
    .map((block, index) => ({ block, index }))
    .filter(({ index }) => index % 2 === 0)
  const right = blocks
    .map((block, index) => ({ block, index }))
    .filter(({ index }) => index % 2 === 1)

  return (
    <div className="tp-intro-columns">
      <ul className="tp-intro-blocks tp-intro-col">
        {left.map(({ block, index }) => renderItem(block, index))}
      </ul>
      <ul className="tp-intro-blocks tp-intro-col">
        {right.map(({ block, index }) => renderItem(block, index))}
      </ul>
    </div>
  )
}

type DesignSubItem = {
  title: string
  paragraphs: string[]
  pullQuote?: string
  image?: FigureImg
}

function DesignSubBlock({ item }: { item: DesignSubItem }) {
  return (
    <article
      className={`tp-design-block${item.image ? ' has-media' : ''}`}
      data-hi-reveal
    >
      <h3>{item.title}</h3>
      <div className="tp-prose">
        {item.paragraphs.map((p) => (
          <p key={p.slice(0, 48)}>
            <RichText text={p} />
          </p>
        ))}
      </div>
      {item.image ? (
        <Figure image={item.image} className="tp-subsection-figure" />
      ) : null}
      {item.pullQuote ? (
        <blockquote className="tp-pull-quote">{item.pullQuote}</blockquote>
      ) : null}
    </article>
  )
}

function DynastyAccordion({
  dynasties,
}: {
  dynasties: { name: string; materials: string; items: string[] }[]
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(dynasties.map((d) => [d.name, false])),
  )

  const renderItem = (
    d: { name: string; materials: string; items: string[] },
    index: number,
  ) => {
    const isOpen = Boolean(open[d.name])
    const panelId = `dynasty-panel-${d.name.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <li
        key={d.name}
        className={isOpen ? 'is-open' : ''}
        style={{ order: index + 1 }}
      >
        <button
          type="button"
          className="tp-acc-toggle tp-dynasty-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() =>
            setOpen((prev) => ({ ...prev, [d.name]: !prev[d.name] }))
          }
        >
          <span className="tp-dynasty-heading">
            <h3>{d.name}</h3>
            {d.materials ? (
              <span className="tp-materials">{d.materials}</span>
            ) : null}
          </span>
          <span className="tp-acc-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          id={panelId}
          className="tp-acc-panel"
          role="region"
          hidden={!isOpen}
        >
          <ul>
            {d.items.map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </div>
      </li>
    )
  }

  const left = dynasties
    .map((d, index) => ({ d, index }))
    .filter(({ index }) => index % 2 === 0)
  const right = dynasties
    .map((d, index) => ({ d, index }))
    .filter(({ index }) => index % 2 === 1)

  return (
    <div className="tp-dynasty-columns">
      <ul className="tp-dynasties tp-dynasty-accordion tp-dynasty-col">
        {left.map(({ d, index }) => renderItem(d, index))}
      </ul>
      <ul className="tp-dynasties tp-dynasty-accordion tp-dynasty-col">
        {right.map(({ d, index }) => renderItem(d, index))}
      </ul>
    </div>
  )
}

function TopicAccordion({
  items,
  idPrefix,
}: {
  items: { title: string; body: string; note?: string }[]
  idPrefix: string
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.title, false])),
  )

  const renderItem = (
    item: { title: string; body: string; note?: string },
    index: number,
  ) => {
    const isOpen = Boolean(open[item.title])
    const panelId = `${idPrefix}-panel-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

    return (
      <li
        key={item.title}
        className={isOpen ? 'is-open' : ''}
        style={{ order: index + 1 }}
      >
        <button
          type="button"
          className="tp-acc-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() =>
            setOpen((prev) => ({ ...prev, [item.title]: !prev[item.title] }))
          }
        >
          <h3>{item.title}</h3>
          <span className="tp-acc-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          id={panelId}
          className="tp-acc-panel"
          role="region"
          hidden={!isOpen}
        >
          <p>
            <RichText text={item.body} />
          </p>
          {item.note ? (
            <p className="tp-note">
              <RichText text={item.note} />
            </p>
          ) : null}
        </div>
      </li>
    )
  }

  const left = items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index % 2 === 0)
  const right = items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index % 2 === 1)

  return (
    <div className="tp-topic-columns">
      <ul className="tp-topic-list tp-topic-accordion tp-topic-col">
        {left.map(({ item, index }) => renderItem(item, index))}
      </ul>
      <ul className="tp-topic-list tp-topic-accordion tp-topic-col">
        {right.map(({ item, index }) => renderItem(item, index))}
      </ul>
    </div>
  )
}

function ContentAccordion({
  items,
  idPrefix,
}: {
  items: {
    title: string
    paragraphs: string[]
    bullets?: string[]
    pullQuote?: string
  }[]
  idPrefix: string
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.title, false])),
  )

  const renderItem = (
    item: {
      title: string
      paragraphs: string[]
      bullets?: string[]
      pullQuote?: string
    },
    index: number,
  ) => {
    const isOpen = Boolean(open[item.title])
    const panelId = `${idPrefix}-panel-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

    return (
      <li
        key={item.title}
        className={isOpen ? 'is-open' : ''}
        style={{ order: index + 1 }}
      >
        <button
          type="button"
          className="tp-acc-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() =>
            setOpen((prev) => ({ ...prev, [item.title]: !prev[item.title] }))
          }
        >
          <h3>{item.title}</h3>
          <span className="tp-acc-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          id={panelId}
          className="tp-acc-panel"
          role="region"
          hidden={!isOpen}
        >
          <div className="tp-prose">
            {item.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>
                <RichText text={p} />
              </p>
            ))}
          </div>
          {item.bullets ? (
            <ul className="tp-bullets">
              {item.bullets.map((bullet) => (
                <li key={bullet}>
                  <RichText text={bullet} />
                </li>
              ))}
            </ul>
          ) : null}
          {item.pullQuote ? (
            <blockquote className="tp-pull-quote">{item.pullQuote}</blockquote>
          ) : null}
        </div>
      </li>
    )
  }

  const left = items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index % 2 === 0)
  const right = items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index % 2 === 1)

  return (
    <div className="tp-topic-columns tp-content-columns">
      <ul className="tp-topic-list tp-topic-accordion tp-content-accordion tp-topic-col">
        {left.map(({ item, index }) => renderItem(item, index))}
      </ul>
      <ul className="tp-topic-list tp-topic-accordion tp-content-accordion tp-topic-col">
        {right.map(({ item, index }) => renderItem(item, index))}
      </ul>
    </div>
  )
}

export function TemplePage() {
  const mainRef = useRef<HTMLElement>(null)
  const [activePart, setActivePart] = useState<TemplePartId>('part1')
  const [panelKey, setPanelKey] = useState(0)
  const didMount = useRef(false)

  const switchPart = (part: TemplePartId) => {
    if (part === activePart) return
    setActivePart(part)
    setPanelKey((k) => k + 1)
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    if (activePart === 'part2') {
      // Land on Evolution at the top; wash highlights the whole Chapter 2 panel.
      const timer = window.setTimeout(() => {
        const panel = document.getElementById('temple-part-panel-part2')
        scrollToId(t.evolution.id, { flashEl: panel ?? undefined })
      }, 40)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activePart])

  useRevealOnScroll(mainRef, [activePart, panelKey])

  const contents = contentsForPart(activePart)
  const contentsStart = contentsStartNumber(activePart)

  return (
    <div id="top" className="page page-scroll page-temple-chapters">
      <Header />
      <main className="temple-main" ref={mainRef}>
        <section className="tp-hero tp-hero--split" aria-label={t.hero.title}>
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="tp-lead">
              <RichText text={t.hero.lead} />
            </p>
            <a className="tp-cta" href={t.hero.ctaHref}>
              {t.hero.cta}
            </a>
          </div>
          <div className="tp-hero-media" aria-hidden="true">
            <picture>
              <source
                media="(max-width: 859px)"
                srcSet={t.hero.imageMobile}
              />
              <img
                src={t.hero.image}
                alt=""
                width={1900}
                height={680}
              />
            </picture>
          </div>
        </section>

        <div
          key={panelKey}
          id={`temple-part-panel-${activePart}`}
          className={`tp-part-panel tp-part-panel--${activePart}`}
          role="tabpanel"
          aria-labelledby={`temple-part-tab-${activePart}`}
        >
          {activePart === 'part1' ? (
            <>
        <section className="tp-section tp-intro" id={t.intro.id}>
          <div className="tp-section-inner">
            <div className="tp-intro-head" data-hi-reveal>
              <p className="tp-eyebrow">{t.intro.eyebrow}</p>
              <h2>{t.intro.title}</h2>
              <p className="tp-section-lead">
                <RichText text={t.intro.lead} />
              </p>
            </div>
            <div data-hi-reveal>
              <IntroAccordion blocks={t.intro.blocks} />
            </div>
          </div>
        </section>

        <section className="tp-section" id={t.designInfluence.id}>
          <div className="tp-section-inner">
            <header data-hi-reveal>
              <p className="tp-eyebrow">{t.designInfluence.eyebrow}</p>
              <h2>{t.designInfluence.title}</h2>
              <p className="tp-section-lead">
                <RichText text={t.designInfluence.lead} />
              </p>
            </header>

            <ul className="tp-highlights" aria-label="Key facts" data-hi-reveal>
              {t.designInfluence.highlights.map((item) => (
                <li key={item.label}>
                  <span className="tp-highlight-label">{item.label}</span>
                  <span className="tp-highlight-value">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="tp-design-columns">
              <DesignSubBlock item={t.designInfluence.sections[0]} />
              <DesignSubBlock item={t.designInfluence.sections[1]} />
              <DesignSubBlock item={t.designInfluence.sections[2]} />
              <DesignSubBlock item={t.designInfluence.kailashFacts} />
            </div>

            <div data-hi-reveal>
              <p className="tp-influences-lead">{t.designInfluence.influencesLead}</p>
              <ul className="tp-gallery" aria-label="Design influences">
                {t.designInfluence.influences.map((item) => (
                  <li key={item.label}>
                    <span className="tp-gallery-label">{item.label}</span>
                    <span className="tp-gallery-detail">
                      <RichText text={item.detail} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="tp-section tp-section-alt" id={t.planning.id}>
          <div className="tp-section-inner">
            <div className="tp-planning-head" data-hi-reveal>
              <div className="tp-planning-head-copy">
                <p className="tp-eyebrow">{t.planning.eyebrow}</p>
                <h2>{t.planning.title}</h2>
                <p className="tp-section-lead">
                  <RichText text={t.planning.lead} />
                </p>
              </div>
              <ul className="tp-highlights" aria-label="Key construction facts">
                {t.planning.highlights.map((item) => (
                  <li key={item.label}>
                    <span className="tp-highlight-label">{item.label}</span>
                    <span className="tp-highlight-value">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tp-subsections">
              <article className="tp-subsection tp-subsection-with-media" data-hi-reveal>
                <div className="tp-subsection-copy">
                  <h3>{t.planning.site.title}</h3>
                  <div className="tp-prose">
                    {t.planning.site.paragraphs.map((p) => (
                      <p key={p.slice(0, 48)}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                  <ul className="tp-bullets">
                    {t.planning.site.bullets.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
                <Figure image={t.planning.site.image} className="tp-subsection-figure" />
              </article>

              <article className="tp-subsection" data-hi-reveal>
                <div className="tp-subsection-copy">
                  <h3>{t.planning.architects.title}</h3>
                  <div className="tp-prose">
                    {t.planning.architects.paragraphs.map((p) => (
                      <p key={p.slice(0, 48)}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                  <ul className="tp-bullets">
                    {t.planning.architects.bullets.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                  <blockquote className="tp-pull-quote">{t.planning.architects.pullQuote}</blockquote>
                </div>
              </article>

              <article className="tp-subsection tp-subsection-with-media" data-hi-reveal>
                <div className="tp-subsection-main">
                  <div className="tp-subsection-copy">
                    <h3>{t.planning.timeline.title}</h3>
                    <div className="tp-prose">
                      {t.planning.timeline.paragraphs.map((p) => (
                        <p key={p.slice(0, 48)}>
                          <RichText text={p} />
                        </p>
                      ))}
                    </div>
                  </div>
                  <blockquote className="tp-pull-quote">{t.planning.timeline.pullQuote}</blockquote>
                </div>
                <Figure image={t.planning.timeline.image} className="tp-subsection-figure" />
              </article>

              <article className="tp-subsection" data-hi-reveal>
                <div className="tp-subsection-copy">
                  <h3>{t.planning.workforce.title}</h3>
                  <div className="tp-prose">
                    {t.planning.workforce.paragraphs.map((p) => (
                      <p key={p.slice(0, 48)}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                  <ul className="tp-bullets">
                    {t.planning.workforce.bullets.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="tp-subsection tp-subsection-with-media" data-hi-reveal>
                <div className="tp-subsection-main">
                  <div className="tp-subsection-copy">
                    <h3>{t.planning.materials.title}</h3>
                    <div className="tp-prose">
                      {t.planning.materials.paragraphs.map((p) => (
                        <p key={p.slice(0, 48)}>
                          <RichText text={p} />
                        </p>
                      ))}
                    </div>
                    <ul className="tp-highlights tp-highlights-inline" aria-label="Granite facts">
                      {t.planning.materials.highlights.map((item) => (
                        <li key={item.label}>
                          <span className="tp-highlight-label">{item.label}</span>
                          <span className="tp-highlight-value">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <blockquote className="tp-pull-quote">{t.planning.materials.pullQuote}</blockquote>
                </div>
                <Figure image={t.planning.materials.image} className="tp-subsection-figure" />
              </article>

              <article className="tp-subsection" data-hi-reveal>
                <div className="tp-subsection-copy">
                  <h3>{t.planning.funding.title}</h3>
                  <div className="tp-prose">
                    {t.planning.funding.paragraphs.map((p) => (
                      <p key={p.slice(0, 48)}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                  <ul className="tp-bullets">
                    {t.planning.funding.bullets.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                  <blockquote className="tp-pull-quote">{t.planning.funding.pullQuote}</blockquote>
                </div>
              </article>
            </div>

            <div className="tp-features-block">
              <h2 className="tp-features-lead" data-hi-reveal>
                {t.planning.featuresLead}
              </h2>
              <ul className="tp-features">
                {t.planning.features.map((feat) => {
                  const imageLayout =
                    feat.image &&
                    (feat.title === 'Height, Stability and Foundation' ||
                      feat.title === 'Huge Shiva Lingam')
                      ? 'image-right'
                      : feat.image
                        ? 'image-below'
                        : null
                  const stat = (
                    <div className="tp-feature-stat">
                      <span className="tp-stat">{feat.stat}</span>
                      <span className="tp-stat-label">{feat.statLabel}</span>
                    </div>
                  )
                  const text = (
                    <div className="tp-feature-text">
                      <h3>{feat.title}</h3>
                      <p>
                        <RichText text={feat.body} />
                      </p>
                    </div>
                  )
                  const figure = feat.image ? (
                    <Figure
                      image={{
                        src: feat.image.src,
                        alt: feat.image.alt,
                        caption: feat.image.caption ?? feat.title,
                      }}
                      className={`tp-feature-figure${
                        feat.title === 'Huge Shiva Lingam'
                          ? ' tp-feature-figure--portrait'
                          : feat.title === 'Precise Alignment'
                            ? ' tp-feature-figure--diagram'
                            : ''
                      }`}
                    />
                  ) : null

                  return (
                    <li key={feat.title} data-hi-reveal>
                      {imageLayout === 'image-right' ? (
                        <div className="tp-feature-body tp-feature-body--image-right">
                          <div className="tp-feature-copy">
                            {stat}
                            {text}
                          </div>
                          {figure}
                        </div>
                      ) : (
                        <>
                          {stat}
                          <div
                            className={`tp-feature-body${
                              imageLayout === 'image-below'
                                ? ' tp-feature-body--image-below'
                                : ''
                            }`}
                          >
                            {text}
                            {figure}
                          </div>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className="tp-section" id={t.living.id}>
          <div className="tp-section-inner tp-living">
            <div className="tp-living-layout" data-hi-reveal>
              <div className="tp-living-head">
                <p className="tp-eyebrow">{t.living.eyebrow}</p>
                <h2>{t.living.title}</h2>
              </div>
              <div className="tp-prose tp-living-prose">
                {t.living.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

              <section
                className="tp-section tp-section-alt tp-chapter-bridge"
                id={t.bridge.id}
                aria-labelledby="tp-bridge-title"
              >
                <div className="tp-section-inner tp-chapter-bridge-inner" data-hi-reveal>
                  <p className="tp-eyebrow">{t.bridge.eyebrow}</p>
                  <h2 id="tp-bridge-title">
                    Centuries of
                    <br className="tp-chapter-bridge-break" />
                    {' '}
                    care and change
                  </h2>
                  <p className="tp-section-lead">
                    From later dynasties to restoration, conservation, and the
                    people who defended this heritage:
                    <br className="tp-chapter-bridge-lead-break" />
                    {' '}
                    the next chapter follows the temple through time.
                  </p>
                  <button
                    type="button"
                    className="tp-cta tp-chapter-cta"
                    onClick={() => switchPart('part2')}
                  >
                    {t.bridge.cta}
                  </button>
                </div>
              </section>
            </>
          ) : (
            <>
        <section className="tp-section tp-section-alt" id={t.evolution.id}>
          <div className="tp-section-inner">
            <header data-hi-reveal>
              <p className="tp-eyebrow">{t.evolution.eyebrow}</p>
              <h2>{t.evolution.title}</h2>
              <p className="tp-section-lead">
                <RichText text={t.evolution.lead} />
              </p>
            </header>
            <div data-hi-reveal>
              <DynastyAccordion dynasties={t.evolution.dynasties} />
            </div>
          </div>
        </section>

        <section className="tp-section" id={t.repair.id}>
          <div className="tp-section-inner">
            <header data-hi-reveal>
              <p className="tp-eyebrow">{t.repair.eyebrow}</p>
              <h2>{t.repair.title}</h2>
              <p className="tp-section-lead">
                <RichText text={t.repair.lead} />
              </p>
            </header>
            <div data-hi-reveal>
              <TopicAccordion items={t.repair.items} idPrefix="repair" />
            </div>
          </div>
        </section>

        <section className="tp-section tp-section-alt" id={t.conservation.id}>
          <div className="tp-section-inner">
            <header data-hi-reveal>
              <p className="tp-eyebrow">{t.conservation.eyebrow}</p>
              <h2>{t.conservation.title}</h2>
              <p className="tp-section-lead">
                <RichText text={t.conservation.lead} />
              </p>
            </header>

            <ul className="tp-highlights" aria-label="Key conservation facts" data-hi-reveal>
              {t.conservation.highlights.map((item) => (
                <li key={item.label}>
                  <span className="tp-highlight-label">{item.label}</span>
                  <span className="tp-highlight-value">{item.value}</span>
                </li>
              ))}
            </ul>

            <div data-hi-reveal>
              <ContentAccordion
                items={t.conservation.sections}
                idPrefix="conservation"
              />
            </div>
          </div>
        </section>

        <section className="tp-section" id={t.looting.id}>
          <div className="tp-section-inner">
            <header data-hi-reveal>
              <p className="tp-eyebrow">{t.looting.eyebrow}</p>
              <h2>{t.looting.title}</h2>
              <p className="tp-section-lead">
                <RichText text={t.looting.lead} />
              </p>
            </header>
            <ul className="tp-topic-list tp-topic-grid">
              {t.looting.items.map((item) => (
                <li key={item.title} data-hi-reveal>
                  <h3>{item.title}</h3>
                  <p>
                    <RichText text={item.body} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="tp-section tp-section-alt" id={t.kamakshi.id}>
          <div className="tp-section-inner tp-kamakshi">
            <div className="tp-kamakshi-layout">
              <div className="tp-kamakshi-copy" data-hi-reveal>
                <p className="tp-eyebrow">{t.kamakshi.eyebrow}</p>
                <h2>{t.kamakshi.title}</h2>
                <p className="tp-section-lead">
                  <RichText text={t.kamakshi.lead} />
                </p>
                <ContentAccordion
                  items={t.kamakshi.sections}
                  idPrefix="kamakshi"
                />
              </div>

              <Figure image={t.kamakshi.image} className="tp-figure-portrait" />
            </div>
          </div>
        </section>

        <section className="tp-closing" id={t.continue.id} aria-labelledby="tp-continue-title">
          <div className="tp-section-inner tp-closing-inner" data-hi-reveal>
            <p className="tp-eyebrow">{t.continue.eyebrow}</p>
            <h2 id="tp-continue-title">{t.continue.title}</h2>
            <p className="tp-lead">
              <RichText text={t.continue.lead} />
            </p>
          </div>

          <ContinueRail cards={continueCards} />
        </section>
            </>
          )}
        </div>
      </main>
      <Footer variant="full" />
      <div className="tp-chapter-chrome">
        <div className="tp-chapter-chrome-dock">
          <TemplePartDock activePart={activePart} onChange={switchPart} />
        </div>
        <div className="tp-chapter-chrome-contents">
          <TempleContents
            key={activePart}
            items={contents}
            startNumber={contentsStart}
            iconOnly
            docked
          />
        </div>
      </div>
      <CoachMarkTour
        key="temple-chapters-tour"
        steps={templeChaptersTourSteps}
        showSkipBack
      />
    </div>
  )
}

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ContinueRail } from '../components/ContinueRail'
import { TempleContents } from '../components/TempleContents'
import { TemplePartDock } from '../components/TemplePartDock'
import { SectionFigure } from '../components/SectionFigure'
import { sections } from '../data/home'
import {
  historyPage as h,
  historyContentsForPart,
  historyPartDockOptions,
  type HistoryBlock,
  type HistoryMedia,
  type HistoryPartId,
  type HistoryTimelineEra,
} from '../data/history'
import { scrollToId } from '../utils/scrollToId'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

const continueCards = sections.filter((section) => section.id !== 'history')
const cholaTimelineTopics = h.chola.topics.filter((topic) => Boolean(topic.year))
const cholaLegacyTopics = h.chola.topics.filter((topic) => !topic.year)

const rajarajaTimelineIds = ['birth', 'throne', 'empire', 'final'] as const
const rajarajaLegacyIds = ['temple', 'arts-faith', 'welfare', 'family'] as const
const rajarajaTimelineTopics = rajarajaTimelineIds
  .map((id) => h.rajaraja.topics.find((topic) => topic.id === id))
  .filter((topic): topic is (typeof h.rajaraja.topics)[number] => Boolean(topic))
const rajarajaLegacyTopics = rajarajaLegacyIds
  .map((id) => h.rajaraja.topics.find((topic) => topic.id === id))
  .filter((topic): topic is (typeof h.rajaraja.topics)[number] => Boolean(topic))

type ChapterTopic =
  | (typeof h.chola.topics)[number]
  | (typeof h.rajaraja.topics)[number]

function renderTimelineTopic(
  topic: ChapterTopic,
  options: { showMark?: boolean; isRailEnd?: boolean } = {},
) {
  const hasMedia = Boolean(topic.media && topic.media.kind === 'image')
  const { showMark = false, isRailEnd = false } = options

  return (
    <article
      key={topic.id}
      id={topic.id}
      className={[
        'hi-topic',
        hasMedia ? 'has-media' : 'is-split-copy',
        showMark && isRailEnd ? 'is-rail-end' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-hi-reveal
    >
      <div className="hi-topic-copy">
        {topic.year ? (
          <p className="hi-topic-year">
            {showMark ? <span className="hi-topic-mark" aria-hidden="true" /> : null}
            {topic.year}
          </p>
        ) : null}
        <h3>{topic.title}</h3>
        <Blocks blocks={topic.blocks} split={!hasMedia} />
        {'note' in topic && topic.note ? (
          <p className="hi-reign-note">
            <RichText text={topic.note} />
          </p>
        ) : null}
      </div>
      {hasMedia && topic.media ? (
        <MediaSlot media={topic.media} className="hi-topic-media" />
      ) : null}
    </article>
  )
}

/** Compact column cell — text then image in the same column. */
function renderLegacyTopic(topic: ChapterTopic, order?: number) {
  const hasImage = Boolean(topic.media && topic.media.kind === 'image')

  return (
    <article
      key={topic.id}
      id={topic.id}
      className={['hi-topic', 'hi-topic--legacy', hasImage ? 'has-media' : '']
        .filter(Boolean)
        .join(' ')}
      style={order != null ? { order } : undefined}
      data-hi-reveal
    >
      <div className="hi-topic-copy">
        <h3>{topic.title}</h3>
        <Blocks blocks={topic.blocks} />
      </div>
      {hasImage && topic.media ? (
        <MediaSlot media={topic.media} className="hi-topic-media hi-topic-media--legacy" />
      ) : null}
    </article>
  )
}

/** Two real columns so tall left cells (e.g. images) don’t stretch right-column gaps. */
function LegacyTopicGrid({ topics }: { topics: ChapterTopic[] }) {
  if (!topics.length) return null

  const left = topics.filter((_, index) => index % 2 === 0)
  const right = topics.filter((_, index) => index % 2 === 1)

  return (
    <div className="hi-topic-stack hi-topic-stack--legacy">
      <div className="hi-legacy-col hi-legacy-col--left">
        {left.map((topic, index) => renderLegacyTopic(topic, index * 2))}
      </div>
      {right.length ? (
        <div className="hi-legacy-col hi-legacy-col--right">
          {right.map((topic, index) => renderLegacyTopic(topic, index * 2 + 1))}
        </div>
      ) : null}
    </div>
  )
}

/** Renders text with selective **bold** markers. */
function RichText({ text }: { text: string }): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function Blocks({ blocks, split = false }: { blocks: HistoryBlock[]; split?: boolean }) {
  if (!blocks.length) return null

  const bodyOnlySplit =
    split &&
    blocks.length >= 2 &&
    blocks.every((block) => Boolean(block.body) && !block.paragraphs?.length)

  if (bodyOnlySplit) {
    return (
      <div className="hi-blocks hi-chola-split-group">
        {Array.from({ length: Math.ceil(blocks.length / 2) }, (_, rowIndex) => {
          const left = blocks[rowIndex * 2]
          const right = blocks[rowIndex * 2 + 1]
          return (
            <div
              key={`${left.body!.slice(0, 24)}-${rowIndex}`}
              className={['hi-chola-split', right ? '' : 'hi-chola-split--solo']
                .filter(Boolean)
                .join(' ')}
            >
              <div className="hi-chola-split-col">
                {left.heading ? <h4 className="hi-block-heading">{left.heading}</h4> : null}
                <p>
                  <RichText text={left.body!} />
                </p>
              </div>
              {right ? (
                <div className="hi-chola-split-col">
                  {right.heading ? (
                    <h4 className="hi-block-heading">{right.heading}</h4>
                  ) : null}
                  <p>
                    <RichText text={right.body!} />
                  </p>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="hi-blocks">
      {blocks.map((block) => (
        <div key={`${block.heading ?? ''}-${(block.body ?? block.paragraphs?.[0] ?? '').slice(0, 36)}`} className="hi-block">
          {block.heading ? <h4 className="hi-block-heading">{block.heading}</h4> : null}
          {block.paragraphs?.length ? (
            split ? (
              <div className="hi-chola-split-group">
                {Array.from(
                  { length: Math.ceil(block.paragraphs.length / 2) },
                  (_, rowIndex) => {
                    const left = block.paragraphs![rowIndex * 2]
                    const right = block.paragraphs![rowIndex * 2 + 1]
                    return (
                      <div
                        key={`${left.slice(0, 24)}-${rowIndex}`}
                        className={[
                          'hi-chola-split',
                          right ? '' : 'hi-chola-split--solo',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <div className="hi-chola-split-col">
                          <p>
                            <RichText text={left} />
                          </p>
                        </div>
                        {right ? (
                          <div className="hi-chola-split-col">
                            <p>
                              <RichText text={right} />
                            </p>
                          </div>
                        ) : null}
                      </div>
                    )
                  },
                )}
              </div>
            ) : (
              <div className="hi-block-prose">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
            )
          ) : block.body ? (
            <p>
              <RichText text={block.body} />
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function NoteModal({
  open,
  onClose,
  title,
  body,
}: {
  open: boolean
  onClose: () => void
  title: string
  body: string
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = 'hi-dynasty-note-title'

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
        className="ex-modal-dialog hi-note-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="ex-modal-chrome">
          <h2 id={titleId} className="ex-modal-title">
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
        <div className="ex-modal-body">
          <p className="hi-era-footnote">
            <RichText text={body} />
          </p>
        </div>
      </div>
    </div>
  )
}

function TimelineEra({
  era,
  index,
  noteCta,
  onNoteCta,
}: {
  era: HistoryTimelineEra & {
    noteMark?: string
    isCholaPeriods?: boolean
    periods?: { id: string; body: string }[]
    href?: string
    linkLabel?: string
  }
  index: number
  noteCta?: string
  onNoteCta?: () => void
}) {
  const textLeft = era.side === 'text-left'
  const isPeriods = Boolean(era.isCholaPeriods)
  const noteMark = era.noteMark
  /**
   * Tall-flag eras: vertically center media with a spine+text pair so the
   * journey dot stays locked to the reign line.
   */
  const centerPair =
    era.id === 'pandyas' || era.id === 'cheras' || era.id === 'cholas-era'

  const noteCtaButton =
    noteCta && onNoteCta ? (
      <button
        type="button"
        className="hi-era-note-cta"
        aria-haspopup="dialog"
        onClick={onNoteCta}
      >
        {noteCta}
      </button>
    ) : null

  const text = (
    <div className="hi-era-text">
      <div className="hi-era-copy">
        <header className="hi-era-meta">
          <p className="hi-era-reign">{era.reign}</p>
          <h3>
            {era.name}
            {noteMark ? (
              onNoteCta ? (
                <button
                  type="button"
                  className="hi-era-note-mark hi-era-note-mark--btn"
                  aria-label={`Note ${noteMark}: ${noteCta ?? 'Open note'}`}
                  aria-haspopup="dialog"
                  onClick={onNoteCta}
                >
                  {noteMark}
                </button>
              ) : (
                <sup className="hi-era-note-mark" aria-label={`Note ${noteMark}`}>
                  {noteMark}
                </sup>
              )
            ) : null}
          </h3>
        </header>

        {isPeriods && era.periods ? (
          <div className="hi-periods">
            <ol className="hi-period-list">
              {era.periods.map((period) => (
                <li key={period.id} className="hi-period" id={period.id}>
                  <h4>
                    <RichText text={period.body} />
                  </h4>
                </li>
              ))}
            </ol>
            {era.href ? (
              <a
                className="tp-cta hi-era-cta"
                href={era.href}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToId(era.href!)
                }}
              >
                {era.linkLabel}
              </a>
            ) : null}
            {noteCtaButton}
          </div>
        ) : (
          <>
            <Blocks blocks={era.blocks} />
            {noteCtaButton}
          </>
        )}
      </div>
    </div>
  )

  const media = era.media ? (
    <MediaSlot media={era.media} className="hi-era-media" />
  ) : null

  const spine = (
    <div className="hi-era-spine" aria-hidden="true">
      <span className="hi-era-dot" />
    </div>
  )

  return (
    <li
      id={era.id}
      className={[
        'hi-era',
        textLeft ? 'is-text-left' : 'is-text-right',
        isPeriods ? 'is-chola-periods' : '',
        !era.media ? 'is-copy-only' : '',
        centerPair ? 'is-center-pair' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-hi-reveal
      style={{ ['--hi-delay' as string]: `${Math.min(index, 4) * 40}ms` }}
    >
      {centerPair ? (
        textLeft ? (
          <>
            <div className="hi-era-pair">
              <div className="hi-era-side hi-era-side--start">{text}</div>
              {spine}
            </div>
            <div className="hi-era-side hi-era-side--end">{media}</div>
          </>
        ) : (
          <>
            <div className="hi-era-side hi-era-side--start">{media}</div>
            <div className="hi-era-pair">
              {spine}
              <div className="hi-era-side hi-era-side--end">{text}</div>
            </div>
          </>
        )
      ) : (
        <>
          <div className="hi-era-side hi-era-side--start">
            {textLeft ? text : media}
          </div>
          {spine}
          <div className="hi-era-side hi-era-side--end">
            {textLeft ? media : text}
          </div>
        </>
      )}
    </li>
  )
}

function MediaSlot({
  media,
  className = '',
}: {
  media: HistoryMedia
  className?: string
}) {
  if (media.kind === 'placeholder') {
    return (
      <div
        className={`hi-placeholder hi-placeholder--${media.aspect ?? 'portrait'} ${className}`.trim()}
        role="img"
        aria-label={`Image placeholder: ${media.label}`}
      >
        <span className="hi-placeholder-kicker">Image placeholder</span>
        <span className="hi-placeholder-label">{media.label}</span>
      </div>
    )
  }

  return (
    <SectionFigure
      image={{
        src: media.src,
        alt: media.alt,
        title: media.title,
        caption: media.caption,
        credit: media.credit,
      }}
      className={className}
    />
  )
}

/** Subtle scroll-in for storytelling beats — matches site ease, respects reduced motion. */
function useRevealOnScroll(rootRef: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = root.querySelectorAll<HTMLElement>('[data-hi-reveal]')
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
  }, [rootRef, ...deps])
}

export function HistoryPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [activePart, setActivePart] = useState<HistoryPartId>('part1')
  const [panelKey, setPanelKey] = useState(0)
  const [dynastyNoteOpen, setDynastyNoteOpen] = useState(false)
  const didMount = useRef(false)

  useRevealOnScroll(mainRef, [activePart, panelKey])

  const switchPart = (part: HistoryPartId) => {
    if (part === activePart) return
    setActivePart(part)
    setPanelKey((key) => key + 1)
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    if (activePart === 'part2') {
      // Wait for the part panel to mount, then land on Chapter 02 content (not the hero).
      const timer = window.setTimeout(() => {
        scrollToId(h.rajaraja.id)
      }, 40)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activePart])

  const goToHash = (href: string) => {
    scrollToId(href)
  }

  const contentsStages = historyContentsForPart(activePart)

  return (
    <div id="top" className="page page-scroll page-history-chapters">
      <Header />
      <main className="temple-main history-main" ref={mainRef}>
        <section className="tp-hero tp-hero--split" aria-label={h.hero.title}>
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">{h.hero.eyebrow}</p>
            <h1>{h.hero.title}</h1>
            <p className="tp-lead">
              <RichText text={h.hero.lead} />
            </p>
            <a
              className="tp-cta"
              href={h.hero.ctaHref}
              onClick={(event) => {
                event.preventDefault()
                if (activePart !== 'part1') {
                  switchPart('part1')
                  window.setTimeout(() => goToHash(h.hero.ctaHref), 320)
                  return
                }
                goToHash(h.hero.ctaHref)
              }}
            >
              {h.hero.cta}
            </a>
          </div>
          <div className="tp-hero-media" aria-hidden="true">
            <img src={h.hero.image} alt="" width={1400} height={933} />
          </div>
        </section>

        <div
          key={panelKey}
          id={`history-part-panel-${activePart}`}
          className={`tp-part-panel tp-part-panel--${activePart}`}
          role="tabpanel"
          aria-labelledby={`history-part-tab-${activePart}`}
        >
          {activePart === 'part1' ? (
            <>
              <section className="tp-section hi-prologue" id={h.prologue.id}>
                <div className="tp-section-inner">
                  <div className="hi-prologue-layout">
                    <div className="hi-prologue-main">
                      <header className="hi-section-head" data-hi-reveal>
                        <p className="tp-eyebrow">{h.prologue.eyebrow}</p>
                        <h2>{h.prologue.title}</h2>
                      </header>
                      <div className="tp-prose" data-hi-reveal>
                        {h.prologue.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>
                            <RichText text={paragraph} />
                          </p>
                        ))}
                      </div>
                    </div>
                    {h.prologue.highlights?.length || h.prologue.note ? (
                      <aside className="hi-prologue-aside" data-hi-reveal>
                        {h.prologue.highlights?.length ? (
                          <ul
                            className="tp-highlights hi-prologue-highlights"
                            aria-label="Key historical facts"
                          >
                            {h.prologue.highlights.map((item) => (
                              <li key={item.label}>
                                <span className="tp-highlight-label">{item.label}</span>
                                <span className="tp-highlight-value">{item.value}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {h.prologue.note ? (
                          <p className="tp-note hi-prologue-note">
                            <RichText text={h.prologue.note} />
                          </p>
                        ) : null}
                      </aside>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="tp-section tp-section-alt" id={h.dynasties.id}>
                <div className="tp-section-inner">
                  <header className="hi-section-head" data-hi-reveal>
                    <p className="tp-eyebrow">{h.dynasties.eyebrow}</p>
                    <h2>{h.dynasties.title}</h2>
                    <p className="tp-section-lead">
                      <RichText text={h.dynasties.lead} />
                    </p>
                  </header>

                  <ol className="hi-timeline" aria-label="Dynasties of influence">
                    {h.dynasties.eras.map((era, index) => (
                      <TimelineEra
                        key={era.id}
                        era={era}
                        index={index}
                        noteCta={
                          era.id === 'cholas-era'
                            ? h.dynasties.footnoteCta
                            : undefined
                        }
                        onNoteCta={
                          era.id === 'cholas-era'
                            ? () => setDynastyNoteOpen(true)
                            : undefined
                        }
                      />
                    ))}
                  </ol>
                </div>
              </section>

              <section className="tp-section hi-chapter" id={h.chola.id}>
                <div className="tp-section-inner">
                  <header className="hi-chapter-head" data-hi-reveal>
                    <p className="tp-eyebrow">{h.chola.eyebrow}</p>
                    <h2 className="hi-chapter-label" aria-hidden="true">
                      {h.chola.chapterLabel}
                    </h2>
                    <div className="hi-chapter-heading">
                      <h2>{h.chola.title}</h2>
                    </div>
                  </header>

                  <div className="hi-topic-stack hi-topic-stack--rail">
                    {cholaTimelineTopics.map((topic, index) =>
                      renderTimelineTopic(topic, {
                        showMark: true,
                        isRailEnd: index === cholaTimelineTopics.length - 1,
                      }),
                    )}
                  </div>

                  {cholaLegacyTopics.length ? (
                    <div
                      className="hi-legacy-block"
                      id={h.chola.accomplishments.id}
                    >
                      <header className="hi-legacy-head" data-hi-reveal>
                        <h3>{h.chola.accomplishments.title}</h3>
                      </header>
                      <LegacyTopicGrid topics={cholaLegacyTopics} />
                    </div>
                  ) : null}
                </div>
              </section>

              <section
                className="tp-section tp-section-alt tp-chapter-bridge"
                id={h.bridge.id}
                aria-labelledby="hi-bridge-title"
              >
                <div className="tp-section-inner tp-chapter-bridge-inner">
                  <p className="tp-eyebrow">{h.bridge.eyebrow}</p>
                  <h2 id="hi-bridge-title">{h.bridge.title}</h2>
                  <p className="tp-section-lead">
                    <RichText text={h.bridge.lead} />
                  </p>
                  <button
                    type="button"
                    className="tp-cta tp-chapter-cta"
                    onClick={() => switchPart('part2')}
                  >
                    {h.bridge.cta}
                  </button>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="tp-section tp-section-alt hi-chapter" id={h.rajaraja.id}>
                <div className="tp-section-inner">
                  <header className="hi-chapter-head" data-hi-reveal>
                    <p className="tp-eyebrow">{h.rajaraja.eyebrow}</p>
                    <h2 className="hi-chapter-label" aria-hidden="true">
                      {h.rajaraja.chapterLabel}
                    </h2>
                    <div className="hi-chapter-heading">
                      <h2>{h.rajaraja.title}</h2>
                      <p className="tp-section-lead">
                        <RichText text={h.rajaraja.lead} />
                      </p>
                    </div>
                  </header>

                  <div className="hi-topic-stack hi-topic-stack--rail">
                    {rajarajaTimelineTopics.map((topic, index) =>
                      renderTimelineTopic(topic, {
                        showMark: true,
                        isRailEnd: index === rajarajaTimelineTopics.length - 1,
                      }),
                    )}
                  </div>

                  {rajarajaLegacyTopics.length ? (
                    <div
                      className="hi-legacy-block"
                      id={h.rajaraja.accomplishments.id}
                    >
                      <header className="hi-legacy-head" data-hi-reveal>
                        <h3>{h.rajaraja.accomplishments.title}</h3>
                      </header>
                      <LegacyTopicGrid topics={rajarajaLegacyTopics} />
                    </div>
                  ) : null}
                </div>
              </section>

              <section
                className="tp-closing"
                id={h.continue.id}
                aria-labelledby="hi-continue-title"
              >
                <div className="tp-section-inner tp-closing-inner">
                  <p className="tp-eyebrow">{h.continue.eyebrow}</p>
                  <h2 id="hi-continue-title">{h.continue.title}</h2>
                  <p className="tp-lead">
                    <RichText text={h.continue.lead} />
                  </p>
                </div>

                                <ContinueRail cards={continueCards} />
              </section>
            </>
          )}
        </div>
      </main>
      <Footer variant="full" />
      <NoteModal
        open={dynastyNoteOpen}
        onClose={() => setDynastyNoteOpen(false)}
        title={h.dynasties.footnoteTitle}
        body={h.dynasties.footnote}
      />
      <div className="tp-chapter-chrome">
        <div className="tp-chapter-chrome-dock">
          <TemplePartDock
            activePart={activePart}
            onChange={switchPart}
            parts={historyPartDockOptions}
            ariaLabel="History chapters"
            idPrefix="history-part"
          />
        </div>
        <div className="tp-chapter-chrome-contents">
          <TempleContents
            key={activePart}
            stages={contentsStages}
            iconOnly
            docked
          />
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ContinueRail } from '../components/ContinueRail'
import { TempleContents } from '../components/TempleContents'
import { SectionFigure } from '../components/SectionFigure'
import { sections } from '../data/home'
import { worshipPage as w, type WorshipImage } from '../data/worship'
import { scrollToId } from '../utils/scrollToId'

const continueCards = sections.filter((section) => section.id !== 'worship')

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

type AccordionSection = {
  id: string
  title: string
  period?: string
  paragraphs: string[]
}

function WorshipAccordion({
  sections,
  idPrefix,
  className = '',
  singleOpen = false,
  duoThenFull = false,
}: {
  sections: AccordionSection[]
  idPrefix: string
  className?: string
  singleOpen?: boolean
  /** Desktop: first two in independent columns; remaining full width */
  duoThenFull?: boolean
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((section) => [section.id, false])),
  )
  const [duoActive, setDuoActive] = useState(false)

  useEffect(() => {
    if (!duoThenFull) {
      setDuoActive(false)
      return
    }
    const mq = window.matchMedia('(min-width: 860px)')
    const sync = () => setDuoActive(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [duoThenFull])

  const toggleSection = (id: string) => {
    setOpen((prev) => {
      const nextOpen = !prev[id]
      if (!singleOpen) return { ...prev, [id]: nextOpen }
      return Object.fromEntries(sections.map((section) => [section.id, section.id === id ? nextOpen : false]))
    })
  }

  const renderSection = (section: AccordionSection) => {
    const panelId = `${idPrefix}-${section.id}-panel`
    const headerId = `${idPrefix}-${section.id}-header`
    const isOpen = Boolean(open[section.id])

    return (
      <li
        key={section.id}
        id={section.id}
        className={isOpen ? 'is-open' : undefined}
      >
        <button
          type="button"
          id={headerId}
          className="tp-acc-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggleSection(section.id)}
        >
          <h3>{section.title}</h3>
          <span className="tp-acc-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          id={panelId}
          className="tp-acc-panel"
          role="region"
          aria-labelledby={headerId}
          hidden={!isOpen}
        >
          {section.period ? <p className="wf-festival-period">{section.period}</p> : null}
          <div className="tp-prose">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </li>
    )
  }

  const listClass = `tp-topic-list tp-topic-accordion art-prose-acc wf-acc${className ? ` ${className}` : ''}`.trim()

  if (duoActive && sections.length >= 2) {
    const pair = sections.slice(0, 2)
    const rest = sections.slice(2)
    return (
      <div className="wf-acc-duo-wrap">
        <div className="wf-acc-duo" role="presentation">
          <ul className={listClass} aria-label="Section contents, column 1">
            {renderSection(pair[0])}
          </ul>
          <ul className={listClass} aria-label="Section contents, column 2">
            {renderSection(pair[1])}
          </ul>
        </div>
        {rest.length ? (
          <ul className={listClass} aria-label="Section contents">
            {rest.map(renderSection)}
          </ul>
        ) : null}
      </div>
    )
  }

  return (
    <ul className={listClass} aria-label="Section contents">
      {sections.map(renderSection)}
    </ul>
  )
}

function Figure({ image, className = '' }: { image: WorshipImage; className?: string }) {
  return <SectionFigure image={image} className={className} />
}

function useRevealOnScroll(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = root.querySelectorAll<HTMLElement>('[data-wf-reveal]')
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

export function WorshipPage() {
  const mainRef = useRef<HTMLElement>(null)
  useRevealOnScroll(mainRef)

  const goToHash = (href: string) => {
    scrollToId(href)
  }

  return (
    <div id="top" className="page page-scroll page-worship">
      <Header />
      <main className="temple-main worship-main" ref={mainRef}>
        <section className="tp-hero tp-hero--split" aria-label={w.hero.title}>
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">{w.hero.eyebrow}</p>
            <h1>{w.hero.title}</h1>
            <p className="tp-lead">
              <RichText text={w.hero.lead} />
            </p>
            <a
              className="tp-cta"
              href={w.hero.ctaHref}
              onClick={(event) => {
                event.preventDefault()
                goToHash(w.hero.ctaHref)
              }}
            >
              {w.hero.cta}
            </a>
          </div>
          <div className="tp-hero-media" aria-hidden="true">
            <img src={w.hero.image} alt="" width={1200} height={600} />
          </div>
        </section>

        <section
          className="tp-section"
          id={w.daily.id}
          data-nav-flash="section"
        >
          <div className="tp-section-inner">
            <header className="hi-chapter-head" data-wf-reveal>
              <p className="tp-eyebrow">{w.daily.eyebrow}</p>
              <h2 className="hi-chapter-label" aria-hidden="true">
                {w.daily.chapterLabel}
              </h2>
              <div className="hi-chapter-heading">
                <h2>{w.daily.title}</h2>
              </div>
            </header>

            <p className="tp-section-lead wf-hours" data-wf-reveal>
              <RichText text={w.daily.hours} />
            </p>

            <div className="wf-pooja" data-wf-reveal>
              <p className="wf-pooja-lead">{w.daily.poojaLead}</p>
              <ul className="wf-pooja-grid">
                {w.daily.poojas.map((pooja) => (
                  <li key={pooja.id} className="wf-pooja-item">
                    <span className="wf-pooja-time">{pooja.time}</span>
                    <span className="wf-pooja-name">{pooja.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p id={w.daily.lastFlower.id} className="wf-last-flower" data-wf-reveal>
              <RichText text={w.daily.lastFlower.text} />
            </p>

            <div className="wf-daily-closing art-prose-acc-block" data-wf-reveal>
              <WorshipAccordion
                sections={w.daily.closing}
                idPrefix="daily-closing"
              />
            </div>
          </div>
        </section>

        <section className="tp-section tp-section-alt" id={w.festivals.id}>
          <div className="tp-section-inner">
            <header className="hi-chapter-head" data-wf-reveal>
              <p className="tp-eyebrow">{w.festivals.eyebrow}</p>
              <h2 className="hi-chapter-label" aria-hidden="true">
                {w.festivals.chapterLabel}
              </h2>
              <div className="hi-chapter-heading">
                <h2>{w.festivals.title}</h2>
              </div>
            </header>

            <div className="wf-festival-stack">
              {w.festivals.items.map((festival) => {
                const hasImage = Boolean(festival.image)
                return (
                  <article
                    key={festival.id}
                    id={festival.id}
                    className={[
                      'wf-festival',
                      hasImage ? 'has-media' : 'is-copy-only',
                      festival.mediaFirst ? 'is-media-first' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    data-wf-reveal
                  >
                    <div className="wf-festival-copy">
                      <p className="wf-festival-period">{festival.period}</p>
                      <h3>{festival.title}</h3>
                      <div className="tp-prose">
                        {festival.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>
                            <RichText text={paragraph} />
                          </p>
                        ))}
                      </div>
                    </div>
                    {festival.image ? (
                      <Figure image={festival.image} className="wf-festival-figure" />
                    ) : null}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="tp-closing" id={w.continue.id} aria-labelledby="wf-continue-title">
          <div className="tp-section-inner tp-closing-inner">
            <p className="tp-eyebrow">{w.continue.eyebrow}</p>
            <h2 id="wf-continue-title">{w.continue.title}</h2>
            <p className="tp-lead">
              <RichText text={w.continue.lead} />
            </p>
          </div>

                    <ContinueRail cards={continueCards} />
        </section>
      </main>
      <Footer variant="full" />
      <TempleContents stages={w.contentsStages} />
    </div>
  )
}

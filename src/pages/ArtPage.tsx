import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ContinueRail } from '../components/ContinueRail'
import { TempleContents } from '../components/TempleContents'
import { TemplePartDock } from '../components/TemplePartDock'
import { SectionFigure } from '../components/SectionFigure'
import { sections } from '../data/home'
import {
  artPage as a,
  artContentsForPart,
  artPartDockOptions,
  type ArtImage,
  type ArtPartId,
} from '../data/art'
import { scrollToId } from '../utils/scrollToId'

const continueCards = sections.filter((section) => section.id !== 'art')

function RichText({ text }: { text: string }): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function proseSectionTitle(text: string): string {
  const bold = text.match(/\*\*([^*]+)\*\*/)
  if (bold?.[1]) {
    const label = bold[1].trim()
    if (label.length <= 44) return label
  }

  const plain = text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/^["'“]+/, '').trim()
  const sentence = plain.match(/^[^.!?]+[.!?]?/)?.[0]?.trim() ?? plain
  if (sentence.length <= 56) return sentence.replace(/[.!?]$/, '')

  const cut = plain.slice(0, 53)
  const space = cut.lastIndexOf(' ')
  return `${cut.slice(0, space > 24 ? space : 53).trim()}…`
}

function useIsArtMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 859px)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 859px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isMobile
}

type ArtProseSection = {
  id: string
  title: string
  paragraphs: string[]
  intro?: string
  image?: ArtImage
  panelVariant?: 'default' | 'quote' | 'subject'
  flat?: boolean
}

function ArtProsePanelContent({ section }: { section: ArtProseSection }) {
  if (section.panelVariant === 'quote') {
    return (
      <>
        {section.intro ? (
          <p className="art-discovery-intro">
            <RichText text={section.intro} />
          </p>
        ) : null}
        <div className="art-quote">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>
      </>
    )
  }

  if (section.panelVariant === 'subject' && section.image) {
    return (
      <div className="art-chola-subject-layout">
        <div className="tp-prose">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>
        <Figure image={section.image} className="art-chola-subject-figure" />
      </div>
    )
  }

  return (
    <div className="tp-prose">
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>
          <RichText text={paragraph} />
        </p>
      ))}
    </div>
  )
}

function ArtProseAccordion({
  sections,
  idPrefix,
  className = '',
  singleOpen = false,
  duoColumns = false,
}: {
  sections: ArtProseSection[]
  idPrefix: string
  className?: string
  /** Only one expandable panel open at a time */
  singleOpen?: boolean
  /** Desktop: two independent columns (even/odd); mobile stays one list */
  duoColumns?: boolean
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((section) => [section.id, false])),
  )
  const [duoActive, setDuoActive] = useState(false)

  useEffect(() => {
    if (!duoColumns) {
      setDuoActive(false)
      return
    }
    const mq = window.matchMedia('(min-width: 860px)')
    const sync = () => setDuoActive(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [duoColumns])

  const toggleSection = (id: string) => {
    setOpen((prev) => {
      const nextOpen = !prev[id]
      if (!singleOpen) return { ...prev, [id]: nextOpen }
      return Object.fromEntries(sections.map((section) => [section.id, section.id === id ? nextOpen : false]))
    })
  }

  const renderSection = (section: ArtProseSection) => {
    const panelId = `${idPrefix}-${section.id}-panel`
    const headerId = `${idPrefix}-${section.id}-header`

    if (section.flat) {
      if (section.panelVariant === 'subject' && section.image) {
        return (
          <li key={section.id} className="is-flat is-flat-media">
            <div className="art-chola-subject-copy">
              <h3 id={headerId} className="art-prose-acc-flat-label">
                {section.title}
              </h3>
              <div
                id={panelId}
                className="tp-acc-panel"
                role="region"
                aria-labelledby={headerId}
              >
                <div className="tp-prose">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <Figure image={section.image} className="art-chola-subject-figure" />
          </li>
        )
      }

      return (
        <li key={section.id} className="is-flat">
          <h3 id={headerId} className="art-prose-acc-flat-label">
            {section.title}
          </h3>
          <div
            id={panelId}
            className="tp-acc-panel"
            role="region"
            aria-labelledby={headerId}
          >
            <ArtProsePanelContent section={section} />
          </div>
        </li>
      )
    }

    const isOpen = Boolean(open[section.id])
    const variantClass =
      section.panelVariant && section.panelVariant !== 'default'
        ? ` is-${section.panelVariant}`
        : ''

    return (
      <li key={section.id} className={`${isOpen ? 'is-open' : ''}${variantClass}`.trim() || undefined}>
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
          <ArtProsePanelContent section={section} />
        </div>
      </li>
    )
  }

  const listClass = `tp-topic-list tp-topic-accordion art-prose-acc${className ? ` ${className}` : ''}`.trim()

  if (duoActive) {
    const flatSubjects = sections.filter(
      (section) => section.flat && section.panelVariant === 'subject',
    )
    const story = sections.filter((section) => section.panelVariant !== 'subject')

    return (
      <div className="art-prose-acc-duo-wrap">
        {story.length ? (
          <ul
            className={`${listClass} art-prose-acc-duo`}
            aria-label="Section contents"
          >
            {story.map(renderSection)}
          </ul>
        ) : null}
        {flatSubjects.length >= 2 ? (
          <ul
            className={`${listClass} art-prose-acc-subjects-pair`}
            aria-label="Fresco subjects"
          >
            {flatSubjects.slice(0, 2).map(renderSection)}
          </ul>
        ) : null}
        {flatSubjects.length > 2 || flatSubjects.length === 1 ? (
          <ul className={listClass} aria-label="Fresco subjects">
            {(flatSubjects.length >= 2 ? flatSubjects.slice(2) : flatSubjects).map(renderSection)}
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

function CholaFrescoCopy({
  panels,
  idPrefix,
}: {
  panels: {
    label: string
    paragraphs: string[]
    intro?: string
    image?: ArtImage
    variant?: 'default' | 'quote' | 'subject'
  }[]
  idPrefix: string
}) {
  const sections: ArtProseSection[] = panels.map((panel) => ({
    id: panel.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: panel.label,
    paragraphs: panel.paragraphs,
    intro: panel.intro,
    image: panel.image,
    panelVariant: panel.variant ?? 'default',
    // Newspaper account stays accordion; everything else is open prose
    flat: panel.variant !== 'quote',
  }))

  return (
    <div className="art-prose-acc-block">
      <ArtProseAccordion
        sections={sections}
        idPrefix={idPrefix}
        singleOpen
        duoColumns
      />
    </div>
  )
}

function StoneGraniteCopy({
  topics,
  closing,
}: {
  topics: { label: string; text: string }[]
  closing: string[]
}) {
  const sections: ArtProseSection[] = [
    ...topics.map((topic) => ({
      id: topic.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: topic.label,
      paragraphs: [topic.text],
    })),
    ...(closing.length
      ? [
          {
            id: 'closing',
            title: proseSectionTitle(closing[0]),
            paragraphs: closing,
          },
        ]
      : []),
  ]

  return (
    <div className="art-prose-acc-block">
      <ArtProseAccordion sections={sections} idPrefix="stone-granite" />
    </div>
  )
}

function ProseLead({
  heading,
  intro,
  introParagraphs,
}: {
  heading?: string
  intro?: string
  introParagraphs?: string[]
}) {
  const intros = introParagraphs?.length ? introParagraphs : intro ? [intro] : []

  if (!heading && !intros.length) return null

  return (
    <div className="art-prose-lead">
      {heading ? <p className="tp-eyebrow">{heading}</p> : null}
      {intros.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="art-prose-lead-intro">
          <RichText text={paragraph} />
        </p>
      ))}
    </div>
  )
}

function Prose({
  paragraphs,
  sections,
  idPrefix = 'art-prose',
  className = '',
  leadHeading,
  leadIntro,
  leadIntroParagraphs,
  flatOnMobile = false,
}: {
  paragraphs: string[]
  sections?: { title: string; paragraphs: string[] }[]
  idPrefix?: string
  className?: string
  leadHeading?: string
  leadIntro?: string
  leadIntroParagraphs?: string[]
  flatOnMobile?: boolean
}) {
  const leadParagraphs = leadIntroParagraphs?.length
    ? leadIntroParagraphs
    : leadIntro
      ? [leadIntro]
      : []

  const bodyParagraphs = sections
    ? sections.flatMap((section) => section.paragraphs)
    : paragraphs

  const flatParagraphs =
    leadParagraphs.length && sections
      ? [...leadParagraphs, ...sections.flatMap((section) => section.paragraphs)]
      : bodyParagraphs

  const accordionSections: ArtProseSection[] = sections
    ? sections.map((section, index) => ({
        id: `${index}-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: section.title,
        paragraphs: section.paragraphs,
      }))
    : paragraphs.map((paragraph, index) => ({
        id: String(index),
        title: proseSectionTitle(paragraph),
        paragraphs: [paragraph],
      }))

  const lead = (
    <ProseLead
      heading={leadHeading}
      introParagraphs={leadParagraphs.length ? leadParagraphs : undefined}
    />
  )

  const useAccordion =
    !flatOnMobile &&
    (accordionSections.length > 1 ||
      (leadParagraphs.length > 0 && Boolean(sections?.length) && accordionSections.length >= 1))

  if (useAccordion) {
    return (
      <div className="art-prose-acc-block">
        {lead}
        <ArtProseAccordion
          sections={accordionSections}
          idPrefix={idPrefix}
          className={className}
        />
      </div>
    )
  }

  return (
    <>
      {leadParagraphs.length && sections ? null : lead}
      <div className={`tp-prose${className ? ` ${className}` : ''}`.trim()}>
        {(leadParagraphs.length && sections ? flatParagraphs : bodyParagraphs).map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
    </>
  )
}

function Figure({ image, className = '' }: { image: ArtImage; className?: string }) {
  return <SectionFigure image={image} className={className} />
}

function KaranasFeature({
  id,
  eyebrow,
  title,
  intro,
  leadParagraphs,
  flowParagraphs,
  image,
}: {
  id: string
  eyebrow: string
  title: string
  intro: string
  leadParagraphs: string[]
  flowParagraphs: string[]
  image: ArtImage
}) {
  return (
    <article id={id} className="art-feature art-feature--karanas">
      <div className="art-karanas-main">
        <div className="art-karanas-copy">
          <div className="art-karanas-intro">
            <p className="tp-eyebrow">{eyebrow}</p>
            <h3>{title}</h3>
            <p className="art-prose-lead-intro">
              <RichText text={intro} />
            </p>
          </div>
          <div className="art-karanas-prose-lead">
            <Prose
              paragraphs={leadParagraphs}
              sections={[
                { title: 'Discovery in the Vimana', paragraphs: [leadParagraphs[0]] },
                { title: 'Shiva Thandava sculptures', paragraphs: [leadParagraphs[1]] },
              ]}
              idPrefix={`${id}-lead`}
            />
          </div>
          <div className="art-karanas-prose-flow">
            <Prose
              paragraphs={flowParagraphs}
              sections={[
                { title: '81 of 108 karanas', paragraphs: [flowParagraphs[0]] },
                { title: 'Grace and expressive movement', paragraphs: [flowParagraphs[1]] },
              ]}
              idPrefix={`${id}-flow`}
            />
          </div>
        </div>
        <Figure image={image} className="art-feature-figure" />
      </div>
    </article>
  )
}

function ArtFeature({
  id,
  stat,
  eyebrow,
  title,
  paragraphs,
  highlights,
  image,
  mediaFirst = false,
  flatOnMobile = false,
  splitImageOnMobile = false,
}: {
  id?: string
  stat?: string
  eyebrow: string
  title?: string
  paragraphs: string[]
  highlights?: { label: string; value: string }[]
  image: ArtImage
  mediaFirst?: boolean
  flatOnMobile?: boolean
  splitImageOnMobile?: boolean
}) {
  const isMobile = useIsArtMobile()
  const useSplitMobile = isMobile && splitImageOnMobile && paragraphs.length >= 2

  const header = (
    <>
      {stat ? (
        <p className="art-feature-stat" aria-hidden="true">
          {stat}
        </p>
      ) : null}
      <p className="tp-eyebrow">{eyebrow}</p>
      {title ? <h3>{title}</h3> : null}
      {highlights?.length ? (
        <ul className="tp-highlights tp-highlights-inline art-feature-highlights" aria-label="Key facts">
          {highlights.map((item) => (
            <li key={item.label}>
              <span className="tp-highlight-label">{item.label}</span>
              <span className="tp-highlight-value">{item.value}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )

  const media = <Figure image={image} className="art-feature-figure" />

  if (useSplitMobile) {
    return (
      <article id={id} className="art-feature art-feature--split-mobile">
        <div className="art-feature-copy">
          {header}
          <div className="tp-prose">
            <p>
              <RichText text={paragraphs[0]} />
            </p>
          </div>
        </div>
        {media}
        <div className="art-feature-copy art-feature-copy-tail">
          <div className="tp-prose">
            {paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </article>
    )
  }

  const copy = (
    <div className="art-feature-copy">
      {header}
      <Prose
        paragraphs={paragraphs}
        idPrefix={id ?? eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        flatOnMobile={flatOnMobile}
      />
    </div>
  )

  return (
    <article
      id={id}
      className={`art-feature${mediaFirst ? ' is-media-first' : ''}`}
    >
      {mediaFirst ? (
        <>
          {media}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {media}
        </>
      )}
    </article>
  )
}

function LostWaxSteps({
  id,
  heading,
  intro,
  steps,
  image,
  followUp,
}: {
  id: string
  heading: string
  intro: string
  steps: string[]
  image?: ArtImage
  followUp?: {
    eyebrow: string
    intro: string
    sections: { title: string; paragraphs: string[] }[]
  }
}) {
  const isMobile = useIsArtMobile()

  const stepsBlock = (
    <>
      <h3>{heading}</h3>
      <p className="art-lost-wax-intro">
        <RichText text={intro} />
      </p>
      <ol className="art-steps">
        {steps.map((step, index) => (
          <li key={step.slice(0, 32)} className="art-step">
            <span className="art-step-num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p>
              <RichText text={step} />
            </p>
          </li>
        ))}
      </ol>
    </>
  )

  const followUpAccordionSections: ArtProseSection[] | null = followUp
    ? followUp.sections.map((section, index) => ({
        id: `${index}-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: section.title,
        paragraphs: section.paragraphs,
      }))
    : null

  const followUpAccordionItems =
    followUpAccordionSections && followUpAccordionSections.length > 1
      ? followUpAccordionSections.slice(0, -1)
      : followUpAccordionSections

  const followUpFullWidthSection =
    followUpAccordionSections && followUpAccordionSections.length > 1
      ? followUpAccordionSections.at(-1)
      : null

  const followUpFullWidthBlock = followUpFullWidthSection ? (
    <div className="art-lost-wax-follow-full">
      <p className="art-lost-wax-follow-full-label">{followUpFullWidthSection.title}</p>
      <div className="tp-prose">
        {followUpFullWidthSection.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
    </div>
  ) : null

  const followUpBlock = followUp && followUpAccordionItems ? (
    <>
      <div className="art-lost-wax-follow-head">
        <ProseLead heading={followUp.eyebrow} intro={followUp.intro} />
      </div>
      <div className="art-lost-wax-follow-acc art-prose-acc-block">
        <ArtProseAccordion sections={followUpAccordionItems} idPrefix={`${id}-follow`} />
      </div>
    </>
  ) : null

  if (isMobile) {
    return (
      <article className="art-lost-wax art-lost-wax--mobile" id={id}>
        <div className="art-lost-wax-copy">{stepsBlock}</div>
        {followUp && followUpAccordionItems ? (
          <>
            <div className="art-lost-wax-follow-head">
              <ProseLead heading={followUp.eyebrow} intro={followUp.intro} />
              {image ? <Figure image={image} className="art-lost-wax-figure" /> : null}
            </div>
            <div className="art-lost-wax-follow-acc art-prose-acc-block">
              <ArtProseAccordion sections={followUpAccordionItems} idPrefix={`${id}-follow`} />
            </div>
            {followUpFullWidthBlock}
          </>
        ) : image ? (
          <Figure image={image} className="art-lost-wax-figure" />
        ) : null}
      </article>
    )
  }

  return (
    <article className="art-lost-wax" id={id}>
      <div className="art-lost-wax-layout">
        <div className="art-lost-wax-copy">
          {stepsBlock}
          {followUpBlock}
        </div>
        {image ? <Figure image={image} className="art-lost-wax-figure" /> : null}
        {followUpFullWidthBlock}
      </div>
    </article>
  )
}

function useRevealOnScroll(
  rootRef: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = root.querySelectorAll<HTMLElement>('[data-art-reveal]')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps passed by caller
  }, [rootRef, ...deps])
}

export function ArtPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [activePart, setActivePart] = useState<ArtPartId>('part1')
  const [panelKey, setPanelKey] = useState(0)
  const didMount = useRef(false)

  useRevealOnScroll(mainRef, [activePart, panelKey])

  const switchPart = (part: ArtPartId) => {
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
      const timer = window.setTimeout(() => {
        scrollToId(a.frescos.id)
      }, 40)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activePart])

  const [marathaLayer, nayakaLayer] = a.frescos.layers
  const marathaImage = marathaLayer && 'image' in marathaLayer ? marathaLayer.image : undefined
  const nayakaImage = nayakaLayer && 'image' in nayakaLayer ? nayakaLayer.image : undefined
  const contentsStages = artContentsForPart(activePart)

  return (
    <div id="top" className="page page-scroll page-art page-art-chapters">
      <Header />
      <main className="temple-main art-main" ref={mainRef}>
        <section className="tp-hero tp-hero--split" aria-label={a.hero.title}>
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">{a.hero.eyebrow}</p>
            <h1>{a.hero.title}</h1>
            <p className="tp-lead">
              <RichText text={a.hero.lead} />
            </p>
          </div>
          <div className="tp-hero-media" aria-hidden="true">
            <img src={a.hero.image} alt="" width={1400} height={933} />
          </div>
        </section>

        <div
          key={panelKey}
          id={`art-part-panel-${activePart}`}
          className={`tp-part-panel tp-part-panel--${activePart}`}
          role="tabpanel"
          aria-labelledby={`art-part-tab-${activePart}`}
        >
          {activePart === 'part1' ? (
            <>
              <section className="tp-section tp-intro" id={a.intro.id}>
                <div className="tp-section-inner">
                  <div className="tp-intro-head art-intro-head" data-art-reveal>
                    <div className="art-intro-head-left">
                      <p className="tp-eyebrow">{a.intro.eyebrow}</p>
                      <h2>{a.intro.title}</h2>
                    </div>
                    <div className="art-intro-prose">
                      <Prose
                        paragraphs={a.intro.paragraphs}
                        leadIntro={a.intro.lead}
                        idPrefix="intro"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="tp-section tp-section-alt" id={a.stone.id}>
                <div className="tp-section-inner">
                  <div className="art-stone-granite-layout">
                    <div className="art-stone-granite-main">
                      <header className="hi-chapter-head art-stone-granite-head" data-art-reveal>
                        <p className="tp-eyebrow">{a.stone.eyebrow}</p>
                        <h2 className="hi-chapter-label" aria-hidden="true">
                          {a.stone.chapterLabel}
                        </h2>
                        <div className="hi-chapter-heading">
                          <h2>{a.stone.title}</h2>
                        </div>
                      </header>
                      <div className="art-stone-granite-body">
                        <div className="art-stone-granite-intro" data-art-reveal>
                          <ProseLead introParagraphs={a.stone.granite.intro} />
                        </div>
                        <div className="art-stone-granite-copy">
                          <StoneGraniteCopy
                            topics={a.stone.granite.topics}
                            closing={a.stone.granite.closing}
                          />
                        </div>
                      </div>
                    </div>
                    <Figure image={a.stone.granite.image} className="art-stone-granite-figure" />
                  </div>

                  <div data-art-reveal>
                    <KaranasFeature
                      id={a.stone.karanas.id}
                      eyebrow={a.stone.karanas.eyebrow}
                      title={a.stone.karanas.title}
                      intro={a.stone.karanas.intro}
                      leadParagraphs={a.stone.karanas.leadParagraphs}
                      flowParagraphs={a.stone.karanas.flowParagraphs}
                      image={a.stone.karanas.image}
                    />
                  </div>
                </div>
              </section>

              <section className="tp-section" id={a.bronzes.id}>
                <div className="tp-section-inner">
                  <div className="art-chapter-open">
                    <header className="hi-chapter-head art-chapter-open-head" data-art-reveal>
                      <p className="tp-eyebrow">{a.bronzes.eyebrow}</p>
                      <h2 className="hi-chapter-label" aria-hidden="true">
                        {a.bronzes.chapterLabel}
                      </h2>
                      <div className="hi-chapter-heading">
                        <h2>{a.bronzes.title}</h2>
                      </div>
                    </header>
                    <div className="art-chapter-open-prose" data-art-reveal>
                      <Prose
                        paragraphs={a.bronzes.processions.sections.flatMap(
                          (section) => section.paragraphs,
                        )}
                        sections={a.bronzes.processions.sections}
                        leadIntro={a.bronzes.processions.intro}
                        idPrefix="bronzes-processions"
                      />
                    </div>
                  </div>

                  <div data-art-reveal>
                    <ArtFeature
                      id={a.bronzes.nataraja.id}
                      eyebrow={a.bronzes.nataraja.eyebrow}
                      title={a.bronzes.nataraja.title}
                      paragraphs={a.bronzes.nataraja.paragraphs}
                      image={a.bronzes.nataraja.image}
                      flatOnMobile
                      splitImageOnMobile
                    />
                  </div>

                  <div data-art-reveal>
                    <LostWaxSteps
                      id={a.bronzes.lostWax.id}
                      heading={a.bronzes.lostWax.heading}
                      intro={a.bronzes.lostWax.intro}
                      steps={a.bronzes.lostWax.steps}
                      image={a.bronzes.lostWax.image}
                      followUp={a.bronzes.followUp}
                    />
                  </div>
                </div>
              </section>

              <section
                className="tp-section tp-section-alt tp-chapter-bridge"
                id={a.bridge.id}
                aria-labelledby="art-bridge-title"
              >
                <div className="tp-section-inner tp-chapter-bridge-inner">
                  <p className="tp-eyebrow">{a.bridge.eyebrow}</p>
                  <h2 id="art-bridge-title">{a.bridge.title}</h2>
                  <p className="tp-section-lead">
                    <RichText text={a.bridge.lead} />
                  </p>
                  <button
                    type="button"
                    className="tp-cta tp-chapter-cta"
                    onClick={() => switchPart('part2')}
                  >
                    {a.bridge.cta}
                  </button>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="tp-section tp-section-alt" id={a.frescos.id}>
                <div className="tp-section-inner">
                  <div className="art-fresco-main" data-art-reveal>
                    <div className="art-fresco-intro-block">
                      <header className="hi-chapter-head art-fresco-chapter-head">
                        <p className="tp-eyebrow">{a.frescos.eyebrow}</p>
                        <h2 className="hi-chapter-label" aria-hidden="true">
                          {a.frescos.chapterLabel}
                        </h2>
                        <div className="hi-chapter-heading">
                          <h2>{a.frescos.title}</h2>
                        </div>
                      </header>
                      <p className="tp-section-lead">
                        <RichText text={a.frescos.intro} />
                      </p>
                    </div>
                    {marathaLayer ? (
                      <div className="art-fresco-maratha-row">
                        <article id={marathaLayer.id} className="art-era art-era--lead">
                          <header className="art-era-head">
                            <p className="art-era-period">{marathaLayer.period}</p>
                            <h3>{marathaLayer.title}</h3>
                          </header>
                          <Prose
                            paragraphs={marathaLayer.paragraphs}
                            idPrefix={marathaLayer.id}
                          />
                        </article>
                        {marathaImage ? (
                          <Figure image={marathaImage} className="art-fresco-figure" />
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="art-era-stack" data-art-reveal>
                    {nayakaLayer ? (
                      <article
                        id={nayakaLayer.id}
                        className="art-era art-era--has-media art-era--figure-left"
                      >
                        <div className="art-era-layout">
                          <div className="art-era-copy">
                            <header className="art-era-head">
                              <p className="art-era-period">{nayakaLayer.period}</p>
                              <h3>{nayakaLayer.title}</h3>
                            </header>
                            <Prose
                              paragraphs={nayakaLayer.paragraphs}
                              idPrefix={nayakaLayer.id}
                              flatOnMobile
                            />
                          </div>
                          {nayakaImage ? (
                            <Figure image={nayakaImage} className="art-era-figure" />
                          ) : null}
                        </div>
                      </article>
                    ) : null}
                  </div>

                  <div
                    className="art-chola-fresco-layout"
                    id={a.frescos.chola.id}
                    data-art-reveal
                  >
                    <header className="art-era-head art-chola-fresco-head">
                      <p className="art-era-period">{a.frescos.chola.period}</p>
                      <h3>{a.frescos.chola.title}</h3>
                    </header>
                    <div className="art-chola-fresco-body">
                      <div className="art-chola-fresco-intro">
                        <ProseLead introParagraphs={a.frescos.chola.intro} />
                      </div>
                      <div className="art-chola-fresco-copy">
                        <CholaFrescoCopy
                          panels={a.frescos.chola.panels}
                          idPrefix="fresco-chola"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="tp-closing"
                id={a.continue.id}
                aria-labelledby="art-continue-title"
              >
                <div className="tp-section-inner tp-closing-inner">
                  <p className="tp-eyebrow">{a.continue.eyebrow}</p>
                  <h2 id="art-continue-title">{a.continue.title}</h2>
                  <p className="tp-lead">
                    <RichText text={a.continue.lead} />
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
          <TemplePartDock
            activePart={activePart}
            onChange={switchPart}
            parts={artPartDockOptions}
            ariaLabel="Art & Sculpture chapters"
            idPrefix="art-part"
          />
        </div>
        <div className="tp-chapter-chrome-contents">
          <TempleContents key={activePart} stages={contentsStages} iconOnly docked />
        </div>
      </div>
    </div>
  )
}

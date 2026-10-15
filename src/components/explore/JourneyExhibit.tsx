import { useState, type ReactNode } from 'react'
import {
  DEFAULT_STORY,
  NOTE_LABELS,
  exhibitStories,
  type ExhibitRhythm,
  type ExhibitStoryKey,
  type GuideNoteKind,
  type StoryBeat,
} from '../../data/exploreStories'

export type FigureImg = { src: string; alt: string; caption?: string; title?: string; intro?: string }
export type GuideStat = { label: string; value: string }
export type GuideFact = { label: string; detail: string }
export type GuideCard = { title: string; body: string; collapsible?: boolean }
export type GuideNoteData = { kind: GuideNoteKind; title?: string; body: string }

export type ExhibitContent = {
  /** Short 2–3 line orientation shown under the stop title */
  orientation?: string
  intro?: string[]
  lead?: string
  paragraphs?: string[]
  stats?: GuideStat[]
  facts?: GuideFact[]
  notes?: GuideNoteData[]
  cards?: GuideCard[]
  pullQuote?: string
  image?: FigureImg
  images?: FigureImg[]
}

type RichTextFn = (props: { text: string }) => ReactNode

type ExhibitDeps = {
  RichText: RichTextFn
  Figure: (props: { image: FigureImg; className?: string }) => ReactNode
  Prose: (props: { paragraphs: string[]; className?: string }) => ReactNode
  Gallery: (props: {
    images: FigureImg[]
    className?: string
    label: string
  }) => ReactNode
}

function noteKey(note: GuideNoteData) {
  return `${note.kind}:${note.title ?? note.body.slice(0, 32)}`
}

function resolveImages(content: ExhibitContent): FigureImg[] {
  if (content.images?.length) return content.images
  if (content.image) return [content.image]
  return []
}

function sliceItems<T>(items: T[] | undefined, from?: number, to?: number): T[] {
  if (!items?.length) return []
  return items.slice(from ?? 0, to)
}

function matchNote(
  notes: GuideNoteData[] | undefined,
  kind: GuideNoteKind,
  title?: string,
  consumed?: Set<string>,
): GuideNoteData | undefined {
  if (!notes?.length) return undefined
  return notes.find((note) => {
    if (note.kind !== kind) return false
    if (title && note.title !== title) return false
    if (consumed?.has(noteKey(note))) return false
    return true
  })
}

function GuideNote({
  note,
  RichText,
}: {
  note: GuideNoteData
  RichText: RichTextFn
}) {
  const heading = note.title ?? NOTE_LABELS[note.kind]
  return (
    <aside
      className={`ex-guide-note ex-guide-note--${note.kind}`}
      aria-label={heading}
    >
      <h3>{heading}</h3>
      <p className="ex-guide-note-body">
        <RichText text={note.body} />
      </p>
    </aside>
  )
}

export function StatStrip({ items, label }: { items: GuideStat[]; label: string }) {
  return (
    <ul className="ex-stat-strip" aria-label={label}>
      {items.map((item) => (
        <li key={item.label}>
          <span className="ex-stat-value">{item.value}</span>
          <span className="ex-stat-label">{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function FactRow({
  items,
  label,
  RichText,
}: {
  items: GuideFact[]
  label: string
  RichText: RichTextFn
}) {
  return (
    <ul className="ex-fact-row" aria-label={label}>
      {items.map((item) => (
        <li key={item.label}>
          <span className="ex-fact-label">{item.label}</span>
          <span className="ex-fact-detail">
            <RichText text={item.detail} />
          </span>
        </li>
      ))}
    </ul>
  )
}

export function TopicCards({
  cards,
  RichText,
}: {
  cards: GuideCard[]
  RichText: RichTextFn
}) {
  const expandable = cards.filter((card) => card.collapsible)
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(expandable.map((card) => [card.title, false])),
  )

  if (!cards.length) return null

  /** Keep source order: consecutive static vs collapsible cards stay grouped. */
  const groups: { kind: 'static' | 'expandable'; cards: GuideCard[] }[] = []
  for (const card of cards) {
    const kind = card.collapsible ? 'expandable' : 'static'
    const last = groups[groups.length - 1]
    if (last && last.kind === kind) last.cards.push(card)
    else groups.push({ kind, cards: [card] })
  }

  const renderGroup = (group: (typeof groups)[number], groupIndex: number) => {
    if (group.kind === 'static') {
      return (
        <div key={`static-${groupIndex}`} className="ex-editorial-grid">
          {group.cards.map((card) => (
            <article key={card.title} className="ex-editorial-card">
              <h3>{card.title}</h3>
              <p>
                <RichText text={card.body} />
              </p>
            </article>
          ))}
        </div>
      )
    }

    return (
      <ul key={`acc-${groupIndex}`} className="ex-topic-acc">
        {group.cards.map((card) => {
          const isOpen = Boolean(open[card.title])
          const panelId = `ex-topic-${card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

          return (
            <li key={card.title} className={isOpen ? 'is-open' : undefined}>
              <button
                type="button"
                className="tp-acc-toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpen((prev) => ({
                    ...prev,
                    [card.title]: !prev[card.title],
                  }))
                }
              >
                <h3>{card.title}</h3>
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
                  <RichText text={card.body} />
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  if (groups.length === 1) return renderGroup(groups[0], 0)

  return (
    <div className="ex-topic-stack">{groups.map((group, i) => renderGroup(group, i))}</div>
  )
}

function figureClass(variant: 'main' | 'wide' | 'compact' = 'main') {
  if (variant === 'wide') return 'ex-exhibit-figure is-wide'
  if (variant === 'compact') return 'ex-exhibit-figure is-compact'
  return 'ex-exhibit-figure is-main'
}

function galleryClass(variant: 'pair' | 'duo' | 'strip' | 'gallery' = 'gallery') {
  if (variant === 'pair') return 'ex-hero-media-pair'
  if (variant === 'strip') return 'ex-image-strip'
  if (variant === 'duo') return 'ex-duo'
  return 'ex-gallery'
}

function renderBeat(
  beat: StoryBeat,
  content: ExhibitContent,
  label: string,
  deps: ExhibitDeps,
  consumedNotes: Set<string>,
): ReactNode {
  const { RichText, Figure, Prose, Gallery } = deps
  const images = resolveImages(content)

  switch (beat.type) {
    case 'lead': {
      /* Orientation under the stop title already covers this for map stops */
      if (content.orientation || !content.lead) return null
      return (
        <p key="lead" className="tp-section-lead">
          <RichText text={content.lead} />
        </p>
      )
    }
    case 'intro': {
      /* Avoid repeating the title orientation as the first body module */
      if (content.orientation) {
        const orientation = content.orientation
        const remaining =
          content.intro?.filter((line) => {
            if (line === orientation) return false
            if (orientation.includes(line)) return false
            return true
          }) ?? []
        if (!remaining.length) return null
        return <Prose key="intro" paragraphs={remaining} />
      }
      const lead = content.intro?.length
        ? content.intro
        : !content.stats?.length &&
            !content.facts?.length &&
            !content.notes?.length &&
            !content.cards?.length
          ? content.paragraphs
          : content.intro
      if (!lead?.length) return null
      return <Prose key="intro" paragraphs={lead} />
    }
    case 'prose': {
      const paras = content.paragraphs
      if (!paras?.length) return null
      let sliced = paras.slice(beat.start ?? 0, beat.end)
      if ((beat.start ?? 0) === 0 && content.intro?.length) {
        const overlaps = content.intro.every((line, index) => paras[index] === line)
        if (overlaps) sliced = paras.slice(content.intro.length, beat.end)
      }
      if (!sliced.length) return null
      return (
        <Prose key={`prose-${beat.start ?? 0}-${sliced[0].slice(0, 20)}`} paragraphs={sliced} />
      )
    }
    case 'figure': {
      const image = images[beat.index ?? 0]
      if (!image) return null
      return (
        <Figure
          key={`figure-${beat.index ?? 0}`}
          image={image}
          className={figureClass(beat.variant)}
        />
      )
    }
    case 'figures': {
      const subset = sliceItems(images, beat.from, beat.to)
      if (!subset.length) return null
      const aria = beat.label ?? `${label} images`
      if (beat.variant === 'pair' && subset.length >= 2) {
        return (
          <div key={`figures-pair-${aria}`} className="ex-hero-media-pair">
            <Figure image={subset[0]} className="ex-hero-media-main" />
            <Figure image={subset[1]} className="ex-hero-media-side" />
          </div>
        )
      }
      return (
        <Gallery
          key={`figures-${aria}`}
          images={subset}
          className={galleryClass(beat.variant)}
          label={aria}
        />
      )
    }
    case 'stats': {
      if (!content.stats?.length) return null
      return <StatStrip key="stats" items={content.stats} label={`${label} figures`} />
    }
    case 'facts': {
      const items = sliceItems(content.facts, beat.from, beat.to)
      if (!items.length) return null
      return (
        <FactRow
          key={`facts-${beat.from ?? 0}-${beat.to ?? 'end'}`}
          items={items}
          label={`${label} facts`}
          RichText={RichText}
        />
      )
    }
    case 'cards': {
      const cards = sliceItems(content.cards, beat.from, beat.to)
      if (!cards.length) return null
      return (
        <TopicCards
          key={`cards-${beat.from ?? 0}-${beat.to ?? 'end'}`}
          cards={cards}
          RichText={RichText}
        />
      )
    }
    case 'note': {
      const note = matchNote(content.notes, beat.kind, beat.title, consumedNotes)
      if (!note) return null
      consumedNotes.add(noteKey(note))
      return <GuideNote key={noteKey(note)} note={note} RichText={RichText} />
    }
    case 'notes': {
      const remaining =
        content.notes?.filter((note) => {
          if (consumedNotes.has(noteKey(note))) return false
          if (beat.kinds && !beat.kinds.includes(note.kind)) return false
          return true
        }) ?? []
      if (!remaining.length) return null
      remaining.forEach((note) => consumedNotes.add(noteKey(note)))
      return (
        <div key={`notes-${remaining.map(noteKey).join('|')}`} className="ex-guide-notes">
          {remaining.map((note) => (
            <GuideNote key={noteKey(note)} note={note} RichText={RichText} />
          ))}
        </div>
      )
    }
    case 'quote': {
      if (!content.pullQuote) return null
      return (
        <blockquote key="quote" className="tp-pull-quote">
          {content.pullQuote}
        </blockquote>
      )
    }
    default:
      return null
  }
}

export function JourneyExhibit({
  storyKey,
  content,
  label,
  rhythm: rhythmOverride,
  deps,
  children,
}: {
  storyKey?: ExhibitStoryKey
  content: ExhibitContent
  label: string
  rhythm?: ExhibitRhythm
  deps: ExhibitDeps
  children?: ReactNode
}) {
  const story = storyKey ? exhibitStories[storyKey] : undefined
  const beats = story?.beats ?? DEFAULT_STORY
  const rhythm = rhythmOverride ?? story?.rhythm ?? 'stack'
  const consumedNotes = new Set<string>()

  const modules = beats
    .map((beat, index) => {
      const node = renderBeat(beat, content, label, deps, consumedNotes)
      if (node == null) return null
      return (
        <div key={`beat-${index}-${beat.type}`} className="ex-exhibit-module">
          {node}
        </div>
      )
    })
    .filter(Boolean)

  return (
    <div className={`ex-exhibit ex-exhibit--${rhythm}`}>
      {modules}
      {children}
    </div>
  )
}

export function mapLabel(n: number) {
  return String(n).padStart(2, '0')
}

export function ExhibitStopHead({
  mapNum,
  title,
  eyebrow,
  intro,
  RichText,
}: {
  mapNum?: number
  title: string
  eyebrow?: string
  /** Short orientation immediately under the title */
  intro?: string
  RichText?: RichTextFn
}) {
  return (
    <header className="ex-exhibit-head">
      {mapNum != null ? (
        <span className="ex-stop-num" aria-label={`Map ${mapLabel(mapNum)}`}>
          {mapLabel(mapNum)}
        </span>
      ) : null}
      {eyebrow ? <p className="tp-eyebrow">{eyebrow}</p> : null}
      <h3>{title}</h3>
      {intro && RichText ? (
        <p className="ex-stop-intro">
          <RichText text={intro} />
        </p>
      ) : null}
    </header>
  )
}

/**
 * Per-stop editorial sequences for the Explore journey.
 * Beats reference fields on the stop content object — only modules present in data render.
 * Pattern: intro early, main image next, then document-order modules (varied per stop).
 */

export type GuideNoteKind =
  | 'did-you-know'
  | 'historical-note'
  | 'architecture'
  | 'observe'
  | 'engineering'
  | 'symbolism'
  | 'tip'

export type StoryBeat =
  | { type: 'intro' }
  | { type: 'lead' }
  | { type: 'prose'; start?: number; end?: number }
  | {
      type: 'figure'
      index?: number
      variant?: 'main' | 'wide' | 'compact'
    }
  | {
      type: 'figures'
      from?: number
      to?: number
      variant?: 'pair' | 'duo' | 'strip' | 'gallery'
      label?: string
    }
  | { type: 'stats' }
  | { type: 'facts'; from?: number; to?: number }
  | { type: 'cards'; from?: number; to?: number }
  | { type: 'note'; kind: GuideNoteKind; title?: string }
  | { type: 'notes'; kinds?: GuideNoteKind[] }
  | { type: 'quote' }

/** Visual shell — same modules, different pacing. */
export type ExhibitRhythm = 'stack' | 'immersive' | 'feature' | 'compact'

export type ExhibitStory = {
  rhythm?: ExhibitRhythm
  beats: StoryBeat[]
}

export const NOTE_LABELS: Record<GuideNoteKind, string> = {
  'did-you-know': 'Did You Know',
  'historical-note': 'Historical Context',
  architecture: 'Architecture',
  observe: 'What to Observe',
  engineering: 'Engineering Insight',
  symbolism: 'Symbolism',
  tip: 'Visitor Tip',
}

/** Fallback when a stop has no explicit story. */
export const DEFAULT_STORY: StoryBeat[] = [
  { type: 'intro' },
  { type: 'figure', variant: 'main' },
  { type: 'stats' },
  { type: 'facts' },
  { type: 'cards' },
  { type: 'notes' },
  { type: 'quote' },
]

export const exhibitStories = {
  'entrances.overview': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'main' },
      { type: 'cards' },
      { type: 'notes' },
    ],
  },
  'entrances.maratha': {
    rhythm: 'stack',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'main' },
      { type: 'stats' },
      { type: 'note', kind: 'architecture' },
      { type: 'note', kind: 'observe' },
    ],
  },
  'entrances.keralantakan': {
    rhythm: 'feature',
    beats: [
      { type: 'figure', variant: 'wide' },
      { type: 'stats' },
      { type: 'facts' },
    ],
  },
  'entrances.rajarajan': {
    rhythm: 'stack',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'main' },
      { type: 'stats' },
      { type: 'facts' },
      { type: 'cards' },
    ],
  },
  'entrances.rajarajan.dwarapalaka': {
    rhythm: 'feature',
    beats: [
      { type: 'figure', variant: 'wide' },
      { type: 'stats' },
      { type: 'cards' },
    ],
  },
  nandi: {
    rhythm: 'immersive',
    beats: [
      { type: 'figure', index: 0, variant: 'wide' },
      { type: 'intro' },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'stats' },
      { type: 'facts' },
      { type: 'figure', index: 2, variant: 'wide' },
      { type: 'cards', from: 0, to: 1 },
      { type: 'cards', from: 1, to: 2 },
      { type: 'figure', index: 3, variant: 'wide' },
      { type: 'note', kind: 'observe', title: 'Ceiling frescos' },
      { type: 'figure', index: 4, variant: 'wide' },
    ],
  },
  varahi: {
    rhythm: 'compact',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'main' },
      { type: 'note', kind: 'historical-note' },
      { type: 'note', kind: 'observe' },
    ],
  },
  'cloisters.overview': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'figure', index: 0, variant: 'main' },
      { type: 'stats' },
      { type: 'facts' },
      { type: 'cards', from: 0, to: 1 },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'cards', from: 1 },
      { type: 'note', kind: 'tip' },
    ],
  },
  'cloisters.east': {
    rhythm: 'feature',
    beats: [
      { type: 'figure', variant: 'wide' },
      { type: 'note', kind: 'did-you-know' },
    ],
  },
  'cloisters.south': {
    rhythm: 'immersive',
    beats: [
      { type: 'figure', index: 0, variant: 'wide' },
      { type: 'cards', from: 0, to: 1 },
      { type: 'cards', from: 1, to: 2 },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'cards', from: 2, to: 3 },
      { type: 'figure', index: 2, variant: 'wide' },
      { type: 'cards', from: 3, to: 4 },
      { type: 'figure', index: 3, variant: 'wide' },
      { type: 'cards', from: 4, to: 5 },
      { type: 'figure', index: 4, variant: 'wide' },
      { type: 'cards', from: 5 },
      { type: 'note', kind: 'observe' },
    ],
  },
  'cloisters.north': {
    rhythm: 'immersive',
    beats: [
      { type: 'cards', from: 0, to: 1 },
      { type: 'figure', index: 0, variant: 'wide' },
      { type: 'cards', from: 1, to: 2 },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'cards', from: 2, to: 3 },
      { type: 'figure', index: 2, variant: 'wide' },
      { type: 'stats' },
      { type: 'cards', from: 3 },
      { type: 'figures', from: 3, to: 5, variant: 'pair', label: 'Maratha frescos' },
    ],
  },
  'cloisters.museum': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'main' },
      { type: 'cards' },
    ],
  },
  'mainTemple.dakshinaKailasam': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'wide' },
      { type: 'cards' },
    ],
  },
  'mainTemple.halls.mukha': {
    rhythm: 'stack',
    beats: [
      { type: 'intro' },
      { type: 'stats' },
      { type: 'note', kind: 'observe' },
      { type: 'cards' },
      { type: 'figure', variant: 'wide' },
    ],
  },
  'mainTemple.halls.maha': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'stats' },
      { type: 'cards' },
    ],
  },
  'mainTemple.halls.antrala': {
    rhythm: 'stack',
    beats: [
      { type: 'intro' },
      { type: 'cards', from: 0, to: 1 },
      { type: 'figures', from: 0, to: 2, variant: 'pair', label: 'Antrala side reliefs' },
      { type: 'cards', from: 1 },
      { type: 'note', kind: 'historical-note' },
      { type: 'note', kind: 'tip' },
    ],
  },
  'mainTemple.vimana': {
    rhythm: 'immersive',
    beats: [
      { type: 'intro' },
      { type: 'figure', index: 0, variant: 'wide' },
      { type: 'stats' },
      { type: 'cards', from: 0, to: 1 },
      { type: 'cards', from: 1, to: 2 },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'cards', from: 2, to: 4 },
      { type: 'note', kind: 'did-you-know' },
      { type: 'facts' },
      { type: 'figure', index: 2, variant: 'wide' },
      { type: 'note', kind: 'observe' },
      { type: 'figure', index: 3, variant: 'wide' },
    ],
  },
  'mainTemple.waterspouts': {
    rhythm: 'compact',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'wide' },
    ],
  },
  'mainTemple.innerPassage': {
    rhythm: 'stack',
    beats: [
      { type: 'intro' },
      { type: 'stats' },
      { type: 'figure', index: 0, variant: 'wide' },
      { type: 'note', kind: 'historical-note' },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'cards' },
      { type: 'figure', index: 2, variant: 'wide' },
    ],
  },
  'mainTemple.sanctum': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'wide' },
      { type: 'stats' },
      { type: 'cards' },
      { type: 'note', kind: 'tip' },
    ],
  },
  'shrines.ganapathi': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'wide' },
      { type: 'stats' },
      { type: 'cards' },
    ],
  },
  'shrines.karuvur': {
    rhythm: 'stack',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'main' },
      { type: 'stats' },
      { type: 'cards' },
      { type: 'note', kind: 'did-you-know' },
    ],
  },
  'shrines.subrahmanya': {
    rhythm: 'immersive',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'wide' },
      { type: 'stats' },
      { type: 'cards', from: 0, to: 3 },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'cards', from: 3 },
      { type: 'figure', index: 2, variant: 'wide' },
    ],
  },
  'shrines.chandikeshwara': {
    rhythm: 'compact',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'compact' },
      { type: 'cards' },
      { type: 'notes', kinds: ['tip'] },
    ],
  },
  'shrines.amman': {
    rhythm: 'stack',
    beats: [
      { type: 'intro' },
      { type: 'figures', from: 0, to: 1, variant: 'duo', label: 'Amman Shrine' },
      { type: 'stats' },
      { type: 'cards' },
      { type: 'figures', from: 1, variant: 'duo', label: 'Amman idol' },
      { type: 'note', kind: 'historical-note' },
    ],
  },
  'shrines.nataraja': {
    rhythm: 'feature',
    beats: [
      { type: 'intro' },
      { type: 'figure', variant: 'wide' },
      { type: 'cards', from: 0, to: 1 },
      { type: 'figure', index: 1, variant: 'wide' },
      { type: 'cards', from: 1, to: 2 },
      { type: 'figure', index: 2, variant: 'wide' },
      { type: 'cards', from: 2 },
      { type: 'quote' },
    ],
  },
} as const satisfies Record<string, ExhibitStory>

export type ExhibitStoryKey = keyof typeof exhibitStories

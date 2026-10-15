import { templePage } from './temple'

export type TemplePartId = 'part1' | 'part2'

export const templeChapters = {
  ...templePage,

  parts: {
    part1: {
      id: 'part1' as const,
      label: 'Chapter 1',
      shortLabel: '1',
      sectionIds: ['intro', 'design-influence', 'planning', 'living'] as const,
    },
    part2: {
      id: 'part2' as const,
      label: 'Chapter 2',
      shortLabel: '2',
      sectionIds: [
        'evolution',
        'repair',
        'conservation',
        'looting',
        'kamakshi-bai',
      ] as const,
    },
  },

  bridge: {
    id: 'chapter-bridge',
    eyebrow: 'the story continues',
    title: 'Centuries of care and change',
    lead:
      'From later dynasties to restoration, conservation, and the people who defended this heritage: the next chapter follows the temple through time.',
    cta: 'Continue to Chapter 2',
  },
}

export function contentsForPart(part: TemplePartId) {
  const ids = new Set<string>(templeChapters.parts[part].sectionIds)
  if (part === 'part2') ids.add('continue')
  return templeChapters.contents.filter((item) => ids.has(item.id))
}

/** 1-based start index for Contents numbering (Part 2 continues after Part 1). */
export function contentsStartNumber(part: TemplePartId) {
  if (part === 'part1') return 1
  return templeChapters.parts.part1.sectionIds.length + 1
}

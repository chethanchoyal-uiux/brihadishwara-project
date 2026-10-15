import type { CoachStep } from '../components/CoachMarkTour'

export const templeTourSteps: CoachStep[] = [
  {
    selector: '[data-tour="temple-contents"]',
    title: 'Contents Menu',
    body: 'Quickly jump to any section without scrolling.',
    placement: 'top',
  },
]

export const templeChaptersTourSteps: CoachStep[] = [
  {
    selector: '[data-tour="temple-part-dock"]',
    title: 'Chapter 1 & Chapter 2',
    body: 'This page is divided into two chapters for easier reading. Switch between them anytime.',
    placement: 'top',
  },
  {
    selector: '[data-tour="temple-contents"]',
    title: 'Contents Menu',
    body: 'Jump directly to any section within the current chapter.',
    placement: 'top',
  },
]

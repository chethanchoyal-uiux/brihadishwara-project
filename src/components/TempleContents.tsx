import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { lockScroll, unlockScroll } from '../utils/scrollLock'
import { scrollToId } from '../utils/scrollToId'

export type ContentsItem = {
  id: string
  label: string
  /** Nested entries (e.g. topics under Accomplishments). */
  children?: ContentsItem[]
}

export type ContentsStage = {
  id: string
  label: string
  items: ContentsItem[]
  /** Map / journey stop numbers for this stage (Explore). */
  nums?: number[]
}

type Props = {
  items?: ContentsItem[]
  /** Journey stages with nested locations (Explore page). */
  stages?: ContentsStage[]
  /**
   * Active journey stop id from the page scrollspy.
   * Used when opening Contents so expansion matches the sticky journey nav.
   */
  activeIdHint?: string | null
  /** First displayed number (1-based). Defaults to 1. */
  startNumber?: number
  /** Icon-only trigger (no Contents / Close label). */
  iconOnly?: boolean
  /** Sit beside the Part 1 / Part 2 dock. */
  docked?: boolean
}

function ListIcon() {
  return (
    <svg
      className="tp-contents-list-icon"
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="2.25" cy="3.25" r="1.15" fill="currentColor" />
      <rect x="5" y="2.2" width="9.5" height="2.1" rx="1.05" fill="currentColor" />
      <circle cx="2.25" cy="8" r="1.15" fill="currentColor" />
      <rect x="5" y="6.95" width="9.5" height="2.1" rx="1.05" fill="currentColor" />
      <circle cx="2.25" cy="12.75" r="1.15" fill="currentColor" />
      <rect x="5" y="11.7" width="9.5" height="2.1" rx="1.05" fill="currentColor" />
    </svg>
  )
}

function flattenItems(items: ContentsItem[]): ContentsItem[] {
  return items.flatMap((item) => [
    { id: item.id, label: item.label },
    ...(item.children?.length ? flattenItems(item.children) : []),
  ])
}

function flattenStages(stages: ContentsStage[]): ContentsItem[] {
  return stages.flatMap((stage) => flattenItems(stage.items))
}

function itemContainsId(item: ContentsItem, itemId: string): boolean {
  if (item.id === itemId) return true
  return Boolean(item.children?.some((child) => itemContainsId(child, itemId)))
}

function stageIdForItem(
  stages: ContentsStage[] | undefined,
  itemId: string,
): string | null {
  if (!stages?.length || !itemId) return null
  return stages.find((s) => s.items.some((item) => itemContainsId(item, itemId)))?.id ?? null
}

function readPxVar(name: string, fallback: number) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!raw) return fallback
  if (raw.endsWith('rem')) {
    const rem = parseFloat(raw)
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return Number.isFinite(rem) ? rem * root : fallback
  }
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : fallback
}

function documentTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY
}

/** Same reading probe as the journey sticky nav scrollspy. */
function scrollProbeY() {
  const header = readPxVar('--header-h', 56)
  const journeyNav = readPxVar('--ex-journey-nav-h', 56)
  return window.scrollY + header + journeyNav + 24 + window.innerHeight * 0.28
}

/** Last section whose top has crossed the reading probe. */
function pickItemIdFromScroll(itemIds: string[]): string | null {
  if (!itemIds.length) return null
  const probe = scrollProbeY()
  let current: string | null = null
  for (const id of itemIds) {
    const el = document.getElementById(id)
    if (!el) continue
    if (documentTop(el) <= probe) current = id
  }
  return current
}

function formatStageNum(nums: number[] | undefined, fallbackIndex: number, startNumber: number) {
  if (!nums?.length) return String(startNumber + fallbackIndex).padStart(2, '0')
  if (nums.length === 1) return String(nums[0]).padStart(2, '0')
  const sorted = [...nums].sort((a, b) => a - b)
  const consecutive = sorted.every((n, i) => i === 0 || n === sorted[i - 1] + 1)
  if (consecutive) {
    return `${String(sorted[0]).padStart(2, '0')}–${String(sorted[sorted.length - 1]).padStart(2, '0')}`
  }
  return nums.map((n) => String(n).padStart(2, '0')).join(' & ')
}

/** Prefer the stop the sticky journey nav currently shows as active. */
function readJourneyNavActiveId(): string | null {
  const btn = document.querySelector<HTMLElement>('.ex-journey-nav-item.is-active[data-stop-id]')
  return btn?.dataset.stopId || null
}

export function TempleContents({
  items,
  stages,
  activeIdHint = null,
  startNumber = 1,
  iconOnly = false,
  docked = false,
}: Props) {
  const flatItems = useMemo(
    () => (stages?.length ? flattenStages(stages) : items ?? []),
    [stages, items],
  )
  const itemIds = useMemo(() => flatItems.map((item) => item.id), [flatItems])
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(flatItems[0]?.id ?? '')
  /** Stage expanded in the open panel — snapshotted on open; manual toggles while open. */
  const [expandedStageId, setExpandedStageId] = useState<string | null>(null)
  const panelId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const openRef = useRef(false)
  const hintRef = useRef(activeIdHint)
  openRef.current = open
  hintRef.current = activeIdHint

  const resolvedActiveId = useMemo(() => {
    if (activeIdHint && flatItems.some((item) => item.id === activeIdHint)) {
      return activeIdHint
    }
    if (activeId && flatItems.some((item) => item.id === activeId)) return activeId
    return flatItems[0]?.id || ''
  }, [activeIdHint, activeId, flatItems])

  const activeStageId = useMemo(
    () => stageIdForItem(stages, resolvedActiveId),
    [stages, resolvedActiveId],
  )

  useEffect(() => {
    if (!itemIds.length) return

    const pickActive = () => {
      if (openRef.current) return
      // While in the journey, trust the same id the sticky nav uses.
      const hint = hintRef.current
      if (hint && itemIds.includes(hint)) {
        setActiveId(hint)
        return
      }
      const id = pickItemIdFromScroll(itemIds)
      if (id) setActiveId(id)
    }

    pickActive()
    window.addEventListener('scroll', pickActive, { passive: true })
    window.addEventListener('resize', pickActive)
    window.addEventListener('ex-journey-scroll-end', pickActive)

    return () => {
      window.removeEventListener('scroll', pickActive)
      window.removeEventListener('resize', pickActive)
      window.removeEventListener('ex-journey-scroll-end', pickActive)
    }
  }, [itemIds])

  // Keep Contents in lockstep when the journey nav active stop changes.
  useEffect(() => {
    if (openRef.current) return
    if (activeIdHint && itemIds.includes(activeIdHint)) {
      setActiveId(activeIdHint)
    }
  }, [activeIdHint, itemIds])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setExpandedStageId(null)
        triggerRef.current?.focus()
      }
    }

    lockScroll()
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const first = panelRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()
  }, [open])

  const openPanel = () => {
    // Match whatever the sticky journey nav currently marks active.
    const liveId =
      readJourneyNavActiveId() ||
      (activeIdHint && itemIds.includes(activeIdHint) ? activeIdHint : null) ||
      pickItemIdFromScroll(itemIds) ||
      resolvedActiveId ||
      flatItems[0]?.id ||
      ''
    if (liveId) setActiveId(liveId)
    setExpandedStageId(stageIdForItem(stages, liveId) ?? stages?.[0]?.id ?? null)
    setOpen(true)
  }

  const closePanel = () => {
    setOpen(false)
    setExpandedStageId(null)
  }

  const goTo = (id: string) => {
    setActiveId(id)
    closePanel()
    window.setTimeout(() => scrollToId(id), 40)
  }

  return (
    <div
      className={`tp-contents${open ? ' is-open' : ''}${
        docked ? ' tp-contents--docked' : ''
      }${iconOnly ? ' tp-contents--icon' : ''}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className="tp-contents-trigger"
        data-tour="temple-contents"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close contents' : 'Open contents'}
        onClick={() => {
          if (open) closePanel()
          else openPanel()
        }}
      >
        {open ? (
          iconOnly ? (
            <span className="tp-contents-close-x" aria-hidden="true">
              ✕
            </span>
          ) : (
            <>
              <span className="tp-contents-close-x" aria-hidden="true">
                ✕
              </span>
              <span>Close</span>
            </>
          )
        ) : iconOnly ? (
          <ListIcon />
        ) : (
          <>
            <ListIcon />
            <span>Contents</span>
          </>
        )}
      </button>

      <div
        className="tp-contents-backdrop"
        hidden={!open}
        onClick={() => {
          closePanel()
          triggerRef.current?.focus()
        }}
      />

      <nav
        ref={panelRef}
        id={panelId}
        className="tp-contents-panel"
        aria-label="Page contents"
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <p className="tp-contents-eyebrow">On this page</p>
        {stages?.length ? (
          <ol className="tp-contents-stages">
            {stages.map((stage, stageIndex) => {
              const isStageActive = stage.id === activeStageId
              const isExpanded = open && expandedStageId === stage.id
              const soleItem =
                stage.items.length === 1 && !stage.items[0]?.children?.length
                  ? stage.items[0]
                  : null
              const stageNum = formatStageNum(stage.nums, stageIndex, startNumber)

              // One destination only — show as a direct link (e.g. Continue Exploring),
              // not a "Next" accordion with a single nested row.
              if (soleItem) {
                const isActive = soleItem.id === resolvedActiveId
                return (
                  <li
                    key={stage.id}
                    className={`tp-contents-stage${isStageActive ? ' is-active' : ''}`}
                  >
                    <a
                      href={`#${soleItem.id}`}
                      className={`tp-contents-link tp-contents-stage-link${
                        isActive ? ' is-active' : ''
                      }`}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        goTo(soleItem.id)
                      }}
                    >
                      <span className="tp-contents-label">{soleItem.label}</span>
                      <span className="tp-contents-num" aria-hidden="true">
                        {stageNum}
                      </span>
                    </a>
                  </li>
                )
              }

              return (
                <li
                  key={stage.id}
                  className={`tp-contents-stage${isStageActive ? ' is-active' : ''}${
                    isExpanded ? ' is-expanded' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="tp-contents-stage-toggle"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpandedStageId((prev) => (prev === stage.id ? null : stage.id))
                    }
                  >
                    <span className="tp-contents-label">{stage.label}</span>
                    <span className="tp-contents-num" aria-hidden="true">
                      {stageNum}
                    </span>
                  </button>
                  {isExpanded ? (
                    <ol className="tp-contents-list tp-contents-list--nested">
                      {stage.items.map((item) => {
                        const isActive = item.id === resolvedActiveId
                        const childActive = Boolean(
                          item.children?.some((child) =>
                            itemContainsId(child, resolvedActiveId),
                          ),
                        )
                        if (item.children?.length) {
                          return (
                            <li
                              key={item.id}
                              className={`tp-contents-group${
                                isActive || childActive ? ' is-active' : ''
                              }`}
                            >
                              <a
                                href={`#${item.id}`}
                                className={`tp-contents-link${isActive ? ' is-active' : ''}`}
                                aria-current={isActive ? 'location' : undefined}
                                onClick={(e) => {
                                  e.preventDefault()
                                  goTo(item.id)
                                }}
                              >
                                <span className="tp-contents-label">{item.label}</span>
                              </a>
                              <ol className="tp-contents-list tp-contents-list--deep">
                                {item.children.map((child) => {
                                  const isChildActive = child.id === resolvedActiveId
                                  return (
                                    <li key={child.id}>
                                      <a
                                        href={`#${child.id}`}
                                        className={`tp-contents-link${
                                          isChildActive ? ' is-active' : ''
                                        }`}
                                        aria-current={
                                          isChildActive ? 'location' : undefined
                                        }
                                        onClick={(e) => {
                                          e.preventDefault()
                                          goTo(child.id)
                                        }}
                                      >
                                        <span className="tp-contents-label">
                                          {child.label}
                                        </span>
                                      </a>
                                    </li>
                                  )
                                })}
                              </ol>
                            </li>
                          )
                        }
                        return (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={`tp-contents-link${isActive ? ' is-active' : ''}`}
                              aria-current={isActive ? 'location' : undefined}
                              onClick={(e) => {
                                e.preventDefault()
                                goTo(item.id)
                              }}
                            >
                              <span className="tp-contents-label">{item.label}</span>
                            </a>
                          </li>
                        )
                      })}
                    </ol>
                  ) : null}
                </li>
              )
            })}
          </ol>
        ) : (
          <ol className="tp-contents-list">
            {flatItems.map((item, index) => {
              const isActive = item.id === resolvedActiveId
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`tp-contents-link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      goTo(item.id)
                    }}
                  >
                    <span className="tp-contents-label">{item.label}</span>
                    <span className="tp-contents-num" aria-hidden="true">
                      {String(startNumber + index).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        )}
      </nav>
    </div>
  )
}

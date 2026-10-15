export type PartDockId = 'part1' | 'part2'

type PartOption = {
  id: PartDockId
  label: string
}

type Props = {
  activePart: PartDockId
  onChange: (part: PartDockId) => void
  parts?: PartOption[]
  ariaLabel?: string
  idPrefix?: string
}

const DEFAULT_PARTS: PartOption[] = [
  { id: 'part1', label: 'Chapter 1' },
  { id: 'part2', label: 'Chapter 2' },
]

export function TemplePartDock({
  activePart,
  onChange,
  parts = DEFAULT_PARTS,
  ariaLabel = 'Temple chapters',
  idPrefix = 'temple-part',
}: Props) {
  return (
    <nav className="tp-part-dock" data-tour="temple-part-dock" aria-label={ariaLabel}>
      <div className="tp-part-dock-inner" role="tablist" aria-orientation="horizontal">
        {parts.map((part) => {
          const selected = activePart === part.id
          return (
            <button
              key={part.id}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${part.id}`}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel-${part.id}`}
              className={`tp-part-dock-tab${selected ? ' is-active' : ''}`}
              onClick={() => onChange(part.id)}
            >
              {part.label}
            </button>
          )
        })}
        <span
          className="tp-part-dock-indicator"
          aria-hidden="true"
          data-active={activePart}
        />
      </div>
    </nav>
  )
}

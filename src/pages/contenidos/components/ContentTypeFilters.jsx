import clsx from 'clsx'

export default function ContentTypeFilters({
  copy,
  filters,
  activeType,
  onSelect,
}) {
  return (
    <section className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 pb-4">
      <span className="mr-2 text-body-sm font-medium text-outline">
        {copy.filterLabel}
      </span>
      {filters.map((filter) => {
        const isActive = activeType === filter.id

        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(filter.id)}
            className={clsx(
              'rounded-full px-3.5 py-1.5 text-label-sm transition-colors active:scale-95',
              isActive
                ? 'bg-on-surface text-surface'
                : 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container',
            )}
          >
            {filter.label} ({filter.count})
          </button>
        )
      })}
    </section>
  )
}

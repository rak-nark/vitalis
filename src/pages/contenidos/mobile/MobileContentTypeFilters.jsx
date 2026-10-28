import clsx from 'clsx'

export default function MobileContentTypeFilters({
  filters,
  activeType,
  onSelect,
}) {
  return (
    <section
      aria-label="Tipos de contenido"
      className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 py-1"
    >
      {filters.map((filter) => {
        const isActive = activeType === filter.id

        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(filter.id)}
            className={clsx(
              'shrink-0 rounded-full px-4 py-2 text-label-md whitespace-nowrap transition-all active:scale-95',
              isActive
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container',
            )}
          >
            {filter.mobileLabel} ({filter.count})
          </button>
        )
      })}
    </section>
  )
}

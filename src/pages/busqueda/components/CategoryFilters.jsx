import clsx from 'clsx'

export default function CategoryFilters({
  filters,
  activeFilter,
  onSelect,
  compact = false,
}) {
  if (compact) {
    return (
      <section className="-mx-4 px-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-0.5">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(filter.id)}
                className={clsx(
                  'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-label-md whitespace-nowrap transition-all active:scale-95',
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'border border-outline-variant/60 bg-surface-container-lowest text-on-surface-variant hover:border-outline hover:text-on-surface',
                )}
              >
                <span>{filter.mobileLabel}</span>
                <span
                  className={clsx(
                    'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                    isActive
                      ? 'bg-white/20 text-on-primary'
                      : 'bg-surface-container text-on-surface-variant',
                  )}
                >
                  {filter.count}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section
      aria-label="Categorías de contenido"
      className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id

        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(filter.id)}
            className={clsx(
              'shrink-0 rounded-xl px-4 py-2.5 text-label-lg whitespace-nowrap transition-colors active:scale-95',
              isActive
                ? 'bg-primary font-semibold text-on-primary shadow-sm'
                : 'border border-outline-variant bg-surface-container-lowest font-medium text-on-surface-variant hover:bg-surface-container-low',
            )}
          >
            {filter.label}
          </button>
        )
      })}
    </section>
  )
}

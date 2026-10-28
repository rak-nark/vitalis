import Icon from '../../../components/ui/Icon'

export default function QuickFilters({
  copy,
  groups,
  values,
  onChange,
  onReset,
  hasFilters,
  resultsCount,
}) {
  const activeCount = Object.values(values).filter(
    (value) => value !== 'any',
  ).length

  return (
    <section
      id="explorar-filtros"
      className="card-ambient flex flex-wrap items-center justify-between gap-4 rounded-xl border border-outline-variant p-4"
    >
      <div className="flex flex-wrap items-center gap-3">
        {groups.map((group) => (
          <div key={group.id} className="relative">
            <label
              htmlFor={`explorar-filtro-${group.id}`}
              className="sr-only"
            >
              {group.label}
            </label>
            <select
              id={`explorar-filtro-${group.id}`}
              value={values[group.id]}
              onChange={(event) =>
                onChange(group.id, event.target.value)
              }
              className="cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-low py-2 pr-8 pl-3 text-label-md text-on-surface transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {group.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.id === 'any'
                    ? `${group.label}: ${option.label}`
                    : option.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute top-2.5 right-2.5 text-[18px] text-outline"
            />
          </div>
        ))}

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-label-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
          >
            <Icon name="filter_alt_off" className="text-[16px]" />
            {copy.clearFilters}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 text-label-md font-semibold text-outline">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span>
          {hasFilters
            ? `${resultsCount} ${copy.matchesLabel}`
            : `${copy.libraryTotal} ${copy.availableLabel}`}
        </span>
      </div>
    </section>
  )
}

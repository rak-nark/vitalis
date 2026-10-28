import Icon from '../../../components/ui/Icon'

export default function MobileFilterPanel({
  copy,
  groups,
  values,
  onChange,
  onReset,
  hasFilters,
  resultsCount,
}) {
  return (
    <section
      id="explorar-filtros-movil"
      className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-label-lg font-bold text-on-surface">
          {copy.filtersTitle}
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-label-sm font-bold text-primary"
          >
            <Icon name="filter_alt_off" className="text-[16px]" />
            {copy.clearFilters}
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
        {groups.map((group) => (
          <div key={group.id}>
            <label
              htmlFor={`explorar-filtro-movil-${group.id}`}
              className="mb-1 block text-label-sm font-bold text-on-surface-variant"
            >
              {group.label}
            </label>
            <div className="relative">
              <select
                id={`explorar-filtro-movil-${group.id}`}
                value={values[group.id]}
                onChange={(event) =>
                  onChange(group.id, event.target.value)
                }
                className="w-full cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-low py-2 pr-8 pl-3 text-label-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              >
                {group.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon
                name="expand_more"
                className="pointer-events-none absolute top-2 right-2.5 text-[18px] text-outline"
              />
            </div>
          </div>
        ))}
      </div>

      {hasFilters && (
        <p className="mt-3 border-t border-outline-variant/30 pt-2.5 text-label-sm text-outline">
          {resultsCount} {copy.matchesLabel} en la biblioteca
        </p>
      )}
    </section>
  )
}

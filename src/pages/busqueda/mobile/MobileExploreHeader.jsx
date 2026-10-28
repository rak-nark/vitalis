import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function MobileExploreHeader({
  copy,
  query,
  onQueryChange,
  onClearQuery,
  onToggleFilters,
  isFiltersOpen,
  activeFilterCount,
}) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h1 className="min-w-0 truncate text-headline-md font-bold tracking-tight text-on-surface">
          {copy.mobileTitle}
        </h1>
        <span className="hidden shrink-0 rounded-full bg-secondary-container px-2.5 py-0.5 text-label-sm text-on-secondary-container min-[360px]:inline-flex">
          {copy.mobileCountLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="min-w-0 flex-1 text-body-sm text-on-surface-variant">
          {copy.mobileDescription}
        </p>
        <span className="shrink-0 text-label-sm font-semibold text-secondary">
          {copy.updatedLabel}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <div className="relative min-w-0 flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[20px] text-outline"
          />
          <label htmlFor="explorar-busqueda-movil" className="sr-only">
            {copy.searchLabel}
          </label>
          <input
            id="explorar-busqueda-movil"
            type="search"
            value={query}
            onChange={onQueryChange}
            placeholder={copy.mobileSearchPlaceholder}
            className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest py-2.5 pr-8 pl-9 text-body-md text-on-surface shadow-sm transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={onClearQuery}
              aria-label={copy.clearQuery}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-outline transition-transform hover:text-on-surface active:scale-90"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleFilters}
          aria-label={copy.filtersButton}
          aria-expanded={isFiltersOpen}
          aria-controls="explorar-filtros-movil"
          className={clsx(
            'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-all active:scale-95',
            isFiltersOpen
              ? 'border-primary bg-primary text-on-primary'
              : 'border-outline-variant/60 bg-surface-container-lowest text-primary hover:bg-surface-container-low',
          )}
        >
          <Icon name="tune" className="text-[22px]" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-tertiary px-1 text-[10px] font-bold text-on-tertiary">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </section>
  )
}

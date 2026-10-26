import Icon from '../../../components/ui/Icon'
import { useSearchForm } from '../hooks/useSearchForm'

export default function MobileSearch() {
  const {
    query,
    activeFilter,
    filters,
    handleQueryChange,
    handleFilterChange,
    handleSubmit,
    handleOpenFilters,
  } = useSearchForm()

  return (
    <section className="flex flex-col gap-1">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="relative flex items-center"
      >
        <Icon
          name="search"
          className="pointer-events-none absolute left-3.5 text-[20px] text-outline"
        />
        <label htmlFor="mobile-content-search" className="sr-only">
          Buscar recetas, ejercicios o artículos
        </label>
        <input
          id="mobile-content-search"
          type="search"
          value={query}
          onChange={handleQueryChange}
          placeholder="Buscar recetas, ejercicios, artículos..."
          enterKeyHint="search"
          className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest py-2.5 pr-11 pl-10 text-body-md text-on-surface shadow-sm transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Abrir filtros avanzados"
          onClick={handleOpenFilters}
          className="absolute right-2 rounded-lg p-1.5 text-outline transition-colors hover:text-primary active:scale-95"
        >
          <Icon name="tune" className="text-[20px]" />
        </button>
      </form>

      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 py-1">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id

          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleFilterChange(filter.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-label-md transition-transform active:scale-95 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'border border-surface-container-high bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {filter.mobileLabel}
            </button>
          )
        })}
      </div>
    </section>
  )
}

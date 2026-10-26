import Icon from '../../components/ui/Icon'
import { useSearchForm } from './hooks/useSearchForm'

export default function SearchSection() {
  const {
    query,
    activeFilter,
    searchInputRef,
    filters,
    handleQueryChange,
    handleFilterChange,
    handleSubmit,
    handleOpenFilters,
  } = useSearchForm({ enableShortcut: true })

  return (
    <section id="busqueda" className="space-y-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
            Inteligencia Nutricional y Fitness
          </span>
          <h2 className="text-headline-md text-on-surface">
            Explorar Contenidos y Búsqueda Rápida
          </h2>
        </div>
        <p className="max-w-md text-body-sm text-on-surface-variant">
          Filtra por tiempo disponible, restricciones dietéticas o categorías de
          bienestar mental validadas clínicamente.
        </p>
      </div>

      <form role="search" onSubmit={handleSubmit} className="relative">
        <div className="flex items-center rounded-xl border border-slate-200 bg-surface-container-lowest px-4 py-3 shadow-sm transition-all duration-150 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <Icon name="search" className="mr-3 text-2xl text-outline" />
          <label htmlFor="content-search" className="sr-only">
            Buscar contenidos saludables
          </label>
          <input
            ref={searchInputRef}
            id="content-search"
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Buscar recetas saludables, rutinas HIIT, mindfulness o guías clínicas..."
            className="w-full border-none bg-transparent p-0 text-body-lg text-on-surface placeholder:text-outline focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden rounded border border-slate-200 bg-slate-100 px-2 py-1 text-[11px] font-semibold text-outline md:inline-block">
              ⌘K
            </kbd>
            <button
              type="button"
              title="Filtros avanzados"
              aria-label="Filtros avanzados"
              onClick={handleOpenFilters}
              className="rounded-lg p-1 text-outline transition-colors hover:text-primary"
            >
              <Icon name="tune" className="text-xl" />
            </button>
          </div>
        </div>
      </form>

      <div
        role="group"
        aria-label="Filtros temáticos"
        className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id

          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleFilterChange(filter.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-label-md whitespace-nowrap transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'border border-slate-200 bg-surface-container-lowest text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {filter.icon && (
                <Icon
                  name={filter.icon}
                  className={`text-sm ${filter.iconClass}`}
                />
              )}
              {filter.label}
            </button>
          )
        })}
      </div>

      {query && (
        <p className="text-body-sm text-outline">
          Buscando <span className="font-semibold text-primary">{query}</span>
        </p>
      )}
    </section>
  )
}

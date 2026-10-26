import Icon from '../../components/ui/Icon'
import ContentCard from '../home/ContentCard'
import { useBusquedaPage } from './hooks/useBusquedaPage'

export default function Busqueda() {
  const {
    query,
    activeFilter,
    filters,
    results,
    total,
    committedQuery,
    hasFilters,
    handleQueryChange,
    handleSubmit,
    handleFilterChange,
    clearFilters,
  } = useBusquedaPage()

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-16">
      <div className="mb-6">
        <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
          Explorar
        </span>
        <h1 className="text-headline-lg-mobile tracking-tight text-on-surface sm:text-headline-lg">
          {committedQuery ? (
            <>
              Resultados para{' '}
              <span className="text-primary">“{committedQuery}”</span>
            </>
          ) : (
            'Búsqueda Avanzada'
          )}
        </h1>
        <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">
          Encuentra recetas, rutinas y guías por palabra clave o por área de
          bienestar.
        </p>
      </div>

      <section
        aria-label="Buscar contenidos"
        className="card-ambient mb-6 space-y-4 rounded-xl p-4 sm:p-5"
      >
        <form
          role="search"
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[22px] text-outline"
            />
            <label htmlFor="advanced-search" className="sr-only">
              Buscar contenidos saludables
            </label>
            <input
              id="advanced-search"
              type="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Ej. salmón, HIIT, mindfulness, sin gluten..."
              enterKeyHint="search"
              className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest py-3 pr-4 pl-11 text-body-md text-on-surface shadow-sm transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container active:scale-[0.98]"
          >
            <Icon name="search" className="text-[18px]" />
            Buscar
          </button>
        </form>

        <div
          role="group"
          aria-label="Filtros de contenidos"
          className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleFilterChange(filter.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-label-md transition-all active:scale-95 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'border border-outline-variant/50 bg-surface-container-lowest text-on-surface-variant hover:border-primary hover:text-primary'
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
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p
          aria-live="polite"
          className="text-body-sm font-semibold text-on-surface-variant"
        >
          {hasFilters
            ? `${results.length} de ${total} contenidos coinciden con tu búsqueda`
            : `${total} contenidos disponibles`}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-label-md font-bold text-primary hover:underline"
          >
            <Icon name="filter_alt_off" className="text-[16px]" />
            Limpiar búsqueda
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {results.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      ) : (
        <div className="card-ambient flex flex-col items-center rounded-xl px-6 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container text-outline">
            <Icon name="search_off" className="text-[28px]" />
          </div>
          <h2 className="text-headline-sm text-on-surface">Sin resultados</h2>
          <p className="mt-2 max-w-md text-body-md text-on-surface-variant">
            No encontramos contenidos para esta combinación. Prueba con otra
            palabra o elimina los filtros.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg font-bold text-on-primary transition-colors hover:bg-primary-container"
          >
            <Icon name="restart_alt" className="text-[18px]" />
            Reiniciar búsqueda
          </button>
        </div>
      )}
    </main>
  )
}

import Icon from '../../components/ui/Icon'
import ContentCard from '../home/ContentCard'
import { useContentsPage } from './hooks/useContentsPage'

export default function Contenidos() {
  const {
    query,
    activeFilter,
    filters,
    results,
    total,
    hasFilters,
    handleQueryChange,
    handleFilterChange,
    clearFilters,
    clearQuery,
  } = useContentsPage()

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-16">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
            Biblioteca Vitalis
          </span>
          <h1 className="text-headline-lg-mobile tracking-tight text-on-surface sm:text-headline-lg">
            Contenidos Saludables
          </h1>
          <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">
            Recetas, rutinas y guías de bienestar validadas para acompañar tu
            progreso diario.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-container px-3 py-1.5 text-label-md font-bold text-on-secondary-container">
          <Icon name="auto_awesome" className="text-[18px]" filled />
          {total} contenidos disponibles
        </span>
      </div>

      <section
        aria-label="Buscar y filtrar contenidos"
        className="card-ambient mb-6 space-y-4 rounded-xl p-4 sm:p-5"
      >
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[22px] text-outline"
          />
          <label htmlFor="contents-search" className="sr-only">
            Buscar contenidos saludables
          </label>
          <input
            id="contents-search"
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Buscar por receta, rutina, objetivo o categoría..."
            className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest py-3 pr-11 pl-11 text-body-md text-on-surface shadow-sm transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              aria-label="Limpiar búsqueda"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1.5 text-outline transition-colors hover:bg-surface-container hover:text-on-surface"
            >
              <Icon name="close" className="text-[18px]" />
            </button>
          )}
        </div>

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
          Mostrando {results.length} de {total} contenidos
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-label-md font-bold text-primary hover:underline"
          >
            <Icon name="filter_alt_off" className="text-[16px]" />
            Limpiar filtros
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
          <h2 className="text-headline-sm text-on-surface">
            No encontramos contenidos
          </h2>
          <p className="mt-2 max-w-md text-body-md text-on-surface-variant">
            Prueba con otra palabra clave o selecciona un área diferente de la
            biblioteca.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg font-bold text-on-primary transition-colors hover:bg-primary-container"
          >
            <Icon name="restart_alt" className="text-[18px]" />
            Ver todos los contenidos
          </button>
        </div>
      )}
    </main>
  )
}

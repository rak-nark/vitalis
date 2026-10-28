import { useEffect, useRef } from 'react'
import Icon from '../../../components/ui/Icon'

export default function DesktopSearch({
  copy,
  query,
  onQueryChange,
  onClearQuery,
  recentSearches,
  onSelectSuggestion,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleOpenAdvancedFilters = () => {
    document
      .getElementById('explorar-filtros')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="space-y-3">
      <div className="card-ambient rounded-xl border border-outline-variant p-2.5 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center pl-3 text-outline">
            <Icon name="search" className="text-[24px]" />
          </div>
          <label htmlFor="explorar-busqueda-desktop" className="sr-only">
            {copy.searchLabel}
          </label>
          <input
            id="explorar-busqueda-desktop"
            ref={inputRef}
            type="search"
            value={query}
            onChange={onQueryChange}
            placeholder={copy.searchPlaceholder}
            className="w-full border-0 bg-transparent p-0 text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none"
          />
          <div className="flex items-center gap-2 pr-1">
            {query ? (
              <button
                type="button"
                onClick={onClearQuery}
                aria-label={copy.clearQuery}
                className="rounded-full p-1.5 text-outline transition-colors hover:bg-surface-container hover:text-on-surface active:scale-90"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            ) : (
              <span className="hidden items-center rounded border border-outline-variant bg-surface-container-low px-2 py-1 font-mono text-label-sm text-outline sm:inline-flex">
                ⌘K
              </span>
            )}
            <button
              type="button"
              onClick={handleOpenAdvancedFilters}
              className="flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
            >
              <Icon name="tune" className="text-[18px]" />
              <span className="font-semibold">{copy.filtersButton}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-label-sm text-outline">
          <Icon name="history" className="text-[14px]" />
          {copy.recentLabel}
        </span>
        {recentSearches.map((search) => (
          <button
            key={search.id}
            type="button"
            onClick={() => onSelectSuggestion(search)}
            className="inline-flex items-center gap-1 rounded-full bg-surface-container-low px-2.5 py-1 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          >
            {search.label}
          </button>
        ))}
      </div>
    </section>
  )
}

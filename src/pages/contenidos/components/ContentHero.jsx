import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function ContentHero({
  copy,
  total,
  query,
  searchInputRef,
  onQueryChange,
  onClearQuery,
  onSubmit,
  sort,
  sortOptions,
  onSortChange,
  view,
  onViewChange,
}) {
  return (
    <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
      <div className="max-w-2xl space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-headline-lg font-bold tracking-tight text-on-surface">
            {copy.title}
          </h1>
          <span className="rounded-full border border-secondary/20 bg-secondary-container/50 px-3 py-1 text-label-sm font-bold text-on-secondary-container">
            {total} {copy.availableLabel}
          </span>
        </div>
        <p className="text-body-lg text-on-surface-variant">
          {copy.description}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:shrink-0">
        <form
          role="search"
          onSubmit={onSubmit}
          className="relative w-full sm:w-64 xl:w-80"
        >
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[20px] text-outline"
          />
          <label htmlFor="contenidos-busqueda" className="sr-only">
            {copy.searchLabel}
          </label>
          <input
            ref={searchInputRef}
            id="contenidos-busqueda"
            type="search"
            value={query}
            onChange={onQueryChange}
            placeholder={copy.searchPlaceholder}
            enterKeyHint="search"
            className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest py-2 pr-16 pl-10 text-body-md text-on-surface shadow-sm transition-all placeholder:text-outline/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={onClearQuery}
              aria-label={copy.clearQuery}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-outline transition-colors hover:bg-surface-container hover:text-on-surface active:scale-90"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border border-outline-variant/40 bg-surface-container px-1.5 py-0.5 text-[10px] font-semibold text-outline">
              {copy.shortcut}
            </kbd>
          )}
        </form>

        <label className="relative shrink-0">
          <span className="sr-only">{copy.sortLabel}</span>
          <select
            value={sort}
            onChange={onSortChange}
            className="w-full appearance-none rounded-lg border border-outline-variant/60 bg-surface-container-lowest py-2 pr-8 pl-3.5 text-label-md text-on-surface shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon
            name="expand_more"
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[18px] text-outline"
          />
        </label>

        <div
          role="group"
          aria-label="Vista de contenidos"
          className="flex shrink-0 items-center rounded-lg border border-outline-variant/40 bg-surface-container-low p-1"
        >
          <button
            type="button"
            aria-label={copy.gridViewLabel}
            aria-pressed={view === 'grid'}
            onClick={() => onViewChange('grid')}
            className={clsx(
              'rounded-md p-1.5 transition-colors',
              view === 'grid'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface',
            )}
          >
            <Icon name="grid_view" className="text-[18px]" />
          </button>
          <button
            type="button"
            aria-label={copy.listViewLabel}
            aria-pressed={view === 'list'}
            onClick={() => onViewChange('list')}
            className={clsx(
              'rounded-md p-1.5 transition-colors',
              view === 'list'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface',
            )}
          >
            <Icon name="view_list" className="text-[18px]" />
          </button>
        </div>
      </div>
    </header>
  )
}

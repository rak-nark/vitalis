import Icon from '../../../components/ui/Icon'

export default function MobileContentToolbar({
  copy,
  query,
  searchInputRef,
  onQueryChange,
  onClearQuery,
  onSubmit,
  sort,
  sortOptions,
  onSortChange,
}) {
  return (
    <section className="flex items-center gap-2.5">
      <form
        role="search"
        onSubmit={onSubmit}
        className="relative min-w-0 flex-1"
      >
        <Icon
          name="search"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[18px] text-outline"
        />
        <label htmlFor="contenidos-busqueda-movil" className="sr-only">
          {copy.searchLabel}
        </label>
        <input
          ref={searchInputRef}
          id="contenidos-busqueda-movil"
          type="search"
          value={query}
          onChange={onQueryChange}
          placeholder={copy.mobileSearchPlaceholder}
          enterKeyHint="search"
          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest py-2 pr-8 pl-9 text-body-md text-on-surface shadow-sm transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={onClearQuery}
            aria-label={copy.clearQuery}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-0.5 text-outline transition-colors hover:text-on-surface active:scale-90"
          >
            <Icon name="close" className="text-[16px]" />
          </button>
        )}
      </form>

      <label className="relative flex shrink-0 items-center gap-1.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-label-md text-on-surface-variant shadow-sm">
        <Icon name="swap_vert" className="text-[16px] text-primary" />
        <span className="sr-only">{copy.sortLabel}</span>
        <select
          value={sort}
          onChange={onSortChange}
          aria-label={copy.sortLabel}
          className="max-w-[92px] appearance-none bg-transparent pr-2 font-semibold text-on-surface-variant focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.mobileLabel}
            </option>
          ))}
        </select>
        <Icon
          name="expand_more"
          className="pointer-events-none absolute right-1.5 text-[14px] text-outline"
        />
      </label>
    </section>
  )
}

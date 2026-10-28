export default function ContentPagination({
  copy,
  resultsCount,
  collectionTotal,
  hasFilters,
  onPageChange,
}) {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/20 pt-6 pb-12 text-body-sm text-outline sm:flex-row">
      <div aria-live="polite">
        {copy.resultsPrefix}{' '}
        <span className="font-semibold text-on-surface">{resultsCount}</span>{' '}
        {copy.resultsMiddle}{' '}
        <span className="font-semibold text-on-surface">{collectionTotal}</span>{' '}
        {hasFilters ? copy.filteredResultsSuffix : copy.resultsSuffix}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-lg border border-outline-variant/30 px-3 py-1.5 text-label-md text-outline/50"
        >
          {copy.previousPage}
        </button>
        <button
          type="button"
          aria-current="page"
          onClick={onPageChange}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-label-md font-semibold text-on-primary"
        >
          1
        </button>
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-lg border border-outline-variant/30 px-3 py-1.5 text-label-md text-outline/50"
        >
          {copy.nextPage}
        </button>
      </div>
    </footer>
  )
}

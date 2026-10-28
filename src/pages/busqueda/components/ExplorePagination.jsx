import Icon from '../../../components/ui/Icon'

const pages = [1, 2, 3, 'ellipsis', 24]

export default function ExplorePagination({
  copy,
  isLoadingMore,
  onLoadMore,
  onPageChange,
}) {
  return (
    <section className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant py-8 sm:flex-row">
      <div className="flex flex-wrap items-center gap-2 text-body-sm text-outline">
        <span>
          {copy.pageLabel} <strong>1</strong> {copy.pageOf}{' '}
          <strong>24</strong>
        </span>
        <span className="text-outline-variant">•</span>
        <span>{copy.pageTotal}</span>
      </div>

      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoadingMore}
        aria-busy={isLoadingMore}
        className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-label-lg font-semibold text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary active:scale-95 disabled:cursor-wait disabled:opacity-70"
      >
        <Icon
          name={isLoadingMore ? 'progress_activity' : 'refresh'}
          className={`text-[20px] ${isLoadingMore ? 'animate-spin' : ''}`}
        />
        <span>{isLoadingMore ? copy.loadingMore : copy.loadMore}</span>
      </button>

      <div className="flex items-center gap-1 text-label-md">
        <button
          type="button"
          disabled
          aria-label="Página anterior"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant text-outline disabled:cursor-not-allowed"
        >
          <Icon name="chevron_left" className="text-[18px]" />
        </button>

        {pages.map((page) =>
          page === 'ellipsis' ? (
            <span key="ellipsis" className="px-1 text-outline">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === 1 ? 'page' : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                page === 1
                  ? 'bg-primary font-bold text-on-primary shadow-sm'
                  : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(2)}
          aria-label="Página siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-low"
        >
          <Icon name="chevron_right" className="text-[18px]" />
        </button>
      </div>
    </section>
  )
}

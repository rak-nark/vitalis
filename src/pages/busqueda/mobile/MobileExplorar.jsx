import Icon from '../../../components/ui/Icon'
import CategoryFilters from '../components/CategoryFilters'
import ExploreEmptyState from '../components/ExploreEmptyState'
import TrendingTopics from '../components/TrendingTopics'
import MobileExploreCard from './MobileExploreCard'
import MobileExploreHeader from './MobileExploreHeader'
import MobileFeaturedGuide from './MobileFeaturedGuide'
import MobileFilterPanel from './MobileFilterPanel'

export default function MobileExplorar({ explore }) {
  const {
    copy,
    featured,
    filters,
    trends,
    quickFilterGroups,
    results,
    totalLibrary,
    query,
    activeFilter,
    quickFilters,
    activeFilterCount,
    hasFilters,
    isMobileFiltersOpen,
    isLoadingMore,
    isFeaturedSaved,
    isFavorite,
    handleQueryChange,
    handleClearQuery,
    handleFilterChange,
    handleQuickFilterChange,
    handleResetFilters,
    handleSearchSuggestion,
    handleToggleMobileFilters,
    handleToggleFavorite,
    handleOpenContent,
    handleOpenFeatured,
    handleToggleFeaturedSaved,
    handleLoadMore,
  } = explore

  const handleResultsFilters = () => {
    if (!isMobileFiltersOpen) {
      handleToggleMobileFilters()
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 pt-20 pb-28">
      <MobileExploreHeader
        copy={copy}
        query={query}
        onQueryChange={handleQueryChange}
        onClearQuery={handleClearQuery}
        onToggleFilters={handleToggleMobileFilters}
        isFiltersOpen={isMobileFiltersOpen}
        activeFilterCount={activeFilterCount}
      />

      {isMobileFiltersOpen && (
        <MobileFilterPanel
          copy={copy}
          groups={quickFilterGroups}
          values={quickFilters}
          onChange={handleQuickFilterChange}
          onReset={handleResetFilters}
          hasFilters={hasFilters}
          resultsCount={results.length}
        />
      )}

      <TrendingTopics
        copy={copy}
        trends={trends}
        onSelect={handleSearchSuggestion}
        compact
      />

      <CategoryFilters
        filters={filters}
        activeFilter={activeFilter}
        onSelect={handleFilterChange}
        compact
      />

      <MobileFeaturedGuide
        featured={featured}
        onRead={handleOpenFeatured}
        isSaved={isFeaturedSaved}
        onToggleSaved={handleToggleFeaturedSaved}
      />

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-headline-sm font-bold text-on-surface">
              {copy.mobileResultsTitle}
            </h2>
            <p aria-live="polite" className="text-label-sm text-outline">
              {copy.resultsPrefix} {results.length} {copy.resultsSuffix}{' '}
              {totalLibrary}
            </p>
          </div>
          <button
            type="button"
            onClick={handleResultsFilters}
            className="flex shrink-0 items-center gap-1 pb-0.5 text-body-sm font-semibold text-secondary transition-colors hover:text-primary"
          >
            {copy.filtersActiveLabel}
            {activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            <Icon name="tune" className="text-[16px]" />
          </button>
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between gap-2 rounded-lg border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-label-sm text-on-surface-variant">
            <span className="min-w-0 truncate">
              Filtros activos sobre la biblioteca.
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="shrink-0 font-bold text-primary hover:underline"
            >
              {copy.clearFilters}
            </button>
          </div>
        )}

        {results.length > 0 ? (
          <div className="flex flex-col gap-4">
            {results.map((content) => (
              <MobileExploreCard
                key={content.id}
                content={content}
                favorite={isFavorite(content.id)}
                onToggleFavorite={handleToggleFavorite}
                onOpen={handleOpenContent}
              />
            ))}
          </div>
        ) : (
          <ExploreEmptyState copy={copy} onReset={handleResetFilters} />
        )}

        <button
          type="button"
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          aria-busy={isLoadingMore}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-3 text-label-lg font-semibold text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary active:scale-95 disabled:cursor-wait disabled:opacity-70"
        >
          <Icon
            name={isLoadingMore ? 'progress_activity' : 'refresh'}
            className={`text-[20px] ${isLoadingMore ? 'animate-spin' : ''}`}
          />
          <span>
            {isLoadingMore ? copy.loadingMore : copy.mobileLoadMore}
          </span>
        </button>
      </section>
    </main>
  )
}

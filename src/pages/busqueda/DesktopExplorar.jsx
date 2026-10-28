import Icon from '../../components/ui/Icon'
import CategoryFilters from './components/CategoryFilters'
import DesktopSearch from './components/DesktopSearch'
import ExploreContentCard from './components/ExploreContentCard'
import ExploreEmptyState from './components/ExploreEmptyState'
import ExploreHeader from './components/ExploreHeader'
import ExplorePagination from './components/ExplorePagination'
import FeaturedGuide from './components/FeaturedGuide'
import QuickFilters from './components/QuickFilters'
import TrendingTopics from './components/TrendingTopics'

export default function DesktopExplorar({ explore }) {
  const {
    copy,
    featured,
    filters,
    trends,
    recentSearches,
    quickFilterGroups,
    results,
    totalLibrary,
    query,
    activeFilter,
    quickFilters,
    hasFilters,
    isLoadingMore,
    isFeaturedSaved,
    isFavorite,
    handleQueryChange,
    handleClearQuery,
    handleFilterChange,
    handleQuickFilterChange,
    handleResetFilters,
    handleSearchSuggestion,
    handleToggleFavorite,
    handleOpenContent,
    handleOpenFeatured,
    handleToggleFeaturedSaved,
    handlePageChange,
    handleLoadMore,
  } = explore

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <ExploreHeader copy={copy} />

      <DesktopSearch
        copy={copy}
        query={query}
        onQueryChange={handleQueryChange}
        onClearQuery={handleClearQuery}
        recentSearches={recentSearches}
        onSelectSuggestion={handleSearchSuggestion}
      />

      <TrendingTopics
        copy={copy}
        trends={trends}
        onSelect={handleSearchSuggestion}
      />

      <CategoryFilters
        filters={filters}
        activeFilter={activeFilter}
        onSelect={handleFilterChange}
      />

      <QuickFilters
        copy={copy}
        groups={quickFilterGroups}
        values={quickFilters}
        onChange={handleQuickFilterChange}
        onReset={handleResetFilters}
        hasFilters={hasFilters}
        resultsCount={results.length}
      />

      <FeaturedGuide
        featured={featured}
        onRead={handleOpenFeatured}
        isSaved={isFeaturedSaved}
        onToggleSaved={handleToggleFeaturedSaved}
      />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-headline-md font-bold text-on-surface">
            {copy.resultsTitle}
          </h2>
          <span
            aria-live="polite"
            className="text-label-md text-outline"
          >
            {copy.resultsPrefix} {results.length} {copy.resultsSuffix}{' '}
            {totalLibrary}
          </span>
        </div>

        {hasFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-outline-variant/50 bg-surface-container-low px-3 py-2 text-body-sm text-on-surface-variant">
            <span>
              Filtros activos sobre la biblioteca clínica de Vitalis.
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-label-sm font-bold text-primary hover:underline"
            >
              <Icon name="filter_alt_off" className="text-[16px]" />
              {copy.clearFilters}
            </button>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((content) => (
              <ExploreContentCard
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
      </section>

      <ExplorePagination
        copy={copy}
        isLoadingMore={isLoadingMore}
        onLoadMore={handleLoadMore}
        onPageChange={handlePageChange}
      />
    </main>
  )
}

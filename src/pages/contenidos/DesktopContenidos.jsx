import ContentCollections from './components/ContentCollections'
import ContentEmptyState from './components/ContentEmptyState'
import ContentHero from './components/ContentHero'
import ContentLibraryCard from './components/ContentLibraryCard'
import ContentPagination from './components/ContentPagination'
import ContentTypeFilters from './components/ContentTypeFilters'

export default function DesktopContenidos({ contenidos }) {
  const {
    copy,
    sortOptions,
    typeFilters,
    collections,
    results,
    total,
    collectionTotal,
    query,
    activeType,
    activeCollection,
    sort,
    view,
    hasFilters,
    searchInputRef,
    isFavorite,
    handleQueryChange,
    handleSubmit,
    handleClearQuery,
    handleTypeChange,
    handleCollectionChange,
    handleSortChange,
    handleViewChange,
    handleResetFilters,
    handleToggleFavorite,
    handleOpenContent,
    handleAction,
    handleCreateCollection,
    handleManageCollections,
    handlePageChange,
  } = contenidos

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <ContentHero
        copy={copy}
        total={total}
        query={query}
        searchInputRef={searchInputRef}
        onQueryChange={handleQueryChange}
        onClearQuery={handleClearQuery}
        onSubmit={handleSubmit}
        sort={sort}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
        view={view}
        onViewChange={handleViewChange}
      />

      <ContentCollections
        copy={copy}
        collections={collections}
        activeCollection={activeCollection}
        onSelect={handleCollectionChange}
        onManage={handleManageCollections}
        onCreate={handleCreateCollection}
      />

      <ContentTypeFilters
        copy={copy}
        filters={typeFilters}
        activeType={activeType}
        onSelect={handleTypeChange}
      />

      {results.length > 0 ? (
        <div
          className={
            view === 'grid'
              ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col gap-4'
          }
        >
          {results.map((content) => (
            <ContentLibraryCard
              key={content.id}
              content={content}
              favorite={isFavorite(content.id)}
              onToggleFavorite={handleToggleFavorite}
              onOpen={handleOpenContent}
              onAction={handleAction}
              view={view}
            />
          ))}
        </div>
      ) : (
        <ContentEmptyState copy={copy} onReset={handleResetFilters} />
      )}

      <ContentPagination
        copy={copy}
        resultsCount={results.length}
        collectionTotal={collectionTotal}
        hasFilters={hasFilters}
        onPageChange={handlePageChange}
      />
    </main>
  )
}

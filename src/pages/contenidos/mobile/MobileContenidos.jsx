import Icon from '../../../components/ui/Icon'
import { contentPresentation } from '../../../data/contenidosPageData'
import ContentEmptyState from '../components/ContentEmptyState'
import MobileContentHeader from './MobileContentHeader'
import MobileContentToolbar from './MobileContentToolbar'
import MobileContentTypeFilters from './MobileContentTypeFilters'
import MobileLibraryCard from './MobileLibraryCard'
import MobileNewCollectionCta from './MobileNewCollectionCta'

export default function MobileContenidos({ contenidos }) {
  const {
    copy,
    sortOptions,
    typeFilters,
    collections,
    results,
    total,
    query,
    activeType,
    activeCollection,
    sort,
    searchInputRef,
    isFavorite,
    handleQueryChange,
    handleSubmit,
    handleClearQuery,
    handleTypeChange,
    handleCollectionChange,
    handleSortChange,
    handleResetFilters,
    handleToggleFavorite,
    handleOpenContent,
    handleAction,
    handleCreateCollection,
  } = contenidos

  const activeCollectionData = collections.find(
    (collection) => collection.id === activeCollection,
  )

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 pt-20 pb-28">
      <MobileContentHeader copy={copy} total={total} />

      {activeCollection !== 'all' && activeCollectionData && (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-primary/20 bg-secondary-container/40 px-3 py-2 text-label-sm text-on-secondary-container">
          <span className="flex min-w-0 items-center gap-1.5">
            <Icon name={activeCollectionData.icon} className="text-[16px]" />
            <span className="truncate">
              {copy.collectionPrefix} {activeCollectionData.label}
            </span>
          </span>
          <button
            type="button"
            onClick={() => handleCollectionChange('all')}
            className="shrink-0 font-semibold text-primary hover:underline"
          >
            {copy.clearCollection}
          </button>
        </div>
      )}

      <MobileContentTypeFilters
        filters={typeFilters}
        activeType={activeType}
        onSelect={handleTypeChange}
      />

      <MobileContentToolbar
        copy={copy}
        query={query}
        searchInputRef={searchInputRef}
        onQueryChange={handleQueryChange}
        onClearQuery={handleClearQuery}
        onSubmit={handleSubmit}
        sort={sort}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
      />

      <section className="space-y-4 pt-1">
        {results.length > 0 ? (
          results.map((content) => (
            <MobileLibraryCard
              key={content.id}
              content={content}
              presentation={contentPresentation[content.id] ?? {}}
              favorite={isFavorite(content.id)}
              onToggleFavorite={handleToggleFavorite}
              onOpen={handleOpenContent}
              onAction={handleAction}
              copy={copy}
            />
          ))
        ) : (
          <ContentEmptyState copy={copy} onReset={handleResetFilters} />
        )}
      </section>

      <MobileNewCollectionCta
        label={copy.newCollection}
        onCreate={handleCreateCollection}
      />
    </main>
  )
}

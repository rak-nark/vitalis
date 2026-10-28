import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ContentDetailModal from '../../../components/ui/ContentDetailModal'
import CreateCollectionModal from '../../../components/ui/CreateCollectionModal'
import Icon from '../../../components/ui/Icon'
import { useFavorites } from '../../../context/hooks/useFavorites'
import { contentCategoryFilters } from '../../../data/favoritesCollectionsData'
import { matchesContentQuery } from '../../../utils/content'

export default function MobileSavedContents({ contents, copy }) {
  const {
    toggleFavorite,
    createCollection,
    scheduleItem,
    isScheduled,
  } = useFavorites()

  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeDetailContent, setActiveDetailContent] = useState(null)

  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      if (activeCategory !== 'all' && item.type !== activeCategory) {
        return false
      }
      return matchesContentQuery(item, searchQuery)
    })
  }, [contents, activeCategory, searchQuery])

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="favorite" className="text-primary" filled />
          <h2 className="text-headline-sm font-bold text-on-surface">
            {copy.savedTitle}
          </h2>
          <span className="rounded-full bg-secondary-container px-2 py-0.5 text-label-sm font-bold text-on-secondary-container">
            {contents.length}
          </span>
        </div>
        <Link
          to="/contenidos"
          className="flex shrink-0 items-center text-label-md font-bold text-primary hover:underline"
        >
          {copy.savedLinkLabel}
          <Icon name="chevron_right" className="text-[16px]" />
        </Link>
      </div>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 py-1 no-scrollbar">
        {contentCategoryFilters.map((cat) => {
          const isActive = activeCategory === cat.id
          const count =
            cat.id === 'all'
              ? contents.length
              : contents.filter((c) => c.type === cat.id).length

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-label-sm font-bold transition-all active:scale-95 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-xs'
                  : 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant'
              }`}
            >
              {cat.mobileLabel ?? cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar en tus favoritos..."
          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest py-2 pr-3 pl-9 text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-xs"
        />
      </div>

      {/* Cards List */}
      {filteredContents.length > 0 ? (
        <div className="space-y-3.5 pt-1">
          {filteredContents.map((content) => {
            const scheduled = isScheduled(content.id)

            return (
              <article
                key={content.id}
                className="ambient-card rounded-xl border border-outline-variant/20 p-3.5 transition-all"
              >
                {content.image && (
                  <div className="relative mb-2.5 h-36 w-full overflow-hidden rounded-lg">
                    <img
                      src={content.image}
                      alt={content.imageAlt || content.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <div className="absolute top-2 left-2">
                      <span className="rounded-full bg-surface-container-lowest/90 px-2 py-0.5 text-label-sm font-semibold text-primary backdrop-blur-sm">
                        {content.badge || 'Nutrición Celular'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(content.id)}
                      title="Quitar de favoritos"
                      className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-lowest/90 text-primary shadow-xs backdrop-blur-sm active:scale-90"
                    >
                      <Icon name="favorite" className="text-[16px]" filled />
                    </button>

                    <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-[11px] font-semibold">
                      <span className="flex items-center gap-0.5">
                        <Icon name="schedule" className="text-[12px]" />
                        {content.duration || content.meta || '20 min'}
                      </span>
                      {content.secondaryMeta && (
                        <span>• {content.secondaryMeta}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-label-lg font-bold text-on-surface leading-snug">
                      {content.title}
                    </h3>
                    <p className="mt-0.5 text-body-sm text-on-surface-variant line-clamp-2">
                      {content.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-outline-variant/15 pt-2.5">
                  <button
                    type="button"
                    onClick={() => scheduleItem(content.id, content.title)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-label-sm font-medium transition-colors ${
                      scheduled
                        ? 'bg-secondary-container text-on-secondary-container font-bold'
                        : 'text-outline hover:text-primary'
                    }`}
                  >
                    <Icon
                      name={scheduled ? 'event_available' : 'calendar_add_on'}
                      className="text-[15px]"
                      filled={scheduled}
                    />
                    <span>{scheduled ? 'Agendado' : 'Plan semanal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDetailContent(content)}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary-container px-3 py-1.5 text-label-sm font-bold text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
                  >
                    <span>{content.cta || 'Ver'}</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </button>
                </div>
              </article>
            )
          })}

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-surface-container-lowest px-4 py-2 text-label-md font-bold text-primary shadow-xs active:scale-95 transition-all"
            >
              <Icon name="bookmark_add" className="text-[16px]" />
              <span>+ Nueva Colección</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-outline-variant/70 bg-surface-container-lowest/60 px-4 py-8 text-center">
          <Icon name="search_off" className="text-[26px] text-outline" />
          <h3 className="text-label-lg font-bold text-on-surface">
            Sin resultados
          </h3>
          <p className="text-body-sm text-on-surface-variant">
            No encontramos contenidos con los filtros seleccionados.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all')
              setSearchQuery('')
            }}
            className="mt-1 text-label-sm font-bold text-primary underline"
          >
            Ver todos los favoritos
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(name) => createCollection(name)}
      />

      <ContentDetailModal
        isOpen={Boolean(activeDetailContent)}
        content={activeDetailContent}
        onClose={() => setActiveDetailContent(null)}
      />
    </section>
  )
}

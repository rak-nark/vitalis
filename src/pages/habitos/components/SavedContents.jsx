import { useMemo, useState } from 'react'
import ContentDetailModal from '../../../components/ui/ContentDetailModal'
import ContentNoteModal from '../../../components/ui/ContentNoteModal'
import CreateCollectionModal from '../../../components/ui/CreateCollectionModal'
import Icon from '../../../components/ui/Icon'
import { useFavorites } from '../../../context/hooks/useFavorites'
import { contentPopularity } from '../../../data/contenidosPageData'
import {
  contentCategoryFilters,
  sortOptions,
} from '../../../data/favoritesCollectionsData'
import { matchesContentQuery } from '../../../utils/content'

export default function SavedContents({ contents, copy }) {
  const {
    toggleFavorite,
    collections,
    createCollection,
    itemCollections,
    scheduleItem,
    isScheduled,
    feedback,
    dismissFeedback,
  } = useFavorites()

  const [activeCollection, setActiveCollection] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState('grid')

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeNoteContent, setActiveNoteContent] = useState(null)
  const [activeDetailContent, setActiveDetailContent] = useState(null)
  const [notes, setNotes] = useState({})

  // Filtering & Sorting
  const filteredContents = useMemo(() => {
    return contents
      .filter((item) => {
        // Collection filter
        if (activeCollection !== 'all') {
          const itemCol = itemCollections[item.id]
          if (itemCol !== activeCollection) return false
        }

        // Category / Type filter
        if (activeCategory !== 'all' && item.type !== activeCategory) {
          return false
        }

        // Search query
        if (!matchesContentQuery(item, searchQuery)) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'duration') {
          const durA = parseInt(a.meta || a.duration || '0', 10)
          const durB = parseInt(b.meta || b.duration || '0', 10)
          return durA - durB
        }
        if (sortBy === 'popularity') {
          return (
            (contentPopularity[b.id] ?? 0) - (contentPopularity[a.id] ?? 0)
          )
        }
        return 0 // recent: keep order
      })
  }, [contents, activeCollection, activeCategory, searchQuery, sortBy, itemCollections])

  const handleSaveNote = (contentId, noteText) => {
    setNotes((prev) => ({ ...prev, [contentId]: noteText }))
  }

  return (
    <section className="space-y-6">
      {/* Feedback Toast */}
      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl bg-on-surface px-4 py-3 text-surface shadow-xl border border-outline-variant/30 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <Icon
            name={feedback.type === 'success' ? 'check_circle' : 'info'}
            className="text-[20px] text-secondary"
            filled
          />
          <span className="text-body-sm font-semibold">{feedback.message}</span>
          <button
            type="button"
            onClick={dismissFeedback}
            className="rounded-full p-1 text-outline hover:text-surface transition-colors"
            aria-label="Cerrar notificación"
          >
            <Icon name="close" className="text-[16px]" />
          </button>
        </div>
      )}

      {/* Top Header & Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="favorite" className="text-primary" filled />
            <h2 className="text-headline-md font-bold text-on-surface">
              {copy.savedTitle}
            </h2>
            <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-label-sm font-bold text-on-secondary-container">
              {contents.length} guardados
            </span>
          </div>
          <p className="mt-1 text-body-sm text-on-surface-variant max-w-2xl">
            {copy.savedDescription}
          </p>
        </div>

        {/* Global Search & Display Tools */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-64 sm:w-72">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por ingrediente, autor o rutina..."
              className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest py-2 pr-9 pl-9 text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Ordenar favoritos"
              className="appearance-none rounded-lg border border-outline-variant/60 bg-surface-container-lowest py-2 pr-8 pl-3 text-label-md text-on-surface hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-outline"
            />
          </div>

          <div className="flex items-center rounded-lg border border-outline-variant/40 bg-surface-container-low p-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
              title="Vista en Cuadrícula"
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="grid_view" className="text-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
              title="Vista en Lista"
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="view_list" className="text-[18px]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-label-md font-bold text-on-primary hover:bg-primary-container active:scale-95 transition-all shadow-sm"
          >
            <Icon name="create_new_folder" className="text-[18px]" />
            <span>+ Crear Colección</span>
          </button>
        </div>
      </div>

      {/* Horizontal Collections Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-label-sm font-bold text-outline uppercase tracking-wider">
          <span>Colecciones Organizadas</span>
          <span className="text-body-sm normal-case font-normal text-on-surface-variant">
            {collections.filter((collection) => collection.id !== 'all').length}{' '}
            colecciones
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {collections.map((col) => {
            const isActive = activeCollection === col.id
            const count =
              col.id === 'all'
                ? contents.length
                : contents.filter((c) => itemCollections[c.id] === col.id).length

            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setActiveCollection(col.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-label-md transition-all active:scale-95 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'border border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                <Icon
                  name={col.icon || 'folder'}
                  className={`text-[18px] ${isActive ? 'text-on-primary' : col.iconClass || 'text-primary'}`}
                  filled={isActive}
                />
                <span>{col.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-label-sm ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-container-high text-on-surface-variant font-bold'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-xl border border-dashed border-primary/50 px-3.5 py-2 text-label-md font-semibold text-primary hover:bg-secondary-container/20 transition-colors"
          >
            <Icon name="add" className="text-[18px]" />
            <span>Nueva Colección</span>
          </button>
        </div>
      </div>

      {/* Content Type Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 pb-3">
        <span className="text-body-sm font-medium text-outline mr-1">
          Filtrar por:
        </span>
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
              className={`rounded-full px-3.5 py-1 text-label-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-on-surface text-surface'
                  : 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Grid or List of Saved Items */}
      {filteredContents.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {filteredContents.map((content) => {
            const hasNote = Boolean(notes[content.id])
            const scheduled = isScheduled(content.id)

            return (
              <article
                key={content.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div>
                  {/* Image & Overlay */}
                  {content.image && (
                    <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl bg-surface-container">
                      <img
                        src={content.image}
                        alt={content.imageAlt || content.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute top-2.5 left-2.5">
                        <span className="rounded-full bg-surface-container-lowest/90 px-2.5 py-0.5 text-label-sm font-bold text-primary shadow-xs backdrop-blur-sm">
                          {content.badge || 'Longevidad'}
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(content.id)}
                          title="Guardado en favoritos"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/90 text-primary shadow-xs backdrop-blur-sm transition-transform hover:scale-110 active:scale-90"
                        >
                          <Icon name="favorite" className="text-[18px]" filled />
                        </button>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 text-white text-label-sm font-semibold">
                        <span className="flex items-center gap-1 rounded bg-black/40 px-2 py-0.5 backdrop-blur-sm">
                          <Icon name="schedule" className="text-[14px]" />
                          {content.duration || content.meta || '20 min'}
                        </span>
                        {content.secondaryMeta && (
                          <span className="flex items-center gap-1 rounded bg-black/40 px-2 py-0.5 backdrop-blur-sm">
                            <Icon
                              name="local_fire_department"
                              className="text-[14px]"
                            />
                            {content.secondaryMeta}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-headline-sm font-bold text-on-surface transition-colors group-hover:text-primary">
                      {content.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-body-sm text-on-surface-variant line-clamp-2">
                    {content.description}
                  </p>

                  {/* Tags */}
                  {content.tags && content.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {content.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tag.className}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Personal Note if exists */}
                  {hasNote && (
                    <div className="mt-3 rounded-lg border border-secondary-container bg-secondary-container/30 p-2.5 text-body-sm text-on-secondary-container">
                      <span className="block text-label-sm font-bold text-primary">
                        Nota personal:
                      </span>
                      <p className="text-body-sm italic mt-0.5">
                        "{notes[content.id]}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-5 flex items-center gap-2 border-t border-outline-variant/20 pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveDetailContent(content)}
                    className="flex-1 rounded-lg bg-primary py-2 px-3 text-center text-label-md font-bold text-on-primary transition-colors hover:bg-primary-container active:scale-95 shadow-sm"
                  >
                    {content.cta || 'Ver detalle'}
                  </button>

                  <button
                    type="button"
                    onClick={() => scheduleItem(content.id, content.title)}
                    title={
                      scheduled
                        ? 'Agendado en tu plan semanal'
                        : 'Añadir a mi plan semanal'
                    }
                    className={`rounded-lg p-2 transition-colors active:scale-95 ${
                      scheduled
                        ? 'bg-secondary-container text-on-secondary-container font-bold'
                        : 'border border-outline-variant hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <Icon
                      name={scheduled ? 'event_available' : 'calendar_add_on'}
                      className="text-[18px]"
                      filled={scheduled}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNoteContent(content)}
                    title="Añadir o editar notas"
                    className={`rounded-lg p-2 transition-colors active:scale-95 ${
                      hasNote
                        ? 'bg-secondary-container text-primary'
                        : 'border border-outline-variant hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <Icon name="edit_note" className="text-[18px]" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="card-ambient flex flex-col items-center gap-3 rounded-2xl px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-outline">
            <Icon name="filter_list_off" className="text-[24px]" />
          </div>
          <h3 className="text-headline-sm font-bold text-on-surface">
            No hay contenidos en este filtro
          </h3>
          <p className="max-w-md text-body-sm text-on-surface-variant">
            Prueba cambiando la colección activa, el tipo de contenido o tu búsqueda.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCollection('all')
              setActiveCategory('all')
              setSearchQuery('')
            }}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-label-md font-bold text-on-primary transition-colors hover:bg-primary-container"
          >
            <Icon name="restart_alt" className="text-[16px]" />
            Restablecer filtros
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(name) => {
          const col = createCollection(name)
          if (col) setActiveCollection(col.id)
          return col
        }}
      />

      <ContentNoteModal
        isOpen={Boolean(activeNoteContent)}
        content={activeNoteContent}
        initialNote={activeNoteContent ? notes[activeNoteContent.id] || '' : ''}
        onClose={() => setActiveNoteContent(null)}
        onSave={handleSaveNote}
      />

      <ContentDetailModal
        isOpen={Boolean(activeDetailContent)}
        content={activeDetailContent}
        onClose={() => setActiveDetailContent(null)}
      />
    </section>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFavorites } from '../../../context/hooks/useFavorites'
import {
  contentCollections,
  contentPopularity,
  contentSortOptions,
  contentTypes,
  contenidosCopy,
} from '../../../data/contenidosPageData'
import { exploreContents } from '../../../data/exploreContentData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { matchesContentQuery } from '../../../utils/content'

const legacyTypeMap = {
  breakfast: 'recipe',
  'gluten-free': 'recipe',
  nutrition: 'recipe',
  hiit: 'routine',
  strength: 'routine',
  training: 'routine',
  mindfulness: 'routine',
  mental: 'routine',
  articles: 'article',
  sleep: 'article',
}

const evidenceRank = {
  'level-1': 3,
  peer: 2,
  clinical: 1,
}

const typeRank = {
  recipe: 0,
  article: 1,
  routine: 2,
}

function resolveTypeFilter(value) {
  if (!value || value === 'all') {
    return 'all'
  }

  if (contentTypes.some((type) => type.id === value)) {
    return value
  }

  return legacyTypeMap[value] ?? 'all'
}

function resolveCollection(value) {
  return contentCollections.some((collection) => collection.id === value)
    ? value
    : 'all'
}

function matchesCollection(content, collection) {
  if (!collection || collection.id === 'all') {
    return true
  }

  if (collection.contentIds) {
    return collection.contentIds.includes(content.id)
  }

  if (collection.types) {
    return collection.types.includes(content.type)
  }

  return true
}

function sortContents(contents, sortId) {
  const sorted = [...contents]

  switch (sortId) {
    case 'duration':
      return sorted.sort((a, b) => a.quick.minutes - b.quick.minutes)
    case 'popularity':
      return sorted.sort(
        (a, b) =>
          (contentPopularity[b.id] ?? 0) - (contentPopularity[a.id] ?? 0),
      )
    case 'type':
      return sorted.sort(
        (a, b) =>
          typeRank[a.type] - typeRank[b.type] ||
          (evidenceRank[b.quick.evidence] ?? 0) -
            (evidenceRank[a.quick.evidence] ?? 0),
      )
    default:
      return sorted
  }
}

const collectionsWithCounts = contentCollections.map((collection) => ({
  ...collection,
  count: exploreContents.filter((content) =>
    matchesCollection(content, collection),
  ).length,
}))

export function useContenidosPage() {
  useDocumentTitle('Contenidos Saludables | Vitalis')

  const [searchParams, setSearchParams] = useSearchParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const searchInputRef = useRef(null)
  const urlQuery = searchParams.get('q')?.trim() ?? ''
  const activeType = resolveTypeFilter(searchParams.get('filtro') ?? 'all')
  const activeCollection = resolveCollection(
    searchParams.get('coleccion') ?? 'all',
  )
  const [draft, setDraft] = useState({ source: urlQuery, value: urlQuery })
  const query = draft.source === urlQuery ? draft.value : urlQuery
  const [sort, setSort] = useState('recent')
  const [view, setView] = useState('grid')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const handleShortcut = (event) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'

      if (isShortcut) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const collectionContents = useMemo(() => {
    const collection = collectionsWithCounts.find(
      (item) => item.id === activeCollection,
    )

    return exploreContents.filter((content) =>
      matchesCollection(content, collection),
    )
  }, [activeCollection])

  const typeFilters = useMemo(() => {
    const counts = collectionContents.reduce(
      (result, content) => {
        result.all += 1
        result[content.type] += 1
        return result
      },
      { all: 0, recipe: 0, article: 0, routine: 0 },
    )

    return contentTypes.map((type) => ({
      ...type,
      count: counts[type.id] ?? 0,
    }))
  }, [collectionContents])

  const results = useMemo(() => {
    const filtered = collectionContents.filter(
      (content) =>
        (activeType === 'all' || content.type === activeType) &&
        matchesContentQuery(content, query),
    )

    return sortContents(filtered, sort)
  }, [activeType, collectionContents, query, sort])

  const updateParams = useCallback(
    (nextQuery, nextType, nextCollection) => {
      const params = new URLSearchParams()
      const normalizedQuery = nextQuery.trim()

      if (normalizedQuery) {
        params.set('q', normalizedQuery)
      }

      if (nextType !== 'all') {
        params.set('filtro', nextType)
      }

      if (nextCollection !== 'all') {
        params.set('coleccion', nextCollection)
      }

      setSearchParams(params, { replace: true })
    },
    [setSearchParams],
  )

  const handleQueryChange = (event) => {
    setDraft({ source: urlQuery, value: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateParams(query, activeType, activeCollection)
  }

  const handleClearQuery = () => {
    setDraft({ source: urlQuery, value: '' })
    updateParams('', activeType, activeCollection)
  }

  const handleTypeChange = (typeId) => {
    updateParams(query, typeId, activeCollection)
  }

  const handleCollectionChange = (collectionId) => {
    updateParams(query, activeType, collectionId)
  }

  const handleSortChange = (event) => {
    setSort(event.target.value)
  }

  const handleViewChange = (nextView) => {
    setView(nextView)
  }

  const handleResetFilters = () => {
    setDraft({ source: urlQuery, value: '' })
    setSort('recent')
    updateParams('', 'all', 'all')
  }

  const handleToggleFavorite = (content) => {
    const wasFavorite = isFavorite(content.id)
    toggleFavorite(content.id)
    setNotice(
      wasFavorite ? contenidosCopy.removedNotice : contenidosCopy.savedNotice,
    )
  }

  const handleOpenContent = (content) => {
    setNotice(`Abriendo “${content.shortTitle}” (demostración).`)
  }

  const handleAction = (noticeKey) => {
    setNotice(contenidosCopy[noticeKey] ?? contenidosCopy.genericNotice)
  }

  const handleCreateCollection = () => {
    setNotice(contenidosCopy.createCollectionNotice)
  }

  const handleManageCollections = () => {
    setNotice(contenidosCopy.manageCollectionsNotice)
  }

  const handlePageChange = () => {
    setNotice(contenidosCopy.pageNotice)
  }

  const handleDismissNotice = useCallback(() => {
    setNotice('')
  }, [])

  return {
    copy: contenidosCopy,
    sortOptions: contentSortOptions,
    typeFilters,
    collections: collectionsWithCounts,
    results,
    total: exploreContents.length,
    collectionTotal: collectionContents.length,
    query,
    activeType,
    activeCollection,
    sort,
    view,
    hasFilters:
      Boolean(urlQuery) ||
      activeType !== 'all' ||
      activeCollection !== 'all',
    notice,
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
    handleDismissNotice,
  }
}

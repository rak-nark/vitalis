import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFavorites } from '../../../context/hooks/useFavorites'
import { exploreContents } from '../../../data/exploreContentData'
import {
  exploreCopy,
  exploreFeatured,
  exploreFilters,
  exploreQuickFilters,
  exploreRecentSearches,
  exploreTrends,
} from '../../../data/explorePageData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { wait } from '../../../utils/async'
import { matchesContentQuery } from '../../../utils/content'

const defaultQuickFilters = Object.fromEntries(
  exploreQuickFilters.map((group) => [group.id, 'any']),
)

const legacyFilterMap = {
  breakfast: 'nutrition',
  'gluten-free': 'nutrition',
  hiit: 'training',
  strength: 'training',
  mindfulness: 'mental',
}

function resolveInitialFilter(filterId) {
  if (!filterId || filterId === 'all') {
    return 'all'
  }

  if (exploreFilters.some((filter) => filter.id === filterId)) {
    return filterId
  }

  return legacyFilterMap[filterId] ?? 'all'
}

function matchesQuickFilters(content, quickFilters) {
  const { duration, goal, evidence, diet } = quickFilters

  if (duration !== 'any') {
    if (duration === '45' && content.quick.minutes < 45) {
      return false
    }

    if (duration !== '45' && content.quick.minutes > Number(duration)) {
      return false
    }
  }

  if (goal !== 'any' && !content.quick.goals.includes(goal)) {
    return false
  }

  if (evidence !== 'any' && content.quick.evidence !== evidence) {
    return false
  }

  if (diet !== 'any' && !content.quick.diets.includes(diet)) {
    return false
  }

  return true
}

export function useExplorarPage() {
  useDocumentTitle('Explorar | Vitalis')

  const [searchParams] = useSearchParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [query, setQuery] = useState(
    () => searchParams.get('q')?.trim() ?? '',
  )
  const [activeFilter, setActiveFilter] = useState(() =>
    resolveInitialFilter(searchParams.get('filtro')),
  )
  const [quickFilters, setQuickFilters] = useState(defaultQuickFilters)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isFeaturedSaved, setIsFeaturedSaved] = useState(false)
  const [notice, setNotice] = useState('')

  const results = useMemo(
    () =>
      exploreContents.filter(
        (content) =>
          (activeFilter === 'all' ||
            content.exploreFilterIds.includes(activeFilter)) &&
          matchesQuickFilters(content, quickFilters) &&
          matchesContentQuery(content, query),
      ),
    [activeFilter, quickFilters, query],
  )

  const activeQuickFilterCount = Object.values(quickFilters).filter(
    (value) => value !== 'any',
  ).length
  const activeFilterCount =
    activeQuickFilterCount + (activeFilter === 'all' ? 0 : 1)
  const hasFilters =
    Boolean(query.trim()) ||
    activeFilter !== 'all' ||
    activeQuickFilterCount > 0

  const handleDismissNotice = useCallback(() => {
    setNotice('')
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleClearQuery = () => {
    setQuery('')
  }

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
  }

  const handleQuickFilterChange = (filterId, value) => {
    setQuickFilters((currentFilters) => ({
      ...currentFilters,
      [filterId]: value,
    }))
  }

  const handleResetFilters = () => {
    setQuery('')
    setActiveFilter('all')
    setQuickFilters(defaultQuickFilters)
  }

  const handleSearchSuggestion = (suggestion) => {
    setQuery(typeof suggestion === 'string' ? suggestion : suggestion.query)
    setActiveFilter('all')
    setQuickFilters(defaultQuickFilters)
  }

  const handleToggleMobileFilters = () => {
    setIsMobileFiltersOpen((isOpen) => !isOpen)
  }

  const handleToggleFavorite = (content) => {
    const wasFavorite = isFavorite(content.id)
    toggleFavorite(content.id)
    setNotice(
      wasFavorite ? exploreCopy.removedNotice : exploreCopy.savedNotice,
    )
  }

  const handleOpenContent = (content) => {
    setNotice(`Abriendo “${content.shortTitle}” (demostración).`)
  }

  const handleOpenFeatured = () => {
    setNotice(exploreCopy.featuredNotice)
  }

  const handleToggleFeaturedSaved = () => {
    const nextSaved = !isFeaturedSaved
    setIsFeaturedSaved(nextSaved)
    setNotice(nextSaved ? exploreCopy.featuredSaved : exploreCopy.featuredRemoved)
  }

  const handlePageChange = (page) => {
    setNotice(`Página ${page} simulada en esta demostración.`)
  }

  const handleLoadMore = async () => {
    if (isLoadingMore) {
      return
    }

    setIsLoadingMore(true)
    await wait(700)
    setIsLoadingMore(false)
    setNotice(exploreCopy.endOfResults)
  }

  return {
    copy: exploreCopy,
    featured: exploreFeatured,
    filters: exploreFilters,
    trends: exploreTrends,
    recentSearches: exploreRecentSearches,
    quickFilterGroups: exploreQuickFilters,
    results,
    totalLibrary: exploreCopy.libraryTotal,
    query,
    activeFilter,
    quickFilters,
    activeFilterCount,
    hasFilters,
    isMobileFiltersOpen,
    isLoadingMore,
    isFeaturedSaved,
    notice,
    isFavorite,
    handleDismissNotice,
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
    handlePageChange,
    handleLoadMore,
  }
}

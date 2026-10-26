import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { contentFilters } from '../../../data/homeData'

function buildSearchPath(query, filterId) {
  const params = new URLSearchParams()
  const normalizedQuery = query.trim()

  if (normalizedQuery) {
    params.set('q', normalizedQuery)
  }

  if (filterId && filterId !== 'all') {
    params.set('filtro', filterId)
  }

  const search = params.toString()
  return search ? `/busqueda?${search}` : '/busqueda'
}

export function useSearchForm({ enableShortcut = false } = {}) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const searchInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!enableShortcut) {
      return undefined
    }

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
  }, [enableShortcut])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      navigate(buildSearchPath(query, activeFilter))
    },
    [activeFilter, navigate, query],
  )

  const handleOpenFilters = useCallback(() => {
    navigate(buildSearchPath(query, activeFilter))
  }, [activeFilter, navigate, query])

  return {
    query,
    activeFilter,
    searchInputRef,
    filters: contentFilters,
    handleQueryChange,
    handleFilterChange,
    handleSubmit,
    handleOpenFilters,
  }
}

import { useMemo, useState } from 'react'
import { contentFilters, recommendedContent } from '../../../data/homeData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { filterContents } from '../../../utils/content'

export function useContentsPage() {
  useDocumentTitle('Contenidos Saludables | Vitalis')

  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const results = useMemo(
    () =>
      filterContents(recommendedContent, {
        query,
        filterId: activeFilter,
      }),
    [activeFilter, query],
  )

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
  }

  const clearFilters = () => {
    setQuery('')
    setActiveFilter('all')
  }

  const clearQuery = () => {
    setQuery('')
  }

  return {
    query,
    activeFilter,
    filters: contentFilters,
    results,
    total: recommendedContent.length,
    hasFilters: Boolean(query.trim()) || activeFilter !== 'all',
    handleQueryChange,
    handleFilterChange,
    clearFilters,
    clearQuery,
  }
}

import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { contentFilters, recommendedContent } from '../../../data/homeData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { filterContents } from '../../../utils/content'

function resolveFilter(filterId) {
  return contentFilters.some((filter) => filter.id === filterId)
    ? filterId
    : 'all'
}

export function useBusquedaPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = searchParams.get('q')?.trim() ?? ''
  const urlFilter = resolveFilter(searchParams.get('filtro') ?? 'all')
  const [draft, setDraft] = useState({ source: urlQuery, value: urlQuery })
  const query = draft.source === urlQuery ? draft.value : urlQuery

  useDocumentTitle(
    urlQuery ? `Resultados para ${urlQuery} | Vitalis` : 'Búsqueda | Vitalis',
  )

  const results = useMemo(
    () =>
      filterContents(recommendedContent, {
        query: urlQuery,
        filterId: urlFilter,
      }),
    [urlFilter, urlQuery],
  )

  const updateParams = useCallback(
    (nextQuery, nextFilter) => {
      const params = new URLSearchParams()
      const normalizedQuery = nextQuery.trim()

      if (normalizedQuery) {
        params.set('q', normalizedQuery)
      }

      if (nextFilter !== 'all') {
        params.set('filtro', nextFilter)
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
    updateParams(query, urlFilter)
  }

  const handleFilterChange = (filterId) => {
    updateParams(query, filterId)
  }

  const clearFilters = () => {
    setDraft({ source: urlQuery, value: '' })
    updateParams('', 'all')
  }

  return {
    query,
    activeFilter: urlFilter,
    filters: contentFilters,
    results,
    total: recommendedContent.length,
    committedQuery: urlQuery,
    hasFilters: Boolean(urlQuery) || urlFilter !== 'all',
    handleQueryChange,
    handleSubmit,
    handleFilterChange,
    clearFilters,
  }
}

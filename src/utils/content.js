function matchesQuery(content, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  const searchableText = [
    content.title,
    content.description,
    content.category,
    ...(content.tags ?? []).map((tag) => tag.label),
    ...(content.mobile ? [content.mobile.category] : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return searchableText.includes(normalizedQuery)
}

export function filterContents(
  contents,
  { query = '', filterId = 'all' } = {},
) {
  return contents.filter((content) => {
    const matchesFilter =
      filterId === 'all' || (content.filterIds ?? []).includes(filterId)

    return matchesFilter && matchesQuery(content, query)
  })
}

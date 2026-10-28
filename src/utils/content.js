export function normalizeSearchText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function matchesContentQuery(content, query) {
  const normalizedQuery = normalizeSearchText(query).trim()

  if (!normalizedQuery) {
    return true
  }

  const searchableText = [
    content.title,
    content.shortTitle,
    content.description,
    content.category,
    content.badge,
    content.author,
    content.authorRole,
    content.evidence,
    ...(content.tags ?? []).map((tag) => tag.label),
    ...(content.mobile
      ? [
          content.mobile.category,
          content.mobile.footer,
          content.mobile.note,
        ]
      : []),
  ]
    .filter(Boolean)
    .join(' ')

  return normalizeSearchText(searchableText).includes(normalizedQuery)
}

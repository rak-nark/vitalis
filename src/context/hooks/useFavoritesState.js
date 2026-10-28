import { useCallback, useState } from 'react'
import {
  contentCollectionMap,
  defaultFavoriteIds,
  initialCollections,
} from '../../data/favoritesCollectionsData'
import { normalizeSearchText } from '../../utils/content'

export function useFavoritesState() {
  const [favorites, setFavorites] = useState(() => new Set(defaultFavoriteIds))
  const [collections, setCollections] = useState(initialCollections)
  const [itemCollections] = useState(contentCollectionMap)
  const [scheduledIds, setScheduledIds] = useState(() => new Set())
  const [feedback, setFeedback] = useState(null)

  const toggleFavorite = useCallback(
    (contentId) => {
      const wasFavorite = favorites.has(contentId)

      setFavorites((currentFavorites) => {
        const nextFavorites = new Set(currentFavorites)

        if (wasFavorite) {
          nextFavorites.delete(contentId)
        } else {
          nextFavorites.add(contentId)
        }

        return nextFavorites
      })

      setFeedback({
        type: wasFavorite ? 'info' : 'success',
        message: wasFavorite
          ? 'Contenido eliminado de tus favoritos.'
          : 'Contenido guardado en tus favoritos.',
      })
    },
    [favorites],
  )

  const isFavorite = useCallback(
    (contentId) => favorites.has(contentId),
    [favorites],
  )

  const createCollection = useCallback(
    (name) => {
      if (!name || !name.trim()) return null

      const trimmed = name.trim()
      const normalizedName = normalizeSearchText(trimmed)
      const normalizedId = normalizedName
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      const id = normalizedId || `col-${Date.now()}`

      const alreadyExists = collections.some(
        (collection) =>
          collection.id === id ||
          normalizeSearchText(collection.label) === normalizedName,
      )

      if (alreadyExists) {
        return null
      }

      const newCollection = {
        id,
        label: trimmed,
        icon: 'folder',
        iconClass: 'text-primary',
        isCustom: true,
      }

      setCollections((prev) => [...prev, newCollection])
      setFeedback({
        type: 'success',
        message: `Colección "${trimmed}" creada exitosamente.`,
      })

      return newCollection
    },
    [collections],
  )

  const scheduleItem = useCallback((contentId, title) => {
    setScheduledIds((prev) => {
      const next = new Set(prev)
      next.add(contentId)
      return next
    })
    setFeedback({
      type: 'success',
      message: `"${title || 'Contenido'}" agendado en tu plan semanal.`,
    })
  }, [])

  const isScheduled = useCallback(
    (contentId) => scheduledIds.has(contentId),
    [scheduledIds],
  )

  const dismissFeedback = useCallback(() => {
    setFeedback(null)
  }, [])

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    collections,
    createCollection,
    itemCollections,
    scheduleItem,
    isScheduled,
    feedback,
    dismissFeedback,
  }
}

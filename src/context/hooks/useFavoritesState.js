import { useCallback, useState } from 'react'

export function useFavoritesState() {
  const [favorites, setFavorites] = useState(() => new Set())

  const toggleFavorite = useCallback((contentId) => {
    setFavorites((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites)

      if (nextFavorites.has(contentId)) {
        nextFavorites.delete(contentId)
      } else {
        nextFavorites.add(contentId)
      }

      return nextFavorites
    })
  }, [])

  const isFavorite = useCallback(
    (contentId) => favorites.has(contentId),
    [favorites],
  )

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
}

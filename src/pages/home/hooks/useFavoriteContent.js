import { useCallback } from 'react'
import { useFavorites } from '../../../context/hooks/useFavorites'

export function useFavoriteContent(contentId) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(contentId)

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(contentId)
  }, [contentId, toggleFavorite])

  return {
    favorite,
    handleToggleFavorite,
  }
}

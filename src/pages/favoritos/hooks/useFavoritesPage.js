import { useMemo } from 'react'
import { useFavorites } from '../../../context/hooks/useFavorites'
import { useHabits } from '../../../context/hooks/useHabits'
import { recommendedContent } from '../../../data/homeData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'

export function useFavoritesPage() {
  useDocumentTitle('Mis Favoritos y Hábitos | Vitalis')

  const { favorites } = useFavorites()
  const { habits, toggleHabit, completedCount, totalCount, progress } =
    useHabits()

  const favoriteContents = useMemo(
    () =>
      recommendedContent.filter((content) => favorites.has(content.id)),
    [favorites],
  )
  const pendingHabits = habits.filter((habit) => !habit.completed)

  return {
    favoriteContents,
    favoriteCount: favorites.size,
    habits: habits.slice(0, 3),
    pendingCount: pendingHabits.length,
    completedCount,
    totalCount,
    progress,
    toggleHabit,
  }
}

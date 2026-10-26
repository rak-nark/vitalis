import { useHabits } from '../../../context/hooks/useHabits'

export function useHabitsOverview() {
  const { habits, toggleHabit, completedCount, totalCount, progress } =
    useHabits()

  return {
    habits,
    toggleHabit,
    completedCount,
    totalCount,
    progress,
  }
}

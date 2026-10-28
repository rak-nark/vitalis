import { useCallback, useState } from 'react'
import { initialHabits } from '../../data/homeData'

export function useHabitsState() {
  const [habits, setHabits] = useState(initialHabits)

  const toggleHabit = useCallback((habitId) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    )
  }, [])

  const addHabit = useCallback((habit) => {
    setHabits((currentHabits) =>
      currentHabits.some((currentHabit) => currentHabit.id === habit.id)
        ? currentHabits
        : [...currentHabits, habit],
    )
  }, [])

  const completedCount = habits.filter((habit) => habit.completed).length
  const totalCount = habits.length
  const progress = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0

  return {
    habits,
    toggleHabit,
    addHabit,
    completedCount,
    totalCount,
    progress,
  }
}

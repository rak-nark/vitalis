import { useCallback, useMemo, useState } from 'react'
import { useFavorites } from '../../../context/hooks/useFavorites'
import { useHabits } from '../../../context/hooks/useHabits'
import { useUser } from '../../../context/hooks/useUser'
import { recommendedContent } from '../../../data/homeData'
import {
  consistencyHeatmap,
  habitAdherence,
  habitCategories,
  habitHeroMetrics,
  habitPageCopy,
  habitRecoveryTip,
  habitSpecialist,
  habitSuggestions,
  habitTimeFilters,
  habitWeek,
} from '../../../data/habitsPageData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { wait } from '../../../utils/async'

export function useHabitosPage({ listId = 'habitos-lista' } = {}) {
  useDocumentTitle('Mis Favoritos y Hábitos | Vitalis')

  const { user } = useUser()
  const { favorites } = useFavorites()
  const {
    habits,
    toggleHabit,
    addHabit,
    completedCount,
    totalCount,
    progress,
  } = useHabits()

  const favoriteContents = useMemo(
    () => recommendedContent.filter((content) => favorites.has(content.id)),
    [favorites],
  )

  const [activeTimeFilter, setActiveTimeFilter] = useState('all')
  const [selectedDayId, setSelectedDayId] = useState(
    () => habitWeek.days.find((day) => day.isToday)?.id ?? habitWeek.days[0].id,
  )
  const [logStatus, setLogStatus] = useState('idle')

  const filteredHabits = useMemo(
    () =>
      activeTimeFilter === 'all'
        ? habits
        : habits.filter((habit) => habit.timeOfDay === activeTimeFilter),
    [habits, activeTimeFilter],
  )

  const timeFilterOptions = useMemo(
    () =>
      habitTimeFilters.map((filter) => ({
        ...filter,
        count:
          filter.id === 'all'
            ? habits.length
            : habits.filter((habit) => habit.timeOfDay === filter.id).length,
      })),
    [habits],
  )

  const week = useMemo(
    () => ({
      ...habitWeek,
      days: habitWeek.days.map((day) =>
        day.isToday
          ? {
              ...day,
              completed: completedCount,
              total: totalCount,
              status: completedCount === totalCount ? 'complete' : 'today',
            }
          : day,
      ),
    }),
    [completedCount, totalCount],
  )

  const categorizedHabits = useMemo(
    () =>
      habitCategories
        .map((category) => {
          const categoryHabits = filteredHabits.filter(
            (habit) => habit.categoryId === category.id,
          )
          const categoryCompleted = categoryHabits.filter(
            (habit) => habit.completed,
          ).length
          const categoryTotal = categoryHabits.length

          return {
            ...category,
            habits: categoryHabits,
            completedCount: categoryCompleted,
            totalCount: categoryTotal,
            progress: categoryTotal
              ? Math.round((categoryCompleted / categoryTotal) * 100)
              : 0,
          }
        })
        .filter((category) => category.totalCount > 0),
    [filteredHabits],
  )

  const categoryProgress = useMemo(
    () =>
      habitCategories
        .map((category) => {
          const categoryHabits = habits.filter(
            (habit) => habit.categoryId === category.id,
          )
          const categoryCompleted = categoryHabits.filter(
            (habit) => habit.completed,
          ).length
          const categoryTotal = categoryHabits.length

          return {
            ...category,
            completedCount: categoryCompleted,
            totalCount: categoryTotal,
            progress: categoryTotal
              ? Math.round((categoryCompleted / categoryTotal) * 100)
              : 0,
          }
        })
        .filter((category) => category.totalCount > 0),
    [habits],
  )

  const selectedDay = useMemo(
    () =>
      week.days.find((day) => day.id === selectedDayId) ?? week.days[0],
    [week, selectedDayId],
  )

  const selectedDayIndex = week.days.findIndex(
    (day) => day.id === selectedDay.id,
  )

  const adherence = useMemo(
    () => ({
      ...habitAdherence,
      days: habitAdherence.days.map((day) =>
        day.state === 'today' ? { ...day, percent: progress } : day,
      ),
    }),
    [progress],
  )

  const heatmap = useMemo(() => {
    const todayLevel =
      progress >= 100 ? 4 : progress >= 75 ? 3 : progress >= 50 ? 2 : progress > 0 ? 1 : 0

    return {
      ...consistencyHeatmap,
      days: consistencyHeatmap.days.map((day, index) =>
        index === consistencyHeatmap.days.length - 1
          ? { ...day, level: todayLevel, percentage: progress }
          : day,
      ),
    }
  }, [progress])

  const handleSelectDay = useCallback((dayId) => {
    setSelectedDayId(dayId)
  }, [])

  const handleStepDay = useCallback(
    (direction) => {
      setSelectedDayId((currentDayId) => {
        const currentIndex = week.days.findIndex(
          (day) => day.id === currentDayId,
        )
        const nextIndex = Math.min(
          Math.max(currentIndex + direction, 0),
          week.days.length - 1,
        )

        return week.days[nextIndex].id
      })
    },
    [week.days],
  )

  const handlePreviousDay = useCallback(
    () => handleStepDay(-1),
    [handleStepDay],
  )
  const handleNextDay = useCallback(() => handleStepDay(1), [handleStepDay])

  const handleTimeFilterChange = useCallback((filterId) => {
    setActiveTimeFilter(filterId)
  }, [])

  const handleRegisterHabit = useCallback(() => {
    const target = document.getElementById(listId)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [listId])

  const isSuggestionAdded = useCallback(
    (suggestionId) =>
      habits.some((habit) => habit.id === suggestionId),
    [habits],
  )

  const handleAddSuggestion = useCallback(
    (suggestion) => {
      addHabit(suggestion.habit)
    },
    [addHabit],
  )

  const handleSendLog = useCallback(async () => {
    if (logStatus !== 'idle') {
      return
    }

    setLogStatus('loading')
    await wait(700)
    setLogStatus('success')
  }, [logStatus])

  return {
    user,
    habits,
    favoriteContents,
    favoriteCount: favorites.size,
    filteredHabits,
    categorizedHabits,
    categoryProgress,
    completedCount,
    totalCount,
    progress,
    remainingCount: Math.max(totalCount - completedCount, 0),
    toggleHabit,
    activeTimeFilter,
    timeFilterOptions,
    handleTimeFilterChange,
    selectedDay,
    selectedDayId,
    handleSelectDay,
    handlePreviousDay,
    handleNextDay,
    canGoPrevious: selectedDayIndex > 0,
    canGoNext: selectedDayIndex < week.days.length - 1,
    week,
    metrics: habitHeroMetrics,
    adherence,
    heatmap,
    suggestions: habitSuggestions,
    recoveryTip: habitRecoveryTip,
    specialist: habitSpecialist,
    isSuggestionAdded,
    handleAddSuggestion,
    logStatus,
    handleSendLog,
    handleRegisterHabit,
    copy: habitPageCopy,
  }
}

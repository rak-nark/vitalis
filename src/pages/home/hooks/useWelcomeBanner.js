import { useHabits } from '../../../context/hooks/useHabits'
import { useUser } from '../../../context/hooks/useUser'

const CIRCUMFERENCE = 188.4

export function useWelcomeBanner() {
  const { user, summary } = useUser()
  const { completedCount, totalCount } = useHabits()
  const dashOffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * summary.goalPercentage) / 100

  return {
    user,
    summary,
    completedCount,
    totalCount,
    circumference: CIRCUMFERENCE,
    dashOffset,
  }
}

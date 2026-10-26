import { useState } from 'react'

export function useMobileHabitRow(habitId) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded((current) => !current)
  }

  return {
    expanded,
    toggleExpanded,
    detailId: `mobile-habit-detail-${habitId}`,
  }
}

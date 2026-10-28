import { useState } from 'react'

export function useHabitCard(habitId, idPrefix = 'habit') {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded((current) => !current)

  return {
    expanded,
    toggleExpanded,
    detailId: `${idPrefix}-detail-${habitId}`,
  }
}

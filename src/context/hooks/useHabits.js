import { useContext } from 'react'
import { HabitsContext } from '../HabitsContext'

export function useHabits() {
  const context = useContext(HabitsContext)

  if (!context) {
    throw new Error('useHabits debe usarse dentro de <HabitsProvider>')
  }

  return context
}

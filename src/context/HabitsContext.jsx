/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useHabitsState } from './hooks/useHabitsState'

export const HabitsContext = createContext(null)

export function HabitsProvider({ children }) {
  const habitsState = useHabitsState()

  return (
    <HabitsContext.Provider value={habitsState}>
      {children}
    </HabitsContext.Provider>
  )
}

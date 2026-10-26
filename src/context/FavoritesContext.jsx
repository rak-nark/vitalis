/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useFavoritesState } from './hooks/useFavoritesState'

export const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const favoritesState = useFavoritesState()

  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  )
}

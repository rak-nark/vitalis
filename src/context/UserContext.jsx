/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useUserProfile } from './hooks/useUserProfile'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const userProfile = useUserProfile()

  return (
    <UserContext.Provider value={userProfile}>
      {children}
    </UserContext.Provider>
  )
}

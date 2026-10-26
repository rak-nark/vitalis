/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useAuthSession } from './hooks/useAuthSession'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useAuthSession()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

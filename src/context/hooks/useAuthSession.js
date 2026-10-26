import { useCallback, useEffect, useState } from 'react'
import {
  clearStoredSession,
  readStoredSession,
  storeSession,
} from '../authStorage'

const STORAGE_KEY = 'vitalis.auth.session'

export function useAuthSession() {
  const [session, setSession] = useState(readStoredSession)

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        setSession(readStoredSession())
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const login = useCallback((profile) => {
    const nextSession = {
      id: profile.email.trim().toLowerCase(),
      name: profile.name?.trim() || 'Usuario Vitalis',
      email: profile.email.trim().toLowerCase(),
      provider: profile.provider ?? 'email',
      remember: Boolean(profile.remember),
      loggedInAt: new Date().toISOString(),
    }

    storeSession(nextSession, nextSession.remember)
    setSession(nextSession)

    return nextSession
  }, [])

  const logout = useCallback(() => {
    clearStoredSession()
    setSession(null)
  }, [])

  return {
    session,
    isAuthenticated: Boolean(session),
    login,
    logout,
  }
}

import { useState } from 'react'
import { useAuth } from '../../../context/hooks/useAuth'
import { useFavorites } from '../../../context/hooks/useFavorites'
import { useHabits } from '../../../context/hooks/useHabits'
import { useUser } from '../../../context/hooks/useUser'
import { providerLabels } from '../../../data/authData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { wait } from '../../../utils/async'
import { formatSessionDate, getInitials } from '../../../utils/user'

export function useProfile() {
  useDocumentTitle('Mi Perfil | Vitalis')

  const { session, logout } = useAuth()
  const { user, summary } = useUser()
  const { completedCount, totalCount, progress } = useHabits()
  const { favorites } = useFavorites()
  const [logoutStatus, setLogoutStatus] = useState('idle')
  const [notice, setNotice] = useState('')

  const isAuthenticated = Boolean(session)
  const displayName = session?.name ?? ''
  const providerLabel = session
    ? providerLabels[session.provider] ?? 'Acceso seguro'
    : ''
  const sessionDate = formatSessionDate(session?.loggedInAt)

  const handleLogout = async () => {
    if (logoutStatus === 'loading') {
      return
    }

    setLogoutStatus('loading')
    await wait(600)
    logout()
    setLogoutStatus('idle')
    setNotice('Has cerrado sesión correctamente.')
  }

  return {
    isAuthenticated,
    session,
    user,
    summary,
    displayName,
    initials: getInitials(displayName),
    providerLabel,
    sessionDate,
    isRemembered: Boolean(session?.remember),
    stats: {
      completedCount,
      totalCount,
      progress,
      favoriteCount: favorites.size,
      streakDays: user.streakDays,
    },
    notice,
    isLoggingOut: logoutStatus === 'loading',
    handleLogout,
  }
}

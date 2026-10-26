import { useMemo } from 'react'
import { currentUser, dailySummary } from '../../data/homeData'
import { getFirstName } from '../../utils/user'
import { useAuth } from './useAuth'

export function useUserProfile() {
  const { session } = useAuth()

  const user = useMemo(() => {
    if (!session) {
      return currentUser
    }

    return {
      ...currentUser,
      firstName: getFirstName(session.name) || currentUser.firstName,
      fullName: session.name,
      email: session.email,
      avatarAlt: `Foto de perfil de ${session.name}`,
    }
  }, [session])

  return {
    user,
    summary: dailySummary,
    session,
  }
}

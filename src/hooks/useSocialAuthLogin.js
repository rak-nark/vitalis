import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/hooks/useAuth'
import { socialProfiles } from '../data/authData'

export function useSocialAuthLogin({ redirectTo = '/' } = {}) {
  const { login } = useAuth()
  const navigate = useNavigate()

  return useCallback(
    (providerId) => {
      const profile = socialProfiles[providerId] ?? socialProfiles.google

      login({
        name: profile.name,
        email: profile.email,
        provider: providerId,
        remember: true,
      })
      navigate(redirectTo, { replace: true })
    },
    [login, navigate, redirectTo],
  )
}

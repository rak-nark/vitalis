import { useUser } from '../../../context/hooks/useUser'

export function useMobileGreeting() {
  const { user, summary } = useUser()

  return {
    user,
    summary,
  }
}

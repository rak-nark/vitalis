import { useCallback, useState } from 'react'
import { wait } from '../../../utils/async'

export function useSocialAuth(onSelect) {
  const [loadingProvider, setLoadingProvider] = useState(null)

  const handleSelect = useCallback(
    async (providerId) => {
      if (loadingProvider) {
        return
      }

      setLoadingProvider(providerId)
      await wait(650)

      try {
        await onSelect?.(providerId)
      } finally {
        setLoadingProvider(null)
      }
    },
    [loadingProvider, onSelect],
  )

  return {
    loadingProvider,
    handleSelect,
    isLoading: Boolean(loadingProvider),
  }
}

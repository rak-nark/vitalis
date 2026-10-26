import { useCallback, useEffect, useState } from 'react'
import { loginCopy } from '../../../data/loginData'
import { wait } from '../../../utils/async'
import { isValidEmail } from '../../../utils/validation'

export function usePasswordRecovery() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const open = useCallback((initialEmail = '') => {
    setEmail(initialEmail)
    setError('')
    setStatus('idle')
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    if (status === 'loading') {
      return
    }

    setIsOpen(false)
  }, [status])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setError('')

    if (status === 'success') {
      setStatus('idle')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (status === 'loading') {
      return
    }

    const value = email.trim()

    if (!value) {
      setError(loginCopy.recovery.emailRequired)
      return
    }

    if (!isValidEmail(value)) {
      setError(loginCopy.recovery.emailInvalid)
      return
    }

    setError('')
    setStatus('loading')
    await wait(900)
    setStatus('success')
  }

  const reset = () => {
    setEmail('')
    setError('')
    setStatus('idle')
  }

  return {
    isOpen,
    email,
    error,
    status,
    open,
    close,
    reset,
    handleEmailChange,
    handleSubmit,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
  }
}

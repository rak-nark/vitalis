import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/hooks/useAuth'
import { loginCopy } from '../../../data/loginData'
import { useSocialAuthLogin } from '../../../hooks/useSocialAuthLogin'
import { wait } from '../../../utils/async'
import { getDisplayNameFromEmail } from '../../../utils/user'
import { validateLoginFields } from '../../../utils/validation'
import { usePasswordRecovery } from './usePasswordRecovery'

const errorMessages = {
  email: {
    required: loginCopy.validation.emailRequired,
    invalid: loginCopy.validation.emailInvalid,
  },
  password: {
    required: loginCopy.validation.passwordRequired,
    short: loginCopy.validation.passwordShort,
  },
}

function mapErrors(errorKeys) {
  return {
    email: errorKeys.email ? errorMessages.email[errorKeys.email] : '',
    password: errorKeys.password
      ? errorMessages.password[errorKeys.password]
      : '',
  }
}

export function useLoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const signInWithProvider = useSocialAuthLogin()
  const recovery = usePasswordRecovery()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')

  const isSubmitting = status === 'loading'
  const isSuccess = status === 'success'

  useEffect(() => {
    if (!isSuccess) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      navigate('/', { replace: true })
    }, 900)

    return () => window.clearTimeout(timer)
  }, [isSuccess, navigate])

  const handleEmailChange = (event) => {
    setEmail(event.target.value)

    if (errors.email) {
      setErrors((current) => ({ ...current, email: '' }))
    }
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)

    if (errors.password) {
      setErrors((current) => ({ ...current, password: '' }))
    }
  }

  const handleRememberChange = (event) => {
    setRemember(event.target.checked)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current)
  }

  const handleForgotPassword = () => {
    recovery.open(email)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting || isSuccess) {
      return
    }

    const nextErrors = mapErrors(
      validateLoginFields({ email, password }),
    )
    setErrors(nextErrors)

    if (nextErrors.email || nextErrors.password) {
      return
    }

    setStatus('loading')
    await wait(850)

    login({
      name: getDisplayNameFromEmail(email),
      email,
      remember,
      provider: 'email',
    })
    setStatus('success')
  }

  const handleSocialLogin = useCallback(
    (providerId) => {
      signInWithProvider(providerId)
    },
    [signInWithProvider],
  )

  return {
    email,
    password,
    remember,
    showPassword,
    errors,
    status,
    isSubmitting,
    isSuccess,
    recovery,
    handleEmailChange,
    handlePasswordChange,
    handleRememberChange,
    togglePasswordVisibility,
    handleForgotPassword,
    handleSubmit,
    handleSocialLogin,
  }
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/hooks/useAuth'
import { registerCopy } from '../../../data/registerData'
import { useSocialAuthLogin } from '../../../hooks/useSocialAuthLogin'
import { wait } from '../../../utils/async'
import {
  hasErrors,
  validateRegisterFields,
} from '../../../utils/validation'
import { getPasswordStrength } from '../utils/passwordStrength'

const fieldErrorMessages = {
  fullName: {
    required: registerCopy.validation.nameRequired,
    short: registerCopy.validation.nameShort,
  },
  email: {
    required: registerCopy.validation.emailRequired,
    invalid: registerCopy.validation.emailInvalid,
  },
  password: {
    required: registerCopy.validation.passwordRequired,
    short: registerCopy.validation.passwordShort,
  },
  confirmPassword: {
    required: registerCopy.validation.confirmRequired,
    mismatch: registerCopy.validation.confirmMismatch,
  },
  acceptedTerms: {
    required: registerCopy.validation.termsRequired,
  },
}

function mapErrors(errorKeys) {
  return {
    fullName: errorKeys.fullName
      ? fieldErrorMessages.fullName[errorKeys.fullName]
      : '',
    email: errorKeys.email
      ? fieldErrorMessages.email[errorKeys.email]
      : '',
    password: errorKeys.password
      ? fieldErrorMessages.password[errorKeys.password]
      : '',
    confirmPassword: errorKeys.confirmPassword
      ? fieldErrorMessages.confirmPassword[errorKeys.confirmPassword]
      : '',
    acceptedTerms: errorKeys.acceptedTerms
      ? fieldErrorMessages.acceptedTerms[errorKeys.acceptedTerms]
      : '',
  }
}

export function useRegisterForm({ idPrefix = 'register' } = {}) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const signInWithProvider = useSocialAuthLogin()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const isSubmitting = status === 'loading'
  const isSuccess = status === 'success'

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password],
  )
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword
  const matchStatus = !confirmPassword
    ? 'empty'
    : passwordsMatch
      ? 'success'
      : 'error'

  useEffect(() => {
    if (!isSuccess) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      navigate('/', { replace: true })
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [isSuccess, navigate])

  const clearError = (field) => {
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      return { ...current, [field]: '' }
    })
  }

  const handleNameChange = (event) => {
    setFullName(event.target.value)
    clearError('fullName')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    clearError('email')
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    clearError('password')

    if (errors.confirmPassword) {
      clearError('confirmPassword')
    }
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    clearError('confirmPassword')
  }

  const handleTermsChange = (event) => {
    setAcceptedTerms(event.target.checked)
    clearError('acceptedTerms')
  }

  const handleNewsletterChange = (event) => {
    setNewsletter(event.target.checked)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting || isSuccess) {
      return
    }

    const nextErrors = mapErrors(
      validateRegisterFields({
        fullName,
        email,
        password,
        confirmPassword,
        acceptedTerms,
      }),
    )
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      const firstInvalidField = [
        'fullName',
        'email',
        'password',
        'confirmPassword',
        'acceptedTerms',
      ].find((field) => nextErrors[field])
      const fieldIds = {
        fullName: `${idPrefix}-name`,
        email: `${idPrefix}-email`,
        password: `${idPrefix}-password`,
        confirmPassword: `${idPrefix}-confirm-password`,
        acceptedTerms: `${idPrefix}-terms`,
      }

      document.getElementById(fieldIds[firstInvalidField])?.focus()
      return
    }

    setStatus('loading')
    await wait(950)

    login({
      name: fullName.trim(),
      email,
      remember: true,
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
    fullName,
    email,
    password,
    confirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    acceptedTerms,
    newsletter,
    passwordStrength,
    passwordsMatch,
    matchStatus,
    errors,
    status,
    isSubmitting,
    isSuccess,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleTermsChange,
    handleNewsletterChange,
    handleSubmit,
    handleSocialLogin,
  }
}

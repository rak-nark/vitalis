const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value ?? '').trim())
}

export function validateLoginFields({ email, password }) {
  const errors = {}
  const normalizedEmail = String(email ?? '').trim()

  if (!normalizedEmail) {
    errors.email = 'required'
  } else if (!isValidEmail(normalizedEmail)) {
    errors.email = 'invalid'
  }

  if (!password) {
    errors.password = 'required'
  } else if (password.length < 8) {
    errors.password = 'short'
  }

  return errors
}

export function validateRegisterFields({
  fullName,
  email,
  password,
  confirmPassword,
  acceptedTerms,
}) {
  const errors = {}
  const normalizedName = String(fullName ?? '').trim()
  const normalizedEmail = String(email ?? '').trim()

  if (!normalizedName) {
    errors.fullName = 'required'
  } else if (normalizedName.length < 2) {
    errors.fullName = 'short'
  }

  if (!normalizedEmail) {
    errors.email = 'required'
  } else if (!isValidEmail(normalizedEmail)) {
    errors.email = 'invalid'
  }

  if (!password) {
    errors.password = 'required'
  } else if (password.length < 8) {
    errors.password = 'short'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'required'
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'mismatch'
  }

  if (!acceptedTerms) {
    errors.acceptedTerms = 'required'
  }

  return errors
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}

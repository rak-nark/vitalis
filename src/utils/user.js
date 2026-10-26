export function getDisplayNameFromEmail(email) {
  const localPart = String(email ?? '').split('@')[0] ?? ''
  const words = localPart.split(/[._-]+/).filter(Boolean)

  if (!words.length) {
    return 'Usuario Vitalis'
  }

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function getFirstName(name) {
  return String(name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)[0] ?? ''
}

export function getInitials(name) {
  const initials = String(name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

  return initials || 'V'
}

export function formatSessionDate(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

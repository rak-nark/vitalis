const STORAGE_KEY = 'vitalis.auth.session'

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function isValidSession(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.name === 'string' &&
      typeof value.email === 'string',
  )
}

function readFromStorage(storage) {
  try {
    return safeParse(storage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export function readStoredSession() {
  if (typeof window === 'undefined') {
    return null
  }

  const persistentSession = readFromStorage(window.localStorage)

  if (isValidSession(persistentSession)) {
    return persistentSession
  }

  const temporarySession = readFromStorage(window.sessionStorage)

  return isValidSession(temporarySession) ? temporarySession : null
}

export function storeSession(session, remember) {
  if (typeof window === 'undefined') {
    return
  }

  clearStoredSession()

  const storage = remember ? window.localStorage : window.sessionStorage

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // El navegador puede bloquear el almacenamiento (modo privado o cuota).
  }
}

export function clearStoredSession() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Sin acceso a localStorage.
  }

  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Sin acceso a sessionStorage.
  }
}

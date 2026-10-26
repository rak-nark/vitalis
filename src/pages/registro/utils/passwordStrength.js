import { registerCopy } from '../../../data/registerData'

const strengthMeta = {
  0: { label: registerCopy.strength.empty, tone: 'neutral' },
  1: { label: registerCopy.strength.weak, tone: 'error' },
  2: { label: registerCopy.strength.medium, tone: 'warning' },
  3: { label: registerCopy.strength.strong, tone: 'success' },
}

export function getPasswordStrength(password) {
  if (!password) {
    return { score: 0, ...strengthMeta[0] }
  }

  let score = 0
  if (password.length >= 8) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score += 1

  const normalizedScore = Math.max(1, score)
  return { score: normalizedScore, ...strengthMeta[normalizedScore] }
}

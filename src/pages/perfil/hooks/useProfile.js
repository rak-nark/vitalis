import { useCallback, useState } from 'react'
import { useAuth } from '../../../context/hooks/useAuth'
import { useFavorites } from '../../../context/hooks/useFavorites'
import { useHabits } from '../../../context/hooks/useHabits'
import { useUser } from '../../../context/hooks/useUser'
import { providerLabels } from '../../../data/authData'
import {
  desktopBiomarkers,
  mobileBiomarkers,
  profileCopy,
  profileDevices,
  profileGoals,
  profilePrivacySettings,
  profileRestrictions,
  profileSpecialists,
} from '../../../data/profileData'
import { useDocumentTitle } from '../../../hooks/useDocumentTitle'
import { wait } from '../../../utils/async'
import { formatSessionDate, getInitials } from '../../../utils/user'

export function useProfile() {
  useDocumentTitle('Mi Perfil | Vitalis')

  const { session, logout } = useAuth()
  const { user, summary } = useUser()
  const { completedCount, totalCount, progress } = useHabits()
  const { favorites } = useFavorites()

  const [logoutStatus, setLogoutStatus] = useState('idle')
  const [notice, setNotice] = useState('')
  const [exportStatus, setExportStatus] = useState('idle')
  const [preferences, setPreferences] = useState(() =>
    Object.fromEntries(
      profilePrivacySettings.map((setting) => [setting.id, setting.enabled]),
    ),
  )
  const [mobilePanel, setMobilePanel] = useState(null)
  const [savedName, setSavedName] = useState({ sessionId: null, name: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState('')

  const isAuthenticated = Boolean(session)
  const displayName = session?.name ?? ''
  const customName =
    savedName.sessionId === session?.id ? savedName.name : ''
  const profileName = customName || displayName
  const providerLabel = session
    ? providerLabels[session.provider] ?? 'Acceso seguro'
    : ''
  const sessionDate = formatSessionDate(session?.loggedInAt)

  const handleDismissNotice = useCallback(() => {
    setNotice('')
  }, [])

  const handleStartEdit = useCallback(() => {
    setDraftName(profileName)
    setIsEditing(true)
  }, [profileName])

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
    setDraftName(profileName)
  }, [profileName])

  const handleSaveEdit = useCallback(
    (event) => {
      event.preventDefault()

      const nextName = draftName.trim()

      if (!nextName) {
        setNotice('Escribe un nombre válido para continuar.')
        return
      }

      setSavedName({ sessionId: session?.id ?? null, name: nextName })
      setIsEditing(false)
      setNotice('Perfil actualizado correctamente (demostración).')
    },
    [draftName, session?.id],
  )

  const handleExportReport = useCallback(async () => {
    if (exportStatus === 'loading') {
      return
    }

    setExportStatus('loading')
    await wait(700)
    setExportStatus('idle')
    setNotice('Informe clínico generado correctamente (demostración).')
  }, [exportStatus])

  const togglePreference = useCallback((preferenceId) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [preferenceId]: !currentPreferences[preferenceId],
    }))
  }, [])

  const toggleMobilePanel = useCallback((panelId) => {
    setMobilePanel((currentPanel) =>
      currentPanel === panelId ? null : panelId,
    )
  }, [])

  const handleAnalytics = useCallback(() => {
    setNotice(
      'La analítica completa estará disponible en la próxima versión (demostración).',
    )
  }, [])

  const handleAddGoal = useCallback(() => {
    setNotice(
      'Los nuevos objetivos se acuerdan con tu especialista (demostración).',
    )
  }, [])

  const handleLinkDevice = useCallback(() => {
    setNotice('La vinculación de dispositivos es una simulación.')
  }, [])

  const handleOpenDirectory = useCallback(() => {
    setNotice('El directorio médico completo estará disponible pronto.')
  }, [])

  const handleSpecialistAction = useCallback((specialist, action = 'contact') => {
    const messages = {
      contact: `Solicitud enviada a ${specialist.name} (demostración).`,
      schedule: `Solicitud de cita con ${specialist.name} registrada (demostración).`,
      share: `Métricas compartidas con ${specialist.name} (demostración).`,
      log: `Registro enviado a ${specialist.name} (demostración).`,
    }

    setNotice(messages[action] ?? messages.contact)
  }, [])

  const handleLogout = async () => {
    if (logoutStatus === 'loading') {
      return
    }

    setLogoutStatus('loading')
    await wait(600)
    logout()
    setSavedName({ sessionId: null, name: '' })
    setIsEditing(false)
    setDraftName('')
    setMobilePanel(null)
    setLogoutStatus('idle')
    setNotice('Has cerrado sesión correctamente.')
  }

  return {
    isAuthenticated,
    session,
    user,
    summary,
    displayName,
    profileName,
    initials: getInitials(profileName),
    providerLabel,
    sessionDate,
    isRemembered: Boolean(session?.remember),
    stats: {
      completedCount,
      totalCount,
      progress,
      favoriteCount: favorites.size,
      streakDays: user.streakDays,
    },
    copy: profileCopy,
    desktopBiomarkers,
    mobileBiomarkers,
    goals: profileGoals,
    restrictions: profileRestrictions,
    devices: profileDevices,
    specialists: profileSpecialists,
    privacySettings: profilePrivacySettings,
    preferences,
    togglePreference,
    mobilePanel,
    toggleMobilePanel,
    notice,
    handleDismissNotice,
    isEditing,
    draftName,
    setDraftName,
    handleStartEdit,
    handleCancelEdit,
    handleSaveEdit,
    exportStatus,
    handleExportReport,
    handleAnalytics,
    handleAddGoal,
    handleLinkDevice,
    handleOpenDirectory,
    handleSpecialistAction,
    isLoggingOut: logoutStatus === 'loading',
    handleLogout,
  }
}

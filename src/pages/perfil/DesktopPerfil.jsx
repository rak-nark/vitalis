import Icon from '../../components/ui/Icon'
import BiomarkerGrid from './components/BiomarkerGrid'
import ConnectedDevices from './components/ConnectedDevices'
import GuestProfile from './components/GuestProfile'
import PrivacySettings from './components/PrivacySettings'
import ProfileGoals from './components/ProfileGoals'
import ProfileHero from './components/ProfileHero'
import SpecialistGrid from './components/SpecialistGrid'
import { guestProfileCopy } from '../../data/profileData'

export default function DesktopPerfil({ profile }) {
  const {
    isAuthenticated,
    session,
    stats,
    copy,
    desktopBiomarkers,
    goals,
    restrictions,
    devices,
    specialists,
    privacySettings,
    preferences,
    togglePreference,
    providerLabel,
    isRemembered,
    sessionDate,
    isEditing,
    handleStartEdit,
    handleCancelEdit,
    exportStatus,
    handleExportReport,
    handleAnalytics,
    handleAddGoal,
    handleLinkDevice,
    handleOpenDirectory,
    handleSpecialistAction,
    isLoggingOut,
    handleLogout,
  } = profile

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 text-label-sm text-outline">
            <span>{copy.brand}</span>
            <Icon name="chevron_right" className="text-xs" />
            <span>{copy.breadcrumb}</span>
            <Icon name="chevron_right" className="text-xs" />
            <span className="font-semibold text-primary">
              {copy.breadcrumbActive}
            </span>
          </div>
          <h1 className="mt-1 text-headline-lg tracking-tight text-on-surface">
            {isAuthenticated ? copy.title : 'Mi Perfil'}
          </h1>
          <p className="mt-1 max-w-2xl text-body-md text-on-surface-variant">
            {isAuthenticated ? copy.description : guestProfileCopy.description}
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-1.5 text-label-md text-on-secondary-fixed shadow-xs">
              <Icon
                name="local_fire_department"
                className="text-primary"
                filled
              />
              <span>Racha: {stats.streakDays} días</span>
            </div>

            <button
              type="button"
              aria-label="Notificaciones"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            >
              <Icon name="notifications" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </button>

            <div className="flex items-center gap-2 border-l border-outline-variant pl-3">
              <button
                type="button"
                onClick={handleExportReport}
                disabled={exportStatus === 'loading'}
                className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2 text-label-lg text-on-surface shadow-sm transition-colors hover:bg-surface-container disabled:cursor-wait disabled:opacity-70"
              >
                <Icon
                  name={
                    exportStatus === 'loading'
                      ? 'progress_activity'
                      : 'picture_as_pdf'
                  }
                  className={`text-sm ${exportStatus === 'loading' ? 'animate-spin' : ''}`}
                />
                {exportStatus === 'loading'
                  ? copy.exportingLabel
                  : copy.exportLabel}
              </button>
              <button
                type="button"
                onClick={isEditing ? handleCancelEdit : handleStartEdit}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-lg text-on-primary shadow-sm transition-colors hover:bg-primary-container active:scale-95"
              >
                <Icon name={isEditing ? 'close' : 'edit'} className="text-sm" />
                {isEditing ? copy.cancelLabel : copy.editLabel}
              </button>
            </div>
          </div>
        )}
      </header>

      {isAuthenticated ? (
        <div className="space-y-8">
          <ProfileHero profile={profile} />

          <BiomarkerGrid
            biomarkers={desktopBiomarkers}
            copy={copy}
            onAnalytics={handleAnalytics}
          />

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            <ProfileGoals
              goals={goals}
              restrictions={restrictions}
              copy={copy}
              onAddGoal={handleAddGoal}
            />
            <ConnectedDevices
              devices={devices}
              copy={copy}
              onLinkDevice={handleLinkDevice}
            />
          </div>

          <SpecialistGrid
            specialists={specialists}
            copy={copy}
            onSpecialistAction={handleSpecialistAction}
            onOpenDirectory={handleOpenDirectory}
          />

          <PrivacySettings
            settings={privacySettings}
            preferences={preferences}
            onToggle={togglePreference}
            copy={copy}
            session={session}
            providerLabel={providerLabel}
            isRemembered={isRemembered}
            sessionDate={sessionDate}
            isLoggingOut={isLoggingOut}
            onLogout={handleLogout}
          />
        </div>
      ) : (
        <GuestProfile stats={stats} />
      )}
    </main>
  )
}

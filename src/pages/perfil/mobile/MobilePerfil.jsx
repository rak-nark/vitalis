import Icon from '../../../components/ui/Icon'
import { guestProfileCopy } from '../../../data/profileData'
import MobileBiomarkers from './MobileBiomarkers'
import MobileDevices from './MobileDevices'
import MobileGuestProfile from './MobileGuestProfile'
import MobileProfileActions from './MobileProfileActions'
import MobileProfileGoals from './MobileProfileGoals'
import MobileProfileHero from './MobileProfileHero'
import MobileSpecialists from './MobileSpecialists'

export default function MobilePerfil({ profile }) {
  const {
    isAuthenticated,
    session,
    stats,
    copy,
    mobileBiomarkers,
    goals,
    restrictions,
    devices,
    specialists,
    privacySettings,
    preferences,
    togglePreference,
    mobilePanel,
    toggleMobilePanel,
    providerLabel,
    isRemembered,
    sessionDate,
    exportStatus,
    handleExportReport,
    handleAddGoal,
    handleLinkDevice,
    handleSpecialistAction,
    isLoggingOut,
    handleLogout,
  } = profile

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 pt-20 pb-32">
      <section className="flex flex-col gap-1 pt-1">
        <div className="flex items-center justify-between gap-3">
          <span className="text-label-sm font-bold tracking-wider text-secondary uppercase">
            {copy.brand}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-primary-fixed/40 px-2 py-0.5 text-[11px] font-semibold text-primary">
            <Icon name="verified_user" className="text-[13px]" />
            {copy.breadcrumbActive}
          </span>
        </div>
        <h1 className="text-headline-lg-mobile tracking-tight text-on-surface">
          {isAuthenticated ? copy.mobileTitle : 'Mi Perfil'}
        </h1>
        <p className="text-body-sm font-medium text-on-surface-variant">
          {isAuthenticated
            ? copy.mobileDescription
            : guestProfileCopy.description}
        </p>
      </section>

      {isAuthenticated ? (
        <>
          <MobileProfileHero profile={profile} />

          <MobileBiomarkers biomarkers={mobileBiomarkers} copy={copy} />

          <MobileProfileGoals
            goals={goals}
            restrictions={restrictions}
            copy={copy}
            onAddGoal={handleAddGoal}
          />

          <MobileSpecialists
            specialists={specialists}
            copy={copy}
            onSpecialistAction={handleSpecialistAction}
          />

          <MobileDevices
            devices={devices}
            copy={copy}
            onLinkDevice={handleLinkDevice}
          />

          <MobileProfileActions
            copy={copy}
            session={session}
            providerLabel={providerLabel}
            isRemembered={isRemembered}
            sessionDate={sessionDate}
            settings={privacySettings}
            preferences={preferences}
            onTogglePreference={togglePreference}
            mobilePanel={mobilePanel}
            onTogglePanel={toggleMobilePanel}
            exportStatus={exportStatus}
            onExportReport={handleExportReport}
            isLoggingOut={isLoggingOut}
            onLogout={handleLogout}
          />
        </>
      ) : (
        <MobileGuestProfile stats={stats} />
      )}
    </main>
  )
}

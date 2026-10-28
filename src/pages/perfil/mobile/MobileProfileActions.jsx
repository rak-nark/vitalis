import Icon from '../../../components/ui/Icon'
import ToggleSwitch from '../components/ToggleSwitch'

export default function MobileProfileActions({
  copy,
  session,
  providerLabel,
  isRemembered,
  sessionDate,
  settings,
  preferences,
  onTogglePreference,
  mobilePanel,
  onTogglePanel,
  exportStatus,
  onExportReport,
  isLoggingOut,
  onLogout,
}) {
  const notificationSettings = settings.filter(
    (setting) => setting.id !== 'clinical-consent',
  )
  const consentSetting = settings.find(
    (setting) => setting.id === 'clinical-consent',
  )

  return (
    <section className="flex flex-col gap-3">
      <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-3.5 shadow-sm">
        <div className="flex items-center gap-2">
          <Icon name="verified_user" className="text-[18px] text-primary" filled />
          <p className="text-label-md font-bold text-on-surface">
            {copy.accountLabel}
          </p>
        </div>
        <p className="mt-1 truncate text-body-sm font-semibold text-on-surface">
          {session.email}
        </p>
        <p className="mt-0.5 text-label-sm text-on-surface-variant">
          {providerLabel} ·{' '}
          {isRemembered ? 'Recordar en este dispositivo' : 'Sesión temporal'} ·{' '}
          {copy.sessionStartLabel}: {sessionDate || copy.nowLabel}
        </p>
      </div>

      <button
        type="button"
        onClick={onExportReport}
        disabled={exportStatus === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-label-lg font-bold text-on-secondary shadow-md transition-all hover:bg-on-secondary-container active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        <Icon
          name={exportStatus === 'loading' ? 'progress_activity' : 'picture_as_pdf'}
          className={`text-[18px] ${exportStatus === 'loading' ? 'animate-spin' : ''}`}
        />
        {exportStatus === 'loading'
          ? copy.exportingLabel
          : copy.mobileExportLabel}
      </button>

      <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-sm">
        <div className="divide-y divide-outline-variant/20">
          <div>
            <button
              type="button"
              onClick={() => onTogglePanel('notifications')}
              aria-expanded={mobilePanel === 'notifications'}
              aria-controls="mobile-profile-notifications"
              className="flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-surface-container active:bg-surface-variant"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon
                  name="notifications"
                  className="text-[20px] text-on-surface-variant"
                />
                <span className="truncate text-label-md text-on-surface">
                  {copy.notificationsRowMobile}
                </span>
              </div>
              <Icon
                name="chevron_right"
                className={`shrink-0 text-[18px] text-outline-variant transition-transform ${
                  mobilePanel === 'notifications' ? 'rotate-90' : ''
                }`}
              />
            </button>

            {mobilePanel === 'notifications' && (
              <div
                id="mobile-profile-notifications"
                className="space-y-2 bg-surface-container-low/60 px-3.5 pb-3.5"
              >
                {notificationSettings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-3"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <Icon
                        name={setting.icon}
                        className={`text-[18px] ${setting.iconClass}`}
                      />
                      <span className="truncate text-label-sm font-semibold text-on-surface">
                        {setting.mobileTitle ?? setting.title}
                      </span>
                    </div>
                    <ToggleSwitch
                      checked={Boolean(preferences[setting.id])}
                      onChange={() => onTogglePreference(setting.id)}
                      label={setting.title}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => onTogglePanel('privacy')}
              aria-expanded={mobilePanel === 'privacy'}
              aria-controls="mobile-profile-privacy"
              className="flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-surface-container active:bg-surface-variant"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon name="lock" className="text-[20px] text-on-surface-variant" />
                <div className="min-w-0">
                  <span className="block truncate text-label-md text-on-surface">
                    {copy.privacyRowMobile}
                  </span>
                  <span className="block truncate text-label-sm font-semibold text-primary">
                    {copy.privacyRowHint}
                  </span>
                </div>
              </div>
              <Icon
                name="chevron_right"
                className={`shrink-0 text-[18px] text-outline-variant transition-transform ${
                  mobilePanel === 'privacy' ? 'rotate-90' : ''
                }`}
              />
            </button>

            {mobilePanel === 'privacy' && (
              <div
                id="mobile-profile-privacy"
                className="space-y-2 bg-surface-container-low/60 px-3.5 pb-3.5"
              >
                {consentSetting && (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Icon
                        name={consentSetting.icon}
                        className={`text-[18px] ${consentSetting.iconClass}`}
                      />
                      <span className="truncate text-label-sm font-semibold text-on-surface">
                        {consentSetting.mobileTitle ?? consentSetting.title}
                      </span>
                    </div>
                    <ToggleSwitch
                      checked={Boolean(preferences[consentSetting.id])}
                      onChange={() => onTogglePreference(consentSetting.id)}
                      label={consentSetting.title}
                    />
                  </div>
                )}
                <p className="rounded-lg bg-surface-container p-3 text-label-sm text-on-surface-variant">
                  {copy.privacySessionNote}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="group flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-error-container/30 active:bg-error-container/50 disabled:cursor-wait disabled:opacity-70"
          >
            <div className="flex items-center gap-3">
              <Icon
                name={isLoggingOut ? 'progress_activity' : 'logout'}
                className={`text-[20px] text-error ${isLoggingOut ? 'animate-spin' : ''}`}
              />
              <span className="text-label-md font-semibold text-error">
                {isLoggingOut ? copy.loggingOutLabel : copy.logoutLabel}
              </span>
            </div>
            <Icon
              name="chevron_right"
              className="text-[18px] text-error/60 group-hover:text-error"
            />
          </button>
        </div>
      </div>
    </section>
  )
}

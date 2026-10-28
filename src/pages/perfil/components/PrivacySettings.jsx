import Icon from '../../../components/ui/Icon'
import ToggleSwitch from './ToggleSwitch'

export default function PrivacySettings({
  settings,
  preferences,
  onToggle,
  copy,
  session,
  providerLabel,
  isRemembered,
  sessionDate,
  isLoggingOut,
  onLogout,
}) {
  return (
    <section className="card-ambient rounded-xl border border-outline-variant/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
        <div>
          <h2 className="text-headline-sm text-on-surface">{copy.privacyTitle}</h2>
          <p className="text-body-sm text-on-surface-variant">
            {copy.privacySubtitle}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 text-label-sm text-outline">
          <Icon name="lock" className="text-sm text-primary" />
          {copy.privacyBadge}
        </span>
      </div>

      <div className="divide-y divide-outline-variant/30">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <Icon
                  name={setting.icon}
                  className={`text-lg ${setting.iconClass}`}
                />
                <p className="text-label-lg font-bold text-on-surface">
                  {setting.title}
                </p>
              </div>
              <p className="mt-0.5 text-body-sm text-on-surface-variant">
                {setting.description}
              </p>
            </div>
            <ToggleSwitch
              checked={Boolean(preferences[setting.id])}
              onChange={() => onToggle(setting.id)}
              label={setting.title}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 rounded-lg border border-outline-variant/30 bg-surface-container-low/60 p-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-body-md font-semibold text-on-surface">
              {session.email}
            </p>
            <p className="text-body-sm text-on-surface-variant">
              {providerLabel} ·{' '}
              {isRemembered
                ? 'Recordar en este dispositivo'
                : 'Sesión temporal'}{' '}
              · {copy.sessionStartLabel}: {sessionDate || copy.nowLabel}
            </p>
            <p className="mt-1 text-label-sm text-outline">
              {copy.privacySessionNote}
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-error/30 bg-error-container/40 px-4 py-2.5 text-label-md font-bold text-error transition-colors hover:bg-error-container disabled:cursor-wait disabled:opacity-70"
          >
            <Icon
              name={isLoggingOut ? 'progress_activity' : 'logout'}
              className={`text-[18px] ${isLoggingOut ? 'animate-spin' : ''}`}
            />
            {isLoggingOut ? copy.loggingOutLabel : copy.logoutLabel}
          </button>
        </div>
      </div>
    </section>
  )
}

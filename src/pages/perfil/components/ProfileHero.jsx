import Icon from '../../../components/ui/Icon'
import ProfileEditForm from './ProfileEditForm'
import ProfileProgressRing from './ProfileProgressRing'

export default function ProfileHero({ profile }) {
  const {
    user,
    profileName,
    copy,
    stats,
    isEditing,
  } = profile

  return (
    <section className="card-ambient relative overflow-hidden rounded-xl border border-outline-variant/60 bg-linear-to-r from-surface-container-lowest via-surface-container-lowest to-secondary-fixed/20 p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-secondary-fixed/30 blur-2xl"
      />

      <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20 shadow-md">
              <img
                src={user.avatar}
                alt={user.avatarAlt}
                className="h-full w-full object-cover"
              />
            </div>
            <span
              className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-primary text-on-primary"
              title="Monitoreo activo"
            >
              <Icon name="verified" className="text-sm" filled />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-headline-lg font-bold tracking-tight text-on-surface">
                {profileName}
              </h2>
              <span className="rounded-full bg-secondary-container px-3 py-0.5 text-label-sm text-on-secondary-container">
                {copy.memberBadge}
              </span>
            </div>
            <p className="mt-1 text-body-md text-on-surface-variant">
              {copy.demographics} · {copy.memberSince}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high/60 px-2.5 py-1 text-label-md text-on-surface">
                <Icon name="bloodtype" className="text-xs text-primary" />
                {copy.bloodType}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high/60 px-2.5 py-1 text-label-md text-on-surface">
                <Icon
                  name="health_and_safety"
                  className="text-xs text-secondary"
                />
                {copy.allergies}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-label-md text-primary">
                <Icon name="sensors" className="text-xs" filled />
                {copy.monitoring}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-outline-variant/50 bg-surface-container-lowest/80 p-4 shadow-sm backdrop-blur-sm">
          <ProfileProgressRing progress={stats.progress} />
          <div>
            <span className="block text-label-lg font-bold text-on-surface">
              {copy.adherenceTitle}
            </span>
            <span className="block text-body-sm text-on-surface-variant">
              {copy.adherenceSubtitle}
            </span>
            <span className="mt-1 flex items-center gap-1 text-label-md text-primary">
              <Icon name="trending_up" className="text-xs" />
              {copy.adherenceTrend}
            </span>
          </div>
        </div>
      </div>

      {isEditing && <ProfileEditForm profile={profile} />}
    </section>
  )
}

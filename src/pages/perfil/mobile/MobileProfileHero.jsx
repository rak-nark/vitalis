import Icon from '../../../components/ui/Icon'
import ProfileEditForm from '../components/ProfileEditForm'

export default function MobileProfileHero({ profile }) {
  const {
    user,
    profileName,
    copy,
    stats,
    isEditing,
    handleStartEdit,
  } = profile

  return (
    <section className="relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-secondary-fixed/30 blur-2xl"
      />

      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={user.avatar}
            alt={user.avatarAlt}
            className="h-20 w-20 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
          />
          <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary shadow-md ring-2 ring-surface-container-lowest">
            <Icon name="verified" className="text-[14px]" filled />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-headline-sm font-bold text-on-surface">
            {profileName}
          </h2>
          <p className="mt-0.5 text-body-sm text-on-surface-variant">
            {copy.mobileDemographics}
          </p>
          <span className="mt-2 inline-flex max-w-full items-start gap-1.5 rounded-full bg-secondary-container/60 px-2.5 py-1 text-label-sm font-semibold text-on-secondary-container">
            <Icon name="spa" className="mt-0.5 text-[13px]" filled />
            <span className="min-w-0 break-words">{copy.mobileMemberBadge}</span>
          </span>
        </div>
      </div>

      <div className="relative mt-5 rounded-lg border border-outline-variant/20 bg-surface-container-low p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-label-md font-semibold text-on-surface">
            {copy.adherenceTitle}
          </span>
          <span className="text-headline-sm font-bold text-primary">
            {stats.progress}%
          </span>
        </div>

        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-outline-variant/30">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${stats.progress}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 text-label-sm">
          <span className="text-on-surface-variant">
            {copy.adherenceSubtitle}
          </span>
          <span className="flex shrink-0 items-center gap-0.5 font-bold text-primary">
            <Icon name="trending_up" className="text-[13px]" />
            {copy.adherenceTrend}
          </span>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-outline-variant/20 pt-3.5">
        <div className="flex min-w-0 flex-wrap items-center gap-2 text-body-sm text-on-surface-variant">
          <span className="inline-flex items-center gap-1 rounded bg-surface-container px-2 py-0.5 text-label-sm font-semibold text-on-surface">
            <Icon name="bloodtype" className="text-[13px] text-error" />
            {copy.mobileBloodType}
          </span>
          <span className="truncate text-label-sm">{copy.allergies}</span>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-secondary-container/40 px-3 py-1.5 text-label-md font-semibold text-secondary transition-colors hover:bg-secondary-container active:scale-95"
          >
            <Icon name="edit" className="text-[15px]" />
            {copy.mobileEditLabel}
          </button>
        )}
      </div>

      {isEditing && <ProfileEditForm profile={profile} variant="mobile" />}
    </section>
  )
}

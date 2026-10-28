import Icon from '../../../components/ui/Icon'

export default function SpecialistGrid({
  specialists,
  copy,
  onSpecialistAction,
  onOpenDirectory,
}) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-headline-sm text-on-surface">
            {copy.specialistsTitle}
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            {copy.specialistsSubtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenDirectory}
          className="flex items-center gap-1 text-label-lg text-primary transition-colors hover:text-primary-container"
        >
          {copy.specialistsLink}
          <Icon name="medical_services" className="text-sm" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {specialists.map((specialist) => (
          <article
            key={specialist.id}
            className="card-ambient flex flex-col justify-between rounded-xl p-6"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-outline-variant bg-surface-container">
                    {specialist.avatar ? (
                      <img
                        src={specialist.avatar}
                        alt={specialist.avatarAlt || specialist.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center text-headline-sm font-bold ${specialist.avatarClass}`}
                      >
                        {specialist.initials}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-headline-sm font-bold text-on-surface">
                      {specialist.name}
                    </h3>
                    <p className="text-body-sm font-medium text-primary">
                      {specialist.specialty}
                    </p>
                    <p className="mt-1 text-body-sm text-outline">
                      {specialist.credential}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-label-sm ${specialist.badgeClass}`}
                >
                  {specialist.badge}
                </span>
              </div>

              <div className="mt-4 rounded-lg border border-outline-variant/30 bg-surface-container/50 p-3 text-body-sm text-on-surface-variant">
                “{specialist.note}”
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-outline-variant/30 pt-4">
              <button
                type="button"
                onClick={() => onSpecialistAction(specialist, 'schedule')}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-label-md text-on-primary transition-colors hover:bg-primary-container"
              >
                <Icon name={specialist.desktopPrimaryIcon} className="text-sm" />
                {specialist.desktopPrimary}
              </button>
              <button
                type="button"
                onClick={() =>
                  onSpecialistAction(
                    specialist,
                    specialist.id === 'helena-ruiz' ? 'share' : 'log',
                  )
                }
                className="flex items-center gap-1.5 rounded-lg border border-outline-variant px-3 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container"
              >
                <Icon
                  name={specialist.desktopSecondaryIcon}
                  className="text-sm"
                />
                {specialist.desktopSecondary}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

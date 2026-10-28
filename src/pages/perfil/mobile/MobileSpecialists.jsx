import Icon from '../../../components/ui/Icon'

export default function MobileSpecialists({
  specialists,
  copy,
  onSpecialistAction,
}) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-1.5 text-label-lg font-bold text-on-surface">
          <Icon name="medical_services" className="text-[18px] text-primary" />
          {copy.mobileSpecialistsTitle}
        </h2>
        <span className="shrink-0 text-label-sm font-semibold text-primary">
          {copy.mobileSpecialistsActiveLabel}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {specialists.map((specialist) => (
          <article
            key={specialist.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-3.5 shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-container ring-1 ring-outline-variant/40">
                {specialist.avatar ? (
                  <img
                    src={specialist.avatar}
                    alt={specialist.avatarAlt || specialist.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center text-label-md font-bold ${specialist.avatarClass}`}
                  >
                    {specialist.initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-label-md font-bold text-on-surface">
                  {specialist.name}
                </h3>
                <p className="truncate text-[12px] leading-tight text-on-surface-variant">
                  {specialist.mobileSpecialty ?? specialist.specialty}
                </p>
                <div
                  className={`mt-0.5 flex items-center gap-1 text-[11px] leading-tight ${specialist.mobileStatusClass}`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${specialist.mobileDotClass}`}
                  />
                  <span className="truncate">{specialist.mobileStatus}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onSpecialistAction(
                  specialist,
                  specialist.id === 'helena-ruiz' ? 'contact' : 'log',
                )
              }
              className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors active:scale-95 ${specialist.mobileCtaClass}`}
            >
              {specialist.mobileCta}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

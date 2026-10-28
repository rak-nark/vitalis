import Icon from '../../../components/ui/Icon'

function BiomarkerFooter({ footer }) {
  if (!footer) {
    return null
  }

  if (footer.type === 'bars') {
    return (
      <div>
        <div className="mb-1.5 flex h-6 items-end gap-1.5" aria-hidden="true">
          {footer.values.map((value, index) => (
            <span
              key={`${footer.caption}-${index}`}
              style={{ height: value }}
              className={`w-1/6 rounded-t ${
                index === footer.values.length - 1
                  ? 'bg-primary'
                  : 'bg-secondary-container'
              }`}
            />
          ))}
        </div>
        <p className="flex items-center justify-between text-body-sm text-on-surface-variant">
          <span>{footer.caption}</span>
          <span className="font-bold text-primary">{footer.highlight}</span>
        </p>
      </div>
    )
  }

  if (footer.type === 'progress') {
    return (
      <div>
        <div className="mb-2 h-2 w-full rounded-full bg-surface-container">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${footer.progress}%` }}
          />
        </div>
        <p className="text-body-sm text-on-surface-variant">{footer.caption}</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {footer.rows?.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between text-body-sm"
        >
          <span className="text-outline">{row.label}</span>
          <span className="font-bold text-on-surface">{row.value}</span>
        </div>
      ))}
      {footer.note && (
        <p
          className={`flex items-center gap-1 text-body-sm ${footer.noteClass}`}
        >
          <Icon name={footer.noteIcon} className="text-xs" />
          {footer.note}
        </p>
      )}
    </div>
  )
}

export default function BiomarkerGrid({ biomarkers, copy, onAnalytics }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-headline-sm text-on-surface">{copy.biometryTitle}</h2>
          <p className="text-body-sm text-on-surface-variant">
            {copy.biometrySubtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onAnalytics}
          className="flex items-center gap-1 text-label-lg text-primary transition-colors hover:text-primary-container"
        >
          {copy.analyticsLink}
          <Icon name="arrow_forward" className="text-sm" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {biomarkers.map((biomarker) => (
          <article
            key={biomarker.id}
            className="card-ambient flex flex-col justify-between rounded-xl p-5"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${biomarker.desktopIconClass}`}
                >
                  <Icon name={biomarker.icon} className="text-xl" filled />
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-label-sm ${biomarker.badgeClass}`}
                >
                  {biomarker.badge}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-body-sm text-outline">
                  {biomarker.label}
                </span>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-headline-lg font-bold text-on-surface">
                    {biomarker.value}
                  </span>
                  <span className="text-label-md text-outline">
                    {biomarker.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-outline-variant/30 pt-3">
              <BiomarkerFooter footer={biomarker.desktopFooter} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

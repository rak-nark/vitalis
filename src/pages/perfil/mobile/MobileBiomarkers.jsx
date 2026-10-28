import Icon from '../../../components/ui/Icon'

export default function MobileBiomarkers({ biomarkers, copy }) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-label-lg font-bold text-on-surface">
          <Icon name="monitor_heart" className="text-[18px] text-primary" />
          {copy.mobileBiomarkersTitle}
        </h2>
        <span className="shrink-0 text-label-sm text-on-surface-variant">
          {copy.updatedLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {biomarkers.map((biomarker) => (
          <article
            key={biomarker.id}
            className="flex min-w-0 flex-col justify-between rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-3.5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="min-w-0 text-[12px] leading-tight text-on-surface-variant">
                {biomarker.mobileLabel}
              </span>
              {biomarker.mobileLive ? (
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
              ) : (
                <Icon
                  name={biomarker.icon}
                  className={`shrink-0 text-[16px] ${biomarker.mobileIconClass}`}
                />
              )}
            </div>

            <div className="my-1.5 flex items-baseline gap-0.5">
              <span className="text-headline-md font-bold text-on-surface">
                {biomarker.value}
              </span>
              <span className="text-label-sm text-on-surface-variant">
                {biomarker.unit}
              </span>
            </div>

            <div
              className={`inline-flex w-fit max-w-full items-center gap-1 whitespace-normal rounded-full px-2 py-0.5 text-[11px] leading-tight ${biomarker.mobileNoteClass}`}
            >
              {biomarker.mobileNote}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

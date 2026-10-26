import Icon from '../../../components/ui/Icon'
import { dailyMetrics } from '../../../data/homeData'

export default function MobileMetrics() {
  return (
    <section>
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-label-lg font-bold text-on-surface">
          Métricas de hoy
        </h2>
        <span className="text-label-sm font-semibold text-primary">
          En tiempo real
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {dailyMetrics.map((metric) => {
          const mobile = metric.mobile

          return (
            <div
              key={metric.id}
              className="flex flex-col justify-between rounded-xl border border-surface-container-high bg-surface-container-lowest p-3.5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-label-sm text-on-surface-variant">
                  {mobile.label}
                </span>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${mobile.iconClass}`}
                >
                  <Icon name={mobile.icon} className="text-[16px]" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-on-surface">
                    {mobile.value}
                  </span>
                  {mobile.unit && (
                    <span className="text-body-sm text-outline">
                      {mobile.unit}
                    </span>
                  )}
                </div>

                {mobile.showProgress ? (
                  <>
                    <div
                      role="progressbar"
                      aria-label={`${mobile.label}: ${metric.progress}%`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={metric.progress}
                      className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"
                    >
                      <div
                        className={`h-full rounded-full ${mobile.barClass}`}
                        style={{ width: `${metric.progress}%` }}
                      />
                    </div>
                    <span className="mt-1 block text-label-sm text-outline">
                      {mobile.hint}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mt-1.5 flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                      <span className="text-label-sm font-bold text-primary">
                        {mobile.status}
                      </span>
                    </div>
                    <span className="block text-label-sm text-outline">
                      {mobile.hint}
                    </span>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

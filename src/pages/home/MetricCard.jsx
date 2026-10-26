import Icon from '../../components/ui/Icon'

export default function MetricCard({ metric }) {
  return (
    <div
      className={`rounded-xl border border-slate-100/80 bg-surface-container-lowest p-4 transition-all duration-150 ${metric.hoverClass}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-label-md text-on-surface-variant">
          <Icon
            name={metric.icon}
            className={`text-lg ${metric.iconClass}`}
            filled
          />
          {metric.label}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-bold whitespace-nowrap ${metric.badgeClass}`}
        >
          {metric.badge}
        </span>
      </div>

      <div className="mb-2 flex items-baseline gap-1.5">
        <span className="text-headline-sm font-bold text-on-surface">
          {metric.value}
        </span>
        <span className="text-body-sm text-outline">{metric.total}</span>
      </div>

      <div
        role="progressbar"
        aria-label={`${metric.label}: ${metric.progress}%`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={metric.progress}
        className="h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]"
      >
        <div
          className={`h-2 rounded-full ${metric.progressClass}`}
          style={{ width: `${metric.progress}%` }}
        />
      </div>
    </div>
  )
}

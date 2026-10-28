import Icon from '../../../components/ui/Icon'

export default function TrendingTopics({
  copy,
  trends,
  onSelect,
  compact = false,
}) {
  if (compact) {
    return (
      <section className="-mx-4 px-4">
        <div className="flex flex-wrap items-center gap-1.5 text-body-sm text-on-surface-variant">
          <Icon
            name="trending_up"
            className="text-[18px] text-primary"
            filled
          />
          <span className="font-bold text-on-surface">
            {copy.trendsMobileLabel}
          </span>
          <span className="text-label-sm text-outline">
            {copy.trendsRealtime}
          </span>
        </div>

        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto py-1">
          {trends.map((trend) => (
            <button
              key={trend.id}
              type="button"
              onClick={() => onSelect(trend)}
              className="flex shrink-0 items-center gap-1 rounded-full border border-outline-variant/50 bg-surface-container-lowest px-3 py-1.5 text-label-md text-on-surface shadow-sm transition-all hover:border-primary active:scale-95"
            >
              <span className="font-bold text-primary">#</span>
              {trend.mobileLabel}
            </button>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-wrap items-center gap-2 border-y border-outline-variant/60 py-2">
      <span className="flex items-center gap-1.5 text-label-md font-medium text-outline">
        <Icon name="trending_up" className="text-[18px] text-tertiary" />
        {copy.trendsDesktopLabel}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {trends.map((trend) => (
          <button
            key={trend.id}
            type="button"
            onClick={() => onSelect(trend)}
            className="rounded-full border border-outline-variant bg-surface-container-lowest px-3 py-1 text-label-sm text-secondary transition-all hover:border-primary hover:text-primary active:scale-95"
          >
            {trend.label}
          </button>
        ))}
      </div>
    </section>
  )
}

import Icon from '../../../components/ui/Icon'

export default function ProfileStatsStrip({ stats, copy }) {
  const items = [
    {
      id: 'habits',
      icon: 'check_circle',
      iconClass: 'bg-secondary-container text-primary',
      label: copy.statsHabitsLabel,
      value: `${stats.completedCount} / ${stats.totalCount}`,
      hint: `${stats.progress}% completado`,
    },
    {
      id: 'favorites',
      icon: 'favorite',
      iconClass: 'bg-error-container text-error',
      label: copy.statsFavoritesLabel,
      value: stats.favoriteCount,
      hint: copy.statsFavoritesHint,
    },
    {
      id: 'streak',
      icon: 'local_fire_department',
      iconClass: 'bg-tertiary-fixed text-tertiary',
      label: copy.statsStreakLabel,
      value: `${stats.streakDays} días`,
      hint: copy.statsStreakHint,
    },
  ]

  return (
    <div className="relative z-10 mt-5 grid grid-cols-1 gap-2 border-t border-outline-variant/30 pt-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 rounded-lg px-1 py-1">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconClass}`}
          >
            <Icon name={item.icon} className="text-[20px]" filled />
          </span>
          <div className="min-w-0">
            <span className="block text-label-sm text-on-surface-variant">
              {item.label}
            </span>
            <span className="block truncate text-label-lg font-bold text-on-surface">
              {item.value}
            </span>
            <span className="block truncate text-[11px] text-outline">
              {item.hint}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

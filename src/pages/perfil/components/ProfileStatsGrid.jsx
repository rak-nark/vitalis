import Icon from '../../../components/ui/Icon'
import { profileCopy } from '../../../data/profileData'

export default function ProfileStatsGrid({ stats, compact = false }) {
  const items = [
    {
      id: 'streak',
      icon: 'local_fire_department',
      iconClass: 'bg-tertiary-fixed text-tertiary',
      label: 'Racha activa',
      value: `${stats.streakDays} días`,
      hint: 'Constancia sostenida',
    },
    {
      id: 'habits',
      icon: 'check_circle',
      iconClass: 'bg-secondary-container text-primary',
      label: profileCopy.statsHabitsLabel,
      value: `${stats.completedCount} / ${stats.totalCount}`,
      hint: `${stats.progress}% completado`,
    },
    {
      id: 'favorites',
      icon: 'favorite',
      iconClass: 'bg-error-container text-error',
      label: 'Favoritos',
      value: stats.favoriteCount,
      hint: 'Contenidos guardados',
    },
    {
      id: 'adherence',
      icon: 'monitoring',
      iconClass: 'bg-surface-container text-secondary',
      label: 'Adherencia',
      value: `${stats.progress}%`,
      hint: 'Meta diaria',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl border border-surface-container-high bg-surface-container-lowest ${
            compact ? 'p-3' : 'p-4'
          }`}
        >
          <div
            className={`mb-2 flex items-center justify-center rounded-lg ${item.iconClass} ${
              compact ? 'h-8 w-8' : 'h-9 w-9'
            }`}
          >
            <Icon name={item.icon} className="text-[20px]" filled />
          </div>
          <span className="block text-label-sm text-on-surface-variant">
            {item.label}
          </span>
          <span className="mt-0.5 block text-headline-sm font-bold text-on-surface">
            {item.value}
          </span>
          <span className="mt-0.5 block text-[11px] text-outline">
            {item.hint}
          </span>
        </div>
      ))}
    </div>
  )
}

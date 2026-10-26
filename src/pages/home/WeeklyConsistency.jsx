import { weeklyAdherence, weeklyConsistency } from '../../data/homeData'

export default function WeeklyConsistency({ todayCompleted }) {
  return (
    <div className="space-y-3 border-t border-slate-100 pt-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-label-md font-semibold text-on-surface">
          Consistencia de Hábitos (Últimos 7 días)
        </span>
        <span className="text-body-sm font-semibold text-primary">
          {weeklyAdherence}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 pt-2 text-center">
        {weeklyConsistency.map((day) => {
          const completed = day.isToday ? todayCompleted : day.completed
          const percentage = Math.min(
            100,
            Math.round((completed / day.total) * 100),
          )

          return (
            <div key={day.id} className="flex flex-col items-center gap-1.5">
              <div
                role="img"
                aria-label={`${day.label}: ${completed} de ${day.total} hábitos completados`}
                className={`flex h-24 w-full items-end rounded-lg p-1 ${
                  day.isToday
                    ? 'border border-primary/20 bg-emerald-50'
                    : 'bg-slate-100'
                }`}
              >
                <div
                  className={`w-full rounded-md ${
                    day.isToday
                      ? 'progress-bar-glow bg-primary'
                      : 'bg-primary/80'
                  }`}
                  style={{ height: `${percentage}%` }}
                />
              </div>
              <span
                className={`text-[11px] font-bold ${
                  day.isToday ? 'text-primary' : 'text-outline'
                }`}
              >
                {day.label}
              </span>
              <span
                className={`text-[10px] font-semibold ${
                  day.isToday ? 'font-bold text-primary' : 'text-primary'
                }`}
              >
                {completed}/{day.total}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

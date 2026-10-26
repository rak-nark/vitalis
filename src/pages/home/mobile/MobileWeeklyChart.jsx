import {
  weeklyAdherenceMobile,
  weeklyConsistency,
} from '../../../data/homeData'

export default function MobileWeeklyChart({ todayCompleted }) {
  return (
    <div className="-mx-4 -mb-4 mt-1 rounded-b-xl border-t border-surface-container-high bg-surface-container/30 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-label-md font-bold text-on-surface">
          Adherencia semanal
        </span>
        <span className="text-label-sm font-bold text-primary">
          {weeklyAdherenceMobile}
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 pt-2">
        {weeklyConsistency.map((day) => {
          const completed = day.isToday ? todayCompleted : day.completed
          const percentage = Math.min(
            100,
            Math.round((completed / day.total) * 100),
          )
          const baseOpacity = 0.4 + (completed / day.total) * 0.6

          return (
            <div key={day.id} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-10 w-full items-end">
                <div
                  role="img"
                  aria-label={`${day.label}: ${completed} de ${day.total} hábitos completados`}
                  className={`w-full rounded-t bg-primary ${
                    day.isToday ? 'ring-2 ring-primary-fixed' : ''
                  }`}
                  style={{
                    height: `${percentage}%`,
                    opacity: day.isToday ? 1 : baseOpacity,
                  }}
                />
              </div>
              <span
                className={`text-[10px] ${
                  day.isToday
                    ? 'font-bold text-primary'
                    : 'font-semibold text-outline'
                }`}
              >
                {day.shortLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

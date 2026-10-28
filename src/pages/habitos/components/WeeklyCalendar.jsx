import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

function dayClasses(day, isSelected) {
  if (day.isToday) {
    return 'border-2 border-primary bg-primary text-on-primary shadow-sm'
  }

  if (isSelected) {
    return 'border-2 border-primary bg-secondary-container/30'
  }

  if (day.status === 'complete') {
    return 'border border-outline-variant/40 bg-surface-container-low/40'
  }

  return 'border border-outline-variant/30 opacity-75'
}

export default function WeeklyCalendar({
  week,
  selectedDay,
  selectedDayId,
  onSelectDay,
  onPreviousDay,
  onNextDay,
  canGoPrevious,
  canGoNext,
  filterOptions,
  activeFilter,
  onFilterChange,
}) {
  return (
    <section className="card-ambient rounded-xl p-5">
      <div className="flex flex-col justify-between gap-4 border-b border-outline-variant/60 pb-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-headline-sm font-bold text-on-surface">
            {week.label}
          </h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onPreviousDay}
              disabled={!canGoPrevious}
              aria-label="Día anterior"
              className={clsx(
                'rounded-lg border p-1.5 transition-colors',
                canGoPrevious
                  ? 'border-outline-variant text-outline hover:bg-surface-container'
                  : 'cursor-not-allowed border-outline-variant/40 text-outline/40',
              )}
            >
              <Icon name="chevron_left" className="text-sm" />
            </button>
            <button
              type="button"
              onClick={onNextDay}
              disabled={!canGoNext}
              aria-label="Día siguiente"
              className={clsx(
                'rounded-lg border p-1.5 transition-colors',
                canGoNext
                  ? 'border-outline-variant text-outline hover:bg-surface-container'
                  : 'cursor-not-allowed border-outline-variant/40 text-outline/40',
              )}
            >
              <Icon name="chevron_right" className="text-sm" />
            </button>
          </div>
        </div>

        <div
          role="group"
          aria-label="Filtrar hábitos por momento del día"
          className="flex items-center gap-1 rounded-lg bg-surface-container-low p-1"
        >
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange(filter.id)}
                className={clsx(
                  'rounded-md px-3 py-1.5 text-label-sm font-bold transition-colors',
                  isActive
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface',
                )}
              >
                {filter.label}
                {filter.id === 'all' ? ` (${filter.count})` : ''}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 pt-4 sm:gap-3">
        {week.days.map((day) => {
          const isSelected = day.id === selectedDayId

          return (
            <button
              key={day.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${day.label} ${day.date}: ${day.completed} de ${day.total} hábitos completados`}
              onClick={() => onSelectDay(day.id)}
              className={clsx(
                'relative flex flex-col items-center rounded-xl p-2 text-center transition-all sm:p-3',
                dayClasses(day, isSelected),
              )}
            >
              {day.isToday && (
                <span className="absolute -top-2.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-on-primary shadow-sm">
                  HOY
                </span>
              )}

              <span
                className={clsx(
                  'text-label-sm font-bold',
                  day.isToday
                    ? 'text-secondary-container'
                    : isSelected
                      ? 'text-primary'
                      : 'text-outline',
                )}
              >
                {day.label}
              </span>
              <span
                className={clsx(
                  'my-1 text-headline-sm font-extrabold',
                  day.isToday
                    ? 'text-on-primary'
                    : isSelected
                      ? 'text-primary'
                      : 'text-on-surface',
                )}
              >
                {day.date}
              </span>

              {day.isToday ? (
                <span className="rounded-full bg-primary-container px-1.5 py-0.5 text-[9px] font-bold text-on-primary">
                  {day.completed}/{day.total}
                </span>
              ) : day.status === 'complete' ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm">
                  <Icon name="check" className="text-sm" />
                </span>
              ) : (
                <span className="h-6 w-6 rounded-full border border-dashed border-outline-variant" />
              )}

              <span
                className={clsx(
                  'mt-1 text-[10px] font-bold',
                  day.isToday
                    ? 'text-secondary-container'
                    : day.status === 'complete'
                      ? 'text-primary'
                      : 'text-outline',
                )}
              >
                {day.isToday
                  ? 'En curso'
                  : day.status === 'complete'
                    ? `${day.completed}/${day.total}`
                    : 'Prog.'}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-label-sm text-outline">
        <span>
          Seleccionaste{' '}
          <strong className="font-bold text-on-surface">
            {selectedDay.label} {selectedDay.date}
          </strong>{' '}
          · {selectedDay.completed}/{selectedDay.total} hábitos
        </span>
        <span className="flex items-center gap-1 font-semibold text-primary">
          <Icon name="trending_up" className="text-[15px]" />
          {week.average} de adherencia semanal
        </span>
      </div>
    </section>
  )
}

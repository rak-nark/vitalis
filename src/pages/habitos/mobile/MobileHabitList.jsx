import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'
import MobileHabitCard from './MobileHabitCard'

export default function MobileHabitList({
  habits,
  filterOptions,
  activeFilter,
  onFilterChange,
  onToggle,
  completedCount,
  totalCount,
  listId,
}) {
  return (
    <section id={listId} className="flex scroll-mt-24 flex-col gap-3">
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-label-lg font-bold text-on-surface">
          Hábitos de hoy
        </h2>
        <span className="text-label-sm font-semibold text-primary">
          {completedCount} de {totalCount}
        </span>
      </div>

      <div
        role="group"
        aria-label="Filtrar hábitos por momento del día"
        className="no-scrollbar flex items-center gap-2 overflow-x-auto py-0.5"
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
                'shrink-0 rounded-full px-3.5 py-1.5 text-label-sm font-bold transition-all active:scale-95',
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:border-primary/40',
              )}
            >
              {filter.label} ({filter.count})
            </button>
          )
        })}
      </div>

      {habits.length > 0 ? (
        <div className="flex flex-col gap-2">
          {habits.map((habit) => (
            <MobileHabitCard
              key={habit.id}
              habit={habit}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-8 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-outline">
            <Icon name="filter_alt_off" className="text-[24px]" />
          </div>
          <h3 className="text-headline-sm text-on-surface">
            Sin hábitos en este momento
          </h3>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            Cambia el filtro a “Todos” para ver tu protocolo completo.
          </p>
        </div>
      )}
    </section>
  )
}

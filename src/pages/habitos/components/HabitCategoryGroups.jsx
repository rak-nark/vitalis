import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'
import HabitCard from './HabitCard'
import HabitTipCard from './HabitTipCard'

export default function HabitCategoryGroups({
  categories,
  completedCount,
  totalCount,
  recoveryTip,
  title,
  listId,
  onToggle,
}) {
  return (
    <section id={listId} className="scroll-mt-24 space-y-5">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Icon name="task_alt" className="text-primary" />
          <h2 className="text-headline-md font-bold text-on-surface">{title}</h2>
        </div>
        <span className="text-label-sm text-outline">
          {completedCount} de {totalCount} completados hoy
        </span>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center justify-between gap-3 px-1">
                <span className="flex items-center gap-1.5 text-label-md font-bold tracking-wider text-outline uppercase">
                  <Icon
                    name={category.icon}
                    className="text-sm text-primary"
                  />
                  {category.label}
                </span>
                <span
                  className={clsx(
                    'shrink-0 text-label-sm font-semibold',
                    category.progress === 100
                      ? 'text-primary'
                      : 'text-outline',
                  )}
                >
                  {category.completedCount}/{category.totalCount} Completados
                </span>
              </div>

              {category.habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} onToggle={onToggle} />
              ))}

              {category.id === 'recovery' && recoveryTip && (
                <HabitTipCard tip={recoveryTip} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card-ambient flex flex-col items-center rounded-xl px-6 py-10 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-outline">
            <Icon name="filter_alt_off" className="text-[24px]" />
          </div>
          <h3 className="text-headline-sm text-on-surface">
            No hay hábitos en este momento del día
          </h3>
          <p className="mt-1 max-w-md text-body-md text-on-surface-variant">
            Cambia el filtro a “Todos” para revisar tu protocolo completo.
          </p>
        </div>
      )}
    </section>
  )
}

import Icon from '../../components/ui/Icon'
import HabitRow from './HabitRow'
import WeeklyConsistency from './WeeklyConsistency'
import { useHabitsOverview } from './hooks/useHabitsOverview'

export default function HabitsSection() {
  const { habits, toggleHabit, completedCount, totalCount } =
    useHabitsOverview()

  return (
    <div
      id="habitos"
      className="card-ambient space-y-6 rounded-xl p-6 lg:p-7"
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 text-label-sm font-bold tracking-wider text-primary uppercase">
            <Icon name="check_circle" className="text-base" />
            <span>RF5 · Seguimiento y Adherencia</span>
          </div>
          <h3 className="text-headline-md text-on-surface">
            Hábitos Diarios y Consistencia
          </h3>
        </div>
        <span className="self-start rounded-full bg-secondary-container px-3 py-1 text-label-md text-on-secondary-container sm:self-center">
          {completedCount} de {totalCount} completados hoy
        </span>
      </div>

      <div className="space-y-3">
        {habits.map((habit) => (
          <HabitRow key={habit.id} habit={habit} onToggle={toggleHabit} />
        ))}
      </div>

      <WeeklyConsistency todayCompleted={completedCount} />
    </div>
  )
}

import { useHabitsOverview } from '../hooks/useHabitsOverview'
import MobileHabitRow from './MobileHabitRow'
import MobileWeeklyChart from './MobileWeeklyChart'

export default function MobileHabits() {
  const { habits, toggleHabit, completedCount, totalCount } =
    useHabitsOverview()

  return (
    <section
      id="mobile-habitos"
      className="rounded-xl border border-surface-container-high bg-surface-container-lowest p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-surface-container-high pb-3">
        <div>
          <h2 className="text-headline-sm text-on-surface">Hábitos Diarios</h2>
          <span className="text-body-sm text-on-surface-variant">
            Mantén tu constancia celular
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-secondary-container px-2.5 py-1 text-label-sm font-bold text-on-secondary-container">
          {completedCount} de {totalCount} completados
        </span>
      </div>

      <div className="flex flex-col divide-y divide-surface-container">
        {habits.map((habit) => (
          <MobileHabitRow
            key={habit.id}
            habit={habit}
            onToggle={toggleHabit}
          />
        ))}
      </div>

      <MobileWeeklyChart todayCompleted={completedCount} />
    </section>
  )
}

import Icon from '../../components/ui/Icon'
import { weeklyChallenge } from '../../data/homeData'
import { useWeeklyChallenge } from './hooks/useWeeklyChallenge'

export default function WeeklyChallenge() {
  const { registered, completedDinners, progress, registerDinner } =
    useWeeklyChallenge()

  return (
    <div className="card-ambient space-y-4 rounded-xl p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-label-sm font-bold tracking-wider text-amber-700 uppercase">
          <Icon name="trophy" className="text-sm" />
          {weeklyChallenge.label}
        </span>
        <span className="text-[11px] font-semibold whitespace-nowrap text-outline">
          {weeklyChallenge.daysLeft}
        </span>
      </div>

      <div>
        <h4 className="text-label-lg font-bold text-on-surface">
          {weeklyChallenge.title}
        </h4>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          {weeklyChallenge.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-body-sm">
        <span className="text-outline">Progreso actual:</span>
        <span className="font-bold text-primary" aria-live="polite">
          {completedDinners} de 5 cenas
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
        <div
          className="h-2 rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={registerDinner}
        disabled={registered}
        className={`w-full rounded-lg border py-2.5 text-label-md transition-all ${
          registered
            ? 'cursor-default border-primary/20 bg-secondary-container text-on-secondary-container'
            : 'border-primary/20 bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary active:scale-95'
        }`}
      >
        {registered ? 'Cena registrada · ¡Buen trabajo!' : weeklyChallenge.cta}
      </button>
    </div>
  )
}

import Icon from '../../components/ui/Icon'
import { dailyMetrics } from '../../data/homeData'
import MetricCard from './MetricCard'
import { useWelcomeBanner } from './hooks/useWelcomeBanner'

export default function WelcomeBanner() {
  const {
    user,
    summary,
    completedCount,
    totalCount,
    circumference,
    dashOffset,
  } = useWelcomeBanner()

  return (
    <section className="card-ambient relative overflow-hidden rounded-xl bg-linear-to-br from-surface-container-lowest via-surface-container-lowest to-surface-container-low p-6 transition-all duration-200 lg:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-label-sm tracking-wider text-on-secondary-container uppercase">
            <Icon name="auto_awesome" className="text-sm" filled />
            <span>Ritmo Diario Activo</span>
          </div>

          <h1 className="text-headline-lg-mobile tracking-tight text-on-surface sm:text-headline-lg">
            ¡Hola, {user.firstName}! Tu objetivo de hoy está al{' '}
            <span className="font-extrabold text-primary">
              {summary.goalPercentage}%
            </span>
          </h1>

          <p className="text-body-md text-on-surface-variant">
            Has completado {completedCount} de tus {totalCount} hábitos
            programados. Mantienes un balance metabólico óptimo y estás a solo{' '}
            {summary.hydrationRemaining} de alcanzar tu meta de hidratación.
          </p>
        </div>

        <div className="flex items-center gap-6 self-start rounded-xl border border-slate-100 bg-surface-container-lowest p-4 shadow-sm lg:self-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg
              className="h-20 w-20 -rotate-90"
              viewBox="0 0 72 72"
              aria-hidden="true"
            >
              <circle
                cx="36"
                cy="36"
                r="30"
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="6"
              />
              <circle
                cx="36"
                cy="36"
                r="30"
                fill="transparent"
                stroke="#006948"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-label-lg font-bold text-on-surface">
                {summary.goalPercentage}%
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-outline uppercase">
                Hoy
              </span>
            </div>
          </div>

          <div>
            <span className="block text-label-md text-outline">
              Calificación de Vitalidad
            </span>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="text-headline-sm font-bold text-primary">
                {summary.vitalityLabel}
              </span>
              <Icon name="check_circle" className="text-lg text-primary" filled />
            </div>
            <p className="mt-0.5 text-body-sm text-on-surface-variant">
              {summary.vitalityDelta}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {dailyMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  )
}

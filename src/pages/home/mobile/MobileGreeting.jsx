import Icon from '../../../components/ui/Icon'
import { useMobileGreeting } from '../hooks/useMobileGreeting'

export default function MobileGreeting() {
  const { user, summary } = useMobileGreeting()

  return (
    <section className="flex flex-col gap-2 pt-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-headline-lg-mobile tracking-tight text-on-surface">
            ¡Hola, {user.firstName}!
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Tu objetivo de hoy está al{' '}
            <span className="font-bold text-primary">
              {summary.goalPercentage}%
            </span>
            .
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary-container px-2.5 py-1 text-label-sm font-bold text-on-secondary-container">
          {summary.vitalityLabel}
          <Icon name="auto_awesome" className="text-[13px]" filled />
          {summary.vitalityDeltaCompact}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-surface-container-high bg-surface-container-lowest p-4 shadow-sm">
        <div className="flex-1">
          <span className="block text-label-sm tracking-wider text-on-surface-variant uppercase">
            Puntaje Vitalis
          </span>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-primary">
              {summary.goalPercentage}
            </span>
            <span className="text-body-sm text-outline">/100</span>
          </div>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            {summary.vitalityCopy}
          </p>
        </div>

        <div
          className="relative flex h-16 w-16 shrink-0 items-center justify-center"
          aria-label={`Puntaje de vitalidad: ${summary.goalPercentage} de 100`}
        >
          <svg
            className="h-16 w-16 -rotate-90"
            viewBox="0 0 36 36"
            aria-hidden="true"
          >
            <path
              className="stroke-current text-surface-container"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="3.5"
            />
            <path
              className="stroke-current text-primary"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeDasharray={`${summary.goalPercentage}, 100`}
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </svg>
          <span className="absolute text-label-sm font-bold text-primary">
            {summary.goalPercentage}%
          </span>
        </div>
      </div>
    </section>
  )
}

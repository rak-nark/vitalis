import Icon from '../../../components/ui/Icon'

const MOBILE_RADIUS = 28
const MOBILE_CIRCUMFERENCE = 2 * Math.PI * MOBILE_RADIUS

export default function MobileHabitsHero({
  user,
  completedCount,
  totalCount,
  remainingCount,
  progress,
  metrics,
  copy,
}) {
  const dashOffset = MOBILE_CIRCUMFERENCE * (1 - progress / 100)

  return (
    <section className="relative overflow-hidden rounded-xl border border-outline-variant/30 bg-linear-to-b from-surface-container-lowest to-surface-container-low/40 p-4 shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-secondary-fixed/20 blur-2xl"
      />

      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-secondary-container bg-secondary-container/50 px-2 py-0.5 text-label-sm font-bold tracking-wider text-primary uppercase">
            <Icon name="check_circle" className="text-[14px]" filled />
            {copy.mobileHeroBadge}
          </span>

          <h2 className="mt-1 text-headline-md font-extrabold tracking-tight text-on-surface">
            {completedCount} de {totalCount}{' '}
            <span className="text-label-lg font-normal text-on-surface-variant">
              completados
            </span>
          </h2>
          <p className="mt-1 text-body-sm leading-snug text-on-surface-variant">
            {remainingCount > 0
              ? `¡Estás a solo ${remainingCount} hábitos de completar tu meta de hoy!`
              : '¡Meta diaria completada! Mantén tu ritmo biológico.'}
          </p>
        </div>

        <div
          className="relative flex h-20 w-20 shrink-0 items-center justify-center"
          role="img"
          aria-label={`Progreso de hábitos: ${progress}%`}
        >
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 72 72"
            aria-hidden="true"
          >
            <circle
              cx="36"
              cy="36"
              r={MOBILE_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="6.5"
              className="text-surface-container"
            />
            <circle
              cx="36"
              cy="36"
              r={MOBILE_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeDasharray={MOBILE_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className="text-primary transition-all duration-700"
            />
          </svg>
          <span className="absolute text-headline-sm font-extrabold text-on-surface">
            {progress}%
          </span>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-outline-variant/20 pt-3">
        {metrics.slice(0, 3).map((metric) => (
          <div
            key={metric.id}
            className="rounded-lg border border-outline-variant/20 bg-surface-container-lowest/80 p-2 text-center shadow-sm"
          >
            <div
              className={`flex items-center justify-center gap-1 ${metric.iconClass}`}
            >
              <Icon name={metric.icon} className="text-[15px]" />
              <span className="text-label-sm font-bold">{metric.value}</span>
            </div>
            <span className="text-[10px] text-on-surface-variant">
              {metric.mobileLabel}
            </span>
          </div>
        ))}
      </div>

      <p className="relative mt-3 flex items-center gap-1 text-[11px] font-medium text-outline">
        <Icon name="waving_hand" className="text-[14px] text-primary" />
        Hola, {user.firstName}. Tu protocolo se adapta a tu energía de hoy.
      </p>
    </section>
  )
}

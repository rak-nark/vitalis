import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function MobileSuggestionBanner({ suggestion, added, onAdd }) {
  if (!suggestion) {
    return null
  }

  return (
    <section className="flex items-center justify-between gap-3 rounded-xl border border-secondary-fixed-dim/40 bg-linear-to-r from-secondary-fixed/40 to-surface-container p-3.5 shadow-sm">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-sm">
          <Icon name={suggestion.icon} className="text-[20px]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold tracking-wider text-secondary uppercase">
            Sugerencia Clínica IA
          </span>
          <p className="mt-0.5 text-body-sm leading-tight font-semibold text-on-surface">
            {suggestion.title}{' '}
            <span className={clsx('font-bold', suggestion.impactClass)}>
              ({suggestion.impact})
            </span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAdd}
        disabled={added}
        className={clsx(
          'shrink-0 rounded-lg border px-2.5 py-1.5 text-label-sm font-bold shadow-sm transition-all active:scale-95',
          added
            ? 'cursor-default border-primary/20 bg-secondary-container text-on-secondary-container'
            : 'border-secondary/30 bg-surface-container-lowest text-primary hover:bg-secondary-container',
        )}
      >
        {added ? 'Añadido' : '+ Añadir'}
      </button>
    </section>
  )
}

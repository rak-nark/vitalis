import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function AiSuggestions({
  suggestions,
  isSuggestionAdded,
  onAddSuggestion,
}) {
  return (
    <section className="card-ambient rounded-xl p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="neurology" className="text-primary" filled />
          <h2 className="text-headline-sm font-bold text-on-surface">
            Vitalis AI Sugerencias
          </h2>
        </div>
        <span className="rounded-full bg-secondary-container px-2 py-0.5 text-label-sm font-bold text-on-secondary-container">
          Personalizado
        </span>
      </div>

      <p className="mb-4 text-body-sm text-on-surface-variant">
        Basado en tus biomarcadores de sueño y cortisol de las últimas 72 horas:
      </p>

      <div className="space-y-4">
        {suggestions.map((suggestion) => {
          const added = isSuggestionAdded(suggestion.id)

          return (
            <article
              key={suggestion.id}
              className="rounded-xl border border-outline-variant/60 bg-surface-container-low p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start gap-3">
                <div
                  className={clsx(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    suggestion.iconBgClass,
                    suggestion.iconClass,
                  )}
                >
                  <Icon name={suggestion.icon} className="text-lg" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-label-md font-bold text-on-surface">
                    {suggestion.title}
                  </h3>
                  <p className="mt-0.5 text-body-sm text-on-surface-variant">
                    {suggestion.description}
                  </p>
                  <span
                    className={clsx(
                      'mt-2 inline-block text-label-sm font-bold',
                      suggestion.impactClass,
                    )}
                  >
                    {suggestion.impact}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAddSuggestion(suggestion)}
                disabled={added}
                className={clsx(
                  'mt-3 flex w-full items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-label-sm font-bold transition-colors',
                  added
                    ? 'cursor-default border-primary/20 bg-secondary-container text-on-secondary-container'
                    : 'border-primary text-primary hover:bg-primary hover:text-on-primary',
                )}
              >
                <Icon name={added ? 'check' : 'add'} className="text-sm" />
                {added ? 'Añadido a mis hábitos' : 'Añadir a mis hábitos'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

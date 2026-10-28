import Icon from '../../../components/ui/Icon'

export default function ProfileGoals({
  goals,
  restrictions,
  copy,
  onAddGoal,
}) {
  return (
    <section className="card-ambient flex flex-col justify-between rounded-xl p-6">
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-2">
            <Icon name="flag" className="text-primary" />
            <h2 className="text-headline-sm text-on-surface">
              {copy.goalsTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onAddGoal}
            className="flex items-center gap-1 text-label-md text-primary transition-colors hover:text-primary-container"
          >
            <Icon name="add" className="text-sm" />
            {copy.addGoal}
          </button>
        </div>

        <div className="mt-4">
          <span className="mb-2 block text-label-md text-outline">
            {copy.goalsActiveLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {goals.map((goal) => (
              <span
                key={goal.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-secondary-container bg-secondary-container/60 px-3 py-1.5 text-label-md text-on-secondary-container"
              >
                <Icon name={goal.icon} className="text-sm" filled />
                {goal.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <span className="mb-2 block text-label-md text-outline">
            {copy.restrictionsLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {restrictions.map((restriction) => (
              <span
                key={restriction.id}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-label-md ${restriction.chipClass}`}
              >
                <Icon name={restriction.icon} className="text-sm" />
                {restriction.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddGoal}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-outline-variant px-4 py-2.5 text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
      >
        <Icon name="add_circle" className="text-sm" />
        {copy.goalCta}
      </button>
    </section>
  )
}

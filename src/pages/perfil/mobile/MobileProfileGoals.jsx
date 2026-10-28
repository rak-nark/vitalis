import Icon from '../../../components/ui/Icon'

export default function MobileProfileGoals({
  goals,
  restrictions,
  copy,
  onAddGoal,
}) {
  return (
    <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-1.5 text-label-lg font-bold text-on-surface">
          <Icon name="flag" className="text-[18px] text-primary" />
          {copy.goalsTitle}
        </h2>
        <button
          type="button"
          onClick={onAddGoal}
          className="shrink-0 text-label-sm font-bold text-primary transition-colors hover:text-primary-container active:scale-95"
        >
          + {copy.addGoal}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {goals.slice(0, 3).map((goal) => (
          <span
            key={goal.id}
            className="inline-flex items-center gap-1 rounded-full border border-outline-variant/20 bg-secondary-container/50 px-3 py-1.5 text-label-sm font-semibold text-on-secondary-container"
          >
            <Icon name={goal.icon} className="text-[13px] text-primary" filled />
            {goal.mobileLabel ?? goal.label}
          </span>
        ))}
      </div>

      <div className="mt-3.5 border-t border-outline-variant/20 pt-3">
        <span className="mb-2 block text-label-sm text-on-surface-variant">
          {copy.mobileRestrictionsLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {restrictions.slice(0, 2).map((restriction) => (
            <span
              key={restriction.id}
              className="inline-flex items-center gap-1 rounded-full border border-outline-variant/30 bg-surface-container px-2.5 py-1 text-label-sm text-on-surface"
            >
              <Icon name={restriction.icon} className="text-[13px] text-tertiary" />
              {restriction.mobileLabel ?? restriction.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

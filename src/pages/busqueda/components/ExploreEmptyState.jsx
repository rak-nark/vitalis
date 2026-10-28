import Icon from '../../../components/ui/Icon'

export default function ExploreEmptyState({ copy, onReset }) {
  return (
    <div className="card-ambient flex flex-col items-center rounded-xl px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container text-outline">
        <Icon name="search_off" className="text-[28px]" />
      </div>
      <h2 className="text-headline-sm text-on-surface">{copy.emptyTitle}</h2>
      <p className="mt-2 max-w-md text-body-md text-on-surface-variant">
        {copy.emptyDescription}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg font-bold text-on-primary transition-colors hover:bg-primary-container active:scale-95"
      >
        <Icon name="restart_alt" className="text-[18px]" />
        {copy.emptyCta}
      </button>
    </div>
  )
}

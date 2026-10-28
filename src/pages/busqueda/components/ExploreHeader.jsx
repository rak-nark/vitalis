import Icon from '../../../components/ui/Icon'

export default function ExploreHeader({ copy }) {
  return (
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-label-sm text-outline">
          <span>{copy.brand}</span>
          <Icon name="chevron_right" className="text-xs" />
          <span className="font-semibold text-primary">{copy.breadcrumb}</span>
        </div>
        <h1 className="mt-1 text-headline-lg tracking-tight text-on-surface">
          {copy.title}
        </h1>
        <p className="mt-1 max-w-2xl text-body-md text-on-surface-variant">
          {copy.description}
        </p>
      </div>

      <div className="flex flex-col items-start gap-2 md:items-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-label-sm font-medium text-on-secondary-container">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {copy.updatedLabel}
        </span>
        <span className="flex items-center gap-2 text-label-sm text-outline">
          <Icon
            name="verified_user"
            className="text-[18px] text-primary"
            filled
          />
          {copy.ebmLabel}
        </span>
      </div>
    </header>
  )
}

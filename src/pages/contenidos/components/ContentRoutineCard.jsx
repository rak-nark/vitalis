import FavoriteButton from '../../../components/ui/FavoriteButton'
import Icon from '../../../components/ui/Icon'

export default function ContentRoutineCard({
  content,
  presentation,
  favorite,
  onToggleFavorite,
  onOpen,
  onAction,
}) {
  return (
    <article className="card-ambient flex h-full flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`rounded-full border border-outline-variant/20 px-3 py-1 text-label-sm font-bold ${content.badgeClass}`}
          >
            {content.badge}
          </span>
          <FavoriteButton
            favorite={favorite}
            onToggle={() => onToggleFavorite(content)}
            title={content.shortTitle}
            variant="plain"
            className="-mt-1 -mr-1"
          />
        </div>

        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-label-sm text-outline">
            <Icon name={content.metaIcon} className="text-[15px]" />
            <span>{content.meta}</span>
            <span>•</span>
            <span className="font-semibold text-secondary">
              {content.secondaryMeta}
            </span>
          </div>
          <h2 className="text-headline-sm leading-snug font-bold text-on-surface">
            {content.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-body-sm text-on-surface-variant">
            {content.description}
          </p>
        </div>

        <div className="space-y-2 rounded-xl border border-secondary/20 bg-linear-to-br from-secondary-container/30 to-surface-container p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-label-sm font-bold text-primary">
              {presentation.impactLabel}
            </span>
            <Icon
              name="monitor_heart"
              className="text-[20px] text-primary"
            />
          </div>
          <div className="text-headline-sm font-bold text-on-surface">
            {presentation.impactValue}
          </div>
          <p className="text-body-sm text-on-surface-variant">
            {presentation.impactDescription}
          </p>
        </div>

        <div className="flex items-center gap-2 text-body-sm text-outline">
          <Icon
            name={presentation.scheduleIcon}
            className="text-[18px] text-primary"
          />
          <span>
            Recomendación: <strong>{presentation.recommendation}</strong>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-outline-variant/20 pt-4">
        <button
          type="button"
          onClick={() => onOpen(content)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-label-md font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
        >
          <Icon name="play_arrow" className="text-[20px]" />
          <span>{presentation.desktopCtaLabel ?? content.cta}</span>
        </button>

        {presentation.secondaryActions?.map((action) => (
          <button
            key={action.icon}
            type="button"
            title={action.label}
            aria-label={action.label}
            onClick={() => onAction(action.notice)}
            className="rounded-lg bg-surface-container p-2.5 text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <Icon name={action.icon} className="text-[20px]" />
          </button>
        ))}
      </div>
    </article>
  )
}

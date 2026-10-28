import FavoriteButton from '../../../components/ui/FavoriteButton'
import Icon from '../../../components/ui/Icon'

export default function ContentArticleCard({
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
            <Icon name="menu_book" className="text-[15px]" />
            <span>{content.meta}</span>
            <span>•</span>
            <span className="font-semibold text-primary">
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

        <div className="flex items-center gap-3 rounded-xl border border-outline-variant/20 bg-surface-container-low/70 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-primary">
            {presentation.authorInitials}
          </div>
          <div className="text-body-sm">
            <p className="font-semibold text-on-surface">{content.author}</p>
            <p className="text-xs text-outline">{content.authorRole}</p>
          </div>
        </div>

        {content.quote ? (
          <blockquote className="rounded-xl border-l-4 border-primary bg-surface-container p-3.5 text-body-sm text-on-surface-variant italic">
            “{content.quote.text.replace(/^["“]|["”]$/g, '')}”
          </blockquote>
        ) : (
          <div className="space-y-2 rounded-xl bg-surface-container p-3.5">
            <div className="flex items-center gap-1.5 text-label-sm font-semibold text-primary">
              <Icon name="verified_user" className="text-[16px]" />
              <span>{presentation.insightTitle}</span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              {presentation.insightText}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-outline-variant/20 pt-4">
        <button
          type="button"
          onClick={() => onOpen(content)}
          className="flex-1 rounded-lg bg-primary px-3 py-2 text-label-md font-semibold text-on-primary transition-colors hover:bg-primary-container"
        >
          {content.cta}
        </button>
        <button
          type="button"
          onClick={() => onAction(presentation.articleAction.notice)}
          aria-label={presentation.articleAction.title ?? presentation.articleAction.label}
          title={presentation.articleAction.title ?? presentation.articleAction.label}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-surface-container px-3 py-2 text-label-md whitespace-nowrap text-on-surface transition-colors hover:bg-surface-container-high"
        >
          <Icon
            name={presentation.articleAction.icon}
            className="text-[18px]"
          />
          <span>{presentation.articleAction.label}</span>
        </button>
      </div>
    </article>
  )
}

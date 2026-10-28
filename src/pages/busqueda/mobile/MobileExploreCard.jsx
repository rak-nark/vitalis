import FavoriteButton from '../../../components/ui/FavoriteButton'
import Icon from '../../../components/ui/Icon'

const ctaStyles = {
  recipe:
    'bg-surface-container-low text-primary hover:bg-secondary-container hover:text-on-secondary-container',
  routine:
    'bg-secondary text-on-secondary hover:bg-primary active:scale-95',
  article:
    'bg-primary text-on-primary hover:bg-primary-container active:scale-95',
}

function MobileVisualCard({
  content,
  favorite,
  onToggleFavorite,
  onOpen,
}) {
  const { mobile } = content

  return (
    <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-3.5 shadow-sm transition-all hover:shadow-md">
      <div className="flex gap-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-container">
          <img
            src={content.image}
            alt={content.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <FavoriteButton
            favorite={favorite}
            onToggle={() => onToggleFavorite(content)}
            title={content.shortTitle}
            variant="mini"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${content.badgeClass}`}
              >
                {mobile.category}
              </span>
              <span className="text-[11px] text-outline">
                • {mobile.time}
              </span>
            </div>
            <h3 className="line-clamp-2 text-headline-sm text-[16px] leading-snug font-bold text-on-surface">
              {content.shortTitle}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {mobile.kcal && (
              <span className="rounded-full bg-surface-container px-2 py-0.5 text-label-sm font-semibold text-on-surface-variant">
                {mobile.kcal}
              </span>
            )}
            {mobile.protein && (
              <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-label-sm font-bold text-[#1E40AF]">
                {mobile.protein}
              </span>
            )}
            {mobile.note && (
              <span className="text-label-sm text-outline">
                {mobile.note}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-surface-container-high/60 pt-2.5">
        <span className="flex min-w-0 items-center gap-1 text-body-sm text-outline">
          <Icon name={mobile.footerIcon} className="text-[15px]" />
          <span className="truncate">{mobile.footer}</span>
        </span>
        <button
          type="button"
          onClick={() => onOpen(content)}
          className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-label-md font-semibold transition-all ${ctaStyles[content.type]}`}
        >
          <span>{mobile.cta}</span>
          <Icon name={mobile.ctaIcon} className="text-[14px]" />
        </button>
      </div>
    </article>
  )
}

function MobileArticleCard({
  content,
  favorite,
  onToggleFavorite,
  onOpen,
}) {
  const { mobile } = content

  return (
    <article className="space-y-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold text-on-secondary-container">
              <Icon name="verified" className="text-[12px]" filled />
              {mobile.category}
            </span>
            <span className="text-label-sm text-outline">
              {mobile.footer}
            </span>
          </div>
          <h3 className="line-clamp-2 text-headline-sm text-[16px] leading-snug font-bold text-on-surface">
            {content.shortTitle}
          </h3>
        </div>

        <FavoriteButton
          favorite={favorite}
          onToggle={() => onToggleFavorite(content)}
          title={content.shortTitle}
          variant="plain"
        />
      </div>

      <p className="line-clamp-2 text-body-sm leading-relaxed text-on-surface-variant">
        {content.description}
      </p>

      <div className="flex items-center justify-between gap-2 border-t border-surface-container-high/60 pt-2.5">
        <div className="flex min-w-0 items-center gap-1.5 text-label-sm text-outline">
          <Icon name="schedule" className="text-[15px] text-primary" />
          <span className="truncate">
            {mobile.time}
            {mobile.note ? ` • ${mobile.note}` : ''}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onOpen(content)}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3.5 py-1.5 text-label-md text-on-primary transition-all hover:bg-primary-container active:scale-95"
        >
          <span>{mobile.cta}</span>
          <Icon name={mobile.ctaIcon} className="text-[14px]" />
        </button>
      </div>
    </article>
  )
}

export default function MobileExploreCard({
  content,
  favorite,
  onToggleFavorite,
  onOpen,
}) {
  if (content.type === 'article') {
    return (
      <MobileArticleCard
        content={content}
        favorite={favorite}
        onToggleFavorite={onToggleFavorite}
        onOpen={onOpen}
      />
    )
  }

  return (
    <MobileVisualCard
      content={content}
      favorite={favorite}
      onToggleFavorite={onToggleFavorite}
      onOpen={onOpen}
    />
  )
}

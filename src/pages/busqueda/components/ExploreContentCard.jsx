import FavoriteButton from '../../../components/ui/FavoriteButton'
import Icon from '../../../components/ui/Icon'

function ArticleCard({ content, favorite, onToggleFavorite, onOpen }) {
  return (
    <article className="card-ambient flex flex-col justify-between rounded-xl p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`rounded-full px-2.5 py-1 text-label-sm font-semibold ${content.badgeClass}`}
          >
            {content.badge}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-label-sm font-bold text-primary">
            <Icon name="check_circle" className="text-[16px]" filled />
            {content.evidence}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-headline-sm leading-snug font-bold text-on-surface transition-colors hover:text-primary">
            {content.title}
          </h3>
          <p className="line-clamp-3 text-body-md text-on-surface-variant">
            {content.description}
          </p>
        </div>

        {content.quote && (
          <div className="space-y-1 rounded-lg border-l-2 border-primary bg-surface-container-low p-3">
            <p className="text-label-sm font-bold text-primary">
              {content.quote.label}
            </p>
            <p className="text-body-sm text-on-surface-variant italic">
              {content.quote.text}
            </p>
          </div>
        )}

        <div className="space-y-1 pt-2">
          <div className="flex flex-wrap items-center gap-2 text-label-sm text-outline">
            <Icon name={content.metaIcon} className="text-[16px]" />
            <span>{content.meta}</span>
            <span>•</span>
            <span>{content.secondaryMeta}</span>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Autoría: <strong>{content.author}</strong> · {content.authorRole}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-outline-variant/40 pt-4">
        <button
          type="button"
          onClick={() => onOpen(content)}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-label-lg font-semibold text-on-primary transition-all hover:bg-secondary active:scale-95"
        >
          {content.cta}
        </button>
        <FavoriteButton
          favorite={favorite}
          onToggle={() => onToggleFavorite(content)}
          title={content.shortTitle}
          variant="outline"
        />
      </div>
    </article>
  )
}

function VisualCard({ content, favorite, onToggleFavorite, onOpen }) {
  return (
    <article className="card-ambient group flex flex-col overflow-hidden rounded-xl">
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        <img
          src={content.image}
          alt={content.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 rounded-full bg-surface-container-lowest/95 px-2.5 py-1 text-label-sm font-bold shadow-sm backdrop-blur-sm ${content.badgeClass}`}
        >
          {content.badge}
        </span>
        <FavoriteButton
          favorite={favorite}
          onToggle={() => onToggleFavorite(content)}
          title={content.shortTitle}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-label-sm text-outline">
          <Icon name={content.metaIcon} className="text-[16px]" />
          <span>{content.meta}</span>
          <span>•</span>
          <span>{content.secondaryMeta}</span>
        </div>

        <h3 className="mt-2 text-headline-sm font-bold text-on-surface transition-colors group-hover:text-primary">
          {content.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-body-sm text-on-surface-variant">
          {content.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {content.tags.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-full px-2 py-0.5 text-label-sm font-semibold ${tag.className}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {content.footerNote && (
          <p className="mt-3 flex items-center gap-1.5 text-label-sm font-semibold text-primary">
            <Icon name={content.footerIcon} className="text-[16px]" />
            {content.footerNote}
          </p>
        )}

        <p className="mt-auto pt-3 text-body-sm text-on-surface-variant">
          Por <strong>{content.author}</strong> · {content.authorRole}
        </p>

        <div className="mt-4 border-t border-outline-variant/40 pt-4">
          <button
            type="button"
            onClick={() => onOpen(content)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary-container px-4 py-2.5 text-label-lg font-semibold text-on-secondary-container transition-all hover:bg-primary hover:text-on-primary active:scale-95"
          >
            <Icon name={content.ctaIcon} className="text-[18px]" />
            {content.cta}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ExploreContentCard({
  content,
  favorite,
  onToggleFavorite,
  onOpen,
}) {
  if (content.type === 'article') {
    return (
      <ArticleCard
        content={content}
        favorite={favorite}
        onToggleFavorite={onToggleFavorite}
        onOpen={onOpen}
      />
    )
  }

  return (
    <VisualCard
      content={content}
      favorite={favorite}
      onToggleFavorite={onToggleFavorite}
      onOpen={onOpen}
    />
  )
}

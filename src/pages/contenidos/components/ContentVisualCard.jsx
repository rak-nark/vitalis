import clsx from 'clsx'
import FavoriteButton from '../../../components/ui/FavoriteButton'
import Icon from '../../../components/ui/Icon'

export default function ContentVisualCard({
  content,
  presentation,
  favorite,
  onToggleFavorite,
  onOpen,
  onAction,
  view,
}) {
  const isList = view === 'list'
  const isRoutine = content.type === 'routine'

  return (
    <article
      className={clsx(
        'card-ambient group flex h-full overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest transition-all duration-200',
        isList ? 'flex-col sm:flex-row' : 'flex-col',
      )}
    >
      <div
        className={clsx(
          'relative overflow-hidden bg-surface-container',
          isList
            ? 'h-48 w-full shrink-0 sm:h-auto sm:w-64'
            : 'h-48 w-full',
        )}
      >
        <img
          src={content.image}
          alt={content.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

        <span className="absolute top-3 left-3 rounded-full bg-surface-container-lowest/90 px-2.5 py-1 text-label-sm font-bold text-primary shadow-sm backdrop-blur-md">
          {content.badge}
        </span>

        <FavoriteButton
          favorite={favorite}
          onToggle={() => onToggleFavorite(content)}
          title={content.shortTitle}
        />

        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-label-sm text-white">
          <span className="flex items-center gap-1 rounded-md bg-black/40 px-2 py-0.5 backdrop-blur-sm">
            <Icon name={content.metaIcon} className="text-[14px]" />
            {content.meta}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-black/40 px-2 py-0.5 backdrop-blur-sm">
            <Icon
              name={isRoutine ? 'bolt' : 'local_fire_department'}
              className="text-[14px]"
            />
            {content.secondaryMeta}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <h2 className="text-headline-sm font-bold text-on-surface transition-colors group-hover:text-primary">
            {content.title}
          </h2>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            {content.description}
          </p>
        </div>

        {isRoutine ? (
          <div className="space-y-1.5 text-body-sm">
            <div className="flex items-center gap-2 text-outline">
              <Icon name="fitness_center" className="text-[18px] text-primary" />
              <span>
                Equipo: <strong>{presentation.equipment}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-outline">
              <Icon name="verified" className="text-[18px] text-primary" />
              <span>
                Articulaciones: <strong>{presentation.joints}</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-label-sm font-bold text-outline">
              {presentation.macroLabel}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {content.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={clsx(
                    'rounded-full border border-black/5 px-2.5 py-1 text-label-sm font-semibold',
                    tag.className,
                  )}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 border-t border-outline-variant/20 pt-3">
          <button
            type="button"
            onClick={() => onOpen(content)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-label-md font-semibold text-on-primary transition-colors hover:bg-primary-container"
          >
            {isRoutine && (
              <Icon name={content.ctaIcon} className="text-[18px]" />
            )}
            <span>{content.cta}</span>
          </button>

          {presentation.secondaryActions?.map((action) => (
            <button
              key={action.icon}
              type="button"
              title={action.label}
              aria-label={action.label}
              onClick={() => onAction(action.notice)}
              className={clsx(
                'rounded-lg p-2 transition-colors',
                action.icon === 'share'
                  ? 'text-outline hover:bg-surface-container hover:text-on-surface'
                  : 'border border-secondary/20 bg-secondary-container/40 text-primary hover:bg-secondary-container',
              )}
            >
              <Icon name={action.icon} className="text-[20px]" />
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

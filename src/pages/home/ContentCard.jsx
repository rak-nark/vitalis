import Icon from '../../components/ui/Icon'
import { useFavoriteContent } from './hooks/useFavoriteContent'

const ctaStyles = {
  primary:
    'bg-primary text-on-primary shadow-sm hover:bg-primary-container',
  secondary:
    'bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary',
}

export default function ContentCard({ content }) {
  const { favorite, handleToggleFavorite } = useFavoriteContent(content.id)

  return (
    <article className="card-ambient group flex flex-col overflow-hidden rounded-xl transition-all duration-200">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={content.image}
          alt={content.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-label-sm text-primary shadow-sm backdrop-blur-sm">
            <Icon name={content.topBadgeIcon} className="text-xs" />
            {content.topBadgeLabel}
          </span>
        </div>

        <button
          type="button"
          aria-label={
            favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'
          }
          aria-pressed={favorite}
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-sm transition-all duration-150 hover:bg-slate-900/60 active:scale-90 ${
            favorite ? 'text-rose-500' : 'text-white'
          }`}
        >
          <Icon name="favorite" className="text-xl" filled={favorite} />
        </button>

        <div className="absolute bottom-3 left-3 flex gap-2">
          {content.tags.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${tag.className}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
        <div>
          <div className="mb-1.5 flex items-center gap-3 text-body-sm text-outline">
            <span className="flex items-center gap-1">
              <Icon name={content.durationIcon} className="text-sm" />
              {content.duration}
            </span>
            <span>•</span>
            <span
              className={`flex items-center gap-1 font-semibold ${content.difficultyClass}`}
            >
              <Icon name={content.difficultyIcon} className="text-sm" />
              {content.difficulty}
            </span>
          </div>

          <h3 className="text-headline-sm text-on-surface transition-colors group-hover:text-primary">
            {content.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-body-sm text-on-surface-variant">
            {content.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-label-sm text-outline">{content.category}</span>
          <button
            type="button"
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-label-md font-semibold transition-all duration-150 active:scale-95 ${ctaStyles[content.ctaVariant]}`}
          >
            <span>{content.cta}</span>
            <Icon name={content.ctaIcon} className="text-base" />
          </button>
        </div>
      </div>
    </article>
  )
}

import Icon from '../../../components/ui/Icon'
import { useFavoriteContent } from '../hooks/useFavoriteContent'

const ctaStyles = {
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
}

export default function MobileContentCard({ content }) {
  const { favorite, handleToggleFavorite } = useFavoriteContent(content.id)
  const mobile = content.mobile

  return (
    <article className="flex min-w-[280px] max-w-[285px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={content.image}
          alt={content.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute top-2.5 left-2.5 rounded-full bg-surface-container-lowest/90 px-2 py-0.5 text-label-sm font-bold shadow-sm backdrop-blur-sm ${mobile.categoryClass}`}
        >
          {mobile.category}
        </span>
        <button
          type="button"
          aria-label={
            favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'
          }
          aria-pressed={favorite}
          onClick={handleToggleFavorite}
          className={`absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/90 shadow-sm backdrop-blur-sm transition-transform active:scale-90 ${
            favorite ? 'text-error' : 'text-outline hover:text-error'
          }`}
        >
          <Icon name="favorite" className="text-[18px]" filled={favorite} />
        </button>
      </div>

      <div className="flex flex-col gap-2 p-3.5">
        <h3 className="line-clamp-1 text-label-lg font-bold text-on-surface">
          {content.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {content.tags.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-full px-2 py-0.5 text-label-sm font-semibold ${tag.className}`}
            >
              {tag.label}
            </span>
          ))}
          <span className="flex items-center gap-1 rounded-full bg-surface-container px-2 py-0.5 text-label-sm text-on-surface-variant">
            <Icon name="schedule" className="text-[12px]" />
            {mobile.time}
          </span>
        </div>

        <button
          type="button"
          className={`mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-label-md font-bold transition-transform active:scale-95 ${ctaStyles[mobile.ctaVariant]}`}
        >
          {mobile.cta}
          <Icon name={mobile.ctaIcon} className="text-[16px]" />
        </button>
      </div>
    </article>
  )
}

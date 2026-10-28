import Icon from '../../../components/ui/Icon'

export default function FeaturedGuide({
  featured,
  onRead,
  isSaved,
  onToggleSaved,
}) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-secondary/30 bg-linear-to-br from-primary to-[#064E3B] p-8 text-on-primary shadow-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-primary-fixed/10 blur-3xl"
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-on-primary/20 bg-on-primary/10 px-3 py-1 text-label-sm tracking-wider text-primary-fixed uppercase backdrop-blur-sm">
            <Icon name="verified" className="text-[16px]" filled />
            <span>{featured.badge}</span>
            <span className="text-on-primary/50">·</span>
            <span className="normal-case tracking-normal">
              {featured.week}
            </span>
          </div>

          <h2 className="max-w-3xl text-headline-lg font-bold leading-tight tracking-tight text-white">
            {featured.title}
          </h2>
          <p className="max-w-2xl text-body-lg leading-relaxed text-inverse-on-surface">
            {featured.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-label-md text-secondary-fixed">
            <div className="flex items-center gap-2">
              <Icon name="medical_services" className="text-[18px]" />
              <span>
                Aval: <strong>{featured.author}</strong> (
                {featured.authorRole})
              </span>
            </div>
            <span className="text-on-primary/40">•</span>
            <div className="flex items-center gap-1.5">
              <Icon name="schedule" className="text-[18px]" />
              <span>{featured.readTime}</span>
            </div>
            <span className="text-on-primary/40">•</span>
            <span className="rounded bg-secondary-container px-2 py-0.5 text-label-sm font-semibold text-on-secondary-container">
              {featured.evidence}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onRead}
              className="inline-flex items-center gap-2 rounded-lg bg-surface-container-lowest px-6 py-3 text-label-lg font-bold text-primary shadow-md transition-all hover:bg-secondary-container hover:text-on-secondary-container active:scale-95"
            >
              <span>{featured.cta}</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
            <button
              type="button"
              aria-label={
                isSaved
                  ? 'Quitar guía destacada de favoritos'
                  : 'Guardar guía destacada en favoritos'
              }
              aria-pressed={isSaved}
              onClick={onToggleSaved}
              className="rounded-lg border border-on-primary/20 bg-on-primary/10 p-3 text-white transition-all hover:bg-on-primary/20 active:scale-95"
            >
              <Icon
                name="bookmark"
                className="text-[20px]"
                filled={isSaved}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:col-span-4 lg:justify-end">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl border-2 border-on-primary/20 shadow-2xl">
            <img
              src={featured.image}
              alt={featured.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-3 bottom-3 left-3 rounded-lg bg-surface-container-lowest/90 p-3 text-on-surface backdrop-blur-md">
              <p className="text-label-sm font-bold text-primary">
                {featured.phase}
              </p>
              <p className="text-body-sm text-on-surface-variant">
                {featured.recipes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

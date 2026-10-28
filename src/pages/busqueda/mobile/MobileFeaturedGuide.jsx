import Icon from '../../../components/ui/Icon'

export default function MobileFeaturedGuide({
  featured,
  onRead,
  isSaved,
  onToggleSaved,
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#064e3b] via-[#065f46] to-[#047857] p-5 text-white shadow-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-primary-fixed/15 blur-2xl"
      />

      <div className="relative z-10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-secondary-fixed uppercase backdrop-blur-md">
            <Icon
              name="verified"
              className="text-[14px]"
              filled
            />
            <span>Protocolo Destacado</span>
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[11px] font-medium text-surface-container-high/80">
              {featured.week}
            </span>
            <button
              type="button"
              aria-label={
                isSaved
                  ? 'Quitar guía destacada de favoritos'
                  : 'Guardar guía destacada en favoritos'
              }
              aria-pressed={isSaved}
              onClick={onToggleSaved}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-90"
            >
              <Icon
                name="bookmark"
                className="text-[15px]"
                filled={isSaved}
              />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-headline-sm leading-snug font-bold tracking-tight text-white">
            {featured.mobileTitle}
          </h2>
          <p className="text-body-sm leading-relaxed text-surface-container-low/90">
            {featured.mobileDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-label-sm text-secondary-fixed">
          <span>Aval {featured.author}</span>
          <span>•</span>
          <span>{featured.readTime}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-black/20 px-2 py-0.5">
            <Icon name="policy" className="text-[13px]" />
            {featured.evidence}
          </span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onRead}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-label-lg font-bold text-primary shadow-md transition-all hover:bg-surface-container-lowest active:scale-95"
          >
            <span>{featured.mobileCta}</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>
      </div>
    </section>
  )
}

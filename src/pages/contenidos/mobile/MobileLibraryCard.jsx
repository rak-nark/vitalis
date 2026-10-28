import FavoriteButton from '../../../components/ui/FavoriteButton'
import Icon from '../../../components/ui/Icon'

function getQuoteText(content, presentation) {
  if (content.quote?.text) {
    return content.quote.text.replace(/^["“]|["”]$/g, '')
  }

  return presentation.insightText
}

function MobileRecipeHero({
  content,
  presentation,
  favorite,
  onToggleFavorite,
  onOpen,
  onAction,
  copy,
}) {
  return (
    <article className="card-ambient rounded-xl border border-outline-variant/20 p-3.5">
      <div className="relative mb-3 h-44 w-full overflow-hidden rounded-lg">
        <img
          src={content.image}
          alt={content.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        <span className="absolute top-2.5 left-2.5 rounded-full bg-surface-container-lowest/90 px-2.5 py-1 text-label-sm font-semibold text-primary shadow-sm backdrop-blur-md">
          {content.badge}
        </span>

        <FavoriteButton
          favorite={favorite}
          onToggle={() => onToggleFavorite(content)}
          title={content.shortTitle}
        />

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-3 text-label-sm text-white">
          <span className="flex items-center gap-1">
            <Icon name={content.metaIcon} className="text-[14px]" />
            {content.meta}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="local_fire_department" className="text-[14px]" />
            {content.secondaryMeta}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-headline-sm font-semibold tracking-tight text-on-surface">
            {content.shortTitle}
          </h2>
          <p className="mt-0.5 line-clamp-2 text-body-sm text-on-surface-variant">
            {content.description}
          </p>
        </div>
        <button
          type="button"
          aria-label="Más opciones"
          onClick={() => onAction('optionsNotice')}
          className="rounded p-1 text-outline transition-colors hover:bg-surface-container"
        >
          <Icon name="more_vert" className="text-[18px]" />
        </button>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {content.tags.map((tag) => (
          <span
            key={tag.label}
            className={`rounded-full px-2 py-0.5 text-label-sm font-medium ${tag.className}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-outline-variant/15 pt-3">
        <span className="text-label-sm text-outline">
          {presentation.mobileFooterLabel ?? copy.libraryLabel}
        </span>
        <button
          type="button"
          onClick={() => onOpen(content)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container px-3.5 py-1.5 text-label-md text-on-primary-container shadow-sm transition-all hover:bg-primary active:scale-95"
        >
          <span>{content.mobile.cta}</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </button>
      </div>
    </article>
  )
}

function MobileArticle({
  content,
  presentation,
  favorite,
  onToggleFavorite,
  onOpen,
}) {
  return (
    <article className="card-ambient rounded-xl border border-outline-variant/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-label-sm font-semibold ${content.badgeClass}`}
          >
            {content.badge}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-[#EFF6FF] px-2 py-0.5 text-label-sm font-medium text-[#1E40AF]">
            <Icon name="verified" className="text-[12px]" filled />
            {content.difficulty}
          </span>
        </div>
        <FavoriteButton
          favorite={favorite}
          onToggle={() => onToggleFavorite(content)}
          title={content.shortTitle}
          variant="plain"
          className="bg-surface-container-low shadow-sm"
        />
      </div>

      <h2 className="mt-2.5 text-headline-sm font-semibold tracking-tight text-on-surface">
        {content.shortTitle}
      </h2>

      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-body-sm text-on-surface-variant">
        <span className="flex items-center gap-1">
          <Icon name="menu_book" className="text-[14px]" />
          {content.meta}
        </span>
        <span>•</span>
        <span className="text-outline">{content.secondaryMeta}</span>
      </div>

      <blockquote className="my-3 rounded-r-lg border-l-2 border-primary/40 bg-surface-container-low/50 py-2 pr-2 pl-3">
        <p className="text-body-sm text-on-surface-variant italic">
          “{getQuoteText(content, presentation)}”
        </p>
      </blockquote>

      <div className="flex items-center gap-2.5 py-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-container text-label-sm font-bold text-on-secondary-container">
          {presentation.authorInitials}
        </div>
        <div className="text-label-sm">
          <p className="font-semibold text-on-surface">{content.author}</p>
          <p className="text-[10px] text-outline">{content.authorRole}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-outline-variant/15 pt-3">
        <span className="text-label-sm text-outline">
          {content.secondaryMeta}
        </span>
        <button
          type="button"
          onClick={() => onOpen(content)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-1.5 text-label-md text-on-secondary shadow-sm transition-all hover:bg-primary active:scale-95"
        >
          <span>{content.mobile.cta}</span>
          <Icon name={content.mobile.ctaIcon} className="text-[16px]" />
        </button>
      </div>
    </article>
  )
}

function MobileRoutine({
  content,
  presentation,
  favorite,
  onToggleFavorite,
  onOpen,
}) {
  return (
    <article className="card-ambient rounded-xl border border-outline-variant/20 p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-container text-primary">
            <Icon
              name={presentation.mobileIcon}
              className="text-[22px]"
            />
          </div>
          <div className="min-w-0">
            <span className="text-label-sm font-semibold text-primary">
              {content.badge}
            </span>
            <h2 className="text-headline-sm font-semibold tracking-tight text-on-surface">
              {content.shortTitle}
            </h2>
          </div>
        </div>
        <FavoriteButton
          favorite={favorite}
          onToggle={() => onToggleFavorite(content)}
          title={content.shortTitle}
          variant="plain"
          className="bg-surface-container-low shadow-sm"
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-surface-container-low/70 p-2.5 text-center">
        <div>
          <span className="text-[10px] font-medium text-outline uppercase">
            Duración
          </span>
          <p className="text-label-md font-semibold text-on-surface">
            {content.meta}
          </p>
        </div>
        <div className="border-x border-outline-variant/30">
          <span className="text-[10px] font-medium text-outline uppercase">
            Intensidad
          </span>
          <p className="text-label-md font-semibold text-tertiary-container">
            {presentation.mobileIntensity}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-outline uppercase">
            Equipo
          </span>
          <p className="text-label-md font-semibold text-on-surface">
            {presentation.mobileEquipment}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1.5 text-body-sm text-on-surface-variant">
          <Icon name="check_circle" className="text-[16px] text-primary" />
          <span className="truncate">{presentation.mobileNote}</span>
        </div>
        <button
          type="button"
          onClick={() => onOpen(content)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary-container px-3.5 py-1.5 text-label-md text-on-primary-container shadow-sm transition-all hover:bg-primary active:scale-95"
        >
          <Icon name="play_arrow" className="text-[16px]" filled />
          <span>{content.mobile.cta}</span>
        </button>
      </div>
    </article>
  )
}

function MobileRecipeCompact({
  content,
  presentation,
  favorite,
  onToggleFavorite,
  onOpen,
}) {
  return (
    <article className="card-ambient rounded-xl border border-outline-variant/20 p-3.5">
      <div className="flex gap-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
          <img
            src={content.image}
            alt={content.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-1">
              <span className="rounded-full bg-secondary-container/60 px-2 py-0.5 text-label-sm font-medium text-on-secondary-container">
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
            <h2 className="mt-1 text-body-lg font-semibold text-on-surface">
              {content.shortTitle}
            </h2>
            <p className="text-body-sm text-outline">
              {content.mobile.time} • {content.mobile.kcal}
            </p>
          </div>

          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="flex items-center gap-0.5 text-label-sm font-medium text-primary">
              <Icon
                name={presentation.mobileFooterIcon}
                className="text-[13px]"
              />
              {presentation.mobileFooterLabel}
            </span>
            <button
              type="button"
              onClick={() => onOpen(content)}
              className="flex items-center gap-0.5 text-label-md text-primary transition-colors hover:text-primary-container"
            >
              <span>{content.mobile.cta}</span>
              <Icon name="chevron_right" className="text-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function MobileLibraryCard({
  content,
  presentation,
  favorite,
  onToggleFavorite,
  onOpen,
  onAction,
  copy,
}) {
  const sharedProps = {
    content,
    presentation,
    favorite,
    onToggleFavorite,
    onOpen,
    onAction,
    copy,
  }

  switch (presentation.mobileVariant) {
    case 'recipeCompact':
      return <MobileRecipeCompact {...sharedProps} />
    case 'article':
      return <MobileArticle {...sharedProps} />
    case 'routine':
      return <MobileRoutine {...sharedProps} />
    default:
      return <MobileRecipeHero {...sharedProps} />
  }
}

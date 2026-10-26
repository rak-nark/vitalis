import Icon from '../../../components/ui/Icon'
import { authVisual } from '../../../data/loginData'

export default function AuthVisualPanel() {
  return (
    <section className="relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-xl bg-inverse-surface p-8 text-on-primary sm:p-10 lg:min-h-[640px] lg:w-5/12 lg:shrink-0">
      <img
        src={authVisual.image}
        alt={authVisual.imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-inverse-surface via-inverse-surface/60 to-transparent"
      />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest/20 px-3 py-1.5 text-on-primary backdrop-blur-md">
          <Icon
            name="verified"
            className="text-[18px] text-secondary-fixed"
          />
          <span className="text-label-md tracking-wide">
            {authVisual.badge}
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-16">
        <div className="space-y-4">
          <span className="inline-block rounded bg-primary-container px-2.5 py-1 text-label-sm tracking-wider text-on-primary uppercase">
            {authVisual.eyebrow}
          </span>
          <h2 className="max-w-md text-headline-lg leading-tight font-bold text-on-primary">
            {authVisual.title}
          </h2>
          <p className="max-w-md text-body-lg text-inverse-on-surface/90">
            {authVisual.description}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest/15 p-4 backdrop-blur-md">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/30">
            <Icon
              name="clinical_notes"
              className="text-secondary-fixed"
            />
          </div>
          <div>
            <p className="text-body-md font-semibold text-on-primary">
              {authVisual.quote}
            </p>
            <p className="mt-0.5 text-label-sm text-surface-container-highest/80">
              {authVisual.quoteAuthor} — {authVisual.quoteRole}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import Icon from '../../../components/ui/Icon'
import { registerBenefits } from '../../../data/registerData'

export default function RegisterBenefitsPanel() {
  const { proof } = registerBenefits

  return (
    <section className="auth-card-shadow relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 sm:p-8 lg:col-span-5 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary-fixed/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-secondary-fixed/30 blur-3xl"
      />

      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-3.5 py-1.5 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-label-md font-bold text-primary">
            {registerBenefits.badge}
          </span>
        </div>

        <div>
          <h2 className="mb-3 text-headline-lg font-bold tracking-tight text-on-surface">
            {registerBenefits.title}
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            {registerBenefits.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-label-lg font-semibold text-on-surface">
            {registerBenefits.featuresTitle}
          </h3>

          {registerBenefits.features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-start gap-3.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/90 p-4 transition-all duration-200 hover:translate-x-1"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${feature.iconClass}`}
              >
                <Icon name={feature.icon} className="text-[20px]" />
              </div>
              <div>
                <h4 className="text-label-lg font-semibold text-on-surface">
                  {feature.title}
                </h4>
                <p className="mt-0.5 text-body-sm text-on-surface-variant">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col items-start justify-between gap-2.5 border-t border-outline-variant/30 pt-6 xl:flex-row xl:items-center">
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 -space-x-2 overflow-hidden">
            {proof.avatars.map((avatar) => (
              <img
                key={avatar.src}
                src={avatar.src}
                alt={avatar.alt}
                className="inline-block h-9 w-9 rounded-full object-cover ring-2 ring-surface-container-lowest"
              />
            ))}
          </div>

          <div>
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Icon
                  key={index}
                  name="star"
                  className="text-[16px]!"
                  filled
                />
              ))}
              <span className="ml-1.5 text-label-md font-bold whitespace-nowrap text-on-surface">
                {proof.rating}
              </span>
            </div>
            <p className="text-body-sm whitespace-nowrap text-on-surface-variant">
              {proof.users}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-outline-variant/30 bg-surface-container-lowest px-2.5 py-1 text-label-sm whitespace-nowrap text-on-surface-variant">
          <Icon name="verified" className="text-[16px]! text-primary" />
          <span>{proof.certification}</span>
        </div>
      </div>
    </section>
  )
}

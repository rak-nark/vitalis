import { Link } from 'react-router-dom'
import Icon from '../../../components/ui/Icon'
import { guestProfileCopy } from '../../../data/profileData'
import ProfileStatsGrid from '../components/ProfileStatsGrid'

export default function MobileGuestProfile({ stats }) {
  return (
    <div className="flex flex-col gap-5">
      <section className="relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 text-center shadow-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-secondary-fixed/30 blur-2xl"
        />

        <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-container text-primary">
          <Icon name="person_add" className="text-[28px]" filled />
        </div>
        <span className="relative text-label-sm font-bold tracking-wider text-primary uppercase">
          {guestProfileCopy.eyebrow}
        </span>
        <h2 className="relative mt-1 text-headline-md text-on-surface">
          {guestProfileCopy.mobileTitle}
        </h2>
        <p className="relative mx-auto mt-2 max-w-sm text-body-sm text-on-surface-variant">
          {guestProfileCopy.description}
        </p>

        <div className="relative mt-5 flex flex-col gap-2.5">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
          >
            <Icon name="login" className="text-[18px]" />
            {guestProfileCopy.loginCta}
          </Link>
          <Link
            to="/registro"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-surface-container-low px-5 py-2.5 text-label-lg font-bold text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            <Icon name="person_add" className="text-[18px]" />
            {guestProfileCopy.registerCta}
          </Link>
        </div>

        <div className="relative mt-5 grid grid-cols-1 gap-2 border-t border-outline-variant/30 pt-4 text-left">
          {guestProfileCopy.benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-2">
              <Icon
                name={benefit.icon}
                className={`mt-0.5 text-[18px] ${benefit.iconClass}`}
                filled
              />
              <span className="text-body-sm text-on-surface-variant">
                {benefit.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-sm">
        <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
          {guestProfileCopy.activityEyebrow}
        </span>
        <h2 className="mb-3 text-headline-sm text-on-surface">
          {guestProfileCopy.activityTitle}
        </h2>
        <ProfileStatsGrid stats={stats} compact />
        <p className="mt-3 text-body-sm text-outline">
          {guestProfileCopy.activityHint}
        </p>
      </section>
    </div>
  )
}

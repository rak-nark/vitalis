import { Link } from 'react-router-dom'
import Icon from '../../../components/ui/Icon'
import { guestProfileCopy } from '../../../data/profileData'
import ProfileStatsGrid from './ProfileStatsGrid'

export default function GuestProfile({ stats }) {
  return (
    <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <section className="card-ambient rounded-xl p-6 text-center sm:p-10 lg:col-span-7">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-container text-primary">
          <Icon name="person_add" className="text-[32px]" filled />
        </div>
        <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
          {guestProfileCopy.eyebrow}
        </span>
        <h2 className="mt-2 text-headline-md text-on-surface">
          {guestProfileCopy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-body-md text-on-surface-variant">
          {guestProfileCopy.description}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
          >
            <Icon name="login" className="text-[18px]" />
            {guestProfileCopy.loginCta}
          </Link>
          <Link
            to="/registro"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-surface-container-low px-6 py-3 text-label-lg font-bold text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            <Icon name="person_add" className="text-[18px]" />
            {guestProfileCopy.registerCta}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 border-t border-outline-variant/30 pt-6 text-left sm:grid-cols-3">
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

      <aside className="space-y-6 lg:col-span-5">
        <section className="card-ambient rounded-xl p-5">
          <div className="mb-4">
            <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
              {guestProfileCopy.activityEyebrow}
            </span>
            <h2 className="text-headline-sm text-on-surface">
              {guestProfileCopy.activityTitle}
            </h2>
          </div>
          <ProfileStatsGrid stats={stats} />
          <p className="mt-3 text-body-sm text-outline">
            {guestProfileCopy.activityHint}
          </p>
        </section>
      </aside>
    </div>
  )
}

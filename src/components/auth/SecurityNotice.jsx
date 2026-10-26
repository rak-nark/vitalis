import Icon from '../ui/Icon'
import { authSecurity } from '../../data/loginData'

export default function SecurityNotice({ variant = 'desktop' }) {
  if (variant === 'mobile') {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 text-outline">
        <Icon name="shield" className="text-secondary" />
        <span className="text-center text-label-sm">
          {authSecurity.mobileDescription}
        </span>
      </div>
    )
  }

  return (
    <div className="mt-8 flex items-start gap-3 rounded-lg border border-outline-variant/30 bg-surface-container-low/50 p-4">
      <Icon
        name="lock_clock"
        className="mt-0.5 shrink-0 text-[22px] text-primary"
      />
      <div className="space-y-1">
        <h4 className="text-label-md font-semibold text-on-surface">
          {authSecurity.title}
        </h4>
        <p className="text-body-sm leading-relaxed text-on-surface-variant">
          {authSecurity.desktopDescription}
        </p>
      </div>
    </div>
  )
}

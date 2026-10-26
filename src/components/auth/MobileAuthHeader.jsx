import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { authBrand } from '../../data/loginData'

export default function MobileAuthHeader({
  step,
  backTo = '/',
  backLabel = 'Volver al dashboard',
}) {
  return (
    <header className="pt-safe sticky top-0 z-40 bg-surface/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-2 px-4 py-2">
        <Link
          to={backTo}
          aria-label={backLabel}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
        >
          <Icon name="arrow_back" />
        </Link>

        <div className="flex min-w-0 items-center gap-1 rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1">
          <Icon name="lock" className="text-[14px] text-primary" />
          <span className="truncate text-label-sm tracking-wide text-on-surface-variant">
            {step}
          </span>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <span className="text-label-sm font-bold text-primary">
            {authBrand.name}
          </span>
        </div>
      </div>
    </header>
  )
}

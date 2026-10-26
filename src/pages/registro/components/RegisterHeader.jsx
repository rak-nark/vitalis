import { Link } from 'react-router-dom'
import AuthBrand from '../../../components/auth/AuthBrand'
import Icon from '../../../components/ui/Icon'
import { registerCopy } from '../../../data/registerData'

export default function RegisterHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-outline-variant/30 bg-surface shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <div className="flex items-center gap-6">
          <AuthBrand icon="verified_user" />

          <div className="hidden items-center gap-1 rounded-full bg-secondary-container/40 px-3 py-1 text-label-sm text-secondary md:flex">
            <Icon name="health_and_safety" className="text-[16px]" />
            {registerCopy.platformBadge}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            aria-label="Idioma de la interfaz: Español"
            className="hidden items-center gap-1.5 rounded-lg border border-outline-variant/50 px-3 py-1.5 text-label-md text-on-surface-variant sm:flex"
          >
            <Icon name="language" className="text-[18px]" />
            <span>ES</span>
            <Icon name="expand_more" className="text-[16px]" />
          </span>

          <div className="flex items-center gap-3">
            <span className="hidden text-body-sm text-on-surface-variant sm:inline">
              {registerCopy.headerQuestion}
            </span>
            <Link
              to="/login"
              className="rounded-lg border border-primary/20 px-4 py-2 text-label-lg text-primary transition-colors duration-150 hover:bg-surface-container-low active:scale-[0.98]"
            >
              {registerCopy.headerSignIn}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

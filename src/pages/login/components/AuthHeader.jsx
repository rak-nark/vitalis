import { Link } from 'react-router-dom'
import Icon from '../../../components/ui/Icon'
import { authBrand } from '../../../data/loginData'
import AuthBrand from '../../../components/auth/AuthBrand'

export default function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <AuthBrand showPortal />

        <div className="flex items-center gap-4">
          <a
            href={authBrand.supportEmail}
            className="hidden items-center gap-1 text-label-lg text-on-surface-variant transition-colors duration-150 hover:text-on-surface md:inline-flex"
          >
            <Icon name="help_outline" className="text-[18px]" />
            {authBrand.supportLabel}
          </a>
          <Link
            to="/registro"
            className="rounded-lg px-4 py-2 text-label-lg text-primary transition-colors duration-150 hover:bg-surface-container-low active:scale-[0.98]"
          >
            {authBrand.createAccountLabel}
          </Link>
        </div>
      </div>
    </header>
  )
}

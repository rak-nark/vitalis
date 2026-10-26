import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { authBrand } from '../../data/loginData'

export default function AuthBrand({ showPortal = false, icon = 'eco' }) {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/"
        aria-label="Volver al dashboard de Vitalis"
        className="group flex items-center gap-2 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-container text-primary transition-transform duration-150 group-hover:scale-105">
          <Icon name={icon} className="text-xl" />
        </span>
        <span className="text-headline-md font-bold tracking-tight text-primary">
          {authBrand.name}
        </span>
      </Link>

      {showPortal && (
        <div className="hidden items-center border-l border-outline-variant/30 pl-3 sm:flex">
          <span className="flex items-center gap-1 rounded-full bg-secondary-fixed/50 px-2 py-0.5 text-label-sm tracking-wider text-secondary uppercase">
            <Icon name="verified_user" className="text-[14px]" />
            {authBrand.portalLabel}
          </span>
        </div>
      )}
    </div>
  )
}

import { Link } from 'react-router-dom'
import { useUser } from '../../context/hooks/useUser'
import Icon from '../ui/Icon'

export default function MobileHeader() {
  const { user } = useUser()

  return (
    <header className="fixed top-0 right-0 left-0 z-50 mx-auto flex max-w-md items-center justify-between bg-surface/90 px-4 py-2 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2">
        <Link
          to="/perfil"
          aria-label="Perfil del usuario"
          className="relative"
        >
          <img
            src={user.avatar}
            alt={user.avatarAlt}
            className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
          />
          <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-surface-container-lowest bg-primary" />
        </Link>

        <div className="flex flex-col">
          <Link
            to="/"
            className="text-headline-sm font-bold tracking-tight text-primary"
          >
            Vitalis
          </Link>
          <span className="-mt-1 text-label-sm text-on-surface-variant">
            Salud Integral
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="inline-flex items-center gap-1 rounded-full border border-surface-container-highest bg-surface-container-high/80 px-2.5 py-1 text-label-md shadow-sm">
          <Icon
            name="local_fire_department"
            className="text-sm text-tertiary"
            filled
          />
          <span className="font-bold text-on-surface">{user.streakDays} días</span>
        </div>

        <button
          type="button"
          aria-label="Notificaciones"
          className="relative rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
        >
          <Icon name="notifications" className="text-[22px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error ring-2 ring-surface" />
        </button>
      </div>
    </header>
  )
}

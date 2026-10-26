import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import { useUser } from '../../context/hooks/useUser'
import Icon from '../ui/Icon'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/contenidos', label: 'Contenidos Saludables' },
  { to: '/busqueda', label: 'Búsqueda' },
  { to: '/favoritos', label: 'Mis Favoritos y Hábitos' },
  { to: '/perfil', label: 'Perfil' },
]

function DesktopNavLink({ item }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        clsx(
          'py-4 text-label-lg whitespace-nowrap transition-colors duration-150',
          isActive
            ? 'border-b-2 border-primary font-semibold text-primary'
            : 'text-on-surface-variant hover:text-primary',
        )
      }
    >
      {item.label}
    </NavLink>
  )
}

function MobileNavLink({ item }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        clsx(
          'rounded-full px-3 py-2 text-label-md whitespace-nowrap transition-colors duration-150',
          isActive
            ? 'bg-secondary-container text-on-secondary-container'
            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary',
        )
      }
    >
      {item.label}
    </NavLink>
  )
}

export default function Header() {
  const { user } = useUser()

  return (
    <header className="sticky top-0 z-50 hidden bg-surface-container-lowest shadow-sm lg:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            aria-label="Inicio Vitalis"
            className="group flex items-center gap-2 transition-all duration-150 active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
              <Icon name="vital_signs" className="text-2xl" filled />
            </div>
            <span className="text-headline-md font-bold tracking-tight text-primary">
              Vitalis
            </span>
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-6 lg:flex"
          >
            {navItems.map((item) => (
              <DesktopNavLink key={item.to} item={item} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className="hidden items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1.5 text-label-md text-on-tertiary-fixed transition-all duration-150 sm:flex"
            title="Racha de hábitos activos"
          >
            <Icon name="local_fire_department" className="text-lg text-tertiary" filled />
            <span className="font-bold">{user.streakDays} días</span>
          </div>

          <button
            type="button"
            aria-label="Ver notificaciones"
            className="relative rounded-full p-2 text-on-surface-variant transition-all duration-150 hover:text-primary active:scale-95"
          >
            <Icon name="notifications" className="text-2xl" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-error ring-2 ring-surface-container-lowest" />
          </button>

          <Link
            to="/habitos"
            className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg text-on-primary shadow-sm transition-all duration-150 hover:bg-primary-container active:scale-95 xl:inline-flex"
          >
            <Icon name="add_circle" className="text-lg" />
            <span>Nuevo Registro</span>
          </Link>

          <Link
            to="/perfil"
            aria-label="Perfil del usuario"
            className="rounded-full pl-1 transition-all duration-150 focus:ring-2 focus:ring-primary focus:outline-none active:scale-95"
          >
            <span className="relative block h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary/20">
              <img
                src={user.avatar}
                alt={user.avatarAlt}
                className="h-full w-full object-cover"
              />
            </span>
          </Link>
        </div>
      </div>

      <nav
        aria-label="Navegación móvil"
        className="no-scrollbar flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"
      >
        {navItems.map((item) => (
          <MobileNavLink key={item.to} item={item} />
        ))}
      </nav>
    </header>
  )
}

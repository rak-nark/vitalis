import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import Icon from '../ui/Icon'

const items = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/contenidos', label: 'Explorar', icon: 'search' },
  { to: '/habitos', label: 'Hábitos', icon: 'check_circle' },
  { to: '/favoritos', label: 'Favoritos', icon: 'favorite' },
  { to: '/perfil', label: 'Perfil', icon: 'person' },
]

export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Navegación móvil principal"
      className="pb-safe fixed right-0 bottom-0 left-0 z-50 mx-auto grid w-full max-w-md grid-cols-5 items-center gap-0.5 bg-surface-container-lowest/95 px-1.5 py-1 shadow-md backdrop-blur-md lg:hidden"
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            clsx(
              'flex min-w-0 flex-col items-center justify-center rounded-xl px-1 py-1 transition-colors duration-150 active:scale-95',
              isActive
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:text-primary',
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                name={item.icon}
                className="text-[22px]"
                filled={isActive}
              />
              <span
                className={clsx(
                  'mt-0.5 text-label-sm max-[359px]:text-[10px]',
                  isActive && 'font-bold',
                )}
              >
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

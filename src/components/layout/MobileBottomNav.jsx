import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import Icon from '../ui/Icon'

const items = [
  { to: '/', label: 'Dashboard', icon: 'grid_view', end: true },
  { to: '/contenidos', label: 'Contenido', icon: 'menu_book' },
  { to: '/busqueda', label: 'Explorar', icon: 'search' },
  { to: '/favoritos', label: 'Hábitos', icon: 'check_circle' },
  { to: '/perfil', label: 'Perfil', icon: 'person' },
]

export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Navegación móvil principal"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-outline-variant/50 shadow-lg lg:hidden"
    >
      <div className="max-w-[420px] mx-auto flex items-center justify-around px-2 py-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center justify-center transition-all duration-150 active:scale-95',
                isActive
                  ? 'bg-secondary-container text-on-secondary-container rounded-2xl px-3.5 py-1.5'
                  : 'text-on-surface hover:text-primary py-1 px-2',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  name={item.icon}
                  className={clsx(
                    isActive ? 'text-[22px] font-bold' : 'text-[24px]',
                  )}
                  filled={isActive}
                />
                <span
                  className={clsx(
                    'text-[11px] font-bold mt-0.5 tracking-tight',
                    isActive ? 'text-on-secondary-container' : 'text-on-surface',
                  )}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

import { Link } from 'react-router-dom'
import Icon from '../../components/ui/Icon'
import { useProfile } from './hooks/useProfile'

function StatCard({ icon, label, value, hint, iconClass }) {
  return (
    <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest p-4">
      <div
        className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
      >
        <Icon name={icon} className="text-[20px]" filled />
      </div>
      <span className="block text-label-sm text-on-surface-variant">
        {label}
      </span>
      <span className="mt-0.5 block text-headline-sm font-bold text-on-surface">
        {value}
      </span>
      {hint && (
        <span className="mt-0.5 block text-label-sm text-outline">{hint}</span>
      )}
    </div>
  )
}

function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        icon="local_fire_department"
        label="Racha activa"
        value={`${stats.streakDays} días`}
        hint="Constancia sostenida"
        iconClass="bg-tertiary-fixed text-tertiary"
      />
      <StatCard
        icon="check_circle"
        label="Hábitos de hoy"
        value={`${stats.completedCount} / ${stats.totalCount}`}
        hint={`${stats.progress}% completado`}
        iconClass="bg-secondary-container text-primary"
      />
      <StatCard
        icon="favorite"
        label="Favoritos"
        value={stats.favoriteCount}
        hint="Contenidos guardados"
        iconClass="bg-error-container text-error"
      />
      <StatCard
        icon="monitoring"
        label="Adherencia"
        value={`${stats.progress}%`}
        hint="Meta diaria"
        iconClass="bg-surface-container text-secondary"
      />
    </div>
  )
}

export default function Perfil() {
  const {
    isAuthenticated,
    session,
    user,
    displayName,
    providerLabel,
    sessionDate,
    isRemembered,
    stats,
    notice,
    isLoggingOut,
    handleLogout,
  } = useProfile()

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-16">
      <div className="mb-6">
        <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
          Cuenta
        </span>
        <h1 className="text-headline-lg-mobile tracking-tight text-on-surface sm:text-headline-lg">
          Mi Perfil
        </h1>
        <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">
          Consulta tu sesión activa, tus estadísticas y los accesos rápidos a tu
          espacio personal.
        </p>
      </div>

      {notice && (
        <p
          role="status"
          className="mb-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-secondary-container/60 px-4 py-3 text-body-sm font-semibold text-on-secondary-container"
        >
          <Icon name="check_circle" className="text-[20px]" filled />
          {notice}
        </p>
      )}

      {isAuthenticated ? (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <section className="card-ambient overflow-hidden rounded-xl lg:col-span-7">
            <div className="relative overflow-hidden bg-linear-to-br from-primary to-primary-container p-6 text-on-primary sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-white/10"
              />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                <img
                  src={user.avatar}
                  alt={user.avatarAlt}
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-lg ring-4 ring-white/30"
                />
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-label-sm backdrop-blur-sm">
                    <Icon name="verified_user" className="text-[14px]" />
                    Sesión activa
                  </span>
                  <h2 className="mt-2 truncate text-headline-md font-bold">
                    {displayName}
                  </h2>
                  <p className="truncate text-body-sm text-on-primary/85">
                    {session.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <h3 className="text-label-md font-bold tracking-wider text-on-surface-variant uppercase">
                  Datos de la cuenta
                </h3>
                <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-surface-container-high bg-surface-container-low/50 p-3">
                    <dt className="text-label-sm text-outline">Correo</dt>
                    <dd className="mt-0.5 truncate text-body-md font-semibold text-on-surface">
                      {session.email}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-surface-container-high bg-surface-container-low/50 p-3">
                    <dt className="text-label-sm text-outline">
                      Método de acceso
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 text-body-md font-semibold text-on-surface">
                      <Icon
                        name={session.provider === 'email' ? 'mail' : 'passkey'}
                        className="text-[16px] text-primary"
                      />
                      {providerLabel}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-surface-container-high bg-surface-container-low/50 p-3">
                    <dt className="text-label-sm text-outline">
                      Persistencia
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 text-body-md font-semibold text-on-surface">
                      <Icon
                        name={isRemembered ? 'devices' : 'timer'}
                        className="text-[16px] text-primary"
                      />
                      {isRemembered
                        ? 'Recordar en este dispositivo'
                        : 'Sesión temporal'}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-surface-container-high bg-surface-container-low/50 p-3">
                    <dt className="text-label-sm text-outline">
                      Inicio de sesión
                    </dt>
                    <dd className="mt-0.5 text-body-md font-semibold text-on-surface">
                      {sessionDate || 'Ahora'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-outline-variant/30 bg-surface-container-low/60 p-3.5">
                <Icon
                  name="shield_lock"
                  className="mt-0.5 shrink-0 text-[20px] text-primary"
                />
                <p className="text-body-sm text-on-surface-variant">
                  Tu sesión se guarda de forma simulada en este navegador. No se
                  almacenan contraseñas ni datos clínicos reales.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/favoritos"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/20 bg-surface-container-low px-4 py-3 text-label-lg font-bold text-primary transition-colors hover:bg-primary hover:text-on-primary"
                >
                  <Icon name="favorite" className="text-[18px]" />
                  Mis favoritos
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-error/30 bg-error-container/40 px-4 py-3 text-label-lg font-bold text-error transition-colors hover:bg-error-container disabled:cursor-wait disabled:opacity-70"
                >
                  <Icon
                    name={isLoggingOut ? 'progress_activity' : 'logout'}
                    className={`text-[18px] ${isLoggingOut ? 'animate-spin' : ''}`}
                  />
                  {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-5">
            <section className="card-ambient rounded-xl p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-headline-sm text-on-surface">
                  Tu actividad
                </h2>
                <span className="rounded-full bg-secondary-container px-2.5 py-1 text-label-sm font-bold text-on-secondary-container">
                  Hoy
                </span>
              </div>
              <StatsGrid stats={stats} />
            </section>

            <section className="card-ambient rounded-xl p-5">
              <h2 className="text-headline-sm text-on-surface">
                Accesos rápidos
              </h2>
              <div className="mt-3 space-y-2">
                <Link
                  to="/habitos"
                  className="flex items-center justify-between gap-3 rounded-lg border border-surface-container-high bg-surface-container-lowest p-3 transition-colors hover:border-primary/30 hover:bg-surface-container-low"
                >
                  <span className="flex items-center gap-2 text-body-md font-semibold text-on-surface">
                    <Icon name="check_circle" className="text-primary" />
                    Revisar mis hábitos
                  </span>
                  <Icon name="chevron_right" className="text-outline" />
                </Link>
                <Link
                  to="/contenidos"
                  className="flex items-center justify-between gap-3 rounded-lg border border-surface-container-high bg-surface-container-lowest p-3 transition-colors hover:border-primary/30 hover:bg-surface-container-low"
                >
                  <span className="flex items-center gap-2 text-body-md font-semibold text-on-surface">
                    <Icon name="menu_book" className="text-primary" />
                    Explorar contenidos
                  </span>
                  <Icon name="chevron_right" className="text-outline" />
                </Link>
              </div>
            </section>
          </aside>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <section className="card-ambient rounded-xl p-6 text-center sm:p-10 lg:col-span-7">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-container text-primary">
              <Icon name="person_add" className="text-[32px]" filled />
            </div>
            <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
              Modo invitado
            </span>
            <h2 className="mt-2 text-headline-md text-on-surface">
              Inicia sesión para personalizar tu experiencia
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-body-md text-on-surface-variant">
              Con una cuenta podrás guardar tus favoritos, conservar tu sesión y
              acceder a recomendaciones adaptadas a tu progreso.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
              >
                <Icon name="login" className="text-[18px]" />
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-surface-container-low px-6 py-3 text-label-lg font-bold text-primary transition-colors hover:bg-primary hover:text-on-primary"
              >
                <Icon name="person_add" className="text-[18px]" />
                Crear cuenta
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-outline-variant/30 pt-6 text-left sm:grid-cols-3">
              <div className="flex items-start gap-2">
                <Icon name="favorite" className="mt-0.5 text-[18px] text-error" />
                <span className="text-body-sm text-on-surface-variant">
                  Guarda contenidos favoritos
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icon
                  name="check_circle"
                  className="mt-0.5 text-[18px] text-primary"
                />
                <span className="text-body-sm text-on-surface-variant">
                  Conserva tu seguimiento
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icon
                  name="auto_awesome"
                  className="mt-0.5 text-[18px] text-tertiary"
                />
                <span className="text-body-sm text-on-surface-variant">
                  Recibe recomendaciones
                </span>
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-5">
            <section className="card-ambient rounded-xl p-5">
              <div className="mb-4">
                <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
                  Actividad local
                </span>
                <h2 className="text-headline-sm text-on-surface">
                  Tu progreso en este dispositivo
                </h2>
              </div>
              <StatsGrid stats={stats} />
              <p className="mt-3 text-body-sm text-outline">
                Estos datos se mantienen mientras no cierres el navegador.
              </p>
            </section>
          </aside>
        </div>
      )}
    </main>
  )
}

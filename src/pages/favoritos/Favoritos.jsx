import { Link } from 'react-router-dom'
import Icon from '../../components/ui/Icon'
import ContentCard from '../home/ContentCard'
import HabitRow from '../home/HabitRow'
import { useFavoritesPage } from './hooks/useFavoritesPage'

export default function Favoritos() {
  const {
    favoriteContents,
    favoriteCount,
    habits,
    pendingCount,
    completedCount,
    totalCount,
    progress,
    toggleHabit,
  } = useFavoritesPage()

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-16">
      <div className="mb-6">
        <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
          Mi espacio
        </span>
        <h1 className="text-headline-lg-mobile tracking-tight text-on-surface sm:text-headline-lg">
          Mis Favoritos y Hábitos
        </h1>
        <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">
          Guarda los contenidos que quieres retomar y revisa tu constancia
          diaria desde un solo lugar.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <div className="card-ambient rounded-xl p-4">
          <span className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
            <Icon name="favorite" className="text-[16px] text-error" filled />
            Favoritos guardados
          </span>
          <span className="mt-1 block text-headline-md font-bold text-on-surface">
            {favoriteCount}
          </span>
        </div>
        <div className="card-ambient rounded-xl p-4">
          <span className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
            <Icon name="check_circle" className="text-[16px] text-primary" />
            Hábitos completados
          </span>
          <span className="mt-1 block text-headline-md font-bold text-on-surface">
            {completedCount} / {totalCount}
          </span>
        </div>
        <div className="card-ambient col-span-2 rounded-xl p-4 lg:col-span-1">
          <span className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
            <Icon name="pending_actions" className="text-[16px] text-tertiary" />
            Pendientes por hoy
          </span>
          <span className="mt-1 block text-headline-md font-bold text-on-surface">
            {pendingCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <section className="space-y-4 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-headline-sm text-on-surface">
              Contenidos guardados
            </h2>
            <Link
              to="/contenidos"
              className="inline-flex items-center gap-1 text-label-md font-bold text-primary hover:underline"
            >
              Explorar más
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>

          {favoriteContents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {favoriteContents.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          ) : (
            <div className="card-ambient flex flex-col items-center rounded-xl px-6 py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container text-outline">
                <Icon name="favorite_border" className="text-[28px]" />
              </div>
              <h3 className="text-headline-sm text-on-surface">
                Aún no tienes favoritos
              </h3>
              <p className="mt-2 max-w-md text-body-md text-on-surface-variant">
                Toca el corazón de una receta o rutina para guardarla aquí y
                retomarla cuando quieras.
              </p>
              <Link
                to="/contenidos"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg font-bold text-on-primary transition-colors hover:bg-primary-container"
              >
                <Icon name="auto_awesome" className="text-[18px]" />
                Descubrir contenidos
              </Link>
            </div>
          )}
        </section>

        <aside className="lg:col-span-4">
          <section className="card-ambient space-y-4 rounded-xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
                  Seguimiento diario
                </span>
                <h2 className="text-headline-sm text-on-surface">
                  Tus hábitos de hoy
                </h2>
              </div>
              <span className="rounded-full bg-secondary-container px-2.5 py-1 text-label-sm font-bold text-on-secondary-container">
                {progress}%
              </span>
            </div>

            <div>
              <div
                role="progressbar"
                aria-label={`Progreso de hábitos: ${progress}%`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high"
              >
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-body-sm text-on-surface-variant">
                {completedCount} de {totalCount} hábitos completados hoy.
              </p>
            </div>

            <div className="space-y-2">
              {habits.map((habit) => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  onToggle={toggleHabit}
                />
              ))}
            </div>

            <Link
              to="/habitos"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-surface-container-low px-4 py-2.5 text-label-md font-bold text-primary transition-colors hover:bg-primary hover:text-on-primary"
            >
              Ver todos mis hábitos
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </section>
        </aside>
      </div>
    </main>
  )
}

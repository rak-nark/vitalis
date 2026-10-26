import HabitsSection from '../home/HabitsSection'
import MobileHabits from '../home/mobile/MobileHabits'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function Habitos() {
  useDocumentTitle('Mis Hábitos | Vitalis')

  return (
    <>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 pt-20 pb-28 lg:hidden">
        <div className="pt-1">
          <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
            Seguimiento diario
          </span>
          <h1 className="text-headline-lg-mobile tracking-tight text-on-surface">
            Mis Hábitos
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Toca el círculo para completar un hábito y la flecha para ver el
            detalle clínico.
          </p>
        </div>

        <MobileHabits />
      </main>

      <main className="mx-auto hidden w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:block lg:px-8">
        <div className="mb-6">
          <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
            Seguimiento diario
          </span>
          <h1 className="text-headline-lg text-on-surface">Mis Hábitos</h1>
          <p className="text-body-md text-on-surface-variant">
            Revisa tu constancia diaria, completa hábitos y consulta el detalle
            clínico de cada uno.
          </p>
        </div>

        <HabitsSection />
      </main>
    </>
  )
}

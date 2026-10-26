import AuthFooter from '../../components/auth/AuthFooter'
import { registerCopy } from '../../data/registerData'
import DesktopRegisterForm from './components/DesktopRegisterForm'
import RegisterBenefitsPanel from './components/RegisterBenefitsPanel'
import RegisterHeader from './components/RegisterHeader'

export default function DesktopRegister() {
  return (
    <div className="flex min-h-svh flex-col bg-surface text-on-surface">
      <RegisterHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-6 sm:px-6 md:px-8 lg:py-10">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <RegisterBenefitsPanel />

          <section className="auth-card-shadow flex flex-col justify-center rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-10 lg:col-span-7">
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary-container text-xs font-bold text-primary">
                  V
                </span>
                <span className="text-label-md font-bold tracking-wide text-primary uppercase">
                  {registerCopy.step}
                </span>
              </div>
              <h1 className="text-headline-lg font-bold tracking-tight text-on-surface">
                {registerCopy.desktopTitle}
              </h1>
              <p className="mt-1.5 text-body-lg text-on-surface-variant">
                {registerCopy.desktopSubtitle}
              </p>
            </div>

            <DesktopRegisterForm />
          </section>
        </div>
      </main>

      <AuthFooter />
    </div>
  )
}

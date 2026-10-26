import { loginCopy } from '../../data/loginData'
import AuthFooter from '../../components/auth/AuthFooter'
import AuthHeader from './components/AuthHeader'
import AuthVisualPanel from './components/AuthVisualPanel'
import DesktopLoginForm from './components/DesktopLoginForm'
import SecurityNotice from '../../components/auth/SecurityNotice'

export default function DesktopLogin() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-on-surface">
      <AuthHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:py-12 lg:flex-row lg:items-stretch lg:px-8">
        <AuthVisualPanel />

        <section className="flex flex-1 items-center justify-center">
          <div className="card-ambient w-full max-w-xl rounded-xl p-8 sm:p-12">
            <div className="mb-8">
              <h1 className="text-headline-lg font-bold tracking-tight text-on-background">
                {loginCopy.title}
              </h1>
              <p className="mt-2 text-body-md text-on-surface-variant">
                {loginCopy.subtitle}
              </p>
            </div>

            <DesktopLoginForm />
            <SecurityNotice />
          </div>
        </section>
      </main>

      <AuthFooter />
    </div>
  )
}

import { Link } from 'react-router-dom'
import MobileAuthHeader from '../../../components/auth/MobileAuthHeader'
import SecurityNotice from '../../../components/auth/SecurityNotice'
import SocialAuthButtons from '../../../components/auth/SocialAuthButtons'
import { registerCopy } from '../../../data/registerData'
import { useSocialAuthLogin } from '../../../hooks/useSocialAuthLogin'
import MobileRegisterForm from './MobileRegisterForm'

export default function MobileRegister() {
  const signInWithProvider = useSocialAuthLogin()

  return (
    <div className="flex min-h-svh flex-col bg-background text-on-surface">
      <MobileAuthHeader
        step={registerCopy.step}
        backTo="/login"
        backLabel="Volver al inicio de sesión"
      />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-4 pb-10">
        <div className="mb-6">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-secondary-container/60 px-2.5 py-0.5 text-label-sm text-on-secondary-container">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {registerCopy.eyebrow}
          </div>
          <h1 className="text-headline-lg-mobile tracking-tight text-on-surface">
            {registerCopy.title}
          </h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            {registerCopy.subtitle}
          </p>
        </div>

        <SocialAuthButtons
          variant="mobile"
          onSelect={signInWithProvider}
        />

        <div className="relative my-4 flex items-center justify-center">
          <div className="w-full border-t border-surface-container-high" />
          <span className="absolute bg-background px-3 text-label-sm tracking-wider text-outline uppercase">
            {registerCopy.socialDivider}
          </span>
        </div>

        <MobileRegisterForm />

        <div className="mt-4 text-center">
          <p className="text-body-md text-on-surface-variant">
            {registerCopy.loginQuestion}{' '}
            <Link
              to="/login"
              className="ml-1 font-semibold text-primary hover:underline"
            >
              {registerCopy.loginLink}
            </Link>
          </p>
        </div>

        <SecurityNotice variant="mobile" />
      </main>
    </div>
  )
}

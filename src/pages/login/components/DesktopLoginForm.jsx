import { Link } from 'react-router-dom'
import SocialAuthButtons from '../../../components/auth/SocialAuthButtons'
import Icon from '../../../components/ui/Icon'
import { loginCopy } from '../../../data/loginData'
import PasswordRecoveryDialog from './PasswordRecoveryDialog'
import { useLoginForm } from '../hooks/useLoginForm'

export default function DesktopLoginForm() {
  const {
    email,
    password,
    remember,
    showPassword,
    errors,
    isSubmitting,
    isSuccess,
    recovery,
    handleEmailChange,
    handlePasswordChange,
    handleRememberChange,
    togglePasswordVisibility,
    handleForgotPassword,
    handleSubmit,
    handleSocialLogin,
  } = useLoginForm()

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1.5">
          <label
            htmlFor="desktop-email"
            className="block text-label-md text-on-surface-variant"
          >
            {loginCopy.emailLabel}
          </label>
          <div
            className={`relative rounded-lg border bg-surface-container-lowest transition-all focus-within:ring-4 ${
              errors.email
                ? 'border-error focus-within:border-error focus-within:ring-error/10'
                : 'border-outline-variant focus-within:border-primary focus-within:ring-primary/10'
            }`}
          >
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-outline">
              <Icon name="mail" className="text-[20px]" />
            </span>
            <input
              id="desktop-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'desktop-login-email-error' : undefined
              }
              placeholder={loginCopy.emailPlaceholder}
              className="w-full rounded-lg border-0 bg-transparent py-3 pr-4 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/70 focus:ring-0"
            />
          </div>
          {errors.email && (
            <p
              id="desktop-login-email-error"
              role="alert"
              className="flex items-center gap-1 text-label-sm text-error"
            >
              <Icon name="error" className="text-[14px]" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="desktop-password"
              className="block text-label-md text-on-surface-variant"
            >
              {loginCopy.passwordLabel}
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-label-md font-semibold text-primary transition-colors hover:text-primary-container"
            >
              {loginCopy.forgotPassword}
            </button>
          </div>
          <div
            className={`relative rounded-lg border bg-surface-container-lowest transition-all focus-within:ring-4 ${
              errors.password
                ? 'border-error focus-within:border-error focus-within:ring-error/10'
                : 'border-outline-variant focus-within:border-primary focus-within:ring-primary/10'
            }`}
          >
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-outline">
              <Icon name="lock" className="text-[20px]" />
            </span>
            <input
              id="desktop-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'desktop-login-password-error' : undefined
              }
              placeholder={loginCopy.passwordPlaceholder}
              className="w-full rounded-lg border-0 bg-transparent py-3 pr-11 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/70 focus:ring-0"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-outline transition-colors hover:text-on-surface"
            >
              <Icon
                name={showPassword ? 'visibility_off' : 'visibility'}
                className="text-[20px]"
              />
            </button>
          </div>
          {errors.password && (
            <p
              id="desktop-login-password-error"
              role="alert"
              className="flex items-center gap-1 text-label-sm text-error"
            >
              <Icon name="error" className="text-[14px]" />
              {errors.password}
            </p>
          )}
        </div>

        {isSuccess && (
          <p
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-lg bg-secondary-container/60 px-3 py-2 text-body-sm font-semibold text-on-secondary-container"
          >
            <Icon name="check_circle" className="text-[18px]" filled />
            {loginCopy.feedback.success}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2.5 select-none">
            <input
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={handleRememberChange}
              className="h-4 w-4 rounded border-outline-variant accent-primary"
            />
            <span className="text-body-sm text-on-surface-variant">
              {loginCopy.remember}
            </span>
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-label-lg font-bold text-on-primary shadow-sm transition-all duration-150 hover:bg-primary-container hover:shadow-md active:scale-[0.99] disabled:cursor-wait disabled:opacity-75 disabled:active:scale-100"
          >
            <span>
              {isSubmitting
                ? loginCopy.feedback.loading
                : isSuccess
                  ? loginCopy.feedback.successButton
                  : loginCopy.submit}
            </span>
            <Icon
              name={
                isSubmitting
                  ? 'progress_activity'
                  : isSuccess
                    ? 'check_circle'
                    : 'arrow_forward'
              }
              className={`text-[20px] ${isSubmitting ? 'animate-spin' : ''}`}
            />
          </button>
        </div>

        <div className="relative my-6 flex items-center">
          <div className="grow border-t border-outline-variant/30" />
          <span className="mx-4 shrink-0 text-label-sm tracking-wider text-outline uppercase">
            {loginCopy.socialDivider}
          </span>
          <div className="grow border-t border-outline-variant/30" />
        </div>

        <SocialAuthButtons onSelect={handleSocialLogin} />

        <div className="pt-4 text-center">
          <p className="text-body-md text-on-surface-variant">
            {loginCopy.noAccount}{' '}
            <Link
              to="/registro"
              className="ml-1 font-semibold text-primary underline-offset-4 hover:underline"
            >
              {loginCopy.register}
            </Link>
          </p>
        </div>
      </form>

      <PasswordRecoveryDialog
        recovery={recovery}
        idPrefix="desktop-login-recovery"
      />
    </>
  )
}

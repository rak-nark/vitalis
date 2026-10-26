import Icon from '../../../components/ui/Icon'
import { loginCopy } from '../../../data/loginData'
import PasswordRecoveryDialog from '../components/PasswordRecoveryDialog'
import { useLoginForm } from '../hooks/useLoginForm'

export default function MobileLoginForm() {
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
  } = useLoginForm()

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col">
          <label
            htmlFor="mobile-email"
            className="mb-1 text-label-md text-on-surface-variant"
          >
            {loginCopy.emailLabel}
          </label>
          <div
            className={`relative flex items-center rounded-xl border bg-surface-container-lowest transition-all focus-within:ring-4 ${
              errors.email
                ? 'border-error focus-within:border-error focus-within:ring-error/10'
                : 'border-outline-variant/50 focus-within:border-primary focus-within:ring-primary/10'
            }`}
          >
            <span className="pointer-events-none absolute left-3.5 flex items-center text-outline">
              <Icon name="mail" />
            </span>
            <input
              id="mobile-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'mobile-login-email-error' : undefined
              }
              placeholder={loginCopy.emailPlaceholder}
              className="w-full rounded-xl border-0 bg-transparent py-3 pr-4 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/60 focus:ring-0"
            />
          </div>
          {errors.email && (
            <p
              id="mobile-login-email-error"
              role="alert"
              className="mt-1 flex items-center gap-1 text-label-sm text-error"
            >
              <Icon name="error" className="text-[14px]" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <label
              htmlFor="mobile-password"
              className="text-label-md text-on-surface-variant"
            >
              {loginCopy.passwordLabel}
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-label-sm font-semibold text-primary hover:underline"
            >
              {loginCopy.forgotPassword}
            </button>
          </div>
          <div
            className={`relative flex items-center rounded-xl border bg-surface-container-lowest transition-all focus-within:ring-4 ${
              errors.password
                ? 'border-error focus-within:border-error focus-within:ring-error/10'
                : 'border-outline-variant/50 focus-within:border-primary focus-within:ring-primary/10'
            }`}
          >
            <span className="pointer-events-none absolute left-3.5 flex items-center text-outline">
              <Icon name="lock" />
            </span>
            <input
              id="mobile-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'mobile-login-password-error' : undefined
              }
              placeholder={loginCopy.passwordPlaceholder}
              className="w-full rounded-xl border-0 bg-transparent py-3 pr-11 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/60 focus:ring-0"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
              aria-pressed={showPassword}
              className="absolute right-3 p-1 text-outline transition-colors hover:text-on-surface"
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} />
            </button>
          </div>
          {errors.password && (
            <p
              id="mobile-login-password-error"
              role="alert"
              className="mt-1 flex items-center gap-1 text-label-sm text-error"
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

        <label className="flex cursor-pointer items-center gap-2.5 pt-1 select-none">
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={handleRememberChange}
            className="h-5 w-5 rounded-lg border-2 border-outline-variant accent-primary"
          />
          <span className="text-body-sm text-on-surface-variant">
            {loginCopy.remember}
          </span>
        </label>

        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-label-lg text-on-primary shadow-md transition-all hover:bg-on-primary-fixed-variant active:scale-[0.98] disabled:cursor-wait disabled:opacity-75 disabled:active:scale-100"
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
              className={isSubmitting ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </form>

      <PasswordRecoveryDialog
        recovery={recovery}
        idPrefix="mobile-login-recovery"
      />
    </>
  )
}

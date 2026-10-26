import Icon from '../../../components/ui/Icon'
import { registerCopy } from '../../../data/registerData'
import PasswordStrengthBars from '../components/PasswordStrengthBars'
import { useRegisterForm } from '../hooks/useRegisterForm'

const strengthTextClass = {
  neutral: 'text-outline',
  error: 'text-error',
  warning: 'text-tertiary',
  success: 'text-primary',
}

const matchState = {
  success: {
    icon: 'check_circle',
    label: registerCopy.matchLabel,
    className: 'text-primary',
  },
  error: {
    icon: 'error',
    label: registerCopy.matchLabelError,
    className: 'text-error',
  },
}

function FieldError({ id, children }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1 flex items-center gap-1 text-label-sm text-error"
    >
      <Icon name="error" className="text-[14px]" />
      {children}
    </p>
  )
}

export default function MobileRegisterForm() {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    acceptedTerms,
    passwordStrength,
    matchStatus,
    errors,
    isSubmitting,
    isSuccess,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleTermsChange,
    handleSubmit,
  } = useRegisterForm({ idPrefix: 'register-mobile' })
  const match = matchState[matchStatus]
  const hasConfirmError =
    Boolean(errors.confirmPassword) || matchStatus === 'error'

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col">
        <label
          htmlFor="register-mobile-name"
          className="mb-1 flex items-center justify-between font-label-md text-label-md text-on-surface-variant"
        >
          <span>{registerCopy.nameLabel}</span>
          <span className="font-label-sm text-label-sm font-semibold text-primary">
            {registerCopy.required}
          </span>
        </label>
        <div
          className={`relative flex items-center rounded-xl border bg-surface-container-lowest transition-all focus-within:ring-4 ${
            errors.fullName
              ? 'border-error focus-within:border-error focus-within:ring-error/10'
              : 'border-outline-variant/50 focus-within:border-primary focus-within:ring-primary/10'
          }`}
        >
          <span className="pointer-events-none absolute left-3.5 flex items-center text-outline">
            <Icon name="person" />
          </span>
          <input
            id="register-mobile-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={handleNameChange}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={
              errors.fullName ? 'register-mobile-name-error' : undefined
            }
            placeholder={registerCopy.namePlaceholder}
            className="w-full rounded-xl border-0 bg-transparent py-3 pr-4 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/60 focus:ring-0"
          />
        </div>
        {errors.fullName && (
          <FieldError id="register-mobile-name-error">
            {errors.fullName}
          </FieldError>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="register-mobile-email"
          className="mb-1 font-label-md text-label-md text-on-surface-variant"
        >
          {registerCopy.emailLabel}
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
            id="register-mobile-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? 'register-mobile-email-error' : undefined
            }
            placeholder={registerCopy.emailPlaceholder}
            className="w-full rounded-xl border-0 bg-transparent py-3 pr-4 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/60 focus:ring-0"
          />
        </div>
        {errors.email && (
          <FieldError id="register-mobile-email-error">
            {errors.email}
          </FieldError>
        )}
      </div>

      <div className="flex flex-col">
        <div className="mb-1 flex items-center justify-between gap-3">
          <label
            htmlFor="register-mobile-password"
            className="font-label-md text-label-md text-on-surface-variant"
          >
            {registerCopy.passwordLabel}
          </label>
          <span
            aria-live="polite"
            className={`shrink-0 font-label-sm text-label-sm font-semibold ${
              strengthTextClass[passwordStrength.tone]
            }`}
          >
            {passwordStrength.label}
          </span>
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
            id="register-mobile-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password
                ? 'register-mobile-password-error'
                : 'register-mobile-password-hint'
            }
            placeholder={registerCopy.passwordMobilePlaceholder}
            className="w-full rounded-xl border-0 bg-transparent py-3 pr-11 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/60 focus:ring-0"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
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
          <FieldError id="register-mobile-password-error">
            {errors.password}
          </FieldError>
        )}

        <div className="mt-2">
          <PasswordStrengthBars
            score={passwordStrength.score}
            tone={passwordStrength.tone}
            segments={4}
          />
        </div>
        <p
          id="register-mobile-password-hint"
          className="mt-1 text-body-sm text-outline"
        >
          {registerCopy.passwordHint}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="mb-1 flex items-center justify-between gap-3">
          <label
            htmlFor="register-mobile-confirm-password"
            className="font-label-md text-label-md text-on-surface-variant"
          >
            {registerCopy.confirmLabel}
          </label>
          {match && (
            <span
              id="register-mobile-match-status"
              aria-live="polite"
              className={`flex shrink-0 items-center gap-1 font-label-sm text-label-sm ${match.className}`}
            >
              <Icon name={match.icon} className="text-[14px]" />
              {match.label}
            </span>
          )}
        </div>
        <div
          className={`relative flex items-center rounded-xl border bg-surface-container-lowest transition-all focus-within:ring-4 ${
            hasConfirmError
              ? 'border-error focus-within:border-error focus-within:ring-error/10'
              : 'border-outline-variant/50 focus-within:border-primary focus-within:ring-primary/10'
          }`}
        >
          <span className="pointer-events-none absolute left-3.5 flex items-center text-outline">
            <Icon name="verified_user" />
          </span>
          <input
            id="register-mobile-confirm-password"
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            aria-invalid={hasConfirmError}
            aria-describedby={
              errors.confirmPassword && !confirmPassword
                ? 'register-mobile-confirm-error'
                : match
                  ? 'register-mobile-match-status'
                  : undefined
            }
            placeholder={registerCopy.confirmPlaceholder}
            className="w-full rounded-xl border-0 bg-transparent py-3 pr-11 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/60 focus:ring-0"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((current) => !current)}
            aria-label={
              showConfirmPassword
                ? 'Ocultar confirmación de contraseña'
                : 'Mostrar confirmación de contraseña'
            }
            aria-pressed={showConfirmPassword}
            className="absolute right-3 p-1 text-outline transition-colors hover:text-on-surface"
          >
            <Icon
              name={showConfirmPassword ? 'visibility_off' : 'visibility'}
            />
          </button>
        </div>
        {errors.confirmPassword && !confirmPassword && (
          <FieldError id="register-mobile-confirm-error">
            {errors.confirmPassword}
          </FieldError>
        )}
      </div>

      {isSuccess && (
        <p
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-lg bg-secondary-container/60 px-3 py-2 text-body-sm font-semibold text-on-secondary-container"
        >
          <Icon name="check_circle" className="text-[18px]" filled />
          {registerCopy.feedback.success}
        </p>
      )}

      <div className="pt-1">
        <label className="group flex cursor-pointer items-start gap-3 select-none">
          <input
            id="register-mobile-terms"
            type="checkbox"
            name="terms"
            checked={acceptedTerms}
            onChange={handleTermsChange}
            aria-invalid={Boolean(errors.acceptedTerms)}
            aria-describedby={
              errors.acceptedTerms ? 'register-mobile-terms-error' : undefined
            }
            className="mt-0.5 h-5 w-5 rounded-lg border-2 border-outline-variant accent-primary"
          />
          <span className="text-body-sm leading-snug text-on-surface-variant">
            {registerCopy.termsPrefix}
            <a
              href="#terminos"
              className="font-semibold text-primary underline underline-offset-2 hover:text-on-secondary-container"
            >
              {registerCopy.termsLink}
            </a>
            {registerCopy.termsMobileMiddle}
            <a
              href="#privacidad"
              className="font-semibold text-primary underline underline-offset-2 hover:text-on-secondary-container"
            >
              {registerCopy.privacyMobileLink}
            </a>
            {registerCopy.termsMobileSuffix}
          </span>
        </label>
        {errors.acceptedTerms && (
          <FieldError id="register-mobile-terms-error">
            {errors.acceptedTerms}
          </FieldError>
        )}
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-label-lg text-on-primary shadow-md transition-all hover:bg-on-primary-fixed-variant active:scale-[0.98] disabled:cursor-wait disabled:opacity-75 disabled:active:scale-100"
        >
          <span>
            {isSubmitting
              ? registerCopy.feedback.loading
              : isSuccess
                ? registerCopy.feedback.successButton
                : registerCopy.submit}
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
  )
}

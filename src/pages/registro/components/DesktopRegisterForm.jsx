import { Link } from 'react-router-dom'
import SocialAuthButtons from '../../../components/auth/SocialAuthButtons'
import Icon from '../../../components/ui/Icon'
import { registerCopy } from '../../../data/registerData'
import PasswordStrengthBars from './PasswordStrengthBars'
import { useRegisterForm } from '../hooks/useRegisterForm'

const strengthTextClass = {
  neutral: 'text-outline',
  error: 'text-error',
  warning: 'text-tertiary',
  success: 'text-primary',
}

const matchState = {
  empty: {
    icon: 'info',
    text: registerCopy.matchEmpty,
    className: 'text-outline',
  },
  success: {
    icon: 'check_circle',
    text: registerCopy.matchSuccess,
    className: 'text-primary',
  },
  error: {
    icon: 'error',
    text: registerCopy.matchError,
    className: 'text-error',
  },
}

function FieldError({ id, children }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1 text-label-sm text-error"
    >
      <Icon name="error" className="text-[14px]" />
      {children}
    </p>
  )
}

export default function DesktopRegisterForm() {
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
    newsletter,
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
    handleNewsletterChange,
    handleSubmit,
    handleSocialLogin,
  } = useRegisterForm({ idPrefix: 'register-desktop' })
  const match = matchState[matchStatus]
  const hasConfirmError =
    Boolean(errors.confirmPassword) || matchStatus === 'error'

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <SocialAuthButtons onSelect={handleSocialLogin} />

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-outline-variant/30" />
        <span className="shrink-0 bg-surface-container-lowest px-3 text-label-md tracking-wider text-on-surface-variant uppercase">
          {registerCopy.socialDivider}
        </span>
      </div>

      <div>
        <label
          htmlFor="register-desktop-name"
          className="mb-1.5 block text-label-md font-semibold text-on-surface-variant"
        >
          {registerCopy.nameLabel}
        </label>
        <div
          className={`relative rounded-lg border bg-surface-container-lowest transition-colors focus-within:ring-2 ${
            errors.fullName
              ? 'border-error focus-within:border-error focus-within:ring-error/15'
              : 'border-outline-variant/60 focus-within:border-primary focus-within:ring-primary/20'
          }`}
        >
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-outline">
            <Icon name="person" className="text-[20px]" />
          </span>
          <input
            id="register-desktop-name"
            name="full_name"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={handleNameChange}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={
              errors.fullName ? 'register-desktop-name-error' : undefined
            }
            placeholder={registerCopy.nameDesktopPlaceholder}
            className="w-full rounded-lg border-0 bg-transparent py-2.5 pr-4 pl-10 text-body-md text-on-surface outline-none placeholder:text-outline-variant/80 focus:ring-0"
          />
        </div>
        {errors.fullName && (
          <FieldError id="register-desktop-name-error">
            {errors.fullName}
          </FieldError>
        )}
      </div>

      <div>
        <label
          htmlFor="register-desktop-email"
          className="mb-1.5 block text-label-md font-semibold text-on-surface-variant"
        >
          {registerCopy.emailLabel}
        </label>
        <div
          className={`relative rounded-lg border bg-surface-container-lowest transition-colors focus-within:ring-2 ${
            errors.email
              ? 'border-error focus-within:border-error focus-within:ring-error/15'
              : 'border-outline-variant/60 focus-within:border-primary focus-within:ring-primary/20'
          }`}
        >
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-outline">
            <Icon name="mail" className="text-[20px]" />
          </span>
          <input
            id="register-desktop-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? 'register-desktop-email-error' : undefined
            }
            placeholder={registerCopy.emailPlaceholder}
            className="w-full rounded-lg border-0 bg-transparent py-2.5 pr-4 pl-10 text-body-md text-on-surface outline-none placeholder:text-outline-variant/80 focus:ring-0"
          />
        </div>
        {errors.email && (
          <FieldError id="register-desktop-email-error">
            {errors.email}
          </FieldError>
        )}
      </div>

      <div>
        <label
          htmlFor="register-desktop-password"
          className="mb-1.5 block text-label-md font-semibold text-on-surface-variant"
        >
          {registerCopy.passwordLabel}
        </label>
        <div
          className={`relative rounded-lg border bg-surface-container-lowest transition-colors focus-within:ring-2 ${
            errors.password
              ? 'border-error focus-within:border-error focus-within:ring-error/15'
              : 'border-outline-variant/60 focus-within:border-primary focus-within:ring-primary/20'
          }`}
        >
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-outline">
            <Icon name="lock" className="text-[20px]" />
          </span>
          <input
            id="register-desktop-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password
                ? 'register-desktop-password-error'
                : 'register-desktop-password-strength'
            }
            placeholder={registerCopy.passwordPlaceholder}
            className="w-full rounded-lg border-0 bg-transparent py-2.5 pr-11 pl-10 text-body-md text-on-surface outline-none placeholder:text-outline-variant/80 focus:ring-0"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
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
          <FieldError id="register-desktop-password-error">
            {errors.password}
          </FieldError>
        )}

        <div
          id="register-desktop-password-strength"
          className="mt-2 flex items-center justify-between gap-3"
        >
          <PasswordStrengthBars
            score={passwordStrength.score}
            tone={passwordStrength.tone}
          />
          <span
            className={`shrink-0 text-label-sm font-bold ${
              strengthTextClass[passwordStrength.tone]
            }`}
          >
            Fuerza: {passwordStrength.label}
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="register-desktop-confirm-password"
          className="mb-1.5 block text-label-md font-semibold text-on-surface-variant"
        >
          {registerCopy.confirmLabel}
        </label>
        <div
          className={`relative rounded-lg border bg-surface-container-lowest transition-colors focus-within:ring-2 ${
            hasConfirmError
              ? 'border-error focus-within:border-error focus-within:ring-error/15'
              : 'border-outline-variant/60 focus-within:border-primary focus-within:ring-primary/20'
          }`}
        >
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-outline">
            <Icon name="lock_reset" className="text-[20px]" />
          </span>
          <input
            id="register-desktop-confirm-password"
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            aria-invalid={hasConfirmError}
            aria-describedby={
              errors.confirmPassword && !confirmPassword
                ? 'register-desktop-confirm-error'
                : 'register-desktop-match-status'
            }
            placeholder={registerCopy.confirmPlaceholder}
            className="w-full rounded-lg border-0 bg-transparent py-2.5 pr-11 pl-10 text-body-md text-on-surface outline-none placeholder:text-outline-variant/80 focus:ring-0"
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
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-outline transition-colors hover:text-on-surface"
          >
            <Icon
              name={showConfirmPassword ? 'visibility_off' : 'visibility'}
              className="text-[20px]"
            />
          </button>
        </div>

        <div
          id="register-desktop-match-status"
          className={`mt-1 flex items-center gap-1.5 text-label-sm ${match.className}`}
        >
          <Icon name={match.icon} className="text-[14px]" />
          <span>{match.text}</span>
        </div>

        {errors.confirmPassword && !confirmPassword && (
          <FieldError id="register-desktop-confirm-error">
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

      <div className="space-y-2 pt-2">
        <label className="group flex cursor-pointer items-start gap-3">
          <input
            id="register-desktop-terms"
            type="checkbox"
            name="terms"
            checked={acceptedTerms}
            onChange={handleTermsChange}
            aria-invalid={Boolean(errors.acceptedTerms)}
            aria-describedby={
              errors.acceptedTerms
                ? 'register-desktop-terms-error'
                : undefined
            }
            className="mt-1 h-4 w-4 rounded border-outline accent-primary"
          />
          <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
            {registerCopy.termsPrefix}
            <a
              href="#terminos"
              className="font-semibold text-primary hover:underline"
            >
              {registerCopy.termsLink}
            </a>
            {registerCopy.termsMiddle}
            <a
              href="#privacidad"
              className="font-semibold text-primary hover:underline"
            >
              {registerCopy.privacyLink}
            </a>
            {registerCopy.termsSuffix}
          </span>
        </label>
        {errors.acceptedTerms && (
          <FieldError id="register-desktop-terms-error">
            {errors.acceptedTerms}
          </FieldError>
        )}

        <label className="group flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="newsletter"
            checked={newsletter}
            onChange={handleNewsletterChange}
            className="mt-1 h-4 w-4 rounded border-outline accent-primary"
          />
          <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
            {registerCopy.newsletter}
          </span>
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="auth-card-shadow flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-label-lg text-on-primary transition-all duration-150 hover:bg-primary-container active:scale-[0.98] disabled:cursor-wait disabled:opacity-75 disabled:active:scale-100"
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
            className={`text-[18px] ${isSubmitting ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-body-sm text-on-surface-variant">
        <Icon name="shield" className="text-[18px] text-primary" />
        <span>{registerCopy.trust}</span>
      </div>

      <div className="border-t border-outline-variant/30 pt-4 text-center">
        <p className="text-body-sm text-on-surface-variant">
          {registerCopy.loginQuestion}{' '}
          <Link
            to="/login"
            className="ml-1 font-bold text-primary hover:underline"
          >
            {registerCopy.loginLink}
          </Link>
        </p>
      </div>
    </form>
  )
}

import Icon from '../../../components/ui/Icon'
import { loginCopy } from '../../../data/loginData'

export default function PasswordRecoveryDialog({
  recovery,
  idPrefix = 'password-recovery',
}) {
  if (!recovery.isOpen) {
    return null
  }

  const recoveryCopy = loginCopy.recovery
  const titleId = `${idPrefix}-title`
  const descriptionId = `${idPrefix}-description`
  const errorId = `${idPrefix}-email-error`
  const emailId = `${idPrefix}-email`

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      recovery.close()
    }
  }

  return (
    <div
      role="presentation"
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-on-surface/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="max-h-[92svh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-surface-container-lowest p-6 shadow-2xl sm:rounded-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-label-sm font-bold tracking-wider text-primary uppercase">
              {recoveryCopy.eyebrow}
            </span>
            <h2
              id={titleId}
              className="mt-1 text-headline-sm font-bold text-on-surface"
            >
              {recovery.isSuccess
                ? recoveryCopy.successTitle
                : recoveryCopy.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={recovery.close}
            disabled={recovery.isLoading}
            aria-label="Cerrar recuperación de contraseña"
            className="rounded-full p-2 text-outline transition-colors hover:bg-surface-container hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        {recovery.isSuccess ? (
          <div className="mt-6 space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-primary">
              <Icon name="mark_email_read" className="text-[30px]" filled />
            </div>

            <div>
              <p
                id={descriptionId}
                className="text-body-md text-on-surface-variant"
              >
                {recoveryCopy.successMessage}
              </p>
              <span className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-surface-container px-3 py-1.5 text-label-md text-on-surface">
                <Icon name="mail" className="text-[16px] text-primary" />
                <span className="truncate">{recovery.email}</span>
              </span>
            </div>

            <p className="rounded-lg border border-outline-variant/30 bg-surface-container-low/60 px-3 py-2 text-body-sm text-outline">
              {recoveryCopy.successHint}
            </p>

            <div className="flex flex-col gap-2 pt-1 sm:flex-row">
              <button
                type="button"
                onClick={recovery.close}
                className="flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-3 text-label-lg font-bold text-on-primary transition-colors hover:bg-primary-container"
              >
                {recoveryCopy.close}
              </button>
              <button
                type="button"
                onClick={recovery.reset}
                className="flex flex-1 items-center justify-center rounded-lg border border-outline-variant/60 px-4 py-3 text-label-lg text-primary transition-colors hover:bg-surface-container-low"
              >
                {recoveryCopy.tryAgain}
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={recovery.handleSubmit} noValidate>
            <p id={descriptionId} className="text-body-md text-on-surface-variant">
              {recoveryCopy.description}
            </p>

            <div>
              <label
                htmlFor={emailId}
                className="mb-1.5 block text-label-md font-semibold text-on-surface-variant"
              >
                {recoveryCopy.emailLabel}
              </label>
              <div
                className={`relative flex items-center rounded-xl border bg-surface-container-lowest transition-all focus-within:ring-4 focus-within:ring-primary/10 ${
                  recovery.error
                    ? 'border-error focus-within:border-error'
                    : 'border-outline-variant/60 focus-within:border-primary'
                }`}
              >
                <span className="pointer-events-none absolute left-3.5 flex items-center text-outline">
                  <Icon name="mail" />
                </span>
                <input
                  id={emailId}
                  name="recovery_email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={recovery.email}
                  onChange={recovery.handleEmailChange}
                  aria-invalid={Boolean(recovery.error)}
                  aria-describedby={recovery.error ? errorId : undefined}
                  placeholder={recoveryCopy.emailPlaceholder}
                  className="w-full rounded-xl border-0 bg-transparent py-3 pr-4 pl-11 text-body-md text-on-surface outline-none placeholder:text-outline/60 focus:ring-0"
                />
              </div>

              {recovery.error && (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-1.5 flex items-center gap-1 text-label-sm text-error"
                >
                  <Icon name="error" className="text-[14px]" />
                  {recovery.error}
                </p>
              )}
            </div>

            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/60 px-3 py-2">
              <p className="flex items-start gap-1.5 text-body-sm text-outline">
                <Icon name="lock" className="mt-0.5 text-[14px] text-primary" />
                {recoveryCopy.securityNote}
              </p>
            </div>

            <button
              type="submit"
              disabled={recovery.isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container disabled:cursor-wait disabled:opacity-75"
            >
              {recovery.isLoading ? (
                <>
                  <Icon
                    name="progress_activity"
                    className="animate-spin text-[18px]"
                  />
                  {recoveryCopy.loading}
                </>
              ) : (
                <>
                  <Icon name="send" className="text-[18px]" />
                  {recoveryCopy.submit}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

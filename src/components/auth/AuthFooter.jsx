const legalLinks = [
  'Política de Privacidad',
  'Términos de Servicio',
  'Cumplimiento HIPAA',
  'Centro de Confianza',
  'Estado del Sistema',
]

export default function AuthFooter() {
  return (
    <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-lowest">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row md:px-8 md:text-left">
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <span className="text-headline-sm font-bold text-primary">Vitalis</span>
          <span className="hidden text-outline-variant sm:inline">|</span>
          <p className="text-body-sm text-on-surface-variant">
            © 2026 Vitalis Health Technologies, Inc. HIPAA &amp; GDPR
            Compliant.
          </p>
        </div>

        <nav
          aria-label="Enlaces legales"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {legalLinks.map((label) => (
            <span
              key={label}
              className="text-label-md text-on-surface-variant"
            >
              {label}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  )
}

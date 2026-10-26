import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Privacidad', href: '#privacidad' },
  { label: 'Términos de Servicio', href: '#terminos' },
  { label: 'Soporte Clínico', href: '#soporte' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto hidden bg-surface-container-low lg:block">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <Link
            to="/"
            className="text-headline-sm font-bold tracking-tight text-primary"
          >
            Vitalis
          </Link>
          <span className="hidden text-outline sm:inline">•</span>
          <p className="text-body-sm text-on-surface-variant">
            © {currentYear} Vitalis Health &amp; Nutrition. Todos los derechos
            reservados.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-label-md text-on-surface-variant transition-colors duration-150 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

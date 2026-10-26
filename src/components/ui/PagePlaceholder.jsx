import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function PagePlaceholder({
  icon,
  eyebrow,
  title,
  description,
}) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-start justify-center px-4 pt-24 pb-32 sm:px-6 lg:px-8 lg:pt-16 lg:pb-16">
      <div className="card-ambient w-full max-w-2xl rounded-xl p-8 text-center sm:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
          <Icon name={icon} className="text-3xl" filled />
        </div>
        {eyebrow && (
          <span className="text-label-sm text-primary uppercase">{eyebrow}</span>
        )}
        <h1 className="mt-2 text-headline-md text-on-surface sm:text-headline-lg">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-body-md text-on-surface-variant">
          {description}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-label-lg text-on-primary shadow-sm transition-all duration-150 hover:bg-primary-container active:scale-95"
        >
          <Icon name="arrow_back" className="text-lg" />
          Volver al dashboard
        </Link>
      </div>
    </main>
  )
}

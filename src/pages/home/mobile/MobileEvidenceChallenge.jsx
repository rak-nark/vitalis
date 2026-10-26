import { Link } from 'react-router-dom'
import Icon from '../../../components/ui/Icon'
import { weeklyChallenge, wellnessTip } from '../../../data/homeData'

export default function MobileEvidenceChallenge() {
  return (
    <section className="mb-4 flex flex-col gap-2">
      <h2 className="text-headline-sm text-on-surface">Evidencia &amp; Desafío</h2>

      <article className="flex items-start gap-3 rounded-xl border border-surface-container-high bg-surface-container-lowest p-3.5 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container text-primary">
          <Icon name="science" className="text-[24px]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-label-sm font-bold text-primary">
              {wellnessTip.source}
            </span>
            <span className="text-[10px] text-outline">
              • {wellnessTip.readingTime}
            </span>
          </div>
          <h3 className="mt-0.5 text-label-md leading-snug font-bold text-on-surface">
            {wellnessTip.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-body-sm text-on-surface-variant">
            {wellnessTip.shortDescription}
          </p>
          <Link
            to="/contenidos"
            className="mt-1.5 inline-flex items-center gap-0.5 text-label-sm font-bold text-primary hover:underline"
          >
            Leer resumen clínico
            <Icon name="open_in_new" className="text-[14px]" />
          </Link>
        </div>
      </article>

      <div className="flex flex-col gap-2 rounded-xl border border-secondary-container bg-linear-to-br from-surface-container-lowest to-surface-container/50 p-3.5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon name="restaurant" className="text-base text-tertiary" />
            <span className="text-label-md font-bold text-on-surface">
              {weeklyChallenge.mobileTitle}
            </span>
          </div>
          <span className="shrink-0 text-label-sm font-bold text-secondary">
            {weeklyChallenge.mobileDays}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${weeklyChallenge.progress}%` }}
          />
        </div>

        <p className="flex items-center justify-between gap-2 text-body-sm text-on-surface-variant">
          <span>{weeklyChallenge.mobileMessage}</span>
          <span className="shrink-0 text-label-sm font-bold text-primary">
            {weeklyChallenge.progress}%
          </span>
        </p>
      </div>
    </section>
  )
}

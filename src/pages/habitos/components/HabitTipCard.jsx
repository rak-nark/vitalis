import { Link } from 'react-router-dom'
import Icon from '../../../components/ui/Icon'

export default function HabitTipCard({ tip }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-secondary/30 bg-linear-to-r from-secondary-container/40 to-surface-container-low p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-primary">
          <Icon name="tips_and_updates" className="text-xl" />
        </div>
        <div className="min-w-0">
          <h4 className="text-label-md font-bold text-on-surface">
            {tip.title}
          </h4>
          <p className="text-body-sm text-on-surface-variant">
            {tip.description}
          </p>
        </div>
      </div>
      <Link
        to={tip.to}
        className="shrink-0 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-label-sm font-bold text-primary transition-colors hover:bg-secondary-container"
      >
        {tip.cta}
      </Link>
    </div>
  )
}

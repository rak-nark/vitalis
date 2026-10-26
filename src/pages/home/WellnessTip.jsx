import Icon from '../../components/ui/Icon'
import { wellnessTip } from '../../data/homeData'

export default function WellnessTip() {
  return (
    <div className="card-ambient space-y-4 rounded-xl border-emerald-100/70 bg-linear-to-b from-white to-[#F0FDF4] p-6">
      <div className="flex items-center gap-2 text-primary">
        <Icon name="lightbulb" className="text-xl" filled />
        <span className="text-label-md font-bold tracking-wider uppercase">
          {wellnessTip.label}
        </span>
      </div>

      <h4 className="text-headline-sm leading-snug text-on-surface">
        {wellnessTip.title}
      </h4>

      <p className="text-body-sm leading-relaxed text-on-surface-variant">
        {wellnessTip.descriptionBefore}{' '}
        <strong className="font-semibold text-primary">
          {wellnessTip.highlight}
        </strong>
        {wellnessTip.descriptionAfter}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-200/40 pt-2 text-[11px] text-outline">
        <span className="flex items-center gap-1">
          <Icon name="menu_book" className="text-sm" />
          {wellnessTip.reference}
        </span>
        <button
          type="button"
          className="font-bold text-primary transition-colors hover:underline"
        >
          {wellnessTip.linkLabel}
        </button>
      </div>
    </div>
  )
}

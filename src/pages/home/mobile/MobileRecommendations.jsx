import { Link } from 'react-router-dom'
import Icon from '../../../components/ui/Icon'
import { recommendedContent } from '../../../data/homeData'
import MobileContentCard from './MobileContentCard'

export default function MobileRecommendations() {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-headline-sm text-on-surface">Para ti hoy</h2>
          <p className="text-body-sm text-on-surface-variant">
            Basado en tus valores de glucosa y energía
          </p>
        </div>
        <Link
          to="/contenidos"
          className="flex shrink-0 items-center text-label-md font-bold text-primary hover:underline"
        >
          Ver todas (18)
          <Icon name="chevron_right" className="text-[16px]" />
        </Link>
      </div>

      <div
        aria-label="Contenidos recomendados"
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1"
      >
        {recommendedContent.map((content) => (
          <MobileContentCard key={content.id} content={content} />
        ))}
      </div>
    </section>
  )
}

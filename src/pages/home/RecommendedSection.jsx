import { Link } from 'react-router-dom'
import Icon from '../../components/ui/Icon'
import { recommendedContent } from '../../data/homeData'
import ContentCard from './ContentCard'

export default function RecommendedSection() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-label-sm font-bold tracking-wider text-primary uppercase">
            <Icon name="auto_awesome" className="text-base" />
            <span>Personalización Adaptativa</span>
          </div>
          <h2 className="text-headline-md text-on-surface">
            Recomendado para ti hoy
          </h2>
        </div>
        <Link
          to="/contenidos"
          className="flex items-center gap-1 text-label-lg text-primary transition-colors hover:text-primary-container"
        >
          Ver todas (18)
          <Icon name="arrow_forward" className="text-sm" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {recommendedContent.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </>
  )
}

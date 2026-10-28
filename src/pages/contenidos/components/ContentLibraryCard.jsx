import { contentPresentation } from '../../../data/contenidosPageData'
import ContentArticleCard from './ContentArticleCard'
import ContentRoutineCard from './ContentRoutineCard'
import ContentVisualCard from './ContentVisualCard'

export default function ContentLibraryCard({ content, ...props }) {
  const presentation = contentPresentation[content.id] ?? {}

  if (presentation.desktopVariant === 'article') {
    return (
      <ContentArticleCard
        content={content}
        presentation={presentation}
        {...props}
      />
    )
  }

  if (presentation.desktopVariant === 'routine') {
    return (
      <ContentRoutineCard
        content={content}
        presentation={presentation}
        {...props}
      />
    )
  }

  return (
    <ContentVisualCard
      content={content}
      presentation={presentation}
      {...props}
    />
  )
}

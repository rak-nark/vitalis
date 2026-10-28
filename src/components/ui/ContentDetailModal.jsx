import { useEffect } from 'react'
import Icon from './Icon'

export default function ContentDetailModal({ isOpen, content, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !content) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-content-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-outline-variant/20 gap-3">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container text-label-sm font-semibold mb-1">
              {content.badge || 'Contenido Clínico'}
            </span>
            <h3
              id="modal-content-title"
              className="text-headline-sm font-bold text-on-surface"
            >
              {content.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-outline hover:bg-surface-container hover:text-on-surface transition-colors shrink-0"
            aria-label="Cerrar modal"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {content.image && (
            <div className="h-48 w-full overflow-hidden rounded-xl bg-surface-container">
              <img
                src={content.image}
                alt={content.imageAlt || content.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <p className="text-body-md text-on-surface-variant leading-relaxed">
            {content.description}
          </p>

          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {content.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-full text-label-sm font-medium ${tag.className}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          {content.quote && (
            <blockquote className="rounded-xl border-l-4 border-primary bg-surface-container/60 p-4 text-body-sm italic text-on-surface-variant">
              {content.quote.text || content.quote}
            </blockquote>
          )}

          <div className="rounded-xl bg-surface-container-low/80 p-3.5 border border-outline-variant/30 flex items-center justify-between text-label-md text-on-surface-variant">
            <span className="flex items-center gap-1.5 font-semibold text-primary">
              <Icon name="verified" className="text-[18px]" filled />
              Supervisado por: {content.author || 'Equipo Clínico Vitalis'}
            </span>
            <span>{content.duration || content.meta || '5-20 min'}</span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-primary px-5 py-2 text-label-md font-bold text-on-primary hover:bg-primary-container active:scale-95 transition-all shadow-sm"
            >
              Cerrar Detalle
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

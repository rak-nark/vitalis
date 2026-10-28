import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

function ContentNoteDialog({ content, initialNote, onClose, onSave }) {
  const [noteText, setNoteText] = useState(initialNote)
  const textareaRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => textareaRef.current?.focus(), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(content.id, noteText)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-note-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-container text-on-secondary-container">
              <Icon name="edit_note" className="text-[20px]" />
            </span>
            <div>
              <h3
                id="modal-note-title"
                className="text-headline-sm font-bold text-on-surface"
              >
                Notas Personales
              </h3>
              <p className="text-label-sm text-outline truncate max-w-xs sm:max-w-sm">
                {content.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-outline hover:bg-surface-container hover:text-on-surface transition-colors"
            aria-label="Cerrar modal"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="content-note-textarea"
              className="block text-label-md font-bold text-on-surface mb-1.5"
            >
              Anotaciones clínicas o de preparación
            </label>
            <textarea
              id="content-note-textarea"
              ref={textareaRef}
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Ej. Consumir con 2 vasos de agua. Reducir sal marina si la tensión arterial es inferior a 115..."
              className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-3 text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-outline-variant px-4 py-2 text-label-md font-semibold text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-label-md font-bold text-on-primary hover:bg-primary-container active:scale-95 transition-all shadow-sm"
            >
              <Icon name="save" className="text-[18px]" />
              Guardar Nota
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ContentNoteModal({
  isOpen,
  content,
  initialNote = '',
  onClose,
  onSave,
}) {
  if (!isOpen || !content) return null

  return (
    <ContentNoteDialog
      content={content}
      initialNote={initialNote}
      onClose={onClose}
      onSave={onSave}
    />
  )
}

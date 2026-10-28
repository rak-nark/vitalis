import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

function CreateCollectionDialog({ onClose, onCreate }) {
  const [collectionName, setCollectionName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50)
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
    if (!collectionName.trim()) {
      setError('Por favor escribe un nombre para la colección.')
      return
    }

    const created = onCreate(collectionName.trim())
    if (created) {
      onClose()
      return
    }

    setError('Ya existe una colección con ese nombre.')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-collection-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="create_new_folder" className="text-[20px]" />
            </span>
            <h3
              id="modal-collection-title"
              className="text-headline-sm font-bold text-on-surface"
            >
              Nueva Colección
            </h3>
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
              htmlFor="collection-name-input"
              className="block text-label-md font-bold text-on-surface mb-1.5"
            >
              Nombre de la colección
            </label>
            <input
              id="collection-name-input"
              ref={inputRef}
              type="text"
              value={collectionName}
              onChange={(e) => {
                setCollectionName(e.target.value)
                if (error) setError('')
              }}
              placeholder="Ej. Longevidad y Ayuno, Snacks Energéticos..."
              className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-2.5 text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
            {error && (
              <p className="mt-1 text-label-sm text-error font-medium">
                {error}
              </p>
            )}
            <p className="mt-1.5 text-label-sm text-outline">
              Organiza tus recetas, estudios y rutinas guardadas en una carpeta accesible.
            </p>
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
              <Icon name="add" className="text-[18px]" />
              Crear Colección
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CreateCollectionModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null

  return <CreateCollectionDialog onClose={onClose} onCreate={onCreate} />
}

import Icon from '../../../components/ui/Icon'

export default function ProfileEditForm({ profile, variant = 'desktop' }) {
  const {
    copy,
    draftName,
    setDraftName,
    handleSaveEdit,
    handleCancelEdit,
  } = profile

  return (
    <form
      onSubmit={handleSaveEdit}
      className={
        variant === 'mobile'
          ? 'mt-3 rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-3'
          : 'relative z-10 mt-4 flex flex-col gap-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest/80 p-3 sm:flex-row sm:items-end'
      }
    >
      <label className="min-w-0 flex-1">
        <span className="text-label-sm font-semibold text-on-surface-variant">
          {copy.nameLabel}
        </span>
        <input
          type="text"
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
          placeholder={copy.namePlaceholder}
          aria-label={copy.nameLabel}
          autoFocus
          className="mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-label-md font-bold text-on-primary transition-colors hover:bg-primary-container sm:flex-none"
        >
          <Icon name="check" className="text-[16px]" />
          {copy.saveLabel}
        </button>
        <button
          type="button"
          onClick={handleCancelEdit}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-label-md font-semibold text-on-surface-variant transition-colors hover:bg-surface-container sm:flex-none"
        >
          {copy.cancelLabel}
        </button>
      </div>

      {variant === 'desktop' && (
        <p className="text-label-sm text-outline sm:absolute sm:-bottom-5 sm:left-0">
          {copy.editHint}
        </p>
      )}
    </form>
  )
}

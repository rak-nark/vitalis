import Icon from '../../../components/ui/Icon'

export default function ProfileNotice({ notice, onDismiss }) {
  if (!notice) {
    return null
  }

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-md items-start gap-3 rounded-xl border border-primary/20 bg-secondary-container px-4 py-3 text-body-sm font-semibold text-on-secondary-container shadow-lg lg:right-8 lg:bottom-8 lg:left-auto lg:mx-0 lg:max-w-sm"
    >
      <Icon name="check_circle" className="mt-0.5 text-[20px]" filled />
      <p className="flex-1">{notice}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Cerrar aviso"
        className="rounded-full p-0.5 text-on-secondary-container/80 transition-colors hover:bg-on-secondary-container/10 hover:text-on-secondary-container"
      >
        <Icon name="close" className="text-[18px]" />
      </button>
    </div>
  )
}

import Icon from '../../../components/ui/Icon'

export default function MobileRegisterFab({ onRegister }) {
  return (
    <div className="pointer-events-none fixed bottom-20 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRegister}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-label-lg font-bold text-on-primary shadow-lg shadow-primary/30 transition-all hover:bg-primary-container active:scale-95"
        >
          <Icon name="add" className="text-[22px]" />
          Registrar Hábito
        </button>
      </div>
    </div>
  )
}

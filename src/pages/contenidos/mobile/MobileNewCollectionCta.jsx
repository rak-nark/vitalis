import Icon from '../../../components/ui/Icon'

export default function MobileNewCollectionCta({ label, onCreate }) {
  return (
    <section className="flex justify-center pt-2 pb-6">
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface-container-lowest px-5 py-2.5 text-label-lg text-primary shadow-sm transition-all hover:bg-secondary-container/30 active:scale-95"
      >
        <Icon name="bookmark_add" className="text-[18px]" />
        <span>+ {label}</span>
      </button>
    </section>
  )
}

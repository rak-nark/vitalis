import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function ContentCollections({
  copy,
  collections,
  activeCollection,
  onSelect,
  onManage,
  onCreate,
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-label-md font-bold tracking-wider text-outline">
          {copy.collectionsLabel}
        </span>
        <button
          type="button"
          onClick={onManage}
          className="flex shrink-0 items-center gap-1 text-label-md text-primary transition-colors hover:text-primary-container"
        >
          <span>{copy.manageCollections}</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </button>
      </div>

      <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-2">
        {collections.map((collection) => {
          const isActive = activeCollection === collection.id

          return (
            <button
              key={collection.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(collection.id)}
              className={clsx(
                'flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-label-md transition-all active:scale-95',
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'border border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:bg-surface-container',
              )}
            >
              <Icon
                name={collection.icon}
                className={clsx(
                  'text-[18px]',
                  isActive ? 'text-on-primary' : collection.iconClass,
                )}
              />
              <span>{collection.label}</span>
              <span
                className={clsx(
                  'ml-1 rounded-full px-2 py-0.5 text-label-sm font-bold',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-surface-container-high text-on-surface-variant',
                )}
              >
                {collection.count}
              </span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={onCreate}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-dashed border-primary/40 px-4 py-2.5 text-label-md text-primary transition-colors hover:bg-secondary-container/20"
        >
          <Icon name="add" className="text-[18px]" />
          <span>{copy.newCollection}</span>
        </button>
      </div>
    </section>
  )
}

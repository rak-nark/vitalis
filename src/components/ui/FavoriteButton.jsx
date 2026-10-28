import clsx from 'clsx'
import Icon from './Icon'

const variantStyles = {
  overlay:
    'absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/90 text-on-surface-variant shadow-sm backdrop-blur-sm transition-all duration-150 hover:bg-surface-container-lowest hover:text-error active:scale-90',
  mini:
    'absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-on-surface-variant shadow-sm backdrop-blur-md transition-all duration-150 hover:text-error active:scale-90',
  outline:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors duration-150 hover:border-primary/40 hover:bg-surface-container-low hover:text-primary active:scale-95',
  plain:
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-outline transition-colors duration-150 hover:bg-surface-container hover:text-on-surface active:scale-90',
}

export default function FavoriteButton({
  favorite,
  onToggle,
  title,
  variant = 'overlay',
  className,
}) {
  return (
    <button
      type="button"
      aria-label={
        favorite
          ? `Quitar “${title}” de favoritos`
          : `Guardar “${title}” en favoritos`
      }
      aria-pressed={favorite}
      onClick={(event) => {
        event.stopPropagation()
        onToggle()
      }}
      className={clsx(
        variantStyles[variant],
        favorite && variant === 'outline'
          ? 'border-error/30 text-error'
          : null,
        favorite && variant !== 'outline' ? 'text-error' : null,
        className,
      )}
    >
      <Icon
        name="favorite"
        className={variant === 'outline' ? 'text-[20px]' : 'text-[18px]'}
        filled={favorite}
      />
    </button>
  )
}

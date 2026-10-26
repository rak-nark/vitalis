import clsx from 'clsx'

export default function Icon({ name, className, filled = false, ...props }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'material-symbols-outlined',
        filled && 'icon-filled',
        className,
      )}
      {...props}
    >
      {name}
    </span>
  )
}

import clsx from 'clsx'

export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={clsx(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        checked ? 'bg-primary' : 'bg-surface-container-high',
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          'inline-block h-5 w-5 rounded-full border border-outline-variant/20 bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-[22px]' : 'translate-x-[2px]',
        )}
      />
    </button>
  )
}

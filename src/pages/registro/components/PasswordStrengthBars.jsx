const toneClasses = {
  neutral: 'bg-outline-variant/40',
  error: 'bg-error',
  warning: 'bg-tertiary-fixed-dim',
  success: 'bg-primary',
}

export default function PasswordStrengthBars({
  score,
  tone,
  segments = 3,
}) {
  const filled = score >= 3 ? segments : score

  return (
    <div aria-hidden="true" className="flex h-1.5 flex-1 items-center gap-1.5">
      {Array.from({ length: segments }, (_, index) => (
        <span
          key={index}
          className={`h-full flex-1 rounded-full ${
            index < filled
              ? toneClasses[tone] ?? toneClasses.neutral
              : 'bg-outline-variant/40'
          }`}
        />
      ))}
    </div>
  )
}

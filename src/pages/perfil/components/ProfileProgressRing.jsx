export default function ProfileProgressRing({ progress, size = 64 }) {
  const radius = 26
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress / 100)

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Adherencia del protocolo: ${progress}%`}
    >
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-surface-container"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-primary transition-all duration-700"
        />
      </svg>
      <span className="absolute text-headline-sm font-bold text-primary">
        {progress}%
      </span>
    </div>
  )
}

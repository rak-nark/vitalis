export default function MobileContentHeader({ copy, total }) {
  return (
    <header className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-headline-md font-bold tracking-tight text-on-surface">
          {copy.title}
        </h1>
        <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-label-sm text-on-secondary-container">
          {total} {copy.mobileAvailableLabel}
        </span>
      </div>
      <p className="text-body-sm text-on-surface-variant">
        {copy.mobileDescription}
      </p>
    </header>
  )
}

import Icon from '../../../components/ui/Icon'

export default function ConnectedDevices({ devices, copy, onLinkDevice }) {
  return (
    <section className="card-ambient flex flex-col justify-between rounded-xl p-6">
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-2">
            <Icon name="devices" className="text-primary" />
            <h2 className="text-headline-sm text-on-surface">
              {copy.devicesTitle}
            </h2>
          </div>
          <span className="rounded-full bg-secondary-fixed px-2.5 py-0.5 text-label-sm whitespace-nowrap text-on-secondary-fixed">
            {copy.devicesActiveLabel}
          </span>
        </div>

        <div className="mt-2 divide-y divide-outline-variant/30">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between gap-3 py-3.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container text-on-surface">
                  <Icon name={device.icon} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-label-lg font-bold text-on-surface">
                    {device.name}
                  </p>
                  <p
                    className={`flex items-center gap-1 text-body-sm ${device.statusClass}`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${device.dotClass}`}
                    />
                    <span className="truncate">{device.status}</span>
                  </p>
                </div>
              </div>
              <Icon
                name="more_vert"
                className="shrink-0 text-outline"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onLinkDevice}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container px-4 py-2.5 text-label-md text-on-surface transition-colors hover:bg-surface-variant"
      >
        <Icon name="add_link" className="text-sm" />
        {copy.deviceCta}
      </button>
    </section>
  )
}

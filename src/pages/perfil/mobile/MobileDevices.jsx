import Icon from '../../../components/ui/Icon'

export default function MobileDevices({ devices, copy, onLinkDevice }) {
  const activeDevices = devices.filter((device) => device.active).slice(0, 2)

  return (
    <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-1.5 text-label-lg font-bold text-on-surface">
            <Icon name="devices" className="text-[18px] text-primary" />
            {copy.mobileDevicesTitle}
          </h2>
          <span className="mt-0.5 block text-label-sm font-semibold text-primary">
            {copy.mobileDevicesActiveLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={onLinkDevice}
          className="shrink-0 text-label-sm font-bold text-primary transition-colors hover:text-primary-container active:scale-95"
        >
          {copy.mobileLinkDevice}
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {activeDevices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-low p-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-lowest text-primary shadow-sm">
                <Icon name={device.icon} className="text-[20px]" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-label-md font-semibold text-on-surface">
                  {device.mobileName ?? device.name}
                </p>
                <p className="truncate text-body-sm text-on-surface-variant">
                  {device.mobileStatus ?? device.status}
                </p>
              </div>
            </div>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
              title="Conectado"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

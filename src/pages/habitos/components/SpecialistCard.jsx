import clsx from 'clsx'
import Icon from '../../../components/ui/Icon'

export default function SpecialistCard({ specialist, logStatus, onSendLog }) {
  const isLoading = logStatus === 'loading'
  const isSuccess = logStatus === 'success'

  return (
    <section className="relative overflow-hidden rounded-xl bg-primary p-5 text-on-primary shadow-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10"
      />

      <div className="relative z-10">
        <span className="flex items-center gap-2 text-label-sm font-bold text-secondary-fixed">
          <Icon name="health_and_safety" className="text-sm" />
          {specialist.label}
        </span>
        <h2 className="mt-1 text-headline-sm font-bold">
          Tu Médico: {specialist.name}
        </h2>
        <p className="mt-2 text-body-sm text-on-primary/90">
          {specialist.description}
        </p>
        <p className="mt-2 text-label-sm font-semibold text-secondary-fixed">
          Próxima consulta: {specialist.nextAppointment}
        </p>
      </div>

      <button
        type="button"
        onClick={onSendLog}
        disabled={isLoading || isSuccess}
        className={clsx(
          'relative z-10 mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-label-md font-bold transition-colors',
          isSuccess
            ? 'cursor-default bg-secondary-container text-on-secondary-container'
            : 'bg-on-primary text-primary hover:bg-surface-container-low disabled:cursor-wait disabled:opacity-80',
        )}
      >
        <Icon
          name={
            isSuccess
              ? 'check_circle'
              : isLoading
                ? 'progress_activity'
                : 'send'
          }
          className={clsx('text-[18px]', isLoading && 'animate-spin')}
        />
        {isSuccess
          ? specialist.successLabel
          : isLoading
            ? 'Enviando...'
            : specialist.cta}
      </button>

      <p role="status" className="sr-only">
        {isSuccess
          ? 'La bitácora fue enviada correctamente.'
          : isLoading
            ? 'Enviando bitácora.'
            : ''}
      </p>
    </section>
  )
}

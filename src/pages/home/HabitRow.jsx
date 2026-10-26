import Icon from '../../components/ui/Icon'

export default function HabitRow({ habit, onToggle }) {
  return (
    <label
      className={`group flex cursor-pointer flex-col gap-3 rounded-lg border p-3.5 transition-all sm:flex-row sm:items-center sm:justify-between ${
        habit.completed
          ? 'border-slate-200/80 bg-surface-container-low/40 hover:bg-surface-container-low'
          : 'border-slate-200 bg-white hover:border-primary/40 hover:bg-surface-container-low/30'
      }`}
    >
      <div className="flex w-full items-start gap-3.5 sm:w-auto sm:items-center">
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() => onToggle(habit.id)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-primary focus:ring-primary/20 sm:mt-0"
        />
        <div>
          <p className="text-label-lg font-semibold text-on-surface transition-colors group-hover:text-primary">
            {habit.title}
          </p>
          <p className="text-body-sm text-outline">{habit.detail}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-start pl-8 sm:self-auto sm:pl-0">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap ${habit.tagClass}`}
        >
          {habit.tag}
        </span>
        <Icon
          name={habit.icon}
          className={`text-xl ${
            habit.completed ? 'text-primary' : 'text-outline'
          }`}
        />
      </div>
    </label>
  )
}

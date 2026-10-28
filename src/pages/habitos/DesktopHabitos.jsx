import Icon from '../../components/ui/Icon'
import AiSuggestions from './components/AiSuggestions'
import ConsistencyChart from './components/ConsistencyChart'
import ConsistencyHeatmap from './components/ConsistencyHeatmap'
import DailyProgressCard from './components/DailyProgressCard'
import HabitCategoryGroups from './components/HabitCategoryGroups'
import HabitsHero from './components/HabitsHero'
import SavedContents from './components/SavedContents'
import SpecialistCard from './components/SpecialistCard'
import WeeklyCalendar from './components/WeeklyCalendar'
import { useHabitosPage } from './hooks/useHabitosPage'

export default function DesktopHabitos() {
  const {
    user,
    favoriteContents,
    completedCount,
    totalCount,
    remainingCount,
    progress,
    metrics,
    categoryProgress,
    copy,
    week,
    selectedDay,
    selectedDayId,
    handleSelectDay,
    handlePreviousDay,
    handleNextDay,
    canGoPrevious,
    canGoNext,
    timeFilterOptions,
    activeTimeFilter,
    handleTimeFilterChange,
    categorizedHabits,
    toggleHabit,
    recoveryTip,
    adherence,
    heatmap,
    suggestions,
    isSuggestionAdded,
    handleAddSuggestion,
    specialist,
    logStatus,
    handleSendLog,
    handleRegisterHabit,
  } = useHabitosPage({ listId: 'habitos-lista-desktop' })

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 text-label-sm text-outline">
            <span>{copy.brand}</span>
            <span>/</span>
            <span className="font-semibold text-primary">
              {copy.breadcrumb}
            </span>
          </div>
          <h1 className="mt-1 text-headline-lg tracking-tight text-on-surface">
            {copy.title}
          </h1>
          <p className="mt-1 max-w-2xl text-body-md text-on-surface-variant">
            {copy.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-container-high bg-surface-container-lowest px-3 py-1.5 text-label-md text-on-surface-variant shadow-sm">
            <Icon name="calendar_today" className="text-[16px] text-primary" />
            {copy.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1.5 text-label-md text-amber-900 shadow-sm">
            <Icon
              name="local_fire_department"
              className="text-[16px] text-amber-500"
              filled
            />
            Racha: {user.streakDays} días
          </span>
          <button
            type="button"
            onClick={handleRegisterHabit}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container active:scale-95"
          >
            <Icon name="add_circle" className="text-lg" />
            {copy.registerLabel}
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <HabitsHero
            user={user}
            completedCount={completedCount}
            totalCount={totalCount}
            remainingCount={remainingCount}
            metrics={metrics}
            copy={copy}
          />
        </div>
        <div className="lg:col-span-4">
          <DailyProgressCard
            progress={progress}
            completedCount={completedCount}
            totalCount={totalCount}
            categories={categoryProgress}
          />
        </div>
      </section>

      <WeeklyCalendar
        week={week}
        selectedDay={selectedDay}
        selectedDayId={selectedDayId}
        onSelectDay={handleSelectDay}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        filterOptions={timeFilterOptions}
        activeFilter={activeTimeFilter}
        onFilterChange={handleTimeFilterChange}
      />

      <HabitCategoryGroups
        categories={categorizedHabits}
        completedCount={completedCount}
        totalCount={totalCount}
        recoveryTip={recoveryTip}
        title={copy.sectionTitle}
        listId="habitos-lista-desktop"
        onToggle={toggleHabit}
      />

      <SavedContents contents={favoriteContents} copy={copy} />

      <section className="grid grid-cols-1 items-start gap-6 pb-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <ConsistencyChart adherence={adherence} />
          <ConsistencyHeatmap heatmap={heatmap} />
        </div>
        <aside className="space-y-6 lg:col-span-4">
          <AiSuggestions
            suggestions={suggestions}
            isSuggestionAdded={isSuggestionAdded}
            onAddSuggestion={handleAddSuggestion}
          />
          <SpecialistCard
            specialist={specialist}
            logStatus={logStatus}
            onSendLog={handleSendLog}
          />
        </aside>
      </section>
    </main>
  )
}

import MobileHabitList from './MobileHabitList'
import MobileHabitsHero from './MobileHabitsHero'
import MobileRegisterFab from './MobileRegisterFab'
import MobileSavedContents from './MobileSavedContents'
import MobileSuggestionBanner from './MobileSuggestionBanner'
import MobileWeekStrip from './MobileWeekStrip'
import { useHabitosPage } from '../hooks/useHabitosPage'

export default function MobileHabitos() {
  const {
    user,
    favoriteContents,
    completedCount,
    totalCount,
    remainingCount,
    progress,
    metrics,
    copy,
    week,
    selectedDayId,
    handleSelectDay,
    timeFilterOptions,
    activeTimeFilter,
    handleTimeFilterChange,
    filteredHabits,
    toggleHabit,
    suggestions,
    isSuggestionAdded,
    handleAddSuggestion,
    handleRegisterHabit,
  } = useHabitosPage({ listId: 'habitos-lista-mobile' })

  const suggestion = suggestions[0]
  const recommendationAdded = suggestion
    ? isSuggestionAdded(suggestion.id)
    : false

  return (
    <>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 pt-20 pb-40">
        <section className="flex flex-col gap-1 pt-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-label-sm font-bold tracking-wider text-secondary uppercase">
              {copy.brand}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-primary-fixed/40 px-2 py-0.5 text-[11px] font-semibold text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              {copy.phaseLabel}
            </span>
          </div>
          <h1 className="text-headline-lg-mobile tracking-tight text-on-surface">
            {copy.title}
          </h1>
          <p className="text-body-sm font-medium text-on-surface-variant">
            {copy.mobileDateLabel}
          </p>
        </section>

        <MobileHabitsHero
          user={user}
          completedCount={completedCount}
          totalCount={totalCount}
          remainingCount={remainingCount}
          progress={progress}
          metrics={metrics}
          copy={copy}
        />

        <MobileWeekStrip
          week={week}
          selectedDayId={selectedDayId}
          onSelectDay={handleSelectDay}
        />

        <MobileHabitList
          habits={filteredHabits}
          filterOptions={timeFilterOptions}
          activeFilter={activeTimeFilter}
          onFilterChange={handleTimeFilterChange}
          onToggle={toggleHabit}
          completedCount={completedCount}
          totalCount={totalCount}
          listId="habitos-lista-mobile"
        />

        <MobileSuggestionBanner
          suggestion={suggestion}
          added={recommendationAdded}
          onAdd={() => handleAddSuggestion(suggestion)}
        />

        <MobileSavedContents contents={favoriteContents} copy={copy} />
      </main>

      <MobileRegisterFab onRegister={handleRegisterHabit} />
    </>
  )
}

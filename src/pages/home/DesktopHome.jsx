import HabitsSection from './HabitsSection'
import HomeSidebar from './HomeSidebar'
import RecommendedSection from './RecommendedSection'
import SearchSection from './SearchSection'
import WelcomeBanner from './WelcomeBanner'

export default function DesktopHome() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <WelcomeBanner />
      <SearchSection />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8">
          <div id="contenidos" className="space-y-6">
            <RecommendedSection />
          </div>
          <HabitsSection />
        </section>

        <aside className="space-y-6 lg:col-span-4">
          <HomeSidebar />
        </aside>
      </div>
    </main>
  )
}

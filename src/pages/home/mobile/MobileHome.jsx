import MobileEvidenceChallenge from './MobileEvidenceChallenge'
import MobileGreeting from './MobileGreeting'
import MobileHabits from './MobileHabits'
import MobileMetrics from './MobileMetrics'
import MobileRecommendations from './MobileRecommendations'
import MobileSearch from './MobileSearch'

export default function MobileHome() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 pt-20 pb-28">
      <MobileGreeting />
      <MobileMetrics />
      <MobileSearch />
      <MobileRecommendations />
      <MobileHabits />
      <MobileEvidenceChallenge />
    </main>
  )
}

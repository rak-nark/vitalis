import { useState } from 'react'
import { weeklyChallenge } from '../../../data/homeData'

export function useWeeklyChallenge() {
  const [registered, setRegistered] = useState(false)
  const completedDinners = registered ? 4 : 3
  const progress = registered ? 80 : weeklyChallenge.progress

  const registerDinner = () => {
    setRegistered(true)
  }

  return {
    registered,
    completedDinners,
    progress,
    registerDinner,
  }
}

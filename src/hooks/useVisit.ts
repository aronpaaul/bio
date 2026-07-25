import { useEffect, useState } from 'react'
import { registerVisit, fetchStats } from '../api/visitApi'
import type { VisitStats } from '../api/visitApi'

let started = false

export function useVisit(): VisitStats | null {
  const [stats, setStats] = useState<VisitStats | null>(null)
  useEffect(() => {
    if (!started) {
      started = true
      registerVisit()
        .then(setStats)
        .catch(() => undefined)
    }
    const timer = setInterval(() => {
      fetchStats()
        .then(setStats)
        .catch(() => undefined)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return stats
}

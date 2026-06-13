import { useEffect, useState } from 'react'
import { registerVisit } from '../api/visitApi'
import type { VisitStats } from '../api/visitApi'

let started = false

export function useVisit(): VisitStats | null {
  const [stats, setStats] = useState<VisitStats | null>(null)
  useEffect(() => {
    if (started) {
      return
    }
    started = true
    registerVisit()
      .then(setStats)
      .catch(() => undefined)
  }, [])
  return stats
}

import { useVisit } from '../hooks/useVisit'
import { Odometer } from './Odometer'

export function VisitCounter() {
  const stats = useVisit()
  return (
    <span className="visits">
      <span className="visits__label">Visitors</span>
      <span className="visits__value">
        <Odometer value={stats?.visitors ?? 0} length={6} />
      </span>
    </span>
  )
}

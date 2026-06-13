import { VisitorCounter } from './VisitorCounter'
import { WebRing } from './WebRing'
import { BadgeColumn } from './BadgeColumn'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <VisitorCounter />
      <WebRing />
      <BadgeColumn />
    </aside>
  )
}

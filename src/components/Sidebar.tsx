import { VisitorCounter } from './VisitorCounter'
import { WebRing } from './WebRing'
import { BadgeColumn } from './BadgeColumn'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <VisitorCounter count={1337} />
      <WebRing />
      <BadgeColumn />
    </aside>
  )
}

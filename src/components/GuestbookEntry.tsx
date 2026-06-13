import type { GuestEntry } from '../types/guestbook'
import { LikeButton } from './LikeButton'

interface GuestbookEntryProps {
  entry: GuestEntry
  rank: number
  onLike: (id: string) => void
}

const medals = ['🥇', '🥈', '🥉']

export function GuestbookEntry({ entry, rank, onLike }: GuestbookEntryProps) {
  return (
    <li className="guestRow">
      <span className="guestRank">{medals[rank - 1] ?? '★'}</span>
      <div className="guestBody">
        <b className="guestName">{entry.name}</b>
        <span className="guestText">{entry.message}</span>
      </div>
      <LikeButton count={entry.likes} onClick={() => onLike(entry.id)} />
    </li>
  )
}

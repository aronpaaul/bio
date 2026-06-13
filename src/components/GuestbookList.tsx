import type { GuestEntry, LoadStatus } from '../types/guestbook'
import { GuestbookEntry } from './GuestbookEntry'
import { useTranslation } from '../i18n/useTranslation'

interface GuestbookListProps {
  entries: GuestEntry[]
  status: LoadStatus
  onLike: (id: string) => void
}

export function GuestbookList({ entries, status, onLike }: GuestbookListProps) {
  const { t } = useTranslation()
  if (status === 'loading') {
    return <p className="guestNote">{t.guestLoading}</p>
  }
  if (status === 'error') {
    return <p className="guestNote">{t.guestError}</p>
  }
  if (entries.length === 0) {
    return <p className="guestNote">{t.guestEmpty}</p>
  }
  return (
    <ol className="guestList">
      {entries.map((entry, index) => (
        <GuestbookEntry key={entry.id} entry={entry} rank={index + 1} onLike={onLike} />
      ))}
    </ol>
  )
}

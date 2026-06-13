import { SectionBox } from './SectionBox'
import { GuestbookList } from './GuestbookList'
import { GuestbookForm } from './GuestbookForm'
import { useGuestbook } from '../hooks/useGuestbook'
import { useTranslation } from '../i18n/useTranslation'

export function GuestbookSection() {
  const { entries, status, like, submit } = useGuestbook()
  const { t } = useTranslation()
  return (
    <SectionBox id="guestbook" title={t.guestbookTitle}>
      <p className="guestIntro">{t.guestbookIntro}</p>
      <GuestbookList entries={entries} status={status} onLike={like} />
      <GuestbookForm onSubmit={submit} />
    </SectionBox>
  )
}

import { SectionBox } from './SectionBox'
import { GuestbookList } from './GuestbookList'
import { GuestbookForm } from './GuestbookForm'
import { RetroNotice } from './RetroNotice'
import { useGuestbook } from '../hooks/useGuestbook'
import { useTranslation } from '../i18n/useTranslation'

export function GuestbookSection() {
  const { entries, status, notice, like, submit, dismissNotice } = useGuestbook()
  const { t } = useTranslation()
  return (
    <SectionBox id="guestbook" title={t.guestbookTitle}>
      <p className="guestIntro">{t.guestbookIntro}</p>
      <RetroNotice notice={notice} onClose={dismissNotice} />
      <GuestbookList entries={entries} status={status} onLike={like} />
      <GuestbookForm onSubmit={submit} />
    </SectionBox>
  )
}

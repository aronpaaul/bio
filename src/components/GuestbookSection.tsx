import { SectionBox } from './SectionBox'
import { GuestbookList } from './GuestbookList'
import { GuestbookPager } from './GuestbookPager'
import { GuestbookForm } from './GuestbookForm'
import { RetroNotice } from './RetroNotice'
import { useGuestbook } from '../hooks/useGuestbook'
import { useTranslation } from '../i18n/useTranslation'

export function GuestbookSection() {
  const { entries, page, pages, perPage, status, notice, like, submit, goTo, dismissNotice } = useGuestbook()
  const { t } = useTranslation()
  return (
    <SectionBox id="guestbook" title={t.guestbookTitle}>
      <p className="guestIntro">{t.guestbookIntro}</p>
      <RetroNotice notice={notice} onClose={dismissNotice} />
      <GuestbookList entries={entries} status={status} startRank={(page - 1) * perPage} onLike={like} />
      <GuestbookPager page={page} pages={pages} onGo={goTo} />
      <GuestbookForm onSubmit={submit} />
    </SectionBox>
  )
}

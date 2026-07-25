import { useTranslation } from '../i18n/useTranslation'

interface GuestbookPagerProps {
  page: number
  pages: number
  onGo: (target: number) => void
}

export function GuestbookPager({ page, pages, onGo }: GuestbookPagerProps) {
  const { t } = useTranslation()
  if (pages <= 1) {
    return null
  }
  return (
    <div className="guestPager">
      <button className="pagerButton" disabled={page <= 1} onClick={() => onGo(page - 1)}>
        {t.pagePrev}
      </button>
      <span className="pagerStatus">{t.pageStatus(page, pages)}</span>
      <button className="pagerButton" disabled={page >= pages} onClick={() => onGo(page + 1)}>
        {t.pageNext}
      </button>
    </div>
  )
}

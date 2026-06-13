import type { Notice, NoticeKind } from '../types/guestbook'

const icons: Record<NoticeKind, string> = { ok: '✓', warn: '!', error: '✕' }

interface RetroNoticeProps {
  notice: Notice | null
  onClose: () => void
}

export function RetroNotice({ notice, onClose }: RetroNoticeProps) {
  if (!notice) {
    return null
  }
  return (
    <div className={`retroNotice retroNotice-${notice.kind}`}>
      <span className="retroNoticeIcon">{icons[notice.kind]}</span>
      <span className="retroNoticeText">{notice.text}</span>
      <button type="button" className="retroNoticeClose" onClick={onClose} aria-label="OK">
        ✕
      </button>
    </div>
  )
}

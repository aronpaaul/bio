import { useEffect, useState } from 'react'
import type { GuestEntry, LoadStatus, Notice } from '../types/guestbook'
import { fetchTop, postEntry, likeEntry } from '../api/guestbookApi'
import { useTranslation } from '../i18n/useTranslation'

function sortByLikes(list: GuestEntry[]): GuestEntry[] {
  return [...list].sort((a, b) => b.likes - a.likes)
}

export function useGuestbook() {
  const { t } = useTranslation()
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [notice, setNotice] = useState<Notice | null>(null)

  const refresh = () => {
    fetchTop()
      .then((list) => {
        setEntries(list)
        setStatus('ready')
      })
      .catch(() => setStatus((prev) => (prev === 'ready' ? prev : 'error')))
  }

  useEffect(() => {
    refresh()
    const timer = setInterval(refresh, 1000)
    return () => clearInterval(timer)
  }, [])

  const like = async (id: string) => {
    try {
      const result = await likeEntry(id)
      setEntries((prev) => sortByLikes(prev.map((item) => (item.id === id ? { ...item, likes: result.likes } : item))))
      setNotice(result.liked ? { text: t.likeOk, kind: 'ok' } : { text: t.likeAlready, kind: 'warn' })
    } catch {
      setNotice({ text: t.likeFailed, kind: 'error' })
    }
  }

  const submit = async (name: string, message: string): Promise<boolean> => {
    if (!name.trim() || !message.trim()) {
      setNotice({ text: t.formFillBoth, kind: 'warn' })
      return false
    }
    const result = await postEntry(name.trim(), message.trim())
    if (result.ok) {
      setNotice({ text: t.formAccepted, kind: 'ok' })
      refresh()
      return true
    }
    const reasons = { already: t.formAlready, tooFast: t.formTooFast, failed: t.formFailed }
    setNotice({ text: reasons[result.reason], kind: result.reason === 'failed' ? 'error' : 'warn' })
    return false
  }

  return { entries, status, notice, like, submit, dismissNotice: () => setNotice(null) }
}

import { useEffect, useState } from 'react'
import type { GuestEntry, LoadStatus, Notice } from '../types/guestbook'
import { fetchPage, postEntry, likeEntry } from '../api/guestbookApi'
import { useTranslation } from '../i18n/useTranslation'

export function useGuestbook() {
  const { t } = useTranslation()
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [notice, setNotice] = useState<Notice | null>(null)

  const pages = Math.max(1, Math.ceil(total / perPage))

  const load = (target: number) => {
    fetchPage(target)
      .then((data) => {
        setEntries(data.entries)
        setTotal(data.total)
        setPerPage(data.perPage)
        setStatus('ready')
      })
      .catch(() => setStatus((prev) => (prev === 'ready' ? prev : 'error')))
  }

  useEffect(() => {
    load(page)
    const timer = setInterval(() => load(page), 1000)
    return () => clearInterval(timer)
  }, [page])

  const goTo = (target: number) => setPage(Math.min(Math.max(1, target), pages))

  const like = async (id: string) => {
    try {
      const result = await likeEntry(id)
      setEntries((prev) => prev.map((item) => (item.id === id ? { ...item, likes: result.likes } : item)))
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
      setPage(1)
      load(1)
      return true
    }
    const reasons = { already: t.formAlready, tooFast: t.formTooFast, failed: t.formFailed }
    setNotice({ text: reasons[result.reason], kind: result.reason === 'failed' ? 'error' : 'warn' })
    return false
  }

  return { entries, page, pages, perPage, status, notice, like, submit, goTo, dismissNotice: () => setNotice(null) }
}

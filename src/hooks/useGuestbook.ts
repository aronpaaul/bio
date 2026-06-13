import { useEffect, useState } from 'react'
import type { GuestEntry, LoadStatus } from '../types/guestbook'
import { fetchTop, postEntry, likeEntry } from '../api/guestbookApi'

function sortByLikes(list: GuestEntry[]): GuestEntry[] {
  return [...list].sort((a, b) => b.likes - a.likes)
}

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [status, setStatus] = useState<LoadStatus>('loading')

  const refresh = () => {
    fetchTop()
      .then((list) => {
        setEntries(list)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(refresh, [])

  const like = async (id: string) => {
    try {
      const likes = await likeEntry(id)
      setEntries((prev) => sortByLikes(prev.map((item) => (item.id === id ? { ...item, likes } : item))))
    } catch {
      setStatus('ready')
    }
  }

  const submit = async (name: string, message: string) => {
    await postEntry(name, message)
    refresh()
  }

  return { entries, status, like, submit }
}

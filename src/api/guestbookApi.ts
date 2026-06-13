import type { GuestEntry } from '../types/guestbook'

const base = '/api/guestbook'

export async function fetchTop(): Promise<GuestEntry[]> {
  const res = await fetch(base + '/top')
  if (!res.ok) {
    throw new Error('Не удалось загрузить гостевую книгу')
  }
  const data = await res.json()
  return data.entries as GuestEntry[]
}

export async function postEntry(name: string, message: string): Promise<GuestEntry> {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message, website: '' }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? 'Запись не принята')
  }
  return data.entry as GuestEntry
}

export async function likeEntry(id: string): Promise<number> {
  const res = await fetch(base + '/' + id + '/like', { method: 'POST' })
  if (!res.ok) {
    throw new Error('Лайк не засчитан')
  }
  const data = await res.json()
  return data.likes as number
}

import type { GuestEntry } from '../types/guestbook'

const base = '/api/guestbook'

export type PostResult =
  | { ok: true; entry: GuestEntry }
  | { ok: false; reason: 'already' | 'tooFast' | 'failed' }

export interface LikeResult {
  liked: boolean
  likes: number
}

export interface GuestPage {
  entries: GuestEntry[]
  total: number
  page: number
  perPage: number
}

export async function fetchPage(page: number): Promise<GuestPage> {
  const res = await fetch(base + '?page=' + page)
  if (!res.ok) {
    throw new Error('Не удалось загрузить гостевую книгу')
  }
  return res.json() as Promise<GuestPage>
}

export async function postEntry(name: string, message: string): Promise<PostResult> {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message, website: '' }),
  })
  if (res.ok) {
    const data = await res.json()
    return { ok: true, entry: data.entry as GuestEntry }
  }
  if (res.status === 409) {
    return { ok: false, reason: 'already' }
  }
  if (res.status === 429) {
    return { ok: false, reason: 'tooFast' }
  }
  return { ok: false, reason: 'failed' }
}

export async function likeEntry(id: string): Promise<LikeResult> {
  const res = await fetch(base + '/' + id + '/like', { method: 'POST' })
  if (!res.ok) {
    throw new Error('Лайк не засчитан')
  }
  const data = await res.json()
  return { liked: data.liked as boolean, likes: data.likes as number }
}

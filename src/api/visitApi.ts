import { toHex, fromHex } from './hex'

export interface VisitStats {
  visitors: number
  lastVisit: number | null
}

const base = '/api/visit'

export async function fetchStats(): Promise<VisitStats> {
  const res = await fetch(base)
  if (!res.ok) {
    throw new Error('stats unavailable')
  }
  return res.json()
}

export async function registerVisit(): Promise<VisitStats> {
  const challenge = await (await fetch(base + '/challenge')).json()
  const key = await crypto.subtle.importKey('raw', fromHex(challenge.key), 'AES-GCM', false, ['encrypt'])
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const body = JSON.stringify({ challengeId: challenge.challengeId, t: Date.now() })
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(body))
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      challengeId: challenge.challengeId,
      iv: toHex(iv),
      data: toHex(new Uint8Array(cipher)),
    }),
  })
  if (!res.ok) {
    throw new Error('visit rejected')
  }
  return res.json()
}

import { toHex, fromHex } from './hex'

export interface Proof {
  challengeId: string
  iv: string
  data: string
}

export async function solve(challengeUrl: string, payload: Record<string, unknown>): Promise<Proof> {
  const ch = await (await fetch(challengeUrl)).json()
  const key = await crypto.subtle.importKey('raw', fromHex(ch.key), 'AES-GCM', false, ['encrypt'])
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const body = JSON.stringify({ ...payload, challengeId: ch.challengeId })
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(body))
  return { challengeId: ch.challengeId, iv: toHex(iv), data: toHex(new Uint8Array(cipher)) }
}

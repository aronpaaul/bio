import { consumeChallenge } from '../visit/challengeStore'
import { decryptPayload } from '../visit/decrypt'
import { proofSchema } from '../validation/proofSchema'

type Opened = { ok: true; data: Record<string, unknown> } | { ok: false; reason: string }

export function openProof(body: unknown): Opened {
  const parsed = proofSchema.safeParse(body)
  if (!parsed.success) {
    return { ok: false, reason: 'badProof' }
  }
  const key = consumeChallenge(parsed.data.challengeId)
  if (!key) {
    return { ok: false, reason: 'challenge' }
  }
  let data: Record<string, unknown>
  try {
    data = JSON.parse(decryptPayload(key, parsed.data.iv, parsed.data.data))
  } catch {
    return { ok: false, reason: 'decrypt' }
  }
  if (data?.challengeId !== parsed.data.challengeId) {
    return { ok: false, reason: 'forge' }
  }
  return { ok: true, data }
}

import { randomBytes, randomUUID } from 'node:crypto'
import { challengeTtl } from '../config'

interface Challenge {
  key: Buffer
  createdAt: number
}

const challenges = new Map<string, Challenge>()

export function createChallenge(): { challengeId: string; key: string } {
  const now = Date.now()
  for (const [id, challenge] of challenges) {
    if (now - challenge.createdAt > challengeTtl) {
      challenges.delete(id)
    }
  }
  const challengeId = randomUUID()
  const key = randomBytes(32)
  challenges.set(challengeId, { key, createdAt: now })
  return { challengeId, key: key.toString('hex') }
}

export function consumeChallenge(challengeId: string): Buffer | null {
  const challenge = challenges.get(challengeId)
  if (!challenge) {
    return null
  }
  challenges.delete(challengeId)
  return Date.now() - challenge.createdAt > challengeTtl ? null : challenge.key
}

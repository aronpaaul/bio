import express from 'express'
import { createChallenge, consumeChallenge } from '../visit/challengeStore'
import { decryptPayload } from '../visit/decrypt'
import { registerVisit, readStats } from '../visit/visitStore'
import { clientIdFromIp } from '../security/clientId'
import { writeLimiter } from '../security/rateLimiters'
import { visitSchema } from '../validation/visitSchema'

export const visitRoutes = express.Router()

visitRoutes.get('/', (_req, res) => {
  res.json(readStats())
})

visitRoutes.get('/challenge', (_req, res) => {
  res.json(createChallenge())
})

visitRoutes.post('/', writeLimiter, (req, res) => {
  const parsed = visitSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Кривой запрос захода.' })
    return
  }
  const key = consumeChallenge(parsed.data.challengeId)
  if (!key) {
    res.status(403).json({ error: 'Челлендж недействителен или просрочен.' })
    return
  }
  try {
    const payload = JSON.parse(decryptPayload(key, parsed.data.iv, parsed.data.data))
    if (payload.challengeId !== parsed.data.challengeId) {
      res.status(403).json({ error: 'Подделка пресечена.' })
      return
    }
  } catch {
    res.status(400).json({ error: 'Расшифровка не удалась.' })
    return
  }
  res.json(registerVisit(clientIdFromIp(req.ip ?? 'unknown')))
})

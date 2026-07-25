import express from 'express'
import { createEntrySchema } from '../validation/guestbookSchema'
import { cleanText } from '../security/sanitize'
import { clientIdFromIp } from '../security/clientId'
import { clientMeta, badOrigin, botAgent } from '../security/clientMeta'
import { openProof } from '../security/proof'
import { spamReason } from '../security/spamFilter'
import { charsetBad } from '../security/charsetGuard'
import { writeLimiter } from '../security/rateLimiters'
import { createChallenge } from '../visit/challengeStore'
import { pageEntries, addEntry, likeEntry } from '../store/guestbookStore'
import { logEvent } from '../log/logger'
import { perPage } from '../config'

export const guestbookRoutes = express.Router()

guestbookRoutes.get('/', (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1)
  const { entries, total } = pageEntries(page, perPage)
  res.json({ entries, total, page, perPage })
})

guestbookRoutes.get('/challenge', (_req, res) => {
  res.json(createChallenge())
})

guestbookRoutes.post('/', writeLimiter, (req, res) => {
  const meta = clientMeta(req)
  const reject = (code: number, reason: string, extra: Record<string, unknown> = {}) => {
    logEvent('postReject', { ...meta, reason, ...extra })
    res.status(code).json({ error: 'Запись отклонена стражем гостевой.' })
  }
  if (badOrigin(meta)) return reject(403, 'origin')
  if (botAgent(meta)) return reject(403, 'ua')
  const opened = openProof(req.body)
  if (!opened.ok) return reject(403, opened.reason)
  const fields = createEntrySchema.safeParse({ name: opened.data.name, message: opened.data.message, website: opened.data.website })
  if (!fields.success) return reject(400, 'invalid')
  if (charsetBad(fields.data.name) || charsetBad(fields.data.message)) return reject(400, 'charset')
  const name = cleanText(fields.data.name)
  const message = cleanText(fields.data.message)
  if (!name || !message) return reject(400, 'empty')
  const spam = spamReason(name, message)
  if (spam) return reject(400, 'spam:' + spam, { name, message })
  const entry = addEntry(clientIdFromIp(meta.ip), name, message)
  if (!entry) return reject(409, 'dup')
  logEvent('postOk', { ...meta, id: entry.id, name, message })
  res.status(201).json({ entry })
})

guestbookRoutes.post('/:id/like', writeLimiter, (req, res) => {
  const meta = clientMeta(req)
  const reject = (code: number, reason: string) => {
    logEvent('likeReject', { ...meta, id: req.params.id, reason })
    res.status(code).json({ error: 'Лайк отклонён.' })
  }
  if (badOrigin(meta)) return reject(403, 'origin')
  if (botAgent(meta)) return reject(403, 'ua')
  const opened = openProof(req.body)
  if (!opened.ok) return reject(403, opened.reason)
  if (opened.data.entryId !== req.params.id) return reject(403, 'mismatch')
  const result = likeEntry(req.params.id, clientIdFromIp(meta.ip))
  if (!result) return reject(404, 'noEntry')
  logEvent('likeOk', { ...meta, id: req.params.id, liked: result.liked })
  res.json(result)
})

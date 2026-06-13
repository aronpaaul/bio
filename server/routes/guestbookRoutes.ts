import express from 'express'
import { createEntrySchema } from '../validation/guestbookSchema'
import { cleanText } from '../security/sanitize'
import { clientIdFromIp } from '../security/clientId'
import { writeLimiter } from '../security/rateLimiters'
import { topEntries, addEntry, likeEntry } from '../store/guestbookStore'
import { topCount } from '../config'

export const guestbookRoutes = express.Router()

guestbookRoutes.get('/top', (_req, res) => {
  res.json({ entries: topEntries(topCount) })
})

guestbookRoutes.post('/', writeLimiter, (req, res) => {
  const parsed = createEntrySchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Анкета заполнена неправильно. Канцелярия отказывает.' })
    return
  }
  const name = cleanText(parsed.data.name)
  const message = cleanText(parsed.data.message)
  if (!name || !message) {
    res.status(400).json({ error: 'Пустые поля к рассмотрению не принимаются.' })
    return
  }
  res.status(201).json({ entry: addEntry(name, message) })
})

guestbookRoutes.post('/:id/like', writeLimiter, (req, res) => {
  const result = likeEntry(req.params.id, clientIdFromIp(req.ip ?? 'unknown'))
  if (!result) {
    res.status(404).json({ error: 'Такой записи нет в реестре.' })
    return
  }
  res.json(result)
})

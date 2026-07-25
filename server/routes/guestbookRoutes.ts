import express from 'express'
import { createEntrySchema } from '../validation/guestbookSchema'
import { cleanText } from '../security/sanitize'
import { clientIdFromIp } from '../security/clientId'
import { writeLimiter } from '../security/rateLimiters'
import { pageEntries, addEntry, likeEntry } from '../store/guestbookStore'
import { perPage } from '../config'

export const guestbookRoutes = express.Router()

guestbookRoutes.get('/', (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1)
  const { entries, total } = pageEntries(page, perPage)
  res.json({ entries, total, page, perPage })
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
  const entry = addEntry(clientIdFromIp(req.ip ?? 'unknown'), name, message)
  if (!entry) {
    res.status(409).json({ error: 'С одного адреса принимается только одна запись.' })
    return
  }
  res.status(201).json({ entry })
})

guestbookRoutes.post('/:id/like', writeLimiter, (req, res) => {
  const result = likeEntry(req.params.id, clientIdFromIp(req.ip ?? 'unknown'))
  if (!result) {
    res.status(404).json({ error: 'Такой записи нет в реестре.' })
    return
  }
  res.json(result)
})

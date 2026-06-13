import express from 'express'
import helmet from 'helmet'
import { cors } from './security/cors'
import { errorHandler } from './security/errorHandler'
import { apiLimiter } from './security/rateLimiters'
import { guestbookRoutes } from './routes/guestbookRoutes'
import { visitRoutes } from './routes/visitRoutes'
import { bodyLimit } from './config'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors)
  app.use(express.json({ limit: bodyLimit }))
  app.use('/api', apiLimiter)
  app.use('/api/guestbook', guestbookRoutes)
  app.use('/api/visit', visitRoutes)
  app.use(errorHandler)
  return app
}

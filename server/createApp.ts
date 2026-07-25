import express from 'express'
import helmet from 'helmet'
import { join } from 'node:path'
import { cors } from './security/cors'
import { errorHandler } from './security/errorHandler'
import { apiLimiter } from './security/rateLimiters'
import { guestbookRoutes } from './routes/guestbookRoutes'
import { visitRoutes } from './routes/visitRoutes'
import { bodyLimit, distDir } from './config'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    },
  }))
  app.use(cors)
  app.use(express.json({ limit: bodyLimit }))
  app.use('/api', apiLimiter)
  app.use('/api/guestbook', guestbookRoutes)
  app.use('/api/visit', visitRoutes)
  app.use(express.static(distDir))
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(join(distDir, 'index.html'))
  })
  app.use(errorHandler)
  return app
}

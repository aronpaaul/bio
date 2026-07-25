import rateLimit from 'express-rate-limit'

export const apiLimiter = rateLimit({
  windowMs: 60000,
  limit: Number(process.env.API_LIMIT) || 600,
  standardHeaders: true,
  legacyHeaders: false,
})

export const writeLimiter = rateLimit({
  windowMs: 60000,
  limit: Number(process.env.WRITE_LIMIT) || 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Не части — дай серверу на 56k вздохнуть.' },
})

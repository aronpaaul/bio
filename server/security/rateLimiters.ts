import rateLimit from 'express-rate-limit'

export const apiLimiter = rateLimit({
  windowMs: 60000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
})

export const writeLimiter = rateLimit({
  windowMs: 60000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Не части — дай серверу на 56k вздохнуть.' },
})

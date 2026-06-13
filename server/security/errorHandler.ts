import type { Request, Response, NextFunction } from 'express'

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = (err as { status?: number }).status ?? 400
  res.status(status).json({ error: 'Запрос отклонён службой безопасности сайта.' })
}

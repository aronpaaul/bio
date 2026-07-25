import type { Request } from 'express'
import { allowedOrigins, botAgents } from '../config'

export interface ClientMeta {
  ip: string
  ua: string
  origin: string
}

export function clientMeta(req: Request): ClientMeta {
  return {
    ip: req.ip ?? 'unknown',
    ua: String(req.headers['user-agent'] ?? ''),
    origin: String(req.headers.origin ?? ''),
  }
}

export function badOrigin(meta: ClientMeta): boolean {
  return !allowedOrigins.includes(meta.origin)
}

export function botAgent(meta: ClientMeta): boolean {
  return meta.ua === '' || botAgents.test(meta.ua)
}

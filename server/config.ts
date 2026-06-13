import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))

export const host = '127.0.0.1'
export const port = 3001
export const dataFile = join(here, 'data', 'guestbook.json')
export const visitFile = join(here, 'data', 'visits.json')
export const challengeTtl = 30000
export const visitWindow = 21600000
export const maxNameLength = 32
export const maxMessageLength = 280
export const topCount = 3
export const bodyLimit = '8kb'
export const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']
export const likeSecret = process.env.GUESTBOOK_SECRET ?? 'dev-secret-paul-1999'

import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { logFile } from '../config'

export function logEvent(kind: string, data: Record<string, unknown>): void {
  const line = JSON.stringify({ ts: new Date().toISOString(), kind, ...data })
  process.stdout.write(line + '\n')
  try {
    mkdirSync(dirname(logFile), { recursive: true })
    appendFileSync(logFile, line + '\n')
  } catch {
    process.stdout.write('log write failed\n')
  }
}

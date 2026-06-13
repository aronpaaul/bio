import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) {
    return fallback
  }
  const raw = readFileSync(path, 'utf8')
  return raw.trim() ? (JSON.parse(raw) as T) : fallback
}

export function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  const temp = path + '.tmp'
  writeFileSync(temp, JSON.stringify(value, null, 2), 'utf8')
  renameSync(temp, path)
}

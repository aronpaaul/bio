import { randomUUID } from 'node:crypto'
import { dataFile } from '../config'
import { readJson, writeJson } from './jsonFile'
import { seedEntries } from './seed'
import type { Entry, GuestbookDb } from '../types'

let db = load()

function load(): GuestbookDb {
  const data = readJson<Partial<GuestbookDb> | null>(dataFile, null)
  if (data && Array.isArray(data.entries)) {
    return { entries: data.entries, likes: data.likes ?? [], posters: data.posters ?? [] }
  }
  const seeded: GuestbookDb = { entries: seedEntries(), likes: [], posters: [] }
  writeJson(dataFile, seeded)
  return seeded
}

export function topEntries(count: number): Entry[] {
  return [...db.entries]
    .sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt)
    .slice(0, count)
}

export function addEntry(clientId: string, name: string, message: string): Entry | null {
  if (db.posters.includes(clientId)) {
    return null
  }
  const entry: Entry = { id: randomUUID(), name, message, likes: 0, createdAt: Date.now() }
  db.entries.push(entry)
  db.posters.push(clientId)
  writeJson(dataFile, db)
  return entry
}

export function likeEntry(id: string, clientId: string): { liked: boolean; likes: number } | null {
  const entry = db.entries.find((item) => item.id === id)
  if (!entry) {
    return null
  }
  if (db.likes.some((like) => like.entryId === id && like.clientId === clientId)) {
    return { liked: false, likes: entry.likes }
  }
  entry.likes += 1
  db.likes.push({ entryId: id, clientId })
  writeJson(dataFile, db)
  return { liked: true, likes: entry.likes }
}

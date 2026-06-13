import { visitFile, visitWindow } from '../config'
import { readJson, writeJson } from '../store/jsonFile'

interface VisitDb {
  total: number
  lastVisit: number | null
  seen: Record<string, number>
}

let db = load()

function load(): VisitDb {
  const data = readJson<VisitDb | null>(visitFile, null)
  if (data && typeof data.total === 'number') {
    return data
  }
  const fresh: VisitDb = { total: 0, lastVisit: null, seen: {} }
  writeJson(visitFile, fresh)
  return fresh
}

export function registerVisit(clientId: string): { visitors: number; lastVisit: number | null } {
  const now = Date.now()
  const previous = db.lastVisit
  const last = db.seen[clientId]
  if (last === undefined || now - last > visitWindow) {
    db.total += 1
  }
  db.seen[clientId] = now
  db.lastVisit = now
  writeJson(visitFile, db)
  return { visitors: db.total, lastVisit: previous }
}

export function readStats(): { visitors: number; lastVisit: number | null } {
  return { visitors: db.total, lastVisit: db.lastVisit }
}

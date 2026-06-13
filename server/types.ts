export interface Entry {
  id: string
  name: string
  message: string
  likes: number
  createdAt: number
}

export interface LikeRecord {
  entryId: string
  clientId: string
}

export interface GuestbookDb {
  entries: Entry[]
  likes: LikeRecord[]
  posters: string[]
}

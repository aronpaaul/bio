export interface GuestEntry {
  id: string
  name: string
  message: string
  likes: number
  createdAt: number
}

export type LoadStatus = 'loading' | 'ready' | 'error'

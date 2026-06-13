export interface GuestEntry {
  id: string
  name: string
  message: string
  likes: number
  createdAt: number
}

export type LoadStatus = 'loading' | 'ready' | 'error'

export type NoticeKind = 'ok' | 'warn' | 'error'

export interface Notice {
  text: string
  kind: NoticeKind
}

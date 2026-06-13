import type { Dictionary } from '../i18n/dictionary'

export interface NavItem {
  key: keyof Dictionary['nav']
  href: string
}

export const navItems: NavItem[] = [
  { key: 'home', href: '#top' },
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'guestbook', href: '#guestbook' },
]

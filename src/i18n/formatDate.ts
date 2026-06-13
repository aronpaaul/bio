import type { Language } from './language'

const locales: Record<Language, string> = { ru: 'ru-RU', en: 'en-GB', sv: 'sv-SE' }

export function formatDateTime(timestamp: number, language: Language): string {
  return new Date(timestamp).toLocaleString(locales[language], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

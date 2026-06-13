import type { Language } from './language'
import type { Dictionary } from './dictionary'
import { ru } from './translations/ru'
import { en } from './translations/en'
import { sv } from './translations/sv'

export const dictionaries: Record<Language, Dictionary> = { ru, en, sv }

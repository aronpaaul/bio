import { createContext } from 'react'
import type { Language } from './language'
import type { Dictionary } from './dictionary'

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

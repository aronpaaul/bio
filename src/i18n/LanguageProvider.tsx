import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { LanguageContext } from './LanguageContext'
import { dictionaries } from './dictionaries'
import { languages } from './language'
import type { Language } from './language'

const storageKey = 'paulLang'

function initialLanguage(): Language {
  const saved = localStorage.getItem(storageKey)
  return saved && languages.includes(saved as Language) ? (saved as Language) : 'ru'
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (next: Language) => {
    localStorage.setItem(storageKey, next)
    setLanguageState(next)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

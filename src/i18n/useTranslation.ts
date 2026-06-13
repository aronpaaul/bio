import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

export function useTranslation() {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useTranslation требует обёртки LanguageProvider')
  }
  return value
}

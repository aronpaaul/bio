import { useTranslation } from '../i18n/useTranslation'
import { languages, languageNames } from '../i18n/language'

export function LanguagePicker() {
  const { language, setLanguage } = useTranslation()
  return (
    <div className="langPicker">
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          className={code === language ? 'langButton langActive' : 'langButton'}
          onClick={() => setLanguage(code)}
        >
          {languageNames[code]}
        </button>
      ))}
    </div>
  )
}

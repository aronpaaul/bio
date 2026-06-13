import { useTranslation } from '../i18n/useTranslation'

export function UnderConstruction() {
  const { t } = useTranslation()
  return (
    <div className="construction">
      <div className="constructionStripe" />
      <p className="constructionText">{t.construction}</p>
      <div className="constructionStripe" />
    </div>
  )
}

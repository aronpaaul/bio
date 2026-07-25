import { useTranslation } from '../i18n/useTranslation'

export function PageFooter() {
  const { t } = useTranslation()
  return (
    <footer className="pageFooter">
      <p>
        <a className="emailLink" href="https://t.me/drick" target="_blank" rel="noreferrer">{t.emailLink}</a>
      </p>
      <p className="lastUpdated">{t.lastUpdated}</p>
      <p className="copyright">{t.copyright}</p>
    </footer>
  )
}

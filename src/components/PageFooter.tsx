import { useTranslation } from '../i18n/useTranslation'

export function PageFooter() {
  const { t } = useTranslation()
  return (
    <footer className="pageFooter">
      <p>
        <a className="emailLink" href="mailto:paul@example.com">{t.emailLink}</a>
      </p>
      <p className="lastUpdated">{t.lastUpdated}</p>
      <p className="copyright">{t.copyright}</p>
    </footer>
  )
}

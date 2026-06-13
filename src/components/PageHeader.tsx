import { RainbowText } from './RainbowText'
import { Blink } from './Blink'
import { useTranslation } from '../i18n/useTranslation'

export function PageHeader() {
  const { t } = useTranslation()
  return (
    <header className="pageHeader">
      <h1 className="siteTitle">
        <RainbowText text={t.siteTitle} />
      </h1>
      <p className="siteTagline">{t.tagline}</p>
      <p className="enterLine">
        <Blink>{t.enterLine}</Blink>
      </p>
    </header>
  )
}

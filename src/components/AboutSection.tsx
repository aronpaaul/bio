import { SectionBox } from './SectionBox'
import { useTranslation } from '../i18n/useTranslation'

export function AboutSection() {
  const { t } = useTranslation()
  return (
    <SectionBox id="about" title={t.aboutTitle}>
      <p>{t.aboutIntro}</p>
      <ul className="retroList">
        {t.aboutPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </SectionBox>
  )
}

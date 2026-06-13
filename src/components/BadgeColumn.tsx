import { Badge } from './Badge'
import { useTranslation } from '../i18n/useTranslation'

export function BadgeColumn() {
  const { t } = useTranslation()
  return (
    <div className="badgeColumn">
      {t.badges.map((text) => (
        <Badge key={text} text={text} />
      ))}
    </div>
  )
}

import { useTranslation } from '../i18n/useTranslation'
import { useVisit } from '../hooks/useVisit'
import { formatDateTime } from '../i18n/formatDate'

export function VisitorCounter() {
  const { t, language } = useTranslation()
  const stats = useVisit()
  const digits = String(stats?.visitors ?? 0).padStart(6, '0')
  return (
    <div className="counterBox">
      <div className="counterLabel">{t.counterLabel}</div>
      <div className="counterDigits">
        {Array.from(digits).map((digit, index) => (
          <span key={index} className="counterDigit">
            {digit}
          </span>
        ))}
      </div>
      <div className="counterLast">
        {t.lastVisitLabel} {stats?.lastVisit ? formatDateTime(stats.lastVisit, language) : t.firstVisitor}
      </div>
      <div className="counterSince">{t.counterSince}</div>
    </div>
  )
}

import { useTranslation } from '../i18n/useTranslation'

interface VisitorCounterProps {
  count: number
}

export function VisitorCounter({ count }: VisitorCounterProps) {
  const { t } = useTranslation()
  const digits = String(count).padStart(6, '0')
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
      <div className="counterSince">{t.counterSince}</div>
    </div>
  )
}

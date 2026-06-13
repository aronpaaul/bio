import { useWebRing } from '../hooks/useWebRing'
import { RingButton } from './RingButton'
import { useTranslation } from '../i18n/useTranslation'

export function WebRing() {
  const ring = useWebRing()
  const { t } = useTranslation()
  return (
    <div className="webRing">
      <div className="webRingTitle">{t.webRingTitle}</div>
      <div className="ringNav">
        <RingButton label={t.ringPrev} onClick={ring.openPrev} />
        <RingButton label={t.ringRandom} onClick={ring.openRandom} />
        <RingButton label={t.ringNext} onClick={ring.openNext} />
      </div>
      <div className="ringStatus">{t.ringStatus(ring.position, ring.total, ring.current.name)}</div>
    </div>
  )
}

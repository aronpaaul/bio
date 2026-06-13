import { useState } from 'react'
import { ringMembers } from '../data/ringMembers'

export function useWebRing() {
  const total = ringMembers.length
  const [index, setIndex] = useState(0)

  const open = (target: number) => {
    const safe = ((target % total) + total) % total
    setIndex(safe)
    window.open(ringMembers[safe].url, '_blank', 'noopener,noreferrer')
  }

  return {
    current: ringMembers[index],
    position: index + 1,
    total,
    openPrev: () => open(index - 1),
    openNext: () => open(index + 1),
    openRandom: () => open(Math.floor(Math.random() * total)),
  }
}

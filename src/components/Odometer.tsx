import { useEffect, useState } from 'react'

function Reel({ digit, delay }: { digit: number; delay: number }) {
  return (
    <span className="odoReel">
      <span
        className="odoStrip"
        style={{ transform: `translateY(${-digit}em)`, transitionDelay: `${delay}ms` }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span className="odoDigit" key={n}>
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}

export function Odometer({ value, length = 6 }: { value: number; length?: number }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(value))
    return () => cancelAnimationFrame(id)
  }, [value])

  const text = String(Math.max(0, Math.floor(shown))).padStart(length, '0')

  return (
    <span className="odo" aria-label={String(value)}>
      {text.split('').map((char, index) => (
        <Reel key={index} digit={Number(char)} delay={index * 60} />
      ))}
    </span>
  )
}

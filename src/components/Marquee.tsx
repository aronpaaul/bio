import type { MarqueeItem } from '../data/marquee'

interface MarqueeProps {
  items: MarqueeItem[]
  name: string
  duration: number
  gapClass: string
  colorClass: string
}

export function Marquee({ items, name, duration, gapClass, colorClass }: MarqueeProps) {
  const css = `@keyframes ${name}{from{transform:translateX(0)}to{transform:translateX(-50%)}}` +
    `.${name}{display:flex;width:max-content;animation:${name} ${duration}s linear infinite}`
  const loop = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <style>{css}</style>
      <div className={name}>
        {loop.map((item, i) => (
          <span
            key={i}
            className={`${gapClass} shrink-0 ${colorClass} whitespace-nowrap`}
            style={item.style}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

interface MarqueeProps {
  text: string
}

export function Marquee({ text }: MarqueeProps) {
  return (
    <div className="marquee">
      <span className="marqueeInner">{text}</span>
    </div>
  )
}

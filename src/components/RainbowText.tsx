interface RainbowTextProps {
  text: string
}

const palette = ['#ff0000', '#ff7f00', '#e6c200', '#009000', '#0000ff', '#8b00ff']

export function RainbowText({ text }: RainbowTextProps) {
  return (
    <span className="rainbowText">
      {Array.from(text).map((char, index) => (
        <span key={index} style={{ color: palette[index % palette.length] }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

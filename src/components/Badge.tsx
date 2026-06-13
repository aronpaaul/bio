interface BadgeProps {
  text: string
}

export function Badge({ text }: BadgeProps) {
  return <div className="badge">{text}</div>
}

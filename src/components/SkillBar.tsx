interface SkillBarProps {
  name: string
  level: number
}

export function SkillBar({ name, level }: SkillBarProps) {
  const filled = '★'.repeat(level)
  const empty = '☆'.repeat(Math.max(0, 5 - level))
  return (
    <li className="skillRow">
      <span className="skillName">{name}</span>
      <span className="skillStars">{filled}{empty}</span>
    </li>
  )
}

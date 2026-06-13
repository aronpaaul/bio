import { SectionBox } from './SectionBox'
import { SkillBar } from './SkillBar'
import { skills } from '../data/skills'
import { useTranslation } from '../i18n/useTranslation'

export function SkillsSection() {
  const { t } = useTranslation()
  return (
    <SectionBox id="skills" title={t.skillsTitle}>
      <ul className="skillList">
        {skills.map((skill) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </ul>
    </SectionBox>
  )
}

import { SectionBox } from './SectionBox'
import { ProjectItem } from './ProjectItem'
import { projects } from '../data/projects'
import { useTranslation } from '../i18n/useTranslation'

export function ProjectsSection() {
  const { t } = useTranslation()
  return (
    <SectionBox id="projects" title={t.projectsTitle}>
      <ul className="projectList">
        {projects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </ul>
    </SectionBox>
  )
}

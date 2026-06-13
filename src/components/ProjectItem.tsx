import type { Project } from '../data/projects'
import { Blink } from './Blink'
import { useTranslation } from '../i18n/useTranslation'

interface ProjectItemProps {
  project: Project
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { language } = useTranslation()
  return (
    <li className="projectItem">
      <a className="projectLink" href={project.href} target="_blank" rel="noreferrer">
        {project.name}
      </a>
      {project.isNew && (
        <Blink>
          <span className="newTag"> NEW!</span>
        </Blink>
      )}
      <div className="projectDesc">{project.description[language]}</div>
    </li>
  )
}

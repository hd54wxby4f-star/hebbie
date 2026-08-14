import type { Project } from '../types'

export default function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="project-card-cover">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="tag-row">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </>
  )

  return project.link ? (
    <a href={project.link} target="_blank" rel="noreferrer" className="project-card">
      {inner}
    </a>
  ) : (
    <div className="project-card">{inner}</div>
  )
}

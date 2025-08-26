import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h2 className="section-title">Projects</h2>
      <div className="row g-4">
        {projects.map(project => (
          <div className="col-lg-4 col-md-6" key={project.id}>
            <div className="project-card h-100 d-flex flex-column">
              {/* Project Image */}
              {project.image && (
                <img src={project.image} alt={project.title} className="img-fluid mb-3 rounded" />
              )}

              {/* Project Content */}
              <div className="project-card-body flex-grow-1">
                <h5 className="text-light">{project.title}</h5>
                {/* ✅ RichTextField render */}
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>

              {/* 🔧 Tools */}
              {project.tools?.length > 0 && (
                <div className="tech-stack mb-2">
                  <strong className="text-light d-block mb-1">Tools:</strong>
                  {project.tools.map((tool, i) => (
                    <span key={i} className="badge bg-info text-dark me-2 mb-1">{tool}</span>
                  ))}
                </div>
              )}

              {/* 💻 Languages */}
              {project.languages?.length > 0 && (
                <div className="tech-stack mb-2">
                  <strong className="text-light d-block mb-1">Languages:</strong>
                  {project.languages.map((lang, i) => (
                    <span key={i} className="badge bg-success text-light me-2 mb-1">{lang}</span>
                  ))}
                </div>
              )}

              {/* Project Link */}
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary mt-auto"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

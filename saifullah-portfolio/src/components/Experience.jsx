import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Experience() {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    api.get('/experiences/')
      .then(res => setExperiences(res.data))
      .catch(err => console.error(err))
  }, [])

  // Helper function: format date as "Mon YYYY"
  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleString('default', { month: 'short', year: 'numeric' })
  }

  return (
    <>
      <h2 className="section-title">Experience</h2>
      <div className="row">
        <div className="col-lg-10">
          <div className="timeline">
            {experiences.length > 0 ? (
              experiences.map(exp => (
                <div className="timeline-item" key={exp.id}>
                  <h4 className="text-light">{exp.role}</h4>
                  <h5 className="text-muted">{exp.company}</h5>
                  <p className="small text-info">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_present
                      ? "Present"
                      : exp.end_date
                        ? formatDate(exp.end_date)
                        : ""}
                  </p>
                  {/* ✅ RichTextField render */}
                  <div dangerouslySetInnerHTML={{ __html: exp.description }} />
                </div>
              ))
            ) : (
              <p>No experience added yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

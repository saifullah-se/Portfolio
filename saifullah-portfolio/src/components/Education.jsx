import React from 'react'

export default function Education({ items = [] }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleString('default', { month: 'short', year: 'numeric' })
  }

  return (
    <>
      <h2 className="section-title">Education</h2>
      <div className="row">
        <div className="col-lg-8">
          {items.map(ed => (
            <div className="education-item mb-4" key={ed.id}>
              <h4 className="text-light">{ed.degree}</h4>
              <h5 className="text-secondary">{ed.institution}</h5>
              <p className="small text-info">
                {formatDate(ed.start_date)} – {ed.end_date ? formatDate(ed.end_date) : 'Present'}
              </p>
              {/* ✅ RichTextField render */}
              {ed.description && (
                <div dangerouslySetInnerHTML={{ __html: ed.description }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

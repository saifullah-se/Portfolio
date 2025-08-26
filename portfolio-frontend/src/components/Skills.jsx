import React, { useEffect } from 'react'

export default function Skills({ items = [] }) {
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const windowHeight = window.innerHeight
        const elementTop = el.getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < windowHeight - elementVisible) el.classList.add('active')
        else el.classList.remove('active')
      })
    }
    window.addEventListener('scroll', reveal)
    reveal()
    const animate = () => {
      document.querySelectorAll('.progress-bar[data-width]').forEach((bar) => {
        const width = bar.getAttribute('data-width')
        bar.style.width = width + '%'
      })
    }
    const section = document.getElementById('skills')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animate(); observer.unobserve(entry.target) }
      })
    }, { threshold: 0.5 })
    if (section) observer.observe(section)
    return () => {
      window.removeEventListener('scroll', reveal)
      observer.disconnect()
    }
  }, [])

  const buckets = {
    frontend: items.filter(i => (i.category || '').toLowerCase() === 'front-end'),
    backend: items.filter(i => (i.category || '').toLowerCase() === 'back-end'),
    design: items.filter(i => (i.category || '').toLowerCase().includes('design')),
  }
  const Card = ({ title, cls, list }) => (
    <div className="col-lg-4 col-md-6">
      <div className={`card-custom text-center ${cls}`}>
        <div className="skill-icon"><i className={cls==='skill-frontend'?'bi bi-code-slash':cls==='skill-backend'?'bi bi-server':'bi bi-palette-fill'}></i></div>
        <h4 className="text-light mb-4">{title}</h4>
        {list.map(s => (
          <div key={s.id || s.name}>
            <p className="mb-2 text-start text-light">{s.name}</p>
            <div className="progress mb-3">
              <div className="progress-bar" role="progressbar" data-width={s.level || 0}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <>
      <h2 className="section-title">Skills</h2>
      <div className="row g-4">
        <Card title="Front-End" cls="skill-frontend" list={buckets.frontend} />
        <Card title="Back-End" cls="skill-backend" list={buckets.backend} />
        <Card title="Design & Tools" cls="skill-design" list={buckets.design} />
      </div>
    </>
  )
}

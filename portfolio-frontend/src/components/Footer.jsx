import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Footer() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    api.get('/footer-links/')
      .then(res => setLinks(res.data))
      .catch(err => console.error(err))
  }, [])

  const renderIcon = (icon) => {
    switch(icon) {
      case 'linkedin': return <i className="bi bi-linkedin"></i>
      case 'github': return <i className="bi bi-github"></i>
      case 'email': return <i className="bi bi-envelope"></i>
      case 'twitter': return <i className="bi bi-twitter"></i>
      case 'facebook': return <i className="bi bi-facebook"></i>
      default: return <i className="bi bi-link-45deg"></i>
    }
  }

  return (
    <footer className="text-center py-3">
      <div className="d-flex justify-content-center gap-3 mb-2">
        {links.map(link => (
          <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-light fs-4">
            {renderIcon(link.icon)}
          </a>
        ))}
      </div>
      <p className="small text-muted mb-0">
        Designed & Developed by <strong>Saif U.</strong>
      </p>
    </footer>
  )
}

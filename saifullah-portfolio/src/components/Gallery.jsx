import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Gallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    api.get('/gallery/')
      .then(res => setImages(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h2 className="section-title">Gallery</h2>
      <div className="row g-4">
        {images.map((img) => (
          <div className="col-lg-3 col-md-4 col-6" key={img.id}>
            <div className="card h-100">
              <img src={img.image} className="card-img-top" alt={img.title} />
              <div className="card-body">
                <h6>{img.title}</h6>
                <p className="small text-muted">{img.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

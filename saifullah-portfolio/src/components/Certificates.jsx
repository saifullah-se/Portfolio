import React, { useEffect, useState } from "react"
import api from "../api"

export default function Certificates() {
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    api.get("/certificates/")
      .then(res => setCertificates(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h2 className="section-title">Certificates</h2>
      <div className="row g-4">
        {certificates.map(cert => (
          <div className="col-lg-4 col-md-6" key={cert.id}>
            <div className="certificate-card h-100 text-center d-flex flex-column justify-content-center">
              <div className="mb-3">
                <i className="bi bi-award-fill" style={{ fontSize: "2rem", color: "#ffc107" }}></i>
              </div>
              <h5 className="text-light">{cert.name}</h5>
              <p className="text-secondary">{cert.issuing_organization}</p>
              <p className="small text-info">{cert.issue_date}</p> {/* 👈 Month Year */}
              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info mt-2">
                  View Credential
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

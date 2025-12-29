import React, { useState } from 'react'

export default function Contact({ data }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [success, setSuccess] = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (form.name && form.email && form.message) {
      try {
        const response = await fetch("https://saifullah-portfolio-b.up.railway.app/api/contact-messages/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })

        if (response.ok) {
          setSuccess(true)
          setForm({ name: '', email: '', subject: '', message: '' })

          // ✅ hide success message after 3 seconds
          setTimeout(() => {
            setSuccess(false)
          }, 2000)
        } else {
          alert("Something went wrong. Please try again.")
        }
      } catch (error) {
        console.error("Error:", error)
        alert("Server error. Try again later.")
      }
    } else {
      alert('Please fill out all required fields.')
    }
  }

  return (
    <>
      <h2 className="section-title">Get In Touch</h2>
      <div className="row">
        <div className="col-lg-5">
          <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open. I'll get back to you!</p>
          {data?.email && <p><i className="fas fa-envelope me-2 text-success"></i> {data.email}</p>}
          {data?.phone_number && <p><i className="fas fa-phone me-2 text-success"></i> {data.phone_number}</p>}
          {data?.address && <p><i className="fas fa-map-marker-alt me-2 text-success"></i> {data.address}</p>}
          {data?.linkedin_url && <a href={data.linkedin_url} target="_blank" className="btn btn-custom mt-3" rel="noreferrer"><i className="fab fa-linkedin me-2"></i> LinkedIn</a>}
        </div>
        <div className="col-lg-7">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" name="name" placeholder="Your Name" value={form.name} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" name="email" placeholder="Your Email" value={form.email} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" name="subject" placeholder="Subject" value={form.subject} onChange={onChange} />
            </div>
            <div className="mb-3">
              <textarea className="form-control" name="message" rows="5" placeholder="Your Message" value={form.message} onChange={onChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-custom">Send Message</button>
          </form>

          {/* ✅ success notification */}
          {success && (
            <p className="text-success mt-3">
              ✅ Message sent successfully!
            </p>
          )}
        </div>
      </div>
    </>
  )
}

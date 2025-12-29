import React, { useState } from 'react';

export default function Contact({ data }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false); // Reset success state on new attempt
    
    if (form.name && form.email && form.message) {
      setLoading(true);
      try {
        const response = await fetch("https://saifullah-portfolio-b.up.railway.app/api/contact-messages/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        
        if (response.status === 201) {
          setSuccess(true);
          setForm({ name: '', email: '', subject: '', message: '' }); // ✅ Clear form
          
          // Optional: Hide success message after 5 seconds
          setTimeout(() => setSuccess(false), 5000);
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Server error. Try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h2 className="section-title">Get In Touch</h2>
      <div className="row">
        <div className="col-lg-5">
          <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open. I'll get back to you!</p>
          {data?.email && <p><i className="fas fa-envelope me-2 text-success"></i> {data.email}</p>}
          {data?.phone_number && <p><i className="fas fa-phone me-2 text-success"></i> {data.phone_number}</p>}
          {data?.address && <p><i className="fas fa-map-marker-alt me-2 text-success"></i> {data.address}</p>}
          {data?.linkedin_url && (
            <a href={data.linkedin_url} target="_blank" className="btn btn-custom mt-3" rel="noreferrer">
              <i className="fab fa-linkedin me-2"></i> LinkedIn
            </a>
          )}
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
            <button type="submit" className="btn btn-custom" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* ✅ Inline success notification (No Popup) */}
          {success && (
            <div className="alert alert-success mt-3" role="alert" style={{ backgroundColor: 'transparent', border: '1px solid #198754', color: '#198754' }}>
              ✅ Message sent successfully! I will get back to you soon.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
import React, { useEffect, useState } from 'react'
import SiteHead from "./components/SiteHead";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import api from './api'

export default function App() {
  const [navbar, setNavbar] = useState([])
  const [home, setHome] = useState(null)
  const [about, setAbout] = useState(null)
  const [skills, setSkills] = useState([])
  const [education, setEducation] = useState([])
  const [certs, setCerts] = useState([])
  const [contact, setContact] = useState(null)
  const [experiences, setExperiences] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    Promise.all([
      api.get('/navbar/'),
      api.get('/home/'),
      api.get('/about/'),
      api.get('/skills/'),
      api.get('/education/'),
      api.get('/certificates/'),
      api.get('/contact/'),
      api.get('/experiences/'),
      api.get('/projects/'),
    ])
      .then(([n, h, a, s, e, c, ci, ex, p]) => {
        setNavbar(n.data)
        setHome(Array.isArray(h.data) ? h.data[0] : h.data)
        setAbout(Array.isArray(a.data) ? a.data[0] : a.data)
        setSkills(s.data)
        setEducation(e.data)
        setCerts(c.data)
        setContact(Array.isArray(ci.data) ? ci.data[0] : ci.data)
        setExperiences(ex.data)
        setProjects(p.data)
      })
      .catch((e) => console.error(e))
  }, [])

  return (
    <>
      {/* Favicon + Title updater */}
      <SiteHead />

      <Navbar items={navbar} />
      <main className="container-fluid p-0">
        <section id="home">
          <Home data={home} />
        </section>
        <div className="container">
          <section id="about" className="reveal">
            <About data={about} />
          </section>
          <section id="skills" className="reveal">
            <Skills items={skills} />
          </section>
          <section id="projects" className="reveal">
            <Projects items={projects} />
          </section>
          <section id="experience" className="reveal">
            <Experience items={experiences} />
          </section>
          <section id="education" className="reveal">
            <Education items={education} />
          </section>
          <section id="certificates" className="reveal">
            <Certificates items={certs} />
          </section>
          <section id="contact" className="reveal">
            <Contact data={contact} />
          </section>
        </div>
      </main>
      <Footer data={contact} />
    </>
  )
}

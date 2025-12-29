import React, { useEffect, useRef } from 'react'

export default function Skills({ items = [] }) {
  // 1. Create a reference to this specific section
  const sectionRef = useRef(null);

  useEffect(() => {
    // --- Logic 1: Reveal Cards on Scroll ---
    const reveal = () => {
      // Select only elements inside this component to avoid conflicts
      const reveals = sectionRef.current 
        ? sectionRef.current.querySelectorAll('.reveal') 
        : document.querySelectorAll('.reveal');

      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 50; // Triggers sooner on mobile
        if (elementTop < windowHeight - elementVisible) el.classList.add('active');
        else el.classList.remove('active');
      });
    }
    window.addEventListener('scroll', reveal);
    reveal(); // Run once on load

    // --- Logic 2: Animate Progress Bars ---
    const animate = () => {
      // Find all progress bars specifically inside this section
      const bars = sectionRef.current 
        ? sectionRef.current.querySelectorAll('.progress-bar[data-width]') 
        : document.querySelectorAll('.progress-bar[data-width]');

      bars.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%'; // This triggers the CSS transition
      });
    }

    // --- Logic 3: The Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Trigger if ANY part is visible (isIntersecting)
        if (entry.isIntersecting) { 
          animate(); 
          observer.unobserve(entry.target); // Run only once
        }
      })
    }, { threshold: 0 }); // <--- CHANGED TO 0 (Fixes Mobile Issue)

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback: If observer fails (rare), run animation after 1 second
    setTimeout(animate, 1000);

    return () => {
      window.removeEventListener('scroll', reveal);
      observer.disconnect();
    }
  }, [])

  const buckets = {
    frontend: items.filter(i => (i.category || '').toLowerCase() === 'front-end'),
    backend: items.filter(i => (i.category || '').toLowerCase() === 'back-end'),
    design: items.filter(i => (i.category || '').toLowerCase().includes('design')),
  }

  const Card = ({ title, cls, list }) => (
    <div className="col-lg-4 col-md-6 reveal"> {/* Added 'reveal' class here just in case */}
      <div className={`card-custom text-center ${cls}`}>
        <div className="skill-icon">
          <i className={cls==='skill-frontend'?'bi bi-code-slash':cls==='skill-backend'?'bi bi-server':'bi bi-palette-fill'}></i>
        </div>
        <h4 className="text-light mb-4">{title}</h4>
        {list.map(s => (
          <div key={s.id || s.name}>
            <p className="mb-2 text-start text-light">{s.name}</p>
            <div className="progress mb-3">
              <div 
                className="progress-bar" 
                role="progressbar" 
                data-width={s.level || 0}
                style={{ width: "0%" }} // Start at 0 to ensure animation happens
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    // 2. Attach the ref to the container
    <div ref={sectionRef} id="skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="row g-4">
        <Card title="Front-End" cls="skill-frontend" list={buckets.frontend} />
        <Card title="Back-End" cls="skill-backend" list={buckets.backend} />
        <Card title="Design & Tools" cls="skill-design" list={buckets.design} />
      </div>
    </div>
  )
}
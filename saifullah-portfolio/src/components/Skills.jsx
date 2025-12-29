import React, { useEffect, useRef } from 'react'

export default function Skills({ items = [] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Logic: Animate Progress Bars when this section is visible
    const animateBars = () => {
      const bars = sectionRef.current 
        ? sectionRef.current.querySelectorAll('.progress-bar[data-width]') 
        : document.querySelectorAll('.progress-bar[data-width]');

      bars.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        // Force a small delay to ensure the browser paints the change
        requestAnimationFrame(() => {
            bar.style.width = width + '%';
        });
      });
    }

    // Use IntersectionObserver to trigger the animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Trigger if ANY part of the section is visible
        if (entry.isIntersecting) { 
          animateBars(); 
          observer.unobserve(entry.target); // Run only once
        }
      })
    }, { threshold: 0.1 }); // 10% visibility trigger

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Backup: If the observer misses (e.g. fast refresh), force animation after 500ms
    setTimeout(animateBars, 500);

    return () => {
      observer.disconnect();
    }
  }, [items]); // Add items to dependency to re-run if data loads late

  // Grouping items for display
  const buckets = {
    frontend: items.filter(i => (i.category || '').toLowerCase() === 'front-end'),
    backend: items.filter(i => (i.category || '').toLowerCase() === 'back-end'),
    design: items.filter(i => (i.category || '').toLowerCase().includes('design')),
  }

  const Card = ({ title, cls, list }) => (
    <div className="col-lg-4 col-md-6">
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
                style={{ width: "0%" }} // Start at 0 to ensure animation works
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
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
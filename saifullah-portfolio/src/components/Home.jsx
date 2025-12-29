import React, { useEffect, useRef } from "react";

export default function Home({ data }) {
  const taglineRef = useRef(null);

  useEffect(() => {
    if (!data?.tagline) return;
    const el = taglineRef.current;
    if (!el) return;
    el.innerHTML = "";
    let i = 0;
    const type = () => {
      if (i < data.tagline.length) {
        el.innerHTML += data.tagline.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    };
    type();
  }, [data?.tagline]);

  return (
    <div className="container">
      {/* --- Main Row: Text and Image Side-by-Side --- */}
      <div className="row align-items-center">
        
        {/* TEXT COLUMN: col-7 on Mobile, col-lg-8 on Desktop */}
        <div className="col-7 col-lg-8 text-start">
          <p className="text-white-50 mb-1 small">
            {data?.greeting || "Hi, my name is"}
          </p>
          
          {/* Name: Smaller on mobile (display-6), Big on desktop (display-1) */}
          <h1 className="fw-bold mb-1 display-6 d-lg-none">
            {data?.name || ""}
          </h1>
          <h1 className="display-1 fw-bold d-none d-lg-block">
            {data?.name || ""}
          </h1>

          <h2 className="text-white-75 h6 d-lg-none"> {/* Mobile Title */}
            {data?.title || ""}
          </h2>
          <h2 className="text-white-75 d-none d-lg-block"> {/* Desktop Title */}
            {data?.title || ""}
          </h2>

          <p className="mt-2 tagline text-white-50 small d-lg-none" ref={taglineRef}></p> {/* Mobile Tagline */}
          <p className="lead mt-4 tagline d-none d-lg-block" id="tagline-desktop"> {/* Desktop Tagline */}
             {data?.tagline} 
          </p>
        </div>

        {/* IMAGE COLUMN: col-5 on Mobile, col-lg-4 on Desktop */}
        <div className="col-5 col-lg-4 d-flex justify-content-center">
          {data?.profile_image_url && (
            <img
              src={data.profile_image_url}
              alt={data?.name || "Profile"}
              className="profile-img img-fluid"
              // Ensure image is circular and responsive
              style={{ 
                width: "100%", 
                maxWidth: "350px", 
                borderRadius: "50%", 
                aspectRatio: "1/1", 
                objectFit: "cover" 
              }}
            />
          )}
        </div>
      </div>

      {/* --- Button Row: Below the Text/Image --- */}
      <div className="row mt-4">
        {/* Centered on Mobile, Left-Aligned on Desktop */}
        <div className="col-12 text-center text-lg-start">
          {data?.resume_file && (
            <a
              href={data.resume_file}
              className="btn btn-custom me-3 btn-sm d-lg-inline-block"
              target="_blank"
              rel="noreferrer"
            >
              View CV
            </a>
          )}
          <a href="#contact" className="btn btn-custom ms-2 btn-sm d-lg-inline-block">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
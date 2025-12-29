import React, { useEffect, useRef } from "react";

export default function Home({ data }) {
  const mobileTaglineRef = useRef(null);
  const desktopTaglineRef = useRef(null);

  const runTypewriter = (el, text) => {
    if (!el || !text) return;
    el.innerHTML = "";
    let i = 0;
    const type = () => {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    };
    type();
  };

  useEffect(() => {
    if (data?.tagline) {
      runTypewriter(mobileTaglineRef.current, data.tagline);
      runTypewriter(desktopTaglineRef.current, data.tagline);
    }
  }, [data?.tagline]);

  return (
    <div className="container" style={{ position: "relative" }}>
      
      {/* =========================================
          MOBILE VIEW (d-lg-none)
          Fixed Spacing: Reduced top padding to 85px
      ========================================= */}
      <div 
        className="d-lg-none text-start" 
        style={{ 
          paddingTop: "85px", // REDUCED from 110px to remove the gap
          paddingBottom: "50px"
        }}
      >
        
        {/* Top Block: Name & Title */}
        <div className="mb-3">
          <p className="text-white-50 mb-0 small">
            {data?.greeting || "Hi, my name is"}
          </p>
          <h1 className="fw-bold mb-1 display-5">
            {data?.name || ""}
          </h1>
          <h2 className="text-white-75 h5 fw-normal">
            {data?.title || ""}
          </h2>
        </div>

        {/* Middle Row: Tagline (Left) and Image (Right) */}
        <div className="row align-items-center mt-2">
          <div className="col-7">
            <p 
              className="tagline lead mt-3" 
              ref={mobileTaglineRef}
              style={{ color: "#64ffda", fontFamily: "monospace" }}
            ></p>
          </div>
          
                    <div className="col-lg-4 d-flex justify-content-center">
            {data?.profile_image && (
              <img
                src={data.profile_image}
                alt="Profile"
                className="profile-img"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #64ffda",
                  boxShadow: "0 0 20px rgba(100,255,218,0.2)"
                }}
              />
            )}
          </div>
        </div>

        {/* Bottom Row: Buttons */}
        <div className="mt-4 text-center">
          {data?.resume_file && (
            <a
              href={data.resume_file}
              className="btn btn-custom me-2 btn-sm"
              target="_blank"
              rel="noreferrer"
            >
              View CV
            </a>
          )}
          <a href="#contact" className="btn btn-custom ms-2 btn-sm">
            Contact Me
          </a>
        </div>
      </div>


      {/* =========================================
          DESKTOP VIEW (d-none d-lg-block)
          (No Changes Here - Keeps your perfect desktop layout)
      ========================================= */}
      <div className="d-none d-lg-block">
        <div className="row align-items-center" style={{ minHeight: "90vh" }}>
          <div className="col-lg-8 text-start">
            <p className="text-white-50 mb-1">
              {data?.greeting || "Hi, my name is"}
            </p>
            <h1 className="display-1 fw-bold">
              {data?.name || ""}
            </h1>
            <h2 className="text-white-75">
              {data?.title || ""}
            </h2>
            <p 
              className="lead mt-4 tagline" 
              ref={desktopTaglineRef}
              style={{ color: "#64ffda", fontFamily: "monospace" }}
            ></p>
            
            <div className="mt-5">
              {data?.resume_file && (
                <a
                  href={data.resume_file}
                  className="btn btn-custom me-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  View CV
                </a>
              )}
              <a href="#contact" className="btn btn-custom ms-2">
                Contact Me
              </a>
            </div>
          </div>

          <div className="col-lg-4 d-flex justify-content-center">
            {data?.profile_image && (
              <img
                src={data.profile_image}
                alt="Profile"
                className="profile-img"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #64ffda",
                  boxShadow: "0 0 20px rgba(100,255,218,0.2)"
                }}
              />
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
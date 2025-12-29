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
      <div className="row align-items-center">
        <div className="col-lg-8 text-start">
          <p className="text-white-50 mb-1">
            {data?.greeting || "Hi, my name is"}
          </p>
          <h1 className="display-1 fw-bold">{data?.name || ""}</h1>
          <h2 className="text-white-75">{data?.title || ""}</h2>
          <p className="lead mt-4 tagline" id="tagline" ref={taglineRef}></p>
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
              alt={data?.name || "Profile"}
              className="profile-img"
            />
          )}
        </div>
      </div>
    </div>
  );
}

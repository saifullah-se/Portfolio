import React, { useEffect, useState } from "react";
import api from "../api";

export default function About({ data }) {
  const [softSkills, setSoftSkills] = useState([]);

  useEffect(() => {
    api
      .get("/soft-skills/")
      .then((res) => setSoftSkills(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h2 className="section-title">{data?.title || "About Me"}</h2>
      <div className="row align-items-center">
        <div className="col-lg-4 d-flex justify-content-center mb-4 mb-lg-0">
          {data?.about_image && (
            <img src={data.about_image} alt="About" className="profile-img" />
          )}
        </div>
        <div className="col-lg-8">
          {/* ✅ RichTextField render */}
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />

          <h3 className="mt-">Soft Skills:</h3>
          <div className="row mt-3">
            {softSkills.map((skill) => (
              <div key={skill.id} className="col-md-6 mb-2 d-flex align-items-center">
                <span className="me-2 text-success">✔</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

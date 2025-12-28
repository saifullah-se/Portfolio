import React, { useEffect, useState } from "react";
import api from "../api";

export default function Navbar({ items = [] }) {
  const [activeSection, setActiveSection] = useState("home");
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    // Scroll active section detector
    const handler = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120; // adjust for navbar height
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    // Fetch Navbar branding (text/logo)
    api.get("/navbar-logo/")
      .then((res) => setBrand(res.data?.[0] || null))
      .catch(console.error);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#home">
          {brand?.logo ? (
            <img src={brand.logo} alt="logo" style={{ height: 40 }} />
          ) : (
            <span>{brand?.text || "Saif U. Portfolio"}</span>
          )}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {items
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((item) => {
                const sectionId = item.link?.replace("#", "") || "";
                return (
                  <li className="nav-item" key={item.id || item.name}>
                    <a
                      className={`nav-link ${activeSection === sectionId ? "active" : ""}`}
                      href={item.link || "#"}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

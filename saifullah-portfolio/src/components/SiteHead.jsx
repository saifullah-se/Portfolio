import { useEffect } from "react";
import api from "../api";

export default function SiteHead() {
  useEffect(() => {
    api.get("/site-settings/")
      .then(res => {
        const settings = res.data?.[0];
        if (!settings) return;

        // Title
        if (settings.site_title) {
          document.title = settings.site_title;
        }

        // Favicon
        if (settings.favicon) {
          let link = document.querySelector("link[rel='icon']");
          if (!link) {
            link = document.createElement("link");
            link.setAttribute("rel", "icon");
            document.head.appendChild(link);
          }
          link.setAttribute("href", settings.favicon);
        }
      })
      .catch(console.error);
  }, []);

  return null; 
}

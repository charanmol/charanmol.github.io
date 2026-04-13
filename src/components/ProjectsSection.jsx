import React, { useEffect, useState } from "react";
import { digRows, logoRows, socialRows } from "../data/portfolioData";

function ProjectImage({ image, wrapperClassName = "img-container", onOpen }) {
  const imageClassName = image.className ? `project-image ${image.className}` : "project-image";

  return (
    <div className={wrapperClassName} key={image.src}>
      <img
        id={image.id}
        className={imageClassName}
        src={image.src}
        alt="Project preview"
        loading="lazy"
        decoding="async"
        onClick={() => onOpen(image.src)}
      />
      <div className="text-view">
        <img src="assets/eye.webp" alt="" loading="lazy" decoding="async" />
        <p>View</p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("dig");
  const [selectedImage, setSelectedImage] = useState(null);
  const logoRowClasses = ["row1", "row2"];
  const socialRowClasses = ["row1", "row4", "row3", "row5"];

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <div className="digart">
      <h1 id="digart"> Gallery</h1>
      <div className="tags">
        <div
          className="dig"
          id="dig"
          style={{ borderTop: activeTab === "dig" ? "1px solid white" : "0px solid white" }}
          onClick={() => setActiveTab("dig")}
        >
          <p>Digital Art</p>
        </div>
        <div
          className="logo"
          id="logo"
          style={{ borderTop: activeTab === "logo" ? "1px solid white" : "0px solid white" }}
          onClick={() => setActiveTab("logo")}
        >
          <p>Logo Designs</p>
        </div>
        <div
          className="social"
          id="social"
          style={{ borderTop: activeTab === "social" ? "1px solid white" : "0px solid white" }}
          onClick={() => setActiveTab("social")}
        >
          <p>Social Meida Designs</p>
        </div>
      </div>

      <div className="digimg" id="digimg" style={{ display: activeTab === "dig" ? "flex" : "none" }}>
        {digRows.map((row, rowIndex) => (
          <div className={`row${rowIndex + 1}`} key={`dig-row-${rowIndex}`}>
            {row.map((image) => (
              <ProjectImage image={image} onOpen={setSelectedImage} key={image.src} />
            ))}
          </div>
        ))}
      </div>

      <div className="logoimg" id="logoimg" style={{ display: activeTab === "logo" ? "flex" : "none" }}>
        {logoRows.map((row, rowIndex) => (
          <div className={logoRowClasses[rowIndex] ?? `row${rowIndex + 1}`} key={`logo-row-${rowIndex}`}>
            {row.map((image) => (
              <ProjectImage
                image={image}
                wrapperClassName="img-container logo-item"
                onOpen={setSelectedImage}
                key={image.src}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="socialimg" id="socialimg" style={{ display: activeTab === "social" ? "flex" : "none" }}>
        {socialRows.map((row, rowIndex) => (
          <div className={socialRowClasses[rowIndex] ?? `row${rowIndex + 1}`} key={`social-row-${rowIndex}`}>
            {row.map((image) => (
              <ProjectImage
                image={image}
                wrapperClassName="img-container social-item"
                onOpen={setSelectedImage}
                key={image.src}
              />
            ))}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="project-lightbox" onClick={() => setSelectedImage(null)}>
          <button
            className="lightbox-close"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImage(null);
            }}
          >
            x
          </button>
          <img
            className="lightbox-image"
            src={selectedImage}
            alt="Expanded project"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectsSection;

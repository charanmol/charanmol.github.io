import React from "react";

function Navbar({ hideNav, isAboutPage }) {
  const homeHref = "/";
  const sectionHref = (sectionId) => `${homeHref}${sectionId}`;

  return (
    <div className={`box${hideNav ? " box-hidden" : ""}`} id="box">
      <ul className="navbar">
        <li>
          <a href={homeHref} id="heading">
            Anmol
          </a>
        </li>
        <li>
          <a href={homeHref}>Start</a>
        </li>
        <li>
          <a href={sectionHref("#code-projects")}>Code</a>
        </li>
        <li>
          <a href={sectionHref("#digart")}>Gallery</a>
        </li>
        <li>
          <a href={sectionHref("#skills")}>Skills</a>
        </li>
        <li>
          <a id="about" href={isAboutPage ? homeHref : "/?page=about"}>
            {isAboutPage ? "Home" : "About"}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

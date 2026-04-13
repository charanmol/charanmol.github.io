import React from "react";
import { codeProjects } from "../data/codeProjectsData";

function CodeProjectsSection() {
  return (
    <div className="code-projects">
      <h1 id="code-projects">Code Projects</h1>
      <div className="code-project-grid">
        {codeProjects.map((project) => (
          <article className="code-project-card" key={project.name}>
            <h2>{project.name}</h2>
            <p className="code-project-description">{project.description}</p>
            <div className="code-project-stack">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a className="code-project-link" href={project.href} target="_blank" rel="noreferrer">
              View Project
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CodeProjectsSection;

import React from "react";

import { designSkills, devSkills } from "../data/skillsData";

function SkillCard({ className, icon, label }) {
  return (
    <div className={`${className} skill-card`}>
      <div className="apimg">
        <img src={icon} alt={label} loading="lazy" decoding="async" />
      </div>
      <p>{label}</p>
    </div>
  );
}

function SkillsSection() {
  return (
    <div className="skills">
      <h1 id="skills">Skills</h1>      

      <div className="skilllist2">
        {devSkills.map((skill) => (
          <SkillCard key={skill.label} className={skill.className} icon={skill.icon} label={skill.label} />
        ))}
      </div>

      <div className="skilllist" id="skilllist">
        {designSkills.map((skill) => (
          <SkillCard key={skill.label} className={skill.className} icon={skill.icon} label={skill.label} />
        ))}
      </div>

    </div>
  );
}

export default SkillsSection;

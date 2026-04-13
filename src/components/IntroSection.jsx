import React from "react";

function IntroSection() {
  return (
    <div className="intro">
      <div className="intro-background" aria-hidden="true">
        <iframe
          className="intro-background-frame"
          src="/dvdbounce/index.html"
          title="Bouncing DVD logo animation background"
          tabIndex="-1"
        />
      </div>

      <div className="introtextbox">
        <div className="introtext">
          <h1 id="hello">Hello!!</h1>
        </div>
        <div className="tanimation">
          <p id="iam">I am Anmol Joshi,</p>
        </div>
        <div className="tanimation2">
          <p id="cs">a CS enthusiast from Nepal</p>
        </div>

        <a id="hire" href="/Resume.pdf" target="_blank" rel="noreferrer">
          Resume
        </a>

        
      </div>
    </div>
  );
}

export default IntroSection;

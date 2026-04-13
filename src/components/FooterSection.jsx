import React from "react";

function FooterSection() {
  return (
    <>
      <div className="footer" id="footer-contact">
        <h1>Find me here:</h1>
        <ul className="handles">
          <li>
            <a href="https://www.github.com/anmolpy/">GitHub</a>
          </li>
          <li>
            <a href="https://leetcode.com/u/char_anmol/">LeetCode</a>
          </li>
          <li>
            <a id="email" href="mailto:anmol.joshi@usm.edu?subject=Hey There!">
              Email
            </a>
          </li>
        </ul>
      </div>

      <footer>
        <div className="cop">
          <p id="c"> © 2026 Anmol Joshi</p>
        </div>
      </footer>
    </>
  );
}

export default FooterSection;

import React from "react";

function Preloader({ isVisible }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div id="preloader">
      <p>Loading...</p>
      <p id="blinking-dots">....</p>
    </div>
  );
}

export default Preloader;

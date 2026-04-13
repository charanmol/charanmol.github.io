import React, { useEffect, useState } from "react";

function FpsMeter() {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let frameCount = 0;
    let start = performance.now();

    const tick = (now) => {
      frameCount += 1;

      const elapsed = now - start;
      if (elapsed >= 1000) {
        setFps(Math.round((frameCount * 1000) / elapsed));
        frameCount = 0;
        start = now;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fps-meter" aria-live="polite" aria-label="Current frames per second">
      FPS: {fps}
    </div>
  );
}

export default FpsMeter;
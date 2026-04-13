import React, { useEffect, useRef, useState } from "react";
import FooterSection from "./components/FooterSection";
import IntroSection from "./components/IntroSection";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import CodeProjectsSection from "./components/CodeProjectsSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import AboutPage from "./components/AboutPage";

function App() {
  const [hideNav, setHideNav] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const isAboutPage = new URLSearchParams(window.location.search).get("page") === "about";
  const hideNavRef = useRef(false);

  useEffect(() => {
    if (isAboutPage) {
      hideNavRef.current = false;
      setHideNav(false);
      return undefined;
    }

    let beforeY = window.scrollY;
    let rafId = 0;

    const onScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        const afterY = window.scrollY;
        const scrollingDown = afterY > beforeY;
        const nextHidden = afterY > 96 && scrollingDown;

        if (hideNavRef.current !== nextHidden) {
          hideNavRef.current = nextHidden;
          setHideNav(nextHidden);
        }

        beforeY = afterY;
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isAboutPage]);

  useEffect(() => {
    const imageElements = Array.from(document.querySelectorAll("img")).filter((img) => img.loading !== "lazy");

    if (imageElements.length === 0) {
      setShowPreloader(false);
      return;
    }

    let loadedCount = 0;
    const listeners = [];
    const fallbackTimeout = window.setTimeout(() => {
      setShowPreloader(false);
    }, 2500);

    const markLoaded = () => {
      loadedCount += 1;
      if (loadedCount >= imageElements.length) {
        window.clearTimeout(fallbackTimeout);
        setShowPreloader(false);
      }
    };

    imageElements.forEach((img) => {
      if (img.complete) {
        markLoaded();
        return;
      }

      const onDone = () => {
        markLoaded();
      };

      img.addEventListener("load", onDone, { once: true });
      img.addEventListener("error", onDone, { once: true });
      listeners.push({ img, onDone });
    });

    return () => {
      window.clearTimeout(fallbackTimeout);
      listeners.forEach(({ img, onDone }) => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
      });
    };
  }, []);

  return (
    <>
      <Preloader isVisible={showPreloader} />

      <div className="container" id="top">
        <Navbar hideNav={hideNav} isAboutPage={isAboutPage} />
        {isAboutPage ? (
          <AboutPage />
        ) : (
          <>
            <div className="firstpage">
              <IntroSection />
            </div>
            <CodeProjectsSection />
            <ProjectsSection />
            <SkillsSection />
            <FooterSection />
          </>
        )}
      </div>
    </>
  );
}

export default App;

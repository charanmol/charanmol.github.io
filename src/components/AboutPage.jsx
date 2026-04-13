import React from "react";

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-kicker">About</p>
        <h1>Anmol Joshi</h1>
        <p className="about-lead">
          I build thoughtful digital products and work closely with AI automation tools.
        </p>
      </section>

      <section className="about-grid">
        <article>
          <h2>What I do</h2>
          <p>
            My work sits between engineering and design. I enjoy building clean interfaces, exploring full-stack ideas,
            and creating visuals that feel intentional rather than overworked.
          </p>
        </article>

        <article>
          <h2>How I work</h2>
          <p>
            I like simple systems, strong fundamentals, and projects that are useful in real life. That usually means
            clear UX, practical features, and a lot of iteration until the details feel right.
          </p>
        </article>

        <article>
          <h2>Background</h2>
          <p>
            I&apos;m a CS enthusiast from Nepal who enjoys turning ideas into polished experiences, whether that&apos;s a web
            app, a visual design piece, or something in between.
          </p>
        </article>
      </section>
    </main>
  );
}

export default AboutPage;

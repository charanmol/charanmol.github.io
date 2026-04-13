const frame = document.getElementById("frame");
const dvd = document.getElementById("dvd");
const dvdLogo = document.getElementById("dvd-logo");

const logos = [
  "logos/dvdlogo-01.svg",
  "logos/dvdlogo-02.svg",
  "logos/dvdlogo-03.svg",
  "logos/dvdlogo-04.svg",
  "logos/dvdlogo-05.svg",
  "logos/dvdlogo-06.svg",
  "logos/dvdlogo-07.svg",
];

let currentLogo = 0;

const state = {
  x: 20,
  y: 20,
  vx: 2.6,
  vy: 2.1,
};

function setRandomLogo() {
  let nextLogo = currentLogo;

  while (nextLogo === currentLogo) {
    nextLogo = Math.floor(Math.random() * logos.length);
  }

  currentLogo = nextLogo;
  dvdLogo.src = logos[currentLogo];
}

function update() {
  const maxX = frame.clientWidth - dvd.offsetWidth;
  const maxY = frame.clientHeight - dvd.offsetHeight;

  state.x += state.vx;
  state.y += state.vy;

  let collided = false;

  if (state.x <= 0 || state.x >= maxX) {
    state.vx *= -1;
    state.x = Math.max(0, Math.min(state.x, maxX));
    collided = true;
  }

  if (state.y <= 0 || state.y >= maxY) {
    state.vy *= -1;
    state.y = Math.max(0, Math.min(state.y, maxY));
    collided = true;
  }

  if (collided) {
    setRandomLogo();
  }

  dvd.style.transform = `translate(${state.x}px, ${state.y}px)`;
  requestAnimationFrame(update);
}

window.addEventListener("resize", () => {
  const maxX = frame.clientWidth - dvd.offsetWidth;
  const maxY = frame.clientHeight - dvd.offsetHeight;
  state.x = Math.max(0, Math.min(state.x, maxX));
  state.y = Math.max(0, Math.min(state.y, maxY));
});

setRandomLogo();
requestAnimationFrame(update);

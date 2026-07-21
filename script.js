/* ==========================================================
   BIRTHDAY WEBSITE
   Part 1
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTS
========================================================== */

const body = document.body;

const loader = document.getElementById("loader");

const hero = document.querySelector(".hero");

const startButton = document.getElementById("startStory");

const envelopeSection = document.getElementById("envelopeSection");

const letterSection = document.getElementById("letterSection");

const envelope = document.querySelector(".envelope");

const revealElements = document.querySelectorAll(".reveal");

const progressBar = document.querySelector(".scroll-progress-bar");

const backToTop = document.getElementById("backToTop");

/* ==========================================================
   LOADER
========================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        body.classList.add("loaded");

    }, 900);

});

/* ==========================================================
   START STORY
========================================================== */

function startStory() {

    hero.style.transition = "opacity 1.2s ease";

    hero.style.opacity = "0";

    setTimeout(() => {

        hero.style.display = "none";

        envelopeSection.classList.remove("is-hidden");

        envelopeSection.scrollIntoView({

            behavior: "smooth",
            block: "center"

        });

    }, 1200);

}

startButton.addEventListener("click", startStory);

/* ==========================================================
   OPEN ENVELOPE
========================================================== */

function openEnvelope() {

    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");

    setTimeout(() => {

        letterSection.classList.remove("is-hidden");

        letterSection.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }, 1400);

}

envelope.addEventListener("click", openEnvelope);

envelope.addEventListener("keydown", event => {

    if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        openEnvelope();

    }

});

/* ==========================================================
   REVEAL ON SCROLL
========================================================== */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },

    {

        threshold: 0.18

    }

);

revealElements.forEach(element => {

    observer.observe(element);

});

/* ==========================================================
   SCROLL PROGRESS
========================================================== */

function updateProgressBar() {

    const scrollTop = window.scrollY;

    const height =

        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = (scrollTop / height) * 100;

    progressBar.style.width = `${progress}%`;

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function toggleBackButton() {

    if (window.scrollY > 700) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================================
   SCROLL EVENTS
========================================================== */

window.addEventListener("scroll", () => {

    updateProgressBar();

    toggleBackButton();

});
/* ==========================================================
   CURSOR GLOW
========================================================== */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {

    document.addEventListener("mousemove", event => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

} else if (cursorGlow) {

    cursorGlow.style.display = "none";

}

/* ==========================================================
   FLOATING HEARTS
========================================================== */

const heartsContainer = document.querySelector(".floating-hearts");

function createHeart() {

    if (!heartsContainer) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (14 + Math.random() * 18) + "px";

    heart.style.animationDuration = (8 + Math.random() * 6) + "s";

    heart.style.opacity = (0.15 + Math.random() * 0.25);

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}

setInterval(createHeart, 3500);

/* ==========================================================
   BACKGROUND PARALLAX
========================================================== */

const background = document.querySelector(".background");

function updateBackground() {

    if (!background) return;

    const offset = window.scrollY * 0.15;

    background.style.transform = `translateY(${offset}px)`;

}

window.addEventListener("scroll", updateBackground, {

    passive: true

});

/* ==========================================================
   GOLD BUTTON EFFECT
========================================================== */

if (startButton) {

    startButton.addEventListener("mouseenter", () => {

        startButton.animate([

            {

                transform: "scale(1)"

            },

            {

                transform: "scale(1.04)"

            },

            {

                transform: "scale(1)"

            }

        ], {

            duration: 700

        });

    });

}

/* ==========================================================
   SIGNATURE REVEAL
========================================================== */

const signature = document.querySelector(".signature");

if (signature) {

    signature.style.opacity = "0";

    signature.style.transform = "translateY(40px)";

    signature.style.transition =

        "opacity 1.4s ease, transform 1.4s ease";

    const signatureObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            setTimeout(() => {

                signature.style.opacity = "1";

                signature.style.transform = "translateY(0)";

            }, 700);

            signatureObserver.disconnect();

        });

    }, {

        threshold: 0.5

    });

    signatureObserver.observe(signature);

}

/* ==========================================================
   SECTION FADE STAGGER
========================================================== */

document.querySelectorAll(".chapter").forEach(section => {

    const paragraphs = section.querySelectorAll("p");

    paragraphs.forEach((paragraph, index) => {

        paragraph.style.transitionDelay =

            `${index * 120}ms`;

    });

});

/* ==========================================================
   RESIZE
========================================================== */

window.addEventListener("resize", () => {

    updateProgressBar();

});

/* ==========================================================
   INITIAL STATE
========================================================== */

updateProgressBar();

toggleBackButton();

updateBackground();

/* ==========================================================
   END
========================================================== */

console.log(

    "%c❤️ Happy Birthday Athanasia ❤️",

    "color:#d6b36d;font-size:18px;font-weight:bold;"

);

console.log(

    "Built with love."

);

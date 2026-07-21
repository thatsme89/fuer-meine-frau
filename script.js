"use strict";

/* ==========================================
   ELEMENTE
========================================== */

const body = document.body;

const loader = document.getElementById("loader");

const hero = document.querySelector(".hero");
const startButton = document.getElementById("startStory");

const envelopeSection = document.getElementById("envelopeSection");
const envelope = document.querySelector(".envelope");

const letterSection = document.getElementById("letterSection");

const revealElements = document.querySelectorAll(".reveal");

const progressBar = document.querySelector(".scroll-progress-bar");

const backToTop = document.getElementById("backToTop");

const cursorGlow = document.querySelector(".cursor-glow");

const floatingHearts = document.querySelector(".floating-hearts");

const background = document.querySelector(".background");

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        body.classList.add("loaded");

        if (loader) {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.remove();

            }, 800);

        }

    }, 1200);

});

/* ==========================================
   HERO
========================================== */

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

/* ==========================================
   UMSCHLAG
========================================== */

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

envelope.addEventListener("keydown", e => {

    if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        openEnvelope();

    }
});
/* ==========================================
   REVEAL BEIM SCROLLEN
========================================== */

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

/* ==========================================
   SCROLL PROGRESS
========================================== */

function updateProgressBar() {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        pageHeight > 0
            ? (scrollTop / pageHeight) * 100
            : 0;

    progressBar.style.width = progress + "%";

}

/* ==========================================
   BACK TO TOP
========================================== */

function toggleBackButton() {

    if (!backToTop) return;

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

/* ==========================================
   PARALLAX HINTERGRUND
========================================== */

function updateBackground() {

    if (!background) return;

    const offset = window.scrollY * 0.15;

    background.style.transform =
        `translateY(${offset}px)`;

}

/* ==========================================
   SCROLL EVENTS
========================================== */

window.addEventListener(

    "scroll",

    () => {

        updateProgressBar();

        toggleBackButton();

        updateBackground();

    },

    {

        passive: true

    }

);
/* ==========================================
   CURSOR GLOW
========================================== */

if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {

    document.addEventListener("mousemove", event => {

        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";

    });

} else if (cursorGlow) {

    cursorGlow.style.display = "none";

}

/* ==========================================
   FLOATING HEARTS
========================================== */

function createHeart() {

    if (!floatingHearts) return;

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "❤";

    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "-30px";

    heart.style.fontSize =
        (14 + Math.random() * 18) + "px";

    heart.style.opacity =
        (0.2 + Math.random() * 0.4);

    heart.style.pointerEvents = "none";

    heart.animate(

        [

            {
                transform: "translateY(0px)",
                opacity: heart.style.opacity
            },

            {
                transform: "translateY(-250px)",
                opacity: 0
            }

        ],

        {

            duration:
                5000 + Math.random() * 3000,

            easing: "linear"

        }

    );

    floatingHearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 3000);

/* ==========================================
   HERO BUTTON ANIMATION
========================================== */

if (startButton) {

    startButton.addEventListener("mouseenter", () => {

        startButton.animate(

            [

                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.05)"
                },

                {
                    transform: "scale(1)"
                }

            ],

            {

                duration: 500

            }

        );

    });

}
/* ==========================================
   SIGNATUR EINBLENDEN
========================================== */

const signature = document.querySelector(".signature");

if (signature) {

    signature.style.opacity = "0";
    signature.style.transform = "translateY(40px)";
    signature.style.transition =
        "opacity 1.4s ease, transform 1.4s ease";

    const signatureObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                signature.style.opacity = "1";
                signature.style.transform = "translateY(0)";

                signatureObserver.disconnect();

            });

        },

        {

            threshold: 0.4

        }

    );

    signatureObserver.observe(signature);

}

/* ==========================================
   SANFTE EINBLENDUNG DER ABSÄTZE
========================================== */

document.querySelectorAll(".chapter").forEach(section => {

    const paragraphs = section.querySelectorAll("p");

    paragraphs.forEach((paragraph, index) => {

        paragraph.style.transitionDelay =
            (index * 120) + "ms";

    });

});

/* ==========================================
   RESIZE
========================================== */

window.addEventListener("resize", () => {

    updateProgressBar();
    toggleBackButton();
    updateBackground();

});

/* ==========================================
   INITIALISIERUNG
========================================== */

updateProgressBar();

toggleBackButton();

updateBackground();

/* ==========================================
   KLEINE SICHERHEIT
========================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});
/* ==========================================
   SEITE INITIAL FERTIG STELLEN
========================================== */

window.addEventListener("DOMContentLoaded", () => {

    updateProgressBar();
    toggleBackButton();
    updateBackground();

});

/* ==========================================
   FOKUS FÜR TASTATUR
========================================== */

document.addEventListener("keyup", event => {

    if (event.key === "Tab") {

        document.body.classList.add("keyboard-navigation");

    }

});

/* ==========================================
   KLEINE HERO-ANIMATION
========================================== */

if (hero) {

    hero.animate(

        [

            {
                transform: "translateY(0px)"
            },

            {
                transform: "translateY(-8px)"
            },

            {
                transform: "translateY(0px)"
            }

        ],

        {

            duration: 5000,
            iterations: Infinity,
            easing: "ease-in-out"

        }

    );

}

/* ==========================================
   KONSOLE
========================================== */

console.log(
    "%c❤️ Happy Birthday Athanasia ❤️",
    "color:#d4af37;font-size:18px;font-weight:bold;"
);

console.log(
    "%cWebsite successfully loaded.",
    "color:#ffffff;"
);

/* ==========================================
   ENDE
========================================== */

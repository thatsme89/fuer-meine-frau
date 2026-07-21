/* ==========================================================
   PREMIUM LOVE WEBSITE
   Version 3.0
   Part 1 / 6
========================================================== */

"use strict";

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const body = document.body;

const loader = document.getElementById("loader");

const hero = document.querySelector(".hero");

const heroContent = document.querySelector(".hero-content");

const startButton = document.getElementById("startStory");

const envelopeSection = document.getElementById("envelopeSection");

const envelope = document.querySelector(".envelope");

const letterSection = document.getElementById("letterSection");

const revealElements = document.querySelectorAll(".reveal");

const progressBar = document.querySelector(".scroll-progress-bar");

const backToTop = document.getElementById("backToTop");

const floatingHearts = document.querySelector(".floating-hearts");

const cursorGlow = document.querySelector(".cursor-glow");

const background = document.querySelector(".background");

/* ==========================================================
   WEBSITE SETTINGS
========================================================== */

const SETTINGS = {

    loaderDuration: 1800,

    heroFadeDuration: 1200,

    envelopeOpenDelay: 1400,

    heartInterval: 2500,

    roseInterval: 7000,

    revealThreshold: 0.18,

    cursorEnabled: window.matchMedia("(pointer:fine)").matches,

    parallaxSpeed: 0.15,

    typingSpeed: 22,

    scrollButtonOffset: 700,

    starCount: 140

};

/* ==========================================================
   GLOBAL VARIABLES
========================================================== */

let heroStarted = false;

let envelopeOpened = false;

let typingRunning = false;

let animationFrame = null;

let stars = [];

let mouse = {

    x: window.innerWidth / 2,

    y: window.innerHeight / 2

};

/* ==========================================================
   HELPERS
========================================================== */

function random(min, max) {

    return Math.random() * (max - min) + min;

}

function clamp(value, min, max) {

    return Math.min(max, Math.max(min, value));

}

function lerp(start, end, amount) {

    return start + (end - start) * amount;

}

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

function scrollSmooth(element) {

    if (!element) return;

    element.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

/* ==========================================================
   LOADER
========================================================== */

window.addEventListener("load", async () => {

    await wait(SETTINGS.loaderDuration);

    body.classList.add("loaded");

    if (!loader) return;

    loader.animate(

        [

            {

                opacity: 1

            },

            {

                opacity: 0

            }

        ],

        {

            duration: 1000,

            easing: "ease",

            fill: "forwards"

        }

    );

    setTimeout(() => {

        loader.remove();

    }, 950);

});

/* ==========================================================
   HERO
========================================================== */

async function startStory() {

    if (heroStarted) return;

    heroStarted = true;

    hero.animate(

        [

            {

                opacity: 1,

                transform: "scale(1)"

            },

            {

                opacity: 0,

                transform: "scale(.95)"

            }

        ],

        {

            duration: SETTINGS.heroFadeDuration,

            easing: "ease-in-out",

            fill: "forwards"

        }

    );

    await wait(SETTINGS.heroFadeDuration);

    hero.style.display = "none";

    envelopeSection.classList.remove("is-hidden");

    scrollSmooth(envelopeSection);

}

if (startButton) {

    startButton.addEventListener(

        "click",

        startStory

    );

}

/* ==========================================================
   CURSOR POSITION
========================================================== */

document.addEventListener("mousemove", event => {

    mouse.x = event.clientX;

    mouse.y = event.clientY;

});

/* ==========================================================
   CURSOR GLOW
========================================================== */

if (cursorGlow && SETTINGS.cursorEnabled) {

    let currentX = mouse.x;

    let currentY = mouse.y;

    function animateCursor() {

        currentX = lerp(currentX, mouse.x, 0.15);

        currentY = lerp(currentY, mouse.y, 0.15);

        cursorGlow.style.left = currentX + "px";

        cursorGlow.style.top = currentY + "px";

        animationFrame = requestAnimationFrame(

            animateCursor

        );

    }

    animateCursor();

} else if (cursorGlow) {

    cursorGlow.remove();

}

/* ==========================================================
   WINDOW RESIZE
========================================================== */

window.addEventListener("resize", () => {

    updateProgress();

});

/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.log(

    "%c❤️ Premium Love Website ❤️",

    "color:#D4AF37;font-size:18px;font-weight:bold;"

);

console.log(

    "Created with love."

);

/* ==========================================================
   PART 1 END
========================================================== */
/* ==========================================================
   PART 2
   STARRY SKY + PARALLAX + SCROLL
========================================================== */

/* ==========================================================
   STAR CANVAS
========================================================== */

const starCanvas = document.createElement("canvas");

starCanvas.id = "starCanvas";

starCanvas.style.position = "fixed";
starCanvas.style.left = "0";
starCanvas.style.top = "0";
starCanvas.style.width = "100%";
starCanvas.style.height = "100%";
starCanvas.style.pointerEvents = "none";
starCanvas.style.zIndex = "-2";

document.body.prepend(starCanvas);

const ctx = starCanvas.getContext("2d");

let canvasWidth = 0;
let canvasHeight = 0;

function resizeCanvas() {

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    starCanvas.width = canvasWidth;
    starCanvas.height = canvasHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* ==========================================================
   STAR CLASS
========================================================== */

class Star {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = random(0, canvasWidth);

        this.y = random(0, canvasHeight);

        this.radius = random(.3, 2.2);

        this.alpha = random(.2, .9);

        this.speed = random(.002, .015);

        this.direction = Math.random() > .5 ? 1 : -1;

    }

    update() {

        this.alpha += this.speed * this.direction;

        if (this.alpha > 1) {

            this.direction = -1;

        }

        if (this.alpha < .15) {

            this.direction = 1;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI * 2

        );

        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;

        ctx.fill();

    }

}

/* ==========================================================
   CREATE STARS
========================================================== */

stars = [];

for (

    let i = 0;

    i < SETTINGS.starCount;

    i++

) {

    stars.push(

        new Star()

    );

}

/* ==========================================================
   SHOOTING STAR
========================================================== */

class ShootingStar {

    constructor() {

        this.reset();

    }

    reset() {

        this.active = false;

        this.x = random(0, canvasWidth);

        this.y = random(0, canvasHeight * .4);

        this.length = random(120, 260);

        this.speed = random(18, 28);

        this.opacity = 1;

    }

    launch() {

        this.active = true;

        this.x = random(

            canvasWidth * .3,

            canvasWidth

        );

        this.y = random(

            0,

            canvasHeight * .3

        );

        this.opacity = 1;

    }

    update() {

        if (!this.active) return;

        this.x -= this.speed;

        this.y += this.speed * .45;

        this.opacity -= .01;

        if (this.opacity <= 0) {

            this.reset();

        }

    }

    draw() {

        if (!this.active) return;

        ctx.beginPath();

        ctx.moveTo(

            this.x,

            this.y

        );

        ctx.lineTo(

            this.x + this.length,

            this.y - this.length * .45

        );

        ctx.strokeStyle =

            `rgba(255,255,255,${this.opacity})`;

        ctx.lineWidth = 2;

        ctx.stroke();

    }

}

const shootingStar = new ShootingStar();

/* ==========================================================
   RANDOM SHOOTING STAR
========================================================== */

setInterval(() => {

    if (

        !shootingStar.active &&

        Math.random() > .55

    ) {

        shootingStar.launch();

    }

}, 6000);

/* ==========================================================
   DRAW LOOP
========================================================== */

function drawStars() {

    ctx.clearRect(

        0,

        0,

        canvasWidth,

        canvasHeight

    );

    stars.forEach(star => {

        star.update();

        star.draw();

    });

    shootingStar.update();

    shootingStar.draw();

    requestAnimationFrame(

        drawStars

    );

}

drawStars();

/* ==========================================================
   BACKGROUND PARALLAX
========================================================== */

function updateBackground() {

    if (!background) return;

    const offset =

        window.scrollY *

        SETTINGS.parallaxSpeed;

    background.style.transform =

        `translateY(${offset}px)`;

}

/* ==========================================================
   SCROLL PROGRESS
========================================================== */

function updateProgress() {

    if (!progressBar) return;

    const maxScroll =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const percent =

        clamp(

            (window.scrollY / maxScroll) * 100,

            0,

            100

        );

    progressBar.style.width =

        percent + "%";

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function updateBackButton() {

    if (!backToTop) return;

    if (

        window.scrollY >

        SETTINGS.scrollButtonOffset

    ) {

        backToTop.classList.add("show");

    }

    else {

        backToTop.classList.remove("show");

    }

}

backToTop?.addEventListener(

    "click",

    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

);

/* ==========================================================
   GLOBAL SCROLL
========================================================== */

window.addEventListener(

    "scroll",

    () => {

        updateProgress();

        updateBackButton();

        updateBackground();

    },

    {

        passive: true

    }

);

updateProgress();

updateBackButton();

updateBackground();

/* ==========================================================
   PART 2 END
========================================================== */
/* ==========================================================
   PART 3
   ENVELOPE + TYPEWRITER + LOVE EFFECTS
========================================================== */

/* ==========================================================
   OPEN ENVELOPE
========================================================== */

async function openEnvelope() {

    if (envelopeOpened) return;

    envelopeOpened = true;

    envelope.classList.add("open");

    createHeartExplosion();

    envelope.animate(

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
            duration: 900,
            easing: "ease"
        }

    );

    await wait(

        SETTINGS.envelopeOpenDelay

    );

    letterSection.classList.remove(

        "is-hidden"

    );

    scrollSmooth(

        letterSection

    );

    startTypewriter();

}

if (envelope) {

    envelope.addEventListener(

        "click",

        openEnvelope

    );

    envelope.addEventListener(

        "keydown",

        event => {

            if (

                event.key === "Enter" ||

                event.key === " "

            ) {

                event.preventDefault();

                openEnvelope();

            }

        }

    );

}

/* ==========================================================
   HEART EXPLOSION
========================================================== */

function createHeartExplosion() {

    if (!floatingHearts) return;

    for (

        let i = 0;

        i < 35;

        i++

    ) {

        const heart =

            document.createElement("div");

        heart.className =

            "heart";

        heart.innerHTML =

            "❤";

        const angle =

            Math.random() *

            Math.PI *

            2;

        const distance =

            random(

                120,

                260

            );

        const x =

            Math.cos(angle) *

            distance;

        const y =

            Math.sin(angle) *

            distance;

        heart.style.left =

            "50%";

        heart.style.top =

            "50%";

        heart.style.position =

            "fixed";

        heart.style.fontSize =

            random(

                16,

                34

            ) + "px";

        heart.style.transition =

            "all 2s ease";

        floatingHearts.appendChild(

            heart

        );

        requestAnimationFrame(() => {

            heart.style.transform =

                `translate(${x}px,${y}px)
                 rotate(${random(-180,180)}deg)
                 scale(${random(.7,1.4)})`;

            heart.style.opacity =

                "0";

        });

        setTimeout(() => {

            heart.remove();

        }, 2200);

    }

}

/* ==========================================================
   TYPEWRITER
========================================================== */

function startTypewriter() {

    if (typingRunning) return;

    typingRunning = true;

    const paragraphs =

        letterSection.querySelectorAll(

            "p"

        );

    let delay = 0;

    paragraphs.forEach(

        paragraph => {

            const text =

                paragraph.textContent.trim();

            paragraph.textContent = "";

            setTimeout(() => {

                writeText(

                    paragraph,

                    text

                );

            }, delay);

            delay +=

                text.length *

                SETTINGS.typingSpeed +

                500;

        }

    );

}

/* ==========================================================
   WRITE TEXT
========================================================== */

function writeText(

    element,

    text

) {

    let index = 0;

    const timer =

        setInterval(() => {

            element.textContent +=

                text.charAt(index);

            index++;

            if (

                index >= text.length

            ) {

                clearInterval(timer);

            }

        },

        SETTINGS.typingSpeed

    );

}

/* ==========================================================
   LETTER GLOW
========================================================== */

const letter =

    document.querySelector(

        ".letter"

    );

if (letter) {

    letter.addEventListener(

        "mouseenter",

        () => {

            letter.animate(

                [

                    {

                        boxShadow:

                        "0 0 0 rgba(212,175,55,0)"

                    },

                    {

                        boxShadow:

                        "0 0 40px rgba(212,175,55,.35)"

                    },

                    {

                        boxShadow:

                        "0 0 15px rgba(212,175,55,.2)"

                    }

                ],

                {

                    duration: 1000,

                    fill: "forwards"

                }

            );

        }

    );

}

/* ==========================================================
   CONTINUE INDICATOR
========================================================== */

const continueArrow =

    document.querySelector(

        ".continue"

    );

if (continueArrow) {

    continueArrow.animate(

        [

            {

                transform:

                "translateY(0px)"

            },

            {

                transform:

                "translateY(12px)"

            },

            {

                transform:

                "translateY(0px)"

            }

        ],

        {

            duration: 1400,

            iterations: Infinity

        }

    );

}

/* ==========================================================
   PART 3 END
========================================================== */
/* ==========================================================
   PART 4
   PREMIUM REVEAL + ROSE PETALS + MOUSE PARTICLES
========================================================== */

/* ==========================================================
   REVEAL OBSERVER
========================================================== */

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;

            element.classList.add("visible");

            element.animate(

                [

                    {
                        opacity: 0,
                        transform: "translateY(80px) scale(.96)"
                    },

                    {
                        opacity: 1,
                        transform: "translateY(0px) scale(1)"
                    }

                ],

                {
                    duration: 1200,
                    easing: "cubic-bezier(.22,.61,.36,1)",
                    fill: "forwards"
                }

            );

            revealObserver.unobserve(element);

        });

    },

    {
        threshold: SETTINGS.revealThreshold
    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});

/* ==========================================================
   CHAPTER PARALLAX
========================================================== */

const chapters = document.querySelectorAll(

    ".chapter"

);

window.addEventListener(

    "scroll",

    () => {

        chapters.forEach(chapter => {

            const rect =

                chapter.getBoundingClientRect();

            const offset =

                rect.top * .05;

            chapter.style.transform =

                `translateY(${offset}px)`;

        });

    },

    {

        passive: true

    }

);

/* ==========================================================
   ROSE PETALS
========================================================== */

function createRosePetal() {

    const petal =

        document.createElement("div");

    petal.innerHTML = "🌹";

    petal.className =

        "rose-petal";

    petal.style.position =

        "fixed";

    petal.style.left =

        random(0,100)+"vw";

    petal.style.top =

        "-60px";

    petal.style.pointerEvents =

        "none";

    petal.style.fontSize =

        random(18,34)+"px";

    petal.style.opacity =

        random(.45,.9);

    petal.style.transition =

        "transform linear, opacity linear";

    petal.style.zIndex =

        "2";

    document.body.appendChild(

        petal

    );

    requestAnimationFrame(()=>{

        petal.style.transform=

        `translate(${random(-120,120)}px,

        ${window.innerHeight+150}px)

        rotate(${random(200,800)}deg)`;

        petal.style.opacity="0";

    });

    setTimeout(()=>{

        petal.remove();

    },9000);

}

setInterval(

    createRosePetal,

    SETTINGS.roseInterval

);

/* ==========================================================
   SCROLL HEARTS
========================================================== */

let lastHeartPosition = 0;

window.addEventListener(

    "scroll",

    () => {

        if(

            window.scrollY -

            lastHeartPosition <

            450

        ) return;

        lastHeartPosition =

            window.scrollY;

        spawnScrollHeart();

    },

    {

        passive:true

    }

);

function spawnScrollHeart(){

    if(!floatingHearts) return;

    const heart =

        document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=

        random(10,90)+"vw";

    heart.style.bottom=

        "-40px";

    heart.style.position="fixed";

    heart.style.fontSize=

        random(18,30)+"px";

    heart.style.opacity=.8;

    floatingHearts.appendChild(

        heart

    );

    heart.animate(

        [

            {

                transform:

                "translateY(0px) scale(.8)",

                opacity:.8

            },

            {

                transform:

                "translateY(-220px) scale(1.3)",

                opacity:0

            }

        ],

        {

            duration:2600,

            easing:"ease-out"

        }

    );

    setTimeout(()=>{

        heart.remove();

    },2600);

}

/* ==========================================================
   MOUSE SPARKLES
========================================================== */

if(SETTINGS.cursorEnabled){

document.addEventListener(

"mousemove",

event=>{

if(Math.random()>.35) return;

const sparkle=

document.createElement("div");

sparkle.innerHTML="✨";

sparkle.style.position="fixed";

sparkle.style.left=

event.clientX+"px";

sparkle.style.top=

event.clientY+"px";

sparkle.style.pointerEvents="none";

sparkle.style.fontSize=

random(10,18)+"px";

sparkle.style.zIndex="9999";

document.body.appendChild(

sparkle

);

sparkle.animate(

[

{

transform:

"translateY(0px) scale(1)",

opacity:1

},

{

transform:

`translateY(${random(-45,-70)}px)
translateX(${random(-15,15)}px)
scale(.2)`,

opacity:0

}

],

{

duration:900,

easing:"ease-out"

}

);

setTimeout(()=>{

sparkle.remove();

},900);

});

}

/* ==========================================================
   SIGNATURE REVEAL
========================================================== */

const signature =

document.querySelector(

".signature"

);

if(signature){

signature.style.opacity=0;

signature.style.transform=

"translateY(60px)";

const signatureObserver=

new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

signature.animate(

[

{

opacity:0,

transform:

"translateY(60px)"

},

{

opacity:1,

transform:

"translateY(0px)"

}

],

{

duration:1600,

fill:"forwards",

easing:"ease"

}

);

signatureObserver.disconnect();

});

},

{

threshold:.45

}

);

signatureObserver.observe(

signature

);

}

/* ==========================================================
   PART 4 END
========================================================== */
/* ==========================================================
   PART 5
   MUSIC + FINAL EFFECTS + CELEBRATION
========================================================== */

/* ==========================================================
   BACKGROUND MUSIC
========================================================== */

let backgroundMusic = null;
let musicStarted = false;

function createMusicPlayer() {

    backgroundMusic = document.createElement("audio");

    backgroundMusic.loop = true;

    backgroundMusic.preload = "auto";

    /*
       HIER DEINE DATEI EINTRAGEN

       Beispiel:

       backgroundMusic.src = "music/love.mp3";

    */

    backgroundMusic.volume = 0;

    document.body.appendChild(backgroundMusic);

}

createMusicPlayer();

function fadeInMusic() {

    if (!backgroundMusic) return;

    if (musicStarted) return;

    if (!backgroundMusic.src) return;

    musicStarted = true;

    backgroundMusic.play().catch(() => {});

    const interval = setInterval(() => {

        if (backgroundMusic.volume >= 0.35) {

            clearInterval(interval);

            return;

        }

        backgroundMusic.volume += 0.01;

    }, 150);

}

startButton?.addEventListener(

    "click",

    fadeInMusic

);

/* ==========================================================
   FINAL SECTION
========================================================== */

const endingSection = document.querySelector(".ending");

if (endingSection) {

    const endingObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                celebration();

                endingObserver.disconnect();

            });

        },

        {

            threshold: .55

        }

    );

    endingObserver.observe(endingSection);

}

/* ==========================================================
   CELEBRATION
========================================================== */

function celebration() {

    createFireworks();

    createLoveRain();

}

/* ==========================================================
   LOVE RAIN
========================================================== */

function createLoveRain() {

    let counter = 0;

    const rain = setInterval(() => {

        counter++;

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";

        heart.style.left = random(0,100)+"vw";

        heart.style.top = "-40px";

        heart.style.fontSize = random(18,38)+"px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "9999";

        document.body.appendChild(heart);

        heart.animate(

            [

                {

                    transform:"translateY(0px)",

                    opacity:1

                },

                {

                    transform:`translateY(${window.innerHeight+100}px)
                    rotate(${random(-180,180)}deg)`,

                    opacity:0

                }

            ],

            {

                duration:random(3500,6500),

                easing:"linear"

            }

        );

        setTimeout(()=>{

            heart.remove();

        },7000);

        if(counter>80){

            clearInterval(rain);

        }

    },120);

}

/* ==========================================================
   FIREWORKS
========================================================== */

function createFireworks(){

    for(

        let i=0;

        i<12;

        i++

    ){

        setTimeout(()=>{

            explode(

                random(20,80),

                random(15,70)

            );

        },i*350);

    }

}

function explode(x,y){

    for(

        let i=0;

        i<26;

        i++

    ){

        const spark=

        document.createElement("div");

        spark.innerHTML="✨";

        spark.style.position="fixed";

        spark.style.left=x+"vw";

        spark.style.top=y+"vh";

        spark.style.pointerEvents="none";

        spark.style.fontSize=

        random(12,22)+"px";

        spark.style.zIndex="99999";

        document.body.appendChild(spark);

        const angle=

        Math.random()*Math.PI*2;

        const distance=

        random(80,180);

        spark.animate(

        [

        {

        transform:"translate(0,0)",

        opacity:1

        },

        {

        transform:

        `translate(${Math.cos(angle)*distance}px,
        ${Math.sin(angle)*distance}px)`,

        opacity:0

        }

        ],

        {

        duration:1200,

        easing:"ease-out"

        }

        );

        setTimeout(()=>{

        spark.remove();

        },1200);

    }

}

/* ==========================================================
   FINAL SIGNATURE
========================================================== */

const signatureTitle = document.querySelector(".signature h2");

if(signatureTitle){

signatureTitle.animate(

[

{

transform:"scale(1)"

},

{

transform:"scale(1.08)"

},

{

transform:"scale(1)"

}

],

{

duration:2200,

iterations:Infinity

}

);

}

/* ==========================================================
   PART 5 END
========================================================== */
/* ==========================================================
   PART 6
   PERFORMANCE + MOBILE + EASTER EGGS + INITIALIZATION
========================================================== */

/* ==========================================================
   PERFORMANCE
========================================================== */

let ticking = false;

function onScrollOptimized() {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {

        updateProgress();

        updateBackButton();

        updateBackground();

        ticking = false;

    });

}

window.removeEventListener("scroll", updateProgress);

window.addEventListener(

    "scroll",

    onScrollOptimized,

    {

        passive: true

    }

);

/* ==========================================================
   MOBILE OPTIMIZATION
========================================================== */

const isMobile =

window.innerWidth < 768;

if (isMobile) {

    SETTINGS.starCount = 60;

    SETTINGS.heartInterval = 4500;

    SETTINGS.roseInterval = 12000;

}

/* ==========================================================
   REDUCE MOTION
========================================================== */

if (

window.matchMedia(

"(prefers-reduced-motion: reduce)"

).matches

) {

document.documentElement.classList.add(

"reduced-motion"

);

}

/* ==========================================================
   SECRET HEART
========================================================== */

let heartClicks = 0;

document.addEventListener(

"click",

event=>{

if(

event.target.closest(".signature")

){

heartClicks++;

}

if(

heartClicks===7

){

heartClicks=0;

secretHeart();

}

}

);

function secretHeart(){

const message=

document.createElement("div");

message.innerHTML=

"❤️ Σ' αγαπώ για πάντα ❤️";

message.style.position="fixed";

message.style.left="50%";

message.style.top="50%";

message.style.transform=

"translate(-50%,-50%)";

message.style.padding="25px 40px";

message.style.borderRadius="18px";

message.style.background=

"rgba(10,10,10,.92)";

message.style.color="#d4af37";

message.style.fontFamily=

"'Cormorant Garamond',serif";

message.style.fontSize="38px";

message.style.zIndex="999999";

message.style.boxShadow=

"0 0 60px rgba(212,175,55,.45)";

document.body.appendChild(

message

);

message.animate(

[

{

opacity:0,

transform:

"translate(-50%,-40%) scale(.8)"

},

{

opacity:1,

transform:

"translate(-50%,-50%) scale(1)"

}

],

{

duration:900,

fill:"forwards"

}

);

setTimeout(()=>{

message.animate(

[

{

opacity:1

},

{

opacity:0

}

],

{

duration:1200,

fill:"forwards"

}

);

setTimeout(()=>{

message.remove();

},1200);

},3500);

}

/* ==========================================================
   KEYBOARD SHORTCUT
========================================================== */

document.addEventListener(

"keydown",

event=>{

if(

event.key.toLowerCase()==="h"

){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

}

);

/* ==========================================================
   PAGE VISIBILITY
========================================================== */

document.addEventListener(

"visibilitychange",

()=>{

if(

!backgroundMusic

) return;

if(

document.hidden

){

backgroundMusic.pause();

}

else{

if(

musicStarted

){

backgroundMusic.play().catch(()=>{});

}

}

}

);

/* ==========================================================
   INITIALIZE
========================================================== */

updateProgress();

updateBackButton();

updateBackground();

/* ==========================================================
   FINAL MESSAGE
========================================================== */

console.log(

"%c❤️ Για πάντα μαζί Αθανασία ❤️",

"font-size:24px;color:#D4AF37;font-weight:bold;"

);

console.log(

"%cCreated with endless love.",

"color:#ffffff;font-size:14px;"

);

/* ==========================================================
   END OF FILE
========================================================== */

/*
=========================================
Για τη γυναίκα που άλλαξε τη ζωή μου
Premium Edition
=========================================
*/

"use strict";

/* =====================================
   ELEMENTS
===================================== */

const startButton = document.getElementById("startStory");

const envelopeSection = document.getElementById("envelopeSection");

const letterSection = document.getElementById("letterSection");

const loader = document.getElementById("loader");

const backToTop = document.getElementById("backToTop");

const progressBar = document.querySelector(".scroll-progress-bar");

const cursor = document.querySelector(".cursor-glow");

const envelope = document.querySelector(".envelope");

/* =====================================
   PAGE LOADER
===================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.remove();

        }, 1000);

    }, 1800);

});

/* =====================================
   START STORY
===================================== */

startButton.addEventListener("click", () => {

    envelopeSection.classList.remove("hidden");

    envelopeSection.scrollIntoView({

        behavior: "smooth"

    });

});

/* =====================================
   ENVELOPE
===================================== */

envelope.addEventListener("click", () => {

    envelope.style.transform =
        "scale(1.03) rotateX(8deg)";

    setTimeout(() => {

        letterSection.classList.remove("hidden");

        letterSection.scrollIntoView({

            behavior: "smooth"

        });

    }, 600);

});

/* =====================================
   SCROLL PROGRESS
===================================== */

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent =
        (scrollTop / height) * 100;

    progressBar.style.width = percent + "%";

});

/* =====================================
   BACK TO TOP
===================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 800) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
    <!-- ========================================= -->
    <!-- Promise -->
    <!-- ========================================= -->

    <section class="promise">

        <div class="promise-content">

            <span class="chapter-subtitle">

                Μια υπόσχεση

            </span>

            <h2>

                Δεν ξέρω τι μας επιφυλάσσει το μέλλον.

            </h2>

            <div class="chapter-divider"></div>

            <p>

                Η ζωή δεν είναι πάντα εύκολη.

            </p>

            <p>

                Θα υπάρξουν όμορφες στιγμές.

            </p>

            <p>

                Θα υπάρξουν και δύσκολες.

            </p>

            <p>

                Όμως υπάρχει κάτι
                που δεν θα αλλάξει ποτέ.

            </p>

            <blockquote>

                Θα είμαι πάντα δίπλα σου.

            </blockquote>

            <p>

                Στις χαρές.

            </p>

            <p>

                Στις δυσκολίες.

            </p>

            <p>

                Στα όνειρά μας.

            </p>

            <p>

                Και σε κάθε νέο κεφάλαιο
                που θα γράψει η ζωή μας.

            </p>

        </div>

    </section>



    <!-- ========================================= -->
    <!-- Final Letter -->
    <!-- ========================================= -->

    <section class="final-letter">

        <div class="letter-wrapper">

            <h2>

                Αν μπορούσα να γυρίσω τον χρόνο πίσω...

            </h2>

            <p>

                Θα σε διάλεγα ξανά.

            </p>

            <p>

                Χωρίς δεύτερη σκέψη.

            </p>

            <p>

                Χωρίς κανέναν δισταγμό.

            </p>

            <p>

                Κάθε φορά.

            </p>

            <div class="chapter-divider"></div>

            <p class="big-text">

                Γιατί δεν είσαι απλώς
                η γυναίκα μου.

            </p>

            <p class="big-text">

                Είσαι ο άνθρωπός μου.

            </p>

        </div>

    </section>



    <!-- ========================================= -->
    <!-- Ending -->
    <!-- ========================================= -->

    <section class="ending">

        <div class="ending-content">

            <p>

                Ευχαριστώ...

            </p>

            <p>

                γιατί εκείνη τη μέρα
                στο Hotel Kanali

            </p>

            <p>

                δεν ξεκίνησε απλώς
                μια γνωριμία.

            </p>

            <p class="quote">

                Ξεκίνησε η ζωή
                που πάντα ονειρευόμουν.

            </p>

            <div class="signature">

                <span>

                    Με όλη μου την αγάπη,

                </span>

                <h2>

                    Χαράλαμπος ❤️

                </h2>

            </div>

        </div>

    </section>



    <!-- ========================================= -->
    <!-- Footer -->
    <!-- ========================================= -->

    <footer>

        <p>

            Για πάντα μαζί.

        </p>

    </footer>
/* =====================================
   SMOOTH SECTION ANIMATIONS
===================================== */

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.animate([

                {
                    opacity:0,
                    transform:"translateY(60px)"
                },

                {
                    opacity:1,
                    transform:"translateY(0)"
                }

            ],{

                duration:1000,
                easing:"ease-out",
                fill:"forwards"

            });

        }

    });

},

{
    threshold:0.15
}

);

sections.forEach(section=>{

    sectionObserver.observe(section);

});

/* =====================================
   FLOATING HEARTS
===================================== */

const heartsContainer=document.querySelector(".floating-hearts");

function createHeart(){

    const heart=document.createElement("span");

    heart.innerHTML="❤";

    heart.style.position="absolute";

    heart.style.left=Math.random()*100+"vw";

    heart.style.bottom="-50px";

    heart.style.opacity=Math.random()*0.6+0.2;

    heart.style.fontSize=(Math.random()*18+12)+"px";

    heart.style.color="rgba(212,175,55,.6)";

    heart.style.transition="transform linear";

    heartsContainer.appendChild(heart);

    const duration=Math.random()*6000+6000;

    heart.animate(

    [

        {
            transform:"translateY(0px)"
        },

        {
            transform:"translateY(-120vh)"
        }

    ],

    {

        duration:duration,

        easing:"linear"

    }

    );

    setTimeout(()=>{

        heart.remove();

    },duration);

}

setInterval(createHeart,2500);

/* =====================================
   GOLD GLOW ON TITLES
===================================== */

const titles=document.querySelectorAll("h1,h2");

titles.forEach(title=>{

    title.addEventListener("mouseenter",()=>{

        title.style.textShadow=
        "0 0 25px rgba(212,175,55,.45)";

    });

    title.addEventListener("mouseleave",()=>{

        title.style.textShadow="none";

    });

});

/* =====================================
   RANDOM STAR TWINKLE
===================================== */

const stars=document.getElementById("stars");

setInterval(()=>{

    stars.style.opacity=0.35+Math.random()*0.35;

},1800);

/* =====================================
   LETTER FADE
===================================== */

const letter=document.querySelector(".letter");

const letterObserver=new IntersectionObserver(

(entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            letter.animate([

                {

                    opacity:0,

                    transform:"scale(.96)"

                },

                {

                    opacity:1,

                    transform:"scale(1)"

                }

            ],{

                duration:1200,

                fill:"forwards"

            });

        }

    });

},

{

    threshold:.4

}

);

letterObserver.observe(letter);

/* =====================================
   QUALITY CARDS STAGGER
===================================== */

cards.forEach((card,index)=>{

    card.style.transitionDelay=(index*120)+"ms";

});

/* =====================================
   SCROLL END MESSAGE
===================================== */

window.addEventListener("scroll",()=>{

    const scrollHeight=document.documentElement.scrollHeight;

    const current=window.innerHeight+window.scrollY;

    if(current>=scrollHeight-20){

        console.log("❤️ Thank you for reading our story.");

    }

});
/* =====================================
   INITIAL ANIMATIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");

});

/* =====================================
   PARALLAX HERO
===================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const offset = window.scrollY;

    if (hero) {

        hero.style.transform = `translateY(${offset * 0.15}px)`;

    }

});

/* =====================================
   GOLD PULSE
===================================== */

setInterval(() => {

    document.querySelectorAll(".chapter-divider").forEach((divider) => {

        divider.animate(
            [
                {
                    opacity: 0.5,
                    transform: "scaleX(0.9)"
                },
                {
                    opacity: 1,
                    transform: "scaleX(1.1)"
                },
                {
                    opacity: 0.5,
                    transform: "scaleX(0.9)"
                }
            ],
            {
                duration: 3500,
                easing: "ease-in-out"
            }
        );

    });

}, 4000);

/* =====================================
   SMOOTH APPEAR FOR PARAGRAPHS
===================================== */

const paragraphs = document.querySelectorAll("p");

const paragraphObserver = new IntersectionObserver(

(entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.animate(

                [

                    {
                        opacity:0,
                        transform:"translateY(25px)"
                    },

                    {
                        opacity:1,
                        transform:"translateY(0)"
                    }

                ],

                {

                    duration:800,

                    easing:"ease-out",

                    fill:"forwards"

                }

            );

            paragraphObserver.unobserve(entry.target);

        }

    });

},

{

    threshold:0.15

}

);

paragraphs.forEach((p)=>{

    paragraphObserver.observe(p);

});

/* =====================================
   RANDOM GOLD SHIMMER
===================================== */

setInterval(()=>{

    document.querySelectorAll(".quality-card").forEach((card)=>{

        if(Math.random() > 0.8){

            card.animate(

                [

                    {
                        boxShadow:"0 20px 45px rgba(0,0,0,.30)"
                    },

                    {
                        boxShadow:"0 0 35px rgba(212,175,55,.25)"
                    },

                    {
                        boxShadow:"0 20px 45px rgba(0,0,0,.30)"
                    }

                ],

                {

                    duration:1800

                }

            );

        }

    });

},5000);

/* =====================================
   MOBILE TOUCH EFFECT
===================================== */

if(window.innerWidth < 900){

    document.querySelectorAll(".quality-card").forEach((card)=>{

        card.addEventListener("touchstart",()=>{

            card.style.transform="scale(1.02)";

        });

        card.addEventListener("touchend",()=>{

            card.style.transform="scale(1)";

        });

    });

}

/* =====================================
   END
===================================== */

console.log("%c❤️ Για την Αθανασία ❤️",
"color:#d4af37;font-size:22px;font-weight:bold;");

console.log("Created with love by Charalampos ❤️");

/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){

    menuBtn.addEventListener("click", () => {

        if(navLinks.style.display === "flex"){

            navLinks.style.display = "none";

        }else{

            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
        }

    });

}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }else{

            entry.target.classList.remove("show");
        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
".feature-card,.course-card,.review-card,.about-content,.about-image,.stat-box"
).forEach((el)=>{

    el.classList.add("hidden");
    observer.observe(el);

});

/* =========================
   STATS COUNTER ANIMATION
========================= */

function runCounter(){

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = parseInt(counter.dataset.target);

        let current = 0;

        const speed = target / 180;

        const updateCounter = () => {

            current += speed;

            if(current < target){

                counter.innerHTML = Math.floor(current);

                counter.classList.add("counter-animate");

                setTimeout(() => {
                    counter.classList.remove("counter-animate");
                },100);

                requestAnimationFrame(updateCounter);

            }else{

                if(target === 95){

                    counter.innerHTML = target + "%";

                }else{

                    counter.innerHTML =
                    target.toLocaleString() + "+";
                }
            }
        };

        updateCounter();

    });

}

/* =========================
   START COUNTER ON SCROLL
========================= */

const statsSection =
document.querySelector(".stats");

if(statsSection){

    const statsObserver =
    new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            runCounter();

            statsObserver.disconnect();
        }

    },{
        threshold:0.4
    });

    statsObserver.observe(statsSection);

}

document.addEventListener("DOMContentLoaded", () => {

    console.log("404 Page Loaded - Page Not Found");

    // 🎯 Optional: Auto redirect after 10 seconds
    // (uncomment if you want auto go home)
    /*
    setTimeout(() => {
        window.location.href = "index.html";
    }, 10000);
    */

    // 🎯 Button click effect (extra smooth feel)
    const btn = document.querySelector(".btn");

    if (btn) {
        btn.addEventListener("click", (e) => {

            // small animation effect before redirect
            btn.style.transform = "scale(0.9)";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 200);
        });
    }

});
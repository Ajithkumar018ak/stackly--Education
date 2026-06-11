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

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach((el) => {
        let top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {
            el.classList.add("active");
        }
    });
});

/* =========================
   OPEN / CLOSE MODAL
========================= */

function openAuth(){
  document.getElementById("loginModal").classList.add("show");
}

function closeAuth(){
  document.getElementById("loginModal").classList.remove("show");
}

/* =========================
   SHOW SECTIONS
========================= */

function showLogin(){
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("forgotBox").style.display = "none";
}

function showSignup(){
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
  document.getElementById("forgotBox").style.display = "none";
}

function showForgot(){
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("forgotBox").style.display = "block";
}

/* =========================
   SIGNUP (SAVE USER)
========================= */

function signupUser(){

  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  let role = document.getElementById("signupRole").value;

  let user = {
    name: name,
    email: email,
    password: password,
    role: role
  };

  localStorage.setItem(email, JSON.stringify(user));

  alert("Account Created Successfully!");

  showLogin();
}

/* =========================
   LOGIN (NO VALIDATION)
========================= */

function loginUser(){

  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  let role = document.getElementById("loginRole").value;

  // ❌ NO CHECK (everyone allowed)
  let user = {
    email: email,
    password: password,
    role: role,
    loginTime: new Date()
  };

  localStorage.setItem("currentUser", JSON.stringify(user));



  closeAuth();

  // 🔥 DASHBOARD REDIRECT
  if(role === "student"){
    window.location.href = "student-dashboard.html";
  } else {
    window.location.href = "admin-dashboard.html";
  }
}

/* =========================
   FORGOT PASSWORD
========================= */

function forgotPassword(){

  let email = document.getElementById("forgotEmail").value;

  let user = JSON.parse(localStorage.getItem(email));

  if(user){
    alert("Reset link sent to " + email + " (demo only)");
  } else {
    alert("User not found");
  }
}

/* =========================
   AUTO OPEN / INIT
========================= */

window.onload = function(){
  showLogin();
};

let user = JSON.parse(localStorage.getItem("currentUser"));

window.onload = function(){

    if(user){
        document.getElementById("userName").innerText = user.name;
        document.getElementById("userEmail").innerText = user.email;
        document.getElementById("welcome").innerText = "Welcome " + user.name + " 👨‍🎓";
    }

    showSection("home");
};

function showSection(id){

    let sections = document.querySelectorAll(".section");

    sections.forEach(s => {
        s.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");

    document.querySelectorAll(".sidebar a").forEach(a=>{
        a.classList.remove("active");
    });

    if(event){
        event.target.classList.add("active");
    }
}

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function joinClass(){
    window.open("https://meet.google.com", "_blank");
}

function goDashboard(){
    window.location.href = "student-dashboard.html";
}

function toggleMenu(){
    document.querySelector(".nav-right").classList.toggle("active");
}

// ================= SHOW SECTION =================
function showSection(id, event){

    // hide all sections
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.add("hidden");
    });

    // show selected section
    let target = document.getElementById(id);
    if(target){
        target.classList.remove("hidden");
    }

    // remove active class
    document.querySelectorAll(".sidebar a").forEach(a => {
        a.classList.remove("active");
    });

    // add active class to clicked menu
    if(event && event.target){
        event.target.classList.add("active");
    }
}

// ================= DASHBOARD LOGO =================
function goDashboard(){
    showSection("home");
}

// ================= DEFAULT LOAD =================
window.onload = function(){
    showSection("home");
};

function toggleMenu(){
    document.querySelector(".sidebar").classList.toggle("active");
    document.querySelector(".overlay").classList.toggle("active");
}

// close when click overlay
function closeMenu(){
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector(".overlay").classList.remove("active");
}

// auto close on menu click (mobile UX)
document.querySelectorAll(".sidebar a").forEach(link=>{
    link.addEventListener("click", ()=>{
        if(window.innerWidth <= 768){
            closeMenu();
        }
    });
});

// STATS + PROCESS + BENEFITS TEXT ANIMATION

const texts = document.querySelectorAll(
`
.stat-box h2,
.stat-box p,
.process h2,
.step h3,
.step p,
.benefits h2,
.benefit-list div
`
);

texts.forEach(el => {
    el.classList.add("animate-text","text-in");
});

setInterval(() => {

    texts.forEach(el => {

        el.classList.remove("text-in");
        el.classList.add("text-out");

        setTimeout(() => {
            el.classList.remove("text-out");
            el.classList.add("text-in");
        }, 800);

    });

}, 3000);

function goDashboard() {
    window.location.href = "student-dashboard.html";
}

function goDashboard() {
    window.location.href = "admin-dashboard.html";
}
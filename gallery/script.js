const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

/* ==========================
   CANVAS SIZE
========================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* ==========================
   MOUSE
========================== */

const mouse = {

    x: undefined,
    y: undefined,
    radius: 180

};

window.addEventListener(
    "mousemove",
    function(e){

        mouse.x = e.clientX;
        mouse.y = e.clientY;

    }
);

window.addEventListener(
    "mouseleave",
    function(){

        mouse.x = undefined;
        mouse.y = undefined;

    }
);

/* ==========================
   PARTICLE CLASS
========================== */

class Particle{

    constructor(){

        this.x =
        Math.random() * canvas.width;

        this.y =
        Math.random() * canvas.height;

        this.size =
        Math.random() * 3 + 2;

        this.speedX =
        (Math.random() - 0.5) * 0.8;

        this.speedY =
        (Math.random() - 0.5) * 0.8;

    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width){

            this.speedX *= -1;

        }

        if(this.y < 0 || this.y > canvas.height){

            this.speedY *= -1;

        }

        if(
            mouse.x &&
            mouse.y
        ){

            const dx =
            mouse.x - this.x;

            const dy =
            mouse.y - this.y;

            const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

            if(distance < mouse.radius){

                const force =
                (mouse.radius - distance)
                /
                mouse.radius;

                this.x -=
                dx * force * 0.02;

                this.y -=
                dy * force * 0.02;

            }

        }

    }

    draw(){

        /* Glow */

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size * 5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        "rgba(59,130,246,0.05)";

        ctx.fill();

        /* Core */

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        "rgba(37,99,235,0.75)";

        ctx.fill();

    }

}

/* ==========================
   CREATE PARTICLES
========================== */

const particles = [];

const totalParticles = 80;

for(let i=0;i<totalParticles;i++){

    particles.push(
        new Particle()
    );

}

/* ==========================
   CONNECTION LINES
========================== */

function connectParticles(){

    for(
        let a=0;
        a<particles.length;
        a++
    ){

        for(
            let b=a;
            b<particles.length;
            b++
        ){

            const dx =
            particles[a].x -
            particles[b].x;

            const dy =
            particles[a].y -
            particles[b].y;

            const distance =
            Math.sqrt(
                dx*dx +
                dy*dy
            );

            if(distance < 130){

                const opacity =
                (130 - distance)
                /
                130;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.strokeStyle =
                `rgba(
                    37,
                    99,
                    235,
                    ${opacity * 0.18}
                )`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }

}

/* ==========================
   CURSOR GLOW
========================== */

function drawCursorGlow(){

    if(
        mouse.x === undefined
        ||
        mouse.y === undefined
    ){
        return;
    }

    const gradient =
    ctx.createRadialGradient(

        mouse.x,
        mouse.y,
        0,

        mouse.x,
        mouse.y,
        180

    );

    gradient.addColorStop(
        0,
        "rgba(59,130,246,0.18)"
    );

    gradient.addColorStop(
        1,
        "rgba(59,130,246,0)"
    );

    ctx.beginPath();

    ctx.arc(
        mouse.x,
        mouse.y,
        180,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
    gradient;

    ctx.fill();

}

/* ==========================
   ANIMATION LOOP
========================== */

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawCursorGlow();

    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );

    connectParticles();

    requestAnimationFrame(
        animate
    );

}

animate();

/* ==========================
   COMING SOON POPUP MODAL
   ========================== */
window.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("comingSoonModal");
    const closeBtn = document.getElementById("closeModalBtn");

    if (modal && closeBtn) {
        setTimeout(() => {
            modal.classList.add("active");
        }, 3000);

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        // Also close if clicked outside the card
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }

    /* ==========================
       GALLERY SEARCH
       ========================== */
    const gallerySearch = document.getElementById("gallerySearchInput");
    const galleryNoResults = document.getElementById("galleryNoResults");
    const allCards = document.querySelectorAll(".post-card");

    if (gallerySearch) {
        gallerySearch.addEventListener("input", () => {
            const q = gallerySearch.value.trim().toLowerCase();
            let visible = 0;

            allCards.forEach(card => {
                const title = (card.dataset.title || "").toLowerCase();
                if (!q || title.includes(q)) {
                    card.style.display = "";
                    visible++;
                } else {
                    card.style.display = "none";
                }
            });

            if (galleryNoResults) {
                galleryNoResults.style.display = (visible === 0) ? "block" : "none";
            }
        });
    }
});
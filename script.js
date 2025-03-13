const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "styles.css?v=" + new Date().getTime();
document.head.appendChild(link);

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
    }

function drawBackground() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const shades = ["#FFFFBB", "#FFFFCC", "#FFFFDD", "#FFFFEE", "#FFFFFF"];

    for (let i = 0; i < 500; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 3;
        let randomColor = shades[Math.floor(Math.random() * shades.length)];
        
        ctx.fillStyle = randomColor;
        ctx.fillRect(x, y, size, size);
    }
}


    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});

function fetchSlurs() {
    console.log("die");
            const messages = [
                "...Meow",
                "Get zingooned",
                "avada kedavra",
                "You will be burned alive"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            document.getElementById("message").textContent = randomMessage;
        }

function zoomToSection(sectionId) {
    console.log("FUCK");
    const currentSection = document.querySelector(".active");
    const targetSection = document.getElementById(sectionId);

    if (currentSection !== targetSection) {
        currentSection.classList.remove("active");
        currentSection.classList.add("hidden");

        setTimeout(() => {
            // zoom in and shit
            targetSection.classList.remove("hidden");
            targetSection.classList.add("active");
        }, 1500); // wait four years
    }
}

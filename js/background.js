let animationId;
let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

let stars = [];
let twinklingStars = [];
let mouseTrail = [];
let mouseX = 0, mouseY = 0;

function initBackground() {
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateStarfield();
    }

    function generateStarfield() {
        stars = [];
        twinklingStars = [];
        const shades = ["#FFFFBB", "#FFFFCC", "#FFFFDD", "#FFFFEE", "#FFFFFF"];
        
        for (let i = 0; i < 800; i++) {
            const size = Math.random() < 0.1 ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5;
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: size,
                color: shades[Math.floor(Math.random() * shades.length)],
                opacity: Math.random() * 0.6 + 0.4
            });
        }
        
        for (let i = 0; i < 15; i++) {
            twinklingStars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1.5,
                color: shades[Math.floor(Math.random() * shades.length)],
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.015 + 0.008
            });
        }
    }

    function drawStaticBackground() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.save();
            ctx.globalAlpha = star.opacity;
            ctx.fillStyle = star.color;
            
            ctx.beginPath();
            ctx.arc(star.x + star.size/2, star.y + star.size/2, star.size/2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
    }

    function animateTwinkling(currentTime) {
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= frameInterval) {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.save();
                ctx.globalAlpha = star.opacity;
                ctx.fillStyle = star.color;
                
                ctx.beginPath();
                ctx.arc(star.x + star.size/2, star.y + star.size/2, star.size/2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
            
            twinklingStars.forEach(star => {
                const twinkle = Math.sin(currentTime * star.speed + star.phase) * 0.5 + 0.5;
                const opacity = twinkle * 0.6 + 0.4;
                const size = star.size + twinkle * 1.5;
                
                ctx.save();
                ctx.globalAlpha = opacity;
                ctx.fillStyle = star.color;
                
                ctx.shadowBlur = twinkle * 3;
                ctx.shadowColor = star.color;
                
                ctx.beginPath();
                ctx.arc(star.x + star.size/2, star.y + star.size/2, size/2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
            
            drawMouseTrail();
            
            lastTime = currentTime;
        }
        
        animationId = requestAnimationFrame(animateTwinkling);
    }

    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    function drawMouseTrail() {
        if (mouseTrail.length < 2) return;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 174, 66, 0.3)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();

        for (let i = 0; i < mouseTrail.length - 1; i++) {
            const current = mouseTrail[i];
            const next = mouseTrail[i + 1];
            const age = Date.now() - current.timestamp;
            const opacity = Math.max(0, 1 - age / 1000);

            ctx.strokeStyle = `rgba(255, 174, 66, ${opacity * 0.3})`;
            ctx.lineWidth = 2 * opacity;

            if (i === 0) {
                ctx.moveTo(current.x, current.y);
            } else {
                ctx.lineTo(current.x, current.y);
            }
        }

        ctx.stroke();
        ctx.restore();
    }

    function addButtonEffects() {
        const buttons = document.querySelectorAll('.nav-button, .pixel-shit-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        mouseTrail.push({
            x: mouseX,
            y: mouseY,
            timestamp: Date.now()
        });

        if (mouseTrail.length > 10) {
            mouseTrail.shift();
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    createFloatingParticles();
    addButtonEffects();
    animateTwinkling(0);
} 
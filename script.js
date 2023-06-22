const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const particleCount = 250;
const particlesPerSecond = 100;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate random character
function getRandomCharacter() {
    const characters = '!@#$%^&*';
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.character = getRandomCharacter();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.font = this.size + '0.5em Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(this.character, this.x, this.y);
    }
}

// Create particles
function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

// Add new particles
function addParticles() {
    for (let i = 0; i < particlesPerSecond; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

// Render particles
function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(renderParticles);
}

// Resize canvas on window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize and start animation
createParticles();
renderParticles();

// Add new particles every 1000 / particlesPerSecond milliseconds
setInterval(addParticles, 5000 / particlesPerSecond);
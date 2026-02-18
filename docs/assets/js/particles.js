const canvas = document.getElementById('canvas-particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center of rotation (Simulating looking North/South)
let centerX = canvas.width / 2;
let centerY = canvas.height * 2; // Move center far down to create big arc movement

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height * 2;
    init(); // Re-init to adjust scales if needed
});

// Particle (Star) Class
class Particle {
    constructor(angle, radius, size, isSpecial = false, color = '#ffffff') {
        this.angle = angle; // Position in radians around the center
        this.radius = radius; // Distance from center
        this.baseSize = size;
        this.size = size;
        this.isSpecial = isSpecial;
        this.color = color;
        this.opacity = isSpecial ? 1 : Math.random() * 0.5 + 0.3;

        // Update initial x,y
        this.updatePosition();
    }

    updatePosition() {
        this.x = centerX + Math.cos(this.angle) * this.radius;
        this.y = centerY + Math.sin(this.angle) * this.radius;
    }

    draw() {
        // Don't draw if off screen with margin
        if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) return;

        ctx.beginPath();
        // Draw star
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

        if (this.isSpecial) {
            ctx.shadowBlur = 40;
            ctx.shadowColor = '#fbbf24'; // Gold glow
            ctx.fillStyle = '#fbbf24';
        } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update() {
        this.angle -= 0.0002; // Slow rotation speed
        this.updatePosition();

        if (this.isSpecial) {
            this.size = this.baseSize + Math.sin(Date.now() * 0.003) * 1.5;
        }

        this.draw();
    }
}

// More "Real-ish" Constellation Patterns
const constellations = [
    { // Big Dipper (Ursa Major)
        name: 'Big Dipper',
        stars: [{ x: 0, y: 0 }, { x: 2, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 3.5 }, { x: 8, y: 3 }, { x: 8, y: 5.5 }, { x: 5, y: 6 }]
    },
    { // Cassiopeia (The W)
        name: 'Cassiopeia',
        stars: [{ x: 0, y: 4 }, { x: 2, y: 0 }, { x: 5, y: 2 }, { x: 7, y: 0 }, { x: 9, y: 3 }]
    },
    { // Orion (Main body)
        name: 'Orion',
        stars: [{ x: 2, y: 0 }, { x: 5, y: 0 }, { x: 2.5, y: 3 }, { x: 3.5, y: 3 }, { x: 4.5, y: 3 }, { x: 2, y: 6 }, { x: 5, y: 6 }]
    },
    { // Cygnus (The Cross)
        name: 'Cygnus',
        stars: [{ x: 4, y: 0 }, { x: 4, y: 2 }, { x: 4, y: 4 }, { x: 4, y: 6 }, { x: 1, y: 3 }, { x: 7, y: 3 }]
    },
    { // Leo (Sickle)
        name: 'Leo',
        stars: [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 0, y: 5 }, { x: -2, y: 3 }, { x: -1, y: 0 }]
    },
    { // Scorpius (Hook)
        name: 'Scorpius',
        stars: [{ x: 0, y: 0 }, { x: 2, y: 1 }, { x: 4, y: 2 }, { x: 6, y: 4 }, { x: 6, y: 6 }, { x: 4, y: 7 }, { x: 2, y: 6 }]
    },
    { // Gemini (The Twins)
        name: 'Gemini',
        stars: [{ x: 0, y: 0 }, { x: 0, y: 6 }, { x: 3, y: 6 }, { x: 3, y: 0 }]
    },
    { // Triangle
        name: 'Triangle',
        stars: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 2, y: 4 }]
    }
];

// Helper to add a specific constellation at a position in the sky
function addConstellation(constellationData, angleOffset, radiusBase) {
    const scale = 20; // Slightly smaller scale to fit more

    const constellationParticles = [];

    constellationData.stars.forEach(star => {
        let r = radiusBase - (star.y * scale);
        // Normalize angle scaling based on radius
        let a = angleOffset + (star.x * scale / r);

        particlesArray.push(new Particle(a, r, Math.random() * 1.5 + 1.5));
        constellationParticles.push(particlesArray[particlesArray.length - 1]);
    });

    return constellationParticles;
}

let constellationGroups = [];

function init() {
    particlesArray = [];
    constellationGroups = [];

    // 1. Create the Special "Barbate" Star
    // Position it centrally overhead
    let barbateRadius = canvas.height * 1.5;
    let barbateAngle = -Math.PI / 2;
    let barbateStar = new Particle(barbateAngle, barbateRadius, 6, true);
    particlesArray.push(barbateStar);

    // 2. Add MANY constellations
    // We create multiple "rings" or bands of radius to fill the sky depth
    let rings = 4;
    for (let r = 0; r < rings; r++) {
        // Radius band: starts from just inside canvas top, out to further away
        let baseR = canvas.height + (canvas.height * (r / rings));

        let constellationsInRing = 6; // How many per ring
        for (let i = 0; i < constellationsInRing; i++) {
            let type = constellations[Math.floor(Math.random() * constellations.length)];

            // Random jitter in angle
            let angle = -Math.PI + (Math.PI * 2 * (i / constellationsInRing)) + (Math.random() * 0.2);
            // Random jitter in radius
            let radius = baseR + (Math.random() * 200);

            let group = addConstellation(type, angle, radius);
            constellationGroups.push(group);
        }
    }

    // 3. Add random filler stars
    for (let i = 0; i < 80; i++) {
        let angle = Math.random() * Math.PI * 2;
        let radius = canvas.height * 0.8 + (Math.random() * canvas.height * 1.5);
        particlesArray.push(new Particle(angle, radius, Math.random() * 1.5 + 0.5));
    }
}

// Custom Draw Connections function
function drawConnections() {
    // 1. Draw persistent lines for Constellation Groups
    constellationGroups.forEach(group => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (group.length > 0) {
            // Check if first star is broadly on screen to optimize
            // but we need to draw even if partially off screen.

            ctx.moveTo(group[0].x, group[0].y);
            for (let i = 1; i < group.length; i++) {
                let dx = group[i].x - group[i - 1].x;
                let dy = group[i].y - group[i - 1].y;
                // Avoid connecting wrapped stars (geometry failsafe)
                if (dx * dx + dy * dy < 40000) {
                    ctx.lineTo(group[i].x, group[i].y);
                } else {
                    ctx.moveTo(group[i].x, group[i].y);
                }
            }
        }
        ctx.stroke();
    });

    // 2. Draw dynamic lines TO the Barbate star from nearby stars
    const barbate = particlesArray.find(p => p.isSpecial);
    if (barbate) {
        particlesArray.forEach(p => {
            if (p === barbate) return;
            let dx = p.x - barbate.x;
            let dy = p.y - barbate.y;
            let dist = dx * dx + dy * dy;

            if (dist < 100000) {
                let opacity = 1 - (dist / 100000);
                ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(barbate.x, barbate.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => p.update());
    drawConnections();
}

init();
animate();

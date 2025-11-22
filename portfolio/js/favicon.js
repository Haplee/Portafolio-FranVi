document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('favicon-canvas');
    const ctx = canvas.getContext('2d');
    const link = document.querySelector("link[rel*='icon']");

    if (!canvas || !ctx || !link) {
        return;
    }

    let angle = 0;

    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, 32, 32);

        // Draw a circle that changes color
        const hue = (angle * 60) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(16, 16, 12, 0, Math.PI * 2);
        ctx.fill();

        // Add a "J" in the center
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px "Poppins", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('J', 16, 17);

        // Update the favicon
        link.href = canvas.toDataURL('image/png');
    }

    function animate() {
        angle += 0.05;
        draw();
        requestAnimationFrame(animate);
    }

    animate();
});

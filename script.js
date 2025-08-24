// This file contains the JavaScript code that implements the heart tree animation.
// It handles the animation logic, such as creating and animating the heart shapes to simulate blooming.

document.addEventListener("DOMContentLoaded", () => {
    const heartContainer = document.createElement('div');
    heartContainer.classList.add('heart-container');
    document.body.appendChild(heartContainer);

    const createHeart = () => {
        const heart = document.createElement('img');
        heart.src = 'assets/hearts.svg';
        heart.classList.add('heart');
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.opacity = 0;

        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.style.opacity = 1;
            heart.style.transform = 'scale(1.5)';
            heart.style.transition = 'transform 1s ease, opacity 1s ease';
        }, 100);

        setTimeout(() => {
            heart.style.transform = 'scale(0)';
            heart.style.opacity = 0;
            setTimeout(() => {
                heartContainer.removeChild(heart);
            }, 1000);
        }, 2000);
    };

    setInterval(createHeart, 500);
});

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heartTree');
    const showLetterBtn = document.getElementById('showLetterBtn');
    const cartaOverlay = document.getElementById('cartaOverlay');

    // Árbol de corazones animado en canvas
    if (canvas) {
        const ctx = canvas.getContext('2d');
        function drawBranch(x, y, angle, depth, maxDepth) {
            if (depth === 0) return;
            const len = 32 + Math.random() * 10;
            const x2 = x + len * Math.cos(angle);
            const y2 = y + len * Math.sin(angle);

            ctx.strokeStyle = '#8B5C2A';
            ctx.lineWidth = Math.max(2, depth);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            if (depth < 3) {
                drawHeart(x2, y2, 14 + Math.random() * 6, 'red');
            }

            drawBranch(x2, y2, angle - 0.4 + Math.random() * 0.2, depth - 1, maxDepth);
            drawBranch(x2, y2, angle + 0.4 - Math.random() * 0.2, depth - 1, maxDepth);
        }

        function drawHeart(x, y, size, color) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.random() * Math.PI);
            ctx.scale(size / 24, size / 24);
            ctx.beginPath();
            ctx.moveTo(12, 21.35);
            ctx.bezierCurveTo(12, 21.35, 2, 12.28, 2, 8.5);
            ctx.bezierCurveTo(2, 5.42, 4.42, 3, 7.5, 3);
            ctx.bezierCurveTo(9.24, 3, 10.91, 3.81, 12, 5.09);
            ctx.bezierCurveTo(13.09, 3.81, 14.76, 3, 16.5, 3);
            ctx.bezierCurveTo(19.58, 3, 22, 5.42, 22, 8.5);
            ctx.bezierCurveTo(22, 12.28, 12, 21.35, 12, 21.35);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.restore();
        }

        let progress = 0;
        const maxDepth = 8;
        let finished = false;
        function animateTree() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBranch(canvas.width / 2, canvas.height - 60, -Math.PI / 2, Math.min(maxDepth, Math.floor(progress)), maxDepth);
            if (progress < maxDepth) {
                progress += 0.012; // Un poco más lento
                requestAnimationFrame(animateTree);
            } else if (!finished) {
                finished = true;
                for (let i = 0; i < 14; i++) {
                    drawHeart(
                        canvas.width / 2 + Math.cos(i * 2 * Math.PI / 14) * (120 + Math.random() * 40),
                        canvas.height / 2 - Math.sin(i * 2 * Math.PI / 14) * (120 + Math.random() * 40),
                        16 + Math.random() * 8,
                        'pink'
                    );
                }
                // Mostrar el botón después de 3 segundos
                setTimeout(() => {
                    showLetterBtn.classList.remove('hidden');
                    showLetterBtn.classList.add('visible');
                }, 3000);
            }
        }
        animateTree();
    }

    // Mostrar la carta al tocar el botón
    if (showLetterBtn) {
        showLetterBtn.addEventListener('click', () => {
            showLetterBtn.classList.remove('visible');
            showLetterBtn.classList.add('hidden');
            cartaOverlay.classList.remove('hidden');
        });
    }
});
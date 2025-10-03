const MAX_Y_POS = 60;
const MIN_STARS = 50;
const MAX_STARS = 500;
const MAX_HUE_VARIATION = 50;
const MAX_LIGHTNESS_VARIATION = 20;
const MIN_DIAMETER = 300;
const MAX_DIAMETER = 800;
const MAX_X_OFFSET = 100;

const body = document.querySelector('body');
const shootButton = document.getElementById('shoot-button');

function shootFirework() {
    const fireworkXPos = Math.random() * 100;
    const fireworkYPos = Math.random() * MAX_Y_POS;

    const starCount = Math.floor(Math.random() * (MAX_STARS - MIN_STARS + 1)) + MIN_STARS;

    const firework = document.createElement('div');
    firework.classList.add('firework'); 
    firework.style.left = `${fireworkXPos}%`;
    firework.style.top = `${fireworkYPos}%`;

    let backgroundLayers = [];

    const baseHue = Math.floor(Math.random() * 360);

    for (let i = 0; i < starCount; i++) {
        const starXPos = Math.floor(Math.random() * 100);
        const starYPos = Math.floor(Math.random() * 100);

        const hueOffset = Math.floor(
            Math.random() * (MAX_HUE_VARIATION + 1) - MAX_HUE_VARIATION / 2
        );
        const lightness = Math.floor(Math.random() * MAX_LIGHTNESS_VARIATION) + 50;

        const star = `radial-gradient(circle, hsl(${baseHue + hueOffset}, 100%, ${lightness}%) var(--star-size), transparent 70%) ${starXPos}% ${starYPos}%`;

        backgroundLayers.push(star);
    }

    firework.style.background = backgroundLayers.join(', ');
    firework.style.backgroundRepeat = 'no-repeat';
    firework.style.backgroundSize = 'calc(var(--star-size) * 2) calc(var(--star-size) * 2)';

    const explosionDiameter = Math.floor(Math.random() * (MAX_DIAMETER - MIN_DIAMETER)) + MIN_DIAMETER;
    firework.style.setProperty('--diameter', `${explosionDiameter}px`);

    const xOffset = Math.floor(Math.random() * MAX_X_OFFSET * 2 + 1) - MAX_X_OFFSET;
    firework.style.setProperty('--x-offset', `${xOffset}px`);

    firework.addEventListener('animationend', (event) => {
        if (event.animationName === 'explode-firework') {
            firework.remove();
        }
    });

    body.appendChild(firework);
}

shootButton.addEventListener('click', shootFirework);
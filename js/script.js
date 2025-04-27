const btn = document.getElementById('runawayBtn');
const counterElement = document.getElementById('counter');
const messageElement = document.getElementById('message');

let counter = 0;
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let lastTouchTime = 0;

btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
});

btn.setAttribute('disabled', 'true');
btn.style.pointerEvents = 'none';

function updateButtonPosition() {
    btn.style.left = `${posX - btn.offsetWidth / 2}px`;
    btn.style.top = `${posY - btn.offsetHeight / 2}px`;
}

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener('mousemove', (e) => {
    handleMove(e.clientX, e.clientY);
});

function handleMove(x, y) {
    const distance = Math.sqrt(
        Math.pow(x - posX, 2) +
        Math.pow(y - posY, 2)
    );

    if (distance < 150) {
        const now = Date.now();
        if (now - lastTouchTime > 300) { 
            counter++;
            counterElement.textContent = `Попыток: ${counter}`;

            messageElement.style.opacity = 1;
            setTimeout(() => {
                messageElement.style.opacity = 0;
            }, 1000);

            // Убегаем в противоположном направлении
            const angle = Math.atan2(posY - y, posX - x);
            const runDistance = 180 + Math.random() * 50;

            posX += Math.cos(angle) * runDistance;
            posY += Math.sin(angle) * runDistance;

            const safetyMargin = 20;
            posX = Math.max(btn.offsetWidth / 2 + safetyMargin,
                Math.min(window.innerWidth - btn.offsetWidth / 2 - safetyMargin, posX));
            posY = Math.max(btn.offsetHeight / 2 + safetyMargin,
                Math.min(window.innerHeight - btn.offsetHeight / 2 - safetyMargin, posY));

            updateButtonPosition();
            lastTouchTime = now;
        }
    }
}

window.addEventListener('resize', () => {
    const safetyMargin = 20;
    posX = Math.max(btn.offsetWidth / 2 + safetyMargin,
        Math.min(window.innerWidth - btn.offsetWidth / 2 - safetyMargin, posX));
    posY = Math.max(btn.offsetHeight / 2 + safetyMargin,
        Math.min(window.innerHeight - btn.offsetHeight / 2 - safetyMargin, posY));
    updateButtonPosition();
});

updateButtonPosition();

document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});
const cards = document.querySelectorAll('.card');
const container = document.querySelector('.card-container');
const cardImages = document.querySelectorAll('.card-image');

let isMouseOver = false;
let rotateX = 0;
let rotateY = 0;

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateCardTransform(card) {
    const transformString = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transform = transformString;
}

function animate() {
    if (!isMouseOver) {
        rotateX = lerp(rotateX, 0, 0.05);
        rotateY = lerp(rotateY, 0, 0.05);
    }

    cards.forEach(card => updateCardTransform(card));
    requestAnimationFrame(animate);
}

container.addEventListener('mousemove', (e) => {
    if (!isMouseOver) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    rotateY = clamp(mouseX / 10, -15, 15);
    rotateX = clamp(-mouseY / 10, -15, 15);
});

container.addEventListener('mouseenter', () => {
    isMouseOver = true;
    cards.forEach(card => card.style.transition = 'none');
});

container.addEventListener('mouseleave', () => {
    isMouseOver = false;
    cards.forEach(card => card.style.transition = 'transform 0.6s');
});

// Image URLs
const imageUrls = [
    'https://cdn.pixabay.com/photo/2023/03/31/06/45/camera-7889301_640.jpg',
    'https://cdn.pixabay.com/photo/2020/02/08/14/28/camera-4830248_640.jpg',
    'https://cdn.pixabay.com/photo/2016/11/22/20/11/photography-1850469_640.jpg',
    'https://cdn.pixabay.com/photo/2016/11/23/17/36/black-and-white-1853980_640.jpg'
];

cardImages.forEach((cardImage, index) => {
    cardImage.style.backgroundImage = `url(${imageUrls[index]})`;
});

particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00ffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
        line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});

animate();

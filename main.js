// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

document.querySelectorAll('a, .project-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 3, backgroundColor: '#f0f0f0', duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, backgroundColor: '#ff3366', duration: 0.3 });
    });
});

// Hero Animation
const tl = gsap.timeline();
tl.to('.hero-title .word', {
    y: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
}).to('.hero-subtitle', {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
}, "-=1");

// About Text Splitting & Reveal
const aboutText = document.querySelector('.about-text');
const chars = aboutText.textContent.split('');
aboutText.innerHTML = '';
chars.forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    aboutText.appendChild(span);
});

gsap.to('.about-text span', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1
    },
    opacity: 1,
    stagger: 0.1,
    ease: "none"
});

// Parallax Stats
gsap.utils.toArray('.stat-number').forEach(stat => {
    const speed = stat.getAttribute('data-speed');
    gsap.to(stat, {
        scrollTrigger: {
            trigger: '.stats',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: (i, target) => -100 * speed,
        ease: "none"
    });
});

// Parallax Title
gsap.to('.hero-title', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 200,
    opacity: 0,
    ease: "none"
});

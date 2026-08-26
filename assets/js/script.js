AOS.init({
    once: true,
    duration: 700,
    easing: 'ease-out-cubic',
    offset: 40,
});

const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

mobileBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('hidden');
    mobileBtn.setAttribute('aria-expanded', !isOpen);
    mobileBtn.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

const track = document.getElementById('teamTrack');
const slides = track.querySelectorAll('.team-slide');
const totalSlides = slides.length;
let currentIndex = 0;
let autoplayInterval = null;
const dots = document.querySelectorAll('.slider-dot');

const goToSlide = (index) => {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';

    dots.forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
};

const nextSlide = () => goToSlide(currentIndex + 1);
const prevSlide = () => goToSlide(currentIndex - 1);

document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
});

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index, 10);
        goToSlide(idx);
        resetAutoplay();
    });
});

const startAutoplay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 4500);
};

const resetAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
};

if (totalSlides > 1) {
    startAutoplay();
    const sliderWrapper = document.querySelector('.team-slider-wrapper');
    sliderWrapper.addEventListener('mouseenter', () => {
        if (autoplayInterval) clearInterval(autoplayInterval);
    });
    sliderWrapper.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 72;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + current;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
});

console.log('🐍 Cobra & Warriors Community.');
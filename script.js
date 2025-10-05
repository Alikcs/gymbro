// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрытие мобильного меню после клика
            document.getElementById('mobileMenu').classList.remove('active');
        }
    });
});

// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.querySelector('.close-btn');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.add('active');
});

closeBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
});

// Слайд-шоу
let currentSlide = 0;
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = 3;

function showSlide(n) {
    currentSlide = (n + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Автоматическое переключение слайдов
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Обработка формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});
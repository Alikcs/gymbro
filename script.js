// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing scripts');
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Проверяем, не является ли ссылка кнопкой записи
            if (this.classList.contains('signup-btn')) {
                return; // Не предотвращаем поведение для кнопок записи
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрытие мобильного меню после клика
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.querySelector('.close-btn');

    if (mobileMenuBtn && mobileMenu && closeBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            console.log('Mobile menu opened');
            mobileMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', function() {
            console.log('Mobile menu closed');
            mobileMenu.classList.remove('active');
        });
    }

    // Слайд-шоу
    let currentSlide = 0;
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = 3;

    if (slides && dots.length > 0) {
        function showSlide(n) {
            currentSlide = (n + totalSlides) % totalSlides;
            slides.style.transform = `translateX(-${currentSlide * 33.333}%)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
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
    }

    // Модальное окно записи
    const signupModal = document.getElementById('signupModal');
    const modalClose = document.querySelector('.modal-close');
    const signupForm = document.getElementById('signupForm');

    console.log('Modal elements:', { signupModal, modalClose, signupForm });

    // Функция открытия модального окна
    function openModal() {
        console.log('Opening modal');
        if (signupModal) {
            signupModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Функция закрытия модального окна
    function closeModal() {
        console.log('Closing modal');
        if (signupModal) {
            signupModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Открытие модального окна при клике на кнопки записи
    document.querySelectorAll('.signup-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Signup button clicked');
            openModal();
        });
    });

    // Закрытие модального окна
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal();
        });
    }

    // Кликабельные картинки услуг
        document.querySelectorAll('.clickable-service').forEach(service => {
            service.addEventListener('click', function() {
                console.log('Service image clicked');
                openModal();
            });
        });

    // Обработка формы записи
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('user-name');
        const userPhone = document.getElementById('user-phone');
        
        if (userName && userPhone) {
            console.log('Form submitted:', userName.value, userPhone.value);
            
            // Закрываем модальное окно записи
            closeModal();
            
            // Показываем модальное окно успеха
            showSuccessModal();
            
            // Очищаем форму
            signupForm.reset();
        }
    });
}

        // Модальное окно успешной отправки
        const successModal = document.getElementById('successModal');
        const successClose = document.getElementById('successClose');
        const successOk = document.getElementById('successOk');

        // Функция показа модального окна успеха
        function showSuccessModal() {
            console.log('Showing success modal');
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        // Функция закрытия модального окна успеха
        function closeSuccessModal() {
            console.log('Closing success modal');
            if (successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Закрытие модального окна успеха
        if (successClose) {
            successClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSuccessModal();
            });
        }

        if (successOk) {
            successOk.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSuccessModal();
            });
        }

        // Закрытие модального окна успеха при клике на overlay
        if (successModal) {
            successModal.addEventListener('click', function(e) {
                if (e.target === successModal) {
                    closeSuccessModal();
                }
            });
        }

        // Закрытие модального окна успеха при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
                closeSuccessModal();
            }
        });

    console.log('All scripts initialized successfully');
});
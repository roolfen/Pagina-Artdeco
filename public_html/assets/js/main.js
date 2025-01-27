document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    // Menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Navegación sticky con hide/show al scroll
    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Mostrar/ocultar navegación
        if (currentScroll > lastScroll && currentScroll > 70) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll);

    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (elementPosition < screenPosition - 100) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Iniciar animaciones visibles

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy loading de imágenes
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Validación de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                highlightInvalidFields(form);
            }
        });
    });

    function highlightInvalidFields(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (!input.validity.valid) {
                input.classList.add('invalid');
                addErrorMessage(input);
            }

            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('invalid');
                    removeErrorMessage(this);
                }
            });
        });
    }

    function addErrorMessage(input) {
        if (!input.nextElementSibling?.classList.contains('error-message')) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = input.validationMessage;
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    }

    function removeErrorMessage(input) {
        const error = input.nextElementSibling;
        if (error?.classList.contains('error-message')) {
            error.remove();
        }
    }

    // Detectar modo oscuro del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Escuchar cambios en el modo de color del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        document.body.classList.toggle('dark-mode', e.matches);
    });

    // Manejar errores de carga de imágenes
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/img/placeholder.jpg';
            this.alt = 'Imagen no disponible';
        });
    });
});
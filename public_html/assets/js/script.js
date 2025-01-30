document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const navbar = document.querySelector('.navbar');
    const logoVideo = document.querySelector('.logo-video');
    let lastScroll = 0;

    // Navbar Hide/Show on Scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Logo Video Animation
    logoVideo.addEventListener('mouseenter', () => {
        logoVideo.play();
    });

    logoVideo.addEventListener('mouseleave', () => {
        logoVideo.pause();
        logoVideo.currentTime = 0;
    });

    // Video Background Carousel
    const videos = [
        'https://videos.pexels.com/video-files/8293503/8293503-hd_1920_1080_30fps.mp4',
        // Añade más URLs de videos aquí
    ];

    let currentVideoIndex = 0;
    const videoElement = document.querySelector('#myVideo');

    function changeBackgroundVideo() {
        videoElement.src = videos[currentVideoIndex];
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    }

    // Cambiar video cada 30 segundos
    setInterval(changeBackgroundVideo, 30000);

    // Smooth Scroll para los enlaces de navegación
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

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí iría la lógica para manejar el envío del formulario
            alert('Gracias por contactarnos. Nos pondremos en contacto contigo pronto.');
        });
    }
});
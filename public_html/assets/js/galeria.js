// =============== Código original de la galería ===============
function initGallery() {
    const lightbox = GLightbox({
        selector: '[data-gallery]',
        touchNavigation: true,
        keyboardNavigation: true,
        closeButton: true
    });
}

window.addEventListener('load', initGallery);

// =============== Tus otros scripts de galería originales se mantienen ===============
function preloadImages() {
    const images = document.querySelectorAll('.gallery-grid img');
    // ... código original de precarga ...
}
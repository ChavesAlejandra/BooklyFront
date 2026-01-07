// Seleccionar elementos del DOM
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideTitle = document.getElementById('slide-title');
const slideDescription = document.getElementById('slide-description');

// Variables de control
let currentSlide = 0;
const slideInterval = 4000; // 4 segundos
let autoSlide;

// Información de cada slide
const slideInfo = [
    { title: 'Montañas Majestuosas', description: 'Explora la belleza natural' },
    { title: 'Paraíso Tropical', description: 'Relájate en aguas cristalinas' },
    { title: 'Bosque Encantado', description: 'Descubre la magia del bosque' },
    { title: 'Lago Sereno', description: 'Encuentra tu paz interior' },
    { title: 'Naturaleza Pura', description: 'Conecta con el mundo natural' }
];

/**
 * Muestra el slide correspondiente al índice
 * @param {number} index - Índice del slide a mostrar
 */
function showSlide(index) {
    // Asegurar que el índice esté en rango
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Actualizar slides
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');

    // Actualizar indicadores
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[currentSlide].classList.add('active');

    // Actualizar información
    slideTitle.textContent = slideInfo[currentSlide].title;
    slideDescription.textContent = slideInfo[currentSlide].description;
}

/**
 * Avanza al siguiente slide
 */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/**
 * Retrocede al slide anterior
 */
function prevSlide() {
    showSlide(currentSlide - 1);
}

/**
 * Inicia el cambio automático de slides
 */
function startAutoSlide() {
    autoSlide = setInterval(nextSlide, slideInterval);
}

/**
 * Detiene el cambio automático de slides
 */
function stopAutoSlide() {
    clearInterval(autoSlide);
}

/**
 * Reinicia el temporizador automático
 */
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Event listeners para controles de navegación
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Event listeners para indicadores
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.getAttribute('data-slide'));
        showSlide(slideIndex);
        resetAutoSlide();
    });
});

// Pausar cuando el mouse está sobre el carrusel
const carousel = document.querySelector('.carousel-container');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// Soporte para navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
});

// Iniciar el carrusel automático al cargar la página
startAutoSlide();
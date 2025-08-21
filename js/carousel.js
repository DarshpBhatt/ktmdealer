// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let autoSlideInterval;

// Initialize carousel
function initCarousel() {
    showSlide(currentSlideIndex);
    startAutoSlide();
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlideIndex = index;
}

// Change slide (next/prev)
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    // Wrap around
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
    showSlide(index - 1);
    resetAutoSlide();
}

// Auto slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Reset auto slide when user interacts
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector('.hero-carousel');

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1); // Swipe left, go to next
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1); // Swipe right, go to previous
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initCarousel);
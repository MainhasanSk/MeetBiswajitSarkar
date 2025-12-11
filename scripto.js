// ==========================================
// COUNTDOWN TIMER FUNCTIONALITY
// ==========================================
function updateCountdown() {
    // Target date: December 7, 2025 at 9:00 AM IST
    const targetDate = new Date('2025-12-07T09:00:00+05:30').getTime();

    // Current date and time
    const now = new Date().getTime();

    // Calculate the difference
    const difference = targetDate - now;

    // If countdown is finished
    if (difference < 0) {
        document.querySelectorAll('.countdown-days, .countdown-hours, .countdown-minutes, .countdown-seconds').forEach(el => {
            el.textContent = '00';
        });
        return;
    }

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Format numbers to always show 2 digits
    const formatNumber = (num) => num.toString().padStart(2, '0');

    // Update all countdown displays on the page
    document.querySelectorAll('.countdown-days').forEach(el => {
        el.textContent = formatNumber(days);
    });

    document.querySelectorAll('.countdown-hours').forEach(el => {
        el.textContent = formatNumber(hours);
    });

    document.querySelectorAll('.countdown-minutes').forEach(el => {
        el.textContent = formatNumber(minutes);
    });

    document.querySelectorAll('.countdown-seconds').forEach(el => {
        el.textContent = formatNumber(seconds);
    });
}


// ==========================================
// REGISTER BUTTON FUNCTIONALITY
// ==========================================
function handleRegisterClick(event) {
    // The links already have href, so they will work automatically
    console.log('Register button clicked - Redirecting to payment...');

    // Add a subtle visual feedback
    const button = event.currentTarget;
    button.style.opacity = '0.8';

    setTimeout(() => {
        button.style.opacity = '1';
    }, 200);
}

function initRegisterButtons() {
    // Find all register buttons
    const registerButtons = document.querySelectorAll('a[href*="payment.qloneapp.com"]');

    console.log(`Found ${registerButtons.length} register buttons`);

    registerButtons.forEach((button, index) => {
        // Add transition for smooth effects
        button.style.transition = 'all 0.3s ease';

        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Add click handler
        button.addEventListener('click', handleRegisterClick);

        console.log(`Register button ${index + 1} is now active`);
    });
}


// ==========================================
// FEATURED IN CAROUSEL AUTO-SCROLL
// ==========================================
let carouselInterval;
let currentPosition = 0;

function startCarouselAutoScroll() {
    // Find the carousel track - looking for the parent container of logo groups
    const carouselTrack = document.querySelector('.relative.items-center.caret-transparent.flex.h-full');

    if (!carouselTrack) {
        console.log('Carousel track not found');
        return;
    }

    // Clone all children to create seamless loop
    const originalChildren = Array.from(carouselTrack.children);
    originalChildren.forEach(child => {
        const clone = child.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    // Set initial position
    carouselTrack.style.transition = 'transform 0.5s linear';

    // Clear any existing interval
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }

    // Auto-scroll every 3 seconds
    carouselInterval = setInterval(() => {
        currentPosition -= 230; // Scroll by one logo width + margin

        const totalWidth = carouselTrack.scrollWidth / 2;

        // Reset to beginning if we've scrolled through all original items
        if (Math.abs(currentPosition) >= totalWidth) {
            carouselTrack.style.transition = 'none';
            currentPosition = 0;
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;

            // Re-enable transition after a brief moment
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s linear';
            }, 50);
        } else {
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    }, 3000);
}


// ==========================================
// ADD COUNTDOWN CLASSES TO EXISTING ELEMENTS
// ==========================================
function initCountdownTimers() {
    // Find all countdown containers
    const countdownContainers = document.querySelectorAll('.items-center.box-border.caret-transparent.gap-x-3\\.5.flex');

    countdownContainers.forEach(container => {
        const boxes = container.querySelectorAll('.text-white.items-center.bg-zinc-800');

        if (boxes.length === 4) {
            // This is a countdown timer
            const numberElements = container.querySelectorAll('.text-\\[22px\\].font-extrabold, .text-\\[23px\\].font-extrabold, div[class*="font-extrabold"]');

            if (numberElements.length >= 4) {
                numberElements[0].classList.add('countdown-days');
                numberElements[1].classList.add('countdown-hours');
                numberElements[2].classList.add('countdown-minutes');
                numberElements[3].classList.add('countdown-seconds');

                console.log('Countdown timer initialized');
            }
        }
    });
}


// ==========================================
// SMOOTH SCROLL AND ANIMATION EFFECTS
// ==========================================
function addSmoothEffects() {
    // Add smooth scroll behavior to page
    document.documentElement.style.scrollBehavior = 'smooth';

    // Animate elements on scroll (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1'; // Keep visible by default
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}


// ==========================================
// INITIALIZE ALL FUNCTIONALITY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing CMGC Medical Guidance Website...');

    // Initialize countdown timers
    initCountdownTimers();

    // Start countdown updates
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize register buttons
    initRegisterButtons();

    // Start carousel after a short delay
    setTimeout(startCarouselAutoScroll, 1000);

    // Add smooth effects
    addSmoothEffects();

    console.log('All scripts loaded successfully!');
});


// ==========================================
// HANDLE PAGE VISIBILITY CHANGES
// ==========================================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause carousel when tab is not visible
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    } else {
        // Resume carousel when tab becomes visible
        startCarouselAutoScroll();
    }
});

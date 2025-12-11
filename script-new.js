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

        // Update offer timer to show expired
        document.querySelectorAll('.offer-timer').forEach(el => {
            el.textContent = 'Offer Expired';
        });

        // Update the inline offer timer spans
        document.querySelectorAll('h2').forEach(h2 => {
            if (h2.textContent.includes('Offer Ends in')) {
                const span = h2.querySelector('span');
                if (span) {
                    span.textContent = 'EXPIRED';
                }
            }
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

    // Update main countdown displays on the page
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

    // Format "Offer Ends in" with Days, Hours, Minutes, Seconds
    let offerTimeText = '';

    if (days > 0) {
        offerTimeText = `${days}d ${formatNumber(hours)}h ${formatNumber(minutes)}m ${formatNumber(seconds)}s`;
    } else if (hours > 0) {
        offerTimeText = `${hours}h ${formatNumber(minutes)}m ${formatNumber(seconds)}s`;
    } else if (minutes > 0) {
        offerTimeText = `${minutes}m ${formatNumber(seconds)}s`;
    } else {
        offerTimeText = `${seconds}s`;
    }

    // Update "Offer Ends in" timer in popup (class-based)
    document.querySelectorAll('.offer-timer').forEach(el => {
        el.textContent = `Offer Ends in ${offerTimeText}`;
    });

    // Update inline offer timer spans in the HTML
    // This targets spans inside h2 elements that contain "Offer Ends in"
    document.querySelectorAll('h2').forEach(h2 => {
        if (h2.textContent.includes('Offer Ends in')) {
            const span = h2.querySelector('span');
            if (span) {
                span.textContent = offerTimeText;
            }
        }
    });
}


// ==========================================
// REGISTRATION FORM POPUP
// ==========================================
let formPopup = null;

function createFormPopup() {
    // Create popup HTML
    const popupHTML = `
        <div id="registrationPopup" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style="display: none;">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-slideUp">
                <!-- Close Button -->
                <button onclick="closeRegistrationForm()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">
                    &times;
                </button>

                <!-- Form Header -->
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-bold text-neutral-900 mb-2 font-montserrat">Register for Workshop</h2>
                    <p class="text-sm text-red-500 offer-timer font-montserrat font-semibold">Offer Ends Soon</p>
                </div>

                <!-- Registration Form -->
                <form id="registrationForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Full Name *</label>
                        <input 
                            type="text" 
                            id="userName" 
                            name="name" 
                            required 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none font-montserrat"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Contact Number *</label>
                        <input 
                            type="tel" 
                            id="userPhone" 
                            name="phone" 
                            required 
                            pattern="[0-9]{10}" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none font-montserrat"
                            placeholder="Enter 10 digit mobile number"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 font-montserrat">City *</label>
                        <input 
                            type="text" 
                            id="userCity" 
                            name="city" 
                            required 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none font-montserrat"
                            placeholder="Enter your city"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1 font-montserrat">Health Concern / Disease *</label>
                        <textarea 
                            id="userDisease" 
                            name="disease" 
                            required 
                            rows="3"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none font-montserrat resize-none"
                            placeholder="Briefly describe your health concern"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-montserrat"
                    >
                        Submit & Continue to WhatsApp
                    </button>
                </form>
            </div>
        </div>
    `;

    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    formPopup = document.getElementById('registrationPopup');

    // Add form submit handler
    document.getElementById('registrationForm').addEventListener('submit', handleFormSubmit);
}

function openRegistrationForm(event) {
    event.preventDefault();

    if (!formPopup) {
        createFormPopup();
    }

    formPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeRegistrationForm() {
    if (formPopup) {
        formPopup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll

        // Reset form
        document.getElementById('registrationForm').reset();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const city = document.getElementById('userCity').value.trim();
    const disease = document.getElementById('userDisease').value.trim();

    // Validate phone number
    if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    // Create WhatsApp message
    const message = `Hello! I want to register for the CMGC Medical Guidance Workshop.\n\n` +
                   `Name: ${name}\n` +
                   `Contact: ${phone}\n` +
                   `City: ${city}\n` +
                   `Health Concern: ${disease}`;

    // WhatsApp number (replace with your actual number)
    const whatsappNumber = '919876543210'; // Replace with your WhatsApp number

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Close form
    closeRegistrationForm();

    // Redirect to WhatsApp
    window.open(whatsappURL, '_blank');
}


// ==========================================
// REGISTER BUTTON FUNCTIONALITY
// ==========================================
function initRegisterButtons() {
    // Find all register buttons
    const registerButtons = document.querySelectorAll('a[href*="payment.qloneapp.com"], a[href*="register"]');

    console.log(`Found ${registerButtons.length} register buttons`);

    registerButtons.forEach((button, index) => {
        // Remove href to prevent default navigation
        button.setAttribute('href', 'javascript:void(0);');

        // Add transition for smooth effects
        button.style.transition = 'all 0.3s ease';
        button.style.cursor = 'pointer';

        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Add click handler to open form
        button.addEventListener('click', openRegistrationForm);

        console.log(`Register button ${index + 1} is now active`);
    });
}


// ==========================================
// FEATURED IN CAROUSEL AUTO-SCROLL
// ==========================================
let carouselInterval;
let currentPosition = 0;

function startCarouselAutoScroll() {
    // Find the carousel track
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
        currentPosition -= 230;

        const totalWidth = carouselTrack.scrollWidth / 2;

        if (Math.abs(currentPosition) >= totalWidth) {
            carouselTrack.style.transition = 'none';
            currentPosition = 0;
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;

            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s linear';
            }, 50);
        } else {
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    }, 3000);
}


// ==========================================
// ADD COUNTDOWN CLASSES
// ==========================================
function initCountdownTimers() {
    const countdownContainers = document.querySelectorAll('.items-center.box-border.caret-transparent.gap-x-3\\.5.flex');

    countdownContainers.forEach(container => {
        const boxes = container.querySelectorAll('.text-white.items-center.bg-zinc-800');

        if (boxes.length === 4) {
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

    console.log('All scripts loaded successfully!');
});


// Close popup when clicking outside
document.addEventListener('click', function(event) {
    if (formPopup && event.target === formPopup) {
        closeRegistrationForm();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && formPopup) {
        closeRegistrationForm();
    }
});

// ==========================================
// COUNTDOWN TIMER FUNCTIONALITY
// ==========================================
function updateCountdown() {
    // Calculate target: Always 1 day 23 hours 59 minutes 59 seconds from now
    const now = new Date().getTime();
    const oneDayInMs = (1 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000) + (59 * 60 * 1000) + (59 * 1000);
    
    // Check if we have a stored target date
    let targetDate = localStorage.getItem('countdownTarget');
    
    if (!targetDate || now >= parseInt(targetDate)) {
        // Set new target: current time + 1d 23h 59m 59s
        targetDate = now + oneDayInMs;
        localStorage.setItem('countdownTarget', targetDate);
    } else {
        targetDate = parseInt(targetDate);
    }

    // Calculate the difference
    const difference = targetDate - now;

    // If countdown is finished (shouldn't happen with auto-reset, but safe guard)
    if (difference < 0) {
        // Reset immediately
        targetDate = now + oneDayInMs;
        localStorage.setItem('countdownTarget', targetDate);
        updateCountdown(); // Call recursively
        return;
    }

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Format numbers to always show 2 digits
    const formatNumber = (num) => num.toString().padStart(2, '0');

    // Update main countdown displays
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

    // Format for "Offer Ends in" display (shows as Xd XXh XXm XXs)
    const offerTimeText = `${days}d ${formatNumber(hours)}h ${formatNumber(minutes)}m ${formatNumber(seconds)}s`;

    // Update "Offer Ends in" text in bottom bar
    document.querySelectorAll('h2').forEach(h2 => {
        if (h2.textContent.includes('Offer Ends in')) {
            const span = h2.querySelector('span');
            if (span) {
                span.textContent = offerTimeText;
            }
        }
    });

    // Update inline offer timer spans
    document.querySelectorAll('.offer-timer').forEach(el => {
        el.textContent = `Offer Ends in ${offerTimeText}`;
    });
}

// ==========================================
// REGISTRATION FORM POPUP
// ==========================================
let formPopup = null;

function createFormPopup() {
    const popupHTML = `
        <div id="registrationPopup" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style="display: none;">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-slideUp">
                <button onclick="closeRegistrationForm()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">
                    &times;
                </button>

                <div class="text-center mb-6">
                    <h2 class="text-2xl font-bold text-neutral-900 mb-2 font-montserrat">Register for Workshop</h2>
                    <p class="text-sm text-red-500 offer-timer font-montserrat font-semibold">Offer Ends Soon</p>
                </div>

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

    document.body.insertAdjacentHTML('beforeend', popupHTML);
    formPopup = document.getElementById('registrationPopup');
    document.getElementById('registrationForm').addEventListener('submit', handleFormSubmit);
}


function openRegistrationForm(event) {
    event.preventDefault();
    if (!formPopup) {
        createFormPopup();
    }
    formPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeRegistrationForm() {
    if (formPopup) {
        formPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('registrationForm').reset();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const city = document.getElementById('userCity').value.trim();
    const disease = document.getElementById('userDisease').value.trim();

    if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    const message = `Hello! I want to register for the CMGC Medical Guidance Workshop.\n\n` +
                   `Name: ${name}\n` +
                   `Contact: ${phone}\n` +
                   `City: ${city}\n` +
                   `Health Concern: ${disease}`;

    const whatsappNumber = '919876543210';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    closeRegistrationForm();
    window.open(whatsappURL, '_blank');
}


// ==========================================
// REGISTER BUTTON FUNCTIONALITY
// ==========================================
function initRegisterButtons() {
    const registerButtons = document.querySelectorAll('a[href*="payment.qloneapp.com"], a[href*="register"]');
    
    registerButtons.forEach((button, index) => {
        button.setAttribute('href', 'javascript:void(0);');
        button.style.transition = 'all 0.3s ease';
        button.style.cursor = 'pointer';

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('click', openRegistrationForm);
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

//Partner Logo
// ==========================================
// HOSPITAL PARTNERS CAROUSEL - SMOOTH CONTINUOUS SCROLL
// ==========================================
let hospitalCarouselInterval;
let hospitalCurrentPosition = 0;

function startHospitalCarousel() {
    const carouselTrack = document.getElementById('hospitalCarouselTrack');

    if (!carouselTrack) {
        console.log('Hospital carousel track not found');
        return;
    }

    // Clone all children to create seamless infinite loop
    const originalChildren = Array.from(carouselTrack.children);
    originalChildren.forEach(child => {
        const clone = child.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    // Set smooth transition
    carouselTrack.style.transition = 'transform 0.5s linear';

    // Clear any existing interval
    if (hospitalCarouselInterval) {
        clearInterval(hospitalCarouselInterval);
    }

    // Smooth continuous scroll - moves 1 pixel at a time
    const scrollSpeed = 1; // Pixels to move each frame (1 = smoothest)
    const frameRate = 30; // Milliseconds between frames (30ms = ~33 FPS)

    // Auto-scroll continuously
    hospitalCarouselInterval = setInterval(() => {
        hospitalCurrentPosition -= scrollSpeed;

        // Calculate half width (since we cloned)
        const halfWidth = carouselTrack.scrollWidth / 2;

        // Reset position when we've scrolled through original items
        if (Math.abs(hospitalCurrentPosition) >= halfWidth) {
            // Instant reset without transition
            carouselTrack.style.transition = 'none';
            hospitalCurrentPosition = 0;
            carouselTrack.style.transform = `translateX(${hospitalCurrentPosition}px)`;

            // Re-enable smooth transition
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s linear';
            }, 10);
        } else {
            carouselTrack.style.transform = `translateX(${hospitalCurrentPosition}px)`;
        }
    }, frameRate);

    console.log('Hospital carousel initialized with smooth continuous scrolling!');
}

// Pause on hover (optional but recommended for better UX)
function addHospitalCarouselHoverPause() {
    const carouselTrack = document.getElementById('hospitalCarouselTrack');
    
    if (carouselTrack) {
        // Pause scrolling when mouse enters
        carouselTrack.addEventListener('mouseenter', () => {
            if (hospitalCarouselInterval) {
                clearInterval(hospitalCarouselInterval);
            }
        });

        // Resume scrolling when mouse leaves
        carouselTrack.addEventListener('mouseleave', () => {
            startHospitalCarousel();
        });
    }
}

// Update your DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing CMGC Medical Guidance Website...');

    // Initialize countdown timers
    initCountdownTimers();

    // Start countdown updates
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize register buttons
    initRegisterButtons();

    // Start hospital carousel with smooth scrolling
    setTimeout(() => {
        startHospitalCarousel();
        addHospitalCarouselHoverPause(); // Add hover pause functionality
    }, 1000);

    console.log('All scripts loaded successfully!');
});
// For Video Section
// ==========================================
// COUNSELLING FORM FUNCTIONALITY
// ==========================================
let counsellingPopup = null;

function openCounsellingForm() {
    counsellingPopup = document.getElementById('counsellingPopup');
    
    if (counsellingPopup) {
        counsellingPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

function closeCounsellingForm() {
    if (counsellingPopup) {
        counsellingPopup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
        
        // Reset form
        document.getElementById('counsellingForm').reset();
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const counsellingForm = document.getElementById('counsellingForm');
    
    if (counsellingForm) {
        counsellingForm.addEventListener('submit', handleCounsellingSubmit);
    }
});

function handleCounsellingSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('counsellingName').value.trim();
    const phone = document.getElementById('counsellingPhone').value.trim();
    const city = document.getElementById('counsellingCity').value.trim();
    const disease = document.getElementById('counsellingDisease').value.trim();

    // Validate phone number
    if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    // Create WhatsApp message
    const message = `Hello! I want to book a FREE Medical Counselling Session.\n\n` +
                   `Name: ${name}\n` +
                   `Contact: ${phone}\n` +
                   `City: ${city}\n` +
                   `Health Concern: ${disease}\n\n` +
                   `Please guide me with the next steps.`;

    // WhatsApp number (replace with your actual number)
    const whatsappNumber = '919876543210'; // Replace with your WhatsApp number

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Close form
    closeCounsellingForm();

    // Show success message (optional)
    alert('Thank you! Redirecting to WhatsApp...');

    // Redirect to WhatsApp
    window.open(whatsappURL, '_blank');
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    if (counsellingPopup && event.target === counsellingPopup) {
        closeCounsellingForm();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && counsellingPopup) {
        closeCounsellingForm();
    }
});
//To Open megazine
// ==========================================
// ==========================================
// OPEN MAGAZINE PDF
// ==========================================
function openCertificatePDF() {
    const pdfURL = 'megazine.pdf';
    window.open(pdfURL, '_blank');
}

// ==========================================
// HIDE SCROLL INDICATOR AFTER 3 SECONDS
// ==========================================
window.addEventListener('load', function() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        setTimeout(function() {
            scrollIndicator.style.transition = 'opacity 0.5s ease-out';
            scrollIndicator.style.opacity = '0';
            setTimeout(function() {
                scrollIndicator.style.display = 'none';
            }, 500);
        }, 3000); // Hides after 3 seconds
    }
});


// ==========================================
// FAQ ACCORDION FUNCTIONALITY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const plusIcon = item.querySelector('.plus-icon');
        const minusIcon = item.querySelector('.minus-icon');
        
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherPlus = otherItem.querySelector('.plus-icon');
                    const otherMinus = otherItem.querySelector('.minus-icon');
                    
                    otherAnswer.classList.add('hidden');
                    otherPlus.classList.remove('hidden');
                    otherMinus.classList.add('hidden');
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('hidden');
            plusIcon.classList.toggle('hidden');
            minusIcon.classList.toggle('hidden');
        });
    });
});
//Gellary-section
// ==========================================
// LIGHTBOX FUNCTIONALITY
// ==========================================
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    lightboxImage.src = imageSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add smooth fade-in animation
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close lightbox with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

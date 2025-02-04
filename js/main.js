// main.js - Main JavaScript implementation for RC Clinic KZ website

(function() {
    // 1. JS Introduction & 3. JS Output
    console.log('Welcome to RC Clinic KZ - Digital Rehabilitation Center');

    // 5-7. JS Syntax & Variables
    const CENTER_NAME = 'RC Clinic KZ';
    let patientCount = 0;

    // 15-19. JS Objects & Constructors
    class Patient {
        constructor(name, age, services = []) {
            this.name = name;
            this.age = age;
            this.services = services;
            this.registrationDate = new Date();
        }

        displayInfo() {
            return `Patient: ${this.name}, Age: ${this.age}`;
        }
    }

    // 29-34. JS Arrays
    const services = [
        { id: 1, name: 'Post-operative Rehabilitation', cost: 15000 },
        { id: 2, name: 'Chronic Illness Management', cost: 12000 },
        { id: 3, name: 'Sports Injury Recovery', cost: 18000 },
        { id: 4, name: 'Preventive Health', cost: 8000 },
        { id: 5, name: 'Neurological Rehabilitation', cost: 20000 },
        { id: 6, name: 'Pediatric Rehabilitation', cost: 15000 }
    ];

    // 10-12. JS Operators & Arithmetic
    function calculateTotalCost(selectedServices) {
        return selectedServices.reduce((total, service) => total + service.cost, 0);
    }

    // 43-44. JS If Else & Switch
    function getDiscountRate(age) {
        if (age < 18) return 0.2; // 20% discount for children
        if (age >= 65) return 0.15; // 15% discount for seniors
        return 0;
    }

    function validatePhoneNumber(phone) {
        if (!phone) return false;
        const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-?\d{2}-?\d{2}$/;
        return phoneRegex.test(phone);
    }

    function validateEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateName(name) {
        if (!name) return false;
        return name.trim().length >= 2;
    }

    function validateDate(date) {
        if (!date) return false;
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate >= today;
    }

    function validateForm(formData) {
        console.log('Validating form data:', formData);
        
        try {
            // For newsletter form (only requires email)
            if (formData.hasOwnProperty('email') && !formData.hasOwnProperty('name')) {
                if (!validateEmail(formData.email)) {
                    alert('Please enter a valid email address');
                    return false;
                }
                return true;
            }

            // For contact forms
            if (!validateName(formData.name)) {
                alert('Please enter a valid name (at least 2 characters)');
                return false;
            }

            if (formData.hasOwnProperty('email') && !validateEmail(formData.email)) {
                alert('Please enter a valid email address');
                return false;
            }

            if (formData.hasOwnProperty('phone') && !validatePhoneNumber(formData.phone)) {
                alert('Please enter a valid phone number in format: +7 (XXX) XXX-XX-XX');
                return false;
            }

            if (formData.hasOwnProperty('date') && !validateDate(formData.date)) {
                alert('Please select a valid future date');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Validation error:', error);
            alert('An error occurred during form validation. Please check your inputs.');
            return false;
        }
    }
    // 35-38. JS Dates
    function formatAppointmentDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Initialize search functionality
    function initializeSearchBar() {
        const searchInput = document.querySelector('.search-container input');
        const searchResults = document.querySelector('.search-results');

        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                // Filter navigation items based on search term
                const navItems = document.querySelectorAll('.nav-link');
                const results = Array.from(navItems)
                    .filter(item => item.textContent.toLowerCase().includes(searchTerm))
                    .map(item => item.textContent);

                // Display results
                searchResults.innerHTML = results
                    .map(result => `<div class="search-result-item">${result}</div>`)
                    .join('');
            });
        }
    }





    
    // Initialize patient counter animation
    function initializePatientCounter() {
        const counter = document.querySelector('.progress-count');
        const progressBar = document.querySelector('.progress-bar');
        const targetCount = 5000;
        let currentCount = 0;
        function updateCounter() {
            if (currentCount < targetCount) {
                currentCount += 50;
                counter.textContent = currentCount.toLocaleString();
                progressBar.style.width = (currentCount / targetCount * 100) + '%';
                setTimeout(updateCounter, 50);
            }
        }
        // Start counter when element is in view
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) updateCounter();
        });
        counterObserver.observe(counter);
        // Lightbox functionality
        const lightbox = document.getElementById('imageLightbox');
        document.querySelectorAll('.gallery-image').forEach(image => {
            image.addEventListener('click', () => {
                lightbox.querySelector('img').src = image.src;
                lightbox.classList.add('active');
            });
        });
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        }

    // Initialize tech section progress bars
    function initializeTechProgress() {
        const progressBars = document.querySelectorAll('.tech-progress-bar');
        if (!progressBars.length) return; // Exit if no progress bars exist

        function updateProgressBars() {
            progressBars.forEach(bar => {
                if (bar.parentElement.getBoundingClientRect().top < window.innerHeight) {
                    bar.style.width = bar.style.width || bar.getAttribute('data-width') || '0%';
                }
            });
        }

        // Initial check
        updateProgressBars();
        
        // Add scroll listener
        window.addEventListener('scroll', updateProgressBars, { passive: true });
    }

    function setupFormHandlers() {
        const forms = document.querySelectorAll('form:not(.modal-form)'); // Explicitly exclude modal forms
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                if (validateForm(data)) {
                    console.log('Form submitted successfully:', data);
                    alert('Thank you for your submission! We will contact you shortly.');
                    form.reset();
                }
            });
        });
    }

    // Initialize gallery lightbox
    function initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        if (!galleryItems.length) return;

        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                const modal = document.getElementById('imageModal');
                if (modal) {
                    const modalImg = modal.querySelector('.modal-body img');
                    modalImg.src = this.src;
                    new bootstrap.Modal(modal).show();
                }
            });
        });
    }
    // Initialize services display
    function initializeServicesDisplay() {
        const servicesList = document.querySelector('.row.g-4');
        if (servicesList) {
            // Display cost on each service card
            document.querySelectorAll('.service-category').forEach((card, index) => {
                if (services[index]) {
                    const costDiv = document.createElement('div');
                    costDiv.className = 'mt-3 text-primary fw-bold';
                    costDiv.textContent = `Cost: ${services[index].cost.toLocaleString()} ₸`;
                    card.querySelector('.service-content, .program-content').appendChild(costDiv);
                }
            });
        }
    }

// Handle consultation booking
function handleConsultationBooking() {
    const form = document.querySelector('#consultationModal form');
    if (form) {
        // Add modal-form class to prevent double handling
        form.classList.add('modal-form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            try {
                // Collect form data
                const formData = {
                    name: form.querySelector('#name').value.trim(),
                    phone: form.querySelector('#phone').value.trim(),
                    email: form.querySelector('#email').value.trim(),
                    date: form.querySelector('#preferredDate').value
                };
                
                // Individual validations with specific error messages
                if (!validateName(formData.name)) {
                    alert('Please enter a valid name (at least 2 characters)');
                    return;
                }
                if (!validatePhoneNumber(formData.phone)) {
                    alert('Please enter a valid phone number in format: +7 (XXX) XXX-XX-XX');
                    return;
                }
                if (!validateEmail(formData.email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                if (!validateDate(formData.date)) {
                    alert('Please select a valid future date');
                    return;
                }
                
                // If all validations pass, proceed with booking
                const age = parseInt(formData.phone.replace(/\D/g, '').slice(-2)) || 30;
                const selectedService = services[0]; // Default to first service for demo
                const patient = new Patient(formData.name, age, [selectedService]);
                
                // Calculate total cost with applicable discounts
                const totalCost = calculateTotalCost([selectedService]);
                const discountRate = getDiscountRate(age);
                const finalCost = totalCost * (1 - discountRate);
                
                // Format appointment date
                const appointmentDate = new Date(formData.date);
                const formattedDate = formatAppointmentDate(appointmentDate);
                
                // Display booking confirmation
                alert(
                    `Booking Confirmation\n\n` +
                    `${patient.displayInfo()}\n` +
                    `Contact: ${formData.phone}\n` +
                    `Email: ${formData.email}\n` +
                    `Appointment: ${formattedDate}\n` +
                    `Service: ${selectedService.name}\n` +
                    `Total Cost: ${finalCost.toLocaleString()} ₸` +
                    (discountRate > 0 ? `\n(Includes ${discountRate * 100}% discount)` : '')
                );
                
                // Increment patient count
                patientCount++;
                
                // Reset form
                form.reset();
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('consultationModal'));
                if (modal) {
                    modal.hide();
                }
            } catch (error) {
                console.error('Booking error:', error);
                alert('An error occurred while processing your booking. Please try again.');
            }
        });
    }
}

    // 20. JS Events - Event handlers
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all components
        try {
            initializeSearchBar();
            handleConsultationBooking();
            initializePatientCounter();
            initializeTechProgress();
            setupFormHandlers();
            initializeGallery();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    });

})();
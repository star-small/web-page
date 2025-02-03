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
        // Available pages and content for search
        const searchableContent = [
            { title: 'Home', url: 'index.html' },
            { title: 'About Us', url: 'about.html' },
            { title: 'Services', url: 'services.html' },
            { title: 'Technology', url: 'tech.html' },
            { title: 'Programs', url: 'programs.html' },
            { title: 'Contact', url: 'contact.html' },
            { title: 'Blog', url: 'blog.html' },
            // Services
            { title: 'Post-operative Rehabilitation', url: 'services.html#post-op' },
            { title: 'Sports Injury Recovery', url: 'services.html#sports' },
            { title: 'Chronic Illness Management', url: 'services.html#chronic' },
            { title: 'Neurological Rehabilitation', url: 'services.html#neuro' },
            { title: 'Pediatric Rehabilitation', url: 'services.html#pediatric' },
            // Technology
            { title: 'VR Rehabilitation', url: 'tech.html#vr' },
            { title: 'Robotic Therapy', url: 'tech.html#robotic' }
        ];

        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;

        const searchInput = searchContainer.querySelector('input[type="search"]');
        const resultsContainer = searchContainer.querySelector('.search-results');
        if (!searchInput || !resultsContainer) return;

        // Initially hide results
        resultsContainer.style.display = 'none';

        // Handle search input
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                resultsContainer.style.display = 'none';
                return;
            }

            // Filter content based on search term
            const matchedResults = searchableContent.filter(item => 
                item.title.toLowerCase().includes(searchTerm)
            );

            // Display results
            if (matchedResults.length > 0) {
                resultsContainer.innerHTML = matchedResults
                    .map(result => `
                        <div class="search-result-item" data-url="${result.url}">
                            ${result.title}
                        </div>
                    `)
                    .join('');
                resultsContainer.style.display = 'block';

                // Add click handlers to results
                const resultItems = resultsContainer.querySelectorAll('.search-result-item');
                resultItems.forEach(item => {
                    item.addEventListener('click', () => {
                        window.location.href = item.dataset.url;
                        resultsContainer.style.display = 'none';
                        searchInput.value = '';
                    });
                });
            } else {
                resultsContainer.innerHTML = '<div class="search-result-item no-results">No results found</div>';
                resultsContainer.style.display = 'block';
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                resultsContainer.style.display = 'none';
            }
        });
    }


    // Handle consultation modal
    function initializeConsultationModal() {
        const modal = document.getElementById('consultationModal');
        if (modal) {
            const form = modal.querySelector('form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = {
                        name: form.querySelector('#name')?.value,
                        email: form.querySelector('#email')?.value,
                        phone: form.querySelector('#phone')?.value,
                        date: form.querySelector('#preferredDate')?.value
                    };

                    if (validateForm(formData)) {
                        console.log('Form submitted:', formData);
                        alert('Thank you for your submission! We will contact you shortly.');
                        modal.querySelector('button[data-bs-dismiss="modal"]').click();
                        form.reset();
                    }
                });
            }
        }
    }

    // Setup form handlers
    function setupFormHandlers() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.classList.contains('modal-form')) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get all form inputs
                    const formData = {};
                    form.querySelectorAll('input, textarea, select').forEach(input => {
                        if (input.name) {
                            formData[input.name] = input.value;
                        }
                    });

                    console.log('Processing form submission:', formData);

                    if (validateForm(formData)) {
                        console.log('Form submitted successfully:', formData);
                        alert('Thank you for your submission! We will contact you shortly.');
                        form.reset();
                    }
                });
            }
        });
    }



    // Initialize patient counter animation
    function initializePatientCounter() {
        // Patient Counter Animation
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

    // Setup form handlers
    function setupFormHandlers() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.classList.contains('modal-form')) { // Skip modal forms as they're handled separately
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
            }
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

    // 20. JS Events - Event handlers
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initializeSearchBar();
            initializeConsultationModal();
            initializePatientCounter();
            initializeTechProgress();
            setupFormHandlers();
            initializeGallery();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    });

})();
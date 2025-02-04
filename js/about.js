// Enhanced JavaScript for About Page

// Map for storing certificate information (Topic: Maps)
const certificatesMap = new Map([
    ['cert1', {
        title: 'Medical Device Certification',
        description: 'International Quality Standard',
        issueDate: new Date('2022-06-15'),
        isValid: true
    }],
    ['cert2', {
        title: 'Healthcare Excellence',
        description: 'Quality Management System',
        issueDate: new Date('2023-03-22'),
        isValid: true
    }],
    ['cert3', {
        title: 'Digital Health Standards',
        description: 'Technology Implementation Excellence',
        issueDate: new Date('2023-09-10'),
        isValid: true
    }]
]);

// Set for storing unique timeline years (Topic: Sets)
const timelineYears = new Set(['2022', '2023', '2024', '2025']);

// String manipulation for timeline content (Topics: Strings, Templates)
const timelineEvents = [
    { year: '2022', title: 'Center Foundation', description: 'Establishment of Kazakhstan\'s first digital rehabilitation center' },
    { year: '2023', title: 'Technology Integration', description: 'Implementation of advanced robotics and VR rehabilitation systems' },
    { year: '2024', title: 'Global Partnership', description: 'Collaboration with leading international rehabilitation centers' },
    { year: '2025', title: 'Expansion', description: 'Opening of satellite centers across Kazakhstan' }
];

// Object destructuring and string templates (Topic: Destructuring)
function formatTimelineEvent({ year, title, description }) {
    return `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">${year}</div>
                <h3 class="h5">${title.toUpperCase()}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
}

// Different types of loops (Topics: Loops)
function displayTimeline() {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    // Clear existing content
    timelineContainer.innerHTML = '';

    // for...of loop
    for (const event of timelineEvents) {
        timelineContainer.innerHTML += formatTimelineEvent(event);
    }
}

// Carousel enhancement with error handling (Topic: Error Handling)
function enhanceCarousel() {
    try {
        const carousel = document.getElementById('certificatesCarousel');
        if (!carousel) throw new Error('Carousel element not found');

        // Add swipe functionality
        let touchstartX = 0;
        let touchendX = 0;

        carousel.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchendX < touchstartX) {
                // Swipe left
                new bootstrap.Carousel(carousel).next();
            }
            if (touchendX > touchstartX) {
                // Swipe right
                new bootstrap.Carousel(carousel).prev();
            }
        }
    } catch (error) {
        console.error('Carousel enhancement error:', error);
    }
}

// Random certificate fact generator (Topic: Math Random)
function generateCertificateFact() {
    const facts = [
        'Our certifications represent over 1000 hours of quality assessment',
        'We maintain compliance with 15 international standards',
        'Annual recertification ensures continued excellence',
        'Our staff undergoes 200+ hours of certified training annually'
    ];
    
    const randomIndex = Math.floor(Math.random() * facts.length);
    const factElement = document.querySelector('.text-muted');
    if (factElement) {
        factElement.textContent = facts[randomIndex];
    }
}

// Certificate validation (Topics: Boolean, Comparison)
function validateCertificate(certId) {
    const cert = certificatesMap.get(certId);
    if (!cert) return false;

    const currentDate = new Date();
    const validityPeriod = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years in milliseconds
    return (currentDate - cert.issueDate) < validityPeriod;
}

// Initialize about page features
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Display timeline
        displayTimeline();
        
        // Enhance carousel
        enhanceCarousel();
        
        // Set up certificate fact rotation
        const factInterval = setInterval(generateCertificateFact, 5000);
        
        // Add hover effects to timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('.timeline-content').style.transform = 'scale(1.05)';
            });
            item.addEventListener('mouseleave', function() {
                this.querySelector('.timeline-content').style.transform = 'scale(1)';
            });
        });

        // Add certificate validation display
        certificatesMap.forEach((cert, id) => {
            const isValid = validateCertificate(id);
            console.log(`Certificate ${id}: ${isValid ? 'Valid' : 'Needs renewal'}`);
        });

    } catch (error) {
        console.error('Initialization error:', error);
    }
});
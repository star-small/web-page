// jQuery Enhancements for RC Clinic Website

// 1. Complete Registration Form Enhancement
$(document).ready(function() {
    const registrationForm = $('#registrationForm');
    
    if (registrationForm.length) {
        registrationForm.on('submit', function(e) {
            e.preventDefault();
            
            const name = $('#name').val();
            const email = $('#email').val();
            const password = $('#password').val();
            const phone = $('#phone').val();
            const dob = $('#dob').val();
            
            // Validation
            let isValid = true;
            const errors = [];
            
            // Name validation
            if (!/^[a-zA-Z\s]{2,30}$/.test(name)) {
                isValid = false;
                errors.push('Name should be 2-30 characters long and contain only letters');
            }
            
            // Email validation
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                isValid = false;
                errors.push('Please enter a valid email address');
            }
            
            // Password validation (minimum 8 characters, at least one number and one special character)
            if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password)) {
                isValid = false;
                errors.push('Password must be at least 8 characters long and contain at least one number and one special character');
            }
            
            // Phone validation (Kazakhstan format)
            if (!/^\+7\s?\([0-9]{3}\)\s?[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(phone)) {
                isValid = false;
                errors.push('Please enter a valid phone number in format: +7(XXX)XXX-XX-XX');
            }
            
            // Date of Birth validation (must be at least 18 years old)
            const dobDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();
            if (age < 18) {
                isValid = false;
                errors.push('You must be at least 18 years old to register');
            }
            
            if (!isValid) {
                $('#errorMessages').html(errors.map(error => `<div class="alert alert-danger">${error}</div>`).join(''));
                $('#errorMessages').slideDown();
            } else {
                // Simulate email verification
                simulateEmailCheck(email).then(isAvailable => {
                    if (isAvailable) {
                        $('#registrationForm').slideUp(400, function() {
                            $(this).html('<div class="alert alert-success">Registration successful! Welcome to RC Clinic.</div>').slideDown();
                        });
                    } else {
                        $('#errorMessages').html('<div class="alert alert-danger">This email is already registered</div>').slideDown();
                    }
                });
            }
        });
    }
});

// 2. Calories Burned Calculator
$(document).ready(function() {
    const caloriesCalculator = $('#caloriesCalculator');
    
    if (caloriesCalculator.length) {
        const foodCalories = {
            burger: 354,
            pizza: 266,
            rice: 130,
            vegetables: 65,
            'chicken-breast': 165
        };
        
        caloriesCalculator.on('change', 'select, input', function() {
            const distance = parseFloat($('#walkingDistance').val()) || 0;
            const foodType = $('#foodType').val();
            const quantity = parseInt($('#foodQuantity').val()) || 0;
            
            // Calculate calories burned (average person burns 60 calories per km walked)
            const caloriesBurned = distance * 60;
            const caloriesConsumed = foodCalories[foodType] * quantity;
            const additionalWalkingNeeded = Math.max(0, (caloriesConsumed - caloriesBurned) / 60);
            
            // Update progress bar
            const progressPercentage = Math.min(100, (caloriesBurned / caloriesConsumed) * 100);
            $('#caloriesProgress').css('width', progressPercentage + '%');
            
            // Update results
            $('#caloriesResult').html(`
                <p>Calories consumed: ${caloriesConsumed}</p>
                <p>Calories burned: ${caloriesBurned.toFixed(0)}</p>
                <p>Additional walking needed: ${additionalWalkingNeeded.toFixed(1)} km</p>
            `);
        });
    }
});

// 3. Doctor Search Filter
$(document).ready(function() {
    const doctorSearch = $('#doctorSearch');
    
    if (doctorSearch.length) {
        const doctors = [
            { name: 'Dr. Azamat Nurlybekov', specialization: 'orthopedics' },
            { name: 'Dr. Dinara Saduakassova', specialization: 'neurology' },
            { name: 'Dr. Ruslan Mammadov', specialization: 'cardiology' },
            // Add more doctors as needed
        ];
        
        // Initialize autocomplete
        $('#doctorName').autocomplete({
            source: doctors.map(doctor => doctor.name)
        });
        
        // Specialization filter
        $('#specialization').on('change', function() {
            const selectedSpec = $(this).val();
            const filteredDoctors = selectedSpec === 'all' ? 
                doctors : 
                doctors.filter(doctor => doctor.specialization === selectedSpec);
            
            // Update doctor list with animation
            const doctorList = $('#doctorList');
            doctorList.fadeOut(400, function() {
                doctorList.html(filteredDoctors.map(doctor => `
                    <div class="doctor-card">
                        <h4>${doctor.name}</h4>
                        <p>${doctor.specialization}</p>
                    </div>
                `).join('')).fadeIn();
            });
        });
    }
});

// 4. Schedule of Available Consultation Appointments
$(document).ready(function() {
    const appointmentSchedule = $('#appointmentSchedule');
    
    if (appointmentSchedule.length) {
        // Initialize calendar
        const calendar = $('#calendar').datepicker({
            minDate: 0,
            maxDate: '+2m',
            onSelect: function(dateText) {
                updateTimeSlots(dateText);
            }
        });
        
        function updateTimeSlots(date) {
            // Simulate available time slots
            const availableSlots = generateTimeSlots(date);
            const timeSlotContainer = $('#timeSlots');
            
            timeSlotContainer.fadeOut(400, function() {
                timeSlotContainer.html(availableSlots.map(slot => `
                    <button class="btn btn-outline-primary m-1 time-slot" 
                            data-time="${slot.time}"
                            ${slot.booked ? 'disabled' : ''}>
                        ${slot.time}
                    </button>
                `).join('')).fadeIn();
            });
        }
    }
});

// Custom Feature 1: Interactive Recovery Progress Tracker
$(document).ready(function() {
    const progressTracker = $('#recoveryProgressTracker');
    
    if (progressTracker.length) {
        // Initialize charts
        const ctx = document.getElementById('progressChart').getContext('2d');
        const progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Range of Motion',
                    data: [30, 45, 60, 75],
                    borderColor: 'rgb(75, 192, 192)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
        
        // Add progress update functionality
        $('#addProgress').on('click', function() {
            const newValue = parseInt($('#progressValue').val());
            if (!isNaN(newValue)) {
                progressChart.data.labels.push(`Week ${progressChart.data.labels.length + 1}`);
                progressChart.data.datasets[0].data.push(newValue);
                progressChart.update();
            }
        });
    }
});

// Custom Feature 2: Smart Rehabilitation Program Recommender
$(document).ready(function() {
    const programRecommender = $('#programRecommender');
    
    if (programRecommender.length) {
        const questions = [
            {
                id: 'painLevel',
                text: 'What is your current pain level? (1-10)',
                type: 'range',
                min: 1,
                max: 10
            },
            {
                id: 'mobility',
                text: 'How would you rate your current mobility?',
                type: 'select',
                options: ['Limited', 'Moderate', 'Good']
            },
            {
                id: 'goals',
                text: 'What are your primary rehabilitation goals?',
                type: 'checkbox',
                options: ['Pain Management', 'Improved Mobility', 'Return to Sports', 'Daily Activities']
            }
        ];
        
        // Generate question form
        programRecommender.html(questions.map(question => `
            <div class="mb-3">
                <label class="form-label">${question.text}</label>
                ${generateQuestionInput(question)}
            </div>
        `).join(''));
        
        // Process answers and recommend program
        $('#submitAnswers').on('click', function() {
            const answers = collectAnswers();
            const recommendation = generateRecommendation(answers);
            
            $('#recommendationResult').fadeOut(400, function() {
                $(this).html(`
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Recommended Program</h5>
                            <p class="card-text">${recommendation.program}</p>
                            <p class="card-text">${recommendation.description}</p>
                        </div>
                    </div>
                `).fadeIn();
            });
        });
    }
});

// Helper functions
function simulateEmailCheck(email) {
    // Simulate API call to check email availability
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate some emails as already taken
            const takenEmails = ['test@example.com', 'admin@rcclinic.kz'];
            resolve(!takenEmails.includes(email));
        }, 1000);
    });
}

function generateTimeSlots(date) {
    // Generate time slots between 9 AM and 5 PM
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
        slots.push({
            time: `${hour}:00`,
            booked: Math.random() > 0.7 // Randomly mark some slots as booked
        });
        slots.push({
            time: `${hour}:30`,
            booked: Math.random() > 0.7
        });
    }
    return slots;
}

function generateQuestionInput(question) {
    switch (question.type) {
        case 'range':
            return `<input type="range" class="form-range" id="${question.id}" 
                    min="${question.min}" max="${question.max}">`;
        case 'select':
            return `
                <select class="form-select" id="${question.id}">
                    ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>`;
        case 'checkbox':
            return question.options.map(opt => `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${opt}" id="${opt}">
                    <label class="form-check-label" for="${opt}">${opt}</label>
                </div>
            `).join('');
        default:
            return '';
    }
}

function generateRecommendation(answers) {
    // Logic to determine program based on answers
    // This is a simplified example
    if (answers.painLevel > 7) {
        return {
            program: 'Intensive Care Program',
            description: 'A carefully monitored program focusing on pain management and gradual mobility improvement.'
        };
    } else if (answers.mobility === 'Limited') {
        return {
            program: 'Progressive Mobility Program',
            description: 'Structured program to improve mobility and strength with personalized exercises.'
        };
    } else {
        return {
            program: 'Advanced Recovery Program',
            description: 'Comprehensive program for active individuals focusing on performance optimization.'
        };
    }
}
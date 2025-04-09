/**
 * TechSolutions Web Project - JavaScript Implementation
 * 
 * @contributors:
 *   - Emmanuel Nkhata <emmanuel.nkhata@cs.unza.zm> (Core functionality)
 *   - Stephan Nyirenda <stephan.nyirenda@unza.zm> (UI/Design features)
 * 
 * @university: University of Zambia - Computer Science Department
 * @course: Web Development Technologies
 * @date: ${new Date().toLocaleDateString()}
 */

"use strict";

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initFAQAccordion();
    initContactForm();
    initTeamLoader();
    initBackToTop();
    initCurrentYear();
    
    // Additional initializations
    formatPhoneNumbers();
});

// ==================== CORE FUNCTIONALITY ====================

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', toggleTheme);

    // Check for saved theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        updateThemeToggleIcon(true);
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    updateThemeToggleIcon(isDark);
    localStorage.setItem('darkTheme', isDark);
}

/**
 * Update theme toggle icon and text
 * @param {boolean} isDark - Whether dark theme is active
 */
function updateThemeToggleIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');

    if (isDark) {
        icon?.classList.replace('fa-moon', 'fa-sun');
        text.textContent = 'Light Mode';
    } else {
        icon?.classList.replace('fa-sun', 'fa-moon');
        text.textContent = 'Dark Mode';
    }
}

// ==================== FAQ COMPONENT ====================

/**
 * Initialize FAQ accordion functionality
 */
function initFAQAccordion() {
    const questions = document.querySelectorAll('.question');
    if (!questions.length) return;

    questions.forEach(question => {
        question.addEventListener('click', toggleFAQItem);
        question.addEventListener('keydown', handleFAQKeyPress);
    });
}

/**
 * Toggle FAQ item visibility
 * @param {Event} e - Click event
 */
function toggleFAQItem(e) {
    const faqItem = e.currentTarget.closest('.faq-item');
    if (!faqItem) return;

    const isOpening = !faqItem.classList.contains('active');

    // Close all other items if opening this one
    if (isOpening) {
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });
    }

    faqItem.classList.toggle('active');
}

/**
 * Handle keyboard navigation for FAQ
 * @param {Event} e - Keydown event
 */
function handleFAQKeyPress(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.currentTarget.click();
    }
}

// ==================== CONTACT FORM ====================

/**
 * Initialize contact form with validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmit);

    // Real-time email validation
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.addEventListener('input', validateEmailInput);
    }
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const responseElement = document.getElementById('response') || createResponseElement(form);
    
    // Validate form
    if (!validateForm(formData)) {
        showResponse('Please fill out all fields correctly.', 'error', responseElement);
        return;
    }

    try {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual fetch in production)
        await simulateFormSubmission();
        
        // Show success message
        const name = formData.get('name');
        showResponse(`Thank you, ${name}! We've received your message and will respond soon.`, 'success', responseElement);
        form.reset();
    } catch (error) {
        showResponse('Failed to send message. Please try again later.', 'error', responseElement);
    } finally {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }
}

/**
 * Validate form inputs
 * @param {FormData} formData - Form data to validate
 * @returns {boolean} - Whether form is valid
 */
function validateForm(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject');
    const message = formData.get('message').trim();

    return name && email && subject && message && validateEmail(email);
}

/**
 * Validate email input in real-time
 * @param {Event} e - Input event
 */
function validateEmailInput(e) {
    const email = e.target.value.trim();
    const errorElement = document.getElementById('emailError') || createEmailErrorElement(e.target);
    
    if (email && !validateEmail(email)) {
        errorElement.textContent = 'Please enter a valid email address';
        e.target.classList.add('invalid');
    } else {
        errorElement.textContent = '';
        e.target.classList.remove('invalid');
    }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Simulate form submission (replace with actual API call)
 * @returns {Promise} - Promise that resolves after delay
 */
function simulateFormSubmission() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

// ==================== TEAM MEMBERS FETCH ====================

/**
 * Initialize team member loading functionality
 */
function initTeamLoader() {
    const loadUsersBtn = document.getElementById('loadUsersBtn');
    if (!loadUsersBtn) return;

    loadUsersBtn.addEventListener('click', loadTeamMembers);
}

/**
 * Load team members from API
 */
/**
 * Load our actual team members (no API call needed)
 */
async function loadTeamMembers() {
    const loadUsersBtn = document.getElementById('loadUsersBtn');
    const userList = document.getElementById('userList');
    
    if (!loadUsersBtn || !userList) return;

    try {
        // Show loading state
        loadUsersBtn.disabled = true;
        loadUsersBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading delay (1 second)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Our actual team data
        const teamMembers = [
            {
                name: "Emmanuel Nkhata",
                email: "emmanuelnkhata701@gmail.com",
                role: "Lead Developer"
            },
            {
                name: "Stephan Nyirenda",
                email: "stephan.nyirenda@cs.unza.zm",
                role: "UI/UX Designer"
            }
        ];
        
        // Display our team
        renderTeamMembers(teamMembers, userList);
        
        // Update button text (since we have no refresh functionality now)
        loadUsersBtn.innerHTML = '<i class="fas fa-check"></i> Team Loaded';
    } catch (error) {
        console.error('Error:', error);
        userList.innerHTML = '<li class="error">Failed to load team members.</li>';
        loadUsersBtn.innerHTML = '<i class="fas fa-redo"></i> Try Again';
    } finally {
        if (loadUsersBtn) loadUsersBtn.disabled = false;
    }
}

/**
 * Render our actual team members
 */
function renderTeamMembers(members, container) {
    container.innerHTML = '';

    members.forEach(member => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${member.name}</strong>
            <p><i class="fas fa-envelope"></i> ${member.email}</p>
            <small>${member.role}</small>
        `;
        container.appendChild(li);
    });
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Show response message
 * @param {string} message - Message to display
 * @param {string} type - Type of response (success/error)
 * @param {HTMLElement} [element] - Element to show message in
 */
function showResponse(message, type, element) {
    const responseElement = element || document.getElementById('response');
    if (!responseElement) return;

    responseElement.textContent = message;
    responseElement.className = `form-response ${type}`;
    responseElement.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        responseElement.style.display = 'none';
    }, 5000);
}

/**
 * Create response element if it doesn't exist
 * @param {HTMLElement} form - Form element
 * @returns {HTMLElement} - Response element
 */
function createResponseElement(form) {
    const responseElement = document.createElement('div');
    responseElement.id = 'response';
    form.appendChild(responseElement);
    return responseElement;
}

/**
 * Create email error element if it doesn't exist
 * @param {HTMLElement} input - Email input element
 * @returns {HTMLElement} - Error element
 */
function createEmailErrorElement(input) {
    const errorElement = document.createElement('div');
    errorElement.id = 'emailError';
    errorElement.className = 'error-message';
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    return errorElement;
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.title = 'Back to Top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    // Scroll event listener with debounce
    let isScrolling;
    window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            backToTopBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
        }, 100);
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize current year in footer
 */
function initCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear, .current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

/**
 * Format phone numbers for display
 */
function formatPhoneNumbers() {
    document.querySelectorAll('.phone-link, .phone-number').forEach(link => {
        const phoneNumber = link.textContent.replace(/\D/g, '');
        if (phoneNumber.length === 10) {
            link.textContent = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        }
        if (link.classList.contains('phone-link')) {
            link.href = `tel:${phoneNumber}`;
        }
    });
}

// ==================== EVENT DELEGATION ====================

/**
 * Set up event delegation for dynamic elements
 */
document.addEventListener('click', function(e) {
    // Handle any dynamically added elements here
    // Example:
    // if (e.target.matches('.some-dynamic-element')) {
    //     handleDynamicElementClick(e);
    // }
});
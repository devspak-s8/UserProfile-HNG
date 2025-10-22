  function initializePageRouting() {
            const navLinks = document.querySelectorAll('.nav-link');
            const pageSections = document.querySelectorAll('.page-section');

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page');
                    
                    // Remove active class from all links and sections
                    navLinks.forEach(l => l.classList.remove('active'));
                    pageSections.forEach(section => section.classList.remove('active'));
                    
                    // Add active class to clicked link and corresponding section
                    this.classList.add('active');
                    document.getElementById(pageId).classList.add('active');
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                });
            });
        }

        function initializeContactForm() {
            const form = document.getElementById('contact-form');
            const successMessage = document.getElementById('success-message');

            if (!form) return;

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset success message
                successMessage.classList.remove('show');
                
                // Validate form
                const isValid = validateForm();
                
                if (isValid) {
                    // Show success message
                    successMessage.classList.add('show');
                    
                    // Reset form
                    form.reset();
                    
                    // Clear error states
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('error');
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }
            });
        }

        function validateForm() {
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');
            
            let isValid = true;

            // Validate name
            if (!nameInput.value.trim()) {
                setError(nameInput, 'Name is required');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                setError(emailInput, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                setError(emailInput, 'Please enter a valid email (e.g., name@example.com)');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            // Validate subject
            if (!subjectInput.value.trim()) {
                setError(subjectInput, 'Subject is required');
                isValid = false;
            } else {
                clearError(subjectInput);
            }

            // Validate message
            if (!messageInput.value.trim()) {
                setError(messageInput, 'Message is required');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                setError(messageInput, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                clearError(messageInput);
            }

            return isValid;
        }

        function setError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            formGroup.classList.add('error');
            errorElement.textContent = message;
        }

        function clearError(input) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            formGroup.classList.remove('error');
            errorElement.textContent = '';
        }

        function updateTime() {
            const timeDisplay = document.getElementById('time-display');
            const timeElement = document.querySelector('time[data-testid="test-user-time"]');
            const currentTime = Date.now();
            
            if (timeDisplay) {
                timeDisplay.textContent = currentTime;
            }
            if (timeElement) {
                timeElement.dateTime = new Date(currentTime).toISOString();
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            initializePageRouting();
            initializeContactForm();
            updateTime();
            setInterval(updateTime, 100);
        });

        // Added contact form styles
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.id === 'time-display') {
                    const announcement = document.createElement('div');
                    announcement.setAttribute('role', 'status');
                    announcement.setAttribute('aria-live', 'polite');
                    announcement.setAttribute('aria-atomic', 'true');
                    announcement.style.position = 'absolute';
                    announcement.style.left = '-10000px';
                    announcement.textContent = `Current time updated to ${mutation.target.textContent} milliseconds`;
                    document.body.appendChild(announcement);
                    
                    setTimeout(() => announcement.remove(), 1000);
                }
            });
        });

        observer.observe(document.getElementById('time-display'), {
            characterData: true,
            subtree: true,
            childList: true
        });
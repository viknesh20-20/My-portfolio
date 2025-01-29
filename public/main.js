// Dark Mode Toggle
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;

themeToggleButton.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    themeToggleButton.textContent = bodyElement.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';

});

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



// Contact Form Submission (Using Fetch API)
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button');
    
    // Disable the button during the request
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Send form data to your backend (server.js) using fetch API
        const response = await fetch('/submit-contact', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Success message with fade-in animation
            showMessage('Your message has been sent successfully!', 'success');
            contactForm.reset(); // Reset form after submission
        } else {
            showMessage('There was an error submitting your message. Please try again later.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Something went wrong. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

// Function to display success or error messages
function showMessage(message, type) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', type);
    messageContainer.textContent = message;
    
    document.body.appendChild(messageContainer);
    
    // Animate the message
    messageContainer.style.transition = 'opacity 0.5s ease-in-out';
    messageContainer.style.opacity = 1;
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        messageContainer.style.opacity = 0;
        setTimeout(() => {
            messageContainer.remove();
        }, 500);
    }, 5000);
}

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

    const formData = {
        name: contactForm.querySelector('input[name="name"]').value,
        email: contactForm.querySelector('input[name="email"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value
    };

    const submitButton = contactForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        const response = await fetch('/submit-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showMessage('Your message has been sent successfully!', 'success');
            contactForm.reset();
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

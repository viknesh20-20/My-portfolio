// Dark Mode Toggle
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;

themeToggleButton.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    themeToggleButton.textContent = bodyElement.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
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
// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send data to the server
    fetch('/submit-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${name}&email=${email}&message=${message}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('contact-form').reset();
    })
    .catch(error => console.error('Error:', error));
});

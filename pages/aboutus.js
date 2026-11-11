
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});


const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});


function sendContactMessage() {
    const inputs = document.querySelectorAll('.contact-input');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const message = inputs[2].value.trim();
    const msg = document.getElementById('contactSentMsg');

    if (!name || !email || !message) {
        msg.textContent = '! Please complete all form fields.';
        msg.style.color = '#EF4444';
        return;
    }

    msg.textContent = '✓ Message transmitted. We will respond shortly.';
    msg.style.color = 'var(--accent)';
    inputs[0].value = '';
    inputs[1].value = '';
    inputs[2].value = '';
}
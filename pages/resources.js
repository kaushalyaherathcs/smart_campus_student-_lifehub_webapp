// --- Mobile Navbar Toggle ---
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

// --- Theme Switcher ---
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// --- Vue FAQ App Logic ---
if (document.getElementById('faqApp')) {
    Vue.createApp({
        data() {
            return {
                faqs: [
                    {
                        question: 'How do I register for exams?',
                        answer: 'Log in to the OUSL student portal at online.ou.ac.lk and navigate to Exam Registration under the Academic section. Registration opens 6 weeks before the exam period.',
                        open: false
                    },
                    {
                        question: 'Where can I find past papers?',
                        answer: 'Past papers are available in the Resources section under the Past Papers tab. You can also find them on the OUSL library website at library.ou.ac.lk.',
                        open: false
                    },
                    {
                        question: 'How do I contact my lecturer?',
                        answer: 'You can contact your lecturer through the OUSL student portal messaging system, or find their email on the course page under Course Information.',
                        open: false
                    }
                ]
            }
        },
        methods: {
            toggle(index) {
                this.faqs[index].open = !this.faqs[index].open;
            }
        }
    }).mount('#faqApp');
}
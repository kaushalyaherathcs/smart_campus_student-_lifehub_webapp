//-----------------------------------For responsive nav bar
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const themeToggle = document.getElementById('themeToggle');

const sunIcon = document.getElementById('light');
const moonIcon = document.getElementById('dark');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});


function setTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme); 

  if (theme === 'dark') {
    sunIcon.style.setProperty('display', 'block', 'important');
    moonIcon.style.setProperty('display', 'none', 'important');
  } else {
    moonIcon.style.setProperty('display', 'block', 'important');
    sunIcon.style.setProperty('display', 'none', 'important');
  }
}


const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

//-------------------------------------------------Switch theme on click
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

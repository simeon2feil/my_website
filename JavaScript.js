const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
const clockElement = document.getElementById('live-clock');
const yearElements = document.querySelectorAll('#year');
const heroTitle = document.querySelector('.hero h1');
const heroMessage = document.querySelector('.hero .welcome-line');
let activeThemeMode = localStorage.getItem('themeMode') || 'light';

function setTheme(mode) {
  activeThemeMode = mode;
  const isDark = mode === 'dark';
  document.body.classList.toggle('dark', isDark);
  document.body.classList.remove('white-mode');

  localStorage.setItem('themeMode', mode);
  toggleButtons.forEach((button) => {
    button.textContent = isDark ? 'Switch to light' : 'Switch to dark';
  });

  document.body.classList.remove('theme-transition');
  void document.body.offsetWidth;
  document.body.classList.add('theme-transition');

  window.setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 700);
}

function updateClock() {
  if (clockElement) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'your timezone';
    clockElement.textContent = `${time} · ${zone}`;
  }
}

function updateGreeting() {
  if (heroTitle) {
    const hour = new Date().getHours();
    let greeting = 'Hi, I’m Simeon';

    if (hour < 12) {
      greeting = 'Good morning — I’m Simeon';
    } else if (hour < 18) {
      greeting = 'Good afternoon — I’m Simeon';
    } else {
      greeting = 'Good evening — I’m Simeon';
    }

    heroTitle.textContent = greeting;
  }

  if (heroMessage) {
    heroMessage.textContent = 'A calm little portfolio with a few ideas, projects, and a bit of code.';
  }
}

function revealCards() {
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card) => {
    card.classList.add('reveal');
    observer.observe(card);
  });
}

toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextMode = document.body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(nextMode);
  });
});

const savedTheme = localStorage.getItem('themeMode') || 'light';

setTheme(savedTheme);

yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});

updateGreeting();
updateClock();
setInterval(updateClock, 1000);
revealCards();

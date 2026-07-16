const toggleButton = document.getElementById('theme-toggle');
const nightModeButton = document.getElementById('night-mode-button');
const colorThemeSelect = document.getElementById('color-theme-select');
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
  if (toggleButton) {
    toggleButton.textContent = isDark ? 'Switch to light' : 'Switch to dark';
  }
}

function setColorTheme(theme) {
  document.body.classList.remove('theme-default', 'theme-sunset', 'theme-forest', 'theme-midnight');
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('colorTheme', theme);
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

const colorThemes = ['default', 'sunset', 'forest', 'midnight'];

function cycleColorTheme() {
  const current = localStorage.getItem('colorTheme') || 'default';
  const idx = colorThemes.indexOf(current);
  const next = colorThemes[(idx + 1) % colorThemes.length];
  setColorTheme(next);
  if (colorThemeSelect) colorThemeSelect.value = next;
}

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const nextMode = document.body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(nextMode);
  });
}

if (nightModeButton) {
  nightModeButton.addEventListener('click', () => {
    setTheme('dark');
  });
}

if (colorThemeSelect) {
  colorThemeSelect.addEventListener('change', (event) => {
    setColorTheme(event.target.value);
  });
}

const savedTheme = localStorage.getItem('themeMode') || 'light';
const savedColorTheme = localStorage.getItem('colorTheme') || 'default';

setTheme(savedTheme);
setColorTheme(savedColorTheme);

if (colorThemeSelect) {
  colorThemeSelect.value = savedColorTheme;
}

yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});

updateGreeting();
updateClock();
setInterval(updateClock, 1000);
revealCards();

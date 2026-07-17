const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
const themeSelects = document.querySelectorAll('[data-theme-select]');
const clockElement = document.getElementById('live-clock');
const yearElements = document.querySelectorAll('#year');
const heroTitle = document.querySelector('.hero h1');
const heroMessage = document.querySelector('.hero .welcome-line');
let activeThemeMode = localStorage.getItem('themeMode') || 'default';

function setTheme(mode) {
  activeThemeMode = mode;
  document.body.classList.remove('theme-default', 'theme-white', 'theme-green', 'theme-yellow', 'theme-black');
  document.body.classList.add(`theme-${mode}`);

  localStorage.setItem('themeMode', mode);
  toggleButtons.forEach((button) => {
    button.textContent = `Theme: ${mode}`;
  });
  themeSelects.forEach((select) => {
    select.value = mode;
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
    const themes = ['default', 'white', 'green', 'yellow', 'black'];
    const current = activeThemeMode || 'default';
    const nextIndex = (themes.indexOf(current) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  });
});

themeSelects.forEach((select) => {
  select.addEventListener('change', (event) => {
    setTheme(event.target.value);
  });
});

const savedTheme = localStorage.getItem('themeMode') || 'default';

setTheme(savedTheme);

yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});

updateGreeting();
updateClock();
setInterval(updateClock, 1000);
revealCards();

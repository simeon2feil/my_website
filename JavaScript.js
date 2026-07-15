const toggleButton = document.getElementById('theme-toggle');
const nightModeButton = document.getElementById('night-mode-button');
const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const colorThemeSelect = document.getElementById('color-theme-select');
const whiteModeToggle = document.getElementById('white-mode-toggle');
const clockElement = document.getElementById('live-clock');
const yearElements = document.querySelectorAll('#year');
const heroTitle = document.querySelector('.hero h1');
const heroMessage = document.querySelector('.hero .welcome-line');

function setTheme(mode) {
  document.body.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('themeMode', mode);
  if (toggleButton) {
    toggleButton.textContent = mode === 'dark' ? 'Light mode' : 'Dark mode';
  }
}

function setColorTheme(theme) {
  document.body.classList.remove('theme-default', 'theme-sunset', 'theme-forest', 'theme-midnight');
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('colorTheme', theme);
}

function setWhiteMode(enabled) {
  document.body.classList.toggle('white-mode', enabled);
  localStorage.setItem('whiteMode', String(enabled));
  if (whiteModeToggle) {
    whiteModeToggle.checked = enabled;
  }
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

function createSparkles() {
  const count = 20;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    sparkle.style.background = ['#4f46e5', '#7c3aed', '#38bdf8', '#ff7a1a'][Math.floor(Math.random() * 4)];
    fragment.appendChild(sparkle);
  }

  document.body.appendChild(fragment);
}

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });
}

if (nightModeButton) {
  nightModeButton.addEventListener('click', () => {
    setTheme('dark');
  });
}

if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener('click', () => {
    settingsPanel.hidden = !settingsPanel.hidden;
  });
}

if (colorThemeSelect) {
  colorThemeSelect.addEventListener('change', (event) => {
    setColorTheme(event.target.value);
  });
}

if (whiteModeToggle) {
  whiteModeToggle.addEventListener('change', (event) => {
    setWhiteMode(event.target.checked);
  });
}

const savedTheme = localStorage.getItem('themeMode') || 'light';
const savedColorTheme = localStorage.getItem('colorTheme') || 'default';
const savedWhiteMode = localStorage.getItem('whiteMode') === 'true';

setTheme(savedTheme);
setColorTheme(savedColorTheme);
setWhiteMode(savedWhiteMode);

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
createSparkles();

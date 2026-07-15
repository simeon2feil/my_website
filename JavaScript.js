const toggleButton = document.getElementById('theme-toggle');
const quickThemeButton = document.getElementById('quick-theme-toggle');
const nightModeButton = document.getElementById('night-mode-button');
const colorThemeSelect = document.getElementById('color-theme-select');
const whiteModeToggle = document.getElementById('white-mode-toggle');
const clockElement = document.getElementById('live-clock');
const yearElements = document.querySelectorAll('#year');
const heroTitle = document.querySelector('.hero h1');
const heroMessage = document.querySelector('.hero .welcome-line');
let activeThemeMode = localStorage.getItem('themeMode') || 'light';
let sparkleElements = [];

function setTheme(mode) {
  activeThemeMode = mode;
  const isDark = mode === 'dark';
  document.body.classList.toggle('dark', isDark);
  // when switching to light, keep white-mode if user enabled it
  const whiteEnabled = localStorage.getItem('whiteMode') === 'true';
  if (!isDark && whiteEnabled) {
    document.body.classList.add('white-mode');
  } else if (isDark) {
    document.body.classList.remove('white-mode');
  }

  localStorage.setItem('themeMode', mode);
  if (toggleButton) {
    toggleButton.textContent = isDark ? 'Switch to light' : 'Switch to dark';
  }
  // control sparkles when theme changes
  if (isDark) {
    createSparkles();
  } else {
    removeSparkles();
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
  if (enabled) {
    setTheme('light');
  } else {
    setTheme(activeThemeMode);
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
  // only create sparkles if in dark mode and none exist
  if (!document.body.classList.contains('dark')) return;
  if (sparkleElements.length) return;
  const count = 20;
  for (let i = 0; i < count; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    sparkle.style.background = ['#4f46e5', '#7c3aed', '#38bdf8', '#ff7a1a'][Math.floor(Math.random() * 4)];
    document.body.appendChild(sparkle);
    sparkleElements.push(sparkle);
  }
}

function removeSparkles() {
  if (!sparkleElements.length) return;
  sparkleElements.forEach(el => el.remove());
  sparkleElements = [];
}

const colorThemes = ['default', 'sunset', 'forest', 'midnight'];

function cycleColorTheme() {
  const current = localStorage.getItem('colorTheme') || 'default';
  const idx = colorThemes.indexOf(current);
  const next = colorThemes[(idx + 1) % colorThemes.length];
  setColorTheme(next);
  if (colorThemeSelect) colorThemeSelect.value = next;
}

if (quickThemeButton) {
  quickThemeButton.addEventListener('click', cycleColorTheme);
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

if (whiteModeToggle) {
  whiteModeToggle.addEventListener('change', (event) => {
    setWhiteMode(event.target.checked);
  });
}

// ensure settings link always navigates when present (some browsers may block inactive anchors)
const settingsLink = document.getElementById('settings-link');
if (settingsLink) {
  settingsLink.addEventListener('click', (e) => {
    // allow normal navigation but ensure it works as fallback
    e.preventDefault();
    window.location.href = settingsLink.getAttribute('href') || 'settings.html';
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
// sparkles are created/removed by setTheme() as needed

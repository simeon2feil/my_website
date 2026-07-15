const toggleButton = document.getElementById('theme-toggle');
const yearElement = document.getElementById('year');

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggleButton.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  if (toggleButton) {
    toggleButton.textContent = '☀️';
  }
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

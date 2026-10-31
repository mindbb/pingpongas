// Language switch (LT / EN)
const titles = {
  lt: 'Pingpongas — Čikagos lietuvių stalo teniso klubas',
  en: 'Pingpongas — Chicago Lithuanian Table Tennis Club',
};
const langButtons = document.querySelectorAll('[data-set-lang]');

function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.lang = lang;
  document.title = titles[lang];
  langButtons.forEach((b) => {
    const on = b.dataset.setLang === lang;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on);
  });
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

langButtons.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.setLang)));
setLang(document.documentElement.getAttribute('data-lang'));

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

links.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

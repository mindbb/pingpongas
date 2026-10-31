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

// Tournament registration form — entries are emailed to the club
const CLUB_EMAIL = 'pingpongmb@gmail.com';
const dialog = document.getElementById('register');
const form = document.getElementById('register-form');
const msg = form.querySelector('.register-msg');
const submitBtn = form.querySelector('[type="submit"]');
const text = {
  lt: { required: 'Įveskite vardą ir pavardę.', sending: 'Siunčiama…', ok: 'Ačiū! Jūsų registracija gauta.', fail: 'Nepavyko išsiųsti. Parašykite mums: ' },
  en: { required: 'Please enter your first and last name.', sending: 'Sending…', ok: 'Thank you! Your registration was received.', fail: 'Could not send. Please email us: ' },
};
const t = (k) => text[document.documentElement.getAttribute('data-lang')][k];

document.querySelectorAll('[data-register]').forEach((b) => b.addEventListener('click', () => {
  form.reset();
  msg.textContent = '';
  msg.className = 'register-msg';
  submitBtn.disabled = false;
  form.dataset.tournament = b.dataset.register;
  document.getElementById('register-title').textContent = b.dataset.register;
  dialog.showModal();
}));

dialog.querySelector('.register-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const first = form.first_name.value.trim();
  const last = form.last_name.value.trim();
  if (!first || !last) { msg.textContent = t('required'); msg.className = 'register-msg error'; return; }
  if (form._honey.value) return;

  submitBtn.disabled = true;
  msg.textContent = t('sending');
  msg.className = 'register-msg';
  try {
    const res = await fetch('https://formsubmit.co/ajax/' + CLUB_EMAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'Registracija: ' + form.dataset.tournament + ' — ' + first + ' ' + last,
        _template: 'table',
        Turnyras: form.dataset.tournament,
        Vardas: first,
        'Pavardė': last,
        Reitingas: form.rating.value.trim() || '—',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === 'false' || data.success === false) throw new Error(data.message || res.status);
    msg.textContent = t('ok');
    msg.className = 'register-msg ok';
    setTimeout(() => dialog.close(), 2500);
  } catch (err) {
    msg.innerHTML = '';
    msg.append(t('fail'));
    const a = document.createElement('a');
    a.href = 'mailto:' + CLUB_EMAIL;
    a.textContent = CLUB_EMAIL;
    msg.append(a);
    msg.className = 'register-msg error';
    submitBtn.disabled = false;
  }
});

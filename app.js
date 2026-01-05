// GG SOLUTIONS - INTERACTION ENGINE 2026

/**
 * МОБИЛНО МЕНЮ - LOGIC
 * Превключва видимостта и спира скрола на тялото.
 */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const body = document.body;

  const isHidden = menu.classList.toggle('hidden');
  body.style.overflow = isHidden ? 'auto' : 'hidden';
}

const scriptURL = "https://script.google.com/macros/s/AKfycbwlA4QYr91HrqR8mJC_mSg0ZVlZKlc2dLXCO2uDg8gNWw29l9XdRgp_gXUJCgcahE4wIw/exec";
const form = document.getElementById('emailForm');
const msg = document.getElementById('responseMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  hapticFeedback(); // Използваме твоята функция за вибрация

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      form.classList.add('hidden');
      msg.classList.remove('hidden');
    })
    .catch((error) => console.error('Error!', error.message));
});

/**
 * HAPTIC FEEDBACK - Тактилно потвърждение за Android
 */
function hapticFeedback() {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(50);
  }
}

/**
 * GDPR & GOOGLE CONSENT MODE V2
 */
function updateConsent(isAccepted) {
  const status = isAccepted ? 'granted' : 'denied';

  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }

  localStorage.setItem('gg_consent', isAccepted ? 'accepted' : 'rejected');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.add('hidden');
}

/**
 * INITIALIZATION ON LOAD
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. АВТОМАТИЧНО ПОДЧЕРТАВАНЕ НА АКТИВНАТА СТРАНИЦА
  // Взима текущия файл (напр. index.html)
  const path = window.location.pathname;
  const currentPage = path.split('/').pop() || 'index.html';

  const allLinks = document.querySelectorAll('.nav-link, .mobile-link');

  allLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      if (link.classList.contains('nav-link')) {
        link.classList.add('active'); // За десктоп стила ти
      } else {
        // Премахваме сивото и слагаме розовото в мобилното меню
        link.classList.remove('text-white/40');
        link.classList.add('text-pink');
      }
    }
  });

  // 2. ПРОВЕРКА НА COOKIES
  const consent = localStorage.getItem('gg_consent');
  const banner = document.getElementById('cookie-banner');
  if (!consent && banner) {
    banner.classList.remove('hidden');
  }

  // 3. ТАКТИЛНА ОБРАТНА ВРЪЗКА
  const interactiveElements = document.querySelectorAll('button, a, .nav-link, .pill-tab');
  interactiveElements.forEach((el) => {
    el.addEventListener('click', hapticFeedback);
  });

  // 4. ТАЙМЕР (Ако съществува функцията в същия файл или външно)
  if (typeof startCountdown === 'function') {
    startCountdown();
  }
});

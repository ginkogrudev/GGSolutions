// GG SOLUTIONS - INTERACTION ENGINE 2026

/**
 * Предизвиква кратка вибрация за тактилно потвърждение.
 * Работи на Android устройства.
 */
function hapticFeedback() {
  if (window.navigator && window.navigator.vibrate) {
    // 50ms е златният стандарт за "клик" усещане
    window.navigator.vibrate(50);
  }
}

/**
 * Инициализира автоматично тактилната обратна връзка
 * за всички важни бутони в приложението.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Селектираме всички големи бутони и навигационни линкове
  const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link, button');

  interactiveElements.forEach((el) => {
    el.addEventListener('click', () => {
      hapticFeedback();
    });
  });
});

// GDPR & GOOGLE CONSENT MODE V2
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookie-banner').classList.add('hidden');

  // Казваме на Google, че имаме съгласие
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
  });
}

function rejectCookies() {
  localStorage.setItem('cookieConsent', 'rejected');
  document.getElementById('cookie-banner').classList.add('hidden');
}

// Проверка при зареждане
document.addEventListener('DOMContentLoaded', () => {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    document.getElementById('cookie-banner').classList.remove('hidden');
  }
});

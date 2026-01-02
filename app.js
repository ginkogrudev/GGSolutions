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

// ФУНКЦИЯ ЗА АКТУАЛИЗИРАНЕ НА СЪГЛАСИЕТО
function updateConsent(isAccepted) {
  const status = isAccepted ? 'granted' : 'denied';

  // Подаваме избора на Google
  gtag('consent', 'update', {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  });

  // Запазваме избора в браузъра, за да не питаме пак
  localStorage.setItem('gg_consent', isAccepted ? 'accepted' : 'rejected');

  // Скриваме банера
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.add('hidden');
}

// ПРОВЕРКА ПРИ ЗАРЕЖДАНЕ
document.addEventListener('DOMContentLoaded', () => {
  const consent = localStorage.getItem('gg_consent');
  const banner = document.getElementById('cookie-banner');

  if (!consent && banner) {
    banner.classList.remove('hidden');
  } else if (consent === 'accepted') {
    // Ако вече е прието, потвърждаваме статуса за текущата сесия
    updateConsent(true);
  }
});

function startCountdown() {
  // Крайна дата: 1 февруари 2026, 00:00:00
  const deadline = new Date('Feb 1, 2026 00:00:00').getTime();

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = deadline - now;

    // Изчисления за дни, часове, минути
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Визуализация в HTML
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');

    // Ако времето изтече
    if (distance < 0) {
      clearInterval(x);
      document.querySelector('.timer-block').innerHTML = 'КРАЙ';
    }
  }, 1000);
}

// Стартирай при зареждане
document.addEventListener('DOMContentLoaded', startCountdown);

tailwind.config = {
  theme: {
    extend: {
      colors: {
        pink: '#ff2d55',
        dark: '#0a0a0a',
      },
      boxShadow: {
        'pink-neon': '0 0 20px rgba(255, 45, 85, 0.4)',
      },
    },
  },
};

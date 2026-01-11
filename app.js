// GG SOLUTIONS - CORE ENGINE 2026 (FINAL CLEAN VERSION)

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initNavigation();
  initInteractions();
  initForms();
});

/* -------------------------------------------------------------------------- */
/* 1. THEME ENGINE (Dark / Light / Soft)                                      */
/* -------------------------------------------------------------------------- */
function initThemeSystem() {
  const STORAGE_KEY = 'gg_theme_pref';
  const pillContainer = document.getElementById('theme-pill');

  // 1. Determine Theme
  let theme = localStorage.getItem(STORAGE_KEY);
  if (!theme) {
    const rand = Math.random();
    if (rand < 0.33) theme = 'dark';
    else if (rand < 0.66) theme = 'light';
    else theme = 'soft';
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // 2. Apply Theme
  document.documentElement.setAttribute('data-theme', theme);

  // 3. Render Pill
  if (pillContainer) {
    pillContainer.innerHTML = `
            <div class="flex items-center gap-1 glass px-2 py-1 rounded-full transition-all duration-300">
                <button onclick="setTheme('dark')" class="p-2 rounded-full hover:bg-white/10 transition text-lg ${
                  theme === 'dark' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'
                }">🌑</button>
                <button onclick="setTheme('light')" class="p-2 rounded-full hover:bg-white/10 transition text-lg ${
                  theme === 'light' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'
                }">☀️</button>
                <button onclick="setTheme('soft')" class="p-2 rounded-full hover:bg-white/10 transition text-lg ${
                  theme === 'soft' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'
                }">🖊️</button>
            </div>
        `;
  }
}

window.setTheme = function (newTheme) {
  localStorage.setItem('gg_theme_pref', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  initThemeSystem();
};

/* -------------------------------------------------------------------------- */
/* 2. NAVIGATION LOGIC                                                        */
/* -------------------------------------------------------------------------- */
function initNavigation() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link, .mobile-link');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
      if (link.classList.contains('mobile-link')) {
        link.classList.add('text-pink');
        link.classList.remove('opacity-50');
      }
    }
  });
}

window.toggleMenu = function () {
  const menu = document.getElementById('mobile-menu');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    menu.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

/* -------------------------------------------------------------------------- */
/* 3. INTERACTIONS                                                            */
/* -------------------------------------------------------------------------- */
function initInteractions() {
  const clickables = document.querySelectorAll('button, a');
  clickables.forEach((el) => {
    el.addEventListener('click', () => {
      if (navigator.vibrate) navigator.vibrate(15);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. FORMS & MODAL LOGIC (THE FIX)                                           */
/* -------------------------------------------------------------------------- */

// 1. Open Modal
window.openApplicationModal = function () {
  const modal = document.getElementById('application-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    console.error('Modal not found! Make sure the modal HTML is in the file.');
  }
};

// 2. Close Modal
window.closeApplicationModal = function () {
  const modal = document.getElementById('application-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

// 3. Handle Form Submission (Connected to Google Sheets)
window.handleFormSubmit = function (e) {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const form = document.getElementById('piggy-form');

  // Loading State
  btn.innerText = 'ОБРАБОТВАНЕ...';
  btn.disabled = true;
  btn.classList.add('opacity-75', 'cursor-wait');

  // Capture Data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // --- GOOGLE SHEETS CONNECTION ---
  // 👇 PASTE YOUR DEPLOYED GOOGLE SCRIPT URL BETWEEN THE QUOTES 👇
  const SCRIPT_URL =
    'https://script.google.com/a/macros/ginkogrudev.com/s/AKfycbzwakeBKu5_W1seVW3uRUZpZUu2gcY8ehNfyLSjAlHYUe3gr7PXoQA7R8Net0qSIpIQ/exec';

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(() => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          event_category: 'Form',
          event_label: 'Piggy_Application',
          value: 100, // We assign a theoretical value (e.g., 100лв) to the lead
        });
      }
      // Success
      form.classList.add('hidden');
      document.getElementById('form-success').classList.remove('hidden');
    })

    .catch((error) => {
      console.error('Error!', error.message);
      btn.innerText = 'ГРЕШКА! ОПИТАЙ ОТНОВО';
      btn.disabled = false;
    });
};

function initForms() {
  if (!localStorage.getItem('gg_consent')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('hidden');
  }
}

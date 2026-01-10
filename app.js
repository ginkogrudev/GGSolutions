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

  // 1. Determine Theme (LocalStorage > Random A/B/C Test)
  let theme = localStorage.getItem(STORAGE_KEY);

  if (!theme) {
    const rand = Math.random();
    if (rand < 0.33) theme = 'dark';
    else if (rand < 0.66) theme = 'light';
    else theme = 'soft';

    localStorage.setItem(STORAGE_KEY, theme);

    // Track the experiment
    if (typeof gtag !== 'undefined') {
      gtag('event', 'experiment_impression', {
        event_category: 'Theme_Test',
        event_label: theme,
      });
    }
  }

  // 2. Apply Theme (Attributes for CSS)
  document.documentElement.setAttribute('data-theme', theme);

  // 3. Render the Switcher Pill (if container exists in Nav)
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

// Global function to switch manually
window.setTheme = function (newTheme) {
  localStorage.setItem('gg_theme_pref', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  initThemeSystem(); // Re-render pill to update active state
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
      // If it's a mobile link, make it pink
      if (link.classList.contains('mobile-link')) {
        link.classList.add('text-pink');
        link.classList.remove('opacity-50');
      }
    }
  });
}

// Mobile Menu Toggle
window.toggleMenu = function () {
  const menu = document.getElementById('mobile-menu');
  const isHidden = menu.classList.contains('hidden');

  if (isHidden) {
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
  // Haptic Feedback
  const clickables = document.querySelectorAll('button, a');
  clickables.forEach((el) => {
    el.addEventListener('click', () => {
      if (navigator.vibrate) navigator.vibrate(15);
    });
  });

  // Accordion Logic
  window.toggleAccordion = function (btn) {
    const item = btn.closest('.accordion-item');
    document.querySelectorAll('.accordion-item').forEach((other) => {
      if (other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active');
  };
}

/* -------------------------------------------------------------------------- */
/* 4. FORMS                                                                   */
/* -------------------------------------------------------------------------- */

/* --- MODAL LOGIC --- */

// Open the Modal
window.openApplicationModal = function () {
  const modal = document.getElementById('application-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Stop background scrolling
};

// Close the Modal
window.closeApplicationModal = function () {
  const modal = document.getElementById('application-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = ''; // Restore scrolling
};

// Handle Form Submission (The Magic)
window.handleFormSubmit = function (e) {
  e.preventDefault(); // Stop page reload

  const btn = document.getElementById('submit-btn');
  const originalText = btn.innerText;

  // 1. Show Loading State
  btn.innerText = 'ОБРАБОТВАНЕ...';
  btn.classList.add('opacity-75', 'cursor-wait');

  // 2. Capture Data (Ready for Excel/Sheets later)
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log('Captured Lead:', data); // This is where we will hook up Google Sheets

  // 3. Simulate Server Delay & Show Success
  setTimeout(() => {
    document.getElementById('piggy-form').classList.add('hidden');
    document.getElementById('form-success').classList.remove('hidden');
    // Optional: Send data to Google Sheets here
  }, 1500);
};

function initForms() {
  // Cookie Banner
  if (!localStorage.getItem('gg_consent')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('hidden');
  }
}

window.updateConsent = function (accepted) {
  localStorage.setItem('gg_consent', accepted ? 'true' : 'false');
  document.getElementById('cookie-banner').classList.add('hidden');
  const status = accepted ? 'granted' : 'denied';
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', { ad_storage: status, analytics_storage: status });
  }
};

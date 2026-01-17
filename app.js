// GG SOLUTIONS - CORE ENGINE 2026 (FINAL CLEAN VERSION)

// 👇 1. GOOGLE SCRIPT URL (DO NOT TOUCH)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpxHzdkBouslhSv3GyfF8Oe8MhqCfLBs-_Vv0O2ZoNu9yvzQbF0WYy2c7vVUkp9E8AmQ/exec"; 

// 👇 2. SOCIAL MEDIA LINKS (UPDATE THESE)
const SOCIAL_CONFIG = {
    facebook:  "https://facebook.com/YOUR_PAGE",
    github:    "https://github.com/YOUR_PROFILE",
    linkedin:  "https://linkedin.com/in/YOUR_PROFILE",
    instagram: "https://instagram.com/YOUR_PROFILE",
    youtube:   "https://youtube.com/c/YOUR_CHANNEL"
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initNavigation();
  initInteractions();
  initCookieBanner();
  initSocials();           // 👈 NEW: Renders buttons
  initAnalyticsTracking(); // 👈 NEW: Tracks everything
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
/* 4. FORMS & ANALYTICS 2.0 (THE CONNECTED VERSION)                           */
/* -------------------------------------------------------------------------- */

// This function must be attached to the form via onsubmit="handleFormSubmit(event)"
window.handleFormSubmit = function(e) {
    e.preventDefault(); // Stop the page from reloading

    const form = e.target;
    const submitBtn = document.getElementById("submit-btn");
    const originalText = submitBtn.innerText;

    // 1. UI Loading State
    submitBtn.disabled = true;
    submitBtn.innerText = "⏳ Обработва се...";
    submitBtn.classList.add("opacity-75", "cursor-not-allowed");

    // 2. Gather Data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    // 3. Send to Google Sheets
    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: {
            "Content-Type": "text/plain;charset=utf-8", 
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        // Success!
        console.log("🐷 Data sent to Piggy Bank (Sheets)");
        
        // 4. Analytics 2.0 Event (Specific Form Success)
        if(typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({
                'event': 'lead_submitted_challenge',
                'user_email': data.email,
                'revenue_goal': data.revenue_goal
            });
        }

        // 5. Show Success Screen
        form.reset();
        document.getElementById("piggy-form").classList.add("hidden");
        document.getElementById("form-success").classList.remove("hidden");
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Опа! Нещо се обърка. Моля опитай пак или ми пиши директно.");
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
        submitBtn.classList.remove("opacity-75", "cursor-not-allowed");
    });
};

/* -------------------------------------------------------------------------- */
/* 5. MODAL LOGIC                                                             */
/* -------------------------------------------------------------------------- */

window.openApplicationModal = function() {
    const modal = document.getElementById('application-modal');
    if(modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeApplicationModal = function() {
    const modal = document.getElementById('application-modal');
    if(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        window.closeApplicationModal();
    }
});

/* -------------------------------------------------------------------------- */
/* 6. COOKIE BANNER LOGIC                                                     */
/* -------------------------------------------------------------------------- */

function initCookieBanner() {
  if (!localStorage.getItem('gg_consent')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('hidden');
  }
}

window.acceptCookies = function() {
    localStorage.setItem('gg_consent', 'true');
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.add('hidden');
    console.log("Cookies accepted.");
};

/* -------------------------------------------------------------------------- */
/* 7. SOCIAL BUTTONS INJECTOR (NEW)                                           */
/* -------------------------------------------------------------------------- */
function initSocials() {
    const mount = document.getElementById('socials-mount');
    if (!mount) return;

    // Define the buttons
    const buttons = [
        { icon: 'fa-facebook',  link: SOCIAL_CONFIG.facebook,  color: 'hover:text-blue-500' },
        { icon: 'fa-instagram', link: SOCIAL_CONFIG.instagram, color: 'hover:text-pink-500' },
        { icon: 'fa-linkedin',  link: SOCIAL_CONFIG.linkedin,  color: 'hover:text-blue-700' },
        { icon: 'fa-github',    link: SOCIAL_CONFIG.github,    color: 'hover:text-gray-400' },
        { icon: 'fa-youtube',   link: SOCIAL_CONFIG.youtube,   color: 'hover:text-red-600' }
    ];

    // Build HTML
    let html = `<div class="flex gap-6 justify-center items-center text-2xl text-gray-400">`;
    buttons.forEach(btn => {
        html += `
            <a href="${btn.link}" target="_blank" rel="noopener noreferrer" 
               class="transition-transform hover:-translate-y-1 duration-300 ${btn.color}">
               <i class="fab ${btn.icon}"></i>
            </a>
        `;
    });
    html += `</div>`;

    // Inject
    mount.innerHTML = html;
}

/* -------------------------------------------------------------------------- */
/* 8. GLOBAL TRACKING (THE LISTENER)                                          */
/* -------------------------------------------------------------------------- */
function initAnalyticsTracking() {
    const gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        if (link) {
            const href = link.href.toLowerCase();

            // A. TRACK PHONE CALLS
            if (href.includes('tel:')) {
                gtag('event', 'contact', { 'method': 'phone', 'value': 20.00 });
                console.log('📞 Call Tracked');
            }

            // B. TRACK SOCIAL CLICKS (Dynamic Check)
            const socials = ['facebook', 'instagram', 'linkedin', 'github', 'youtube'];
            const matchedSocial = socials.find(s => href.includes(s));
            
            if (matchedSocial) {
                gtag('event', 'social_click', {
                    'platform': matchedSocial,
                    'destination': href
                });
                console.log(`📱 ${matchedSocial} Click Tracked`);
            }
            
            // C. TRACK CHECKOUT/START
            if (href.includes('#order-form') || href.includes('#signup')) {
                gtag('event', 'begin_checkout', { 'method': 'anchor_link' });
                console.log('🚀 Checkout Started');
            }
        }
    });
}
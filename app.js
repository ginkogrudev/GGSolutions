// GG SOLUTIONS - CORE ENGINE 2026 (CLEAN SWEEP VERSION)

document.addEventListener('DOMContentLoaded', () => {
    initThemeSystem();
    initNavigation();
    initInteractions();
    initCookieBanner();
    initAnalyticsTracking();
    
    // Initialize global GA if missing
    window.gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };
});

/* -------------------------------------------------------------------------- */
/* 1. THEME ENGINE                                                            */
/* -------------------------------------------------------------------------- */
function initThemeSystem() {
    const STORAGE_KEY = 'gg_theme_pref';
    let theme = localStorage.getItem(STORAGE_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
}

/* -------------------------------------------------------------------------- */
/* 2. NAVIGATION                                                              */
/* -------------------------------------------------------------------------- */
function initNavigation() {
    // Auto-close menu on link click
    const menuLinks = document.querySelectorAll('#mobile-menu a');
    menuLinks.forEach(link => {
        link.onclick = toggleMenu;
    });
}

window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            menu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
};

/* -------------------------------------------------------------------------- */
/* 3. CONTACT MODAL (THE COMMAND CENTER)                                      */
/* -------------------------------------------------------------------------- */
window.openContactModal = function() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock scroll
        gtag('event', 'open_contact_modal');
    }
};

window.closeContactModal = function() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock scroll
    }
};

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") window.closeContactModal();
});

/* -------------------------------------------------------------------------- */
/* 4. COOKIES (CONSENT MODE)                                                  */
/* -------------------------------------------------------------------------- */
function initCookieBanner() {
    if (!localStorage.getItem('gg_consent_mode')) {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.classList.remove('hidden');
    }
}

window.acceptAllCookies = function() {
    localStorage.setItem('gg_consent_mode', 'all');
    document.getElementById('cookie-banner').classList.add('hidden');
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
    });
};

window.manageCookies = function() {
    localStorage.setItem('gg_consent_mode', 'essential');
    document.getElementById('cookie-banner').classList.add('hidden');
};

/* -------------------------------------------------------------------------- */
/* 5. FAQ ACCORDION                                                           */
/* -------------------------------------------------------------------------- */
window.toggleFaq = function(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('span:last-child');
    
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.innerText = '-';
    } else {
        answer.classList.add('hidden');
        icon.innerText = '+';
    }
};

/* -------------------------------------------------------------------------- */
/* 6. INTERACTIONS & ANALYTICS                                                */
/* -------------------------------------------------------------------------- */
function initInteractions() {
    // Vibrate on mobile clicks
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(10);
        });
    });
}

function initAnalyticsTracking() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.href.toLowerCase();

        // Track Specific Contact Methods
        if (href.includes('tel:')) gtag('event', 'contact', { 'method': 'phone_call' });
        if (href.includes('viber')) gtag('event', 'contact', { 'method': 'viber' });
        if (href.includes('wa.me')) gtag('event', 'contact', { 'method': 'whatsapp' });
        if (href.includes('mailto')) gtag('event', 'contact', { 'method': 'email' });
        
        // Track External Links
        if (href.startsWith('http') && !href.includes(window.location.hostname)) {
            gtag('event', 'outbound_click', { 'destination': href });
        }
    });
}
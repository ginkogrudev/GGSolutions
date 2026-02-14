// GG SOLUTIONS - CORE ENGINE 2026 (FINAL PRODUCTION)

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initInteractions();
    initCookieBanner();
    initScrollReveals(); // This needs to fire immediately
    initAnalyticsTracking();
    
    // Safety Net for Google Analytics
    window.gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };
});

/* -------------------------------------------------------------------------- */
/* 1. NAVIGATION LOGIC                                                        */
/* -------------------------------------------------------------------------- */
function initNavigation() {
    // Auto-close mobile menu when a link is clicked
    const menuLinks = document.querySelectorAll('#mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
             const menu = document.getElementById('mobile-menu');
             if(menu && !menu.classList.contains('hidden')) {
                 toggleMenu();
             }
        });
    });
}

window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        } else {
            menu.classList.add('hidden');
            document.body.style.overflow = ''; // Unlock background scrolling
        }
    }
};

/* -------------------------------------------------------------------------- */
/* 2. MODAL & CONTACT LOGIC                                                   */
/* -------------------------------------------------------------------------- */
window.openContactModal = function() {
    const modal = document.getElementById('contact-modal');
    const menu = document.getElementById('mobile-menu');
    
    // If mobile menu is open, close it first
    if (menu && !menu.classList.contains('hidden')) {
        toggleMenu(); 
    }

    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock scroll
        if(typeof gtag === 'function') gtag('event', 'open_contact_modal');
    }
};

window.closeContactModal = function() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock scroll
    }
};

// Close modal on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") window.closeContactModal();
});

/* -------------------------------------------------------------------------- */
/* 3. PREMIUM SCROLL REVEALS (The "Apple" Effect)                           */
/* -------------------------------------------------------------------------- */
function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    
    // Intersection Observer setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Fires when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the active class to trigger CSS transition
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed so it doesn't animate out and in repeatedly
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        // Ensure starting state is clean
        reveal.classList.remove('active');
        observer.observe(reveal);
    });
}

/* -------------------------------------------------------------------------- */
/* 4. FAQ ACCORDION LOGIC                                                     */
/* -------------------------------------------------------------------------- */
window.toggleFaq = function(element) {
    // Find the content div (it should have the class 'faq-content')
    const content = element.querySelector('.faq-content') || element.nextElementSibling;
    
    if (!content || content.tagName !== 'DIV') return; // Safety exit

    const icon = element.querySelector('span'); // The '+' icon

    if (content.classList.contains('hidden')) {
        // OPEN
        content.classList.remove('hidden');
        if (icon) {
            icon.classList.add('rotate-45'); 
            icon.classList.add('text-[#E91E63]');
        }
    } else {
        // CLOSE
        content.classList.add('hidden');
        if (icon) {
            icon.classList.remove('rotate-45');
            icon.classList.remove('text-[#E91E63]');
        }
    }
};

/* -------------------------------------------------------------------------- */
/* 5. PRICING CURRENCY SWITCHER                                               */
/* -------------------------------------------------------------------------- */
window.switchCurrency = function(curr) {
    const prices = document.querySelectorAll('.price-text'); 
    const subs = document.querySelectorAll('.price-sub'); 
    const btnBgn = document.getElementById('btn-bgn');
    const btnEur = document.getElementById('btn-eur');

    if(!btnBgn || !btnEur) return;

    if(curr === 'BGN') {
        // UI Update
        btnBgn.classList.add('bg-[#E91E63]', 'text-white');
        btnBgn.classList.remove('text-gray-500', 'bg-transparent');
        btnEur.classList.remove('bg-[#E91E63]', 'text-white');
        btnEur.classList.add('text-gray-500', 'bg-transparent');
        
        // Data Update
        prices.forEach(el => { if(el.getAttribute('data-bgn')) el.innerText = el.getAttribute('data-bgn'); });
        if(subs) subs.forEach(el => { if(el.getAttribute('data-bgn')) el.innerText = el.getAttribute('data-bgn'); });
        
    } else {
        // UI Update
        btnEur.classList.add('bg-[#E91E63]', 'text-white');
        btnEur.classList.remove('text-gray-500', 'bg-transparent');
        btnBgn.classList.remove('bg-[#E91E63]', 'text-white');
        btnBgn.classList.add('text-gray-500', 'bg-transparent');
        
        // Data Update
        prices.forEach(el => { if(el.getAttribute('data-eur')) el.innerText = el.getAttribute('data-eur'); });
        if(subs) subs.forEach(el => { if(el.getAttribute('data-eur')) el.innerText = el.getAttribute('data-eur'); });
    }
};

/* -------------------------------------------------------------------------- */
/* 6. COOKIES & COMPLIANCE                                                    */
/* -------------------------------------------------------------------------- */
function initCookieBanner() {
    if (!localStorage.getItem('gg_consent_mode')) {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.classList.remove('hidden');
    }
}

window.acceptAllCookies = function() {
    localStorage.setItem('gg_consent_mode', 'all');
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.classList.add('hidden');
    
    if(typeof gtag === 'function') {
        gtag('consent', 'update', { 'ad_storage': 'granted', 'analytics_storage': 'granted' });
    }
};

window.manageCookies = function() {
    localStorage.setItem('gg_consent_mode', 'essential');
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.classList.add('hidden');
};

/* -------------------------------------------------------------------------- */
/* 7. TRACKING & INTERACTIONS                                                 */
/* -------------------------------------------------------------------------- */
function initInteractions() {
    // Haptic feedback for mobile users
    const interactiveElements = document.querySelectorAll('button, a, .glass');
    interactiveElements.forEach(el => {
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

        // Contact Tracking
        if (href.includes('tel:')) gtag('event', 'contact', { 'method': 'phone_call' });
        if (href.includes('viber')) gtag('event', 'contact', { 'method': 'viber' });
        if (href.includes('wa.me') || href.includes('whatsapp')) gtag('event', 'contact', { 'method': 'whatsapp' });
        if (href.includes('mailto')) gtag('event', 'contact', { 'method': 'email' });
        
        // Conversion Tracking (High Value)
        if (href.includes('calendar.app.google') || href.includes('calendly')) {
            gtag('event', 'begin_checkout', { 'item_name': 'Strategy Call' });
        }
    });
}
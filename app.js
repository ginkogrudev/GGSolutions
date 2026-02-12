// GG SOLUTIONS - CORE ENGINE 2026 (FINAL PRODUCTION)

document.addEventListener('DOMContentLoaded', () => {
    initThemeSystem();
    initNavigation();
    initInteractions();
    initCookieBanner();
    initAnalyticsTracking();
    
    // Initialize global GA if missing (Safety Net)
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
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            menu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Lock scroll
        } else {
            menu.classList.add('hidden');
            document.body.style.overflow = ''; // Unlock scroll
        }
    }
};

/* -------------------------------------------------------------------------- */
/* 3. CONTACT MODAL (THE COMMAND CENTER)                                      */
/* -------------------------------------------------------------------------- */
window.openContactModal = function() {
    const modal = document.getElementById('contact-modal');
    // Close mobile menu if it's open
    const menu = document.getElementById('mobile-menu');
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

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") window.closeContactModal();
});

/* -------------------------------------------------------------------------- */
/* 4. COOKIES (CONSENT MODE)                                                  */
/* -------------------------------------------------------------------------- */
function initCookieBanner() {
    // Check if user has already decided
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
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
        });
    }
};

window.manageCookies = function() {
    // For now, just treat as minimal/essential
    localStorage.setItem('gg_consent_mode', 'essential');
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.classList.add('hidden');
};

/* -------------------------------------------------------------------------- */
/* 5. FAQ ACCORDION (FIXED LOGIC)                                             */
/* -------------------------------------------------------------------------- */
window.toggleFaq = function(element) {
    // Logic: The answer is the direct sibling <div> of the clicked element, or inside it.
    // Based on standard Tailwind accordion structure:
    // <div onclick="toggleFaq(this)"> ...Header... </div>
    // <div class="hidden"> ...Content... </div>
    
    // Try finding the next sibling (common pattern)
    let content = element.nextElementSibling;
    
    // If not found, check if it's inside (nested pattern)
    if (!content || content.tagName !== 'DIV') {
         content = element.querySelector('.faq-content'); // Add this class to HTML if needed
    }

    // Fallback: If your HTML structure is Header -> Content inside same container
    if(!content) return; 

    const icon = element.querySelector('i') || element.querySelector('span'); // Icon often <i> or <span>

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) {
            icon.classList.add('rotate-45'); // Rotate '+' to 'x' effect
            icon.style.color = '#E91E63';
        }
    } else {
        content.classList.add('hidden');
        if (icon) {
            icon.classList.remove('rotate-45');
            icon.style.color = '';
        }
    }
};

/* -------------------------------------------------------------------------- */
/* 6. PRICING CURRENCY SWITCHER                                               */
/* -------------------------------------------------------------------------- */
window.switchCurrency = function(curr) {
    const prices = document.querySelectorAll('.price-text'); // Elements with data-bgn / data-eur
    const btnBgn = document.getElementById('btn-bgn');
    const btnEur = document.getElementById('btn-eur');

    if(!btnBgn || !btnEur) return;

    if(curr === 'BGN') {
        // Update Buttons
        btnBgn.classList.add('bg-[#E91E63]', 'text-white');
        btnBgn.classList.remove('text-gray-500', 'bg-transparent');
        
        btnEur.classList.remove('bg-[#E91E63]', 'text-white');
        btnEur.classList.add('text-gray-500', 'bg-transparent');
        
        // Update Prices
        prices.forEach(el => {
            const val = el.getAttribute('data-bgn');
            if(val) el.innerText = val;
        });
    } else {
        // Update Buttons
        btnEur.classList.add('bg-[#E91E63]', 'text-white');
        btnEur.classList.remove('text-gray-500', 'bg-transparent');
        
        btnBgn.classList.remove('bg-[#E91E63]', 'text-white');
        btnBgn.classList.add('text-gray-500', 'bg-transparent');
        
        // Update Prices
        prices.forEach(el => {
            const val = el.getAttribute('data-eur');
            if(val) el.innerText = val;
        });
    }
};

/* -------------------------------------------------------------------------- */
/* 7. INTERACTIONS & ANALYTICS (The Google Ecosystem Hook)                  */
/* -------------------------------------------------------------------------- */
function initInteractions() {
    // Vibrate on mobile interactions for tactile feel
    const interactiveElements = document.querySelectorAll('button, a, .goal-checkbox');
    interactiveElements.forEach(el => {
        el.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(10);
        });
    });
}

function initAnalyticsTracking() {
    // Delegated Event Listener for all clicks
    document.addEventListener('click', function(e) {
        // Find closest anchor tag
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.href.toLowerCase();

        // 1. Phone Calls
        if (href.includes('tel:')) {
            gtag('event', 'contact', { 'method': 'phone_call', 'value': 10 }); // High value
        }
        
        // 2. Messaging Apps
        if (href.includes('viber')) {
            gtag('event', 'contact', { 'method': 'viber', 'value': 5 });
        }
        if (href.includes('wa.me') || href.includes('whatsapp')) {
            gtag('event', 'contact', { 'method': 'whatsapp', 'value': 5 });
        }
        
        // 3. Email
        if (href.includes('mailto')) {
            gtag('event', 'contact', { 'method': 'email', 'value': 2 });
        }
        
        // 4. Social Media (Outbound)
        if (href.includes('instagram.com') || href.includes('facebook.com') || href.includes('linkedin.com')) {
            gtag('event', 'social_click', { 'network': href });
        }
        
        // 5. Calendar Booking (The Money Shot)
        if (href.includes('calendar.app.google') || href.includes('calendly')) {
            gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYY' }); // Replace with your Ad ID
            gtag('event', 'begin_checkout', { 'item_name': 'Strategy Call' });
        }
    });
}
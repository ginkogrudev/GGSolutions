// GG SOLUTIONS - CORE ENGINE 2026 (FINAL PRODUCTION)

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initInteractions();
    initGlobalCookieBanner(); // СТАРТИРАМЕ ДИНАМИЧНИЯ GDPR БАНЕР
    initScrollReveals();
    initAnalyticsTracking();
    initLeadMagnet(); // СТАРТИРАМЕ ДВИГАТЕЛЯ ЗА ЛИЙДОВЕ
    initAutoScrollGalleries(); // СТАРТИРАМЕ АВТОМАТИЧНИТЕ ГАЛЕРИИ
    
    // Safety Net for Google Analytics
    window.gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };

    // DYNAMIC TIME & DATES
    const startDate = new Date('2026-01-01');
    const now = new Date();
    const ageInMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth()) + 1;
    document.querySelectorAll('.agency-age').forEach(el => el.innerText = ageInMonths);

    const monthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
    document.querySelectorAll('.current-month').forEach(el => el.innerText = monthNames[now.getMonth()]);
});

/* -------------------------------------------------------------------------- */
/* 1. NAVIGATION LOGIC                                                        */
/* -------------------------------------------------------------------------- */
function initNavigation() {
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
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
};

/* -------------------------------------------------------------------------- */
/* 2. MODAL & CONTACT LOGIC                                                   */
/* -------------------------------------------------------------------------- */
window.openContactModal = function() {
    const modal = document.getElementById('contact-modal');
    const menu = document.getElementById('mobile-menu');
    
    if (menu && !menu.classList.contains('hidden')) {
        toggleMenu(); 
    }

    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if(typeof gtag === 'function') gtag('event', 'open_contact_modal');
    }
};

window.closeContactModal = function() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") window.closeContactModal();
});

/* -------------------------------------------------------------------------- */
/* 3. PREMIUM SCROLL REVEALS (The "Apple" Effect)                           */
/* -------------------------------------------------------------------------- */
function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        reveal.classList.remove('active');
        observer.observe(reveal);
    });
}

/* -------------------------------------------------------------------------- */
/* 4. FAQ ACCORDION LOGIC                                                     */
/* -------------------------------------------------------------------------- */
window.toggleFaq = function(element) {
    const content = element.querySelector('.faq-content') || element.nextElementSibling;
    if (!content || content.tagName !== 'DIV') return;

    const icon = element.querySelector('span');

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) {
            icon.classList.add('rotate-45'); 
            icon.classList.add('text-[#E91E63]');
        }
    } else {
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
        btnBgn.classList.add('bg-[#E91E63]', 'text-white');
        btnBgn.classList.remove('text-gray-500', 'bg-transparent');
        btnEur.classList.remove('bg-[#E91E63]', 'text-white');
        btnEur.classList.add('text-gray-500', 'bg-transparent');
        
        prices.forEach(el => { if(el.getAttribute('data-bgn')) el.innerText = el.getAttribute('data-bgn'); });
        if(subs) subs.forEach(el => { if(el.getAttribute('data-bgn')) el.innerText = el.getAttribute('data-bgn'); });
    } else {
        btnEur.classList.add('bg-[#E91E63]', 'text-white');
        btnEur.classList.remove('text-gray-500', 'bg-transparent');
        btnBgn.classList.remove('bg-[#E91E63]', 'text-white');
        btnBgn.classList.add('text-gray-500', 'bg-transparent');
        
        prices.forEach(el => { if(el.getAttribute('data-eur')) el.innerText = el.getAttribute('data-eur'); });
        if(subs) subs.forEach(el => { if(el.getAttribute('data-eur')) el.innerText = el.getAttribute('data-eur'); });
    }
};

/* -------------------------------------------------------------------------- */
/* 6. GLOBAL GDPR COOKIE INJECTOR & MANAGER (AUTO-DEPLOY)                     */
/* -------------------------------------------------------------------------- */
function initGlobalCookieBanner() {
    const consentStatus = localStorage.getItem('gg_cookie_consent');

    if (consentStatus === 'all') {
        grantAnalyticsAccess();
        return; 
    }

    if (consentStatus === 'essential') {
        return;
    }

    const banner = document.createElement('div');
    banner.id = 'dynamic-cookie-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 z-[200] bg-[#050505] border-t border-white/10 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] animate-fade-in-up';
    
    banner.innerHTML = `
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-sm text-gray-400">
          <p><strong class="text-white">Ние ценим вашата поверителност.</strong> Използваме бисквитки, за да анализираме трафика си и да подобрим вашето преживяване. Съгласно GDPR, вие имате контрол.</p>
        </div>
        <div class="flex gap-4 flex-shrink-0 w-full md:w-auto">
          <button id="btn-essential-cookies" class="flex-1 md:flex-none px-6 py-3 rounded-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition">Само задължителни</button>
          <button id="btn-accept-all-cookies" class="flex-1 md:flex-none px-6 py-3 rounded-xl bg-[#E91E63] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#c2185b] transition shadow-[0_0_15px_rgba(233,30,99,0.3)]">Приемам всички</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('btn-essential-cookies').addEventListener('click', () => {
        handleConsentChoice('essential', banner);
    });

    document.getElementById('btn-accept-all-cookies').addEventListener('click', () => {
        handleConsentChoice('all', banner);
    });
}

function handleConsentChoice(choice, bannerElement) {
    bannerElement.remove();
    localStorage.setItem('gg_cookie_consent', choice);
    
    if (choice === 'all') {
        grantAnalyticsAccess();
    }
}

function grantAnalyticsAccess() {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });
    }
    // Сигнал към GTM за пускане на Microsoft Clarity и GA4
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'event': 'consent_updated'});
}

/* -------------------------------------------------------------------------- */
/* 7. HAPTIC FEEDBACK & MICRO-INTERACTIONS                                    */
/* -------------------------------------------------------------------------- */
function initInteractions() {
    const interactiveElements = document.querySelectorAll('button, a, .glass');
    interactiveElements.forEach(el => {
        el.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(10);
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 8. ANALYTICS TRACKING ENGINE (THE DATA CAPTURE)                            */
/* -------------------------------------------------------------------------- */
function initAnalyticsTracking() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        const btn = e.target.closest('a, button');

        // 1. ПРОСЛЕДЯВАНЕ НА КОНТАКТИ И КАЛЕНДАР
        if (link) {
            const href = link.href.toLowerCase();

            if (href.includes('tel:')) gtag('event', 'contact', { 'method': 'phone_call' });
            if (href.includes('viber')) gtag('event', 'contact', { 'method': 'viber' });
            if (href.includes('wa.me') || href.includes('whatsapp')) gtag('event', 'contact', { 'method': 'whatsapp' });
            if (href.includes('mailto')) gtag('event', 'contact', { 'method': 'email' });
            
            // High-Intent Calendar Clicks
            if (href.includes('calendar.app.google') || href.includes('calendly')) {
                gtag('event', 'begin_checkout', { 'item_name': 'Strategy Call' });
            }
        }

        // 2. ПРОСЛЕДЯВАНЕ НА ЦЕНИ И ПАКЕТИ
        if (btn) {
            const text = btn.innerText?.toLowerCase() || '';
            
            if (text.includes('минимум') || text.includes('rapid launch')) {
                gtag('event', 'select_item', { item_name: 'Minimum Package', currency: 'EUR', value: 1000 });
            }
            if (text.includes('growth') || text.includes('takeover')) {
                gtag('event', 'select_item', { item_name: 'Growth Package', currency: 'EUR', value: 2000 });
            }
            if (text.includes('domination') || text.includes('партньор')) {
                gtag('event', 'select_item', { item_name: 'Domination Package', currency: 'EUR', value: 3500 });
            }
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 9. LEAD MAGNET ENGINE (BULLETPROOF VERSION)                                */
/* -------------------------------------------------------------------------- */
function initLeadMagnet() {
    const form = document.forms['lead-magnet-form'];
    if (!form) return; 

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyTBxC1lm5wgVR1sr-ZAxnp0I5x2-oyKkx-MDE1MNHYMV8DEjthrIOIujGfYGh0aJT6-g/exec'; 

    form.addEventListener('submit', e => {
        e.preventDefault();
        
        const btn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const spinner = document.getElementById('btn-spinner');
        const successMsg = document.getElementById('success-msg');
        
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        btnText.innerText = 'ИЗПРАЩАНЕ...';
        spinner.classList.remove('hidden');

        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(form),
            mode: 'no-cors' 
        })
        .then(() => {
            form.reset();
            btn.classList.add('hidden'); 
            successMsg.classList.remove('hidden'); 
            
            if(typeof gtag === 'function') {
                gtag('event', 'generate_lead', {
                    'event_category': 'engagement',
                    'event_label': 'War Chest Download'
                });
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error.message);
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
            btnText.innerText = 'ГРЕШКА! ОПИТАЙ ПАК';
            spinner.classList.add('hidden');
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 10. AUTO-SCROLL PORTFOLIO GALLERIES                                        */
/* -------------------------------------------------------------------------- */
function initAutoScrollGalleries() {
    const galleries = document.querySelectorAll('.hide-scroll');
    
    galleries.forEach(gallery => {
        if (gallery.children.length > 1) {
            let currentIndex = 0;
            
            setInterval(() => {
                currentIndex++;
                if (currentIndex >= gallery.children.length) currentIndex = 0; 
                
                const targetSlide = gallery.children[currentIndex];
                gallery.scrollTo({ left: targetSlide.offsetLeft, behavior: 'smooth' });
                
            }, 3500);
        }
    });
}
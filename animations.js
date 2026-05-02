/* ═══════════════════════════════════════════════════════════════
   Roof Care Solution — Scroll Progress Bar + Animation Extras
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ── Scroll Progress Bar ── */
(function initScrollProgress() {
    const bar = document.getElementById('rcsScrollProgress');
    if (!bar) return;

    function update() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(pct, 100) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
})();


/* ── Gallery touch swipe support ── */
(function initGallerySwipe() {
    const lightbox = document.getElementById('pgLightbox');
    if (!lightbox) return;

    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) < Math.abs(dy) * 1.5 || Math.abs(dx) < 40) return;
        const prev = document.getElementById('pgLbPrev');
        const next = document.getElementById('pgLbNext');
        if (dx < 0 && next) next.click();
        else if (dx > 0 && prev) prev.click();
    }, { passive: true });
})();


/* ── Smooth navbar scroll offset for anchor links ── */
(function initAnchorOffset() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const navbar = document.getElementById('navbar');
            const offset = navbar ? navbar.offsetHeight + 8 : 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
    });
})();

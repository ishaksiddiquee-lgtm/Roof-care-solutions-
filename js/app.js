/* ═══════════════════════════════════════════════════════════════
   Roof Care Solution — Main App JS
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ════════════════════════════════════════════════
   1. NAVBAR
════════════════════════════════════════════════ */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Highlight active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
})();


/* ════════════════════════════════════════════════
   2. AOS (Animate On Scroll)
════════════════════════════════════════════════ */
(function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.aosDelay || 0);
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
})();


/* ════════════════════════════════════════════════
   3. HERO PARTICLE BACKGROUND
════════════════════════════════════════════════ */
(function initHeroParticles() {
    const container = document.getElementById('heroParticlesBg');
    if (!container) return;
    const cvs = document.createElement('canvas');
    container.appendChild(cvs);
    const ctx = cvs.getContext('2d');

    let W, H, particles;

    function resize() {
        W = cvs.width  = container.offsetWidth;
        H = cvs.height = container.offsetHeight;
    }

    function createParticles() {
        particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 0.5 + Math.random() * 1.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -0.15 - Math.random() * 0.3,
            alpha: 0.1 + Math.random() * 0.4,
            hue: Math.random() > 0.5 ? 20 : 195,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
            if (p.x < -4) p.x = W + 4;
            if (p.x > W + 4) p.x = -4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    window.addEventListener('resize', () => { resize(); createParticles(); });
    draw();
})();


/* ════════════════════════════════════════════════
   4. COUNTER ANIMATIONS
════════════════════════════════════════════════ */
(function initCounters() {
    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        if (isNaN(target)) return;
        const duration = 2000;
        const start = performance.now();
        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(eased * target);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const counterEls = document.querySelectorAll('.h-stat-num, .tsr-num, .hts-num');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterEls.forEach(el => obs.observe(el));
})();


/* ════════════════════════════════════════════════
   5. TEMPERATURE SECTION ANIMATION
════════════════════════════════════════════════ */
(function initTemperature() {
    const section = document.querySelector('.temp-section');
    if (!section) return;

    let animated = false;
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            animateThermometer('thermBefore', 85);
            animateThermometer('thermAfter', 45);
            countTo('tempBefore', 45, 45);
            countTo('tempAfter', 45, 30, 1200);
        }
    }, { threshold: 0.3 });
    obs.observe(section);

    function animateThermometer(id, pct) {
        const el = document.getElementById(id);
        if (el) {
            el.style.height = '0%';
            setTimeout(() => {
                el.style.transition = 'height 1.8s cubic-bezier(0.4,0,0.2,1)';
                el.style.height = pct + '%';
            }, 200);
        }
    }

    function countTo(id, from, to, delay = 200) {
        const el = document.getElementById(id);
        if (!el) return;
        setTimeout(() => {
            const duration = 2000;
            const start = performance.now();
            function step(now) {
                const t = Math.min((now - start) / duration, 1);
                const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                el.textContent = Math.round(from + (to - from) * eased);
                if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }, delay);
    }
})();


/* ════════════════════════════════════════════════
   6. PROCESS TIMELINE FILL
════════════════════════════════════════════════ */
(function initProcessLine() {
    const line = document.getElementById('pcLine');
    if (!line) return;
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            line.style.width = '100%';
        }
    }, { threshold: 0.3 });
    obs.observe(line.closest('.how-it-works'));
})();


/* ════════════════════════════════════════════════
   7. PHOTO GALLERY LIGHTBOX
════════════════════════════════════════════════ */
(function initPhotoGallery() {
    const items    = document.querySelectorAll('.pg-item');
    const lightbox = document.getElementById('pgLightbox');
    const lbImg    = document.getElementById('pgLbImg');
    const lbCounter= document.getElementById('pgLbCounter');
    const lbClose  = document.getElementById('pgLbClose');
    const lbPrev   = document.getElementById('pgLbPrev');
    const lbNext   = document.getElementById('pgLbNext');
    const backdrop = document.getElementById('pgLbBackdrop');
    if (!lightbox) return;

    const srcs = Array.from(items).map(el => el.querySelector('img').src);
    let current = 0;

    function open(idx) {
        current = idx;
        lbImg.src = srcs[current];
        lbCounter.textContent = (current + 1) + ' / ' + srcs.length;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prev() { current = (current - 1 + srcs.length) % srcs.length; open(current); }
    function next() { current = (current + 1) % srcs.length; open(current); }

    items.forEach((item, i) => item.addEventListener('click', () => open(i)));
    lbClose.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    lbPrev.addEventListener('click', prev);
    lbNext.addEventListener('click', next);

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
    });
})();


/* ════════════════════════════════════════════════
   8. COST CALCULATOR
════════════════════════════════════════════════ */
(function initCalculator() {
    const btn  = document.getElementById('calcBtn');
    const res  = document.getElementById('crResult');
    const placeholder = document.querySelector('.cr-placeholder');
    if (!btn) return;

    const rates = {
        residential: {
            heat:       15,
            water:      18,
            heat_water: 28,
            seepage:    12,
            crack:       8,
            tank:       null,  // flat
            wall_water: 14,
            complete:   42,
        },
        commercial: {
            heat:       21,
            water:      26,
            heat_water: 40,
            seepage:    16,
            crack:      12,
            tank:       null,
            wall_water: 20,
            complete:   60,
        },
    };
    const tankFlat = { residential: 4500, commercial: 7500 };

    let propType = 'residential';
    document.querySelectorAll('.cf-toggle-btn').forEach(b => {
        b.addEventListener('click', () => {
            document.querySelectorAll('.cf-toggle-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            propType = b.dataset.val;
        });
    });

    btn.addEventListener('click', () => {
        const area    = parseFloat(document.getElementById('calcArea').value);
        const service = document.getElementById('calcService').value;
        if (!service) { shake(document.getElementById('calcService')); return; }

        let cost, duration, team;

        if (service === 'tank') {
            cost = tankFlat[propType];
            duration = '1 day';
            team = '2 technicians';
        } else {
            if (!area || area < 50) { shake(document.getElementById('calcArea')); return; }
            const rate = rates[propType][service] || 15;
            cost = Math.round(area * rate);
            const days = area < 500 ? '1–2 days' : area < 1200 ? '2–3 days' : area < 2500 ? '3–5 days' : '5–7 days';
            duration = days;
            team = area < 500 ? '2–3 technicians' : area < 1500 ? '3–4 technicians' : '4–6 technicians';
        }

        const formatted = cost.toLocaleString('en-PK');
        document.getElementById('crPrice').textContent    = formatted;
        document.getElementById('crDuration').textContent = duration;
        document.getElementById('crTeam').textContent     = team;

        if (placeholder) placeholder.style.display = 'none';
        res.style.display = 'block';
        res.style.animation = 'none';
        requestAnimationFrame(() => {
            res.style.animation = 'fadeInUp 0.5s ease forwards';
        });

        // Animate price count-up
        animateValue(document.getElementById('crPrice'), 0, cost);
    });

    function animateValue(el, from, to) {
        const dur = 1200, start = performance.now();
        function step(now) {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(from + (to - from) * eased).toLocaleString('en-PK');
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function shake(el) {
        el.style.animation = 'none';
        el.style.borderColor = '#FF4040';
        requestAnimationFrame(() => {
            el.style.animation = 'shakeInput 0.4s ease';
        });
        setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 600);
    }
})();

/* Inject calc animation keyframes */
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes shakeInput {
    0%,100% { transform: translateX(0); }
    20%,60% { transform: translateX(-6px); }
    40%,80% { transform: translateX(6px); }
}
`;
document.head.appendChild(styleEl);


/* ════════════════════════════════════════════════
   9. ESTIMATE CALCULATOR MODAL
════════════════════════════════════════════════ */
(function initEstimateCalculator() {
    const RATE     = 80; // Rs. per sq ft
    const overlay  = document.getElementById('estimateCalcOverlay');
    const closeBtn = document.getElementById('estimateCalcClose');
    const areaInput = document.getElementById('ecmArea');
    const amountEl  = document.getElementById('ecmAmount');
    const areaDisplay = document.getElementById('ecmAreaDisplay');
    const idleEl   = document.getElementById('ecmResultIdle');
    const liveEl   = document.getElementById('ecmResultLive');
    const ctaBtn   = document.getElementById('ecmCtaBtn');

    if (!overlay) return;

    /* ── Open / Close ── */
    function openCalc() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => areaInput && areaInput.focus(), 360);
    }

    function closeCalc() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Hero CTA button
    const heroCta = document.getElementById('openEstimateCalc');
    if (heroCta) {
        heroCta.addEventListener('click', function (e) {
            e.preventDefault();
            openCalc();
        });
    }

    closeBtn.addEventListener('click', closeCalc);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeCalc();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeCalc();
    });

    // CTA scrolls to contact; close modal after short delay so scroll works
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function () {
            setTimeout(closeCalc, 120);
        });
    }

    /* ── Live Calculation ── */
    let rafId = null;

    areaInput.addEventListener('input', function () {
        const area = parseFloat(this.value);
        if (!area || area <= 0 || this.value === '') {
            showIdle();
            return;
        }
        const total = Math.round(area * RATE);
        areaDisplay.textContent = Number(area).toLocaleString('en-PK') + ' sq ft';
        showLive();
        animateAmount(total);
    });

    function showIdle() {
        idleEl.style.display = 'flex';
        liveEl.classList.remove('visible');
    }

    function showLive() {
        idleEl.style.display = 'none';
        liveEl.classList.add('visible');
    }

    /* Smooth count-up for the price */
    function animateAmount(target) {
        if (rafId) cancelAnimationFrame(rafId);

        const raw = amountEl.textContent.replace(/,/g, '');
        const from = isNaN(parseInt(raw)) ? 0 : parseInt(raw);
        const dur  = 500;
        const t0   = performance.now();

        amountEl.classList.add('pop');
        setTimeout(() => amountEl.classList.remove('pop'), 200);

        function step(now) {
            const t      = Math.min((now - t0) / dur, 1);
            const eased  = 1 - Math.pow(1 - t, 3);
            const current = Math.round(from + (target - from) * eased);
            amountEl.textContent = current.toLocaleString('en-PK');
            if (t < 1) rafId = requestAnimationFrame(step);
        }
        rafId = requestAnimationFrame(step);
    }
})();


/* ════════════════════════════════════════════════
   10. REVIEWS CAROUSEL
════════════════════════════════════════════════ */
(function initReviews() {
    const track    = document.getElementById('reviewsTrack');
    const dotsWrap = document.getElementById('rcDots');
    const prevBtn  = document.getElementById('revPrev');
    const nextBtn  = document.getElementById('revNext');
    if (!track) return;

    /* Live card list — picks up dynamically added cards */
    const cards   = () => track.querySelectorAll('.review-card');
    const VISIBLE = () => window.innerWidth < 700 ? 1 : window.innerWidth < 1000 ? 2 : 3;
    let current   = 0;
    let autoTimer;

    function totalSlides() { return Math.max(1, cards().length - VISIBLE() + 1); }

    function buildDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = '';
        for (let i = 0; i < totalSlides(); i++) {
            const dot = document.createElement('div');
            dot.className = 'rc-dot' + (i === current ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        }
    }

    function goTo(n) {
        const all = cards();
        if (!all.length) return;
        current = Math.max(0, Math.min(n, totalSlides() - 1));
        const cardW = all[0].offsetWidth + 20;
        track.style.transform = `translateX(-${current * cardW}px)`;
        dotsWrap?.querySelectorAll('.rc-dot').forEach((d, i) => d.classList.toggle('active', i === current));
        resetAuto();
    }

    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo((current + 1) % totalSlides()), 4500);
    }

    /* Exposed so review submission can refresh the carousel */
    window._reviewCarouselRefresh = function() {
        buildDots();
        goTo(totalSlides() - 1);
    };

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));
    window.addEventListener('resize', () => { buildDots(); goTo(0); });

    buildDots();
    resetAuto();

    /* Touch swipe */
    let touchX0 = null;
    track.addEventListener('touchstart', e => { touchX0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        if (touchX0 === null) return;
        const dx = e.changedTouches[0].clientX - touchX0;
        if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
        touchX0 = null;
    });
})();


/* ════════════════════════════════════════════════
   11. REVIEW SUBMISSION
════════════════════════════════════════════════ */
(function initReviewSubmit() {
    const form        = document.getElementById('reviewSubmitForm');
    const successEl   = document.getElementById('rfSuccess');
    const againBtn    = document.getElementById('rfAgainBtn');
    const starsEl     = document.getElementById('rfStars');
    const starsWrap   = document.getElementById('rfStarsWrap');
    const ratingLabel = document.getElementById('rfRatingLabel');
    const textarea    = document.getElementById('rfText');
    const charCount   = document.getElementById('rfCharCount');
    const submitBtn   = document.getElementById('rfSubmitBtn');
    if (!form) return;

    const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent ★'];
    let rating = 0;

    /* ── Star interaction ── */
    const starBtns = starsEl.querySelectorAll('.rf-star');

    starBtns.forEach(star => {
        const val = +star.dataset.val;

        star.addEventListener('mouseenter', () => {
            starBtns.forEach(s => s.classList.toggle('hovered', +s.dataset.val <= val));
            ratingLabel.textContent = RATING_LABELS[val];
            ratingLabel.style.color = '#FFB800';
        });

        star.addEventListener('mouseleave', () => {
            starBtns.forEach(s => s.classList.remove('hovered'));
            ratingLabel.textContent = rating ? RATING_LABELS[rating] : 'Tap to rate';
            ratingLabel.style.color = rating ? '#FFB800' : '';
        });

        star.addEventListener('click', () => {
            rating = val;
            starBtns.forEach(s => {
                s.classList.toggle('selected', +s.dataset.val <= rating);
                s.classList.remove('hovered');
            });
            ratingLabel.textContent = RATING_LABELS[rating];
            ratingLabel.style.color = '#FFB800';
            starsWrap.classList.remove('rf-star-error');
        });
    });

    /* ── Character counter ── */
    textarea.addEventListener('input', () => {
        charCount.textContent = textarea.value.length;
        if (textarea.value.trim().length >= 10) textarea.classList.remove('rf-error');
    });

    /* ── Build initials from name ── */
    function initials(name) {
        return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');
    }

    /* ── Build star string ── */
    function starStr(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

    /* ── Inject review card into carousel ── */
    function addToCarousel(name, location, service, text, stars) {
        const track = document.getElementById('reviewsTrack');
        if (!track) return;
        const card = document.createElement('div');
        card.className = 'review-card rc-new';
        card.innerHTML =
            `<div class="rc-stars">${starStr(stars)}</div>
            <p>"${text}"</p>
            <div class="rc-author">
                <div class="rc-avatar">${initials(name)}</div>
                <div><strong>${name}</strong><span>${location || 'Karachi'}</span></div>
            </div>
            ${service ? `<div class="rc-service-tag">${service}</div>` : ''}`;
        track.appendChild(card);
        if (window._reviewCarouselRefresh) window._reviewCarouselRefresh();
        setTimeout(() => card.classList.remove('rc-new'), 700);
    }

    /* ── Form submit ── */
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name  = document.getElementById('rfName').value.trim();
        const loc   = document.getElementById('rfLocation').value.trim();
        const svc   = document.getElementById('rfService').value;
        const text  = textarea.value.trim();
        let valid   = true;

        const nameEl = document.getElementById('rfName');
        if (!name) { nameEl.classList.add('rf-error'); valid = false; }
        else nameEl.classList.remove('rf-error');

        if (!rating) { starsWrap.classList.add('rf-star-error'); valid = false; }

        if (text.length < 10) { textarea.classList.add('rf-error'); valid = false; }
        else textarea.classList.remove('rf-error');

        if (!valid) return;

        submitBtn.disabled = true;
        submitBtn.querySelector('.rf-btn-idle').style.display    = 'none';
        submitBtn.querySelector('.rf-btn-loading').style.display = 'flex';

        setTimeout(() => {
            addToCarousel(name, loc, svc, text, rating);
            form.style.display    = 'none';
            successEl.style.display = 'block';
        }, 900);
    });

    /* ── Write another ── */
    againBtn.addEventListener('click', () => {
        form.reset();
        charCount.textContent = '0';
        rating = 0;
        starBtns.forEach(s => s.classList.remove('selected', 'hovered'));
        ratingLabel.textContent = 'Tap to rate';
        ratingLabel.style.color = '';
        submitBtn.disabled = false;
        submitBtn.querySelector('.rf-btn-idle').style.display    = 'flex';
        submitBtn.querySelector('.rf-btn-loading').style.display = 'none';
        form.style.display      = 'flex';
        successEl.style.display = 'none';
    });
})();


/* ════════════════════════════════════════════════
   10. WEBSITE FOLLOW BUTTON  (global counter via Firebase)
   ─────────────────────────────────────────────
   HOW TO ACTIVATE THE LIVE GLOBAL COUNTER:
   1. Go to https://console.firebase.google.com
   2. Click "Add project" → give it any name → Continue
   3. Disable Google Analytics (not needed) → Create project
   4. In the left menu: Build → Realtime Database → Create database
      → Choose any location → Start in TEST MODE → Enable
   5. Go to Project Settings (gear icon) → Your apps → </> (Web)
      → Register app → copy the firebaseConfig values below
   ════════════════════════════════════════════════ */
(function initSiteFollow() {

    /* ── Paste your Firebase config here ── */
    const FB = {
        apiKey:      '',    // e.g. "AIzaSy..."
        databaseURL: '',    // e.g. "https://your-app-default-rtdb.firebaseio.com"
    };

    const DB_PATH    = 'rcs/followers';
    const BASE_COUNT = 100247;           // starting count shown before any real data
    const LOCK_KEY   = 'rcs-followed-v3'; // localStorage key

    const btn     = document.getElementById('siteFollowBtn');
    const countEl = document.getElementById('siteFollowerCount');
    if (!btn || !countEl) return;

    const alreadyFollowed = localStorage.getItem(LOCK_KEY) === '1';

    /* ── Helpers ── */
    function fmt(n) { return Number(n).toLocaleString('en-US'); }

    function animateFollow() {
        /* +1 float */
        const plusOne = document.createElement('span');
        plusOne.className = 'sf-plus-one';
        plusOne.textContent = '+1';
        countEl.parentNode.appendChild(plusOne);
        setTimeout(() => plusOne.remove(), 1200);
        /* count pop */
        countEl.classList.add('pop');
        setTimeout(() => countEl.classList.remove('pop'), 300);
        /* button ripple */
        const ripple = document.createElement('span');
        ripple.className = 'sf-ripple';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 520);
    }

    function markFollowed() {
        btn.classList.add('sf-followed');
        btn.innerHTML = '<i class="fas fa-check"></i><span>Following</span>';
    }

    /* ── Restore followed state on this device immediately ── */
    if (alreadyFollowed) markFollowed();
    countEl.textContent = fmt(BASE_COUNT); // shown while Firebase loads

    /* ── Try Firebase ── */
    const firebaseReady = FB.apiKey && FB.databaseURL
                          && typeof firebase !== 'undefined';

    if (firebaseReady) {
        /* Init Firebase (safe to call multiple times) */
        if (!firebase.apps.length) firebase.initializeApp(FB);
        const ref = firebase.database().ref(DB_PATH);

        /* Live-update the count for everyone */
        ref.on('value', snap => {
            const val = snap.val();
            if (val !== null) countEl.textContent = fmt(val);
        });

        btn.addEventListener('click', function() {
            if (this.classList.contains('sf-followed')) return;
            localStorage.setItem(LOCK_KEY, '1');
            markFollowed();
            animateFollow();
            /* Atomically increment — safe against concurrent clicks */
            ref.transaction(cur => (cur === null ? BASE_COUNT + 1 : cur + 1));
        });

    } else {
        /* ── Fallback: localStorage-only (single device) ── */
        const saved = parseInt(localStorage.getItem('rcs-count-v3') || BASE_COUNT, 10);
        countEl.textContent = fmt(saved);

        btn.addEventListener('click', function() {
            if (this.classList.contains('sf-followed')) return;
            localStorage.setItem(LOCK_KEY, '1');
            const next = saved + 1;
            localStorage.setItem('rcs-count-v3', next);
            countEl.textContent = fmt(next);
            markFollowed();
            animateFollow();
        });
    }
})();


/* ════════════════════════════════════════════════
   10. CONTACT FORM — WhatsApp Integration
════════════════════════════════════════════════ */
(function initContactForm() {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('cfSuccess');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name    = (form.querySelector('[name="name"]').value || '').trim();
        const phone   = (form.querySelector('[name="phone"]').value || '').trim();
        const service = form.querySelector('[name="service"]').value;
        const area    = form.querySelector('[name="area"]').value;
        const message = (form.querySelector('[name="message"]').value || '').trim();

        /* Basic validation for required fields */
        if (!name || !phone || !service || !area) {
            const missing = [
                !name    && form.querySelector('[name="name"]'),
                !phone   && form.querySelector('[name="phone"]'),
                !service && form.querySelector('[name="service"]'),
                !area    && form.querySelector('[name="area"]'),
            ].filter(Boolean);
            missing.forEach(el => {
                el.style.borderColor = '#FF4040';
                el.style.animation = 'shakeInput 0.4s ease';
                setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 600);
            });
            return;
        }

        const text =
`*New Inspection Request – Roof Care Solution*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
🔧 *Service:* ${service}
📍 *Area:* ${area}
💬 *Message:* ${message || 'No additional message'}

_Sent via RoofCareSolution.pk_`;

        const waURL = 'https://wa.me/923012475056?text=' + encodeURIComponent(text);

        const btn = form.querySelector('.cf-submit-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';

        window.open(waURL, '_blank');

        setTimeout(() => {
            btn.innerHTML = '<i class="fab fa-whatsapp cf-wa-icon"></i><span>Send via WhatsApp</span>';
            btn.disabled = false;
            form.reset();
            if (success) {
                success.style.display = 'flex';
                setTimeout(() => { success.style.display = 'none'; }, 6000);
            }
        }, 800);
    });
})();


/* ════════════════════════════════════════════════
   11. WHATSAPP FLOAT — hide on scroll up
════════════════════════════════════════════════ */
(function initWAFloat() {
    const btn = document.getElementById('waFloat');
    if (!btn) return;
    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        btn.style.opacity = y > 300 ? '1' : '0.85';
        lastY = y;
    });
})();


/* ════════════════════════════════════════════════
   12. SMOOTH SCROLL for all anchor links
════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


/* ════════════════════════════════════════════════
   13. SERVICE CARDS — staggered reveal
════════════════════════════════════════════════ */
(function initServiceCards() {
    document.querySelectorAll('.service-card').forEach((card, i) => {
        card.style.transitionDelay = (i * 80) + 'ms';
    });
})();


/* ════════════════════════════════════════════════
   14. AREA CARDS — ripple on hover
════════════════════════════════════════════════ */
(function initAreaCards() {
    document.querySelectorAll('.area-card').forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position:absolute;width:60px;height:60px;
                background:rgba(255,107,53,0.12);border-radius:50%;
                transform:translate(-50%,-50%) scale(0);
                animation:rippleAnim 0.6s ease-out forwards;
                pointer-events:none;left:50%;top:50%;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnim {
            to { transform:translate(-50%,-50%) scale(4); opacity:0; }
        }
    `;
    document.head.appendChild(style);
})();


/* ════════════════════════════════════════════════
   15. GSAP ScrollTrigger (if loaded)
════════════════════════════════════════════════ */
(function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    /* Hero text chars animation */
    gsap.from('.h1-line', {
        opacity: 0, y: 60, stagger: 0.18, duration: 1.0,
        ease: 'power3.out', delay: 0.3
    });

    /* Services section title */
    gsap.from('.services .section-header', {
        scrollTrigger: { trigger: '.services', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out'
    });

    /* Warranty strip */
    gsap.from('.warranty-strip', {
        scrollTrigger: { trigger: '.warranty-strip', start: 'top 80%' },
        opacity: 0, scale: 0.96, duration: 0.7, ease: 'back.out(1.5)'
    });

    /* Footer brand */
    gsap.from('.fg-brand', {
        scrollTrigger: { trigger: '.footer-main', start: 'top 90%' },
        opacity: 0, y: 30, duration: 0.6
    });
})();

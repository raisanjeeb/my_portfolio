/* ============================================================
   SANJEEB RAI — PORTFOLIO SCRIPTS
   File: js/main.js
   ============================================================ */

/* ============================================================
   1. TYPING WORD ROTATOR
   ============================================================ */
const words   = ['thoughtful', 'creative', 'elegant', 'precise', 'bold'];
let wordIndex = 0;
const typedEl = document.getElementById('typedWord');

setInterval(() => {
  // Fade out
  typedEl.style.cssText = 'opacity:0; transform:translateY(-8px); transition:opacity 0.3s, transform 0.3s';

  setTimeout(() => {
    wordIndex          = (wordIndex + 1) % words.length;
    typedEl.textContent = words[wordIndex];
    // Fade in
    typedEl.style.cssText = 'opacity:1; transform:translateY(0); transition:opacity 0.3s, transform 0.3s';
  }, 320);
}, 2200);

/* ============================================================
   3. SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ============================================================
   4. SKILL TAGS — STAGGERED ANIMATION
   ============================================================ */
const skillsGrid = document.getElementById('skillsGrid');

new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    Array.from(skillsGrid.children).forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 0.07}s`;
    });
    skillsGrid.classList.add('skills-visible');
  }
}, { threshold: 0.2 }).observe(skillsGrid);

/* ============================================================
   5. SKILL BARS — FILL ANIMATION
   ============================================================ */
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    entries[0].target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, i * 120);
    });
  }
}, { threshold: 0.2 }).observe(document.getElementById('skillBars'));

/* ============================================================
   6. STAT COUNTERS
   ============================================================ */
new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target);
    const dur    = 1600;
    let   start  = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / dur, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      progress < 1
        ? requestAnimationFrame(step)
        : (el.textContent = target + '+');
    }

    requestAnimationFrame(step);
  });
}, { threshold: 0.5 }).observe(document.getElementById('stats'));

/* ============================================================
   7. PROJECT CARDS — 3D TILT ON HOVER
   ============================================================ */
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform  = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    card.style.transition = 'border-color 0.3s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.5s ease, border-color 0.3s';
  });
});

/* ============================================================
   8. PARALLAX — HERO BACKGROUND TEXT
   ============================================================ */
const heroBgText = document.querySelector('.hero-bg-text');

window.addEventListener('scroll', () => {
  if (heroBgText) {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.28}px))`;
  }
}, { passive: true });

/* ============================================================
   9. STICKY NAVBAR
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

/* ============================================================
   10. ACTIVE NAV LINK (on scroll)
   ============================================================ */
const navSectionIds = ['hero', 'about', 'work', 'contact'];
const navAnchors    = {};

navSectionIds.forEach((id) => {
  navAnchors[id] = document.querySelector(`.nav-link[href="#${id}"]`);
});

function updateActiveNav() {
  let current = 'hero';
  navSectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && scrollY >= section.offsetTop - 140) current = id;
  });
  navSectionIds.forEach((id) => {
    navAnchors[id].classList.toggle('active', id === current);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ============================================================
   11. THEME TOGGLE (dark / light)
   ============================================================ */
const themeBtn   = document.getElementById('themeToggle');
const themeIcon  = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

// Apply saved theme on load
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeIcon.textContent  = '🌙';
  themeLabel.textContent = 'Dark';
}

themeBtn.addEventListener('click', () => {
  const isLight          = document.body.classList.toggle('light');
  themeIcon.textContent  = isLight ? '🌙' : '☀️';
  themeLabel.textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

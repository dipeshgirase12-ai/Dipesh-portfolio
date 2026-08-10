// ==========================================
// PREMIUM 2026 PORTFOLIO - INTERACTIONS
// Scroll reveals, navbar glass effect, mobile menu
// ==========================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. SCROLL REVEAL ANIMATIONS
  // ----------------------------------------------------------
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // ----------------------------------------------------------
  // 2. NAVBAR GLASS EFFECT ON SCROLL
  // ----------------------------------------------------------
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ----------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // ----------------------------------------------------------
  function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobilePanel = document.getElementById('mobilePanel');
    if (!menuBtn || !mobilePanel) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.textContent = isOpen ? '✕' : '☰';
    });

    mobilePanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobilePanel.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });
  }

  // ----------------------------------------------------------
  // 4. SMOOTH SCROLL FOR NAV LINKS
  // ----------------------------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ----------------------------------------------------------
  // 5. THEME TOGGLE (if not already handled)
  // ----------------------------------------------------------
  function initThemeToggle() {
    const themeBtn = document.getElementById('themeBtn');
    if (!themeBtn) return;

    // Check if already initialized
    if (themeBtn.dataset.initialized) return;
    themeBtn.dataset.initialized = 'true';

    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      html.setAttribute('data-theme', 'light');
      themeBtn.textContent = '◑';
    }

    themeBtn.addEventListener('click', () => {
      const isLight = html.getAttribute('data-theme') === 'light';
      html.setAttribute('data-theme', isLight ? 'dark' : 'light');
      themeBtn.textContent = isLight ? '◐' : '◑';
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
    });
  }

  // ----------------------------------------------------------
  // INITIALIZE ALL
  // ----------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveals();
      initNavbarScroll();
      initMobileMenu();
      initSmoothScroll();
      initThemeToggle();
    });
  } else {
    initScrollReveals();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initThemeToggle();
  }

})();
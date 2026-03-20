/* =========================================
   JavaScript – Simon Lind Webbplatser
   ========================================= */

(function () {
  'use strict';

  /* === Navbar scroll effect === */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* === Active nav link on scroll === */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* === Mobile hamburger menu === */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      nav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Stäng meny' : 'Öppna meny');
    });

    /* Close nav when a link is clicked */
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Öppna meny');
      });
    });
  }

  /* === Cookie banner === */
  const COOKIE_KEY = 'sl_cookie_consent';
  const banner = document.querySelector('.cookie-banner');

  function showBanner() {
    if (banner) {
      setTimeout(() => banner.classList.add('visible'), 800);
    }
  }

  function hideBanner() {
    if (banner) {
      banner.classList.remove('visible');
    }
  }

  if (banner) {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      showBanner();
    }

    const acceptBtn = banner.querySelector('.cookie-btn--accept');
    const declineBtn = banner.querySelector('.cookie-btn--decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        hideBanner();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'declined');
        hideBanner();
      });
    }
  }

  /* === Contact form (simulated submit) === */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form__submit');
      const success = form.querySelector('.form__success');

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Skickar…';
      }

      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Skicka meddelande';
        }
        if (success) {
          success.classList.add('visible');
          setTimeout(() => success.classList.remove('visible'), 5000);
        }
      }, 1200);
    });
  }

  /* === Animate elements on scroll (IntersectionObserver) === */
  const animateEls = document.querySelectorAll(
    '.service-card, .process__step, .testimonial-card, .about__content, .about__visual'
  );

  if ('IntersectionObserver' in window && animateEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    animateEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      observer.observe(el);
    });
  }
})();

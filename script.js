// script.js
document.addEventListener('DOMContentLoaded', () => {
  /* -------------------- Lightbox -------------------- */
  GLightbox({
    selector: '.glightbox',
    slideEffect: 'fade',
    touchNavigation: true,
    loop: true
  });

  /* -------------------- Navbar scroll style -------------------- */
  const navBar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navBar.classList.add('scrolled');
    else navBar.classList.remove('scrolled');
  });

  /* -------------------- GSAP animations -------------------- */
  gsap.registerPlugin(ScrollTrigger);

  // Section content fade/slide
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelectorAll('.cards .card, .grid img, .step, .contact-wrapper > *'), {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      scrollTrigger: { trigger: section, start: 'top 80%' }
    });
  });

  // Section entrance init
  gsap.utils.toArray('section.section').forEach(sec => {
    sec.classList.add('section-init');
    gsap.to(sec, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: sec, start: 'top 80%' },
      onStart: () => sec.classList.remove('section-init')
    });
  });

  /* -------------------- Year -------------------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* -------------------- Mobile menu -------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const mqlDesktop = window.matchMedia('(min-width: 801px)');

  function openMenu() {
    navLinks.classList.add('show');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open'); // lock background scroll
  }

  function closeMenu() {
    navLinks.classList.remove('show');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    if (navLinks.classList.contains('show')) closeMenu();
    else openMenu();
  }

  if (hamburger && navLinks) {
    // Toggle on burger
    hamburger.addEventListener('click', toggleMenu);

    // Close when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', closeMenu)
    );

    // Close on click outside the panel
    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('show')) return;
      const inside = navLinks.contains(e.target) || hamburger.contains(e.target);
      if (!inside) closeMenu();
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close when returning to desktop
    mqlDesktop.addEventListener('change', (e) => {
      if (e.matches) closeMenu();
    });

    // Close after in-page hash navigation
    window.addEventListener('hashchange', closeMenu);
  }

  /* -------------------- Custom cursor -------------------- */
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    window.addEventListener('mousemove', e => {
      cursor.style.top = e.clientY + 'px';
      cursor.style.left = e.clientX + 'px';
    });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });

    // Cursor color inversion on bright/blue UI
    const WHITE_ZONE_SELECTOR = '.cta-strip, .cursor-white-zone, .btn.primary, .contact-form button';
    const isInWhiteZone = (node) =>
      !!(node && (node.matches?.(WHITE_ZONE_SELECTOR) || node.closest?.(WHITE_ZONE_SELECTOR)));
    window.addEventListener('mousemove', (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (isInWhiteZone(el)) cursor.classList.add('white');
      else cursor.classList.remove('white');
    });
  }

  /* -------------------- Tilt -------------------- */
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    perspective: 1000,
    glare: true,
    'max-glare': 0.15,
    scale: 1.05,
    speed: 600
  });

  /* -------------------- Form -------------------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thanks! We’ll reach out within 24h.');
      e.target.reset();
    });
  }

  /* -------------------- Testimonials Carousel -------------------- */
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length) {
    let tIdx = 0;
    setInterval(() => {
      testimonials[tIdx].classList.remove('active');
      tIdx = (tIdx + 1) % testimonials.length;
      testimonials[tIdx].classList.add('active');
    }, 4000);
  }

  /* -------------------- FAQ Accordion -------------------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const ans = btn.nextElementSibling;
      const open = ans.style.maxHeight && ans.style.maxHeight !== '0px';
      ans.style.maxHeight = open ? '0' : ans.scrollHeight + 'px';
    });
  });
});

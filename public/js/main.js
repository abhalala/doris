/**
 * D.O.R.I.S. — Main JS
 * Intersection observer for scroll animations
 */

(function() {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.pillar-card, .checklist-item, .ref-card, .note-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Nav background opacity on scroll
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    lastScroll = currentScroll;
  });

  console.log('D.O.R.I.S. — site initialized');
})();

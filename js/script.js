document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const yearEl = document.getElementById('year');

  // Footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header shadow on scroll
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after clicking a link
  mainNav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Reveal-on-scroll animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Contact form -> opens the user's email client with prefilled content
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Παρακαλώ συμπληρώστε όλα τα πεδία.';
        formNote.classList.add('error');
        return;
      }

      const subject = encodeURIComponent(`Νέο μήνυμα από ${name} - aSTDev.gr`);
      const body = encodeURIComponent(`Όνομα: ${name}\nEmail: ${email}\n\nΜήνυμα:\n${message}`);

      window.location.href = `mailto:info@astdev.gr?subject=${subject}&body=${body}`;

      formNote.classList.remove('error');
      formNote.textContent = 'Ανοίγει το πρόγραμμα email σας... Αν δεν ανοίξει, γράψτε μας απευθείας στο info@astdev.gr';
      contactForm.reset();
    });
  }
});

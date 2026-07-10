function initScrollProgress() {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrolled / height) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, 10), { passive: true });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', debounce(() => {
    header.classList.toggle('scrolled', window.scrollY > 100);
  }, 10), { passive: true });
}

function initIntersectionObserver() {
  const options = { root: null, rootMargin: '0px', threshold: 0.1 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('counter-card')) {
          const counter = entry.target.querySelector('.counter-number');
          if (counter && !counter.classList.contains('counted')) {
            animateCounter(counter);
          }
        }
      }
    });
  }, options);

  document.querySelectorAll('.section-header, .science-card, .counter-card').forEach(el => {
    observer.observe(el);
  });
}

function animateCounter(element) {
  element.classList.add('counted');
  const target = parseInt(element.getAttribute('data-target'), 10);
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  let currentStep = 0;

  function updateCounter() {
    currentStep++;
    const progress = currentStep / steps;
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);

    element.textContent = value.toLocaleString();

    if (currentStep < steps) {
      setTimeout(updateCounter, stepDuration);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  updateCounter();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });
}

function initMobileNav() {
  const navLinks = document.querySelectorAll('.nav-mobile a');
  const sections = document.querySelectorAll('.section, .hero');
  if (!navLinks.length) return;

  function setActiveNav() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + currentSection ||
        (currentSection === '' && link.getAttribute('href') === '#');
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', debounce(setActiveNav, 50), { passive: true });
  setActiveNav();
}

function initTiltInteractions() {
  document.querySelectorAll('.hero-cta, .outro-cta, .ingredient-card, .science-card').forEach(element => {
    element.addEventListener('mousemove', function (e) {
      if (prefersReducedMotion()) return;

      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      this.style.setProperty('--mouse-x', x + '%');
      this.style.setProperty('--mouse-y', y + '%');
    });
  });
}

function initStickyMobileCTA() {
  const bar = document.getElementById('stickyMobileCTA');
  const hero = document.querySelector('.hero');
  if (!bar || !hero) return;

  const observer = new IntersectionObserver(([entry]) => {
    bar.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });

  observer.observe(hero);
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 800);
  }, 100), { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

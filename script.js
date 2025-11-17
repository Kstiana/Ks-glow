document.addEventListener('DOMContentLoaded', function() {
  initScrollProgress();
  initBlobMorph();
  initSparkles();
  initProductCardTilt();
  initIntersectionObserver();
  initCounters();
  initCountdown();
  initFAQ();
  initGallery();
  initSmoothScroll();
  initHeaderScroll();
  initMobileNav();
});

function initScrollProgress() {
  const progressBar = document.querySelector('.progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / height) * 100;
    progressBar.style.width = progress + '%';
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

function initBlobMorph() {
  const blobPath = document.getElementById('blobPath');
  if (!blobPath) return;
  
  let frame = 0;
  const speed = 0.002;
  const complexity = 3;
  
  function createBlobPath() {
    const points = 8;
    let path = 'M';
    
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const radiusVariation = 30 + 
        Math.sin(frame + i * 0.5) * 15 + 
        Math.cos(frame * 0.7 + i * 0.3) * 10 +
        Math.sin(frame * 0.5 + i * 0.7) * 8;
      
      const x = 100 + Math.cos(angle) * radiusVariation;
      const y = 100 + Math.sin(angle) * radiusVariation;
      
      if (i === 0) {
        path += `${x},${y}`;
      } else {
        const prevAngle = ((i - 1) / points) * Math.PI * 2;
        const cpDistance = radiusVariation * 0.5;
        const cp1x = 100 + Math.cos(prevAngle + 0.3) * cpDistance;
        const cp1y = 100 + Math.sin(prevAngle + 0.3) * cpDistance;
        const cp2x = 100 + Math.cos(angle - 0.3) * cpDistance;
        const cp2y = 100 + Math.sin(angle - 0.3) * cpDistance;
        
        path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
      }
    }
    
    path += ' Z';
    return path;
  }
  
  function animateBlob() {
    frame += speed;
    blobPath.setAttribute('d', createBlobPath());
    requestAnimationFrame(animateBlob);
  }
  
  animateBlob();
}

function initSparkles() {
  const canvas = document.getElementById('sparkleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 40 : 100;
  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 200) {
        const force = (200 - dist) / 200;
        this.x += (dx / dist) * force * 0.5;
        this.y += (dy / dist) * force * 0.5;
      }
      
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
      
      this.opacity += Math.sin(Date.now() * 0.001 + this.x) * 0.01;
      this.opacity = Math.max(0.1, Math.min(0.8, this.opacity));
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 166, 144, ${this.opacity})`;
      ctx.fill();
      
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      gradient.addColorStop(0, `rgba(245, 198, 203, ${this.opacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(245, 198, 203, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function initProductCardTilt() {
  const card = document.getElementById('productCard');
  if (!card) return;
  
  const cardInner = card.querySelector('.product-card-inner');
  
  card.addEventListener('mousemove', (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    cardInner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

function initIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
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

function initCounters() {
  
}

function animateCounter(element) {
  element.classList.add('counted');
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  const stepDuration = duration / steps;
  let current = 0;
  
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
  
  function updateCounter() {
    const primeIndex = Math.floor((current / target) * primes.length);
    const easing = 1 - Math.pow(1 - (current / target), primes[Math.min(primeIndex, primes.length - 1)] / 10);
    const value = Math.floor(target * easing);
    
    element.textContent = value.toLocaleString();
    
    if (current < target) {
      current += increment;
      setTimeout(updateCounter, stepDuration);
    } else {
      element.textContent = target.toLocaleString();
    }
  }
  
  updateCounter();
}

function initCountdown() {
  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');
  
  if (!days || !hours || !minutes || !seconds) return;
  
  const countdownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance < 0) {
      clearInterval(countdownInterval);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      return;
    }
    
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (days.textContent !== String(d).padStart(2, '0')) {
      days.classList.add('flip');
      setTimeout(() => days.classList.remove('flip'), 600);
    }
    if (hours.textContent !== String(h).padStart(2, '0')) {
      hours.classList.add('flip');
      setTimeout(() => hours.classList.remove('flip'), 600);
    }
    if (minutes.textContent !== String(m).padStart(2, '0')) {
      minutes.classList.add('flip');
      setTimeout(() => minutes.classList.remove('flip'), 600);
    }
    if (seconds.textContent !== String(s).padStart(2, '0')) {
      seconds.classList.add('flip');
      setTimeout(() => seconds.classList.remove('flip'), 600);
    }
    
    days.textContent = String(d).padStart(2, '0');
    hours.textContent = String(h).padStart(2, '0');
    minutes.textContent = String(m).padStart(2, '0');
    seconds.textContent = String(s).padStart(2, '0');
  }
  
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function initGallery() {
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  
  if (!slides.length || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  setInterval(nextSlide, 5000);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initMobileNav() {
  const navLinks = document.querySelectorAll('.nav-mobile a');
  const sections = document.querySelectorAll('.section, .hero');
  
  function setActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection || 
          (currentSection === '' && link.getAttribute('href') === '#')) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNav);
}

document.querySelectorAll('.hero-cta, .outro-cta, .ingredient-card, .science-card').forEach(element => {
  element.addEventListener('mousemove', function(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    this.style.setProperty('--mouse-x', x + '%');
    this.style.setProperty('--mouse-y', y + '%');
  });
});
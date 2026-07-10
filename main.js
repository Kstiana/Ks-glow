function renderTrustBadges() {
  const container = document.getElementById('trustBadges');
  if (!container || typeof KSGLOW_TRUST_BADGES === 'undefined') return;

  container.innerHTML = KSGLOW_TRUST_BADGES.map(badge => `
    <span class="trust-badge"><i class="fas ${badge.icon}"></i> ${badge.label}</span>
  `).join('');
}

function renderHowItWorks() {
  const container = document.getElementById('howItWorksGrid');
  if (!container || typeof KSGLOW_HOW_IT_WORKS === 'undefined') return;

  container.innerHTML = KSGLOW_HOW_IT_WORKS.map((item, i) => `
    <div class="how-it-works-card">
      <span class="how-it-works-number">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="serif">${item.step}</h3>
      <p class="how-it-works-time">${item.time}</p>
      <p>${item.description}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  renderTrustBadges();
  renderHowItWorks();
  initScrollProgress();
  initHeaderScroll();
  initBlobMorph();
  initSparkles();
  initCursorGlow();
  initParallax();
  initProductCardTilt();
  initIntersectionObserver();
  initCountdown();
  initFAQ();
  initGallery();
  initTestimonials();
  initBeforeAfter();
  initQuiz();
  initWaitlist();
  initSmoothScroll();
  initMobileNav();
  initTiltInteractions();
  initStickyMobileCTA();
  initBackToTop();
});

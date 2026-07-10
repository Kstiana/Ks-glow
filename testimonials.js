function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa-star ${i <= rating ? 'fas' : 'far'}"></i>`;
  }
  return stars;
}

function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !dotsContainer || typeof KSGLOW_TESTIMONIALS === 'undefined') return;

  let current = 0;
  const total = KSGLOW_TESTIMONIALS.length;

  track.innerHTML = KSGLOW_TESTIMONIALS.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-stars">${renderStars(t.rating)}</div>
      <p class="testimonial-quote">"${t.quote}"</p>
      <div class="testimonial-footer">
        <span class="testimonial-avatar">${t.initials}</span>
        <span class="testimonial-name">${t.author}, Verified Customer</span>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = KSGLOW_TESTIMONIALS.map((_, i) =>
    `<button class="testimonial-dot${i === 0 ? ' active' : ''}" aria-label="Show testimonial ${i + 1}"></button>`
  ).join('');

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  let autoplay = setInterval(() => goTo(current + 1), 6000);

  const wrapper = document.getElementById('testimonialCarousel');
  wrapper?.addEventListener('mouseenter', () => clearInterval(autoplay));
  wrapper?.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 6000);
  });
}

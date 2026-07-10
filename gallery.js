function initGallery() {
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const container = document.querySelector('.gallery-container');

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].setAttribute('aria-hidden', 'false');
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

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function manualNav(action) {
    action();
    startAutoplay();
  }

  prevBtn.addEventListener('click', () => manualNav(prevSlide));
  nextBtn.addEventListener('click', () => manualNav(nextSlide));

  startAutoplay();

  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') manualNav(prevSlide);
      if (e.key === 'ArrowRight') manualNav(nextSlide);
    });
  }
}

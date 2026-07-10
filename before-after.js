function initBeforeAfter() {
  const container = document.getElementById('beforeAfterSlider');
  const handle = document.getElementById('beforeAfterHandle');
  const revealLayer = document.getElementById('beforeAfterReveal');
  const revealImg = revealLayer?.querySelector('img');
  if (!container || !handle || !revealLayer || !revealImg) return;

  let dragging = false;

  function syncImageWidth() {
    const width = container.getBoundingClientRect().width;
    revealImg.style.width = `${width}px`;
  }

  function setPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(2, Math.min(98, percent));

    revealLayer.style.width = percent + '%';
    handle.style.left = percent + '%';
  }

  function onMove(e) {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(clientX);
  }

  function stopDrag() {
    dragging = false;
  }

  handle.addEventListener('mousedown', () => { dragging = true; });
  handle.addEventListener('touchstart', () => { dragging = true; }, { passive: true });

  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);

  container.addEventListener('click', (e) => {
    if (e.target === handle) return;
    setPosition(e.clientX);
  });

  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-label', 'Drag to compare raw botanical and refined serum');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.setAttribute('tabindex', '0');

  handle.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    const currentPercent = parseFloat(revealLayer.style.width) || 50;

    if (e.key === 'ArrowLeft') {
      setPosition(rect.left + (rect.width * (currentPercent - 5) / 100));
    } else if (e.key === 'ArrowRight') {
      setPosition(rect.left + (rect.width * (currentPercent + 5) / 100));
    }
  });

  setPosition(container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2);
  syncImageWidth();
  window.addEventListener('resize', debounce(syncImageWidth, 150));
}

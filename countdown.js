function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const STORAGE_KEY = 'ksglow_launch_target';
  let targetTime = storageGet(STORAGE_KEY, null);

  if (!targetTime) {
    targetTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    storageSet(STORAGE_KEY, targetTime);
  }

  function setSegment(el, value) {
    const formatted = String(value).padStart(2, '0');
    if (el.textContent !== formatted) {
      el.classList.add('flip');
      setTimeout(() => el.classList.remove('flip'), 600);
    }
    el.textContent = formatted;
  }

  function updateCountdown() {
    const distance = targetTime - Date.now();

    if (distance <= 0) {
      clearInterval(countdownInterval);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    setSegment(daysEl, d);
    setSegment(hoursEl, h);
    setSegment(minutesEl, m);
    setSegment(secondsEl, s);
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

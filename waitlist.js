function initWaitlist() {
  const form = document.getElementById('waitlistForm');
  const input = document.getElementById('waitlistEmail');
  const submitBtn = document.getElementById('waitlistSubmit');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email) {
      showToast('Enter your email to join the list', 'error');
      input.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showToast("That email doesn't look quite right", 'error');
      input.classList.add('input-error');
      input.focus();
      return;
    }

    input.classList.remove('input-error');

    const waitlist = storageGet('ksglow_waitlist', []);
    if (waitlist.includes(email)) {
      showToast("You're already on the list ✦", 'info');
      return;
    }

    waitlist.push(email);
    storageSet('ksglow_waitlist', waitlist);

    submitBtn.textContent = 'You\'re in ✓';
    submitBtn.disabled = true;
    input.value = '';
    input.disabled = true;

    showToast("Welcome to the list — we'll email you the moment we launch.", 'success');
  });

  input.addEventListener('input', () => input.classList.remove('input-error'));
}

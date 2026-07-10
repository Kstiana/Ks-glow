function initQuiz() {
  const openBtn = document.getElementById('quizOpenBtn');
  const modal = document.getElementById('quizModal');
  const closeBtn = document.getElementById('quizCloseBtn');
  const body = document.getElementById('quizBody');
  const progressFill = document.getElementById('quizProgressFill');
  const progressLabel = document.getElementById('quizProgressLabel');

  if (!openBtn || !modal || !body || typeof KSGLOW_QUIZ === 'undefined') return;

  let currentStep = 0;
  const answers = {};
  const questions = KSGLOW_QUIZ.questions;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentStep = 0;
    Object.keys(answers).forEach(k => delete answers[k]);
    renderStep();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateProgress() {
    const totalSteps = questions.length + 1;
    const displayStep = Math.min(currentStep + 1, totalSteps);
    const percent = (displayStep / totalSteps) * 100;
    progressFill.style.width = percent + '%';
    progressLabel.textContent = currentStep < questions.length
      ? `Question ${currentStep + 1} of ${questions.length}`
      : 'Your ritual';
  }

  function renderStep() {
    updateProgress();

    if (currentStep >= questions.length) {
      renderResult();
      return;
    }

    const q = questions[currentStep];
    body.innerHTML = `
      <h3 class="quiz-question">${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map(opt => `
          <button class="quiz-option" data-value="${opt.value}">${opt.label}</button>
        `).join('')}
      </div>
    `;

    body.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        answers[q.id] = btn.dataset.value;
        currentStep++;
        renderStep();
      });
    });
  }

  function renderResult() {
    const result = KSGLOW_QUIZ.resultFor(answers);
    body.innerHTML = `
      <div class="quiz-result">
        <p class="quiz-result-eyebrow">Your recommended ritual</p>
        <h3 class="serif quiz-result-title">${result.title}</h3>
        <p class="quiz-result-ingredient">Featuring ${result.ingredient}</p>
        <p class="quiz-result-description">${result.description}</p>
        <a href="#ingredients" class="hero-cta quiz-result-cta" id="quizResultCta">Explore the ritual</a>
        <button class="quiz-restart" id="quizRestartBtn">Retake the quiz</button>
      </div>
    `;

    document.getElementById('quizResultCta')?.addEventListener('click', closeModal);
    document.getElementById('quizRestartBtn')?.addEventListener('click', () => {
      currentStep = 0;
      Object.keys(answers).forEach(k => delete answers[k]);
      renderStep();
    });
  }

  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

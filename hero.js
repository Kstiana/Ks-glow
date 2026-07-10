function initBlobMorph() {
  const blobPath = document.getElementById('blobPath');
  if (!blobPath) return;

  let frame = 0;
  const speed = 0.002;

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
    if (prefersReducedMotion()) return;

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

function initCursorGlow() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    glow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => glow.classList.remove('active'));

  function render() {
    x += (targetX - x) * 0.15;
    y += (targetY - y) * 0.15;
    glow.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(render);
  }

  render();
}

function initParallax() {
  if (prefersReducedMotion()) return;

  const blob = document.querySelector('.hero-blob');
  if (!blob) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > window.innerHeight) return;
    blob.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.25}px))`;
  }, { passive: true });
}

// Искры в hero — отсылка к точильному кругу
(function sparks(){
  const field = document.getElementById('sparkField');
  const hero = document.querySelector('.hero');
  if (!field || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let running = false;
  let timer = null;

  function spawnSpark(){
    const vh = window.innerHeight;
    const originX = window.innerWidth * (0.55 + Math.random() * 0.3);
    const originY = vh * 0.55 + Math.random() * 60;

    const spark = document.createElement('div');
    spark.className = 'spark';

    const angle = (Math.random() * 70 + 200) * Math.PI / 180;
    const dist = 60 + Math.random() * 140;
    spark.style.left = originX + 'px';
    spark.style.top = originY + 'px';
    spark.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    spark.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    spark.style.animationDuration = (1 + Math.random()) + 's';

    field.appendChild(spark);
    setTimeout(() => spark.remove(), 2000);
  }

  function loop(){
    if (!running) return;
    const burst = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < burst; i++) spawnSpark();
    timer = setTimeout(loop, 250 + Math.random() * 400);
  }

  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !running) { running = true; loop(); }
      else if (!entry.isIntersecting) { running = false; clearTimeout(timer); }
    });
  }, { threshold: 0.1 }).observe(hero);
})();

// Появление блоков при скролле
(function reveal(){
  const targets = document.querySelectorAll('.card, .why__item, .process__list li, .contact-card');
  if (!targets.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      io.unobserve(el);
      // после появления отдаём управление hover-стилям элемента
      setTimeout(() => el.classList.remove('reveal', 'is-visible'), 600);
    });
  }, { threshold: 0.15 });

  targets.forEach(el => io.observe(el));
})();

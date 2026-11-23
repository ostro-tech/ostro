// Генерация искр в hero-секции — отсылка к точильному кругу
(function sparks(){
  const field = document.getElementById('sparkField');
  if (!field) return;

  function spawnSpark(){
    const vh = window.innerHeight;
    const originX = window.innerWidth * (0.55 + Math.random() * 0.3);
    const originY = vh * 0.55 + Math.random() * 60;

    const spark = document.createElement('div');
    spark.className = 'spark';

    const angle = (Math.random() * 70 + 200) * Math.PI / 180; // летят влево-вверх
    const dist = 60 + Math.random() * 140;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    spark.style.left = originX + 'px';
    spark.style.top = originY + 'px';
    spark.style.setProperty('--dx', dx + 'px');
    spark.style.setProperty('--dy', dy + 'px');
    spark.style.animationDuration = (1 + Math.random()) + 's';

    field.appendChild(spark);
    setTimeout(() => spark.remove(), 2000);
  }

  function loop(){
    const burst = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < burst; i++) spawnSpark();
    setTimeout(loop, 250 + Math.random() * 400);
  }

  // Останавливаем искры за пределами hero, чтобы не тратить ресурсы
  const hero = document.querySelector('.hero');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) loop();
    });
  }, { threshold: 0.1 });
  if (hero) observer.observe(hero);
})();

// Лёгкое появление карточек/блоков при скролле
(function reveal(){
  const targets = document.querySelectorAll('.card, .why__item, .process__list li, .contact-card');
  targets.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => io.observe(el));
})();

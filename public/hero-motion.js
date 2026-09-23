(() => {
  const hero = document.querySelector('.hero');
  const button = document.querySelector('.hero-motion-toggle');
  if (!hero || !button) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let visible = true;
  function update() {
    hero.classList.toggle('hero-motion-running', visible && !paused && !reduced.matches && !document.hidden);
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
  }
  button.addEventListener('click', () => { paused = !paused; update(); });
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; update();
  }, { threshold: .05 }).observe(hero);
  update();
})();

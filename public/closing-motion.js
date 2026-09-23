(() => {
  const section = document.querySelector('#sua-marca');
  if (!section) return;
  const button = section.querySelector('.closing-pause');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, paused = false;
  section.classList.add('closing-ready');
  const sync = () => {
    section.classList.toggle('closing-is-running', visible && !paused && !document.hidden && !media.matches);
  };
  button.addEventListener('click', () => {
    paused = !paused;
    button.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
    button.setAttribute('aria-pressed', String(paused));
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  media.addEventListener('change', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }, {threshold: .15}).observe(section.querySelector('.closing-motion'));
  } else {
    visible = true;
    sync();
  }
})();

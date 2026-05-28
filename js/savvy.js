// Savvy World — minimal JS
(() => {
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // mark current nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach((a) => {
    if (a.dataset.page === path.replace('.html','')) a.classList.add('is-current');
  });

  // marquee — duplicate children so the -50% animation loops seamlessly
  document.querySelectorAll('.marquee .track').forEach((track) => {
    const originals = Array.from(track.children);
    originals.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

  // lazy autoplay videos when in view
  const vids = document.querySelectorAll('video[data-autoplay]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) v.play?.().catch(() => {});
        else v.pause?.();
      });
    }, { threshold: 0.25 });
    vids.forEach((v) => io.observe(v));
  } else {
    vids.forEach((v) => v.play?.().catch(() => {}));
  }
})();

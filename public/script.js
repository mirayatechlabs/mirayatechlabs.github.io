// Interazioni di base, robuste e senza dipendenze.
// Lo smooth scroll (Lenis), il cursore magnetico e le animazioni GSAP
// stanno nello <script> module del layout. Qui niente smooth scroll: lo
// gestisce Lenis, così non si pestano i piedi.
document.addEventListener('DOMContentLoaded', () => {
  // Navbar che si compatta dopo lo scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('nav-scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal allo scroll: gli elementi .reveal entrano quando diventano visibili
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});

const stage = document.querySelector('.stage');
function update() {
  const p = Math.min(window.scrollY / window.innerHeight, 1);
  stage.style.setProperty('--p', p);
}
window.addEventListener('scroll', update, { passive: true });
update();

const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');

menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// scroll progress bar
function progress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty('--scroll', max > 0 ? window.scrollY / max : 0);
}
window.addEventListener('scroll', progress, { passive: true });
progress();

// "Back to top" links: scroll the window directly (href="#" is unreliable with the sticky hero on desktop)
document.querySelectorAll('a.top, a.brand[href="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'instant' });
    history.replaceState(null, '', location.pathname + location.search);
  });
});

// reveal elements on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

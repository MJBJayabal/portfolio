// ===================== Navbar: scrolled state + active link =====================
const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const links = [...navLinks.querySelectorAll('a:not(.btn-resume)')];

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  })
);

// Active link on scroll (scroll-spy)
const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = '#' + e.target.id;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// ===================== Typed rotating roles =====================
const roles = ['Software Engineer', 'React Native Developer', 'Web Developer', 'Mobile App Builder', 'Next.js Engineer'];
const typedEl = document.getElementById('typed');
let rIndex = 0, cIndex = 0, deleting = false;

function type() {
  const word = roles[rIndex];
  typedEl.textContent = word.slice(0, cIndex);
  if (!deleting && cIndex < word.length) {
    cIndex++;
    setTimeout(type, 90);
  } else if (!deleting && cIndex === word.length) {
    deleting = true;
    setTimeout(type, 1600);
  } else if (deleting && cIndex > 0) {
    cIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    rIndex = (rIndex + 1) % roles.length;
    setTimeout(type, 350);
  }
}
type();

// ===================== Scroll reveal =====================
const revealer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));

// ===================== Animated stat counters =====================
const counters = document.querySelectorAll('.num');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===================== Footer year =====================
document.getElementById('year').textContent = new Date().getFullYear();

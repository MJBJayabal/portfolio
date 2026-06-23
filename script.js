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

// ===================== Animated code window (self-typing) =====================
(function () {
  const codeEl = document.getElementById('codeBlock');
  if (!codeEl) return;

  // [text, tokenClass]  — class maps to .tok-* colors
  const lines = [
    [['const ', 'key'], ['developer', 'var'], [' = ', 'punc'], ['{', 'punc']],
    [['  name', 'var'], [': ', 'punc'], ['"Muthu Jayabal"', 'str'], [',', 'punc']],
    [['  role', 'var'], [': ', 'punc'], ['"Software Engineer"', 'str'], [',', 'punc']],
    [['  location', 'var'], [': ', 'punc'], ['"Bengaluru, India"', 'str'], [',', 'punc']],
    [['  stack', 'var'], [': ', 'punc'], ['[', 'punc'], ['"React"', 'str'], [', ', 'punc'], ['"React Native"', 'str'], [', ', 'punc'], ['"Next.js"', 'str'], [']', 'punc'], [',', 'punc']],
    [['  passion', 'var'], [': ', 'punc'], ['true', 'num'], [',', 'punc']],
    [['}', 'punc'], [';', 'punc']],
    [],
    [['function ', 'key'], ['build', 'fn'], ['() ', 'punc'], ['{', 'punc']],
    [['  while ', 'key'], ['(', 'punc'], ['coffee', 'var'], [') ', 'punc'], ['{', 'punc']],
    [['    ship', 'fn'], ['(', 'punc'], ['product', 'var'], ['); ', 'punc'], ['// 🚀 ships to the App Store', 'com']],
    [['  }', 'punc']],
    [['}', 'punc']],
  ];

  // Flatten into a token stream with explicit newlines
  const stream = [];
  lines.forEach((line, i) => {
    line.forEach(t => stream.push(t));
    if (i < lines.length - 1) stream.push(['\n', 'nl']);
  });

  const spanFor = (cls) => (cls === 'punc' || cls === '') ? 'tok-punc' : `tok-${cls}`;
  const fullHTML = () => stream.map(([txt, cls]) =>
    cls === 'nl' ? '\n' : `<span class="${spanFor(cls)}">${txt}</span>`
  ).join('');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { codeEl.innerHTML = fullHTML(); return; }

  const CARET = '<span class="code-caret"></span>';
  let committed = '';
  let ti = 0; // token index

  function typeToken() {
    if (ti >= stream.length) {                       // finished -> hold, then loop
      codeEl.innerHTML = committed + CARET;
      setTimeout(() => { committed = ''; ti = 0; typeToken(); }, 4000);
      return;
    }
    const [txt, cls] = stream[ti];
    if (cls === 'nl') { committed += '\n'; ti++; setTimeout(typeToken, 120); return; }

    const span = spanFor(cls);
    let ci = 0;
    (function typeChar() {
      ci++;
      codeEl.innerHTML = committed + `<span class="${span}">${txt.slice(0, ci)}</span>` + CARET;
      if (ci < txt.length) {
        setTimeout(typeChar, txt.length > 12 ? 16 : 30);
      } else {
        committed += `<span class="${span}">${txt}</span>`;
        ti++;
        setTimeout(typeToken, cls === 'com' ? 260 : 40);
      }
    })();
  }

  // Start when the window scrolls into view
  const startObs = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { typeToken(); obs.disconnect(); }
  }, { threshold: 0.3 });
  startObs.observe(codeEl);
})();

// ===================== Footer year =====================
document.getElementById('year').textContent = new Date().getFullYear();

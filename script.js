// ── Theme toggle ──────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const saved = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
root.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Nav scroll effect ─────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile hamburger ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ── Smooth scroll for nav links ───────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

// ── Scroll-triggered fade-in animations ───────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.project-card, .blog-item, .about-grid > *, .contact-grid > *')
  .forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

// ── Experience tabs ────────────────────────────
const expTabs = document.querySelectorAll('#experience .exp-tab');
const expPanels = document.querySelectorAll('#experience .exp-panel');
const expIndicator = document.querySelector('#experience .exp-indicator');
const TAB_H = 42;

function activateTab(index) {
  expTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  expPanels.forEach(p => p.classList.remove('active'));
  expTabs[index].classList.add('active');
  expTabs[index].setAttribute('aria-selected', 'true');
  expPanels[index].classList.add('active');
  expIndicator.style.transform = `translateY(${index * TAB_H}px)`;
}

expTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => activateTab(i));
  tab.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); activateTab((i + 1) % expTabs.length); expTabs[(i + 1) % expTabs.length].focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); activateTab((i - 1 + expTabs.length) % expTabs.length); expTabs[(i - 1 + expTabs.length) % expTabs.length].focus(); }
  });
});

// ── Skills tabs ────────────────────────────────
const skillTabs = document.querySelectorAll('#skills .skill-tab');
const skillPanels = document.querySelectorAll('#skills .skill-panel');
const skillIndicator = document.querySelector('#skills .skill-indicator');

function activateSkillTab(index) {
  skillTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  skillPanels.forEach(p => p.classList.remove('active'));
  skillTabs[index].classList.add('active');
  skillTabs[index].setAttribute('aria-selected', 'true');
  skillPanels[index].classList.add('active');
  skillIndicator.style.transform = `translateY(${index * TAB_H}px)`;
}

skillTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => activateSkillTab(i));
  tab.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); activateSkillTab((i + 1) % skillTabs.length); skillTabs[(i + 1) % skillTabs.length].focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); activateSkillTab((i - 1 + skillTabs.length) % skillTabs.length); skillTabs[(i - 1 + skillTabs.length) % skillTabs.length].focus(); }
  });
});

// ── Contact form (client-side only placeholder) ─
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Message sent!';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send message →';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});

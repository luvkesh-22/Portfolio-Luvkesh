// Year in footer
document.querySelectorAll('#year').forEach(el => (el.textContent = new Date().getFullYear()));

// Theme initialization
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme');
const applyTheme = theme => {
  document.body.classList.toggle('light', theme === 'light');
  localStorage.setItem('theme', theme);
};
applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

document.querySelectorAll('#toggle-theme').forEach(btn => {
  btn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(newTheme);
  });
});

// Active nav link
const current = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && href.endsWith(current)) a.classList.add('active');
});

// Image modal (only for .zoomable images)
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = modal.querySelector('.modal-close');
const backdrop = modal.querySelector('.modal-backdrop');

document.querySelectorAll('img.zoomable').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.setAttribute('aria-hidden', 'false');
  });
});

const closeModal = () => modal.setAttribute('aria-hidden', 'true');
backdrop.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Back to top
const backToTop = document.getElementById('back-to-top');
const toggleBackToTop = () => {
  if (window.scrollY > 400) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
};
window.addEventListener('scroll', toggleBackToTop);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
toggleBackToTop();

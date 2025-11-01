window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');

  if (!link) return;

  const href = link.getAttribute('href');
  const isExternal = link.target === '_blank';
  const isSpecialLink = href && (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:'));

  if (href && !isExternal && !isSpecialLink) {
    e.preventDefault();
    document.body.classList.remove('loaded');
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  }
});
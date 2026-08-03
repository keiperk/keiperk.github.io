// Scroll-reveal for case study cards
const cards = document.querySelectorAll('.case-card');

if ('IntersectionObserver' in window && cards.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(card => revealObserver.observe(card));
} else {
  cards.forEach(card => card.classList.add('is-visible'));
}

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thanks — I'll get back to you soon.";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please email me directly.";
      }
    } catch {
      status.textContent = "Something went wrong. Please email me directly.";
    }
  });
}

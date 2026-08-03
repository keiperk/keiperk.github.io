// Scroll-reveal for case study rows
const rows = document.querySelectorAll('.case-row');

if ('IntersectionObserver' in window && rows.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  rows.forEach(row => revealObserver.observe(row));
} else {
  rows.forEach(row => row.classList.add('is-visible'));
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

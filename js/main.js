// Scroll-reveal for case study rows and detail-page sections
const rows = document.querySelectorAll('.case-row, .reveal');

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

// Lightbox — click any gallery/lead image (not ones already wrapped in
// a link, e.g. a PDF link) to view it enlarged.
const lightboxImages = document.querySelectorAll('.detail-gallery__item img, .detail-lead-image img');
if (lightboxImages.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><div class="lightbox-frame"><img alt=""><p class="lightbox-caption"></p></div>';
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('img');
  const overlayCaption = overlay.querySelector('.lightbox-caption');

  function getCaption(img) {
    const figure = img.closest('figure');
    if (figure) {
      const cap = figure.querySelector('.detail-gallery__caption');
      return cap ? cap.textContent.trim() : '';
    }
    const leadImage = img.closest('.detail-lead-image');
    if (leadImage && leadImage.parentElement) {
      const cap = leadImage.parentElement.querySelector('.detail-gallery__caption');
      return cap ? cap.textContent.trim() : '';
    }
    return '';
  }

  function openLightbox(src, alt, caption) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlayCaption.textContent = caption || '';
    overlayCaption.style.display = caption ? '' : 'none';
    overlay.classList.add('is-open');
  }
  function closeLightbox() {
    overlay.classList.remove('is-open');
  }

  lightboxImages.forEach((img) => {
    if (img.closest('a')) return;
    img.addEventListener('click', () => openLightbox(img.dataset.full || img.src, img.alt, getCaption(img)));
  });

  overlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// Opportunity Radar: live contact count, pulled from a published
// Google Sheet (a count-only cell, no contact data exposed)
const oppRadarCount = document.getElementById('opp-radar-count');
if (oppRadarCount) {
  const csvUrl = oppRadarCount.dataset.csvUrl;
  fetch(csvUrl)
    .then((res) => res.text())
    .then((text) => {
      const n = parseInt(text.trim(), 10);
      if (!isNaN(n)) {
        oppRadarCount.textContent = `${n.toLocaleString()} contacts surfaced`;
      } else {
        oppRadarCount.remove();
      }
    })
    .catch(() => oppRadarCount.remove());
}

// Same live count, styled as a stat-tile number (case study hero)
const oppRadarStatNumber = document.getElementById('opp-radar-stat-number');
if (oppRadarStatNumber) {
  const csvUrl = oppRadarStatNumber.dataset.csvUrl;
  const statTile = oppRadarStatNumber.closest('.stat-tile');
  fetch(csvUrl)
    .then((res) => res.text())
    .then((text) => {
      const n = parseInt(text.trim(), 10);
      if (!isNaN(n)) {
        oppRadarStatNumber.textContent = n.toLocaleString();
      } else if (statTile) {
        statTile.remove();
      }
    })
    .catch(() => { if (statTile) statTile.remove(); });
}

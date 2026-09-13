// Single source of truth for Kevin's professional title/positioning —
// changed 3 times in one week (Senior AI Product Designer -> AI-Enabled
// -> AI-Native), each time requiring a manual find/replace across every
// page. Any element with [data-role-title] gets this text automatically;
// change it here once instead of hunting down every instance. Doesn't
// cover <title>/<meta> tags (those need to be static HTML for SEO/link
// previews, not JS-populated) or the resume PDF (a separate binary file,
// can't be tokenized) — those still need a manual edit when this changes.
const ROLE_TITLE = 'senior AI-native product designer';
// "a"/"an" depends on the title's first sound — computed here so a future
// title change (e.g. to something vowel-led) can't leave a stray "a" or
// "an" stranded in front of it somewhere.
const ROLE_ARTICLE = /^[aeiou]/i.test(ROLE_TITLE) ? 'an' : 'a';
document.querySelectorAll('[data-role-title]').forEach((el) => {
  el.textContent = ROLE_TITLE;
});
document.querySelectorAll('[data-role-article]').forEach((el) => {
  el.textContent = ROLE_ARTICLE;
});

// Scroll-reveal for case study rows and detail-page sections. The fade
// only applies at all under html.js (see <head>), so a no-JS visitor
// already sees full content. This still guards the JS-enabled case: any
// error here, or the observer just never firing, would otherwise leave
// html.js content stuck at opacity:0 forever.
try {
  const rows = document.querySelectorAll('.case-row, .rail-content, .reveal, .detail-section');

  if ('IntersectionObserver' in window && rows.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    rows.forEach(row => revealObserver.observe(row));
  } else {
    rows.forEach(row => row.classList.add('is-visible'));
  }

  // Safety net: if anything above silently fails to reveal a row (e.g.
  // it never scrolls into view within a reasonable time on a very tall
  // page), force it visible rather than leave it permanently hidden.
  window.setTimeout(() => {
    document.querySelectorAll('.case-row, .rail-content, .reveal, .detail-section')
      .forEach(row => row.classList.add('is-visible'));
  }, 4000);
} catch (err) {
  document.querySelectorAll('.case-row, .rail-content, .reveal, .detail-section')
    .forEach(row => row.classList.add('is-visible'));
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
// a link, e.g. a PDF link) to view it enlarged. Images sharing a gallery
// group are stepped through together with prev/next, instead of each
// image opening in isolation.
const lightboxImages = document.querySelectorAll('.detail-gallery__item img, .detail-lead-image img');
if (lightboxImages.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><button class="lightbox-prev" aria-label="Previous image">&larr;</button><button class="lightbox-next" aria-label="Next image">&rarr;</button><div class="lightbox-frame"><img alt=""><p class="lightbox-caption"></p></div>';
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('img');
  const overlayCaption = overlay.querySelector('.lightbox-caption');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

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

  // Each image's "group" is the other lightbox-able images sharing its
  // nearest .detail-gallery/.detail-gallery--masonry ancestor. Images not
  // inside a gallery (e.g. a lone lead image) get a group of one.
  const groups = [];
  const groupOf = new Map();
  lightboxImages.forEach((img) => {
    if (img.closest('a')) return;
    const gallery = img.closest('.detail-gallery, .detail-gallery--masonry, .detail-lead-image');
    let group = gallery ? groupOf.get(gallery) : null;
    if (!group) {
      group = [];
      groups.push(group);
      if (gallery) groupOf.set(gallery, group);
    }
    group.push(img);
  });

  let currentGroup = [];
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + currentGroup.length) % currentGroup.length;
    const img = currentGroup[currentIndex];
    overlayImg.src = img.dataset.full || img.src;
    overlayImg.alt = img.alt || '';
    const caption = getCaption(img);
    overlayCaption.textContent = caption;
    overlayCaption.style.display = caption ? '' : 'none';
    const multi = currentGroup.length > 1;
    prevBtn.style.display = multi ? '' : 'none';
    nextBtn.style.display = multi ? '' : 'none';
  }

  function openLightbox(img) {
    const gallery = img.closest('.detail-gallery, .detail-gallery--masonry, .detail-lead-image');
    currentGroup = (gallery && groupOf.get(gallery)) || [img];
    show(currentGroup.indexOf(img));
    overlay.classList.add('is-open');
  }
  function closeLightbox() {
    overlay.classList.remove('is-open');
  }

  lightboxImages.forEach((img) => {
    if (img.closest('a')) return;
    img.addEventListener('click', () => openLightbox(img));
  });

  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex - 1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex + 1); });
  overlay.querySelector('.lightbox-frame').addEventListener('click', (e) => e.stopPropagation());
  overlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
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

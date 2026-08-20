/**
 * Runtime guards for production bugs that CSS / static HTML cannot cover.
 * - Hide broken vehicle images (never invent or generate photos)
 * - Keep WhatsApp / Telegram message free of click IDs (Ref only)
 */
const NO_PHOTO = new Set(['stallions-sm250', 'mt-15', 'haval', 'everest']);

function bikeIdFromPhotoSrc(src) {
  const match = String(src || '').match(/\/bikes\/([^/]+)\/\d+\.webp/);
  return match ? match[1] : '';
}

function hideBrokenImage(img) {
  if (!img || img.dataset.photoMissing === '1') return;
  img.dataset.photoMissing = '1';
  img.removeAttribute('src');
  img.hidden = true;
  img.style.display = 'none';
  const thumb = img.closest('.price-thumb');
  if (thumb) thumb.classList.add('no-photo');
  const slide = img.closest('.photo-slide');
  if (slide) slide.classList.add('photo-slide--placeholder');
}

function stripBrokenFleetPhotos() {
  document.querySelectorAll('img').forEach((img) => {
    const id = bikeIdFromPhotoSrc(img.getAttribute('src') || img.src);
    if (id && NO_PHOTO.has(id)) hideBrokenImage(img);
    img.addEventListener(
      'error',
      () => {
        hideBrokenImage(img);
      },
      { once: true },
    );
  });
}

function protectMessengerRefs() {
  document.querySelectorAll('a[href*="wa.me"], a[href*="t.me"], a[href*="telegram.me"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, location.origin);
      ['gclid', 'wbraid', 'gbraid', 'fbclid', 'ttclid', 'msclkid', 'yclid', 'click_id', 'clickid'].forEach((key) => {
        url.searchParams.delete(key);
      });
      if (url.searchParams.has('text')) {
        const text = url.searchParams.get('text') || '';
        const cleaned = text
          .replace(/(?:^|\s)(?:gclid|wbraid|gbraid|fbclid|ttclid|msclkid|yclid|click_id)=[^\s]+/gi, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
        if (cleaned) url.searchParams.set('text', cleaned);
      }
      a.setAttribute('href', url.toString());
    } catch {
      /* keep original href */
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    stripBrokenFleetPhotos();
    protectMessengerRefs();
  });
} else {
  stripBrokenFleetPhotos();
  protectMessengerRefs();
}

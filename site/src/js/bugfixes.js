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

const TAB_PRICES_LABEL = {
  ru: 'Цены',
  en: 'Prices',
  de: 'Preise',
  fr: 'Tarifs',
  es: 'Precios',
  th: 'ราคา',
  zh: '价格',
};

const DOLLAR_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';

function pagePath() {
  return location.pathname.replace(/^\/(en|de|fr|es|th|zh)(?=\/|$)/, '') || '/';
}

function langPrefix() {
  const match = location.pathname.match(/^\/(en|de|fr|es|th|zh)(?=\/|$)/);
  return match ? `/${match[1]}` : '';
}

function currentLang() {
  const match = location.pathname.match(/^\/(en|de|fr|es|th|zh)(?=\/|$)/);
  return match ? match[1] : document.documentElement.lang || 'ru';
}

function isPricesPath(path) {
  return path === '/prices' || path.startsWith('/prices/');
}

function pricesHref() {
  return `${langPrefix()}/prices/`;
}

function ensurePricesTab(bar) {
  let item = bar.querySelector('[data-tab="prices"]');
  if (item) return item;
  const lang = currentLang();
  const label = TAB_PRICES_LABEL[lang] || TAB_PRICES_LABEL.en;
  item = document.createElement('a');
  item.href = pricesHref();
  item.className = 'tab-bar-item';
  item.dataset.tab = 'prices';
  item.setAttribute('aria-label', label);
  item.innerHTML = `${DOLLAR_ICON}<span data-i18n="tabPrices">${label}</span>`;
  const guide = bar.querySelector('[data-tab="guide"]');
  if (guide) bar.insertBefore(item, guide);
  else bar.appendChild(item);
  return item;
}

function fixPricesTabBar() {
  const bar = document.querySelector('.tab-bar');
  if (!bar) return false;
  if (!isPricesPath(pagePath())) return true;
  bar.querySelectorAll('[data-tab="guide"]').forEach((el) => {
    el.classList.remove('active');
    el.removeAttribute('aria-current');
  });
  const prices = ensurePricesTab(bar);
  prices.classList.add('active');
  prices.setAttribute('aria-current', 'page');
  return true;
}

function watchTabBar() {
  if (fixPricesTabBar()) return;
  const observer = new MutationObserver(() => {
    if (fixPricesTabBar()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    stripBrokenFleetPhotos();
    protectMessengerRefs();
    watchTabBar();
  });
} else {
  stripBrokenFleetPhotos();
  protectMessengerRefs();
  watchTabBar();
}

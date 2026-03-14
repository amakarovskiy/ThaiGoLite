// ThaiGo Lite — Main app logic with i18n
import './styles/reset.css';
import './styles/tokens.css';
import './styles/app.css';
import './components/bottom-tab-bar.css';
import './components/booking-sheet.css';
import './components/rider-test.css';
import './components/bike-picker.css';
import './components/routes-map.css';
import './components/privacy.css';
import { BIKES, BIKE_CATEGORIES, BUDGET_GROUPS } from './data/bikes.js';
import { PLACES, CAT_COLORS, getDisplayCat, MAX_ROUTE_POINTS } from './data/places.js';
import { calcStats, formatTime, haversine, KM_FACTOR, TAXI_RATE_PER_KM } from './utils/stats.js';
import { LANGS, detectLang, saveLang, T, translateFeature, BIKE_CAT_TR } from './data/i18n.js';
import { PLACE_TR } from './data/place-translations.js';
import { RIDER_QUESTIONS, CONFETTI_EMOJIS } from './data/rider-test.js';
import { getPricePerDay, getTotalPrice, getCurrentSeason, getInsurancePerDay, getInsuranceTotal, MAXI_BIG_IDS, getShortRentalFee, getDiscountPercent, getNextDiscountHint, getInsuranceFranchise as getInsuranceFranchiseUtil, getDeposit } from './utils/pricing.js';

// ══════════════════════════════════════════════
// Lucide-style inline SVG icons for bike picker
// ══════════════════════════════════════════════
const BP_ICONS = {
  // Step 1 — Who
  solo: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  couple: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  child: '<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
  girl: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/><path d="M12 13v8"/><path d="m9 18 3-3 3 3"/>',
  // Step 2 — Experience
  newbie: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  beginner: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  confident: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  expert: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  // Step 3 — Type
  auto: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3.5-3.5 2-2 4 3h3"/>',
  manual: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3.5-3.5 2-2 4 3h3"/>',
  // Step 4 — Priorities
  easy: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>',
  comfort: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2"/><path d="M20 18v2"/>',
  sport: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  style: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  economy: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  // Step 5 — Destination
  beach: '<path d="M17.5 21H9a7 7 0 0 1 6.71-5h0a7 7 0 0 1 6.79 5"/><path d="M12 3a4.5 4.5 0 0 0-4.5 4.5c0 1.66.9 3.12 2.24 3.9"/><path d="M12 3a4.5 4.5 0 0 1 4.5 4.5c0 1.66-.9 3.12-2.24 3.9"/><path d="M12 3v8.35"/><path d="M2 21h20"/>',
  island: '<path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-4"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 4.24-4.24c-1.96-1.96-5.27-1.8-7.43.35l-.7.7-.71.71-.7.71Z"/><path d="M2 21h20"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  beyond: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  // Step 6 — Budget
  budgetAll: '<circle cx="12" cy="12" r="10"/>',
  budgetEconomy: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><path d="M14.5 9.5H11a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9.5"/>',
  budgetComfort: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  budgetPremium: '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
  // Results
  scooter: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3.5-3.5 2-2 4 3h3"/>',
  moto: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3.5-3.5 2-2 4 3h3"/>',
  // Promise line
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
};

function bpIcon(name, size = 22) {
  const d = BP_ICONS[name];
  if (!d) return '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
}

// ══════════════════════════════════════════════
// i18n helper
// ══════════════════════════════════════════════
let lang = detectLang();

function t(key) {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

function tpl(key, vars) {
  let s = t(key);
  for (const [k, v] of Object.entries(vars)) {
    s = s.replace('${' + k + '}', v);
  }
  return s;
}

function placeName(place) {
  const tr = PLACE_TR[place.id];
  if (tr && tr.name && tr.name[lang]) return tr.name[lang];
  return place.name;
}

function placeDesc(place) {
  const tr = PLACE_TR[place.id];
  if (tr && tr.desc && tr.desc[lang]) return tr.desc[lang];
  return place.desc;
}

function placeTips(place) {
  const tr = PLACE_TR[place.id];
  if (tr && tr.tips && tr.tips[lang]) return tr.tips[lang];
  return place.tips || '';
}

function trFeature(feature) {
  return translateFeature(feature, lang);
}

function bikeCatName(cat) {
  const entry = BIKE_CAT_TR[cat];
  return entry ? (entry[lang] || entry.en || cat) : cat;
}

// ══════════════════════════════════════════════
// UX Helpers — reusable animation utilities
// ══════════════════════════════════════════════

/**
 * Animate a numeric value change with count-up/down effect.
 * @param {HTMLElement} el — target element
 * @param {number} from — start value
 * @param {number} to — end value
 * @param {number} duration — ms (default 250)
 * @param {string} suffix — text appended after number (e.g. ' ฿')
 */
function animateValue(el, from, to, duration = 600, suffix = ' ฿') {
  if (!el || from === to) { if (el) el.textContent = to.toLocaleString() + suffix; return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = to.toLocaleString() + suffix;
    return;
  }
  // scale(1.02) bump at start
  el.style.transition = 'transform 150ms ease';
  el.style.transform = 'scale(1.02)';
  setTimeout(() => { el.style.transform = ''; }, 150);
  const start = performance.now();
  const diff = to - from;
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + diff * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/**
 * Flash-highlight an element briefly (adds then removes a class).
 * @param {HTMLElement} el
 * @param {string} cls — CSS class to toggle (default 'flash')
 * @param {number} ms — duration before removal (default 350)
 */
function flashClass(el, cls = 'flash', ms = 350) {
  if (!el) return;
  el.classList.remove(cls);
  // force reflow so re-adding triggers animation
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}

/**
 * Micro-pulse animation on a selectable option toggle.
 * @param {HTMLElement} el
 */
function pulseToggle(el) {
  if (!el) return;
  el.classList.remove('just-toggled');
  void el.offsetWidth;
  el.classList.add('just-toggled');
  setTimeout(() => el.classList.remove('just-toggled'), 300);
}

// Previous total for count-up animation
let prevSheetTotal = 0;

// ══════════════════════════════════════════════
// State
// ══════════════════════════════════════════════
let currentTab = 'home';
let bikeFilter = 'all';
let placeFilter = 'top';
let placeSearch = '';
let route = [];
let sheetBike = null;
let sheetDays = 8;
let sheetInsurancePlus = false;
let sheetDateStart = '';
let sheetDateEnd = '';

// Messenger priority based on user language
function getPrimaryMessenger() {
  const userLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
  const telegramFirst = ['ru', 'uk', 'be', 'kk'];
  return telegramFirst.includes(userLang) ? 'telegram' : 'whatsapp';
}
const PRIMARY_MESSENGER = getPrimaryMessenger();

function openMessenger(type, message) {
  const encoded = encodeURIComponent(message);
  if (type === 'whatsapp') window.open(`https://wa.me/66822545737?text=${encoded}`, '_blank');
  if (type === 'telegram') window.open(`https://t.me/ThaiGoSale1?text=${encoded}`, '_blank');
}

// ══════════════════════════════════════════════
// DOM refs
// ══════════════════════════════════════════════
const $ = id => document.getElementById(id);
const pages = document.querySelectorAll('.page');
const tabs = document.querySelectorAll('.tab-bar .tab');

const bikeGrid = $('bikeGrid');
const bikeFiltersEl = $('bikeFilters');
// popularScroll removed — now using popScroll in renderPopular()

// Routes map page refs
const routeSheet = $('routeSheet');
const rsHandle = $('rsHandle');
const rsTabs = $('rsTabs');
const rsContent = $('rsContent');
const rsBadge = $('rsBadge');
const rsPlaceList = $('rsPlaceList');
const rsSearchInput = $('rsSearchInput');
const rsFilters = $('rsFilters');
const rsPanelPlaces = $('rsPanelPlaces');
const rsPanelRoute = $('rsPanelRoute');
const rsRoutePanel = $('rsRoutePanel');
const svgMap = $('svgMap');
const mapMarkers = $('mapMarkers');
const routeLine = $('routeLine');

const sheetOverlay = $('sheetOverlay');
const bookingSheet = $('bookingSheet');
const sheetBikeImg = $('sheetBikeImg');
const sheetBikeName = $('sheetBikeName');
const sheetBikeCc = $('sheetBikeCc');
const sheetFeatures = $('sheetFeatures');
const sheetP1 = $('sheetP1');
const sheetP3 = $('sheetP3');
const sheetP7 = $('sheetP7');
const sheetP14 = $('sheetP14');
const sheetDaySlider = $('sheetDaySlider');
const sheetDateStartEl = $('sheetDateStart');
const sheetDateEndEl = $('sheetDateEnd');
const sheetDaysDisplay = $('sheetDays');
const sheetTotal = $('sheetTotal');
const sheetWa = $('sheetWa');
const sheetTg = $('sheetTg');
const sheetImgWrap = $('sheetImgWrap');
const sheetImgDots = $('sheetImgDots');
const sheetInsuranceEl = $('sheetInsurance');
const insBasicChip = $('insBasicChip');
const insPlusChip = $('insPlusChip');
const insPlusCostLabel = $('insPlusCostLabel');
const insBasicInfo = $('insBasicInfo');
const insPlusInfo = $('insPlusInfo');
const insBasicSheet = $('insBasicSheet');
const insBasicOverlay = $('insBasicOverlay');
const insBasicClose = $('insBasicClose');
const insPlusSheet = $('insPlusSheet');
const insPlusOverlay = $('insPlusOverlay');
const insPlusClose = $('insPlusClose');
const insPlusDescText = $('insPlusDescText');
const insPlusPriceInfo = $('insPlusPriceInfo');
const lbOverlay = $('lbOverlay');
const lbTrack = $('lbTrack');
const lbCounter = $('lbCounter');
const lbDots = $('lbDots');

const placeSheet = $('placeSheet');
const placeSheetIcon = $('placeSheetIcon');
const placeSheetName = $('placeSheetName');
const placeSheetKm = $('placeSheetKm');
const placeSheetDesc = $('placeSheetDesc');
const placeSheetTips = $('placeSheetTips');
const placeSheetAdd = $('placeSheetAdd');

// ══════════════════════════════════════════════
// Language Switcher
// ══════════════════════════════════════════════
const langBtn = $('langBtn');
const langFlag = $('langFlag');
const langCodeEl = $('langCode');
const langDropdown = $('langDropdown');

function renderLangSwitcher() {
  const current = LANGS.find(l => l.code === lang) || LANGS[1];
  langFlag.textContent = current.flag;
  langCodeEl.textContent = current.label;

  langDropdown.innerHTML = LANGS.map(l => `
    <button class="lang-option ${l.code === lang ? 'active' : ''}" data-lang="${l.code}">
      <span class="lang-flag">${l.flag}</span>
      <span>${l.name}</span>
      ${l.code === lang ? '<span class="lang-check">\u2713</span>' : ''}
    </button>
  `).join('');

  langDropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      lang = opt.dataset.lang;
      saveLang(lang);
      langDropdown.classList.remove('open');
      document.documentElement.lang = lang;
      applyTranslations();
    });
  });
}

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
  langDropdown.classList.remove('open');
});

langDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ══════════════════════════════════════════════
// Apply all translations
// ══════════════════════════════════════════════
function applyTranslations() {
  renderLangSwitcher();

  // SEO meta tags
  document.title = t('seoTitle');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t('seoDescription');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = t('seoTitle');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = t('seoDescription');
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.content = t('seoTitle');
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.content = t('seoDescription');

  // Generic data-i18n handler — updates text of elements with [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (T[key]) el.textContent = t(key);
  });

  // Hero (innerHTML for <br> support)
  const heroH1 = document.querySelector('.hero-h1');
  if (heroH1) heroH1.innerHTML = t('heroTitle');
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.innerHTML = t('heroSub');

  // Hero CTA — mockup v3.8: two equal messenger buttons side by side
  const heroCta = $('heroCta');
  if (heroCta) {
    const tgSvg = '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.9c-.12.59-.45.73-.91.46l-2.5-1.84-1.21 1.16c-.13.13-.24.24-.5.24l.18-2.55 4.64-4.19c.2-.18-.04-.28-.31-.1L7.95 14.1l-2.47-.77c-.54-.17-.55-.54.11-.8l9.64-3.72c.44-.16.83.11.41.99z"/></svg>';
    const waSvg = '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>';
    const msgText = encodeURIComponent(t('waMsgGeneral') || '');
    heroCta.innerHTML = `
      <a class="btn-messenger-icon tg" href="https://t.me/ThaiGoSale1?text=${msgText}" target="_blank" rel="noopener">
        ${tgSvg}<span>${t('ctaTelegram')}</span>
      </a>
      <a class="btn-messenger-icon wa" href="https://wa.me/66822545737?text=${msgText}" target="_blank" rel="noopener">
        ${waSvg}<span>${t('ctaWhatsapp')}</span>
      </a>
    `;
  }

  // Steps title
  const stepsTitle = $('stepsTitle');
  if (stepsTitle) stepsTitle.textContent = t('stepsTitle');

  // Popular bikes block
  updatePopBlock();

  // Why ThaiGo
  const whyTitle = $('whyTitle');
  if (whyTitle) whyTitle.textContent = t('whyTitle');
  const whyTexts = document.querySelectorAll('.why-text');
  const whyKeys = ['whyNoDeposit', 'whyDelivery', 'whyPrice', 'whySupport', 'whyReplace', 'whyContract'];
  whyTexts.forEach((el, i) => { if (whyKeys[i]) el.textContent = t(whyKeys[i]); });
  const whySubs = document.querySelectorAll('.why-sub');
  const whySubKeys = ['whyNoDepositSub', 'whyDeliverySub', 'whyPriceSub', 'whySupportSub', 'whyReplaceSub', 'whyContractSub'];
  whySubs.forEach((el, i) => { if (whySubKeys[i]) el.textContent = t(whySubKeys[i]); });

  // Popular bikes section
  // Popular bikes block translations handled by updatePopBlock()

  // Delivery section
  const delivTitleEl = $('deliveryTitle');
  if (delivTitleEl) delivTitleEl.textContent = t('deliveryTitle');
  const dlvGrid = document.getElementById('dlvGrid');
  if (dlvGrid) {
    dlvGrid.innerHTML = T.dlvAreas.map(a => `<div class="dlv-card"><div class="dlv-name">${a.name[lang] || a.name.en}</div><div class="dlv-cond dlv-${a.color}">${a.cond[lang] || a.cond.en}</div></div>`).join('');
  }
  const dlvNote = document.querySelector('.dlv-note');
  if (dlvNote) dlvNote.textContent = t('deliveryNote');

  // Steps
  const stepTexts = document.querySelectorAll('.step-text');
  ['step1', 'step2', 'step3'].forEach((k, i) => { if (stepTexts[i]) stepTexts[i].textContent = t(k); });

  // Reviews
  const reviewsTitle = $('reviewsTitle');
  if (reviewsTitle) reviewsTitle.textContent = t('reviewsTitle');
  const reviewsScroll = $('reviewsScroll');
  if (reviewsScroll) {
    reviewsScroll.innerHTML = T.reviews.map(r => {
      const avatar = r.initials ? `<div class="review-avatar" style="background:${r.bgColor}">${r.initials}</div>` : '';
      const date = r.date ? `<div class="review-date">${r.date[lang] || r.date.en}</div>` : '';
      return `<div class="review-card">${avatar}<div class="review-stars">\u2B50\u2B50\u2B50\u2B50\u2B50</div><div class="review-text">${r.text[lang] || r.text.en}</div><div class="review-author">${r.author[lang] || r.author.en}</div>${date}</div>`;
    }).join('');
  }

  // Tab bar
  const tabLabels = document.querySelectorAll('.tab .tab-label');
  const tabKeys = ['tabHome', 'tabBikes', 'tabGuide', 'tabContacts'];
  tabLabels.forEach((el, i) => { if (tabKeys[i]) el.textContent = t(tabKeys[i]); });

  // Guide micro-menu
  const menuRoutesText = $('menuRoutes');
  const menuRiderText = $('menuRiderTest');
  if (menuRoutesText) menuRoutesText.querySelector('.menu-text').textContent = t('guideMenuRoutes');
  if (menuRiderText) menuRiderText.querySelector('.menu-text').textContent = t('guideMenuRiderTest');
  const menuBikePickerText = $('menuBikePickerText');
  if (menuBikePickerText) menuBikePickerText.textContent = t('bpMenuBtn');

  // Rider teaser
  const teaserTitle = document.querySelector('.rider-teaser-title');
  const teaserSub = document.querySelector('.rider-teaser-sub');
  const teaserBtn = document.querySelector('.rider-teaser-btn');
  if (teaserTitle) teaserTitle.textContent = t('teaserTitle');
  if (teaserSub) teaserSub.textContent = t('teaserSub');
  if (teaserBtn) teaserBtn.textContent = t('teaserBtn');

  // Rider test header
  const rtTitle = document.querySelector('.rider-test-title');
  if (rtTitle) rtTitle.textContent = t('riderTestTitle');

  // Bike filters (budgetGroup-based: All/Economy/Comfort/Premium)
  const bikeFilterChips = bikeFiltersEl.querySelectorAll('.filter-chip, .chip');
  const bikeFilterKeys = ['filterAll', 'popEconomy', 'popComfort', 'popPremium'];
  bikeFilterChips.forEach((el, i) => { if (bikeFilterKeys[i]) el.textContent = t(bikeFilterKeys[i]); });

  // Place filters — re-render chips (picks up new language)
  renderFilterChips();

  // Search placeholder
  rsSearchInput.placeholder = t('placeSearchPlaceholder');

  // Route sheet tabs
  const rsTb = rsTabs.querySelectorAll('.rs-tab');
  if (rsTb[0]) rsTb[0].textContent = t('subtabPlaces');
  if (rsTb[1]) rsTb[1].innerHTML = `${t('subtabRoute')} <span class="rs-badge" id="rsBadge" style="${route.length ? '' : 'display:none'}">${route.length}</span>`;

  // Share popover
  const rsShareTitle = $('rsShareTitle');
  if (rsShareTitle) rsShareTitle.textContent = t('shareRoute');
  const rsShareCopy = $('rsShareCopy');
  if (rsShareCopy) rsShareCopy.textContent = t('copyLink');

  // Contacts page
  const contactsTitle = document.querySelector('.contacts-page .page-title');
  if (contactsTitle) contactsTitle.textContent = t('contactsTitle');

  // Address hero block
  const addressHero = $('addressHero');
  if (addressHero) {
    const heroText = addressHero.querySelector('.address-hero-text');
    if (heroText) heroText.textContent = t('contactsAddress');
  }

  // Messenger row TG + WA (contacts page — mockup v3.8)
  const messengerRow = $('contactMessengerRow');
  if (messengerRow) {
    const msgText = encodeURIComponent(t('waMsgGeneral') || '');
    const tgSvgSmall = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.9c-.12.59-.45.73-.91.46l-2.5-1.84-1.21 1.16c-.13.13-.24.24-.5.24l.18-2.55 4.64-4.19c.2-.18-.04-.28-.31-.1L7.95 14.1l-2.47-.77c-.54-.17-.55-.54.11-.8l9.64-3.72c.44-.16.83.11.41.99z"/></svg>';
    const waSvgSmall = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>';
    messengerRow.innerHTML = `
      <a class="btn-msg-tg" href="https://t.me/ThaiGoSale1?text=${msgText}" target="_blank" rel="noopener">
        ${tgSvgSmall}<span>${t('ctaTelegram')}</span>
      </a>
      <a class="btn-msg-wa" href="https://wa.me/66822545737?text=${msgText}" target="_blank" rel="noopener">
        ${waSvgSmall}<span>${t('ctaWhatsapp')}</span>
      </a>
    `;
  }

  // FAB "Route to office"
  const fabRoute = $('fabRouteToOffice');
  if (fabRoute) {
    const fabText = fabRoute.querySelector('.fab-text');
    if (fabText) fabText.textContent = t('fabRouteToOffice');
  }

  // Contact card rows
  const contactCard = $('contactCard');
  if (contactCard) {
    contactCard.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (T[key]) el.textContent = t(key);
    });
  }
  // Map preview label & button
  const mapLabel = document.querySelector('[data-i18n-map]');
  if (mapLabel) mapLabel.textContent = t(mapLabel.dataset.i18nMap);
  const mapBtn = $('contactMapBtn');
  if (mapBtn) {
    const span = mapBtn.querySelector('[data-i18n]');
    if (span) span.textContent = t(span.dataset.i18n);
  }
  // Floating directions text
  const floatText = $('floatingDirectionsText');
  if (floatText) floatText.textContent = t('floatingDirections');

  // Delivery areas in contacts
  renderDeliveryAreas();

  // FAQ
  renderFAQ();

  // Footer
  const footer = document.querySelector('.contacts-footer p');
  if (footer) footer.textContent = t('contactsFooter');
  const footerSeo = document.querySelector('.footer-seo');
  if (footerSeo) footerSeo.textContent = t('footerSeo');

  // Booking sheet headers
  const pricingTitle = document.querySelector('.sheet-pricing-title');
  if (pricingTitle) pricingTitle.textContent = t('sheetTariffs');
  const ths = document.querySelectorAll('.sheet-price-table th');
  const thKeys = ['sheetDays12', 'sheetDays36', 'sheetDays719', 'sheetDays2030'];
  ths.forEach((el, i) => { if (thKeys[i]) el.textContent = t(thKeys[i]); });
  const calcLabel = document.querySelector('.sheet-calc-label');
  if (calcLabel) calcLabel.innerHTML = `${t('sheetRentalDays')} <strong id="sheetDays">${sheetDays}</strong>`;
  const totalLabel = document.querySelector('.sheet-total');
  if (totalLabel && sheetBike) {
    updateSheetCalc();
  }

  // Update messenger button texts with SVG icons
  const tgSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';
  const waSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  if (sheetWa) sheetWa.innerHTML = waSvg + ' ' + t('ctaWhatsapp');
  if (sheetTg) sheetTg.innerHTML = tgSvg + ' ' + t('ctaTelegram');

  // Re-render dynamic content
  renderBikes();
  renderPopular();
  renderPlaces();
  updateRoute();
}

function renderDeliveryAreas() {
  const grid = document.getElementById('dlvGridContacts');
  if (!grid) return;
  // Split delivery zones into free and paid
  const freeZones = T.dlvAreas.filter(a => a.color === 'green');
  const paidZones = T.dlvAreas.filter(a => a.color !== 'green');
  let zonesHtml = '';
  if (freeZones.length) {
    zonesHtml += `<div class="delivery-zone-group"><div class="zone-label zone-free">${t('deliveryFree')}</div>`;
    zonesHtml += freeZones.map(a => `<div class="dlv-card"><div class="dlv-name">${a.name[lang] || a.name.en}</div><div class="dlv-cond dlv-${a.color}">${a.cond[lang] || a.cond.en}</div></div>`).join('');
    zonesHtml += `</div>`;
  }
  if (paidZones.length) {
    zonesHtml += `<div class="delivery-zone-group"><div class="zone-label zone-paid">${t('deliveryPaid')}</div>`;
    zonesHtml += paidZones.map(a => `<div class="dlv-card"><div class="dlv-name">${a.name[lang] || a.name.en}</div><div class="dlv-cond dlv-${a.color}">${a.cond[lang] || a.cond.en}</div></div>`).join('');
    zonesHtml += `</div>`;
  }
  grid.innerHTML = zonesHtml;
  const titles = document.querySelectorAll('.contacts-page .section-title');
  if (titles[0]) titles[0].textContent = t('deliveryAreasTitle');
  if (titles[1]) titles[1].textContent = t('faqTitle');
}

function renderFAQ() {
  const faqContainer = document.querySelector('.contacts-page .section:last-of-type');
  if (!faqContainer) return;
  const faqItems = T.faq[lang] || T.faq.en;
  // Keep the title, replace items
  const title = faqContainer.querySelector('.section-title');
  faqContainer.innerHTML = '';
  if (title) {
    title.textContent = t('faqTitle');
    faqContainer.appendChild(title);
  } else {
    const h3 = document.createElement('h3');
    h3.className = 'section-title';
    h3.textContent = t('faqTitle');
    faqContainer.appendChild(h3);
  }
  faqItems.forEach(item => {
    const details = document.createElement('details');
    details.className = 'faq-item';
    details.innerHTML = `<summary>${item.q}</summary><p>${item.a}</p>`;
    faqContainer.appendChild(details);
  });
}

// ══════════════════════════════════════════════
// Tab switching
// ══════════════════════════════════════════════
function closeAllModals() {
  if (bookingSheet.classList.contains('open')) closeBookingSheet();
  closeInsSheet(insBasicSheet, insBasicOverlay);
  closeInsSheet(insPlusSheet, insPlusOverlay);
  if (lbOverlay.classList.contains('open')) closeLightbox();
  // placeSheet, sharePopover, riderTest are defined later but hoisted/initialized before any click
  const ps = $('placeSheet');
  if (ps && ps.classList.contains('open')) closePlaceSheet();
  const sp = $('rsSharePop');
  if (sp && sp.classList.contains('open')) closeSharePopover();
  const bp = $('bikePickerOverlay');
  if (bp && bp.classList.contains('active')) closeBikePicker();
  const rt = $('riderTestOverlay');
  if (rt && rt.classList.contains('active')) closeRiderTest();
  const pv = $('privacySheet');
  if (pv && pv.classList.contains('open')) closeInsSheet(pv, $('privacyOverlay'));
}

function switchTab(tab) {
  // Close any open modals/sheets when switching tabs
  closeAllModals();

  // "guide" tab opens micro-menu instead of switching page
  if (tab === 'guide') {
    openGuideMenu();
    return;
  }
  currentTab = tab;
  pages.forEach(p => p.classList.remove('page--active'));
  const target = $(`page-${tab}`);
  if (target) target.classList.add('page--active');
  tabs.forEach(t => {
    t.classList.toggle('tab--active', t.dataset.tab === tab);
  });

}

tabs.forEach(t => {
  t.addEventListener('click', () => switchTab(t.dataset.tab));
});

// Logo → home
document.querySelectorAll('.logo').forEach(el => el.addEventListener('click', () => { closeAllModals(); switchTab('home'); }));

// ══════════════════════════════════════════════
// Guide Micro-Menu
// ══════════════════════════════════════════════
const guideMenuOverlay = $('guideMenuOverlay');
const guideMicroMenu = $('guideMicroMenu');

function openGuideMenu() {
  guideMenuOverlay.classList.add('active');
  guideMicroMenu.classList.add('open');
}

function closeGuideMenu() {
  guideMenuOverlay.classList.remove('active');
  guideMicroMenu.classList.remove('open');
}

guideMenuOverlay.addEventListener('click', closeGuideMenu);

$('menuRoutes').addEventListener('click', () => {
  closeGuideMenu();
  // Switch to routes page
  currentTab = 'routes';
  pages.forEach(p => p.classList.remove('page--active'));
  const target = $('page-routes');
  if (target) target.classList.add('page--active');
  tabs.forEach(t => {
    t.classList.toggle('tab--active', t.dataset.tab === 'guide');
  });
  // Auto-open sheet to half so content is immediately visible
  setTimeout(() => setSheetState('half'), 50);
  dismissRsHint();
});

$('menuRiderTest').addEventListener('click', () => {
  closeGuideMenu();
  openRiderTest();
});

document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', () => switchTab(el.dataset.goto));
});

// ══════════════════════════════════════════════
// Routes Map — Bottom Sheet (3 states)
// ══════════════════════════════════════════════
let rsState = 'collapsed'; // collapsed | half | expanded
let rsTab = 'places';

function setSheetState(state) {
  rsState = state;
  routeSheet.classList.remove('rs-collapsed', 'rs-half', 'rs-expanded');
  routeSheet.classList.add('rs-' + state);
}

function dismissRsHint() {
  const hint = $('rsHint');
  if (hint) hint.classList.add('hidden');
  sessionStorage.setItem('tg_hint_shown', '1');
}

function toggleSheet() {
  dismissRsHint();
  if (rsState === 'collapsed') setSheetState('half');
  else if (rsState === 'half') setSheetState('expanded');
  else setSheetState('collapsed');
}

// Handle drag (touch + mouse for desktop support)
{
  let startY = 0, startTranslate = 0, isDragging = false;
  function getTranslateY() {
    const style = window.getComputedStyle(routeSheet);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m42;
  }

  // Unified helpers that extract clientY from touch or mouse events
  function getClientY(e) {
    if (e.touches) return e.touches[0].clientY;
    return e.clientY;
  }
  function getEndClientY(e) {
    if (e.changedTouches) return e.changedTouches[0].clientY;
    return e.clientY;
  }

  function onDragStart(e) {
    if (e.touches && e.touches.length !== 1) return;
    isDragging = true;
    startY = getClientY(e);
    startTranslate = getTranslateY();
    routeSheet.classList.add('sheet-dragging');
  }
  function onDragMove(e) {
    if (!isDragging) return;
    const dy = getClientY(e) - startY;
    const h = routeSheet.offsetHeight;
    const newY = Math.max(0, Math.min(h - 40, startTranslate + dy));
    routeSheet.style.transform = 'translateY(' + newY + 'px)';
    e.preventDefault();
  }
  function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    routeSheet.classList.remove('sheet-dragging');
    routeSheet.style.transform = '';
    const dy = getEndClientY(e) - startY;
    const threshold = 60;
    if (dy < -threshold) {
      if (rsState === 'collapsed') setSheetState('half');
      else if (rsState === 'half') setSheetState('expanded');
    } else if (dy > threshold) {
      if (rsState === 'expanded') setSheetState('half');
      else if (rsState === 'half') setSheetState('collapsed');
    }
  }

  // Touch events
  rsHandle.addEventListener('touchstart', onDragStart, { passive: true });
  rsTabs.addEventListener('touchstart', onDragStart, { passive: true });
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd, { passive: true });

  // Mouse events for desktop
  rsHandle.addEventListener('mousedown', (e) => { e.preventDefault(); onDragStart(e); });
  rsTabs.addEventListener('mousedown', (e) => { e.preventDefault(); onDragStart(e); });
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);

  rsHandle.addEventListener('click', toggleSheet);

  // Pull-down from content when scrolled to top
  rsContent.addEventListener('touchstart', (e) => {
    if (rsContent.scrollTop > 0 || rsState === 'collapsed') return;
    const touchY = e.touches[0].clientY;
    let moved = false;
    const moveH = (ev) => {
      const dy = ev.touches[0].clientY - touchY;
      if (!moved && dy > 10) { moved = true; onDragStart(e); }
      if (moved) onDragMove(ev);
    };
    const endH = (ev) => {
      document.removeEventListener('touchmove', moveH);
      document.removeEventListener('touchend', endH);
      if (moved) onDragEnd(ev);
    };
    document.addEventListener('touchmove', moveH, { passive: false });
    document.addEventListener('touchend', endH, { passive: true });
  }, { passive: true });

  // Mouse pull-down from content when scrolled to top (desktop)
  rsContent.addEventListener('mousedown', (e) => {
    if (rsContent.scrollTop > 0 || rsState === 'collapsed') return;
    const mouseY = e.clientY;
    let moved = false;
    const moveH = (ev) => {
      const dy = ev.clientY - mouseY;
      if (!moved && dy > 10) { moved = true; onDragStart(e); }
      if (moved) onDragMove(ev);
    };
    const endH = (ev) => {
      document.removeEventListener('mousemove', moveH);
      document.removeEventListener('mouseup', endH);
      if (moved) onDragEnd(ev);
    };
    document.addEventListener('mousemove', moveH);
    document.addEventListener('mouseup', endH);
  });
}

// Sheet tabs — auto-resize: Route→full, Places→half
rsTabs.addEventListener('click', e => {
  const tab = e.target.closest('.rs-tab');
  if (!tab) return;
  rsTab = tab.dataset.rsTab;
  rsTabs.querySelectorAll('.rs-tab').forEach(t => t.classList.toggle('active', t === tab));
  rsPanelPlaces.classList.toggle('active', rsTab === 'places');
  rsPanelRoute.classList.toggle('active', rsTab === 'route');
  if (rsTab === 'route') {
    setSheetState('expanded');
  } else {
    if (rsState === 'collapsed' || rsState === 'expanded') setSheetState('half');
  }
});

// ══════════════════════════════════════════════
// Emoji map for bike categories
// ══════════════════════════════════════════════
const BIKE_EMOJI = { scooter: '\u{1F6F5}', maxi: '\u{1F3CD}', moto: '\u{1F3CD}', car: '\u{1F697}' };

// ══════════════════════════════════════════════
// SVG bike silhouettes (replaces emojis in cards)
// ══════════════════════════════════════════════
function getBikeSvg(category, width = 60, height = 43) {
  const w = width;
  const h = height;
  if (category === 'scooter') {
    return `<svg viewBox="0 0 80 55" fill="none" width="${w}" height="${h}">
  <circle cx="18" cy="42" r="10" stroke="#4338CA" stroke-width="2.5" fill="#EEF2FF"/>
  <circle cx="18" cy="42" r="4" fill="#4338CA"/>
  <circle cx="62" cy="42" r="10" stroke="#4338CA" stroke-width="2.5" fill="#EEF2FF"/>
  <circle cx="62" cy="42" r="4" fill="#4338CA"/>
  <path d="M28 42 L28 30 Q30 22 38 20 L52 20 Q60 20 65 28 L68 35 L65 38 L28 42Z" fill="#4338CA" opacity=".15" stroke="#4338CA" stroke-width="2"/>
  <path d="M28 32 L50 32 L55 38 L28 38Z" fill="#4338CA" opacity=".3"/>
  <rect x="36" y="12" width="8" height="8" rx="2" fill="#4338CA" opacity=".25"/>
</svg>`;
  }
  if (category === 'maxi') {
    return `<svg viewBox="0 0 85 55" fill="none" width="${w}" height="${h}">
  <circle cx="16" cy="42" r="11" stroke="#4338CA" stroke-width="2.5" fill="#EEF2FF"/>
  <circle cx="16" cy="42" r="4.5" fill="#4338CA"/>
  <circle cx="69" cy="42" r="11" stroke="#4338CA" stroke-width="2.5" fill="#EEF2FF"/>
  <circle cx="69" cy="42" r="4.5" fill="#4338CA"/>
  <path d="M27 42 L27 26 Q30 16 42 14 L58 14 Q68 16 74 28 L76 36 L72 40 L27 42Z" fill="#4338CA" opacity=".15" stroke="#4338CA" stroke-width="2.2"/>
  <path d="M29 28 L58 28 L62 38 L29 38Z" fill="#4338CA" opacity=".3"/>
  <rect x="40" y="5" width="10" height="9" rx="2" fill="#4338CA" opacity=".3"/>
</svg>`;
  }
  // moto (default)
  return `<svg viewBox="0 0 90 55" fill="none" width="${w}" height="${h}">
  <circle cx="15" cy="42" r="11" stroke="#4338CA" stroke-width="2.5" fill="#EEF2FF"/>
  <circle cx="15" cy="42" r="4.5" fill="#4338CA"/>
  <circle cx="75" cy="42" r="11" stroke="#4338CA" stroke-width="2.5" fill="#EEF2FF"/>
  <circle cx="75" cy="42" r="4.5" fill="#4338CA"/>
  <path d="M26 40 L35 20 L55 18 L70 30 L80 38 L75 40Z" fill="#4338CA" opacity=".15" stroke="#4338CA" stroke-width="2"/>
  <path d="M35 20 L40 12 L50 12 L55 18" fill="#4338CA" opacity=".15" stroke="#4338CA" stroke-width="1.5"/>
  <path d="M38 38 L64 38 L68 34 L42 34Z" fill="#4338CA" opacity=".3"/>
</svg>`;
}

// ══════════════════════════════════════════════
// Badge helper for bike cards
// ══════════════════════════════════════════════
function getBikeBadge(bike) {
  if (bike.popular && bike.budgetGroup === 'comfort') {
    return '<span class="comfort-badge">\u{2B50} \u041A\u043E\u043C\u0444\u043E\u0440\u0442</span>';
  }
  if (bike.popular) {
    return '<span class="pop-badge">\u{1F525} \u0425\u0438\u0442</span>';
  }
  if (bike.tags && (bike.tags.includes('light') || bike.tags.includes('girl'))) {
    return '<span class="newbie-badge">\u{1F44D} \u041D\u043E\u0432\u0438\u0447\u043A\u0430\u043C</span>';
  }
  return '';
}

// ══════════════════════════════════════════════
// Render bike catalog
// ══════════════════════════════════════════════
function renderBikes() {
  const filtered = bikeFilter === 'all'
    ? BIKES
    : BIKES.filter(b => b.budgetGroup === bikeFilter);

  // Group by category for section separators
  const grouped = {};
  filtered.forEach(b => {
    if (!grouped[b.category]) grouped[b.category] = [];
    grouped[b.category].push(b);
  });

  let html = '';
  const catOrder = ['scooter', 'maxi', 'moto'];
  catOrder.forEach(cat => {
    const bikes = grouped[cat];
    if (!bikes || bikes.length === 0) return;
    const catIcons = {
      scooter: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>',
      maxi: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
      moto: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
    };
    html += `<div class="category-section">
      <div class="category-title">${catIcons[cat] || ''}${bikeCatName(cat)}</div>
      <div class="bikes-grid-2">`;
    bikes.forEach(b => {
      const whyText = (b.why && (b.why[lang] || b.why.en)) || '';
      const hint = whyText.split('.')[0].trim();
      const shortHint = hint.length > 45 ? hint.slice(0, 42) + '...' : hint;
      const badge = getBikeBadge(b);
      html += `
      <div class="bike-card-v" data-bike="${b.id}">
        ${badge}
        <div class="bike-img-v" role="img" aria-label="${b.name} аренда Пхукет">${getBikeSvg(b.category)}</div>
        <div class="bike-body">
          <div class="bike-name-v">${b.name}</div>
          ${shortHint ? `<div class="bike-hint-v">${shortHint}</div>` : ''}
          <div class="bike-cc">${b.cc} cc</div>
          <div class="bike-footer">
            <span class="bike-price-v">${t('priceFrom')} ${getPricePerDay(b, 7)} \u0E3F</span>
            <button class="btn-take">${t('bikeBtnRent')}</button>
          </div>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  });

  bikeGrid.innerHTML = html;

  bikeGrid.querySelectorAll('.bike-card-v').forEach(card => {
    card.addEventListener('click', () => {
      const bike = BIKES.find(b => b.id === card.dataset.bike);
      if (bike) openBookingSheet(bike);
    });
  });
}

bikeFiltersEl.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip, .chip');
  if (!chip) return;
  bikeFilter = chip.dataset.cat;
  bikeFiltersEl.querySelectorAll('.filter-chip, .chip').forEach(c => {
    const isActive = c.dataset.cat === bikeFilter;
    c.classList.toggle('filter-chip--active', isActive);
    c.classList.toggle('active', isActive);
  });
  renderBikes();
});

// ══════════════════════════════════════════════
// Popular bikes combined block
// ══════════════════════════════════════════════
let popGroup = 'economy';
let popDays = 7;

function getPopDiscount(bike, days) {
  const season = getCurrentSeason();
  const base = bike.prices[season][0];
  const cur = getPricePerDay(bike, days);
  return base > cur ? Math.round((1 - cur / base) * 100) : 0;
}

function renderPopular() {
  const scroll = $('popScroll');
  if (!scroll) return;
  const days = popDays;
  const filtered = BIKES.filter(b => b.budgetGroup === popGroup);

  // Deal bar: cheapest bike at 30 days
  const cheapest30 = filtered.reduce((best, b) => {
    const p = getPricePerDay(b, 30);
    return (!best || p < best.price) ? { bike: b, price: p } : best;
  }, null);
  const dealBarEl = $('popDealBar');
  if (dealBarEl && cheapest30) {
    dealBarEl.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1px;">
        <span style="font-size:10px;font-weight:600;color:var(--green);opacity:.8;">${t('bestDeal')}</span>
        <span style="font-size:12px;font-weight:700;color:var(--green);">${cheapest30.bike.name.replace(/^Honda\s+|^Yamaha\s+|\s*\d+$/g, '')} \xB7 30 ${t('popDays')}</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:2px;flex-shrink:0;">
        <span style="font-size:22px;font-weight:900;color:var(--green);letter-spacing:-.5px;">${cheapest30.price}</span>
        <span style="font-size:13px;font-weight:700;color:var(--green);">\u0E3F</span>
        <span style="font-size:10px;color:var(--text2);">/${t('perDay')}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.5" style="margin-left:4px;flex-shrink:0;align-self:center;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>`;
    dealBarEl.classList.remove('hidden');
    dealBarEl.onclick = () => {
      switchTab('bikes');
      openBookingSheet(cheapest30.bike);
    };
  } else if (dealBarEl) {
    dealBarEl.classList.add('hidden');
  }

  scroll.innerHTML = filtered.map(b => {
    const season = getCurrentSeason();
    const base = b.prices[season][0];
    const cur = getPricePerDay(b, days);
    const total = getTotalPrice(b, days);
    const hasDiscount = cur < base;
    const badge = getBikeBadge(b);
    const whyText = (b.why && (b.why[lang] || b.why.en)) || '';
    const hint = whyText.split('.')[0].trim();
    const shortHint = hint.length > 35 ? hint.slice(0, 32) + '...' : hint;
    return `
    <div class="bike-card-h" data-bike="${b.id}">
      ${badge}
      <div class="bike-img cat-${b.category}">${getBikeSvg(b.category)}</div>
      <div class="bike-info">
        <div class="bike-name">${b.name}</div>
        ${shortHint ? `<div class="bike-hint">${shortHint}</div>` : ''}
        <div class="price-row">
          <div class="price-now">${cur} \u0E3F</div>
          ${hasDiscount ? `<div class="price-was">${base} \u0E3F</div>` : ''}
          <div class="price-per">/${t('popDays')}</div>
        </div>
      </div>
    </div>`;
  }).join('');

  // Update existing "View all" button text
  const viewAllBtn = $('popViewAll');
  if (viewAllBtn) {
    viewAllBtn.textContent = t('popViewAll');
  }

  scroll.querySelectorAll('.bike-card-h').forEach(card => {
    card.addEventListener('click', () => {
      const bike = BIKES.find(b => b.id === card.dataset.bike);
      if (bike) {
        switchTab('bikes');
        openBookingSheet(bike);
      }
    });
  });
}

function updatePopBlock() {
  const days = popDays;

  // Min total for group (keep for deal bar calculations)
  const filtered = BIKES.filter(b => b.budgetGroup === popGroup);
  const minTotal = filtered.reduce((m, b) => { const p = getTotalPrice(b, days); return p < m ? p : m; }, Infinity);
  const totalLabel = $('popTotalLabel');
  if (totalLabel) totalLabel.textContent = t('popFrom') + ' ' + minTotal.toLocaleString() + ' \u0E3F';

  // Title & links
  const titleEl = $('popTitle');
  if (titleEl) titleEl.textContent = t('popTitle');
  const allLink = $('popAllLink');
  if (allLink) allLink.textContent = t('popAll');
  const viewAll = $('popViewAll');
  if (viewAll) viewAll.textContent = t('popViewAll');

  // Chip labels (group chips: Эконом/Комфорт/Премиум)
  const chipLabels = { economy: 'popEconomy', comfort: 'popComfort', premium: 'popPremium' };
  document.querySelectorAll('[data-pop-group]').forEach(el => {
    const g = el.dataset.popGroup;
    const spanEl = el.querySelector('span');
    if (spanEl) spanEl.textContent = t(chipLabels[g]);
    el.classList.toggle('pop-chip--active', g === popGroup);
    el.classList.toggle('active', g === popGroup);
  });

  renderPopular();
}

// Pop chip clicks
document.querySelectorAll('[data-pop-group]').forEach(el => {
  el.addEventListener('click', () => {
    popGroup = el.dataset.popGroup;
    updatePopBlock();
  });
});

// Pop slider (kept for backward compat; slider removed from popular section in v3.8)
const popSlider = $('popSlider');
if (popSlider) popSlider.addEventListener('input', () => {
  popDays = parseInt(popSlider.value);
  updatePopBlock();
});

// "All →" link
$('popAllLink').addEventListener('click', () => switchTab('bikes'));

// "View all bikes →" button — switch to bikes with group filter
$('popViewAll').addEventListener('click', () => {
  // Set bike filter to match the group's category
  const catMap = { economy: 'scooter', comfort: 'maxi', premium: 'maxi' };
  bikeFilter = 'all';
  switchTab('bikes');
});

// ══════════════════════════════════════════════
// Booking Sheet
// ══════════════════════════════════════════════
let lbSlides = [];
let lbIndex = 0;
let lbStartX = 0;
let lbDeltaX = 0;

function openBookingSheet(bike) {
  sheetBike = bike;
  sheetDays = 8;
  sheetInsurancePlus = false;
  prevSheetTotal = 0; // reset so first render doesn't animate

  const catClass = `cat-${bike.category}`;
  sheetBikeImg.className = `sheet-bike-img ${catClass}`;
  sheetBikeImg.innerHTML = getBikeSvg(bike.category, 80, 58);

  // Build slides for lightbox (1 SVG slide per bike for now)
  lbSlides = [{ svg: getBikeSvg(bike.category, 120, 86), catClass }];

  // Render dots under thumbnail (only if >1 slide)
  sheetImgDots.innerHTML = lbSlides.length > 1
    ? lbSlides.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('')
    : '';

  sheetBikeName.textContent = bike.name;
  sheetBikeCc.textContent = `${bike.cc} cc — ${bikeCatName(bike.category)}`;

  // Feature tags from featureFlags + classic features
  const featureTags = [];
  if (bike.featureFlags) {
    if (bike.featureFlags.abs) featureTags.push('ABS');
    if (bike.featureFlags.keyless) featureTags.push('Keyless');
    if (bike.featureFlags.usb) featureTags.push('USB');
  }
  bike.features.forEach(f => {
    const translated = trFeature(f);
    if (!featureTags.includes(translated)) featureTags.push(translated);
  });
  // Feature tags with icons
  const featureIcons = {
    'ABS': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41"/></svg>',
    'Keyless': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    'USB': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v11"/><path d="M8 8l4-4 4 4"/><path d="M8 13h8"/><rect x="9" y="13" width="2" height="3" rx="1"/><rect x="13" y="13" width="2" height="3" rx="1"/><path d="M10 16v2a1 1 0 001 1h2a1 1 0 001-1v-2"/></svg>',
  };
  sheetFeatures.innerHTML = featureTags.map(f => {
    const icon = featureIcons[f] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>';
    return `<span class="sheet-feature-tag feature-tag">${icon} ${f}</span>`;
  }).join('');

  sheetDaySlider.value = sheetDays;

  // Update insurance franchise
  const franchise = getInsuranceFranchiseLocal(bike);
  const franchiseEl = $('insPlusFranchise');
  if (franchiseEl) franchiseEl.textContent = franchise ? `Франшиза ${franchise.toLocaleString()} ฿` : '';
  // Hide insurance+ row for motorcycles; reset active state
  const insPlusRow = $('insPlusRow');
  const insTierInit = getInsuranceTier(bike);
  if (insPlusRow) {
    insTierInit === null ? insPlusRow.classList.add('hidden') : insPlusRow.classList.remove('hidden');
    insPlusRow.classList.remove('active');
    const insBlock = insPlusRow.closest('.sheet-insurance-block');
    if (insBlock) insBlock.classList.remove('ins-active');
  }

  updateSheetCalc();

  bookingSheet.classList.add('open');
  sheetOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingSheet() {
  bookingSheet.classList.remove('open');
  sheetOverlay.classList.remove('active');
  document.body.style.overflow = '';
  sheetBike = null;
}

// ══════════════════════════════════════════════
// Bike Lightbox
// ══════════════════════════════════════════════
function openLightbox(startIndex) {
  lbIndex = startIndex || 0;
  lbTrack.innerHTML = lbSlides.map(s =>
    `<div class="lb-slide"><div class="lb-slide-img ${s.catClass}">${s.svg || s.emoji || ''}</div></div>`
  ).join('');
  lbDots.innerHTML = lbSlides.map((_, i) =>
    `<span class="dot${i === lbIndex ? ' active' : ''}"></span>`
  ).join('');
  updateLb();
  lbOverlay.classList.add('open');
}

function closeLightbox() {
  lbOverlay.classList.remove('open');
}

function updateLb() {
  const slides = lbTrack.querySelectorAll('.lb-slide');
  slides.forEach((s, i) => { s.style.transform = `translateX(${(i - lbIndex) * 100}%)`; });
  lbCounter.textContent = `${lbIndex + 1} / ${lbSlides.length}`;
  lbDots.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === lbIndex));
  // Also update sheet thumbnail dots
  sheetImgDots.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === lbIndex));
}

// Lightbox click handlers
sheetImgWrap.addEventListener('click', () => { if (lbSlides.length) openLightbox(0); });
$('lbClose').addEventListener('click', closeLightbox);
lbOverlay.addEventListener('click', (e) => { if (e.target === lbOverlay) closeLightbox(); });

// Lightbox touch swipe
lbTrack.addEventListener('touchstart', (e) => { lbStartX = e.touches[0].clientX; lbDeltaX = 0; });
lbTrack.addEventListener('touchmove', (e) => { lbDeltaX = e.touches[0].clientX - lbStartX; });
lbTrack.addEventListener('touchend', () => {
  if (Math.abs(lbDeltaX) > 40) {
    if (lbDeltaX < 0 && lbIndex < lbSlides.length - 1) lbIndex++;
    else if (lbDeltaX > 0 && lbIndex > 0) lbIndex--;
    updateLb();
  }
  lbDeltaX = 0;
});

function getPerDay(bike, days) {
  return getPricePerDay(bike, days);
}

function getTierName(days) {
  if (days >= 20) return 'day14';
  if (days >= 7) return 'day7';
  if (days >= 3) return 'day3';
  return 'day1';
}

// ── Insurance pricing ──
function getInsuranceTier(bike) {
  if (bike.category === 'moto') return null; // no insurance+ for motorcycles
  if (MAXI_BIG_IDS.includes(bike.id)) return 'maxi_big';
  return 'scooter'; // scooters + regular maxi
}

function getInsurancePlusCost(bike, days) {
  const tier = getInsuranceTier(bike);
  if (!tier) return 0;
  if (tier === 'maxi_big') {
    if (days <= 10) return 1000;
    if (days <= 20) return 2000;
    return 3000;
  }
  // scooter tier (scooters + regular maxi)
  if (days <= 10) return 500;
  if (days <= 20) return 1000;
  return 1500;
}

function getInsuranceFranchiseLocal(bike) {
  // Prefer imported getInsuranceFranchise if available, fallback to local logic
  try { return getInsuranceFranchiseUtil(bike); } catch(e) {}
  const tier = getInsuranceTier(bike);
  if (!tier) return 0;
  return tier === 'maxi_big' ? 6000 : 3000;
}

function updateSheetCalc() {
  if (!sheetBike) return;
  const daysEl = $('sheetDays');
  if (daysEl) daysEl.textContent = sheetDays;

  // Days word (дней/день)
  const daysWordEl = $('sheetDaysWord');
  if (daysWordEl) daysWordEl.textContent = t('popDays');

  const perDay = getPerDay(sheetBike, sheetDays);
  const rentalTotal = getTotalPrice(sheetBike, sheetDays);
  let total = rentalTotal;

  // Insurance+ cost
  const insTier = getInsuranceTier(sheetBike);
  const insCost = getInsurancePlusCost(sheetBike, sheetDays);
  const insPerDay = sheetDays > 0 ? Math.round(insCost / sheetDays) : 0;

  // Update insurance+ per-day price label in the box
  if (insTier !== null) {
    const costLabel = $('insPlusCostLabel');
    if (costLabel) costLabel.textContent = `${insPerDay.toLocaleString()} ฿/д`;
  }

  if (sheetInsurancePlus && insTier) {
    total += insCost;
  }

  // Discount calculations
  const basePerDay = getPerDay(sheetBike, 1); // tier 0 (1-2 days)
  const baseTotal = basePerDay * sheetDays;
  const savings = baseTotal - rentalTotal;
  const discountPct = baseTotal > 0 ? Math.round((savings / baseTotal) * 100) : 0;

  // Discount badge
  const discountBadge = $('sheetDiscountBadge');
  if (discountBadge) {
    if (discountPct > 0) {
      discountBadge.textContent = `\u2212${discountPct}% \xB7 ${t('sheetSave')} ${savings.toLocaleString()} \u0E3F`;
      discountBadge.classList.remove('hidden');
    } else {
      discountBadge.classList.add('hidden');
    }
  }

  // Slider endpoint labels
  const minPrice = getPerDay(sheetBike, 1);
  const maxPrice = getPerDay(sheetBike, 30);
  const sliderMin = $('sheetSliderMin');
  const sliderMax = $('sheetSliderMax');
  if (sliderMin) sliderMin.textContent = `1 ${t('daysShort')} \xB7 ${minPrice} \u0E3F/${t('daysShort')}`;
  if (sliderMax) sliderMax.textContent = `30 ${t('daysShort')} \xB7 ${maxPrice} \u0E3F/${t('daysShort')}`;

  // Discount hint (next threshold)
  const discountHintEl = $('sheetDiscountHint');
  const discountHintText = $('sheetDiscountHintText');
  if (discountHintEl && discountHintText) {
    const hint = getNextDiscountHint(sheetDays, sheetBike);
    if (hint && hint.daysNeeded) {
      const moreDays = hint.daysNeeded - sheetDays;
      discountHintText.textContent = `${t('hintMore')} ${moreDays} ${t('popDays')} ${t('hintAndGet')} \u2212${hint.discountPercent}% (${hint.pricePerDay} \u0E3F/${t('perDay')})`;
      discountHintEl.classList.remove('hidden');
    } else {
      discountHintEl.classList.add('hidden');
    }
  }

  // Total breakdown — reactive lines
  const totalBreakdownEl = $('sheetBreakdown');
  if (totalBreakdownEl) {
    let html = '';
    html += `<div class="breakdown-row"><span>${t('sheetBike')} ${perDay.toLocaleString()} ฿ × ${sheetDays} ${t('popDays')}</span><span>${rentalTotal.toLocaleString()} ฿</span></div>`;
    if (sheetInsurancePlus && insTier) {
      html += `<div class="breakdown-row"><span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4338CA" stroke-width="2.2" style="vertical-align:-1px;margin-right:3px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>${t('insPlus')} ${insPerDay.toLocaleString()} ฿ × ${sheetDays} ${t('popDays')}</span><span>${insCost.toLocaleString()} ฿</span></div>`;
    }
    html += `<div class="breakdown-divider"></div>`;
    html += `<div class="breakdown-row"><span class="breakdown-total-label">${t('sheetTotal')}</span><span class="breakdown-total-value" id="sheetTotalValue">${prevSheetTotal === 0 ? total.toLocaleString() + ' ฿' : prevSheetTotal.toLocaleString() + ' ฿'}</span></div>`;
    totalBreakdownEl.innerHTML = html;

    // Animate total value: 600ms easeOutCubic
    const totalValEl = document.getElementById('sheetTotalValue');
    if (prevSheetTotal !== total && prevSheetTotal !== 0) {
      animateValue(totalValEl, prevSheetTotal, total, 600, ' ฿');
      flashClass(totalValEl, 'flash', 350);
    }
    prevSheetTotal = total;
  }

  // Saving row — only show when days > 2 and there's actual savings
  const savingRow = $('sheetSavingRow');
  if (savingRow) {
    if (sheetDays > 2 && savings > 0) {
      savingRow.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg> ${tpl('sheetSavingCompare', { amount: savings.toLocaleString() }) || `Экономишь ${savings.toLocaleString()} ฿ по сравнению с ценой 1–2 дней`}`;
      savingRow.classList.remove('hidden');
    } else {
      savingRow.classList.add('hidden');
    }
  }

  // CTA links
  const insText = sheetInsurancePlus && insTier ? ` + ${t('insPlus')}` : '';
  const dates = sheetDateStart && sheetDateEnd
    ? ` \u0441 ${formatDateField(sheetDateStart)} \u043F\u043E ${formatDateField(sheetDateEnd)}`
    : '';
  const msg = encodeURIComponent(tpl('waMsgBike', { name: sheetBike.name, days: sheetDays, total, dates }) + insText);
  const sheetWaEl = $('sheetWa');
  const sheetTgEl = $('sheetTg');
  if (sheetWaEl) sheetWaEl.href = `https://wa.me/66822545737?text=${msg}`;
  if (sheetTgEl) sheetTgEl.href = `https://t.me/ThaiGoSale1?text=${msg}`;
}

function calcDaysBetween(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff);
}

function formatDateField(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function addDaysToDate(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

let sliderDebounceTimer = null;
sheetDaySlider.addEventListener('input', () => {
  sheetDays = parseInt(sheetDaySlider.value);
  if (sheetDateStart && sheetDateStartEl.value) {
    sheetDateEnd = addDaysToDate(sheetDateStart, sheetDays);
    sheetDateEndEl.value = sheetDateEnd;
  }
  clearTimeout(sliderDebounceTimer);
  sliderDebounceTimer = setTimeout(updateSheetCalc, 50);
});

// DatePicker sync
sheetDateStartEl.addEventListener('change', () => {
  sheetDateStart = sheetDateStartEl.value;
  if (!sheetDateEnd || sheetDateEnd < sheetDateStart) {
    sheetDateEnd = addDaysToDate(sheetDateStart, sheetDays);
    sheetDateEndEl.value = sheetDateEnd;
  } else {
    sheetDays = Math.min(30, Math.max(1, calcDaysBetween(sheetDateStart, sheetDateEnd)));
    sheetDaySlider.value = sheetDays;
  }
  updateSheetCalc();
});

sheetDateEndEl.addEventListener('change', () => {
  sheetDateEnd = sheetDateEndEl.value;
  if (sheetDateStart && sheetDateEnd >= sheetDateStart) {
    sheetDays = Math.min(30, Math.max(1, calcDaysBetween(sheetDateStart, sheetDateEnd)));
    sheetDaySlider.value = sheetDays;
  }
  updateSheetCalc();
});

// Insurance+ row click — toggle insurance via toggle switch
const insPlusRowEl = $('insPlusRow');
if (insPlusRowEl) {
  insPlusRowEl.addEventListener('click', (e) => {
    // Don't toggle when clicking info icon
    if (e.target.closest('.ins-plus-info-btn')) return;
    sheetInsurancePlus = !sheetInsurancePlus;
    insPlusRowEl.classList.toggle('active', sheetInsurancePlus);
    // Toggle container border color
    const block = insPlusRowEl.closest('.sheet-insurance-block');
    if (block) block.classList.toggle('ins-active', sheetInsurancePlus);
    pulseToggle(insPlusRowEl);
    updateSheetCalc();
  });
}

// Info icon handlers — open per-chip sheet
function openInsSheet(sheet, overlay) {
  sheet.classList.add('open');
  overlay.classList.add('active');
}

function closeInsSheet(sheet, overlay) {
  sheet.classList.remove('open');
  overlay.classList.remove('active');
}

if (insBasicInfo) insBasicInfo.addEventListener('click', (e) => {
  e.stopPropagation();
  openInsSheet(insBasicSheet, insBasicOverlay);
});

if (insPlusInfo) insPlusInfo.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!sheetBike) return;
  const franchise = getInsuranceFranchiseLocal(sheetBike);
  const cost = getInsurancePlusCost(sheetBike, sheetDays);
  if (insPlusDescText) insPlusDescText.textContent = tpl('insPlusDesc', { franchise: franchise.toLocaleString() });
  const costPerDay = Math.ceil(cost / sheetDays);
  if (insPlusPriceInfo) insPlusPriceInfo.textContent = `${t('insPlusPriceLabel')} ${costPerDay} ${t('bpInsPerDay')}`;
  openInsSheet(insPlusSheet, insPlusOverlay);
});

if (insBasicClose) insBasicClose.addEventListener('click', () => closeInsSheet(insBasicSheet, insBasicOverlay));
if (insPlusClose) insPlusClose.addEventListener('click', () => closeInsSheet(insPlusSheet, insPlusOverlay));
if (insBasicOverlay) insBasicOverlay.addEventListener('click', () => closeInsSheet(insBasicSheet, insBasicOverlay));
if (insPlusOverlay) insPlusOverlay.addEventListener('click', () => closeInsSheet(insPlusSheet, insPlusOverlay));

// Drag-dismiss + tap-on-handle for info sheets
setupDragDismiss(insBasicSheet, () => closeInsSheet(insBasicSheet, insBasicOverlay));
setupDragDismiss(insPlusSheet, () => closeInsSheet(insPlusSheet, insPlusOverlay));

// Privacy policy sheet
const privacySheet = $('privacySheet');
const privacyOverlay = $('privacyOverlay');
const privacyLink = $('privacyLink');
const privacyClose = $('privacyClose');

function openPrivacy() { openInsSheet(privacySheet, privacyOverlay); }
function closePrivacy() { closeInsSheet(privacySheet, privacyOverlay); }

if (privacyLink) privacyLink.addEventListener('click', openPrivacy);
if (privacyClose) privacyClose.addEventListener('click', () => { closePrivacy(); switchTab('home'); });
if (privacyOverlay) privacyOverlay.addEventListener('click', closePrivacy);
setupDragDismiss(privacySheet, closePrivacy);

function setupDragDismiss(sheetEl, closeFn) {
  const handle = sheetEl.querySelector('.sheet-handle') || sheetEl.querySelector('.ins-handle');
  if (!handle) return;
  let startY = 0;
  let currentY = 0;
  let dragging = false;
  let moved = false;

  function onStart(y) {
    startY = y;
    currentY = y;
    dragging = true;
    moved = false;
    sheetEl.style.transition = 'none';
  }
  function onMove(y) {
    if (!dragging) return;
    currentY = y;
    moved = true;
    const dy = Math.max(0, currentY - startY);
    sheetEl.style.transform = `translateX(-50%) translateY(${dy}px)`;
  }
  function onEnd() {
    if (!dragging) return;
    dragging = false;
    sheetEl.style.transition = '';
    const dy = currentY - startY;
    if (dy > 80) {
      sheetEl.style.transform = '';
      closeFn();
    } else if (handle.classList.contains('ins-handle') && (!moved || dy < 5)) {
      sheetEl.style.transform = '';
      closeFn();
    } else {
      sheetEl.style.transform = '';
      if (sheetEl.classList.contains('open')) {
        sheetEl.style.transform = 'translateX(-50%) translateY(0)';
      }
    }
  }

  // Touch events
  handle.addEventListener('touchstart', e => onStart(e.touches[0].clientY), { passive: true });
  handle.addEventListener('touchmove', e => onMove(e.touches[0].clientY), { passive: true });
  handle.addEventListener('touchend', onEnd, { passive: true });

  // Mouse events for desktop
  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    onStart(e.clientY);
    const moveH = ev => onMove(ev.clientY);
    const upH = () => { onEnd(); document.removeEventListener('mousemove', moveH); document.removeEventListener('mouseup', upH); };
    document.addEventListener('mousemove', moveH);
    document.addEventListener('mouseup', upH);
  });
}

setupDragDismiss(bookingSheet, closeBookingSheet);

// ══════════════════════════════════════════════
// SVG Map — coordinate conversion, island drawing, markers, pan/zoom
// ══════════════════════════════════════════════
const MAP_BOUNDS = { latMin: 7.74, latMax: 8.18, lngMin: 98.26, lngMax: 98.42 };
const SVG_W = 600, SVG_H = 1000;
let mapViewBox = { x: 0, y: 0, w: SVG_W, h: SVG_H };
let mapDragging = false;
let mapDragStart = { x: 0, y: 0, vx: 0, vy: 0 };
let pinchStartDist = 0;
let pinchStartViewBox = null;

function latLngToSvg(lat, lng) {
  return {
    x: ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) * SVG_W,
    y: ((MAP_BOUNDS.latMax - lat) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) * SVG_H
  };
}

function applyMapViewBox() {
  svgMap.setAttribute('viewBox', `${mapViewBox.x} ${mapViewBox.y} ${mapViewBox.w} ${mapViewBox.h}`);
  updateMarkerScale();
}

function updateMarkerScale() {
  const rect = svgMap.getBoundingClientRect();
  if (!rect.width) return;
  const pxPerUnit = rect.width / mapViewBox.w;
  const s = 1 / pxPerUnit;
  mapMarkers.querySelectorAll('.map-pin').forEach(m => {
    m.setAttribute('transform', `translate(${m.dataset.x},${m.dataset.y}) scale(${s.toFixed(4)})`);
  });
}

function svgMapZoomCenter(dir) {
  const factor = dir > 0 ? 0.8 : 1.25;
  const newW = mapViewBox.w * factor, newH = mapViewBox.h * factor;
  if (newW < 80 || newW > SVG_W * 2) return;
  const cx = mapViewBox.x + mapViewBox.w / 2, cy = mapViewBox.y + mapViewBox.h / 2;
  mapViewBox = { x: cx - newW / 2, y: cy - newH / 2, w: newW, h: newH };
  applyMapViewBox();
}

function svgEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

function coordsToPath(coords, closed) {
  return coords.map((c, i) => {
    const p = latLngToSvg(c[0], c[1]);
    return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1);
  }).join(' ') + (closed ? ' Z' : '');
}

// Island coastline, areas, roads data
const ISLAND_COAST = [
  [8.165,98.305],[8.160,98.295],[8.150,98.288],[8.135,98.283],[8.120,98.280],
  [8.105,98.278],[8.090,98.276],[8.075,98.274],[8.060,98.273],[8.045,98.272],
  [8.030,98.271],[8.015,98.275],[8.000,98.278],[7.985,98.275],[7.970,98.272],
  [7.955,98.275],[7.940,98.276],[7.925,98.278],[7.910,98.280],[7.895,98.285],
  [7.880,98.283],[7.865,98.280],[7.850,98.278],[7.835,98.280],[7.820,98.283],
  [7.810,98.286],[7.800,98.288],[7.790,98.290],[7.780,98.293],[7.770,98.298],
  [7.762,98.305],[7.758,98.312],[7.755,98.320],[7.758,98.330],[7.762,98.340],
  [7.770,98.345],[7.780,98.342],[7.790,98.338],[7.800,98.340],[7.810,98.345],
  [7.815,98.355],[7.820,98.365],[7.830,98.375],[7.840,98.380],[7.850,98.385],
  [7.860,98.390],[7.870,98.395],[7.880,98.400],[7.890,98.405],[7.900,98.408],
  [7.910,98.405],[7.920,98.400],[7.930,98.395],[7.940,98.390],[7.950,98.388],
  [7.960,98.392],[7.970,98.398],[7.980,98.405],[7.990,98.410],[8.000,98.412],
  [8.015,98.410],[8.030,98.405],[8.045,98.400],[8.060,98.395],[8.075,98.390],
  [8.090,98.385],[8.100,98.378],[8.110,98.370],[8.120,98.365],[8.130,98.355],
  [8.140,98.345],[8.145,98.335],[8.150,98.325],[8.155,98.315],[8.165,98.305]
];
const ROAD_MAIN = [
  [8.15,98.305],[8.10,98.300],[8.05,98.295],[8.00,98.300],[7.95,98.305],
  [7.90,98.310],[7.88,98.320],[7.86,98.340],[7.84,98.345],[7.82,98.340],
  [7.80,98.330],[7.78,98.320],[7.77,98.315]
];
const MAP_AREAS = [
  { lat: 8.14, lng: 98.295, rx: 30, ry: 22, name: 'Mai Khao' },
  { lat: 8.01, lng: 98.287, rx: 28, ry: 20, name: 'Bang Tao' },
  { lat: 7.97, lng: 98.277, rx: 22, ry: 16, name: 'Surin' },
  { lat: 7.94, lng: 98.280, rx: 24, ry: 18, name: 'Kamala' },
  { lat: 7.895, lng: 98.293, rx: 30, ry: 22, name: 'Patong', main: true },
  { lat: 7.845, lng: 98.295, rx: 26, ry: 18, name: 'Karon' },
  { lat: 7.818, lng: 98.298, rx: 22, ry: 16, name: 'Kata' },
  { lat: 7.785, lng: 98.330, rx: 25, ry: 18, name: 'Rawai' },
  { lat: 7.845, lng: 98.370, rx: 28, ry: 20, name: 'Chalong', main: true },
  { lat: 7.885, lng: 98.395, rx: 32, ry: 24, name: 'Phuket Town', main: true },
  { lat: 7.765, lng: 98.310, rx: 18, ry: 14, name: 'Promthep' }
];

function drawIslandMap() {
  const il = document.getElementById('island-layer');
  il.appendChild(svgEl('path', {
    d: coordsToPath(ISLAND_COAST, true),
    fill: 'rgba(10,60,80,0.5)', stroke: '#22cc66',
    'stroke-width': '2', 'stroke-opacity': '0.4'
  }));

  const al = document.getElementById('areas-layer');
  MAP_AREAS.forEach(a => {
    const p = latLngToSvg(a.lat, a.lng);
    al.appendChild(svgEl('ellipse', {
      cx: p.x, cy: p.y, rx: a.rx, ry: a.ry,
      fill: 'rgba(30,140,80,0.15)', stroke: 'rgba(50,200,100,0.08)', 'stroke-width': '1'
    }));
  });

  const rl = document.getElementById('roads-layer');
  rl.appendChild(svgEl('path', {
    d: coordsToPath(ROAD_MAIN, false), fill: 'none',
    stroke: '#BBFF46', 'stroke-width': '2.5', 'stroke-opacity': '0.35',
    'stroke-dasharray': '6,4', 'stroke-linecap': 'round'
  }));

  const ll = document.getElementById('labels-layer');
  MAP_AREAS.forEach(a => {
    const p = latLngToSvg(a.lat, a.lng);
    const t = svgEl('text', {
      x: p.x, y: p.y - a.ry - 5, 'text-anchor': 'middle',
      'font-family': 'Inter Tight, sans-serif',
      'font-size': a.main ? '13' : '10',
      'font-weight': a.main ? '700' : '600',
      fill: `rgba(255,255,255,${a.main ? '0.5' : '0.3'})`,
      'letter-spacing': '2'
    });
    t.textContent = a.name.toUpperCase();
    ll.appendChild(t);
  });
}

// Unified category icon mapping — single source of truth for pins, chips, place list
const CATEGORY_ICONS = {
  beach:   { color: '#1D4ED8', bgLight: '#EFF6FF', bgBorder: '#BFDBFE', gradient: 'linear-gradient(135deg,#EFF6FF,#BFDBFE)', i18nKey: 'placeBeach',   path: '<path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 3v10"/><path d="M8 7c1.5-2 4.5-2 6 0"/>' },
  view:    { color: '#6D28D9', bgLight: '#F5F3FF', bgBorder: '#DDD6FE', gradient: 'linear-gradient(135deg,#F5F3FF,#DDD6FE)', i18nKey: 'placeView',    path: '<path d="M2 22l6-10 4 6 3-4 5 8H2z"/><circle cx="18" cy="6" r="3"/>' },
  temple:  { color: '#C2410C', bgLight: '#FFF7ED', bgBorder: '#FED7AA', gradient: 'linear-gradient(135deg,#FFF7ED,#FED7AA)', i18nKey: 'placeTemple',  path: '<circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M9 11h6"/><path d="M8 11c0 3 1 5 4 6s4-3 4-6"/><path d="M6 22c1-3 2-5 6-5s5 2 6 5"/>' },
  nature:  { color: '#047857', bgLight: '#ECFDF5', bgBorder: '#A7F3D0', gradient: 'linear-gradient(135deg,#ECFDF5,#A7F3D0)', i18nKey: 'placeNature',  path: '<path d="M17 20H7l5-16 5 16z"/><path d="M12 13l-3 7"/><path d="M12 13l3 7"/><path d="M12 8l-2 5"/><path d="M12 8l2 5"/>' },
  market:  { color: '#BE123C', bgLight: '#FFF1F2', bgBorder: '#FECDD3', gradient: 'linear-gradient(135deg,#FFF1F2,#FECDD3)', i18nKey: 'placeMarket',  path: '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>' },
  food:    { color: '#BE123C', bgLight: '#FFF1F2', bgBorder: '#FECDD3', gradient: 'linear-gradient(135deg,#FFF1F2,#FECDD3)', i18nKey: 'placeFood',    path: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>' },
  photo:   { color: '#7C3AED', bgLight: '#F5F3FF', bgBorder: '#DDD6FE', gradient: 'linear-gradient(135deg,#F5F3FF,#DDD6FE)', i18nKey: 'placePhoto',   path: '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>' },
  office:  { color: '#4338CA', bgLight: '#EEF2FF', bgBorder: '#C7D2FE', gradient: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', i18nKey: 'placeOffice',  path: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>' },
  top:     { color: '#4338CA', bgLight: '#FFFBEB', bgBorder: '#FDE68A', gradient: 'linear-gradient(135deg,#FFFBEB,#FDE68A)', i18nKey: 'placeTop',     path: '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>' },
};

// Helper: get category info with fallback
function getCatInfo(cat) {
  return CATEGORY_ICONS[cat] || CATEGORY_ICONS.top;
}

// Helper: render SVG icon at any size/color (reused in pins, chips, place list)
function getCatSvgIcon(cat, size, strokeColor, strokeWidth) {
  const info = getCatInfo(cat);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth || '2'}" stroke-linecap="round" stroke-linejoin="round">${info.path}</svg>`;
}

// Teardrop pin SVG path (36×44 viewBox)
const PIN_PATH = 'M18 44C18 44 2 26 2 16C2 7.16 9.16 0 18 0C26.84 0 34 7.16 34 16C34 26 18 44 18 44Z';

function renderMapMarkers() {
  const filtered = filterPlaces();
  // Pin: 36×44 SVG units; icon 16×16 centered in the circle part (cy≈16)
  const PW = 36, PH = 44;
  const iconScale = (16 / 24).toFixed(3);
  // Icon center offset inside the teardrop head: cx=18, cy≈15
  const IX = PW / 2 - 8, IY = 16 - 8;

  let html = '';
  filtered.forEach((p, i) => {
    const { x, y } = latLngToSvg(p.lat, p.lng);
    const cat = getDisplayCat(p);
    const info = getCatInfo(cat);
    const inRoute = route.some(r => r.id === p.id);
    const routeIdx = route.findIndex(r => r.id === p.id);
    const isOffice = cat === 'office';
    const delay = Math.min(i * 60, 1200); // cascade, cap at 1.2s

    // Outer <g> = position only (managed by updateMarkerScale), NO CSS animation
    // Inner <g class="map-pin-body"> = visual content + CSS opacity animation
    html += `<g class="map-pin" data-id="${p.id}" data-x="${x.toFixed(1)}" data-y="${y.toFixed(1)}"
      transform="translate(${x.toFixed(1)},${y.toFixed(1)})">
      <g class="map-pin-body ${inRoute ? 'in-route' : ''} ${isOffice ? 'map-pin--office' : ''}"
        style="animation-delay:${delay}ms">
        <circle class="map-pin-pulse" cx="0" cy="${-PH + 16}" r="18" fill="none" stroke="${info.color}" stroke-width="2" opacity="0"/>
        <g transform="translate(${-PW / 2},${-PH})">
          <path class="map-pin-shape" d="${PIN_PATH}" fill="${info.color}" stroke="#fff" stroke-width="2"/>
          <g transform="translate(${IX},${IY}) scale(${iconScale})"
            fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${info.path}</g>
        </g>
        ${inRoute ? `<g transform="translate(12,${-PH})">
          <circle r="9" fill="${info.color}" stroke="#fff" stroke-width="1.5"/>
          <text y="3.5" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">${routeIdx + 1}</text>
        </g>` : ''}
      </g>
    </g>`;
  });
  mapMarkers.innerHTML = html;

  mapMarkers.querySelectorAll('.map-pin').forEach(m => {
    m.addEventListener('click', e => {
      e.stopPropagation();
      mapMarkers.querySelectorAll('.map-pin-body.active').forEach(a => a.classList.remove('active'));
      m.querySelector('.map-pin-body').classList.add('active');
      const place = PLACES.find(p => p.id === m.dataset.id);
      if (place) openPlaceSheet(place);
    });
  });
  updateMarkerScale();
}

function updateRouteLine() {
  if (route.length < 2) {
    routeLine.setAttribute('points', '');
    return;
  }
  const pts = route.map(p => {
    const { x, y } = latLngToSvg(p.lat, p.lng);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  routeLine.setAttribute('points', pts);
}

// Pan & Zoom
function initMapPanZoom() {
  svgMap.addEventListener('mousedown', e => {
    if (e.target.closest('.map-pin')) return;
    mapDragging = true;
    mapDragStart = { x: e.clientX, y: e.clientY, vx: mapViewBox.x, vy: mapViewBox.y };
  });
  svgMap.addEventListener('mousemove', e => {
    if (!mapDragging) return;
    const r = svgMap.getBoundingClientRect();
    mapViewBox.x = mapDragStart.vx - (e.clientX - mapDragStart.x) * (mapViewBox.w / r.width);
    mapViewBox.y = mapDragStart.vy - (e.clientY - mapDragStart.y) * (mapViewBox.h / r.height);
    applyMapViewBox();
  });
  document.addEventListener('mouseup', () => { mapDragging = false; });

  svgMap.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      mapDragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDist = Math.sqrt(dx * dx + dy * dy);
      pinchStartViewBox = { ...mapViewBox };
      e.preventDefault();
    } else if (e.touches.length === 1) {
      if (e.target.closest('.map-pin')) return;
      mapDragging = true; pinchStartDist = 0;
      const t = e.touches[0];
      mapDragStart = { x: t.clientX, y: t.clientY, vx: mapViewBox.x, vy: mapViewBox.y };
    }
  }, { passive: false });

  svgMap.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 2 && pinchStartDist > 0 && pinchStartViewBox) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const scale = pinchStartDist / dist;
      let newW = pinchStartViewBox.w * scale, newH = pinchStartViewBox.h * scale;
      if (newW < 80) { newW = 80; newH = 80 * (SVG_H / SVG_W); }
      if (newW > SVG_W * 2) { newW = SVG_W * 2; newH = SVG_H * 2; }
      const r = svgMap.getBoundingClientRect();
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const sx = pinchStartViewBox.x + ((mx - r.left) / r.width) * pinchStartViewBox.w;
      const sy = pinchStartViewBox.y + ((my - r.top) / r.height) * pinchStartViewBox.h;
      mapViewBox = { x: sx - ((mx - r.left) / r.width) * newW, y: sy - ((my - r.top) / r.height) * newH, w: newW, h: newH };
      applyMapViewBox();
      return;
    }
    if (mapDragging && e.touches.length === 1) {
      const t = e.touches[0], r = svgMap.getBoundingClientRect();
      mapViewBox.x = mapDragStart.vx - (t.clientX - mapDragStart.x) * (mapViewBox.w / r.width);
      mapViewBox.y = mapDragStart.vy - (t.clientY - mapDragStart.y) * (mapViewBox.h / r.height);
      applyMapViewBox();
    }
  }, { passive: false });

  svgMap.addEventListener('touchend', e => {
    if (e.touches.length < 2) { pinchStartDist = 0; pinchStartViewBox = null; }
    if (e.touches.length === 0) mapDragging = false;
    if (e.touches.length === 1) {
      mapDragging = true;
      const t = e.touches[0];
      mapDragStart = { x: t.clientX, y: t.clientY, vx: mapViewBox.x, vy: mapViewBox.y };
    }
  });

  svgMap.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 0.8 : 1.25;
    const newW = mapViewBox.w * factor, newH = mapViewBox.h * factor;
    if (newW < 80 || newW > SVG_W * 2) return;
    const r = svgMap.getBoundingClientRect();
    const mx = mapViewBox.x + ((e.clientX - r.left) / r.width) * mapViewBox.w;
    const my = mapViewBox.y + ((e.clientY - r.top) / r.height) * mapViewBox.h;
    mapViewBox = { x: mx - ((e.clientX - r.left) / r.width) * newW, y: my - ((e.clientY - r.top) / r.height) * newH, w: newW, h: newH };
    applyMapViewBox();
  }, { passive: false });

  $('mapZoomIn').addEventListener('click', () => svgMapZoomCenter(1));
  $('mapZoomOut').addEventListener('click', () => svgMapZoomCenter(-1));
}

// ══════════════════════════════════════════════
// Place list in bottom sheet
// ══════════════════════════════════════════════
function filterPlaces() {
  let filtered = PLACES;

  if (placeFilter === 'top') {
    filtered = filtered.filter(p => p.cat.includes('top'));
  } else if (placeFilter !== 'all') {
    filtered = filtered.filter(p => p.cat.includes(placeFilter));
  }

  if (placeSearch.trim()) {
    const q = placeSearch.toLowerCase();
    filtered = filtered.filter(p =>
      placeName(p).toLowerCase().includes(q) ||
      placeDesc(p).toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q)
    );
  }

  return filtered;
}

function renderPlaces() {
  const filtered = filterPlaces();

  const routeMsg = encodeURIComponent(t('routeMsgDefault'));
  const placesHtml = filtered.map(p => {
    const cat = getDisplayCat(p);
    const info = getCatInfo(cat);
    const inRoute = route.some(r => r.id === p.id);
    const iconSvg = getCatSvgIcon(cat, 22, info.color, '1.8');

    return `
      <div class="rs-place-item" data-place="${p.id}">
        <div class="rs-place-icon" style="background:${info.gradient}">${iconSvg}</div>
        <div class="rs-place-info">
          <div class="rs-place-name">${placeName(p)}</div>
          <div class="rs-place-desc">${placeDesc(p).slice(0, 60)}...</div>
        </div>
        <button class="rs-place-add ${inRoute ? 'added' : ''}" data-place-add="${p.id}">${inRoute ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'}</button>
      </div>
    `;
  }).join('');

  rsPlaceList.innerHTML = placesHtml + `
    <div style="padding:12px 16px 8px;">
      <div class="rs-route-cta-hint">${t('routeWantRide')}</div>
      <div class="rs-route-cta">
        <a class="rs-route-cta-btn cta-tg" href="https://t.me/ThaiGoSale1?text=${routeMsg}" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.9c-.12.59-.45.73-.91.46l-2.5-1.84-1.21 1.16c-.13.13-.24.24-.5.24l.18-2.55 4.64-4.19c.2-.18-.04-.28-.31-.1L7.95 14.1l-2.47-.77c-.54-.17-.55-.54.11-.8l9.64-3.72c.44-.16.83.11.41.99z"/></svg>
          ${t('rentTg')}
        </a>
        <a class="rs-route-cta-btn cta-wa" href="https://wa.me/66822545737?text=${routeMsg}" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
          ${t('rentWa')}
        </a>
      </div>
    </div>
  `;

  rsPlaceList.querySelectorAll('.rs-place-item').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.rs-place-add')) return;
      const place = PLACES.find(p => p.id === card.dataset.place);
      if (place) openPlaceSheet(place);
    });
  });

  rsPlaceList.querySelectorAll('.rs-place-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const place = PLACES.find(p => p.id === btn.dataset.placeAdd);
      if (place) toggleRoute(place);
    });
  });

  // Also update map markers
  renderMapMarkers();
}

// Render filter chips from CATEGORY_ICONS (single source of truth)
const FILTER_CHIP_ORDER = ['top', 'all', 'beach', 'view', 'temple', 'nature', 'market', 'food', 'photo'];
function renderFilterChips() {
  rsFilters.innerHTML = FILTER_CHIP_ORDER.map(cat => {
    const info = CATEGORY_ICONS[cat];
    const isActive = cat === placeFilter;
    if (cat === 'top' || cat === 'all') {
      const label = cat === 'top' ? t('placeTop') : t('filterAll');
      return `<button class="filter-chip ${isActive ? 'filter-chip--active' : ''}" data-cat="${cat}">${label}</button>`;
    }
    const icon = getCatSvgIcon(cat, 12, 'currentColor', '2');
    return `<button class="filter-chip ${isActive ? 'filter-chip--active' : ''}" data-cat="${cat}">${icon}${t(info.i18nKey)}</button>`;
  }).join('');
}
renderFilterChips();

rsFilters.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  placeFilter = chip.dataset.cat;
  rsFilters.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('filter-chip--active', c.dataset.cat === placeFilter)
  );
  renderPlaces();
});

rsSearchInput.addEventListener('input', () => {
  placeSearch = rsSearchInput.value;
  renderPlaces();
});

// ══════════════════════════════════════════════
// Place Sheet
// ══════════════════════════════════════════════
let currentPlace = null;

function openPlaceSheet(place) {
  currentPlace = place;
  const cat = getDisplayCat(place);
  const color = CAT_COLORS[cat] || '#6b7280';

  placeSheetIcon.textContent = place.icon;
  placeSheetIcon.style.background = color + '20';
  placeSheetIcon.style.color = color;
  placeSheetName.textContent = placeName(place);
  placeSheetKm.textContent = place.km_from_patong
    ? tpl('kmFromPatong', { km: place.km_from_patong })
    : '';
  placeSheetDesc.textContent = placeDesc(place);

  const tips = [];
  if (place.tips) tips.push(placeTips(place));
  if (place.warnings && place.warnings.length) tips.push('\u26A0 ' + place.warnings.join('. '));
  placeSheetTips.textContent = tips.join('\n');
  tips.length ? placeSheetTips.classList.remove('hidden') : placeSheetTips.classList.add('hidden');

  const inRoute = route.some(r => r.id === place.id);
  placeSheetAdd.textContent = inRoute ? t('inRoute') : t('addToRoute');

  placeSheet.classList.add('open');
  sheetOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePlaceSheet() {
  placeSheet.classList.remove('open');
  sheetOverlay.classList.remove('active');
  document.body.style.overflow = '';
  currentPlace = null;
}

placeSheetAdd.addEventListener('click', () => {
  if (currentPlace) {
    toggleRoute(currentPlace);
    closePlaceSheet();
  }
});

setupDragDismiss(placeSheet, closePlaceSheet);

sheetOverlay.addEventListener('click', () => {
  if (bookingSheet.classList.contains('open')) closeBookingSheet();
  if (placeSheet.classList.contains('open')) closePlaceSheet();
});

// ══════════════════════════════════════════════
// Preset routes
// ══════════════════════════════════════════════
const PRESET_ROUTES = [
  { nameKey: 'presetSouth', icon: '🌅', ids: ['karon-viewpoint', 'kata', 'naiharn', 'yanui', 'windmill', 'promthep'] },
  { nameKey: 'presetSunset', icon: '🌇', ids: ['big-buddha', 'karon-viewpoint', 'promthep', 'windmill', 'after-beach'] },
  { nameKey: 'presetNorth', icon: '🏝', ids: ['bangtao', 'nai-thon', 'nai-yang', 'sirinat', 'mai-khao'] },
  { nameKey: 'presetCulture', icon: '🛕', ids: ['big-buddha', 'chalong', 'old-town', 'serene-light', 'rang-hill'] },
  { nameKey: 'presetFood', icon: '🛍', ids: ['banzaan', 'indy-market', 'chillva', 'three-monkeys', 'tunk-ka-cafe'] }
];

function loadPreset(preset) {
  route = [];
  preset.ids.forEach(id => {
    const place = PLACES.find(p => p.id === id);
    if (place) route.push(place);
  });
  updateRoute();
  renderPlaces();
  showToast(t('presetLoaded'));
}

// ══════════════════════════════════════════════
// Random route generator
// ══════════════════════════════════════════════

function generateRandomRoute(maxMins) {
  const maxKm = maxMins / 1.5;
  const available = PLACES.filter(p => !p.cat.includes('office'));
  // Shuffle
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  const result = [available[0]];
  let totalKm = 0;
  for (let k = 1; k < available.length && result.length < 6; k++) {
    const segKm = haversine(result[result.length - 1], available[k]) * KM_FACTOR;
    if (totalKm + segKm <= maxKm) {
      result.push(available[k]);
      totalKm += segKm;
    }
  }
  return result;
}

// ══════════════════════════════════════════════
// Route optimization (nearest neighbor)
// ══════════════════════════════════════════════
function optimizeRoute() {
  if (route.length < 3) return;
  const remaining = route.slice();
  const optimized = [remaining.shift()];
  while (remaining.length > 0) {
    const last = optimized[optimized.length - 1];
    let nearest = 0, nearestDist = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = haversine(last, remaining[i]);
      if (d < nearestDist) { nearestDist = d; nearest = i; }
    }
    optimized.push(remaining.splice(nearest, 1)[0]);
  }
  route = optimized;
  updateRoute();
  renderPlaces();
  showToast(t('routeOptimized'));
}

// ══════════════════════════════════════════════
// Nearby place suggestion
// ══════════════════════════════════════════════
function findNearbyPlace() {
  if (route.length < 2) return null;
  const lastPlace = route[route.length - 1];
  const routeIds = route.map(p => p.id);
  let best = null, bestDist = Infinity;
  PLACES.forEach(p => {
    if (routeIds.includes(p.id)) return;
    if (p.cat.includes('office')) return;
    const d = haversine(lastPlace, p) * KM_FACTOR;
    if (d < 3 && d < bestDist) { bestDist = d; best = p; }
  });
  return best;
}

// ══════════════════════════════════════════════
// Route warnings
// ══════════════════════════════════════════════
const WARNINGS_DB = {
  patong_traffic: { icon: '🚗', key: 'warnTraffic' },
  temple_dress: { icon: '👔', key: 'warnDressCode' },
  north_serpentine: { icon: '🏔', key: 'warnSerpentine' },
  long_route: { icon: '⚡', key: 'warnLongRoute' }
};

function getRouteWarnings() {
  const set = new Set();
  route.forEach(p => {
    (p.warnings || []).forEach(w => set.add(w));
  });
  const stats = calcStats(route);
  if (stats.km > 80) set.add('long_route');
  return Array.from(set);
}

// ══════════════════════════════════════════════
// Google Maps link
// ══════════════════════════════════════════════
function buildGoogleMapsLink() {
  if (route.length === 0) return '#';
  if (route.length === 1) {
    return `https://www.google.com/maps/dir/?api=1&destination=${route[0].lat},${route[0].lng}`;
  }
  const origin = `${route[0].lat},${route[0].lng}`;
  const dest = `${route[route.length - 1].lat},${route[route.length - 1].lng}`;
  const waypoints = route.slice(1, -1).map(p => `${p.lat},${p.lng}`).join('|');
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}${waypoints ? '&waypoints=' + waypoints : ''}&travelmode=driving`;
}

// ══════════════════════════════════════════════
// Share route
// ══════════════════════════════════════════════
const rsShareOverlay = $('rsShareOverlay');
const rsSharePop = $('rsSharePop');

function openSharePopover() {
  rsShareOverlay.classList.add('active');
  rsSharePop.classList.add('open');
  // Update Google Maps link
  $('rsShareGmaps').href = buildGoogleMapsLink();
}

function closeSharePopover() {
  rsShareOverlay.classList.remove('active');
  rsSharePop.classList.remove('open');
}

rsShareOverlay.addEventListener('click', closeSharePopover);

$('rsShareWa').addEventListener('click', () => {
  const names = route.map(r => placeName(r)).join(' → ');
  const stats = calcStats(route);
  const msg = encodeURIComponent(tpl('waMsgRoute', { route: names, km: stats.km }));
  window.open(`https://wa.me/66822545737?text=${msg}`, '_blank');
  closeSharePopover();
});

$('rsShareTg').addEventListener('click', () => {
  const names = route.map(r => placeName(r)).join(' → ');
  const stats = calcStats(route);
  const msg = encodeURIComponent(tpl('waMsgRoute', { route: names, km: stats.km }));
  window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${msg}`, '_blank');
  closeSharePopover();
});

$('rsShareCopy').addEventListener('click', () => {
  const ids = route.map(r => r.id).join(',');
  const url = window.location.origin + window.location.pathname + '?route=' + ids;
  navigator.clipboard.writeText(url).then(() => showToast(t('linkCopied'))).catch(() => {});
  closeSharePopover();
});

// ══════════════════════════════════════════════
// Route management
// ══════════════════════════════════════════════
function toggleRoute(place) {
  const idx = route.findIndex(r => r.id === place.id);
  if (idx >= 0) {
    route.splice(idx, 1);
    showToast(`${placeName(place)} ${t('placeRemoved')}`);
  } else {
    if (route.length >= MAX_ROUTE_POINTS) {
      showToast(tpl('maxPoints', { n: MAX_ROUTE_POINTS }), 'warning');
      return;
    }
    route.push(place);
    showToast(`${placeName(place)} ${t('placeAdded')}`);
  }
  updateRoute();
  renderPlaces();
}

function removeFromRoute(placeId) {
  route = route.filter(r => r.id !== placeId);
  updateRoute();
  renderPlaces();
}

// Drag & Drop for route stops
let dragFromIdx = -1;

function initRouteStopsDragDrop() {
  const list = rsRoutePanel.querySelector('.rs-stops');
  if (!list) return;

  list.addEventListener('dragstart', e => {
    const stop = e.target.closest('.rs-stop');
    if (!stop) return;
    const stops = Array.from(list.querySelectorAll('.rs-stop'));
    dragFromIdx = stops.indexOf(stop);
    stop.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  list.addEventListener('dragend', e => {
    const stop = e.target.closest('.rs-stop');
    if (stop) stop.classList.remove('dragging');
    list.querySelectorAll('.rs-stop').forEach(s => s.classList.remove('drag-over'));
  });

  list.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const stop = e.target.closest('.rs-stop');
    if (!stop) return;
    list.querySelectorAll('.rs-stop').forEach(s => s.classList.remove('drag-over'));
    stop.classList.add('drag-over');
  });

  list.addEventListener('drop', e => {
    e.preventDefault();
    const stop = e.target.closest('.rs-stop');
    if (!stop) return;
    const stops = Array.from(list.querySelectorAll('.rs-stop'));
    const toIdx = stops.indexOf(stop);
    if (dragFromIdx >= 0 && toIdx >= 0 && dragFromIdx !== toIdx) {
      const item = route.splice(dragFromIdx, 1)[0];
      route.splice(toIdx, 0, item);
      updateRoute();
      renderPlaces();
    }
    list.querySelectorAll('.rs-stop').forEach(s => s.classList.remove('drag-over'));
    dragFromIdx = -1;
  });
}

function updateRoute() {
  // Update badge on route tab inside sheet
  if (route.length > 0) {
    rsBadge.textContent = route.length;
    rsBadge.classList.remove('hidden');
    rsBadge.classList.add('visible');
  } else {
    rsBadge.classList.add('hidden');
    rsBadge.classList.remove('visible');
  }

  // Update guide tab badge
  const guideBadge = $('guideRouteBadge');
  if (guideBadge) {
    if (route.length > 0) {
      guideBadge.textContent = route.length;
      guideBadge.classList.add('visible');
    } else {
      guideBadge.classList.remove('visible');
    }
  }

  // Update route line on map
  updateRouteLine();

  // Update markers (route badge state)
  renderMapMarkers();

  // Render route panel content
  renderRoutePanel();
}

function renderRoutePanel() {
  const stats = route.length >= 2 ? calcStats(route) : null;
  const warnings = getRouteWarnings();
  const nearby = findNearbyPlace();

  let html = '';

  // Presets section (show when route is empty)
  if (route.length === 0) {
    html += `<div class="rs-presets">
      <div class="rs-presets-title">${t('presetsTitle')}</div>
      <div class="rs-preset-grid">
        ${PRESET_ROUTES.map((p, i) => `<button class="rs-preset-btn" data-preset="${i}"><span class="preset-icon">${p.icon}</span> ${t(p.nameKey)}</button>`).join('')}
      </div>
    </div>`;

    // Random generator
    html += `<div class="rs-random">
      <div class="rs-random-title">${t('randomTitle')}</div>
      <div class="rs-random-grid">
        <button class="rs-random-btn" data-mins="120">🎲 2${t('timeH')}</button>
        <button class="rs-random-btn" data-mins="240">🎲 4${t('timeH')}</button>
        <button class="rs-random-btn" data-mins="480">🎲 ${t('fullDay')}</button>
      </div>
    </div>`;

    html += `<div class="rs-empty">${t('routeEmpty')}</div>`;
  } else {
    // Route header
    html += `<div class="rs-route-header">
      <div class="rs-route-title">${t('routeLabel')} <span class="rs-route-count">${route.length}</span>/12</div>
      <div class="rs-route-actions">
        ${route.length >= 3 ? `<button class="rs-action-btn" id="rsOptimize"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg> ${t('optimize')}</button>` : ''}
        <button class="rs-action-btn danger" id="rsClear">${t('routeReset')}</button>
      </div>
    </div>`;

    // Stops list — mockup v3.8 style (A/B/C letter markers)
    html += `<div class="rs-stops">`;
    const STOP_COLORS = ['#16A34A', '#7C3AED', '#DC2626', '#0369A1', '#C2410C', '#6D28D9'];
    route.forEach((p, i) => {
      let numClass = '';
      if (i === 0) numClass = 'first';
      else if (i === route.length - 1) numClass = 'last';
      const letter = String.fromCharCode(65 + i); // A, B, C...
      const stopColor = STOP_COLORS[i % STOP_COLORS.length];
      html += `<div class="rs-stop" draggable="true">
        <span class="rs-stop-grip">⠿</span>
        <span class="rs-stop-num" style="background:${stopColor};color:#fff;">${letter}</span>
        <span class="rs-stop-name">${placeName(p)}</span>
        <button class="rs-stop-remove" data-remove="${p.id}">&times;</button>
      </div>`;
    });
    html += `</div>`;

    // Stats — mockup v3.8 grid
    if (stats) {
      html += `<div class="rs-stats">
        <div class="rs-stat"><div class="rs-stat-val">${stats.km}</div><div class="rs-stat-label">${t('statKm')}</div></div>
        <div class="rs-stat"><div class="rs-stat-val">${formatTime(stats.mins, lang)}</div><div class="rs-stat-label">${t('statEnRoute')}</div></div>
        <div class="rs-stat"><div class="rs-stat-val">${stats.fuel}</div><div class="rs-stat-label">${t('statFuel')}</div></div>
      </div>`;

      // Taxi comparison — route-based calculation
      // Bike: cheapest rental (130 ₿/day) + fuel for route
      // Taxi: route distance × taxi rate (30 ₿/km)
      const bikeRental = 130;
      const bikeCost = bikeRental + stats.fuel;
      const taxiCost = Math.round(stats.km * TAXI_RATE_PER_KM);
      const routeSaving = taxiCost - bikeCost;
      html += `<div class="rs-taxi-compare">
        <div class="rs-taxi-cards">
          <div class="rs-taxi-card bike">
            <div class="rs-taxi-card-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-m)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M5 14l1-4h4l3-3h3"/><path d="M10 10l2 4h5l2-4"/><path d="M16 7a1 1 0 100-2 1 1 0 000 2z" fill="var(--primary-m)"/></svg></div>
            <div class="rs-taxi-card-label">Байк + бензин</div>
            <div class="rs-taxi-price bike">~${bikeCost.toLocaleString()} ₿</div>
            <div class="rs-taxi-sub">${bikeRental} ₿ аренда + ${stats.fuel} ₿ бензин</div>
          </div>
          <span class="rs-taxi-vs">vs</span>
          <div class="rs-taxi-card taxi">
            <div class="rs-taxi-card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="4" height="4" rx="1" fill="var(--accent)"/><rect x="10" y="4" width="4" height="4" rx="1" fill="var(--accent)" opacity=".45"/><rect x="16" y="4" width="4" height="4" rx="1" fill="var(--accent)"/><rect x="4" y="10" width="4" height="4" rx="1" fill="var(--accent)" opacity=".45"/><rect x="10" y="10" width="4" height="4" rx="1" fill="var(--accent)"/><rect x="16" y="10" width="4" height="4" rx="1" fill="var(--accent)" opacity=".45"/><rect x="4" y="16" width="4" height="4" rx="1" fill="var(--accent)"/><rect x="10" y="16" width="4" height="4" rx="1" fill="var(--accent)" opacity=".45"/><rect x="16" y="16" width="4" height="4" rx="1" fill="var(--accent)"/></svg></div>
            <div class="rs-taxi-card-label">Такси</div>
            <div class="rs-taxi-price taxi">~${taxiCost.toLocaleString()} ₿</div>
            <div class="rs-taxi-sub">средняя цена по маршруту</div>
          </div>
        </div>
        <div class="rs-taxi-saving">
          <div class="rs-taxi-saving-text"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg> Экономия на байке<br>за весь маршрут</div>
          <div class="rs-taxi-saving-amount">~${routeSaving.toLocaleString()} ₿</div>
        </div>
      </div>`;
    }

    // Warnings
    if (warnings.length > 0) {
      html += `<div class="rs-warnings">`;
      warnings.forEach(w => {
        const info = WARNINGS_DB[w];
        if (info) {
          html += `<div class="rs-warning"><span class="rs-warning-icon">${info.icon}</span> ${t(info.key)}</div>`;
        }
      });
      html += `</div>`;
    }

    // Nearby suggestion
    if (nearby) {
      html += `<div class="rs-nearby">
        <div class="rs-nearby-text">${t('nearbyLabel')} <strong>${placeName(nearby)}</strong></div>
        <button class="rs-nearby-add" data-nearby="${nearby.id}">+ ${t('addBtn')}</button>
      </div>`;
    }

    // CTA buttons — mockup v3.8 dual TG+WA
    if (route.length >= 2) {
      html += `<div class="rs-cta-row">
        <button class="rs-cta-btn cta-share" id="rsShareBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> ${t('shareRoute')}</button>
        <a class="rs-cta-btn cta-gmaps" href="${buildGoogleMapsLink()}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> Maps</a>
      </div>`;

      const routeNames = route.map(p => placeName(p)).join(' → ');
      const routeMsg = encodeURIComponent(`${t('routeMsgPrefix')}: ${routeNames}`);
      html += `<div class="rs-route-cta-hint">${t('routeWantRide')}</div>
      <div class="rs-route-cta">
        <a class="rs-route-cta-btn cta-tg" href="https://t.me/ThaiGoSale1?text=${routeMsg}" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.9c-.12.59-.45.73-.91.46l-2.5-1.84-1.21 1.16c-.13.13-.24.24-.5.24l.18-2.55 4.64-4.19c.2-.18-.04-.28-.31-.1L7.95 14.1l-2.47-.77c-.54-.17-.55-.54.11-.8l9.64-3.72c.44-.16.83.11.41.99z"/></svg>
          ${t('rentTg')}
        </a>
        <a class="rs-route-cta-btn cta-wa" href="https://wa.me/66822545737?text=${routeMsg}" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
          ${t('rentWa')}
        </a>
      </div>`;
    }
  }

  rsRoutePanel.innerHTML = html;

  // Event handlers
  rsRoutePanel.querySelectorAll('.rs-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => loadPreset(PRESET_ROUTES[parseInt(btn.dataset.preset)]));
  });

  rsRoutePanel.querySelectorAll('.rs-random-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      route = generateRandomRoute(parseInt(btn.dataset.mins));
      updateRoute();
      renderPlaces();
      showToast(t('randomCreated'));
    });
  });

  const optimizeBtn = $('rsOptimize');
  if (optimizeBtn) optimizeBtn.addEventListener('click', optimizeRoute);

  const clearBtn = $('rsClear');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    route = [];
    updateRoute();
    renderPlaces();
    showToast(t('routeCleared'));
  });

  rsRoutePanel.querySelectorAll('.rs-stop-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromRoute(btn.dataset.remove));
  });

  const shareBtn = $('rsShareBtn');
  if (shareBtn) shareBtn.addEventListener('click', openSharePopover);

  rsRoutePanel.querySelectorAll('.rs-nearby-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const place = PLACES.find(p => p.id === btn.dataset.nearby);
      if (place) {
        route.push(place);
        updateRoute();
        renderPlaces();
        showToast(`${placeName(place)} ${t('placeAdded')}`);
      }
    });
  });

  rsRoutePanel.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => switchTab(el.dataset.goto));
  });

  // Init drag & drop
  initRouteStopsDragDrop();
}

// ══════════════════════════════════════════════
// Toasts
// ══════════════════════════════════════════════
function showToast(msg, type = 'info') {
  const container = $('toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  if (type === 'warning') el.style.background = '#f59e0b';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove());
  }, 2200);
}

// ══════════════════════════════════════════════
// Rider Test
// ══════════════════════════════════════════════
const riderTestOverlay = $('riderTestOverlay');
const riderTestBody = $('riderTestBody');
const riderRoadFill = $('riderRoadFill');
const riderBikeIcon = $('riderBikeIcon');
let riderCurrentQ = 0;
let riderAnswered = false;

const RIDER_PROGRESS_KEY = 'thaigo_rider_progress';

function saveRiderProgress() {
  localStorage.setItem(RIDER_PROGRESS_KEY, JSON.stringify({ question: riderCurrentQ }));
}

function loadRiderProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(RIDER_PROGRESS_KEY));
    return data && typeof data.question === 'number' ? data : null;
  } catch { return null; }
}

function clearRiderProgress() {
  localStorage.removeItem(RIDER_PROGRESS_KEY);
}

function openRiderTest() {
  const saved = loadRiderProgress();
  if (saved && saved.question > 0 && saved.question < RIDER_QUESTIONS.length) {
    showResumePrompt(saved.question);
  } else {
    startRiderTest(0);
  }
}

function showResumePrompt(savedQ) {
  riderTestOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  riderTestBody.innerHTML = `
    <div class="rider-resume">
      <div class="rider-resume-card">
        <h3>${t('resumeTitle')}</h3>
        <p>${tpl('resumeText', { n: savedQ + 1, total: RIDER_QUESTIONS.length })}</p>
        <div class="rider-resume-btns">
          <button class="rider-resume-restart" id="resumeRestart">${t('resumeRestart')}</button>
          <button class="rider-resume-continue" id="resumeContinue">${t('resumeContinue')}</button>
        </div>
      </div>
    </div>
  `;
  $('resumeRestart').addEventListener('click', () => { clearRiderProgress(); startRiderTest(0); });
  $('resumeContinue').addEventListener('click', () => startRiderTest(savedQ));
}

function startRiderTest(fromQuestion) {
  riderCurrentQ = fromQuestion;
  riderTestOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderRiderQuestion(riderCurrentQ, false);
}

function closeRiderTest() {
  riderTestOverlay.classList.remove('active');
  document.body.style.overflow = '';
  riderTestBody.innerHTML = '';
}

$('riderTestClose').addEventListener('click', closeRiderTest);

// Teaser button
const teaserStartBtn = $('teaserStartBtn');
if (teaserStartBtn) {
  teaserStartBtn.addEventListener('click', openRiderTest);
}

function updateRiderProgress(qIndex) {
  const total = RIDER_QUESTIONS.length;
  const pct = ((qIndex) / total) * 100;
  riderRoadFill.style.width = pct + '%';
  riderBikeIcon.style.left = Math.max(5, Math.min(95, pct)) + '%';
}

function renderRiderQuestion(qIndex, slideIn) {
  riderAnswered = false;
  updateRiderProgress(qIndex);
  saveRiderProgress();

  const q = RIDER_QUESTIONS[qIndex];
  const qData = T[`rtQ${q.id}`];
  const situation = qData ? (qData[lang] || qData.en) : {};

  const html = `
    <div class="rider-question ${slideIn ? 'slide-in-right' : ''}" id="riderQ">
      <div class="cartoon-scene ${q.sceneClass}" id="cartoonScene">${q.scene}</div>
      <div class="rider-situation">${situation.text || ''}</div>
      <div class="rider-answers">
        ${(situation.answers || []).map((a, i) => `
          <button class="rider-answer-btn" data-idx="${i}">${lang === 'ru' ? String.fromCharCode(1040 + i) : String.fromCharCode(65 + i)}) ${a}</button>
        `).join('')}
      </div>
      <div class="rider-explanation" id="riderExplanation">
        <div class="rider-explanation-text">${situation.explanation || ''}</div>
        ${q.phoneLink ? `<a href="tel:${q.phoneLink}" class="phone-link">📞 ${q.phoneLink.replace('+', '+')}</a>` : ''}
      </div>
      <button class="rider-next-btn" id="riderNextBtn">${t('riderNext')}</button>
    </div>
  `;

  riderTestBody.innerHTML = html;

  if (slideIn) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = $('riderQ');
        if (el) {
          el.classList.remove('slide-in-right');
          el.classList.add('entering');
        }
      });
    });
  }

  // Start scene animation
  setTimeout(() => {
    const scene = $('cartoonScene');
    if (scene) scene.classList.add('animate');
  }, 100);

  // Answer buttons
  riderTestBody.querySelectorAll('.rider-answer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (riderAnswered) return;
      riderAnswered = true;
      const idx = parseInt(btn.dataset.idx);
      const correct = q.correct;

      riderTestBody.querySelectorAll('.rider-answer-btn').forEach((b, i) => {
        b.classList.add('disabled');
        if (i === correct) {
          b.classList.add('correct');
          b.textContent = '✅ ' + b.textContent;
        } else if (i === idx && idx !== correct) {
          b.classList.add('wrong');
        }
      });

      // Show explanation
      setTimeout(() => {
        const expl = $('riderExplanation');
        if (expl) expl.classList.add('visible');
      }, 400);

      // Show next button
      setTimeout(() => {
        const nextBtn = $('riderNextBtn');
        if (nextBtn) {
          nextBtn.classList.add('visible');
          nextBtn.addEventListener('click', goToNextQuestion);
        }
      }, 800);
    });
  });
}

function goToNextQuestion() {
  const nextQ = riderCurrentQ + 1;

  if (nextQ >= RIDER_QUESTIONS.length) {
    // Show bike transition then final screen
    showBikeTransition(() => {
      clearRiderProgress();
      showFinalScreen();
    });
    return;
  }

  // Slide out current
  const currentEl = $('riderQ');
  if (currentEl) currentEl.classList.add('slide-out-left');

  // Bike transition
  showBikeTransition(() => {
    riderCurrentQ = nextQ;
    renderRiderQuestion(riderCurrentQ, true);
  });
}

function showBikeTransition(callback) {
  const bike = document.createElement('div');
  bike.className = 'bike-transition';
  bike.textContent = '🛵';
  document.body.appendChild(bike);
  setTimeout(() => {
    bike.remove();
    callback();
  }, 500);
}

function showFinalScreen() {
  updateRiderProgress(RIDER_QUESTIONS.length);

  // Launch confetti
  launchConfetti();

  riderTestBody.innerHTML = `
    <div class="rider-final">
      <span class="trophy">🏆</span>
      <div class="rider-final-title">${t('finalTitle')}</div>
      <div class="rider-final-text">${t('finalText')}</div>
      <button class="rider-final-btn" id="finalBikeBtn">${t('finalBtn')}</button>
      ${typeof navigator.share === 'function' ? `<button class="rider-share-link" id="finalShareBtn">${t('finalShare')}</button>` : ''}
    </div>
  `;

  $('finalBikeBtn').addEventListener('click', () => {
    closeRiderTest();
    switchTab('bikes');
  });

  const shareBtn = $('finalShareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.share({
        title: t('shareTitle'),
        text: t('shareText')
      }).catch(() => {});
    });
  }
}

function launchConfetti() {
  for (let i = 0; i < 25; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.textContent = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];
    el.style.left = (Math.random() * 100) + '%';
    el.style.animationDelay = (Math.random() * 2) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// (Old calculator removed — replaced by popular bikes block)

// ══════════════════════════════════════════════
// Bike Picker
// ══════════════════════════════════════════════
const bpOverlay = $('bikePickerOverlay');
const bpBody = $('bpBody');
const bpProgressFill = $('bpProgressFill');
let bpStep = 0;
const QUIZ_TOTAL_STEPS = 5;
// Duration option → days mapping for scoring
const QUIZ_DURATION_DAYS = { '1-2': 2, '3-6': 5, '7-19': 14, '20-30': 25 };
let bpAnswers = { experience: null, destination: [], duration: null, priorities: [], budget: null };

function openBikePicker() {
  bpStep = 0;
  bpAnswers = { experience: null, destination: [], duration: null, priorities: [], budget: null };
  bpOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  $('bpTitle').textContent = t('bpTitle');
  renderBpStep();
}

function closeBikePicker() {
  bpOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

$('bpClose').addEventListener('click', closeBikePicker);
$('menuBikePicker').addEventListener('click', () => {
  closeGuideMenu();
  openBikePicker();
});

function updateBpProgress() {
  const pct = Math.min(100, Math.round(((bpStep + 1) / QUIZ_TOTAL_STEPS) * 100));
  bpProgressFill.style.width = pct + '%';
}

function bpMakeOption(iconName, labelKey, descKey, value) {
  return { icon: bpIcon(iconName), label: t(labelKey), desc: t(descKey), value };
}

// Shared quiz step renderer with back/next nav
function renderQuizQuestion(stepNum, questionKey, hintKey, options, isSingle, currentVal, onSelect) {
  updateBpProgress();
  const stepLabel = `${t('quizStep1Q').length ? '' : ''}${stepNum} ${t('quizStepOf')} ${QUIZ_TOTAL_STEPS}`;

  bpBody.innerHTML = `
    <div class="bp-step">
      <div class="quiz-header">
        <div class="quiz-step">${stepLabel}</div>
        <div class="quiz-q">${t(questionKey)}</div>
        <div class="quiz-hint">${t(hintKey)}</div>
      </div>
      <div class="quiz-options">${options.map(o => {
        const sel = isSingle ? (currentVal === o.value) : (Array.isArray(currentVal) && currentVal.includes(o.value));
        return `
        <div class="quiz-opt${sel ? ' selected' : ''}" data-val="${o.value}">
          <div class="quiz-opt-icon">${o.icon}</div>
          <div class="quiz-opt-text">
            <div class="quiz-opt-label">${o.label}</div>
            <div class="quiz-opt-desc">${o.desc}</div>
          </div>
        </div>`;
      }).join('')}</div>
      <div class="quiz-nav">
        ${bpStep > 0 ? `<button class="btn-quiz-back" id="quizBackBtn">${t('quizBack')}</button>` : ''}
        ${!isSingle ? `<button class="btn-quiz-next${(Array.isArray(currentVal) && currentVal.length > 0) ? '' : ' disabled'}" id="quizNextBtn">${t('bpNext')}</button>` : ''}
      </div>
      <div class="bp-promise">${bpIcon('shield', 16)}<span>${t('bpPromise')}</span></div>
    </div>`;

  if (isSingle) {
    bpBody.querySelectorAll('.quiz-opt').forEach(el => {
      el.addEventListener('click', () => {
        bpBody.querySelectorAll('.quiz-opt').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        onSelect(el.dataset.val);
        setTimeout(() => { bpStep++; renderBpStep(); }, 200);
      });
    });
  } else {
    bpBody.querySelectorAll('.quiz-opt').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('selected');
        const selected = [...bpBody.querySelectorAll('.quiz-opt.selected')].map(e => e.dataset.val);
        onSelect(selected);
        const btn = $('quizNextBtn');
        if (btn) btn.classList.toggle('disabled', selected.length === 0);
      });
    });
    const nextBtn = $('quizNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const selected = [...bpBody.querySelectorAll('.quiz-opt.selected')].map(e => e.dataset.val);
        if (selected.length === 0) return;
        bpStep++;
        renderBpStep();
      });
    }
  }

  const backBtn = $('quizBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      bpStep--;
      renderBpStep();
    });
  }
}

function renderBpStep() {
  const steps = [renderQuizStep1, renderQuizStep2, renderQuizStep3, renderQuizStep4, renderQuizStep5];
  if (bpStep >= steps.length) {
    renderBpResults();
    return;
  }
  steps[bpStep]();
}

// Step 1 — Experience (single, 3 options)
function renderQuizStep1() {
  const opts = [
    bpMakeOption('newbie', 'quizExpFirst', 'quizExpFirstDesc', 'first'),
    bpMakeOption('beginner', 'quizExpSome', 'quizExpSomeDesc', 'some'),
    bpMakeOption('expert', 'quizExpPro', 'quizExpProDesc', 'pro')
  ];
  renderQuizQuestion(1, 'quizStep1Q', 'quizStep1Hint', opts, true, bpAnswers.experience, val => {
    bpAnswers.experience = val;
  });
}

// Step 2 — Trip type (multi, 4 options)
function renderQuizStep2() {
  const opts = [
    bpMakeOption('beach', 'bpBeach', 'bpBeachDesc', 'beach'),
    bpMakeOption('island', 'bpIsland', 'bpIslandDesc', 'island'),
    bpMakeOption('mountain', 'bpMountain', 'bpMountainDesc', 'mountain'),
    bpMakeOption('beyond', 'bpBeyond', 'bpBeyondDesc', 'beyond')
  ];
  renderQuizQuestion(2, 'quizStep2Q', 'quizStep2Hint', opts, false, bpAnswers.destination, sel => {
    bpAnswers.destination = sel;
  });
}

// Step 3 — Duration (single, 4 options with discount info)
function renderQuizStep3() {
  const opts = [
    { icon: bpIcon('budgetAll', 18), label: t('quizDur1'), desc: t('quizDur1Desc'), value: '1-2' },
    { icon: bpIcon('budgetAll', 18), label: t('quizDur2'), desc: t('quizDur2Desc'), value: '3-6' },
    { icon: bpIcon('budgetAll', 18), label: t('quizDur3'), desc: t('quizDur3Desc'), value: '7-19' },
    { icon: bpIcon('budgetAll', 18), label: t('quizDur4'), desc: t('quizDur4Desc'), value: '20-30' }
  ];
  renderQuizQuestion(3, 'quizStep3Q', 'quizStep3Hint', opts, true, bpAnswers.duration, val => {
    bpAnswers.duration = val;
  });
}

// Step 4 — Priorities (multi, 5 options)
function renderQuizStep4() {
  const opts = [
    bpMakeOption('easy', 'bpEasy', 'bpEasyDesc', 'easy'),
    bpMakeOption('comfort', 'bpComfort', 'bpComfortDesc', 'comfort'),
    bpMakeOption('sport', 'bpSport', 'bpSportDesc', 'sport'),
    bpMakeOption('style', 'bpStyle', 'bpStyleDesc', 'style'),
    bpMakeOption('economy', 'bpEconomy', 'bpEconomyDesc', 'economy')
  ];
  renderQuizQuestion(4, 'quizStep4Q', 'quizStep4Hint', opts, false, bpAnswers.priorities, sel => {
    bpAnswers.priorities = sel;
  });
}

// Step 5 — Budget (single, 4 options)
function renderQuizStep5() {
  const opts = [
    { icon: bpIcon('budgetAll', 18), label: t('bpBudgetAll'), desc: '', value: 'all' },
    { icon: bpIcon('budgetEconomy', 18), label: t('bpBudgetEconomy'), desc: '', value: 'economy' },
    { icon: bpIcon('budgetComfort', 18), label: t('bpBudgetComfort'), desc: '', value: 'comfort' },
    { icon: bpIcon('budgetPremium', 18), label: t('bpBudgetPremium'), desc: '', value: 'premium' }
  ];
  renderQuizQuestion(5, 'quizStep5Q', 'quizStep5Hint', opts, true, bpAnswers.budget, val => {
    bpAnswers.budget = val === 'all' ? null : val;
  });
}

// Scoring & Results
function scoreBikes() {
  const a = bpAnswers;
  const prioMap = { easy: 'easy', comfort: 'comfort', sport: 'sport', style: 'style', economy: 'economy' };
  const destMap = { beach: 'beach', island: 'island', mountain: 'mountain', beyond: 'beyond' };

  let candidates = BIKES.filter(b => {
    // For first-timers, only auto transmission
    if (a.experience === 'first' && b.transmission === 'manual') return false;
    // Filter by budget
    if (a.budget && b.budgetGroup !== a.budget) return false;
    return true;
  });

  return candidates.map(bike => {
    let score = 0;
    const s = bike.scores;

    // Experience scoring
    if (a.experience === 'first') {
      if (s.easy) score += s.easy;
      if (s.solo) score += s.solo;
    } else if (a.experience === 'some') {
      if (s.solo) score += s.solo;
      if (s.comfort) score += s.comfort;
    } else if (a.experience === 'pro') {
      if (s.sport) score += (s.sport || 0);
      if (s.couple) score += (s.couple || 0);
    }

    // Priorities
    a.priorities.forEach(p => { if (prioMap[p] && s[prioMap[p]]) score += s[prioMap[p]]; });
    // Destinations
    a.destination.forEach(d => { if (destMap[d] && s[destMap[d]]) score += s[destMap[d]]; });

    // Bonus: "Драйв" + "Комфорт" → premium maxi bonus
    if (a.priorities.includes('sport') && a.priorities.includes('comfort') && !a.priorities.includes('easy')) {
      if (['xmax-300-2022', 'xmax-300-new', 'forza-350-black', 'forza-350-new', 'adv-350-new'].includes(bike.id)) {
        score += 2;
      }
    }
    // Bonus: mountain or beyond → ADV bonus
    if (a.destination.includes('mountain') || a.destination.includes('beyond')) {
      if (['adv-160', 'adv-350-new'].includes(bike.id)) {
        score += 2;
      }
    }

    return { bike, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}

let bpSelectedBike = null;
let bpInsurancePlus = false;

function renderBpResults() {
  bpProgressFill.style.width = '100%';
  const results = scoreBikes();
  const days = QUIZ_DURATION_DAYS[bpAnswers.duration] || 14;
  const top = results[0]?.bike;
  const alts = results.slice(1);

  bpSelectedBike = top || null;
  bpInsurancePlus = false;

  function renderResultsContent() {
    if (!bpSelectedBike) return;
    const b = bpSelectedBike;
    const perDay = getPricePerDay(b, days);
    const total = getTotalPrice(b, days);
    const basePerDay = getPricePerDay(b, 1);
    const disc = getDiscountPercent(b, days);
    const whyText = b.why[lang] || b.why.en;
    const insPerDay = getInsurancePerDay(days, b);
    const insTotal = getInsuranceTotal(days, b);
    const grandTotal = total + (bpInsurancePlus && insTotal ? insTotal : 0);
    const isManual = b.category === 'moto';

    // Why reasons from bike features
    const whyReasons = [];
    if (b.featureFlags?.abs) whyReasons.push('ABS');
    if (b.featureFlags?.keyless) whyReasons.push('Keyless');
    if (b.featureFlags?.usb) whyReasons.push('USB');
    if (b.cc >= 150) whyReasons.push(`${b.cc} cc`);

    const insText = bpInsurancePlus && insTotal ? ` + ${t('bpInsPlus')}` : '';
    const waMsg = encodeURIComponent(
      tpl('bpWaMsg', { name: b.name, days, total: grandTotal.toLocaleString(), ins: insText })
    );

    bpBody.innerHTML = `
      <div class="quiz-result">
        <div class="result-card">
          <div class="result-label">${t('quizResultLabel')}</div>
          <div class="result-name">${b.name}</div>
          <div class="result-desc">${whyText}</div>
          <div class="result-price-card">
            <div class="result-bike-svg">${getBikeSvg(b.category)}</div>
            <div class="result-price">${perDay} <span class="result-price-per">${t('bpPerDay')}</span></div>
            ${disc > 0 ? `<div class="result-price-old">${basePerDay} ฿</div>` : ''}
            ${disc > 0 ? `<div class="result-match">${t('quizDiscountBadge')} -${disc}% · ${days} ${t('bpDaysUnit')}</div>` : ''}
          </div>
          ${whyReasons.length > 0 ? `
          <div class="result-why-box">
            <div class="result-why-title">${t('quizWhyTitle')}</div>
            ${whyReasons.map(r => `<div class="result-why-item">${r}</div>`).join('')}
          </div>` : ''}
        </div>

        ${alts.length > 0 ? `
        <div class="result-alts">
          <div class="result-alts-title">${t('quizAlsoFits')}</div>
          ${alts.map(r => {
            const ab = r.bike;
            const aPerDay = getPricePerDay(ab, days);
            return `
            <div class="result-alt-item" data-bike-id="${ab.id}">
              <div class="result-alt-name">${ab.name}</div>
              <div class="result-alt-price">${t('quizFromPrice')} ${aPerDay} ${t('bpPerDay')}</div>
            </div>`;
          }).join('')}
        </div>` : ''}

        <div class="bp-insurance-block">
          <div class="bp-ins-option active" data-ins="basic">
            <span class="bp-ins-radio"></span>
            <span class="bp-ins-label">${t('bpInsBasic')}</span>
            <span class="bp-ins-price">${t('bpInsBasicFree')}</span>
          </div>
          <div class="bp-ins-option${isManual ? ' disabled' : ''}${bpInsurancePlus ? ' active' : ''}" data-ins="plus">
            <span class="bp-ins-radio"></span>
            <span class="bp-ins-label">${t('bpInsPlus')}</span>
            <span class="bp-ins-price">${isManual ? t('bpInsPlusManual') : (insPerDay + ' ' + t('bpInsPerDay'))}</span>
          </div>
        </div>

        <div class="bp-total-line">
          <span>${t('bpTotal')}</span>
          <strong>${grandTotal.toLocaleString()} ฿</strong>
        </div>

        <div class="messenger-cta-row">
          <a class="btn btn-tg btn-full" href="https://t.me/ThaiGoSale1?text=${waMsg}" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            <span>Telegram</span>
          </a>
          <a class="btn btn-wa btn-full" href="https://wa.me/66822545737?text=${waMsg}" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp</span>
          </a>
        </div>

        <button class="bp-restart" id="bpRestartBtn">${t('bpRestart')}</button>
      </div>`;

    // Alternative bike click → select
    bpBody.querySelectorAll('.result-alt-item').forEach(el => {
      el.addEventListener('click', () => {
        const bike = results.find(r => r.bike.id === el.dataset.bikeId)?.bike;
        if (bike) {
          bpSelectedBike = bike;
          bpInsurancePlus = false;
          renderResultsContent();
        }
      });
    });

    // Insurance handlers
    bpBody.querySelectorAll('.bp-ins-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (opt.classList.contains('disabled')) return;
        bpInsurancePlus = opt.dataset.ins === 'plus';
        renderResultsContent();
      });
    });

    // Restart
    const restartBtn = $('bpRestartBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        bpStep = 0;
        bpSelectedBike = null;
        bpInsurancePlus = false;
        bpAnswers = { experience: null, destination: [], duration: null, priorities: [], budget: null };
        renderBpStep();
      });
    }
  }

  renderResultsContent();
}

// ══════════════════════════════════════════════
// Init
// ══════════════════════════════════════════════
document.documentElement.lang = lang;

// Restore route from URL if present
const urlParams = new URLSearchParams(window.location.search);
const routeParam = urlParams.get('route');
if (routeParam) {
  routeParam.split(',').forEach(id => {
    const place = PLACES.find(p => p.id === id);
    if (place && route.length < MAX_ROUTE_POINTS && !route.some(r => r.id === id)) {
      route.push(place);
    }
  });
}

// Deep link: ?bike=pcx160&days=8 → open booking sheet
const bikeParam = urlParams.get('bike');
const daysParam = urlParams.get('days');
if (bikeParam) {
  const bike = BIKES.find(b => b.id === bikeParam || b.id.replace(/-/g, '') === bikeParam.replace(/-/g, ''));
  if (bike) {
    setTimeout(() => {
      if (daysParam) sheetDays = Math.max(1, Math.min(30, parseInt(daysParam) || 8));
      openBookingSheet(bike);
    }, 300);
  }
}

drawIslandMap();
initMapPanZoom();
applyTranslations();

// Reorder sheet messenger buttons and apply primary/secondary styles
{
  // Sheet CTA button order based on primary messenger
  const sheetCtaWrap = document.querySelector('.sheet-cta');
  if (sheetCtaWrap && sheetTg && sheetWa) {
    if (PRIMARY_MESSENGER === 'telegram') {
      sheetCtaWrap.insertBefore(sheetTg, sheetWa);
      sheetTg.className = 'sheet-btn-tg';
      sheetWa.className = 'sheet-btn-wa';
    } else {
      sheetCtaWrap.insertBefore(sheetWa, sheetTg);
      sheetWa.className = 'sheet-btn-tg'; // solid style for primary
      sheetTg.className = 'sheet-btn-wa'; // outline style for secondary
    }
  }
}


// BikePickerCTA click handlers
document.querySelectorAll('.bike-picker-cta .bpc-btn, .btn-picker').forEach(btn => {
  btn.addEventListener('click', () => openBikePicker());
});

// ══════════════════════════════════════════════
// Floating "Directions" button — show only for TH users
// ══════════════════════════════════════════════
(function initFloatingDirections() {
  const fab = $('floatingDirections');
  const closeBtn = $('floatingDirectionsClose');
  if (!fab || !closeBtn) return;

  // Dismiss button
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fab.classList.remove('visible');
    sessionStorage.setItem('tg_fab_hidden', '1');
  });

  // Don't show if already dismissed this session
  if (sessionStorage.getItem('tg_fab_hidden')) return;

  // Geo-check: timezone fallback + ipapi.co
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  if (tz === 'Asia/Bangkok') {
    fab.classList.add('visible');
    return;
  }
  fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) })
    .then(r => r.json())
    .then(data => {
      if (data && data.country_code === 'TH') {
        fab.classList.add('visible');
      }
    })
    .catch(() => { /* silently ignore — don't show button */ });
})();

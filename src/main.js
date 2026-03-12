// ThaiGo Lite — Main app logic with i18n
import './styles/reset.css';
import './styles/tokens.css';
import './styles/app.css';
import './components/bottom-tab-bar.css';
import './components/booking-sheet.css';
import './components/rider-test.css';
import './components/bike-picker.css';
import './components/routes-map.css';
import { BIKES, BIKE_CATEGORIES } from './data/bikes.js';
import { PLACES, CAT_COLORS, getDisplayCat, MAX_ROUTE_POINTS } from './data/places.js';
import { calcStats, formatTime, haversine, TAXI_RATE_PER_KM } from './utils/stats.js';
import { LANGS, detectLang, saveLang, T, translateFeature, BIKE_CAT_TR } from './data/i18n.js';
import { PLACE_TR } from './data/place-translations.js';
import { RIDER_QUESTIONS, CONFETTI_EMOJIS } from './data/rider-test.js';
import { getPricePerDay, getTotalPrice, getCurrentSeason } from './utils/pricing.js';

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
// State
// ══════════════════════════════════════════════
let currentTab = 'home';
let bikeFilter = 'all';
let placeFilter = 'top';
let placeSearch = '';
let route = [];
let sheetBike = null;
let sheetDays = 3;
let sheetInsurancePlus = false;

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
const sheetPM = $('sheetPM');
const sheetDaySlider = $('sheetDaySlider');
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

  // Hero
  document.querySelector('.hero-h1').innerHTML = t('heroTitle');
  document.querySelector('.hero-sub').innerHTML = t('heroSub');
  const heroSeo = document.querySelector('.hero-seo');
  if (heroSeo) heroSeo.textContent = t('heroSeo');

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
    reviewsScroll.innerHTML = T.reviews.map(r =>
      `<div class="review-card"><div class="review-stars">⭐⭐⭐⭐⭐</div><div class="review-text">${r.text[lang] || r.text.en}</div><div class="review-author">${r.author[lang] || r.author.en}</div></div>`
    ).join('');
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

  // Bike filters
  const bikeFilterChips = bikeFiltersEl.querySelectorAll('.filter-chip');
  const bikeFilterKeys = ['filterAll', 'filterScooter', 'filterMaxi', 'filterMoto'];
  bikeFilterChips.forEach((el, i) => { if (bikeFilterKeys[i]) el.textContent = t(bikeFilterKeys[i]); });

  // Place filters in route sheet
  const placeFilterChips = rsFilters.querySelectorAll('.filter-chip');
  const placeFilterKeys = ['placeTop', 'filterAll', 'placeBeach', 'placeView', 'placeTemple', 'placeNature', 'placeMarket', 'placeFood', 'placePhoto'];
  placeFilterChips.forEach((el, i) => { if (placeFilterKeys[i]) el.textContent = t(placeFilterKeys[i]); });

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
  const contactHours = document.querySelectorAll('.contact-row');
  if (contactHours[5]) {
    const icon = contactHours[5].querySelector('.contact-icon');
    contactHours[5].textContent = '';
    if (icon) contactHours[5].appendChild(icon);
    contactHours[5].appendChild(document.createTextNode(t('contactHours')));
  }

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
  const thKeys = ['sheetDays12', 'sheetDays36', 'sheetDays713', 'sheetDays1429', 'sheetDays30'];
  ths.forEach((el, i) => { if (thKeys[i]) el.textContent = t(thKeys[i]); });
  const calcLabel = document.querySelector('.sheet-calc-label');
  if (calcLabel) calcLabel.innerHTML = `${t('sheetRentalDays')} <strong id="sheetDays">${sheetDays}</strong>`;
  const totalLabel = document.querySelector('.sheet-total');
  if (totalLabel && sheetBike) {
    updateSheetCalc();
  }

  // Re-render dynamic content
  renderBikes();
  renderPopular();
  renderPlaces();
  updateRoute();
}

function renderDeliveryAreas() {
  const grid = document.getElementById('dlvGridContacts');
  if (!grid) return;
  grid.innerHTML = T.dlvAreas.map(a =>
    `<div class="dlv-card"><div class="dlv-name">${a.name[lang] || a.name.en}</div><div class="dlv-cond dlv-${a.color}">${a.cond[lang] || a.cond.en}</div></div>`
  ).join('');
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

function toggleSheet() {
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

// Sheet tabs
rsTabs.addEventListener('click', e => {
  const tab = e.target.closest('.rs-tab');
  if (!tab) return;
  rsTab = tab.dataset.rsTab;
  rsTabs.querySelectorAll('.rs-tab').forEach(t => t.classList.toggle('active', t === tab));
  rsPanelPlaces.classList.toggle('active', rsTab === 'places');
  rsPanelRoute.classList.toggle('active', rsTab === 'route');
  if (rsState === 'collapsed') setSheetState('half');
});

// ══════════════════════════════════════════════
// Emoji map for bike categories
// ══════════════════════════════════════════════
const BIKE_EMOJI = { scooter: '\u{1F6F5}', maxi: '\u{1F3CD}', moto: '\u{1F3CD}', car: '\u{1F697}' };

// ══════════════════════════════════════════════
// Render bike catalog
// ══════════════════════════════════════════════
function renderBikes() {
  const filtered = bikeFilter === 'all'
    ? BIKES
    : BIKES.filter(b => b.category === bikeFilter);

  bikeGrid.innerHTML = filtered.map(b => `
    <div class="bike-card" data-bike="${b.id}">
      <div class="bike-card-img cat-${b.category}" role="img" aria-label="${b.name} аренда Пхукет">${BIKE_EMOJI[b.category] || '\u{1F6F5}'}</div>
      <div class="bike-card-body">
        <div class="bike-card-name">${b.name}</div>
        <div class="bike-card-cc">${b.cc} cc</div>
        <div class="bike-card-footer">
          <span class="bike-card-price">${t('priceFrom')} ${getPricePerDay(b, 7)} \u0E3F</span>
          <button class="bike-card-btn">${t('bikeBtnRent')}</button>
        </div>
      </div>
    </div>
  `).join('');

  bikeGrid.querySelectorAll('.bike-card').forEach(card => {
    card.addEventListener('click', () => {
      const bike = BIKES.find(b => b.id === card.dataset.bike);
      if (bike) openBookingSheet(bike);
    });
  });
}

bikeFiltersEl.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  bikeFilter = chip.dataset.cat;
  bikeFiltersEl.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('filter-chip--active', c.dataset.cat === bikeFilter)
  );
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

  scroll.innerHTML = filtered.map(b => {
    const season = getCurrentSeason();
    const base = b.prices[season][0];
    const cur = getPricePerDay(b, days);
    const total = getTotalPrice(b, days);
    const hasDiscount = cur < base;
    return `
    <div class="pop-card" data-bike="${b.id}">
      <div class="pop-card-img cat-${b.category}">${BIKE_EMOJI[b.category] || '\u{1F6F5}'}</div>
      <div class="pop-card-name">${b.name}</div>
      <div class="pop-card-prices">
        <span class="pop-card-cur">${cur} \u0E3F</span>
        ${hasDiscount ? `<span class="pop-card-base">${base} \u0E3F</span>` : ''}
      </div>
      <div class="pop-card-total">${t('popTotal')} ${total.toLocaleString()} \u0E3F</div>
    </div>`;
  }).join('');

  scroll.querySelectorAll('.pop-card').forEach(card => {
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
  // Update days label
  const daysLabel = $('popDaysLabel');
  if (daysLabel) daysLabel.textContent = days + ' ' + t('popDays');

  // Min total for group
  const filtered = BIKES.filter(b => b.budgetGroup === popGroup);
  const minTotal = filtered.reduce((m, b) => { const p = getTotalPrice(b, days); return p < m ? p : m; }, Infinity);
  const totalLabel = $('popTotalLabel');
  if (totalLabel) totalLabel.textContent = t('popFrom') + ' ' + minTotal.toLocaleString() + ' \u0E3F';

  // Hint
  const hint = $('popSliderHint');
  if (hint) hint.textContent = t('popHint');

  // Discount badge
  const rep = filtered[0];
  const discPct = rep ? getPopDiscount(rep, days) : 0;
  const discEl = $('popDiscount');
  if (discEl) {
    if (discPct > 0) {
      discEl.style.display = 'flex';
      $('popDiscountBadge').textContent = '\u2212' + discPct + '%';
      let discText = '';
      if (days >= 20) discText = t('popDiscount20');
      else if (days >= 7) discText = t('popDiscount7');
      else discText = t('popDiscount3');
      $('popDiscountText').textContent = discText;
    } else {
      discEl.style.display = 'none';
    }
  }

  // Title & links
  const titleEl = $('popTitle');
  if (titleEl) titleEl.textContent = t('popTitle');
  const allLink = $('popAllLink');
  if (allLink) allLink.textContent = t('popAll');
  const viewAll = $('popViewAll');
  if (viewAll) viewAll.textContent = t('popViewAll');

  // Chip labels
  const chipLabels = { economy: 'popEconomy', comfort: 'popComfort', premium: 'popPremium' };
  document.querySelectorAll('[data-pop-group]').forEach(el => {
    const g = el.dataset.popGroup;
    el.querySelector('span').textContent = t(chipLabels[g]);
    el.classList.toggle('pop-chip--active', g === popGroup);
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

// Pop slider
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
  sheetDays = 3;
  sheetInsurancePlus = false;

  const emoji = BIKE_EMOJI[bike.category] || '\u{1F6F5}';
  const catClass = `cat-${bike.category}`;
  sheetBikeImg.className = `sheet-bike-img ${catClass}`;
  sheetBikeImg.textContent = emoji;

  // Build slides for lightbox (1 emoji slide per bike for now)
  lbSlides = [{ emoji, catClass }];

  // Render dots under thumbnail (only if >1 slide)
  sheetImgDots.innerHTML = lbSlides.length > 1
    ? lbSlides.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('')
    : '';

  sheetBikeName.textContent = bike.name;
  sheetBikeCc.textContent = `${bike.cc} cc — ${bikeCatName(bike.category)}`;

  sheetFeatures.innerHTML = bike.features.map(f =>
    `<span class="sheet-feature-tag">${trFeature(f)}</span>`
  ).join('');

  const season = getCurrentSeason();
  const sp = bike.prices[season];
  sheetP1.textContent = sp[0] + ' \u0E3F';
  sheetP3.textContent = sp[1] + ' \u0E3F';
  sheetP7.textContent = sp[2] + ' \u0E3F';
  sheetP14.textContent = sp[3] + ' \u0E3F';
  sheetPM.textContent = (sp[3] * 30) + ' \u0E3F';

  sheetDaySlider.value = sheetDays;
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
    `<div class="lb-slide"><div class="lb-slide-img ${s.catClass}">${s.emoji}</div></div>`
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
const MAXI_BIG_IDS = ['xmax-300-2022', 'xmax-300-new', 'forza-350-black', 'forza-350-new', 'adv-350-new'];

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

function getInsuranceFranchise(bike) {
  const tier = getInsuranceTier(bike);
  if (!tier) return 0;
  return tier === 'maxi_big' ? 6000 : 3000;
}

function updateSheetCalc() {
  if (!sheetBike) return;
  const daysEl = $('sheetDays');
  if (daysEl) daysEl.textContent = sheetDays;

  const perDay = getPerDay(sheetBike, sheetDays);
  let total = getTotalPrice(sheetBike, sheetDays);

  // Insurance+ cost
  const insTier = getInsuranceTier(sheetBike);
  const insCost = getInsurancePlusCost(sheetBike, sheetDays);

  // Show/hide insurance+ chip for motorcycles
  if (insTier === null) {
    sheetInsurancePlus = false;
    sheetInsuranceEl.style.display = 'none';
  } else {
    sheetInsuranceEl.style.display = '';
    insPlusChip.style.display = '';
    insPlusCostLabel.textContent = ` · ${insCost.toLocaleString()} ฿`;
  }

  if (sheetInsurancePlus && insTier) {
    total += insCost;
  }

  // Update chip states
  insBasicChip.classList.toggle('active', !sheetInsurancePlus);
  insPlusChip.classList.toggle('active', sheetInsurancePlus);

  const totalEl = document.querySelector('.sheet-total');
  if (totalEl) totalEl.innerHTML = `${t('sheetTotal')} <strong id="sheetTotal">${total.toLocaleString()} \u0E3F</strong>`;

  const tierName = getTierName(sheetDays);
  const tds = document.querySelectorAll('.sheet-price-table td');
  const tierMap = ['day1', 'day3', 'day7', 'day14', 'day14'];
  tds.forEach((td, i) => {
    td.classList.toggle('active-tier', tierMap[i] === tierName);
  });

  const insText = sheetInsurancePlus && insTier ? ` + ${t('insPlus')}` : '';
  const msg = encodeURIComponent(tpl('waMsgBike', { name: sheetBike.name, days: sheetDays }) + insText);
  sheetWa.href = `https://wa.me/66822545737?text=${msg}`;
  sheetTg.href = `https://t.me/ThaiGoSale1?text=${msg}`;
}

sheetDaySlider.addEventListener('input', () => {
  sheetDays = parseInt(sheetDaySlider.value);
  updateSheetCalc();
});

// Insurance chip listeners — select chip on click (but not on info icon)
insBasicChip.addEventListener('click', (e) => {
  if (e.target.closest('.ins-chip-info')) return;
  sheetInsurancePlus = false;
  updateSheetCalc();
});

insPlusChip.addEventListener('click', (e) => {
  if (e.target.closest('.ins-chip-info')) return;
  sheetInsurancePlus = true;
  updateSheetCalc();
});

// Info icon handlers — open per-chip sheet
function openInsSheet(sheet, overlay) {
  sheet.classList.add('open');
  overlay.classList.add('active');
}

function closeInsSheet(sheet, overlay) {
  sheet.classList.remove('open');
  overlay.classList.remove('active');
}

insBasicInfo.addEventListener('click', (e) => {
  e.stopPropagation();
  openInsSheet(insBasicSheet, insBasicOverlay);
});

insPlusInfo.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!sheetBike) return;
  const franchise = getInsuranceFranchise(sheetBike);
  const cost = getInsurancePlusCost(sheetBike, sheetDays);
  insPlusDescText.textContent = tpl('insPlusDesc', { franchise: franchise.toLocaleString() });
  insPlusPriceInfo.textContent = `${t('insPlusPriceLabel')} ${cost.toLocaleString()} ฿`;
  openInsSheet(insPlusSheet, insPlusOverlay);
});

insBasicClose.addEventListener('click', () => closeInsSheet(insBasicSheet, insBasicOverlay));
insPlusClose.addEventListener('click', () => closeInsSheet(insPlusSheet, insPlusOverlay));
insBasicOverlay.addEventListener('click', () => closeInsSheet(insBasicSheet, insBasicOverlay));
insPlusOverlay.addEventListener('click', () => closeInsSheet(insPlusSheet, insPlusOverlay));

// Drag-dismiss + tap-on-handle for info sheets
setupDragDismiss(insBasicSheet, () => closeInsSheet(insBasicSheet, insBasicOverlay));
setupDragDismiss(insPlusSheet, () => closeInsSheet(insPlusSheet, insPlusOverlay));

sheetOverlay.addEventListener('click', closeBookingSheet);

function setupDragDismiss(sheetEl, closeFn) {
  const handle = sheetEl.querySelector('.sheet-handle') || sheetEl.querySelector('.ins-handle');
  if (!handle) return;
  let startY = 0;
  let currentY = 0;
  let dragging = false;
  let moved = false;

  handle.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    currentY = startY;
    dragging = true;
    moved = false;
    sheetEl.style.transition = 'none';
  }, { passive: true });

  handle.addEventListener('touchmove', e => {
    if (!dragging) return;
    currentY = e.touches[0].clientY;
    moved = true;
    const dy = Math.max(0, currentY - startY);
    sheetEl.style.transform = `translateX(-50%) translateY(${dy}px)`;
  }, { passive: true });

  handle.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    sheetEl.style.transition = '';
    const dy = currentY - startY;
    if (dy > 80) {
      sheetEl.style.transform = '';
      closeFn();
    } else if (handle.classList.contains('ins-handle') && (!moved || dy < 5)) {
      // Tap on ins-handle (no significant movement) — close info sheet
      sheetEl.style.transform = '';
      closeFn();
    } else {
      sheetEl.style.transform = '';
      if (sheetEl.classList.contains('open')) {
        sheetEl.style.transform = 'translateX(-50%) translateY(0)';
      }
    }
  }, { passive: true });
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
  mapMarkers.querySelectorAll('.poi-marker').forEach(m => {
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

const MAP_CAT_COLORS = {
  beach: '#ff5a5a', view: '#44dd66', temple: '#ffaa33', nature: '#33cc88',
  market: '#ffd34a', food: '#ff7744', photo: '#55bbff', office: '#BBFF46', top: '#eab308'
};

function renderMapMarkers() {
  const filtered = filterPlaces();
  let html = '';
  filtered.forEach(p => {
    const { x, y } = latLngToSvg(p.lat, p.lng);
    const cat = getDisplayCat(p);
    const color = MAP_CAT_COLORS[cat] || '#6b7280';
    const inRoute = route.some(r => r.id === p.id);
    const routeIdx = route.findIndex(r => r.id === p.id);
    const isOffice = cat === 'office';
    const r = isOffice ? 18 : 16;
    const emoji = p.icon || '';

    html += `<g class="poi-marker ${inRoute ? 'in-route' : ''}" data-id="${p.id}" data-x="${x.toFixed(1)}" data-y="${y.toFixed(1)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})">
      <circle class="poi-glow" r="${r + 10}" fill="${color}" opacity="${inRoute ? '0.35' : '0.15'}"/>
      <circle class="poi-dot" r="${r}" fill="${color}" opacity="${inRoute ? '1' : '0.75'}"
        stroke="${inRoute ? '#BBFF46' : isOffice ? '#BBFF46' : 'rgba(255,255,255,0.3)'}"
        stroke-width="${inRoute ? '2.5' : isOffice ? '2' : '1'}"/>
      <text class="poi-emoji" text-anchor="middle" dominant-baseline="central" font-size="16">${emoji}</text>
      ${isOffice ? `<circle r="${r + 6}" fill="none" stroke="#BBFF46" stroke-width="1.5" opacity="0" class="office-pulse-svg"/>` : ''}
      ${inRoute ? `<circle cx="${r + 2}" cy="${-(r + 2)}" r="8" fill="#BBFF46"/>
      <text x="${r + 2}" y="${-(r - 1)}" text-anchor="middle" font-size="8" font-weight="900" fill="#0A0A0A">${routeIdx + 1}</text>` : ''}
    </g>`;
  });
  mapMarkers.innerHTML = html;

  mapMarkers.querySelectorAll('.poi-marker').forEach(m => {
    m.addEventListener('click', e => {
      e.stopPropagation();
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
    if (e.target.closest('.poi-marker')) return;
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
      if (e.target.closest('.poi-marker')) return;
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

  rsPlaceList.innerHTML = filtered.map(p => {
    const cat = getDisplayCat(p);
    const color = CAT_COLORS[cat] || '#6b7280';
    const inRoute = route.some(r => r.id === p.id);

    return `
      <div class="rs-place-item" data-place="${p.id}">
        <div class="rs-place-icon" style="background:${color}20;color:${color}">${p.icon}</div>
        <div class="rs-place-info">
          <div class="rs-place-name">${placeName(p)}</div>
          <div class="rs-place-desc">${placeDesc(p).slice(0, 60)}...</div>
        </div>
        <button class="rs-place-add ${inRoute ? 'added' : ''}" data-place-add="${p.id}">${inRoute ? '\u2713' : '+'}</button>
      </div>
    `;
  }).join('');

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
  placeSheetTips.style.display = tips.length ? '' : 'none';

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
const KM_FACTOR = 1.35;

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
  // Update badge
  if (route.length > 0) {
    rsBadge.textContent = route.length;
    rsBadge.style.display = 'inline-flex';
  } else {
    rsBadge.style.display = 'none';
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

    // Stops list
    html += `<div class="rs-stops">`;
    route.forEach((p, i) => {
      let numClass = '';
      if (i === 0) numClass = 'first';
      else if (i === route.length - 1) numClass = 'last';
      html += `<div class="rs-stop" draggable="true">
        <span class="rs-stop-grip">⠿</span>
        <span class="rs-stop-num ${numClass}">${i + 1}</span>
        <span class="rs-stop-name">${placeName(p)}</span>
        <button class="rs-stop-remove" data-remove="${p.id}">&times;</button>
      </div>`;
    });
    html += `</div>`;

    // Stats
    if (stats) {
      html += `<div class="rs-stats">
        <div class="rs-stat"><div class="rs-stat-val">${stats.km}</div><div class="rs-stat-label">${t('statKm')}</div></div>
        <div class="rs-stat"><div class="rs-stat-val">${formatTime(stats.mins, lang)}</div><div class="rs-stat-label">${t('statEnRoute')}</div></div>
        <div class="rs-stat"><div class="rs-stat-val">${stats.fuel}</div><div class="rs-stat-label">${t('statFuel')}</div></div>
      </div>`;

      // Cost comparison
      const taxiCost = Math.round(stats.km * TAXI_RATE_PER_KM);
      html += `<div class="rs-cost">
        <span class="rs-cost-taxi">${t('costTaxiLabel')} ~${taxiCost.toLocaleString()} ฿</span>
        <span>→</span>
        <span class="rs-cost-bike">${t('costBikeLabel')}</span>
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

    // CTA buttons
    if (route.length >= 2) {
      html += `<div class="rs-cta-row">
        <button class="rs-cta-btn cta-share" id="rsShareBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> ${t('shareRoute')}</button>
        <a class="rs-cta-btn cta-gmaps" href="${buildGoogleMapsLink()}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> Maps</a>
      </div>`;

      html += `<div class="rs-rent-cta">
        <div><strong>${t('routeNeedBike')}</strong><br><small>${t('routeNeedBikePrice')}</small></div>
        <button class="btn btn-primary btn-sm" data-goto="bikes">${t('routeRentBtn')}</button>
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
          <button class="rider-answer-btn" data-idx="${i}">${String.fromCharCode(1040 + i)}) ${a}</button>
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
        } else {
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
let bpAnswers = { who: [], experience: null, bikeType: null, priorities: [], destination: [], days: 7, budget: null };

function openBikePicker() {
  bpStep = 0;
  bpAnswers = { who: [], experience: null, bikeType: null, priorities: [], destination: [], days: 7, budget: null };
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

const BP_TOTAL_STEPS = 6;

function updateBpProgress() {
  const pct = Math.min(100, Math.round((bpStep / BP_TOTAL_STEPS) * 100));
  bpProgressFill.style.width = pct + '%';
}

function renderBpStep() {
  updateBpProgress();
  // Determine effective step (skip step 3 for newbie/beginner)
  if (bpStep === 2 && (bpAnswers.experience === 'newbie' || bpAnswers.experience === 'beginner')) {
    bpAnswers.bikeType = 'auto';
    bpStep = 3; // skip to step 4 (priorities)
    updateBpProgress();
  }

  const steps = [renderBpStep1, renderBpStep2, renderBpStep3, renderBpStep4, renderBpStep5, renderBpStep6];
  if (bpStep >= steps.length) {
    renderBpResults();
    return;
  }
  steps[bpStep]();
}

function bpMakeOption(emoji, labelKey, descKey, value) {
  return { emoji, label: t(labelKey), desc: t(descKey), value };
}

function bpRenderMultiStep(question, options, currentSelection, onNext) {
  bpBody.innerHTML = `
    <div class="bp-step">
      <div class="bp-step-question">${question}</div>
      <div class="bp-options">${options.map(o => `
        <div class="bp-option${currentSelection.includes(o.value) ? ' selected' : ''}" data-val="${o.value}">
          <span class="bp-option-emoji">${o.emoji}</span>
          <div class="bp-option-text">
            <div class="bp-option-label">${o.label}</div>
            <div class="bp-option-desc">${o.desc}</div>
          </div>
          <span class="bp-option-check"></span>
        </div>
      `).join('')}</div>
      <button class="bp-next${currentSelection.length > 0 ? ' enabled' : ''}" id="bpNextBtn">${t('bpNext')}</button>
    </div>`;
  bpBody.querySelectorAll('.bp-option').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('selected');
      const selected = [...bpBody.querySelectorAll('.bp-option.selected')].map(e => e.dataset.val);
      onNext.updateSelection(selected);
      const btn = $('bpNextBtn');
      btn.classList.toggle('enabled', selected.length > 0);
    });
  });
  $('bpNextBtn').addEventListener('click', () => {
    const selected = [...bpBody.querySelectorAll('.bp-option.selected')].map(e => e.dataset.val);
    if (selected.length === 0) return;
    onNext.commit(selected);
    bpStep++;
    renderBpStep();
  });
}

function bpRenderSingleStep(question, options, currentValue, onCommit) {
  bpBody.innerHTML = `
    <div class="bp-step">
      <div class="bp-step-question">${question}</div>
      <div class="bp-options">${options.map(o => `
        <div class="bp-option${currentValue === o.value ? ' selected' : ''}" data-val="${o.value}">
          <span class="bp-option-emoji">${o.emoji}</span>
          <div class="bp-option-text">
            <div class="bp-option-label">${o.label}</div>
            <div class="bp-option-desc">${o.desc}</div>
          </div>
          <span class="bp-option-check"></span>
        </div>
      `).join('')}</div>
    </div>`;
  bpBody.querySelectorAll('.bp-option').forEach(el => {
    el.addEventListener('click', () => {
      bpBody.querySelectorAll('.bp-option').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      onCommit(el.dataset.val);
      setTimeout(() => { bpStep++; renderBpStep(); }, 200);
    });
  });
}

// Step 1 — Who is riding? (multi)
function renderBpStep1() {
  const opts = [
    bpMakeOption('🙋', 'bpSolo', 'bpSoloDesc', 'solo'),
    bpMakeOption('👫', 'bpCouple', 'bpCoupleDesc', 'couple'),
    bpMakeOption('👨‍👩‍👦', 'bpChild', 'bpChildDesc', 'child'),
    bpMakeOption('👩', 'bpGirl', 'bpGirlDesc', 'girl')
  ];
  bpRenderMultiStep(t('bpStep1Q'), opts, bpAnswers.who, {
    updateSelection(sel) { bpAnswers.who = sel; },
    commit(sel) { bpAnswers.who = sel; }
  });
}

// Step 2 — Experience (single)
function renderBpStep2() {
  const opts = [
    bpMakeOption('🐣', 'bpNewbie', 'bpNewbieDesc', 'newbie'),
    bpMakeOption('🌱', 'bpBeginner', 'bpBeginnerDesc', 'beginner'),
    bpMakeOption('✅', 'bpConfident', 'bpConfidentDesc', 'confident'),
    bpMakeOption('🏆', 'bpExpert', 'bpExpertDesc', 'expert')
  ];
  bpRenderSingleStep(t('bpStep2Q'), opts, bpAnswers.experience, val => {
    bpAnswers.experience = val;
  });
}

// Step 3 — Bike type (single, only for confident/expert)
function renderBpStep3() {
  const opts = [
    bpMakeOption('🛵', 'bpAutoOnly', 'bpAutoOnlyDesc', 'auto'),
    bpMakeOption('🏍️', 'bpManualOk', 'bpManualOkDesc', 'any')
  ];
  bpRenderSingleStep(t('bpStep3Q'), opts, bpAnswers.bikeType, val => {
    bpAnswers.bikeType = val;
  });
}

// Step 4 — Priorities (multi)
function renderBpStep4() {
  const opts = [
    bpMakeOption('🪶', 'bpEasy', 'bpEasyDesc', 'easy'),
    bpMakeOption('🛋️', 'bpComfort', 'bpComfortDesc', 'comfort'),
    bpMakeOption('⚡', 'bpSport', 'bpSportDesc', 'sport'),
    bpMakeOption('📸', 'bpStyle', 'bpStyleDesc', 'style'),
    bpMakeOption('💰', 'bpEconomy', 'bpEconomyDesc', 'economy')
  ];
  bpRenderMultiStep(t('bpStep4Q'), opts, bpAnswers.priorities, {
    updateSelection(sel) { bpAnswers.priorities = sel; },
    commit(sel) { bpAnswers.priorities = sel; }
  });
}

// Step 5 — Destination (multi)
function renderBpStep5() {
  const opts = [
    bpMakeOption('🏖️', 'bpBeach', 'bpBeachDesc', 'beach'),
    bpMakeOption('🌴', 'bpIsland', 'bpIslandDesc', 'island'),
    bpMakeOption('⛰️', 'bpMountain', 'bpMountainDesc', 'mountain'),
    bpMakeOption('🧭', 'bpBeyond', 'bpBeyondDesc', 'beyond')
  ];
  bpRenderMultiStep(t('bpStep5Q'), opts, bpAnswers.destination, {
    updateSelection(sel) { bpAnswers.destination = sel; },
    commit(sel) { bpAnswers.destination = sel; }
  });
}

// Step 6 — Days + Budget
function renderBpStep6() {
  const budgets = [
    { key: null, label: t('bpBudgetAll'), emoji: '🔘' },
    { key: 'economy', label: t('bpBudgetEconomy'), emoji: '💚' },
    { key: 'comfort', label: t('bpBudgetComfort'), emoji: '💙' },
    { key: 'premium', label: t('bpBudgetPremium'), emoji: '💜' }
  ];
  const cheapest = BIKES.reduce((min, b) => {
    const p = getTotalPrice(b, bpAnswers.days);
    return p < min ? p : min;
  }, Infinity);

  bpBody.innerHTML = `
    <div class="bp-step">
      <div class="bp-step-question">${t('bpStep6Q')}</div>
      <div class="bp-slider-row">
        <div class="bp-slider-label">
          <span id="bpDaysLabel">${bpAnswers.days} ${t('bpDays')}</span>
          <span id="bpTotalPreviewLabel">${t('bpTotalFrom')} ${cheapest.toLocaleString()} ฿</span>
        </div>
        <input type="range" class="bp-slider" id="bpDaySlider" min="1" max="30" value="${bpAnswers.days}">
      </div>
      <div class="bp-budget-row">${budgets.map(b => `
        <button class="bp-budget-btn${bpAnswers.budget === b.key ? ' active' : ''}${b.key === null && bpAnswers.budget === null ? ' active' : ''}" data-budget="${b.key || ''}">
          <span class="bp-budget-emoji">${b.emoji}</span>${b.label}
        </button>
      `).join('')}</div>
      <button class="bp-next enabled" id="bpNextBtn">${t('bpNext')}</button>
    </div>`;

  const slider = $('bpDaySlider');
  function updateStep6() {
    const days = parseInt(slider.value);
    bpAnswers.days = days;
    $('bpDaysLabel').textContent = days + ' ' + t('bpDays');
    const filtered = bpAnswers.budget ? BIKES.filter(b => b.budgetGroup === bpAnswers.budget) : BIKES;
    const min = filtered.reduce((m, b) => { const p = getTotalPrice(b, days); return p < m ? p : m; }, Infinity);
    $('bpTotalPreviewLabel').textContent = t('bpTotalFrom') + ' ' + min.toLocaleString() + ' ฿';
  }
  slider.addEventListener('input', updateStep6);

  bpBody.querySelectorAll('.bp-budget-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bpBody.querySelectorAll('.bp-budget-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.budget;
      bpAnswers.budget = val || null;
      updateStep6();
    });
  });

  $('bpNextBtn').addEventListener('click', () => {
    bpStep++;
    renderBpStep();
  });
}

// Scoring & Results
function scoreBikes() {
  const a = bpAnswers;
  // Map answer values to score keys
  const whoMap = { solo: 'solo', couple: 'couple', child: 'child', girl: 'girl' };
  const prioMap = { easy: 'easy', comfort: 'comfort', sport: 'sport', style: 'style', economy: 'economy' };
  const destMap = { beach: 'beach', island: 'island', mountain: 'mountain', beyond: 'beyond' };

  let candidates = BIKES.filter(b => {
    // Filter by transmission
    if (a.bikeType === 'auto' && b.transmission === 'manual') return false;
    // Filter by budget
    if (a.budget && b.budgetGroup !== a.budget) return false;
    return true;
  });

  return candidates.map(bike => {
    let score = 0;
    const s = bike.scores;
    // Who
    a.who.forEach(w => { if (whoMap[w] && s[whoMap[w]]) score += s[whoMap[w]]; });
    // Priorities
    a.priorities.forEach(p => { if (prioMap[p] && s[prioMap[p]]) score += s[prioMap[p]]; });
    // Destinations
    a.destination.forEach(d => { if (destMap[d] && s[destMap[d]]) score += s[destMap[d]]; });

    // Bonus: "Драйв" + "Комфорт" without "Лёгкость" → premium maxi bonus
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

function renderBpResults() {
  updateBpProgress();
  bpProgressFill.style.width = '100%';
  const results = scoreBikes();
  const days = bpAnswers.days;
  const emoji = { scooter: '🛵', maxi: '🏍', moto: '🏍' };

  bpBody.innerHTML = `
    <div class="bp-results">
      <div class="bp-results-title">${t('bpResultTitle')}</div>
      <div class="bp-results-sub">${t('bpResultSub')}</div>
      ${results.map((r, i) => {
        const b = r.bike;
        const perDay = getPricePerDay(b, days);
        const total = getTotalPrice(b, days);
        const whyText = b.why[lang] || b.why.en;
        const transType = b.transmission === 'auto' ? t('bpAutoType') : t('bpManualType');
        return `
        <div class="bp-result-card" data-bike-id="${b.id}">
          ${i === 0 ? `<div class="bp-result-badge">${t('bpBestChoice')}</div>` : ''}
          <div class="bp-result-header">
            <div class="bp-result-emoji cat-${b.category}">${emoji[b.category] || '🛵'}</div>
            <div>
              <div class="bp-result-name">${b.name}</div>
              <div class="bp-result-cc">${b.cc} cc · ${transType}</div>
            </div>
          </div>
          <div class="bp-result-why">${whyText}</div>
          <div class="bp-result-tags">${(b.tags || []).map(tag => `<span class="bp-result-tag">${tag}</span>`).join('')}</div>
          <div class="bp-result-price">
            <span class="bp-result-perday">${perDay} ${t('bpPerDay')}</span>
            <span class="bp-result-total">${t('bpTotalFor')} ${days} ${t('bpDaysUnit')}: ${total.toLocaleString()} ฿</span>
          </div>
          <button class="bp-result-rent" data-rent-id="${b.id}">${t('bpRent')}</button>
        </div>`;
      }).join('')}
      <button class="bp-restart" id="bpRestartBtn">${t('bpRestart')}</button>
    </div>`;

  // Rent button handlers
  bpBody.querySelectorAll('.bp-result-rent').forEach(btn => {
    btn.addEventListener('click', () => {
      const bike = BIKES.find(b => b.id === btn.dataset.rentId);
      if (bike) {
        closeBikePicker();
        switchTab('bikes');
        openBookingSheet(bike);
      }
    });
  });

  // Restart
  $('bpRestartBtn').addEventListener('click', () => {
    bpStep = 0;
    bpAnswers = { who: [], experience: null, bikeType: null, priorities: [], destination: [], days: 7, budget: null };
    renderBpStep();
  });
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

drawIslandMap();
initMapPanZoom();
applyTranslations();

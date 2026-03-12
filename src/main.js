// ThaiGo Lite — Main app logic with i18n
import './styles/reset.css';
import './styles/tokens.css';
import './styles/app.css';
import './components/bottom-tab-bar.css';
import './components/booking-sheet.css';
import './components/rider-test.css';
import './components/routes-map.css';
import { BIKES, BIKE_CATEGORIES } from './data/bikes.js';
import { PLACES, CAT_COLORS, getDisplayCat, MAX_ROUTE_POINTS } from './data/places.js';
import { calcStats, formatTime, haversine, TAXI_RATE_PER_KM } from './utils/stats.js';
import { LANGS, detectLang, saveLang, T, translateFeature, BIKE_CAT_TR } from './data/i18n.js';
import { PLACE_TR } from './data/place-translations.js';
import { RIDER_QUESTIONS, CONFETTI_EMOJIS } from './data/rider-test.js';

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

// ══════════════════════════════════════════════
// DOM refs
// ══════════════════════════════════════════════
const $ = id => document.getElementById(id);
const pages = document.querySelectorAll('.page');
const tabs = document.querySelectorAll('.tab-bar .tab');

const bikeGrid = $('bikeGrid');
const bikeFiltersEl = $('bikeFilters');
const popularScroll = $('popularScroll');

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

  // Hero
  document.querySelector('.hero-h1').innerHTML = t('heroTitle');
  document.querySelector('.hero-sub').innerHTML = t('heroSub');

  // Why ThaiGo
  const whyTitle = document.querySelector('#page-home .section-title');
  if (whyTitle) whyTitle.textContent = t('whyTitle');
  const whyTexts = document.querySelectorAll('.why-text');
  const whyKeys = ['whyNoDeposit', 'whyDelivery', 'whyPrice', 'whySupport', 'whyReplace', 'whyContract'];
  whyTexts.forEach((el, i) => { if (whyKeys[i]) el.textContent = t(whyKeys[i]); });

  // Popular bikes section
  const popHeader = document.querySelector('#page-home .section-header .section-title');
  if (popHeader) popHeader.textContent = t('popularTitle');
  const viewAllBtn = document.querySelector('#page-home .section-link');
  if (viewAllBtn) viewAllBtn.innerHTML = t('viewAll');

  // Delivery section
  const delivTitle = document.querySelectorAll('#page-home .section-title');
  if (delivTitle[2]) delivTitle[2].textContent = t('deliveryTitle');
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
  const bikeFilterKeys = ['filterAll', 'filterScooter', 'filterMaxi', 'filterMoto', 'filterCar'];
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
function switchTab(tab) {
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

// Handle drag
{
  let startY = 0, startTranslate = 0, isDragging = false;
  function getTranslateY() {
    const style = window.getComputedStyle(routeSheet);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m42;
  }
  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startY = e.touches[0].clientY;
    startTranslate = getTranslateY();
    routeSheet.classList.add('sheet-dragging');
  }
  function onTouchMove(e) {
    if (!isDragging) return;
    const dy = e.touches[0].clientY - startY;
    const h = routeSheet.offsetHeight;
    const newY = Math.max(0, Math.min(h - 40, startTranslate + dy));
    routeSheet.style.transform = 'translateY(' + newY + 'px)';
    e.preventDefault();
  }
  function onTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    routeSheet.classList.remove('sheet-dragging');
    routeSheet.style.transform = '';
    const dy = e.changedTouches[0].clientY - startY;
    const threshold = 60;
    if (dy < -threshold) {
      if (rsState === 'collapsed') setSheetState('half');
      else if (rsState === 'half') setSheetState('expanded');
    } else if (dy > threshold) {
      if (rsState === 'expanded') setSheetState('half');
      else if (rsState === 'half') setSheetState('collapsed');
    }
  }
  rsHandle.addEventListener('touchstart', onTouchStart, { passive: true });
  rsTabs.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd, { passive: true });
  rsHandle.addEventListener('click', toggleSheet);

  // Pull-down from content when scrolled to top
  rsContent.addEventListener('touchstart', (e) => {
    if (rsContent.scrollTop > 0 || rsState === 'collapsed') return;
    const touchY = e.touches[0].clientY;
    let moved = false;
    const moveH = (ev) => {
      const dy = ev.touches[0].clientY - touchY;
      if (!moved && dy > 10) { moved = true; onTouchStart(e); }
      if (moved) onTouchMove(ev);
    };
    const endH = (ev) => {
      document.removeEventListener('touchmove', moveH);
      document.removeEventListener('touchend', endH);
      if (moved) onTouchEnd(ev);
    };
    document.addEventListener('touchmove', moveH, { passive: false });
    document.addEventListener('touchend', endH, { passive: true });
  }, { passive: true });
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
      <div class="bike-card-img cat-${b.category}">${BIKE_EMOJI[b.category] || '\u{1F6F5}'}</div>
      <div class="bike-card-body">
        <div class="bike-card-name">${b.name}</div>
        <div class="bike-card-cc">${b.cc} cc</div>
        <div class="bike-card-footer">
          <span class="bike-card-price">${t('priceFrom')} ${b.prices.day7} \u0E3F</span>
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
// Popular bikes on home page
// ══════════════════════════════════════════════
function renderPopular() {
  const popular = BIKES.filter(b => b.popular);
  popularScroll.innerHTML = popular.map(b => `
    <div class="popular-card" data-bike="${b.id}">
      <div class="popular-card-img cat-${b.category}" style="background: linear-gradient(135deg, ${b.category === 'scooter' ? '#eef2ff, #dbeafe' : b.category === 'maxi' ? '#d1fae5, #e0f2fe' : '#fef3c7, #fde68a'})">${BIKE_EMOJI[b.category] || '\u{1F6F5}'}</div>
      <div class="popular-card-body">
        <div class="popular-card-name">${b.name}</div>
        <div class="popular-card-price">${t('priceFrom')} ${b.prices.day7} \u0E3F${t('perDay')}</div>
      </div>
    </div>
  `).join('');

  popularScroll.querySelectorAll('.popular-card').forEach(card => {
    card.addEventListener('click', () => {
      const bike = BIKES.find(b => b.id === card.dataset.bike);
      if (bike) {
        switchTab('bikes');
        openBookingSheet(bike);
      }
    });
  });
}

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

  sheetP1.textContent = bike.prices.day1 + ' \u0E3F';
  sheetP3.textContent = bike.prices.day3 + ' \u0E3F';
  sheetP7.textContent = bike.prices.day7 + ' \u0E3F';
  sheetP14.textContent = bike.prices.day14 + ' \u0E3F';
  sheetPM.textContent = bike.prices.month + ' \u0E3F';

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
  if (days >= 30) return bike.prices.month / 30;
  if (days >= 14) return bike.prices.day14;
  if (days >= 7) return bike.prices.day7;
  if (days >= 3) return bike.prices.day3;
  return bike.prices.day1;
}

function getTierName(days) {
  if (days >= 30) return 'month';
  if (days >= 14) return 'day14';
  if (days >= 7) return 'day7';
  if (days >= 3) return 'day3';
  return 'day1';
}

function updateSheetCalc() {
  if (!sheetBike) return;
  const daysEl = $('sheetDays');
  if (daysEl) daysEl.textContent = sheetDays;

  const perDay = getPerDay(sheetBike, sheetDays);
  const total = sheetDays >= 30
    ? sheetBike.prices.month
    : Math.round(perDay * sheetDays);

  const totalEl = document.querySelector('.sheet-total');
  if (totalEl) totalEl.innerHTML = `${t('sheetTotal')} <strong id="sheetTotal">${total.toLocaleString()} \u0E3F</strong>`;

  const tierName = getTierName(sheetDays);
  const tds = document.querySelectorAll('.sheet-price-table td');
  const tierMap = ['day1', 'day3', 'day7', 'day14', 'month'];
  tds.forEach((td, i) => {
    td.classList.toggle('active-tier', tierMap[i] === tierName);
  });

  const msg = encodeURIComponent(tpl('waMsgBike', { name: sheetBike.name, days: sheetDays }));
  sheetWa.href = `https://wa.me/66822545737?text=${msg}`;
  sheetTg.href = `https://t.me/ThaiGoSale1`;
}

sheetDaySlider.addEventListener('input', () => {
  sheetDays = parseInt(sheetDaySlider.value);
  updateSheetCalc();
});

sheetOverlay.addEventListener('click', closeBookingSheet);

function setupDragDismiss(sheetEl, closeFn) {
  const handle = sheetEl.querySelector('.sheet-handle');
  if (!handle) return;
  let startY = 0;
  let currentY = 0;
  let dragging = false;

  handle.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    dragging = true;
    sheetEl.style.transition = 'none';
  }, { passive: true });

  handle.addEventListener('touchmove', e => {
    if (!dragging) return;
    currentY = e.touches[0].clientY;
    const dy = Math.max(0, currentY - startY);
    sheetEl.style.transform = `translateX(-50%) translateY(${dy}px)`;
  }, { passive: true });

  handle.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    sheetEl.style.transition = '';
    const dy = currentY - startY;
    if (dy > 80) {
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
// SVG Map — coordinate conversion & markers
// ══════════════════════════════════════════════
const MAP_BOUNDS = {
  latMin: 7.75, latMax: 8.18,
  lngMin: 98.24, lngMax: 98.44,
  svgW: 400, svgH: 700,
  padTop: 30, padBottom: 30, padLeft: 20, padRight: 20
};

function latLngToSvg(lat, lng) {
  const { latMin, latMax, lngMin, lngMax, svgW, svgH, padTop, padBottom, padLeft, padRight } = MAP_BOUNDS;
  const x = padLeft + ((lng - lngMin) / (lngMax - lngMin)) * (svgW - padLeft - padRight);
  const y = padTop + ((latMax - lat) / (latMax - latMin)) * (svgH - padTop - padBottom);
  return { x, y };
}

const MAP_CAT_COLORS = {
  beach: '#2563eb', view: '#16a34a', temple: '#d97706', nature: '#059669',
  market: '#9333ea', food: '#dc2626', photo: '#0891b2', office: '#4338ca', top: '#eab308'
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

    html += `<g class="map-marker ${inRoute ? 'in-route' : ''}" data-id="${p.id}" transform="translate(${x},${y})">
      <circle class="marker-dot" r="6" fill="${color}" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" opacity="0.9"/>
      ${inRoute ? `<circle class="marker-badge" cx="6" cy="-6" r="5" fill="#4338ca"/>
      <text x="6" y="-3.5" text-anchor="middle" font-size="6" font-weight="900" fill="#fff">${routeIdx + 1}</text>` : ''}
    </g>`;
  });
  mapMarkers.innerHTML = html;

  // Click handlers
  mapMarkers.querySelectorAll('.map-marker').forEach(m => {
    m.addEventListener('click', () => {
      const place = PLACES.find(p => p.id === m.dataset.id);
      if (place) openPlaceSheet(place);
    });
  });
}

function updateRouteLine() {
  if (route.length < 2) {
    routeLine.setAttribute('points', '');
    return;
  }
  const pts = route.map(p => {
    const { x, y } = latLngToSvg(p.lat, p.lng);
    return `${x},${y}`;
  }).join(' ');
  routeLine.setAttribute('points', pts);
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

applyTranslations();

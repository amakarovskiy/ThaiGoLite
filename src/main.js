// ThaiGo Lite — Main app logic with i18n
import './styles/reset.css';
import './styles/tokens.css';
import './styles/app.css';
import './components/bottom-tab-bar.css';
import './components/booking-sheet.css';
import './components/rider-test.css';
import { BIKES, BIKE_CATEGORIES } from './data/bikes.js';
import { PLACES, CAT_COLORS, getDisplayCat, MAX_ROUTE_POINTS } from './data/places.js';
import { calcStats, formatTime, TAXI_RATE_PER_KM } from './utils/stats.js';
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

const placeList = $('placeList');
const placeFiltersEl = $('placeFilters');
const placeSearchInput = $('placeSearch');
const routeStops = $('routeStops');
const routeEmpty = $('routeEmpty');
const routeStats = $('routeStats');
const routeCount = $('routeCount');
const routeBadge = $('routeBadge');
const costRow = $('costRow');
const routeCtaBlock = $('routeCtaBlock');
const routeRentCta = $('routeRentCta');

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
  const districtChips = document.querySelectorAll('.district-chip');
  const districtNames = T.districts[lang] || T.districts.en;
  districtChips.forEach((el, i) => { if (districtNames[i]) el.textContent = districtNames[i]; });
  const distNote = document.querySelector('.districts-note');
  if (distNote) distNote.textContent = t('deliveryNote');

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

  // Place filters
  const placeFilterChips = placeFiltersEl.querySelectorAll('.filter-chip');
  const placeFilterKeys = ['placeTop', 'filterAll', 'placeBeach', 'placeView', 'placeTemple', 'placeNature', 'placeMarket', 'placeFood', 'placePhoto'];
  placeFilterChips.forEach((el, i) => { if (placeFilterKeys[i]) el.textContent = t(placeFilterKeys[i]); });

  // Search placeholder
  placeSearchInput.placeholder = t('placeSearchPlaceholder');

  // Route subtabs
  const subtabs = document.querySelectorAll('.route-subtab');
  if (subtabs[0]) {
    subtabs[0].textContent = t('subtabPlaces');
  }
  if (subtabs[1]) {
    subtabs[1].innerHTML = `${t('subtabRoute')} <span class="route-badge" id="routeBadge" style="${route.length ? '' : 'display:none'}">${route.length}</span>`;
  }

  // Route panel
  const routeHeader = document.querySelector('.route-header span');
  if (routeHeader) routeHeader.innerHTML = `${t('routeLabel')} <span class="route-count" id="routeCount">${route.length}</span>/12`;
  $('routeClear').textContent = t('routeReset');
  routeEmpty.textContent = t('routeEmpty');

  // Stat labels
  const statLabels = document.querySelectorAll('.stat-label');
  const statLabelKeys = ['statKm', 'statEnRoute', 'statFuel'];
  statLabels.forEach((el, i) => { if (statLabelKeys[i]) el.textContent = t(statLabelKeys[i]); });

  // Cost bike label
  const costBike = document.querySelector('.cost-bike');
  if (costBike) costBike.textContent = t('costBikeLabel');

  // Route rent CTA
  const rentCtaStrong = routeRentCta.querySelector('strong');
  const rentCtaSmall = routeRentCta.querySelector('small');
  if (rentCtaStrong) rentCtaStrong.textContent = t('routeNeedBike');
  if (rentCtaSmall) rentCtaSmall.textContent = t('routeNeedBikePrice');
  const rentBtn = routeRentCta.querySelector('.btn');
  if (rentBtn) rentBtn.textContent = t('routeRentBtn');

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
  const grid = document.querySelector('.contacts-page .delivery-grid');
  if (!grid) return;
  const areas = T.deliveryAreas[lang] || T.deliveryAreas.en;
  grid.innerHTML = areas.map(a =>
    `<div class="delivery-item"><strong>${a.name}</strong><br><small>${a.note}</small></div>`
  ).join('');
  const areaTitle = document.querySelector('.contacts-page .section-title');
  // delivery areas title is the first section-title in contacts after the main title
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
// Route subtabs
// ══════════════════════════════════════════════
document.querySelectorAll('.route-subtab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.route-subtab').forEach(b => b.classList.remove('route-subtab--active'));
    btn.classList.add('route-subtab--active');
    document.querySelectorAll('.subtab').forEach(s => s.classList.remove('subtab--active'));
    const target = $(`subtab-${btn.dataset.subtab}`);
    if (target) target.classList.add('subtab--active');
  });
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
      <div class="popular-card-img cat-${b.category}" style="background: linear-gradient(135deg, ${b.category === 'scooter' ? '#e8f8f7, #dbeafe' : b.category === 'maxi' ? '#d1fae5, #ccfbf1' : '#fef3c7, #fde68a'})">${BIKE_EMOJI[b.category] || '\u{1F6F5}'}</div>
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
function openBookingSheet(bike) {
  sheetBike = bike;
  sheetDays = 3;

  sheetBikeImg.className = `sheet-bike-img cat-${bike.category}`;
  sheetBikeImg.textContent = BIKE_EMOJI[bike.category] || '\u{1F6F5}';
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
// Place list
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

  placeList.innerHTML = filtered.map(p => {
    const cat = getDisplayCat(p);
    const color = CAT_COLORS[cat] || '#6b7280';
    const inRoute = route.some(r => r.id === p.id);

    return `
      <div class="place-card" data-place="${p.id}">
        <div class="place-icon" style="background:${color}20;color:${color}">${p.icon}</div>
        <div class="place-info">
          <div class="place-name">${placeName(p)}</div>
          <div class="place-desc">${placeDesc(p).slice(0, 60)}...</div>
        </div>
        <button class="place-add-btn ${inRoute ? 'added' : ''}" data-place-add="${p.id}">${inRoute ? '\u2713' : '+'}</button>
      </div>
    `;
  }).join('');

  placeList.querySelectorAll('.place-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.place-add-btn')) return;
      const place = PLACES.find(p => p.id === card.dataset.place);
      if (place) openPlaceSheet(place);
    });
  });

  placeList.querySelectorAll('.place-add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const place = PLACES.find(p => p.id === btn.dataset.placeAdd);
      if (place) toggleRoute(place);
    });
  });
}

placeFiltersEl.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  placeFilter = chip.dataset.cat;
  placeFiltersEl.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('filter-chip--active', c.dataset.cat === placeFilter)
  );
  renderPlaces();
});

placeSearchInput.addEventListener('input', () => {
  placeSearch = placeSearchInput.value;
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

function updateRoute() {
  // Update badge refs (may have been recreated by applyTranslations)
  const rc = $('routeCount');
  const rb = $('routeBadge');

  if (rc) rc.textContent = route.length;
  if (route.length > 0) {
    if (rb) { rb.textContent = route.length; rb.style.display = 'inline-flex'; }
  } else {
    if (rb) rb.style.display = 'none';
  }

  if (route.length === 0) {
    routeEmpty.style.display = '';
    routeStops.querySelectorAll('.route-stop').forEach(s => s.remove());
    routeStats.style.display = 'none';
    costRow.style.display = 'none';
    routeCtaBlock.style.display = 'none';
    routeRentCta.style.display = 'none';
    return;
  }

  routeEmpty.style.display = 'none';

  const stopsHTML = route.map((p, i) => {
    let numClass = '';
    if (i === 0) numClass = 'first';
    else if (i === route.length - 1) numClass = 'last';
    return `
      <div class="route-stop">
        <span class="stop-num ${numClass}">${i + 1}</span>
        <span class="stop-name">${placeName(p)}</span>
        <button class="stop-remove" data-remove="${p.id}">&times;</button>
      </div>
    `;
  }).join('');

  routeStops.querySelectorAll('.route-stop').forEach(s => s.remove());
  routeStops.insertAdjacentHTML('beforeend', stopsHTML);

  routeStops.querySelectorAll('.stop-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromRoute(btn.dataset.remove));
  });

  if (route.length >= 2) {
    const stats = calcStats(route);
    $('statKm').textContent = stats.km;
    $('statTime').textContent = formatTime(stats.mins, lang);
    $('statFuel').textContent = stats.fuel;
    routeStats.style.display = '';

    const taxiCost = Math.round(stats.km * TAXI_RATE_PER_KM);
    $('costTaxi').textContent = taxiCost.toLocaleString();
    costRow.style.display = '';

    const routeNames = route.map(r => placeName(r)).join(' \u2192 ');
    const msg = encodeURIComponent(tpl('waMsgRoute', { route: routeNames, km: stats.km }));
    $('routeWa').href = `https://wa.me/66822545737?text=${msg}`;
    $('routeTg').href = `https://t.me/ThaiGoSale1`;
    routeCtaBlock.style.display = '';
    routeRentCta.style.display = '';
  } else {
    routeStats.style.display = 'none';
    costRow.style.display = 'none';
    routeCtaBlock.style.display = 'none';
    routeRentCta.style.display = 'none';
  }
}

$('routeClear').addEventListener('click', () => {
  route = [];
  updateRoute();
  renderPlaces();
  showToast(t('routeCleared'));
});

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
applyTranslations();

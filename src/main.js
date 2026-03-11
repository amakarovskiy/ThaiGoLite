// ThaiGo Lite — Main app logic
import './styles/reset.css';
import './styles/tokens.css';
import './styles/app.css';
import './components/bottom-tab-bar.css';
import './components/booking-sheet.css';
import { BIKES, BIKE_CATEGORIES } from './data/bikes.js';
import { PLACES, CAT_COLORS, getDisplayCat, MAX_ROUTE_POINTS } from './data/places.js';
import { calcStats, formatTime, TAXI_RATE_PER_KM } from './utils/stats.js';

// ══════════════════════════════════════════════
// State
// ══════════════════════════════════════════════
let currentTab = 'home';
let bikeFilter = 'all';
let placeFilter = 'top';
let placeSearch = '';
let route = [];         // array of place objects
let sheetBike = null;   // currently open bike in sheet
let sheetDays = 3;

// ══════════════════════════════════════════════
// DOM refs
// ══════════════════════════════════════════════
const $ = id => document.getElementById(id);
const pages = document.querySelectorAll('.page');
const tabs = document.querySelectorAll('.tab-bar .tab');

// Bike page
const bikeGrid = $('bikeGrid');
const bikeFiltersEl = $('bikeFilters');
const popularScroll = $('popularScroll');

// Route page
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

// Booking sheet
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

// Place sheet
const placeSheet = $('placeSheet');
const placeSheetIcon = $('placeSheetIcon');
const placeSheetName = $('placeSheetName');
const placeSheetKm = $('placeSheetKm');
const placeSheetDesc = $('placeSheetDesc');
const placeSheetTips = $('placeSheetTips');
const placeSheetAdd = $('placeSheetAdd');

// ══════════════════════════════════════════════
// Tab switching
// ══════════════════════════════════════════════
function switchTab(tab) {
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

// "Все →" link on home page
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
const BIKE_EMOJI = { scooter: '🛵', maxi: '🏍', moto: '🏍', car: '🚗' };

// ══════════════════════════════════════════════
// Render bike catalog
// ══════════════════════════════════════════════
function renderBikes() {
  const filtered = bikeFilter === 'all'
    ? BIKES
    : BIKES.filter(b => b.category === bikeFilter);

  bikeGrid.innerHTML = filtered.map(b => `
    <div class="bike-card" data-bike="${b.id}">
      <div class="bike-card-img cat-${b.category}">${BIKE_EMOJI[b.category] || '🛵'}</div>
      <div class="bike-card-body">
        <div class="bike-card-name">${b.name}</div>
        <div class="bike-card-cc">${b.cc} cc</div>
        <div class="bike-card-footer">
          <span class="bike-card-price">от ${b.prices.day7} &#3647;</span>
          <button class="bike-card-btn">Взять</button>
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

// Bike filter chips
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
      <div class="popular-card-img cat-${b.category}" style="background: linear-gradient(135deg, ${b.category === 'scooter' ? '#e0f2fe, #bae6fd' : b.category === 'maxi' ? '#ccfbf1, #99f6e4' : '#fef3c7, #fde68a'})">${BIKE_EMOJI[b.category] || '🛵'}</div>
      <div class="popular-card-body">
        <div class="popular-card-name">${b.name}</div>
        <div class="popular-card-price">от ${b.prices.day7} &#3647;/день</div>
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

  // Set header
  sheetBikeImg.className = `sheet-bike-img cat-${bike.category}`;
  sheetBikeImg.textContent = BIKE_EMOJI[bike.category] || '🛵';
  sheetBikeName.textContent = bike.name;
  sheetBikeCc.textContent = `${bike.cc} cc — ${BIKE_CATEGORIES[bike.category] || bike.category}`;

  // Features
  sheetFeatures.innerHTML = bike.features.map(f =>
    `<span class="sheet-feature-tag">${f}</span>`
  ).join('');

  // Pricing table
  sheetP1.textContent = bike.prices.day1 + ' ฿';
  sheetP3.textContent = bike.prices.day3 + ' ฿';
  sheetP7.textContent = bike.prices.day7 + ' ฿';
  sheetP14.textContent = bike.prices.day14 + ' ฿';
  sheetPM.textContent = bike.prices.month + ' ฿';

  // Slider
  sheetDaySlider.value = sheetDays;
  updateSheetCalc();

  // Open
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
  sheetDaysDisplay.textContent = sheetDays;

  const perDay = getPerDay(sheetBike, sheetDays);
  const total = sheetDays >= 30
    ? sheetBike.prices.month
    : Math.round(perDay * sheetDays);
  sheetTotal.textContent = total.toLocaleString() + ' ฿';

  // Highlight active tier
  const tierName = getTierName(sheetDays);
  const tds = document.querySelectorAll('.sheet-price-table td');
  const tierMap = ['day1', 'day3', 'day7', 'day14', 'month'];
  tds.forEach((td, i) => {
    td.classList.toggle('active-tier', tierMap[i] === tierName);
  });

  // WA/TG links
  const msg = encodeURIComponent(`Хочу арендовать ${sheetBike.name} на ${sheetDays} дн.`);
  sheetWa.href = `https://wa.me/66822545737?text=${msg}`;
  sheetTg.href = `https://t.me/ThaiGoSale1`;
}

sheetDaySlider.addEventListener('input', () => {
  sheetDays = parseInt(sheetDaySlider.value);
  updateSheetCalc();
});

sheetOverlay.addEventListener('click', closeBookingSheet);

// Touch-to-dismiss on sheet handle
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

  // Category filter
  if (placeFilter === 'top') {
    filtered = filtered.filter(p => p.cat.includes('top'));
  } else if (placeFilter !== 'all') {
    filtered = filtered.filter(p => p.cat.includes(placeFilter));
  }

  // Search
  if (placeSearch.trim()) {
    const q = placeSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
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
          <div class="place-name">${p.name}</div>
          <div class="place-desc">${p.desc.slice(0, 60)}...</div>
        </div>
        <button class="place-add-btn ${inRoute ? 'added' : ''}" data-place-add="${p.id}">${inRoute ? '✓' : '+'}</button>
      </div>
    `;
  }).join('');

  // Click on card → open place sheet
  placeList.querySelectorAll('.place-card').forEach(card => {
    card.addEventListener('click', e => {
      // If clicked on add button, handle separately
      if (e.target.closest('.place-add-btn')) return;
      const place = PLACES.find(p => p.id === card.dataset.place);
      if (place) openPlaceSheet(place);
    });
  });

  // Click on + button → toggle in route
  placeList.querySelectorAll('.place-add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const place = PLACES.find(p => p.id === btn.dataset.placeAdd);
      if (place) toggleRoute(place);
    });
  });
}

// Place filter chips
placeFiltersEl.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  placeFilter = chip.dataset.cat;
  placeFiltersEl.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('filter-chip--active', c.dataset.cat === placeFilter)
  );
  renderPlaces();
});

// Search
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
  placeSheetName.textContent = place.name;
  placeSheetKm.textContent = place.km_from_patong
    ? `~${place.km_from_patong} км от Патонга`
    : '';
  placeSheetDesc.textContent = place.desc;

  const tips = [];
  if (place.tips) tips.push(place.tips);
  if (place.warnings && place.warnings.length) tips.push('⚠ ' + place.warnings.join('. '));
  placeSheetTips.textContent = tips.join('\n');
  placeSheetTips.style.display = tips.length ? '' : 'none';

  const inRoute = route.some(r => r.id === place.id);
  placeSheetAdd.textContent = inRoute ? '✓ В маршруте' : '+ В маршрут';

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

// Make overlay close whichever sheet is open
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
    showToast(`${place.name} убран`);
  } else {
    if (route.length >= MAX_ROUTE_POINTS) {
      showToast(`Максимум ${MAX_ROUTE_POINTS} точек`, 'warning');
      return;
    }
    route.push(place);
    showToast(`${place.name} добавлен`);
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
  // Badge
  routeCount.textContent = route.length;
  if (route.length > 0) {
    routeBadge.textContent = route.length;
    routeBadge.style.display = 'inline-flex';
  } else {
    routeBadge.style.display = 'none';
  }

  // Stops list
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

  // Render stops
  const stopsHTML = route.map((p, i) => {
    let numClass = '';
    if (i === 0) numClass = 'first';
    else if (i === route.length - 1) numClass = 'last';
    return `
      <div class="route-stop">
        <span class="stop-num ${numClass}">${i + 1}</span>
        <span class="stop-name">${p.name}</span>
        <button class="stop-remove" data-remove="${p.id}">&times;</button>
      </div>
    `;
  }).join('');

  // Keep routeEmpty, replace stops
  routeStops.querySelectorAll('.route-stop').forEach(s => s.remove());
  routeStops.insertAdjacentHTML('beforeend', stopsHTML);

  // Remove buttons
  routeStops.querySelectorAll('.stop-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromRoute(btn.dataset.remove));
  });

  // Stats
  if (route.length >= 2) {
    const stats = calcStats(route);
    $('statKm').textContent = stats.km;
    $('statTime').textContent = formatTime(stats.mins);
    $('statFuel').textContent = stats.fuel;
    routeStats.style.display = '';

    // Taxi cost comparison
    const taxiCost = Math.round(stats.km * TAXI_RATE_PER_KM);
    $('costTaxi').textContent = taxiCost.toLocaleString();
    costRow.style.display = '';

    // CTA
    const routeNames = route.map(r => r.name).join(' → ');
    const msg = encodeURIComponent(`Хочу арендовать байк для маршрута: ${routeNames} (~${stats.km} км)`);
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

// Clear route
$('routeClear').addEventListener('click', () => {
  route = [];
  updateRoute();
  renderPlaces();
  showToast('Маршрут сброшен');
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
// Init
// ══════════════════════════════════════════════
renderBikes();
renderPopular();
renderPlaces();
updateRoute();

// ThaiGo Lite — Mobile-first booking app

const PRICES = {
  phuket: 1200,
  chiangmai: 800,
  bangkok: 1500,
  krabi: 900,
};

const NAMES = {
  phuket: 'Пхукет',
  chiangmai: 'Чианг Май',
  bangkok: 'Бангкок',
  krabi: 'Краби',
};

// State
let currentTab = 'home';
let sheetOpen = false;
let guestCount = 2;
let selectedDestination = null;

// DOM refs
const pages = document.querySelectorAll('.page');
const tabItems = document.querySelectorAll('.tab-item[data-tab]');
const bookBtn = document.querySelector('[data-action="book"]');
const sheet = document.getElementById('bookingSheet');
const overlay = document.getElementById('bookingOverlay');
const sheetTitle = document.getElementById('sheetTitle');
const sheetDescription = document.getElementById('sheetDescription');
const guestDisplay = document.getElementById('guestCount');
const summaryDest = document.getElementById('summaryDestination');
const summaryNights = document.getElementById('summaryNights');
const summaryTotal = document.getElementById('summaryTotal');
const checkinInput = document.getElementById('checkinDate');
const checkoutInput = document.getElementById('checkoutDate');
const categoryChips = document.querySelectorAll('.category-chip');

// ——— Bottom Tab Bar ———
function switchTab(tab) {
  currentTab = tab;
  pages.forEach(p => p.classList.remove('page--active'));
  const target = document.getElementById(`page-${tab}`);
  if (target) target.classList.add('page--active');

  tabItems.forEach(t => t.classList.toggle('tab-item--active', t.dataset.tab === tab));
}

tabItems.forEach(item => {
  item.addEventListener('click', () => switchTab(item.dataset.tab));
});

// ——— Booking Sheet ———
function openSheet(destination) {
  selectedDestination = destination || null;
  sheetTitle.textContent = destination
    ? `Букинг: ${NAMES[destination]}`
    : 'Забронировать';
  sheetDescription.textContent = destination
    ? 'Выберите даты и количество гостей'
    : 'Сначала выберите направление';

  summaryDest.textContent = destination ? NAMES[destination] : '—';
  updateSummary();

  sheet.classList.add('open');
  overlay.classList.add('active');
  sheetOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeSheet() {
  sheet.classList.remove('open');
  overlay.classList.remove('active');
  sheetOpen = false;
  document.body.style.overflow = '';
}

bookBtn.addEventListener('click', () => openSheet(null));
overlay.addEventListener('click', closeSheet);

// Touch-to-dismiss on handle
const handle = sheet.querySelector('.sheet-handle');
let touchStartY = 0;
handle.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });
handle.addEventListener('touchend', (e) => {
  const delta = e.changedTouches[0].clientY - touchStartY;
  if (delta > 60) closeSheet();
}, { passive: true });

// Destination card → open sheet
document.querySelectorAll('.destination-card').forEach(card => {
  card.addEventListener('click', () => {
    openSheet(card.dataset.destination);
  });
});

// ——— Guest counter ———
document.getElementById('guestMinus').addEventListener('click', () => {
  if (guestCount > 1) {
    guestCount--;
    guestDisplay.textContent = guestCount;
    updateSummary();
  }
});

document.getElementById('guestPlus').addEventListener('click', () => {
  if (guestCount < 10) {
    guestCount++;
    guestDisplay.textContent = guestCount;
    updateSummary();
  }
});

// ——— Summary calculation ———
function getNights() {
  const checkin = checkinInput.value;
  const checkout = checkoutInput.value;
  if (!checkin || !checkout) return 0;
  const diff = (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.round(diff));
}

function updateSummary() {
  const nights = getNights();
  summaryNights.textContent = nights;
  const pricePerDay = selectedDestination ? PRICES[selectedDestination] : 0;
  const total = pricePerDay * nights * guestCount;
  summaryTotal.textContent = `฿${total.toLocaleString()}`;
}

checkinInput.addEventListener('change', updateSummary);
checkoutInput.addEventListener('change', updateSummary);

// Set default dates (today + 3 days)
const today = new Date();
const checkinDefault = today.toISOString().split('T')[0];
const checkoutDefault = new Date(today.getTime() + 3 * 86400000).toISOString().split('T')[0];
checkinInput.value = checkinDefault;
checkoutInput.value = checkoutDefault;
checkinInput.min = checkinDefault;
updateSummary();

// ——— Category chips ———
categoryChips.forEach(chip => {
  chip.addEventListener('click', () => {
    categoryChips.forEach(c => c.classList.remove('category-chip--active'));
    chip.classList.add('category-chip--active');
  });
});

// ——— Book confirm ———
document.getElementById('btnBook').addEventListener('click', () => {
  if (!selectedDestination) {
    sheetDescription.textContent = 'Выберите направление на главной';
    return;
  }
  const nights = getNights();
  if (nights < 1) {
    sheetDescription.textContent = 'Укажите корректные даты';
    return;
  }
  closeSheet();
  switchTab('bookings');
  const bookingsPage = document.getElementById('page-bookings');
  bookingsPage.querySelector('.page-placeholder').textContent =
    `${NAMES[selectedDestination]} — ${nights} ночей, ${guestCount} гостей. Бронирование подтверждено!`;
});

// Set initial dates min
checkoutInput.min = checkinDefault;
checkinInput.addEventListener('change', () => {
  checkoutInput.min = checkinInput.value;
  if (checkoutInput.value < checkinInput.value) {
    checkoutInput.value = checkinInput.value;
  }
  updateSummary();
});

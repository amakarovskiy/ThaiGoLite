/* ===== Stats calculation engine ===== */

const KM_FACTOR = 1.35;
const SPEED_MIN_PER_KM = 1.5;
const FUEL_L_PER_100KM = 4;
const FUEL_PRICE_THB = 43;
const THB_TO_RUB = 2.7;
const TAXI_RATE_PER_KM = 30;

function haversine(p1, p2) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(p2.lat - p1.lat);
  const dLng = toRad(p2.lng - p1.lng);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) *
            Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function calcStats(route) {
  if (route.length < 2) {
    return { km: 0, mins: 0, fuel: 0, rubFuel: 0, rubKm: 0 };
  }
  let km = 0;
  for (let i = 1; i < route.length; i++) {
    km += haversine(route[i - 1], route[i]) * KM_FACTOR;
  }
  const mins = Math.round(km * SPEED_MIN_PER_KM);
  const fuel = Math.round(km / 100 * FUEL_L_PER_100KM * FUEL_PRICE_THB);
  const rubFuel = Math.round(fuel * THB_TO_RUB);
  const rubKm = Math.round(km * 0.5 * THB_TO_RUB);
  return {
    km: Math.round(km * 10) / 10,
    mins,
    fuel,
    rubFuel,
    rubKm
  };
}

function formatTime(mins) {
  if (mins <= 0) return '0 ' + t('time.min');
  if (mins < 60) return mins + ' ' + t('time.min');
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return h + ' ' + t('time.h');
  return h + ' ' + t('time.h') + ' ' + m + ' ' + t('time.min');
}

function formatTimeShort(mins) {
  if (mins <= 0) return '0 <small>' + t('time.min') + '</small>';
  if (mins < 60) return mins + ' <small>' + t('time.min') + '</small>';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return h + ' <small>' + t('time.h') + '</small>';
  return h + '<small>' + t('time.h') + '</small> ' + m + '<small>' + t('time.min') + '</small>';
}

/* ===== Route name generator ===== */
function generateRouteName(route) {
  if (route.length === 0) return '';

  // Count categories
  var catCount = {};
  var avgLat = 0;
  route.forEach(function (p) {
    var c = getDisplayCat(p);
    catCount[c] = (catCount[c] || 0) + 1;
    avgLat += p.lat;
  });
  avgLat /= route.length;

  // Determine geographic area
  var isNorth = avgLat > 8.0;
  var isSouth = avgLat < 7.86;
  var geoLabel = isNorth ? t('rname.north') : (isSouth ? t('rname.south') : t('rname.central'));

  // Determine dominant category
  var topCat = '';
  var topCount = 0;
  for (var cat in catCount) {
    if (catCount[cat] > topCount) {
      topCount = catCount[cat];
      topCat = cat;
    }
  }

  // Check for sunset-themed spots
  var sunsetPlaces = ['promthep', 'windmill', 'laem-singh', 'freedom'];
  var hasSunset = route.some(function (p) { return sunsetPlaces.indexOf(p.id) !== -1; });

  if (hasSunset && route.some(function (p) { return p.cat.includes('view'); })) {
    return t('rname.sunset');
  }

  var stats = calcStats(route);
  if (stats.km <= 20) return t('rname.short_trip');

  // Category-based names
  if (topCat === 'beach' && topCount >= 2) {
    return isSouth ? t('rname.beaches_south') : (isNorth ? t('rname.beaches_north') : t('rname.beaches_phuket'));
  }
  if (topCat === 'view' && topCount >= 2) return t('rname.viewpoints');
  if (topCat === 'temple' && topCount >= 2) return t('rname.temples');
  if (topCat === 'food' && topCount >= 2) return t('rname.gastro');
  if (topCat === 'market' && topCount >= 2) return t('rname.shopping');

  // Mixed categories
  var catKeys = Object.keys(catCount);
  if (catKeys.length >= 3) return geoLabel;
  if (catKeys.length === 2) {
    var labels = catKeys.map(function (c) {
      return t('rname.cat_' + c);
    });
    return labels[0].charAt(0).toUpperCase() + labels[0].slice(1) + ' ' + t('rname.and') + ' ' + labels[1];
  }

  return geoLabel;
}

/* ===== Route quality indicator ===== */
function getRouteRating(stats) {
  if (stats.km <= 0) return null;
  if (stats.km <= 40) return { icon: '👌', text: t('rating.half_day') };
  if (stats.km <= 80) return { icon: '🔥', text: t('rating.great') };
  return { icon: '⚡', text: t('rating.long') };
}

/* ===== Nearby place suggestion ===== */
function findNearbyPlace(route) {
  if (route.length < 2) return null;
  var lastPlace = route[route.length - 1];
  var routeIds = route.map(function (p) { return p.id; });
  var best = null;
  var bestDist = Infinity;

  PLACES.forEach(function (p) {
    if (routeIds.indexOf(p.id) !== -1) return;
    if (p.cat.includes('office')) return;
    var d = haversine(lastPlace, p) * KM_FACTOR;
    if (d < 3 && d < bestDist) {
      bestDist = d;
      best = p;
    }
  });

  return best;
}

/* ===== Popular preset routes ===== */
var PRESET_ROUTES = [
  {
    nameKey: 'preset.south',
    icon: '🌅',
    ids: ['karon-view', 'kata', 'nai-harn', 'ya-nui', 'windmill', 'promthep']
  },
  {
    nameKey: 'preset.sunset',
    icon: '🌇',
    ids: ['big-buddha', 'karon-view', 'promthep', 'windmill', 'after-beach']
  },
  {
    nameKey: 'preset.north',
    icon: '🏝',
    ids: ['bang-tao', 'nai-thon', 'nai-yang', 'sirinat', 'mai-khao']
  },
  {
    nameKey: 'preset.culture',
    icon: '🛕',
    ids: ['big-buddha', 'chalong', 'old-town', 'serene-light', 'rang-hill']
  },
  {
    nameKey: 'preset.food',
    icon: '🛍',
    ids: ['banzaan', 'indy-market', 'chillva', 'three-monkeys', 'tunk-ka']
  }
];

/* ===== Random route generator ===== */
function generateRandomRoute(maxMins) {
  // maxMins: 120 (2h), 240 (4h), 480 (all day)
  var maxKm = maxMins / SPEED_MIN_PER_KM;
  var available = PLACES.filter(function (p) {
    return !p.cat.includes('office');
  });

  // Shuffle
  for (var i = available.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = available[i];
    available[i] = available[j];
    available[j] = tmp;
  }

  // Pick a starting point
  var result = [available[0]];
  var totalKm = 0;

  for (var k = 1; k < available.length && result.length < 6; k++) {
    var segKm = haversine(result[result.length - 1], available[k]) * KM_FACTOR;
    if (totalKm + segKm <= maxKm) {
      result.push(available[k]);
      totalKm += segKm;
    }
  }

  return result;
}

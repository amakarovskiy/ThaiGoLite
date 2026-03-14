// Stats calculation engine (from ROADMAP/js/stats.js)

const KM_FACTOR = 1.35;
const SPEED_MIN_PER_KM = 2.0;
const FUEL_L_PER_100KM = 2;
const FUEL_PRICE_THB = 43;
const TAXI_RATE_PER_KM = 30;

export { TAXI_RATE_PER_KM, KM_FACTOR };

export function haversine(p1, p2) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(p2.lat - p1.lat);
  const dLng = toRad(p2.lng - p1.lng);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) *
            Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function calcStats(route) {
  if (route.length < 2) {
    return { km: 0, mins: 0, fuel: 0 };
  }
  let km = 0;
  for (let i = 1; i < route.length; i++) {
    km += haversine(route[i - 1], route[i]) * KM_FACTOR;
  }
  const mins = Math.round(km * SPEED_MIN_PER_KM);
  const fuel = Math.round(km / 100 * FUEL_L_PER_100KM * FUEL_PRICE_THB);
  return {
    km: Math.round(km * 10) / 10,
    mins,
    fuel
  };
}

const TIME_UNITS = {
  ru: { h: 'ч', m: 'мин' },
  en: { h: 'h', m: 'min' },
  de: { h: 'Std', m: 'Min' },
  fr: { h: 'h', m: 'min' },
  es: { h: 'h', m: 'min' },
  th: { h: 'ชม.', m: 'นาที' }
};

export function formatTime(mins, lang = 'ru') {
  const u = TIME_UNITS[lang] || TIME_UNITS.en;
  if (mins <= 0) return '0 ' + u.m;
  if (mins < 60) return mins + ' ' + u.m;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return h + ' ' + u.h;
  return h + ' ' + u.h + ' ' + m + ' ' + u.m;
}

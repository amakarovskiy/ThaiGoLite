// Stats calculation engine (from ROADMAP/js/stats.js)

const KM_FACTOR = 1.35;
const SPEED_MIN_PER_KM = 1.5;
const FUEL_L_PER_100KM = 4;
const FUEL_PRICE_THB = 43;
const TAXI_RATE_PER_KM = 30;

export { TAXI_RATE_PER_KM };

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

export function formatTime(mins) {
  if (mins <= 0) return '0 мин';
  if (mins < 60) return mins + ' мин';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return h + ' ч';
  return h + ' ч ' + m + ' мин';
}

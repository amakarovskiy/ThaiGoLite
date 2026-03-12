// ThaiGo Lite — Pricing engine (seasonal tariffs)

/**
 * Returns current season based on month.
 * Low:      May–Sep (5–9)
 * Shoulder: Apr, Oct, Nov (4, 10, 11)
 * High:     Dec–Mar (12, 1, 2, 3)
 */
export function getCurrentSeason() {
  const m = new Date().getMonth() + 1;
  if (m >= 5 && m <= 9) return 'low';
  if (m === 4 || m === 10 || m === 11) return 'shoulder';
  return 'high';
}

/**
 * Returns the tier index (0–3) for a given number of days.
 * 1–2 → 0, 3–6 → 1, 7–19 → 2, 20–30 → 3
 */
function getTierIndex(days) {
  if (days >= 20) return 3;
  if (days >= 7) return 2;
  if (days >= 3) return 1;
  return 0;
}

/**
 * Returns price per day for a bike at the given day count in the current season.
 */
export function getPricePerDay(bike, days) {
  const season = getCurrentSeason();
  const tier = getTierIndex(days);
  return bike.prices[season][tier];
}

/**
 * Returns total rental price for a bike for given days.
 */
export function getTotalPrice(bike, days) {
  return getPricePerDay(bike, days) * days;
}

const MAXI_BIG_IDS = ['xmax-300-2022', 'xmax-300-new', 'forza-350-black', 'forza-350-new', 'adv-350-new'];

/**
 * Returns insurance+ total cost for a bike over given days.
 * Returns null for manual transmission bikes (insurance+ unavailable).
 */
export function getInsuranceTotal(days, bike) {
  if (bike.category === 'moto') return null;
  const isMaxi = MAXI_BIG_IDS.includes(bike.id);
  if (isMaxi) return days <= 10 ? 1000 : days <= 20 ? 2000 : 3000;
  return days <= 10 ? 500 : days <= 20 ? 1000 : 1500;
}

/**
 * Returns insurance+ cost per day (rounded up).
 * Returns null for manual transmission bikes.
 */
export function getInsurancePerDay(days, bike) {
  const total = getInsuranceTotal(days, bike);
  if (total === null) return null;
  return Math.ceil(total / days);
}

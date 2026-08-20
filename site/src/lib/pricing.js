/**
 * Single pricing source for ThaiGo Rent.
 * Fleet numbers live in src/data/fleet.json only.
 *
 * prices[season] = [1–2 daily, 3–6 daily, 7–19 daily, 20+ daily, 30-day TOTAL]
 * "From" price is the cheapest daily equivalent in the current season,
 * including Math.round(30-day total / 30).
 */
import fleet from '../data/fleet.json' with { type: 'json' };

export const THB_PER_USD = 33.083;
export const LANGS = ['ru', 'en', 'de', 'fr', 'es', 'th', 'zh'];
export const NO_PHOTO_IDS = Object.freeze(['stallions-sm250', 'mt-15', 'haval', 'everest']);

export const fleetById = Object.fromEntries(fleet.map((bike) => [bike.id, bike]));

export function seasonName(date = new Date()) {
  const month = date.getMonth() + 1;
  if (month >= 5 && month <= 9) return 'low';
  if (month === 4 || month === 10 || month === 11) return 'shoulder';
  return 'high';
}

/** Duration tier index: 0=1–2, 1=3–6, 2=7–19, 3=20+, 4=30-day package */
export function durationTier(days) {
  if (days >= 30) return 4;
  if (days >= 20) return 3;
  if (days >= 7) return 2;
  if (days >= 3) return 1;
  return 0;
}

export function dailyRate(bike, days, date = new Date()) {
  const season = seasonName(date);
  const tier = durationTier(days);
  const amount = bike.prices[season][tier];
  return tier === 4 ? Math.round(amount / 30) : amount;
}

export function periodTotal(bike, days, date = new Date()) {
  if (days >= 30) return bike.prices[seasonName(date)][4];
  return dailyRate(bike, days, date) * days;
}

/** One "from" number per model — used in titles, heroes, cards, schema lowPrice */
export function fromDaily(bike, date = new Date()) {
  const season = seasonName(date);
  const [d12, d36, d719, d20, monthly] = bike.prices[season];
  return Math.min(d12, d36, d719, d20, Math.round(monthly / 30));
}

export function thbToUsd(thb) {
  return Math.round(thb / THB_PER_USD);
}

export function formatThb(thb) {
  return `${thb} ฿`;
}

export function getBike(id) {
  return fleetById[id] || null;
}

export function hasRealPhoto(id) {
  const bike = fleetById[id];
  if (bike && bike.hasPhoto === false) return false;
  return !NO_PHOTO_IDS.includes(id);
}

export { fleet };

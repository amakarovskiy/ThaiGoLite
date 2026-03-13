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
 * Returns the Short Rental Fee (SRF) for 1–2 day rentals.
 * SRF = (tier0_rate - tier1_rate) * 2, based on current season.
 */
export function getShortRentalFee(bike) {
  const season = getCurrentSeason();
  const rates = bike.prices[season];
  return (rates[0] - rates[1]) * 2;
}

/**
 * Returns total rental price for a bike for given days.
 * For 1–2 day rentals, uses the 3-day rate plus the Short Rental Fee.
 */
export function getTotalPrice(bike, days) {
  if (days <= 2) {
    return getPricePerDay(bike, 3) * days + getShortRentalFee(bike);
  }
  return getPricePerDay(bike, days) * days;
}

export const MAXI_BIG_IDS = ['xmax-300-2022', 'xmax-300-new', 'forza-350-black', 'forza-350-new', 'adv-350-new'];

export const INSURANCE_STANDARD_FRANCHISE = 3000; // Standard bikes
export const INSURANCE_PREMIUM_FRANCHISE = 6000; // Premium bikes (ADV 160, Xmax, Forza, ADV 350)

const PREMIUM_IDS = ['adv-160', 'xmax-300-2022', 'xmax-300-new', 'forza-350-black', 'forza-350-new', 'adv-350-new'];

/**
 * Returns the insurance franchise amount for a bike.
 */
export function getInsuranceFranchise(bike) {
  return PREMIUM_IDS.includes(bike.id) ? INSURANCE_PREMIUM_FRANCHISE : INSURANCE_STANDARD_FRANCHISE;
}

const PREMIUM_MAXI_IDS = ['xmax-300-2022', 'xmax-300-new', 'forza-350-black', 'forza-350-new', 'adv-350-new'];

/**
 * Returns the deposit amount for a bike.
 * Premium maxi bikes: 7000, all others: 3000.
 */
export function getDeposit(bike) {
  return PREMIUM_MAXI_IDS.includes(bike.id) ? 7000 : 3000;
}

/**
 * Returns approximate discount percentage for a given rental duration.
 */
export function getDiscountPercent(days) {
  if (days >= 20) return 45;
  if (days >= 7) return 25;
  if (days >= 3) return 17;
  return 0;
}

/**
 * Returns a hint about the next discount threshold, or null if already at max.
 * { daysNeeded, discountPercent, pricePerDay }
 */
export function getNextDiscountHint(days, bike) {
  const thresholds = [
    { minDays: 3, discount: 17 },
    { minDays: 7, discount: 25 },
    { minDays: 20, discount: 45 },
  ];
  for (const t of thresholds) {
    if (days < t.minDays) {
      return {
        daysNeeded: t.minDays,
        discountPercent: t.discount,
        pricePerDay: getPricePerDay(bike, t.minDays),
      };
    }
  }
  return null;
}

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

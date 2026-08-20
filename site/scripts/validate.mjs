#!/usr/bin/env node
/**
 * Release gate: production layout / data invariants.
 * Do not delete or bypass this script.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  LANGS,
  NO_PHOTO_IDS,
  THB_PER_USD,
  dailyRate,
  fleet,
  fromDaily,
  getBike,
  hasRealPhoto,
  seasonName,
} from '../src/lib/pricing.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '..');
const DIST = path.join(SITE, 'dist');

const errors = [];
function check(name, fn) {
  try {
    fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    errors.push(`${name}: ${err.message}`);
    console.error(`  FAIL ${name}: ${err.message}`);
  }
}

function read(rel) {
  const full = path.join(DIST, rel);
  assert.ok(fs.existsSync(full), `missing ${rel}`);
  return fs.readFileSync(full, 'utf8');
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

console.log('[validate] ThaiGo site release gate');

check('seven languages', () => {
  assert.deepEqual(LANGS, ['ru', 'en', 'de', 'fr', 'es', 'th', 'zh']);
  for (const lang of LANGS) {
    const rel = lang === 'ru' ? 'about/index.html' : `${lang}/about/index.html`;
    assert.match(read(rel), /ThaiGo Rent/);
  }
});

check('one fleet source', () => {
  assert.equal(fleet.length, 48);
  assert.ok(getBike('scoopy-110'));
  assert.ok(getBike('forza-350-2024'));
});

check('shared pricing: Scoopy / Forza fromDaily', () => {
  const date = new Date('2026-08-20T12:00:00+07:00');
  assert.equal(seasonName(date), 'low');
  const scoopy = getBike('scoopy-110');
  const forza = getBike('forza-350-2024');
  assert.equal(fromDaily(scoopy, date), 100);
  assert.equal(dailyRate(scoopy, 20, date), 130);
  assert.equal(dailyRate(scoopy, 30, date), 100);
  assert.equal(fromDaily(forza, date), 433);
  assert.equal(dailyRate(forza, 30, date), 433);
  assert.notEqual(fromDaily(scoopy, date), dailyRate(scoopy, 20, date));
  // "from" is the single headline number; duration tiers stay in data
  assert.equal(THB_PER_USD, 33.083);
});

check('no-photo models listed, never invent images', () => {
  for (const id of NO_PHOTO_IDS) {
    assert.equal(hasRealPhoto(id), false);
    assert.ok(getBike(id), id);
  }
});

check('prices table: no min-width overflow, dual stack', () => {
  const css = `${read('assets/bikes-9TOdqJe5.css')}\n${read('assets/bugfixes.css')}`;
  assert.match(css, /price-val-dual/);
  assert.match(css, /\.price-usd-val/);
  assert.match(css, /display:\s*block/);
  assert.match(css, /overflow-x:\s*hidden/);
  const fixes = read('assets/bugfixes.css');
  assert.match(fixes, /table-layout:\s*fixed/);
  assert.match(fixes, /word-break:\s*keep-all/);
  assert.match(fixes, /min-width:\s*min-content/);
  assert.equal(fixes.includes('overflow-wrap: anywhere'), false);
  assert.equal(fixes.includes('word-break: break-word'), false);
});

check('tab bar highlights Prices, not Guide, on /prices/', () => {
  const loader = read('assets/booking-sheet-loader-CB6WQ4zm.js');
  const fixes = read('assets/bugfixes.js');
  assert.equal(loader.includes('startsWith("/prices")?"/guide/"'), false);
  assert.equal(loader.includes('startsWith("/guide")||t.startsWith("/prices")?a="guide"'), false);
  assert.match(loader, /id:"prices",path:"\/prices\/",i18n:"tabPrices"/);
  assert.match(loader, /startsWith\("\/prices"\)\?a="prices"/);
  assert.match(fixes, /highlightPricesTab/);
  assert.match(fixes, /data-tab="prices"/);
});

check('mobile padding-bottom covers tab bar', () => {
  const css = read('assets/bugfixes.css');
  assert.match(css, /tabbar-h/);
  assert.match(css, /96px/);
});

check('similar bikes not clipped by sticky header', () => {
  const css = read('assets/bugfixes.css');
  assert.match(css, /similar-scroll/);
  assert.match(css, /scroll-margin-top/);
});

check('spec values not truncated', () => {
  const css = read('assets/bugfixes.css');
  assert.match(css, /bike-spec-value/);
  assert.match(css, /text-overflow:\s*unset/);
  const mercedes = read('bikes/mercedes-c350e/index.html');
  assert.match(mercedes, /Автомобили/);
  assert.equal(mercedes.includes('Автомобил<'), false);
});

check('Forza / Scoopy headline uses fromDaily', () => {
  const forza = read('bikes/forza-350-2024/index.html');
  const scoopy = read('bikes/scoopy-110/index.html');
  assert.match(forza, /от 433 ฿/);
  assert.equal(forza.includes('от 367 ฿'), false);
  assert.match(scoopy, /от 100 ฿/);
  assert.match(scoopy, /"lowPrice": "100"/);
});

check('broken 1.webp not rendered for SM250 / MT-15 / Haval / Everest', () => {
  const files = [
    'bikes/stallions-sm250/index.html',
    'bikes/mt-15/index.html',
    'bikes/haval/index.html',
    'bikes/everest/index.html',
    'prices/index.html',
  ];
  for (const rel of files) {
    const html = read(rel);
    for (const id of NO_PHOTO_IDS) {
      assert.equal(html.includes(`/bikes/${id}/1.webp`), false, `${rel} still references ${id}/1.webp`);
    }
  }
});

check('about pages exist in all 7 languages', () => {
  for (const lang of LANGS) {
    const rel = lang === 'ru' ? 'about/index.html' : `${lang}/about/index.html`;
    const html = read(rel);
    assert.match(html, /info@thaigo\.rent/);
    assert.match(html, /Patak Rd/);
    assert.equal(html.toLowerCase().includes('founded'), false);
  }
});

check('messenger links keep text without click IDs in bugfixes', () => {
  const js = read('assets/bugfixes.js');
  assert.match(js, /gclid/);
  assert.match(js, /protectMessengerRefs/);
});

check('dist is the production artifact', () => {
  assert.ok(fs.existsSync(path.join(DIST, 'index.html')));
  assert.ok(fs.existsSync(path.join(DIST, 'prices', 'index.html')));
  assert.ok(walk(DIST).length > 50);
});

if (errors.length) {
  console.error(`\n[validate] ${errors.length} failed`);
  process.exit(1);
}
console.log('\n[validate] all gates passed');

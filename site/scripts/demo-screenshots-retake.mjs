#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const CHROME = '/opt/google/chrome/chrome';
const AFTER = 'http://127.0.0.1:4173';
const BEFORE = 'https://thaigo.rent';
const OUT = '/opt/cursor/artifacts/screenshots';
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--hide-scrollbars',
    '--user-data-dir=/tmp/chrome-demo-shots-2',
  ],
});

async function shot(file, url, width, height, fn) {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 2,
    isMobile: width <= 420,
    hasTouch: width <= 420,
  });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 900));
  if (fn) await fn(page);
  await new Promise((r) => setTimeout(r, 400));
  const dest = path.join(OUT, file);
  await page.screenshot({ path: dest, type: 'png' });
  console.log('wrote', dest, fs.statSync(dest).size);
  await page.close();
}

await shot('after_mercedes_1280_tip.png', `${AFTER}/bikes/mercedes-c350e/`, 1280, 800, async (page) => {
  await page.evaluate(() => {
    document.querySelector('.bike-quick-specs')?.scrollIntoView({ block: 'center' });
  });
});

await shot('after_pcx160_1280_similar.png', `${AFTER}/bikes/pcx-160/`, 1280, 800, async (page) => {
  await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2, .section-title')].find((n) =>
      /Похожие байки/.test(n.textContent || ''),
    );
    if (h) {
      h.scrollIntoView({ block: 'start' });
      window.scrollBy(0, -72);
    }
  });
});

await shot('after_pcx160_375_last_block.png', `${AFTER}/bikes/pcx-160/`, 375, 812, async (page) => {
  await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2, .section-title')].find((n) =>
      /Похожие/.test(n.textContent || ''),
    );
    (h?.closest('section') || h)?.scrollIntoView({ block: 'end' });
  });
});

await shot('after_how_to_rent_375_last_block.png', `${AFTER}/guide/how-to-rent/`, 375, 812, async (page) => {
  await page.evaluate(() => {
    document.querySelector('.guide-loc-related, .guide-loc-cta')?.scrollIntoView({ block: 'end' });
  });
});

await shot('after_prices_375_missing_photos.png', `${AFTER}/prices/`, 375, 900, async (page) => {
  await page.evaluate(() => {
    const row = [...document.querySelectorAll('.price-bike-name')].find((n) =>
      /SM250/.test(n.textContent || ''),
    );
    row?.closest('tr')?.scrollIntoView({ block: 'start' });
  });
});

await shot('after_prices_375_cars_missing_photos.png', `${AFTER}/prices/`, 375, 900, async (page) => {
  await page.evaluate(() => {
    const row = [...document.querySelectorAll('.price-bike-name')].find((n) =>
      /Haval|Everest/.test(n.textContent || ''),
    );
    row?.closest('tr')?.scrollIntoView({ block: 'center' });
  });
});

await shot('before_prices_375_cars_missing_photos.png', `${BEFORE}/prices/`, 375, 900, async (page) => {
  await page.evaluate(() => {
    const row = [...document.querySelectorAll('.price-bike-name')].find((n) =>
      /Haval|Everest/.test(n.textContent || ''),
    );
    row?.closest('tr')?.scrollIntoView({ block: 'center' });
  });
});

await browser.close();

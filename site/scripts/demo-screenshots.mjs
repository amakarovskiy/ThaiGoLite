#!/usr/bin/env node
/**
 * Owner demo screenshots: AFTER = local preview, BEFORE = live thaigo.rent.
 * Does not deploy.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = process.env.CHROME || '/opt/google/chrome/chrome';
const AFTER = process.env.AFTER_ORIGIN || 'http://127.0.0.1:4173';
const BEFORE = process.env.BEFORE_ORIGIN || 'https://thaigo.rent';
const OUT = process.env.SHOT_DIR || '/opt/cursor/artifacts/screenshots';

fs.mkdirSync(OUT, { recursive: true });

function runChrome(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(CHROME, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let err = '';
    child.stderr.on('data', (d) => {
      err += d.toString();
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`chrome ${code}: ${err.slice(-400)}`));
    });
  });
}

async function shot({ file, url, width, height, waitMs = 1800, script = '' }) {
  const dest = path.join(OUT, file);
  const tmpJs = path.join('/tmp', `shot-${file.replace(/[^\w.-]+/g, '_')}.js`);
  const js = `
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    ${script}
    await sleep(${waitMs});
  `;
  fs.writeFileSync(tmpJs, js);
  await runChrome([
    '--headless=new',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=2',
    `--window-size=${width},${height}`,
    `--virtual-time-budget=8000`,
    `--run-all-compositor-stages-before-draw`,
    `--screenshot=${dest}`,
    `--default-background-color=FFF5F3F0`,
    script ? `--virtual-time-budget=12000` : '--virtual-time-budget=8000',
    url,
  ]);
  if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
    throw new Error(`empty screenshot ${dest}`);
  }
  console.log(`wrote ${dest} (${fs.statSync(dest).size} bytes)`);
}

/** Use CDP via chrome-remote for scroll-then-shot. Fallback: puppeteer-core if installed. */
async function shotWithEval(opts) {
  const puppeteerPath = await import('puppeteer-core').then(() => 'puppeteer-core').catch(() => null);
  if (!puppeteerPath) return shot(opts);
  const puppeteer = await import('puppeteer-core');
  const browser = await puppeteer.default.launch({
    executablePath: CHROME,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars',
      '--user-data-dir=/tmp/chrome-demo-shots',
    ],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: opts.width,
      height: opts.height,
      deviceScaleFactor: 2,
      isMobile: opts.width <= 420,
      hasTouch: opts.width <= 420,
    });
    await page.goto(opts.url, { waitUntil: 'networkidle2', timeout: 45000 });
    await page.waitForTimeout?.(800);
    await new Promise((r) => setTimeout(r, 800));
    if (opts.evalFn) await opts.evalFn(page);
    await new Promise((r) => setTimeout(r, opts.waitMs || 400));
    const dest = path.join(OUT, opts.file);
    await page.screenshot({ path: dest, type: 'png' });
    console.log(`wrote ${dest} (${fs.statSync(dest).size} bytes)`);
  } finally {
    await browser.close();
  }
}

const jobs = [
  {
    file: 'after_prices_375_table.png',
    url: `${AFTER}/prices/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      const table = await page.$('.prices-table');
      if (table) await table.scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        const el = document.querySelector('.prices-table-wrap, .prices-table');
        el?.scrollIntoView({ block: 'start' });
      });
    },
  },
  {
    file: 'before_prices_375_table.png',
    url: `${BEFORE}/prices/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      await page.evaluate(() => {
        document.querySelector('.prices-table-wrap, .prices-table')?.scrollIntoView({ block: 'start' });
      });
    },
  },
  {
    file: 'after_prices_375_missing_photos.png',
    url: `${AFTER}/prices/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      await page.evaluate(() => {
        const row = [...document.querySelectorAll('.price-bike-name')].find((n) =>
          /SM250|MT-15|Haval|Everest/i.test(n.textContent || ''),
        );
        row?.closest('tr')?.scrollIntoView({ block: 'center' });
      });
    },
  },
  {
    file: 'before_prices_375_missing_photos.png',
    url: `${BEFORE}/prices/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      await page.evaluate(() => {
        const row = [...document.querySelectorAll('.price-bike-name, a')].find((n) =>
          /SM250|MT-15|Haval|Everest/i.test(n.textContent || ''),
        );
        row?.closest('tr, article, a')?.scrollIntoView({ block: 'center' });
      });
    },
  },
  {
    file: 'after_pcx160_375_last_block.png',
    url: `${AFTER}/bikes/pcx-160/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    },
  },
  {
    file: 'before_pcx160_375_last_block.png',
    url: `${BEFORE}/bikes/pcx-160/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    },
  },
  {
    file: 'after_how_to_rent_375_last_block.png',
    url: `${AFTER}/guide/how-to-rent/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    },
  },
  {
    file: 'before_how_to_rent_375_last_block.png',
    url: `${BEFORE}/guide/how-to-rent/`,
    width: 375,
    height: 812,
    evalFn: async (page) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    },
  },
  {
    file: 'after_pcx160_1280_similar.png',
    url: `${AFTER}/bikes/pcx-160/`,
    width: 1280,
    height: 800,
    evalFn: async (page) => {
      await page.evaluate(() => {
        const h = [...document.querySelectorAll('h2, .section-title')].find((n) =>
          /Похожие|Similar|Ähnliche|Similaires|Parecid/i.test(n.textContent || ''),
        );
        const section = h?.closest('section') || document.querySelector('section:has(.similar-scroll)');
        section?.scrollIntoView({ block: 'start' });
        window.scrollBy(0, -8);
      });
    },
  },
  {
    file: 'before_pcx160_1280_similar.png',
    url: `${BEFORE}/bikes/pcx-160/`,
    width: 1280,
    height: 800,
    evalFn: async (page) => {
      await page.evaluate(() => {
        const h = [...document.querySelectorAll('h2, .section-title')].find((n) =>
          /Похожие|Similar|Ähnliche|Similaires|Parecid/i.test(n.textContent || ''),
        );
        const section = h?.closest('section') || document.querySelector('section:has(.similar-scroll)');
        section?.scrollIntoView({ block: 'start' });
        window.scrollBy(0, -8);
      });
    },
  },
  {
    file: 'after_mercedes_1280_tip.png',
    url: `${AFTER}/bikes/mercedes-c350e/`,
    width: 1280,
    height: 800,
    evalFn: async (page) => {
      await page.evaluate(() => {
        document.querySelector('.bike-quick-specs')?.scrollIntoView({ block: 'center' });
      });
    },
  },
  {
    file: 'before_mercedes_1280_tip.png',
    url: `${BEFORE}/bikes/mercedes-c350e/`,
    width: 1280,
    height: 800,
    evalFn: async (page) => {
      await page.evaluate(() => {
        document.querySelector('.bike-quick-specs')?.scrollIntoView({ block: 'center' });
      });
    },
  },
  {
    file: 'after_about_375.png',
    url: `${AFTER}/about/`,
    width: 375,
    height: 812,
  },
  {
    file: 'before_about_375.png',
    url: `${BEFORE}/about/`,
    width: 375,
    height: 812,
  },
];

for (const job of jobs) {
  try {
    await shotWithEval(job);
  } catch (err) {
    console.error(`FAIL ${job.file}: ${err.message}`);
    process.exitCode = 1;
  }
}

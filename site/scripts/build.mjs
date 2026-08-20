#!/usr/bin/env node
/**
 * Build production artifact into site/dist/.
 * Starts from the production HTML snapshot (site/snapshot or SITE_SNAPSHOT),
 * applies bugfixes, writes about pages, does not deploy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fleet,
  fromDaily,
  getBike,
  LANGS,
  seasonName,
} from '../src/lib/pricing.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '..');
const DIST = path.join(SITE, 'dist');
const SNAPSHOT = process.env.SITE_SNAPSHOT || path.join(SITE, 'snapshot');
const MIRROR = '/tmp/thaigo-mirror/site';

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function ensureSnapshot() {
  if (fs.existsSync(path.join(SNAPSHOT, 'prices', 'index.html'))) return SNAPSHOT;
  if (fs.existsSync(path.join(MIRROR, 'prices', 'index.html'))) return MIRROR;
  throw new Error(
    'No production snapshot. Expected site/snapshot/ or /tmp/thaigo-mirror/site/ with prices/index.html',
  );
}

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function injectAsset(html, relCss, relJs) {
  const cssTag = `<link rel="stylesheet" href="${relCss}" />`;
  const jsTag = `<script type="module" src="${relJs}"></script>`;
  let next = html;
  if (!next.includes('bugfixes.css')) {
    next = next.replace('</head>', `  ${cssTag}\n</head>`);
  }
  if (!next.includes('bugfixes.js')) {
    next = next.replace('</body>', `  ${jsTag}\n</body>`);
  }
  return next;
}

function bikeIdFromFile(file, distRoot) {
  const rel = path.relative(distRoot, file).replaceAll('\\', '/');
  const m = rel.match(/(?:^|\/)bikes\/([^/]+)\/index\.html$/);
  return m ? m[1] : '';
}

function patchFromPrices(html, bike) {
  if (!bike) return html;
  const from = fromDaily(bike);
  let next = html;
  next = next.replace(
    /(<title>[^<]*?)от\s+\d[\d\s]*\s*฿([^<]*<\/title>)/,
    `$1от ${from} ฿$2`,
  );
  next = next.replace(
    /(<title>[^<]*?)from\s+\d[\d\s]*\s*฿([^<]*<\/title>)/i,
    `$1from ${from} ฿$2`,
  );
  next = next.replace(
    /(property="og:title" content="[^"]*?)от\s+\d[\d\s]*\s*฿([^"]*")/,
    `$1от ${from} ฿$2`,
  );
  next = next.replace(
    /(property="og:title" content="[^"]*?)from\s+\d[\d\s]*\s*฿([^"]*")/i,
    `$1from ${from} ฿$2`,
  );
  next = next.replace(
    /(<span class="bike-price-thb-aux" id="heroPriceThb">)[\d\s]+ ฿(<\/span>)/,
    `$1${from} ฿$2`,
  );
  next = next.replace(
    /(<span class="sticky-thb-main">)[\d\s]+ ฿(<\/span>)/,
    `$1${from} ฿$2`,
  );
  next = next.replace(
    /("lowPrice"\s*:\s*")\d+(")/,
    `$1${from}$2`,
  );
  return next;
}

function stripMissingPhotos(html) {
  return html.replace(
    /<img([^>]*?)src="\/bikes\/(stallions-sm250|mt-15|haval|everest)\/\d+\.webp"([^>]*)>/g,
    '',
  );
}

function patchTabBarJs(js) {
  let next = js.replace(/([,\s])k=d\.startsWith\("\/prices"\)\?"\/guide\/":d/, '$1k=d');
  next = next.replace(
    '{id:"bikes",path:"/bikes/",i18n:"tabBikes",iconKey:"motorcycle"},{id:"guide"',
    '{id:"bikes",path:"/bikes/",i18n:"tabBikes",iconKey:"motorcycle"},{id:"prices",path:"/prices/",i18n:"tabPrices",iconKey:"dollar-sign"},{id:"guide"',
  );
  if (!next.includes('startsWith("/prices")?a="prices"')) {
    if (next.includes('t.startsWith("/guide")||t.startsWith("/prices")?a="guide"')) {
      next = next.replace(
        't.startsWith("/guide")||t.startsWith("/prices")?a="guide"',
        't.startsWith("/prices")?a="prices":t.startsWith("/guide")?a="guide"',
      );
    } else {
      next = next.replace(
        't.startsWith("/guide")?a="guide":t.startsWith("/contacts")?a="contacts"',
        't.startsWith("/prices")?a="prices":t.startsWith("/guide")?a="guide":t.startsWith("/contacts")?a="contacts"',
      );
    }
  }
  return next.replace(
    /src="\/bikes\/\$\{o\.id\}\/1\.webp"/g,
    'src="${["stallions-sm250","mt-15","haval","everest"].includes(o.id)?"":`/bikes/${o.id}/1.webp`}"',
  );
}

const ABOUT = {
  ru: {
    title: 'О ThaiGo Rent',
    lead: 'ThaiGo Rent — прокат байков, скутеров и автомобилей на Пхукете.',
    facts: [
      'Без залога паспорта.',
      'Доставка в отель.',
      'Договор и страховка — как указано в карточке модели и при бронировании.',
      'Офис: Patak Rd, Kata, Phuket 83100, Таиланд.',
      'Телефон: +66 82 254 5737.',
      'Почта: info@thaigo.rent.',
      'Часы: 09:00–21:00, ежедневно.',
    ],
    contacts: 'Контакты',
    prices: 'Цены',
    home: 'На главную',
  },
  en: {
    title: 'About ThaiGo Rent',
    lead: 'ThaiGo Rent is a motorbike, scooter and car rental in Phuket.',
    facts: [
      'No passport deposit.',
      'Hotel delivery.',
      'Contract and insurance as stated on the model page and during booking.',
      'Office: Patak Rd, Kata, Phuket 83100, Thailand.',
      'Phone: +66 82 254 5737.',
      'Email: info@thaigo.rent.',
      'Hours: 09:00–21:00 daily.',
    ],
    contacts: 'Contacts',
    prices: 'Prices',
    home: 'Home',
  },
  de: {
    title: 'Über ThaiGo Rent',
    lead: 'ThaiGo Rent vermietet Motorräder, Roller und Autos auf Phuket.',
    facts: [
      'Kein Pass als Kaution.',
      'Lieferung zum Hotel.',
      'Vertrag und Versicherung wie auf der Modellseite und bei der Buchung angegeben.',
      'Büro: Patak Rd, Kata, Phuket 83100, Thailand.',
      'Telefon: +66 82 254 5737.',
      'E-Mail: info@thaigo.rent.',
      'Öffnungszeiten: 09:00–21:00 täglich.',
    ],
    contacts: 'Kontakt',
    prices: 'Preise',
    home: 'Startseite',
  },
  fr: {
    title: 'À propos de ThaiGo Rent',
    lead: 'ThaiGo Rent propose la location de motos, scooters et voitures à Phuket.',
    facts: [
      'Pas de passeport en caution.',
      'Livraison à l’hôtel.',
      'Contrat et assurance comme indiqué sur la fiche modèle et lors de la réservation.',
      'Bureau : Patak Rd, Kata, Phuket 83100, Thaïlande.',
      'Téléphone : +66 82 254 5737.',
      'E-mail : info@thaigo.rent.',
      'Horaires : 09:00–21:00 tous les jours.',
    ],
    contacts: 'Contacts',
    prices: 'Tarifs',
    home: 'Accueil',
  },
  es: {
    title: 'Sobre ThaiGo Rent',
    lead: 'ThaiGo Rent alquila motos, scooters y coches en Phuket.',
    facts: [
      'Sin pasaporte en depósito.',
      'Entrega en el hotel.',
      'Contrato y seguro según la ficha del modelo y la reserva.',
      'Oficina: Patak Rd, Kata, Phuket 83100, Tailandia.',
      'Teléfono: +66 82 254 5737.',
      'Correo: info@thaigo.rent.',
      'Horario: 09:00–21:00 todos los días.',
    ],
    contacts: 'Contacto',
    prices: 'Precios',
    home: 'Inicio',
  },
  th: {
    title: 'เกี่ยวกับ ThaiGo Rent',
    lead: 'ThaiGo Rent ให้เช่ามอเตอร์ไซค์ สกู๊ตเตอร์ และรถยนต์ในภูเก็ต',
    facts: [
      'ไม่ใช้พาสปอร์ตเป็นประกัน',
      'จัดส่งถึงโรงแรม',
      'สัญญาและประกันตามที่ระบุในหน้ารุ่นและตอนจอง',
      'สำนักงาน: Patak Rd, Kata, Phuket 83100, ประเทศไทย',
      'โทร: +66 82 254 5737',
      'อีเมล: info@thaigo.rent',
      'เวลาทำการ: 09:00–21:00 ทุกวัน',
    ],
    contacts: 'ติดต่อ',
    prices: 'ราคา',
    home: 'หน้าแรก',
  },
  zh: {
    title: '关于 ThaiGo Rent',
    lead: 'ThaiGo Rent 在普吉提供摩托车、踏板车和汽车租赁。',
    facts: [
      '不扣押护照作为押金。',
      '可送到酒店。',
      '合同与保险以车型页和预订时说明为准。',
      '办公室：Patak Rd, Kata, Phuket 83100, 泰国。',
      '电话：+66 82 254 5737。',
      '邮箱：info@thaigo.rent。',
      '营业时间：每天 09:00–21:00。',
    ],
    contacts: '联系',
    prices: '价格',
    home: '首页',
  },
};

function aboutHref(lang, dest) {
  if (lang === 'ru') return dest;
  return `/${lang}${dest}`;
}

function aboutHtml(lang) {
  const t = ABOUT[lang];
  const canonical =
    lang === 'ru' ? 'https://thaigo.rent/about/' : `https://thaigo.rent/${lang}/about/`;
  const hreflang = LANGS.map((code) => {
    const href = code === 'ru' ? 'https://thaigo.rent/about/' : `https://thaigo.rent/${code}/about/`;
    return `  <link rel="alternate" hreflang="${code}" href="${href}" />`;
  }).join('\n');
  const facts = t.facts.map((f) => `<li>${f}</li>`).join('');
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${t.title} | ThaiGo Rent</title>
  <meta name="description" content="${t.lead}" />
  <link rel="canonical" href="${canonical}" />
${hreflang}
  <link rel="alternate" hreflang="x-default" href="https://thaigo.rent/about/" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <style>html{background:#F5F3F0}</style>
  <link rel="stylesheet" href="/assets/booking-sheet-loader-DgDt3qYT.css" />
  <link rel="stylesheet" href="/assets/bugfixes.css" />
</head>
<body>
  <div class="site-frame">
    <main class="page-content about-page">
      <p class="about-back"><a href="${aboutHref(lang, '/')}">${t.home}</a></p>
      <h1 class="about-title">${t.title}</h1>
      <p class="about-lead">${t.lead}</p>
      <ul class="about-facts">${facts}</ul>
      <p class="about-links">
        <a href="${aboutHref(lang, '/contacts/')}">${t.contacts}</a>
        <a href="${aboutHref(lang, '/prices/')}">${t.prices}</a>
      </p>
    </main>
  </div>
  <script type="module" src="/assets/icons-B_HQjOT4.js"></script>
  <script type="module" src="/assets/i18n-QVk-nwCS.js"></script>
  <script type="module" src="/assets/booking-sheet-loader-CB6WQ4zm.js"></script>
  <script type="module" src="/assets/bugfixes.js"></script>
</body>
</html>
`;
}

function writeAboutPages() {
  for (const lang of LANGS) {
    const dir = lang === 'ru' ? path.join(DIST, 'about') : path.join(DIST, lang, 'about');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), aboutHtml(lang));
  }
}

function main() {
  const snap = ensureSnapshot();
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  copyDir(snap, DIST);

  const assetsDir = path.join(DIST, 'assets');
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.copyFileSync(path.join(SITE, 'src/styles/bugfixes.css'), path.join(assetsDir, 'bugfixes.css'));
  fs.copyFileSync(path.join(SITE, 'src/js/bugfixes.js'), path.join(assetsDir, 'bugfixes.js'));

  for (const file of walkHtml(DIST)) {
    if (file.includes(`${path.sep}assets${path.sep}`)) continue;
    let html = fs.readFileSync(file, 'utf8');
    const bikeId = bikeIdFromFile(file, DIST);
    html = injectAsset(html, '/assets/bugfixes.css', '/assets/bugfixes.js');
    html = stripMissingPhotos(html);
    if (bikeId) html = patchFromPrices(html, getBike(bikeId));
    fs.writeFileSync(file, html);
  }

  for (const file of fs.readdirSync(assetsDir)) {
    if (!file.endsWith('.js')) continue;
    const full = path.join(assetsDir, file);
    const before = fs.readFileSync(full, 'utf8');
    const after = patchTabBarJs(before);
    if (after !== before) fs.writeFileSync(full, after);
  }

  writeAboutPages();

  const meta = {
    builtAt: new Date().toISOString(),
    season: seasonName(),
    models: fleet.length,
    snapshot: snap,
  };
  fs.writeFileSync(path.join(DIST, 'build.json'), JSON.stringify(meta, null, 2));
  console.log(`[build] dist ready (${fleet.length} models, season=${meta.season})`);
}

main();

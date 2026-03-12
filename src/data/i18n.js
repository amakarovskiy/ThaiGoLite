// ThaiGo Lite — Internationalization
// Supported: ru, en, de, fr, es

export const LANGS = [
  { code: 'ru', flag: '\u{1F1F7}\u{1F1FA}', label: 'RU', name: 'Русский' },
  { code: 'en', flag: '\u{1F1EC}\u{1F1E7}', label: 'EN', name: 'English' },
  { code: 'de', flag: '\u{1F1E9}\u{1F1EA}', label: 'DE', name: 'Deutsch' },
  { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'FR', name: 'Français' },
  { code: 'es', flag: '\u{1F1EA}\u{1F1F8}', label: 'ES', name: 'Español' }
];

const LS_KEY = 'thaigo_lang';

export function detectLang() {
  const saved = localStorage.getItem(LS_KEY);
  if (saved && LANGS.some(l => l.code === saved)) return saved;
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return LANGS.some(l => l.code === nav) ? nav : 'en';
}

export function saveLang(code) {
  localStorage.setItem(LS_KEY, code);
}

export const T = {
  // ── Hero ──
  heroTitle: {
    ru: 'Аренда байков<br>на Пхукете',
    en: 'Bike Rental<br>in Phuket',
    de: 'Motorrad-Verleih<br>auf Phuket',
    fr: 'Location de motos<br>à Phuket',
    es: 'Alquiler de motos<br>en Phuket'
  },
  heroSub: {
    ru: 'Без залога паспорта. Доставка по острову.<br>От 180 \u0E3F/сутки. Договор и страховка.',
    en: 'No passport deposit. Island-wide delivery.<br>From 180 \u0E3F/day. Contract & insurance.',
    de: 'Ohne Passkaution. Inselweite Lieferung.<br>Ab 180 \u0E3F/Tag. Vertrag & Versicherung.',
    fr: 'Sans caution de passeport. Livraison sur l\u2019\u00eele.<br>\u00C0 partir de 180 \u0E3F/jour. Contrat & assurance.',
    es: 'Sin dep\u00f3sito de pasaporte. Entrega en toda la isla.<br>Desde 180 \u0E3F/d\u00eda. Contrato y seguro.'
  },

  // ── Why ThaiGo ──
  whyTitle: {
    ru: 'Почему ThaiGo', en: 'Why ThaiGo', de: 'Warum ThaiGo', fr: 'Pourquoi ThaiGo', es: 'Por qué ThaiGo'
  },
  whyNoDeposit: {
    ru: 'Без залога паспорта', en: 'No passport deposit', de: 'Ohne Passkaution', fr: 'Sans caution', es: 'Sin depósito'
  },
  whyDelivery: {
    ru: 'Доставка в отель', en: 'Hotel delivery', de: 'Hotellieferung', fr: 'Livraison hôtel', es: 'Entrega al hotel'
  },
  whyPrice: {
    ru: 'От 180 \u0E3F/сутки', en: 'From 180 \u0E3F/day', de: 'Ab 180 \u0E3F/Tag', fr: 'Dès 180 \u0E3F/jour', es: 'Desde 180 \u0E3F/día'
  },
  whySupport: {
    ru: '24/7 на русском', en: '24/7 Support', de: '24/7 Support', fr: '24/7 Support', es: '24/7 Soporte'
  },
  whyReplace: {
    ru: 'Замена при поломке', en: 'Free replacement', de: 'Kostenloser Ersatz', fr: 'Remplacement gratuit', es: 'Reemplazo gratis'
  },
  whyContract: {
    ru: 'Договор + страховка', en: 'Contract + insurance', de: 'Vertrag + Versicherung', fr: 'Contrat + assurance', es: 'Contrato + seguro'
  },

  // ── Popular bikes ──
  popularTitle: {
    ru: 'Популярные байки', en: 'Popular Bikes', de: 'Beliebte Bikes', fr: 'Motos populaires', es: 'Motos populares'
  },
  viewAll: {
    ru: 'Все \u2192', en: 'All \u2192', de: 'Alle \u2192', fr: 'Tout \u2192', es: 'Todos \u2192'
  },

  // ── Steps (How it works) ──
  step1: { ru: 'Выбери байк', en: 'Choose a bike', de: 'Bike wählen', fr: 'Choisis un scooter', es: 'Elige una moto' },
  step2: { ru: 'Мы привезём', en: 'We deliver', de: 'Wir liefern', fr: 'On livre', es: 'Lo entregamos' },
  step3: { ru: 'Езди и кайфуй', en: 'Ride & enjoy', de: 'Fahre & genieße', fr: 'Roule et profite', es: 'Conduce y disfruta' },

  // ── Reviews ──
  reviewsTitle: { ru: 'Что говорят клиенты', en: 'What clients say', de: 'Was Kunden sagen', fr: 'Avis clients', es: 'Lo que dicen los clientes' },
  reviews: [
    {
      text: {
        ru: 'Взяли PCX на неделю — привезли прямо к отелю, всё чисто и заправлено. Когда поцарапали зеркало — позвонили ребятам, решили вопрос за 10 минут без скандалов. Рекомендую.',
        en: 'Rented a PCX for a week — delivered right to our hotel, clean and fueled. When we scratched the mirror, called the guys and they sorted it in 10 minutes, no drama. Highly recommend.',
        de: 'PCX für eine Woche gemietet — direkt zum Hotel geliefert, sauber und betankt. Als wir den Spiegel zerkratzten, haben die Jungs das in 10 Minuten geklärt. Empfehlenswert.',
        fr: 'Loué un PCX pour une semaine — livré à l\'hôtel, propre et plein. Quand on a rayé le rétro, les gars ont réglé ça en 10 min sans stress. Je recommande.',
        es: 'Alquilamos un PCX por una semana — lo trajeron al hotel, limpio y con tanque lleno. Cuando rayamos el espejo, lo resolvieron en 10 minutos sin drama. Recomendado.'
      },
      author: { ru: 'Михаил, Москва', en: 'Mikhail, Moscow', de: 'Mikhail, Moskau', fr: 'Mikhaïl, Moscou', es: 'Mikhail, Moscú' }
    },
    {
      text: {
        ru: 'Брали две Scoopy на 10 дней, объездили весь остров. Цены честные, договор нормальный, паспорт не забирали. Будем брать снова в следующий раз.',
        en: 'Rented two Scoopys for 10 days, explored the whole island. Fair prices, proper contract, no passport held. Will rent again next time.',
        de: 'Zwei Scoopys für 10 Tage gemietet, die ganze Insel erkundet. Faire Preise, ordentlicher Vertrag, kein Pass einbehalten. Nächstes Mal wieder.',
        fr: 'Loué deux Scoopy pour 10 jours, on a fait tout l\'île. Prix honnêtes, contrat correct, pas de passeport retenu. On reviendra.',
        es: 'Alquilamos dos Scoopy por 10 días, recorrimos toda la isla. Precios justos, contrato normal, sin retener pasaporte. Volveremos.'
      },
      author: { ru: 'Анна и Дима, Санкт-Петербург', en: 'Anna & Dima, St. Petersburg', de: 'Anna & Dima, St. Petersburg', fr: 'Anna & Dima, Saint-Pétersbourg', es: 'Anna y Dima, San Petersburgo' }
    },
    {
      text: {
        ru: 'Первый раз арендовала байк вообще в жизни, очень переживала. Ребята всё объяснили, помогли выбрать модель под мой рост и опыт. Каталась без проблем всю поездку.',
        en: 'First time renting a bike ever, I was really nervous. The guys explained everything, helped me choose the right model for my height and experience. Rode the whole trip without issues.',
        de: 'Zum ersten Mal ein Bike gemietet, war sehr nervös. Die Jungs haben alles erklärt und mir das passende Modell empfohlen. Die ganze Reise problemlos gefahren.',
        fr: 'Première location de scooter de ma vie, j\'étais stressée. Les gars ont tout expliqué, m\'ont aidée à choisir le bon modèle. J\'ai roulé sans souci pendant tout le séjour.',
        es: 'Primera vez alquilando una moto en mi vida, estaba muy nerviosa. Los chicos me explicaron todo y me ayudaron a elegir el modelo adecuado. Conduje sin problemas todo el viaje.'
      },
      author: { ru: 'Лера, Екатеринбург', en: 'Lera, Yekaterinburg', de: 'Lera, Jekaterinburg', fr: 'Lera, Iekaterinbourg', es: 'Lera, Ekaterimburgo' }
    }
  ],

  // ── Delivery districts ──
  deliveryTitle: {
    ru: 'Доставка по Пхукету', en: 'Delivery across Phuket', de: 'Lieferung auf Phuket', fr: 'Livraison à Phuket', es: 'Entrega en Phuket'
  },
  deliveryNote: {
    ru: 'Доставка в отель или виллу. Возврат — туда же.',
    en: 'Delivery to your hotel or villa. Return pickup included.',
    de: 'Lieferung an Ihr Hotel oder Ihre Villa. Rückgabe inklusive.',
    fr: 'Livraison à votre hôtel ou villa. Retour inclus.',
    es: 'Entrega en tu hotel o villa. Recogida de vuelta incluida.'
  },
  dlvAreas: [
    {
      name: { ru: 'Ката / Карон', en: 'Kata / Karon', de: 'Kata / Karon', fr: 'Kata / Karon', es: 'Kata / Karon' },
      cond: { ru: 'Бесплатно от 3 дней', en: 'Free from 3 days', de: 'Kostenlos ab 3 Tagen', fr: 'Gratuit dès 3 jours', es: 'Gratis desde 3 días' },
      color: 'green'
    },
    {
      name: { ru: 'Патонг', en: 'Patong', de: 'Patong', fr: 'Patong', es: 'Patong' },
      cond: { ru: 'Бесплатно от 3 дней', en: 'Free from 3 days', de: 'Kostenlos ab 3 Tagen', fr: 'Gratuit dès 3 jours', es: 'Gratis desde 3 días' },
      color: 'green'
    },
    {
      name: { ru: 'Камала / Сурин', en: 'Kamala / Surin', de: 'Kamala / Surin', fr: 'Kamala / Surin', es: 'Kamala / Surin' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días' },
      color: 'yellow'
    },
    {
      name: { ru: 'Бангтао', en: 'Bangtao', de: 'Bangtao', fr: 'Bangtao', es: 'Bangtao' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días' },
      color: 'yellow'
    },
    {
      name: { ru: 'Раваи / Най Харн', en: 'Rawai / Nai Harn', de: 'Rawai / Nai Harn', fr: 'Rawai / Nai Harn', es: 'Rawai / Nai Harn' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días' },
      color: 'yellow'
    },
    {
      name: { ru: 'Чалонг / Пхукет-таун', en: 'Chalong / Phuket Town', de: 'Chalong / Phuket Town', fr: 'Chalong / Phuket Town', es: 'Chalong / Phuket Town' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días' },
      color: 'yellow'
    },
    {
      name: { ru: 'Аэропорт / Най Янг', en: 'Airport / Nai Yang', de: 'Flughafen / Nai Yang', fr: 'Aéroport / Nai Yang', es: 'Aeropuerto / Nai Yang' },
      cond: { ru: '500 ฿ · бесплатно от 10 дней', en: '500 ฿ · free from 10 days', de: '500 ฿ · kostenlos ab 10 Tagen', fr: '500 ฿ · gratuit dès 10 jours', es: '500 ฿ · gratis desde 10 días' },
      color: 'blue'
    },
    {
      name: { ru: 'Другой район', en: 'Other area', de: 'Anderes Gebiet', fr: 'Autre quartier', es: 'Otra zona' },
      cond: { ru: 'Уточняйте', en: 'Contact us', de: 'Auf Anfrage', fr: 'Nous contacter', es: 'Consúltenos' },
      color: 'blue'
    }
  ],

  // ── Tab bar ──
  tabHome: {
    ru: 'Главная', en: 'Home', de: 'Start', fr: 'Accueil', es: 'Inicio'
  },
  tabBikes: {
    ru: 'Байки', en: 'Bikes', de: 'Bikes', fr: 'Motos', es: 'Motos'
  },
  tabGuide: {
    ru: 'Гид', en: 'Guide', de: 'Guide', fr: 'Guide', es: 'Guía'
  },
  tabRoutes: {
    ru: 'Маршруты', en: 'Routes', de: 'Routen', fr: 'Itinéraires', es: 'Rutas'
  },
  tabContacts: {
    ru: 'Контакты', en: 'Contacts', de: 'Kontakt', fr: 'Contact', es: 'Contacto'
  },

  // ── Bike filters ──
  filterAll: {
    ru: 'Все', en: 'All', de: 'Alle', fr: 'Tout', es: 'Todos'
  },
  filterScooter: {
    ru: 'Скутеры', en: 'Scooters', de: 'Roller', fr: 'Scooters', es: 'Scooters'
  },
  filterMaxi: {
    ru: 'Макси', en: 'Maxi', de: 'Maxi', fr: 'Maxi', es: 'Maxi'
  },
  filterMoto: {
    ru: 'Мотоциклы', en: 'Motorcycles', de: 'Motorräder', fr: 'Motos', es: 'Motocicletas'
  },
  filterCar: {
    ru: 'Авто', en: 'Cars', de: 'Autos', fr: 'Voitures', es: 'Coches'
  },
  bikeBtnRent: {
    ru: 'Взять', en: 'Rent', de: 'Mieten', fr: 'Louer', es: 'Alquilar'
  },

  // ── Place filters ──
  placeTop: {
    ru: 'Топ', en: 'Top', de: 'Top', fr: 'Top', es: 'Top'
  },
  placeBeach: {
    ru: 'Пляжи', en: 'Beaches', de: 'Strände', fr: 'Plages', es: 'Playas'
  },
  placeView: {
    ru: 'Смотровые', en: 'Viewpoints', de: 'Aussichten', fr: 'Panoramas', es: 'Miradores'
  },
  placeTemple: {
    ru: 'Храмы', en: 'Temples', de: 'Tempel', fr: 'Temples', es: 'Templos'
  },
  placeNature: {
    ru: 'Природа', en: 'Nature', de: 'Natur', fr: 'Nature', es: 'Naturaleza'
  },
  placeMarket: {
    ru: 'Рынки', en: 'Markets', de: 'Märkte', fr: 'Marchés', es: 'Mercados'
  },
  placeFood: {
    ru: 'Еда', en: 'Food', de: 'Essen', fr: 'Cuisine', es: 'Comida'
  },
  placePhoto: {
    ru: 'Фото', en: 'Photo', de: 'Foto', fr: 'Photo', es: 'Foto'
  },
  placeSearchPlaceholder: {
    ru: 'Поиск места...', en: 'Search place...', de: 'Ort suchen...', fr: 'Chercher un lieu...', es: 'Buscar lugar...'
  },

  // ── Route subtabs ──
  subtabPlaces: {
    ru: 'Места', en: 'Places', de: 'Orte', fr: 'Lieux', es: 'Lugares'
  },
  subtabRoute: {
    ru: 'Маршрут', en: 'Route', de: 'Route', fr: 'Itinéraire', es: 'Ruta'
  },

  // ── Route panel ──
  routeLabel: {
    ru: 'Маршрут', en: 'Route', de: 'Route', fr: 'Itinéraire', es: 'Ruta'
  },
  routeReset: {
    ru: 'Сбросить', en: 'Reset', de: 'Zurücksetzen', fr: 'Réinitialiser', es: 'Resetear'
  },
  routeEmpty: {
    ru: 'Выбери 2+ места чтобы построить маршрут',
    en: 'Pick 2+ places to build a route',
    de: 'Wähle 2+ Orte für eine Route',
    fr: 'Choisis 2+ lieux pour créer un itinéraire',
    es: 'Elige 2+ lugares para crear una ruta'
  },
  statKm: { ru: 'км', en: 'km', de: 'km', fr: 'km', es: 'km' },
  statEnRoute: { ru: 'в пути', en: 'en route', de: 'unterwegs', fr: 'en route', es: 'en ruta' },
  statFuel: { ru: '\u0E3F бензин', en: '\u0E3F fuel', de: '\u0E3F Benzin', fr: '\u0E3F carburant', es: '\u0E3F gasolina' },
  costTaxiLabel: { ru: 'Такси:', en: 'Taxi:', de: 'Taxi:', fr: 'Taxi :', es: 'Taxi:' },
  costBikeLabel: {
    ru: 'Байк: ~180 \u0E3F/день', en: 'Bike: ~180 \u0E3F/day', de: 'Bike: ~180 \u0E3F/Tag', fr: 'Moto : ~180 \u0E3F/jour', es: 'Moto: ~180 \u0E3F/día'
  },
  routeNeedBike: {
    ru: 'Для маршрута нужен байк', en: 'You need a bike for this route', de: 'Für die Route brauchst du ein Bike', fr: 'Un scooter est nécessaire', es: 'Necesitas una moto para esta ruta'
  },
  routeNeedBikePrice: {
    ru: 'от 180 \u0E3F в день', en: 'from 180 \u0E3F/day', de: 'ab 180 \u0E3F/Tag', fr: 'dès 180 \u0E3F/jour', es: 'desde 180 \u0E3F/día'
  },
  routeRentBtn: {
    ru: 'Арендовать', en: 'Rent a bike', de: 'Mieten', fr: 'Louer', es: 'Alquilar'
  },
  routeCleared: {
    ru: 'Маршрут сброшен', en: 'Route cleared', de: 'Route gelöscht', fr: 'Itinéraire réinitialisé', es: 'Ruta eliminada'
  },
  placeAdded: {
    ru: 'добавлен', en: 'added', de: 'hinzugefügt', fr: 'ajouté', es: 'añadido'
  },
  placeRemoved: {
    ru: 'убран', en: 'removed', de: 'entfernt', fr: 'retiré', es: 'eliminado'
  },
  maxPoints: {
    ru: 'Максимум ${n} точек', en: 'Maximum ${n} points', de: 'Maximal ${n} Punkte', fr: 'Maximum ${n} points', es: 'Máximo ${n} puntos'
  },
  kmFromPatong: {
    ru: '~${km} км от Патонга', en: '~${km} km from Patong', de: '~${km} km von Patong', fr: '~${km} km de Patong', es: '~${km} km de Patong'
  },
  addToRoute: {
    ru: '+ В маршрут', en: '+ Add to route', de: '+ Zur Route', fr: '+ Ajouter', es: '+ Añadir a ruta'
  },
  inRoute: {
    ru: '\u2713 В маршруте', en: '\u2713 In route', de: '\u2713 In Route', fr: '\u2713 Ajouté', es: '\u2713 En ruta'
  },

  // ── Contacts ──
  contactsTitle: {
    ru: 'Контакты', en: 'Contacts', de: 'Kontakt', fr: 'Contact', es: 'Contacto'
  },
  contactHours: {
    ru: 'Ежедневно 8:00–20:00', en: 'Daily 8:00–20:00', de: 'Täglich 8:00–20:00', fr: 'Tous les jours 8h–20h', es: 'Diario 8:00–20:00'
  },
  deliveryAreasTitle: {
    ru: 'Районы доставки', en: 'Delivery Areas', de: 'Liefergebiete', fr: 'Zones de livraison', es: 'Zonas de entrega'
  },

  // ── FAQ ──
  faqTitle: { ru: 'FAQ', en: 'FAQ', de: 'FAQ', fr: 'FAQ', es: 'FAQ' },
  faq: {
    ru: [
      { q: 'Сколько стоит аренда байка?', a: 'Honda Scoopy от 180 \u0E3F/день, Honda Click от 200 \u0E3F/день, PCX/NMAX от 300 \u0E3F/день. Чем дольше срок — тем дешевле.' },
      { q: 'Какие документы нужны?', a: 'Загранпаспорт и международные права (категория А). Залог от 2000 \u0E3F или копия паспорта.' },
      { q: 'Есть ли страховка?', a: 'Да, каждый байк застрахован. Аренда оформляется договором по законам Таиланда.' },
      { q: 'Безопасно ли ездить?', a: 'Движение левостороннее. Шлем обязателен (штраф 500 \u0E3F). Не превышайте 60 км/ч в городе.' },
      { q: 'Сколько стоит бензин?', a: '~43 \u0E3F/литр. Расход скутера — 2 л/100 км. Маршрут 50 км обойдётся в ~45 \u0E3F бензина.' },
      { q: 'Как пользоваться планировщиком?', a: 'Откройте вкладку «Маршруты», добавьте места, получите расчёт км, времени и бензина.' }
    ],
    en: [
      { q: 'How much does it cost to rent a bike?', a: 'Honda Scoopy from 180 \u0E3F/day, Honda Click from 200 \u0E3F/day, PCX/NMAX from 300 \u0E3F/day. Longer rental = lower price.' },
      { q: 'What documents do I need?', a: 'Passport and international driving permit (category A). Deposit from 2000 \u0E3F or passport copy.' },
      { q: 'Is there insurance?', a: 'Yes, every bike is insured. Rental is formalized with a contract under Thai law.' },
      { q: 'Is it safe to ride?', a: 'Left-hand traffic. Helmet is mandatory (500 \u0E3F fine). Don\'t exceed 60 km/h in town.' },
      { q: 'How much is fuel?', a: '~43 \u0E3F/liter. Scooter uses ~2 L/100 km. A 50 km trip costs ~45 \u0E3F in fuel.' },
      { q: 'How to use the route planner?', a: 'Open the Routes tab, add places, get distance, time, and fuel estimates.' }
    ],
    de: [
      { q: 'Was kostet die Miete?', a: 'Honda Scoopy ab 180 \u0E3F/Tag, Honda Click ab 200 \u0E3F/Tag, PCX/NMAX ab 300 \u0E3F/Tag. Längere Miete = günstigerer Preis.' },
      { q: 'Welche Dokumente brauche ich?', a: 'Reisepass und internationaler Führerschein (Klasse A). Kaution ab 2000 \u0E3F oder Passkopie.' },
      { q: 'Gibt es eine Versicherung?', a: 'Ja, jedes Bike ist versichert. Die Miete wird mit einem Vertrag nach thailändischem Recht formalisiert.' },
      { q: 'Ist es sicher zu fahren?', a: 'Linksverkehr. Helm ist Pflicht (500 \u0E3F Strafe). Nicht über 60 km/h in der Stadt.' },
      { q: 'Was kostet Benzin?', a: '~43 \u0E3F/Liter. Roller verbraucht ~2 L/100 km. Eine 50-km-Fahrt kostet ~45 \u0E3F Benzin.' },
      { q: 'Wie nutze ich den Routenplaner?', a: 'Öffne den Tab Routen, füge Orte hinzu, erhalte Entfernung, Zeit und Benzinkosten.' }
    ],
    fr: [
      { q: 'Combien coûte la location ?', a: 'Honda Scoopy dès 180 \u0E3F/jour, Honda Click dès 200 \u0E3F/jour, PCX/NMAX dès 300 \u0E3F/jour. Plus longue la location, plus bas le prix.' },
      { q: 'Quels documents faut-il ?', a: 'Passeport et permis international (catégorie A). Caution à partir de 2000 \u0E3F ou copie de passeport.' },
      { q: 'Y a-t-il une assurance ?', a: 'Oui, chaque moto est assurée. La location est formalisée par un contrat selon la loi thaïlandaise.' },
      { q: 'Est-ce sûr de conduire ?', a: 'Conduite à gauche. Le casque est obligatoire (amende de 500 \u0E3F). Ne dépassez pas 60 km/h en ville.' },
      { q: 'Combien coûte l\'essence ?', a: '~43 \u0E3F/litre. Un scooter consomme ~2 L/100 km. Un trajet de 50 km coûte ~45 \u0E3F.' },
      { q: 'Comment utiliser le planificateur ?', a: 'Ouvrez l\'onglet Itinéraires, ajoutez des lieux, obtenez distance, temps et coût carburant.' }
    ],
    es: [
      { q: '¿Cuánto cuesta alquilar una moto?', a: 'Honda Scoopy desde 180 \u0E3F/día, Honda Click desde 200 \u0E3F/día, PCX/NMAX desde 300 \u0E3F/día. Más días = precio más bajo.' },
      { q: '¿Qué documentos necesito?', a: 'Pasaporte y permiso internacional (categoría A). Depósito desde 2000 \u0E3F o copia de pasaporte.' },
      { q: '¿Hay seguro?', a: 'Sí, cada moto está asegurada. El alquiler se formaliza con contrato según la ley tailandesa.' },
      { q: '¿Es seguro conducir?', a: 'Tráfico por la izquierda. Casco obligatorio (multa de 500 \u0E3F). No superar 60 km/h en ciudad.' },
      { q: '¿Cuánto cuesta la gasolina?', a: '~43 \u0E3F/litro. Un scooter consume ~2 L/100 km. Un viaje de 50 km cuesta ~45 \u0E3F.' },
      { q: '¿Cómo usar el planificador de rutas?', a: 'Abre la pestaña Rutas, añade lugares y obtén distancia, tiempo y coste de combustible.' }
    ]
  },

  contactsFooter: {
    ru: 'ThaiGo Rent — аренда байков на Пхукете. Офис в Кате.',
    en: 'ThaiGo Rent — bike rental in Phuket. Office in Kata.',
    de: 'ThaiGo Rent — Motorrad-Verleih auf Phuket. Büro in Kata.',
    fr: 'ThaiGo Rent — location de motos à Phuket. Bureau à Kata.',
    es: 'ThaiGo Rent — alquiler de motos en Phuket. Oficina en Kata.'
  },

  // ── Booking sheet ──
  sheetTariffs: {
    ru: 'Тарифы', en: 'Rates', de: 'Tarife', fr: 'Tarifs', es: 'Tarifas'
  },
  sheetDays12: {
    ru: '1–2 дня', en: '1–2 days', de: '1–2 Tage', fr: '1–2 jours', es: '1–2 días'
  },
  sheetDays36: {
    ru: '3–6 дней', en: '3–6 days', de: '3–6 Tage', fr: '3–6 jours', es: '3–6 días'
  },
  sheetDays713: {
    ru: '7–13', en: '7–13', de: '7–13', fr: '7–13', es: '7–13'
  },
  sheetDays1429: {
    ru: '14–29', en: '14–29', de: '14–29', fr: '14–29', es: '14–29'
  },
  sheetDays30: {
    ru: '30 дн', en: '30 d', de: '30 T', fr: '30 j', es: '30 d'
  },
  sheetRentalDays: {
    ru: 'Дней аренды:', en: 'Rental days:', de: 'Miettage:', fr: 'Jours de location :', es: 'Días de alquiler:'
  },
  sheetTotal: {
    ru: 'Итого:', en: 'Total:', de: 'Gesamt:', fr: 'Total :', es: 'Total:'
  },

  // ── Booking WA message ──
  waMsgBike: {
    ru: 'Хочу арендовать ${name} на ${days} дн.',
    en: 'I want to rent ${name} for ${days} days.',
    de: 'Ich möchte ${name} für ${days} Tage mieten.',
    fr: 'Je voudrais louer ${name} pour ${days} jours.',
    es: 'Quiero alquilar ${name} por ${days} días.'
  },
  waMsgRoute: {
    ru: 'Хочу арендовать байк для маршрута: ${route} (~${km} км)',
    en: 'I want to rent a bike for route: ${route} (~${km} km)',
    de: 'Ich möchte ein Bike für die Route mieten: ${route} (~${km} km)',
    fr: 'Je voudrais louer un scooter pour l\'itinéraire : ${route} (~${km} km)',
    es: 'Quiero alquilar una moto para la ruta: ${route} (~${km} km)'
  },

  // ── Price prefix ──
  priceFrom: {
    ru: 'от', en: 'from', de: 'ab', fr: 'dès', es: 'desde'
  },
  perDay: {
    ru: '/день', en: '/day', de: '/Tag', fr: '/jour', es: '/día'
  },

  // ── Guide micro-menu ──
  guideMenuRoutes: {
    ru: 'Маршруты', en: 'Routes', de: 'Routen', fr: 'Itinéraires', es: 'Rutas'
  },
  guideMenuRiderTest: {
    ru: 'Райдер-тест', en: 'Rider Test', de: 'Rider-Test', fr: 'Test Rider', es: 'Test Rider'
  },

  // ── Teaser card ──
  teaserTitle: {
    ru: 'Ты уверен что готов ездить на Пхукете?',
    en: 'Are you sure you\'re ready to ride in Phuket?',
    de: 'Bist du sicher, dass du auf Phuket fahren kannst?',
    fr: 'Es-tu sûr d\'être prêt à rouler à Phuket ?',
    es: '¿Estás seguro de que estás listo para conducir en Phuket?'
  },
  teaserSub: {
    ru: 'Пройди Райдер-тест за 3 минуты',
    en: 'Take the Rider Test in 3 minutes',
    de: 'Mache den Rider-Test in 3 Minuten',
    fr: 'Fais le Test Rider en 3 minutes',
    es: 'Haz el Test Rider en 3 minutos'
  },
  teaserBtn: {
    ru: 'Начать тест', en: 'Start test', de: 'Test starten', fr: 'Commencer le test', es: 'Iniciar test'
  },

  // ── Rider Test UI ──
  riderTestTitle: {
    ru: 'Райдер-тест', en: 'Rider Test', de: 'Rider-Test', fr: 'Test Rider', es: 'Test Rider'
  },
  riderNext: {
    ru: 'Дальше →', en: 'Next →', de: 'Weiter →', fr: 'Suivant →', es: 'Siguiente →'
  },
  resumeTitle: {
    ru: 'Продолжить тест?', en: 'Continue test?', de: 'Test fortsetzen?', fr: 'Continuer le test ?', es: '¿Continuar el test?'
  },
  resumeText: {
    ru: 'Ты остановился на вопросе ${n} из ${total}',
    en: 'You stopped at question ${n} of ${total}',
    de: 'Du warst bei Frage ${n} von ${total}',
    fr: 'Tu t\'es arrêté à la question ${n} sur ${total}',
    es: 'Te detuviste en la pregunta ${n} de ${total}'
  },
  resumeContinue: {
    ru: 'Продолжить', en: 'Continue', de: 'Fortsetzen', fr: 'Continuer', es: 'Continuar'
  },
  resumeRestart: {
    ru: 'Сначала', en: 'Restart', de: 'Neustart', fr: 'Recommencer', es: 'Reiniciar'
  },
  finalTitle: {
    ru: 'Ты готов к Пхукету!',
    en: 'You\'re ready for Phuket!',
    de: 'Du bist bereit für Phuket!',
    fr: 'Tu es prêt pour Phuket !',
    es: '¡Estás listo para Phuket!'
  },
  finalText: {
    ru: 'Теперь ты знаешь то что большинство туристов узнают только после неприятной ситуации. Езди спокойно — мы всегда на связи если что-то пойдёт не так.',
    en: 'Now you know what most tourists only learn after an unpleasant situation. Ride safe — we\'re always in touch if something goes wrong.',
    de: 'Jetzt weißt du, was die meisten Touristen erst nach einer unangenehmen Situation lernen. Fahre sicher — wir sind immer erreichbar, wenn etwas schiefgeht.',
    fr: 'Maintenant tu sais ce que la plupart des touristes n\'apprennent qu\'après une mésaventure. Roule tranquille — on est toujours joignables si ça tourne mal.',
    es: 'Ahora sabes lo que la mayoría de turistas solo aprenden después de una situación desagradable. Conduce seguro — siempre estamos disponibles si algo sale mal.'
  },
  finalBtn: {
    ru: 'Выбрать байк 🛵', en: 'Choose a bike 🛵', de: 'Bike wählen 🛵', fr: 'Choisir une moto 🛵', es: 'Elegir una moto 🛵'
  },
  finalShare: {
    ru: 'Поделиться результатом', en: 'Share result', de: 'Ergebnis teilen', fr: 'Partager le résultat', es: 'Compartir resultado'
  },
  shareTitle: {
    ru: 'Райдер-тест', en: 'Rider Test', de: 'Rider-Test', fr: 'Test Rider', es: 'Test Rider'
  },
  shareText: {
    ru: 'Я прошёл Райдер-тест на Пхукете! А ты готов к острову? 🛵 thaigo.rent',
    en: 'I passed the Rider Test in Phuket! Are you ready for the island? 🛵 thaigo.rent',
    de: 'Ich habe den Rider-Test auf Phuket bestanden! Bist du bereit für die Insel? 🛵 thaigo.rent',
    fr: 'J\'ai réussi le Test Rider à Phuket ! Es-tu prêt pour l\'île ? 🛵 thaigo.rent',
    es: '¡Pasé el Test Rider en Phuket! ¿Estás listo para la isla? 🛵 thaigo.rent'
  },

  // ── Rider Test Questions ──
  rtQ1: {
    ru: {
      text: 'Байк привезли к отелю. Солнце светит, море ждёт. Менеджер протягивает ключи. Что делаешь первым делом?',
      answers: [
        'Подписываю договор и сразу уезжаю.',
        'Снимаю видео вокруг байка — все царапины до отъезда.',
        'Проверяю тормоза и зеркала.'
      ],
      explanation: 'Мы сами снимаем видео при каждой передаче байка — и тебе советуем то же самое. 30 секунд на телефон, и никаких споров при возврате. Все счастливы 🤝'
    },
    en: {
      text: 'The bike was delivered to your hotel. The sun is shining, the sea awaits. The manager hands you the keys. What do you do first?',
      answers: [
        'Sign the contract and ride away immediately.',
        'Record a video around the bike — all scratches before leaving.',
        'Check brakes and mirrors.'
      ],
      explanation: 'We record video at every bike handover — and we advise you to do the same. 30 seconds on your phone, and no disputes when returning. Everyone\'s happy 🤝'
    },
    de: {
      text: 'Das Bike wurde zum Hotel geliefert. Die Sonne scheint, das Meer wartet. Der Manager reicht dir die Schlüssel. Was machst du zuerst?',
      answers: [
        'Vertrag unterschreiben und sofort losfahren.',
        'Ein Video rund um das Bike aufnehmen — alle Kratzer vor der Abfahrt.',
        'Bremsen und Spiegel überprüfen.'
      ],
      explanation: 'Wir nehmen bei jeder Übergabe ein Video auf — und empfehlen dir dasselbe. 30 Sekunden mit dem Handy, und keine Streitigkeiten bei der Rückgabe. Alle sind glücklich 🤝'
    },
    fr: {
      text: 'La moto a été livrée à ton hôtel. Le soleil brille, la mer t\'attend. Le gérant te tend les clés. Que fais-tu en premier ?',
      answers: [
        'Signer le contrat et partir immédiatement.',
        'Filmer la moto sous tous les angles — toutes les rayures avant le départ.',
        'Vérifier les freins et les rétroviseurs.'
      ],
      explanation: 'Nous filmons chaque remise de moto — et nous te conseillons de faire pareil. 30 secondes avec ton téléphone, et aucun litige au retour. Tout le monde est content 🤝'
    },
    es: {
      text: 'La moto fue entregada en tu hotel. El sol brilla, el mar espera. El encargado te entrega las llaves. ¿Qué haces primero?',
      answers: [
        'Firmo el contrato y me voy inmediatamente.',
        'Grabo un video alrededor de la moto — todos los rasguños antes de irme.',
        'Reviso frenos y espejos.'
      ],
      explanation: 'Nosotros grabamos video en cada entrega de moto — y te aconsejamos hacer lo mismo. 30 segundos con tu teléfono y no hay disputas al devolver. Todos contentos 🤝'
    }
  },
  rtQ2: {
    ru: {
      text: 'Только что прошёл ливень. Асфальт блестит, впереди поворот с горки. Сзади нетерпеливо сигналит байк. Что делаешь?',
      answers: [
        'Ускоряюсь — не буду мешать.',
        'Торможу резко перед поворотом.',
        'Сбавляю скорость заранее, вхожу плавно — пусть обгоняет.'
      ],
      explanation: 'Мокрый асфальт после дождя — самая частая причина падений туристов на Пхукете. Особенно первые минуты когда масло ещё не смылось. Медленно = доедешь 🙏'
    },
    en: {
      text: 'It just rained heavily. The asphalt is glistening, there\'s a downhill turn ahead. A bike behind you is honking impatiently. What do you do?',
      answers: [
        'Speed up — I don\'t want to be in the way.',
        'Brake hard before the turn.',
        'Slow down early, enter smoothly — let them overtake.'
      ],
      explanation: 'Wet asphalt after rain is the most common cause of tourist falls in Phuket. Especially the first minutes when oil hasn\'t washed away yet. Slow = you\'ll make it 🙏'
    },
    de: {
      text: 'Gerade hat es stark geregnet. Der Asphalt glänzt, vor dir liegt eine Kurve bergab. Hinter dir hupt ein Bike ungeduldig. Was machst du?',
      answers: [
        'Beschleunigen — ich will nicht im Weg sein.',
        'Vor der Kurve hart bremsen.',
        'Frühzeitig abbremsen, sanft einfahren — lass sie überholen.'
      ],
      explanation: 'Nasser Asphalt nach Regen ist die häufigste Ursache für Stürze von Touristen auf Phuket. Besonders die ersten Minuten, wenn das Öl noch nicht abgespült ist. Langsam = du kommst an 🙏'
    },
    fr: {
      text: 'Il vient de pleuvoir. L\'asphalte brille, un virage en descente arrive. Derrière toi, un scooter klaxonne impatiemment. Que fais-tu ?',
      answers: [
        'J\'accélère — je ne veux pas gêner.',
        'Je freine fort avant le virage.',
        'Je ralentis à l\'avance, j\'entre doucement — qu\'il double.'
      ],
      explanation: 'L\'asphalte mouillé après la pluie est la cause la plus fréquente de chutes de touristes à Phuket. Surtout les premières minutes quand l\'huile n\'a pas encore été lavée. Lentement = tu arriveras 🙏'
    },
    es: {
      text: 'Acaba de llover fuerte. El asfalto brilla, hay una curva cuesta abajo adelante. Detrás, una moto toca la bocina con impaciencia. ¿Qué haces?',
      answers: [
        'Acelero — no quiero estorbar.',
        'Freno fuerte antes de la curva.',
        'Reduzco velocidad con anticipación, entro suave — que me adelante.'
      ],
      explanation: 'El asfalto mojado después de la lluvia es la causa más común de caídas de turistas en Phuket. Especialmente los primeros minutos cuando el aceite aún no se ha lavado. Lento = llegarás 🙏'
    }
  },
  rtQ3: {
    ru: {
      text: 'Едешь на смотровую на закате. Дорога узкая и крутая. Навстречу идут машины. Где держишься?',
      answers: [
        'Правее — подальше от края.',
        'По центру — так виднее.',
        'Левее — это моя полоса в левостороннем движении.'
      ],
      explanation: 'Таиланд — левостороннее движение. Твоя полоса — левая. На серпантине это критично. На спуске тормози мотором, не ручкой 🏔️'
    },
    en: {
      text: 'You\'re heading to a viewpoint at sunset. The road is narrow and steep. Cars are coming your way. Where do you stay?',
      answers: [
        'To the right — away from the edge.',
        'In the center — better visibility.',
        'To the left — it\'s my lane in left-hand traffic.'
      ],
      explanation: 'Thailand has left-hand traffic. Your lane is the left one. On winding mountain roads this is critical. On descents, use engine braking, not the hand brake 🏔️'
    },
    de: {
      text: 'Du fährst zum Aussichtspunkt bei Sonnenuntergang. Die Straße ist eng und steil. Autos kommen entgegen. Wo hältst du dich?',
      answers: [
        'Rechts — weiter weg vom Rand.',
        'In der Mitte — bessere Sicht.',
        'Links — das ist meine Spur im Linksverkehr.'
      ],
      explanation: 'Thailand hat Linksverkehr. Deine Spur ist die linke. Auf Serpentinen ist das entscheidend. Bergab mit Motor bremsen, nicht mit der Handbremse 🏔️'
    },
    fr: {
      text: 'Tu roules vers un point de vue au coucher du soleil. La route est étroite et escarpée. Des voitures arrivent en face. Où te positionnes-tu ?',
      answers: [
        'À droite — loin du bord.',
        'Au centre — meilleure visibilité.',
        'À gauche — c\'est ma voie en conduite à gauche.'
      ],
      explanation: 'La Thaïlande roule à gauche. Ta voie est la gauche. Dans les virages de montagne, c\'est crucial. En descente, freine avec le moteur, pas avec la poignée 🏔️'
    },
    es: {
      text: 'Vas a un mirador al atardecer. La carretera es estrecha y empinada. Vienen coches de frente. ¿Dónde te mantienes?',
      answers: [
        'A la derecha — lejos del borde.',
        'En el centro — mejor visibilidad.',
        'A la izquierda — es mi carril en tráfico por la izquierda.'
      ],
      explanation: 'Tailandia tiene tráfico por la izquierda. Tu carril es el izquierdo. En carreteras de montaña esto es crítico. En bajada, frena con el motor, no con la mano 🏔️'
    }
  },
  rtQ4: {
    ru: {
      text: 'Отличный вечер в Патонге, несколько коктейлей, до отеля 15 минут по знакомой дороге. Что делаешь?',
      answers: [
        'Еду — я в норме, дорога пустая.',
        'Еду очень медленно и осторожно.',
        'Беру Grab или тук-тук, байк забираю утром.'
      ],
      explanation: 'В Таиланде есть допустимый минимум алкоголя. Но если попал в любую аварию выпившим — страховка не работает вообще. Grab стоит 100 бат. Спокойный сон бесценен 😴'
    },
    en: {
      text: 'Great evening in Patong, a few cocktails, 15 minutes to the hotel on a familiar road. What do you do?',
      answers: [
        'Ride — I\'m fine, the road is empty.',
        'Ride very slowly and carefully.',
        'Take a Grab or tuk-tuk, pick up the bike in the morning.'
      ],
      explanation: 'Thailand has a minimum alcohol limit. But if you\'re in any accident while drinking — insurance doesn\'t work at all. Grab costs 100 baht. A peaceful sleep is priceless 😴'
    },
    de: {
      text: 'Toller Abend in Patong, ein paar Cocktails, 15 Minuten zum Hotel auf bekannter Straße. Was machst du?',
      answers: [
        'Fahren — mir geht\'s gut, die Straße ist leer.',
        'Sehr langsam und vorsichtig fahren.',
        'Ein Grab oder Tuk-Tuk nehmen, das Bike morgens abholen.'
      ],
      explanation: 'Thailand hat eine Alkoholgrenze. Aber bei jedem Unfall unter Alkoholeinfluss — die Versicherung greift überhaupt nicht. Grab kostet 100 Baht. Ruhiger Schlaf ist unbezahlbar 😴'
    },
    fr: {
      text: 'Super soirée à Patong, quelques cocktails, 15 minutes jusqu\'à l\'hôtel sur une route connue. Que fais-tu ?',
      answers: [
        'Je roule — je suis bien, la route est vide.',
        'Je roule très lentement et prudemment.',
        'Je prends un Grab ou un tuk-tuk, je récupère la moto le matin.'
      ],
      explanation: 'La Thaïlande a un seuil d\'alcoolémie. Mais en cas d\'accident sous alcool — l\'assurance ne fonctionne pas du tout. Grab coûte 100 bahts. Un sommeil tranquille n\'a pas de prix 😴'
    },
    es: {
      text: 'Gran noche en Patong, unos cócteles, 15 minutos al hotel por una carretera conocida. ¿Qué haces?',
      answers: [
        'Conduzco — estoy bien, la carretera está vacía.',
        'Conduzco muy lento y con cuidado.',
        'Tomo un Grab o tuk-tuk, recojo la moto por la mañana.'
      ],
      explanation: 'Tailandia tiene un límite mínimo de alcohol. Pero si tienes cualquier accidente habiendo bebido — el seguro no funciona en absoluto. Grab cuesta 100 baht. Dormir tranquilo no tiene precio 😴'
    }
  },
  rtQ5: {
    ru: {
      text: 'На въезде в Патонг полицейский машет жезлом. Ты ничего не нарушал. Как себя ведёшь?',
      answers: [
        'Останавливаюсь и объясняю что ни в чём не виноват.',
        'Останавливаюсь, улыбаюсь, спокойно показываю документы.',
        'Делаю вид что не заметил.'
      ],
      explanation: 'Золотое правило Таиланда: улыбка решает всё. Саватди крап — и атмосфера сразу другая. Тайцы не понимают конфликт — споришь, делаешь хуже себе даже если прав 😊'
    },
    en: {
      text: 'At the entrance to Patong, a policeman waves his baton. You haven\'t violated anything. How do you behave?',
      answers: [
        'Stop and explain I\'ve done nothing wrong.',
        'Stop, smile, calmly show my documents.',
        'Pretend I didn\'t notice.'
      ],
      explanation: 'The golden rule of Thailand: a smile solves everything. Sawadee krap — and the atmosphere changes immediately. Thai people don\'t understand conflict — argue, and you make it worse even if you\'re right 😊'
    },
    de: {
      text: 'Am Eingang von Patong winkt ein Polizist mit dem Stab. Du hast nichts falsch gemacht. Wie verhältst du dich?',
      answers: [
        'Anhalten und erklären, dass ich nichts falsch gemacht habe.',
        'Anhalten, lächeln, ruhig die Dokumente zeigen.',
        'So tun, als hätte ich es nicht bemerkt.'
      ],
      explanation: 'Die goldene Regel Thailands: Ein Lächeln löst alles. Sawadee krap — und die Atmosphäre ändert sich sofort. Thais verstehen keinen Konflikt — streitest du, machst du es schlimmer, selbst wenn du recht hast 😊'
    },
    fr: {
      text: 'À l\'entrée de Patong, un policier fait signe avec son bâton. Tu n\'as rien fait de mal. Comment te comportes-tu ?',
      answers: [
        'Je m\'arrête et j\'explique que je n\'ai rien fait.',
        'Je m\'arrête, je souris, je montre calmement mes documents.',
        'Je fais semblant de ne pas avoir vu.'
      ],
      explanation: 'La règle d\'or de la Thaïlande : le sourire résout tout. Sawadee krap — et l\'atmosphère change immédiatement. Les Thaïs ne comprennent pas le conflit — si tu te disputes, tu aggraves la situation même si tu as raison 😊'
    },
    es: {
      text: 'En la entrada a Patong, un policía agita su bastón. No has infringido nada. ¿Cómo te comportas?',
      answers: [
        'Paro y explico que no hice nada malo.',
        'Paro, sonrío, muestro mis documentos con calma.',
        'Hago como que no lo vi.'
      ],
      explanation: 'La regla de oro de Tailandia: una sonrisa lo resuelve todo. Sawadee krap — y la atmósfera cambia inmediatamente. Los tailandeses no entienden el conflicto — si discutes, lo empeoras incluso si tienes razón 😊'
    }
  },
  rtQ6: {
    ru: {
      text: 'Тебя подрезал тук-тук, ты упал. Тук-тукер что-то говорит по-тайски. Что делаешь первым делом?',
      answers: [
        'Говорю sorry — это же вежливо.',
        'Объясняю что виноват тук-тукер.',
        'Ничего не говорю и сразу звоню в прокатную контору.'
      ],
      explanation: 'Мы твои главные друзья в этой ситуации. Звони нам первым — до полиции, до любых разговоров. Мы говорим по-тайски и знаем как это работает. Именно за это нас и ценят 🤙 А sorry в Таиланде = признание вины юридически.'
    },
    en: {
      text: 'A tuk-tuk cut you off, you fell. The driver is saying something in Thai. What do you do first?',
      answers: [
        'Say sorry — it\'s polite.',
        'Explain that the tuk-tuk driver is at fault.',
        'Say nothing and immediately call the rental company.'
      ],
      explanation: 'We are your best friends in this situation. Call us first — before police, before any conversations. We speak Thai and know how this works. That\'s exactly why people value us 🤙 And sorry in Thailand = legal admission of guilt.'
    },
    de: {
      text: 'Ein Tuk-Tuk hat dich geschnitten, du bist gestürzt. Der Fahrer sagt etwas auf Thai. Was machst du zuerst?',
      answers: [
        'Sage sorry — das ist höflich.',
        'Erkläre, dass der Tuk-Tuk-Fahrer schuld ist.',
        'Sage nichts und rufe sofort die Verleihfirma an.'
      ],
      explanation: 'Wir sind deine besten Freunde in dieser Situation. Ruf uns zuerst an — vor der Polizei, vor allen Gesprächen. Wir sprechen Thai und wissen, wie es funktioniert. Genau dafür schätzen uns die Leute 🤙 Und sorry in Thailand = rechtliches Schuldeingeständnis.'
    },
    fr: {
      text: 'Un tuk-tuk t\'a coupé la route, tu es tombé. Le conducteur dit quelque chose en thaï. Que fais-tu en premier ?',
      answers: [
        'Dire sorry — c\'est poli.',
        'Expliquer que le conducteur de tuk-tuk est en tort.',
        'Ne rien dire et appeler immédiatement l\'agence de location.'
      ],
      explanation: 'Nous sommes tes meilleurs amis dans cette situation. Appelle-nous en premier — avant la police, avant toute conversation. Nous parlons thaï et savons comment ça fonctionne. C\'est exactement pour ça qu\'on nous apprécie 🤙 Et sorry en Thaïlande = aveu de culpabilité juridique.'
    },
    es: {
      text: 'Un tuk-tuk te cortó el paso, te caíste. El conductor dice algo en tailandés. ¿Qué haces primero?',
      answers: [
        'Digo sorry — es educado.',
        'Explico que el culpable es el tuk-tuk.',
        'No digo nada y llamo inmediatamente a la empresa de alquiler.'
      ],
      explanation: 'Somos tus mejores amigos en esta situación. Llámanos primero — antes que la policía, antes de cualquier conversación. Hablamos tailandés y sabemos cómo funciona. Es exactamente por eso que nos valoran 🤙 Y sorry en Tailandia = admisión legal de culpa.'
    }
  },
  rtQ7: {
    ru: {
      text: 'Видишь удобное место у бордюра. Он красно-белый. Что делаешь?',
      answers: [
        'Паркуюсь — байк маленький, никому не мешает.',
        'Паркуюсь на секунду, быстро сбегаю.',
        'Ищу место с белым бордюром или нормальную парковку.'
      ],
      explanation: 'Красно-белый бордюр — на колесо наденут металлический замок. Это реально происходит каждый день. Не пытайся его снять — у полиции всё зафиксировано. Белый бордюр — паркуйся. Красно-белый — едь дальше 🔒'
    },
    en: {
      text: 'You see a convenient spot by the curb. It\'s red and white. What do you do?',
      answers: [
        'Park — the bike is small, not in anyone\'s way.',
        'Park for a second, run in quickly.',
        'Look for a spot with a white curb or a proper parking area.'
      ],
      explanation: 'Red and white curb — they\'ll put a metal clamp on your wheel. This literally happens every day. Don\'t try to remove it — the police have everything recorded. White curb — park. Red and white — move on 🔒'
    },
    de: {
      text: 'Du siehst einen bequemen Platz am Bordstein. Er ist rot-weiß. Was machst du?',
      answers: [
        'Parken — das Bike ist klein, stört niemanden.',
        'Kurz parken, schnell reinlaufen.',
        'Einen Platz mit weißem Bordstein oder einen richtigen Parkplatz suchen.'
      ],
      explanation: 'Rot-weißer Bordstein — sie setzen eine Metallkralle ans Rad. Das passiert wirklich jeden Tag. Versuche nicht, sie zu entfernen — die Polizei hat alles dokumentiert. Weißer Bordstein — parken. Rot-weiß — weiterfahren 🔒'
    },
    fr: {
      text: 'Tu vois un endroit pratique le long du trottoir. Il est rouge et blanc. Que fais-tu ?',
      answers: [
        'Me garer — la moto est petite, elle ne gêne personne.',
        'Me garer une seconde, faire un saut rapide.',
        'Chercher un endroit avec un trottoir blanc ou un parking normal.'
      ],
      explanation: 'Trottoir rouge et blanc — ils mettront un sabot sur ta roue. Ça arrive littéralement tous les jours. N\'essaie pas de l\'enlever — la police a tout enregistré. Trottoir blanc — gare-toi. Rouge et blanc — continue 🔒'
    },
    es: {
      text: 'Ves un lugar conveniente junto al bordillo. Es rojo y blanco. ¿Qué haces?',
      answers: [
        'Aparco — la moto es pequeña, no molesta a nadie.',
        'Aparco un segundo, voy rápido.',
        'Busco un lugar con bordillo blanco o un estacionamiento adecuado.'
      ],
      explanation: 'Bordillo rojo y blanco — pondrán una abrazadera metálica en tu rueda. Esto pasa literalmente todos los días. No intentes quitarla — la policía tiene todo registrado. Bordillo blanco — aparca. Rojo y blanco — sigue adelante 🔒'
    }
  },
  rtQ8: {
    ru: {
      text: 'Едешь на байке. В кармане айкос. Тебя останавливают на плановой проверке. Что будет?',
      answers: [
        'Ничего страшного — это личная вещь.',
        'Небольшой штраф, заплачу и поеду.',
        'Серьёзные проблемы — в Таиланде это уголовное нарушение.'
      ],
      explanation: 'Айкосы, вейпы, электронные сигареты — в Таиланде это не административка, а уголовное нарушение. При проверках байкеров это ищут целенаправленно. Просто имей это в виду перед выездом 🙏'
    },
    en: {
      text: 'You\'re riding a bike. You have an IQOS in your pocket. You\'re stopped at a routine check. What happens?',
      answers: [
        'Nothing serious — it\'s a personal item.',
        'A small fine, pay and go.',
        'Serious trouble — in Thailand this is a criminal offense.'
      ],
      explanation: 'IQOS, vapes, e-cigarettes — in Thailand this is not administrative but a criminal offense. During bike checks they specifically look for these. Just keep this in mind before heading out 🙏'
    },
    de: {
      text: 'Du fährst Bike. In deiner Tasche ist ein IQOS. Du wirst bei einer Routinekontrolle angehalten. Was passiert?',
      answers: [
        'Nichts Schlimmes — das ist ein persönlicher Gegenstand.',
        'Eine kleine Strafe, bezahlen und weiterfahren.',
        'Ernsthafte Probleme — in Thailand ist das eine Straftat.'
      ],
      explanation: 'IQOS, Vapes, E-Zigaretten — in Thailand ist das keine Ordnungswidrigkeit, sondern eine Straftat. Bei Bike-Kontrollen wird gezielt danach gesucht. Behalte das einfach im Hinterkopf vor der Abfahrt 🙏'
    },
    fr: {
      text: 'Tu roules en moto. Tu as un IQOS dans ta poche. Tu es arrêté lors d\'un contrôle de routine. Que se passe-t-il ?',
      answers: [
        'Rien de grave — c\'est un objet personnel.',
        'Une petite amende, je paie et je repars.',
        'De gros ennuis — en Thaïlande c\'est un délit pénal.'
      ],
      explanation: 'IQOS, vapoteuses, cigarettes électroniques — en Thaïlande ce n\'est pas administratif mais un délit pénal. Lors des contrôles de motards, ils cherchent spécifiquement cela. Garde-le simplement à l\'esprit avant de partir 🙏'
    },
    es: {
      text: 'Vas en moto. Tienes un IQOS en el bolsillo. Te detienen en un control rutinario. ¿Qué pasa?',
      answers: [
        'Nada grave — es un objeto personal.',
        'Una pequeña multa, pago y sigo.',
        'Problemas serios — en Tailandia es un delito penal.'
      ],
      explanation: 'IQOS, vapeadores, cigarrillos electrónicos — en Tailandia no es una infracción administrativa sino un delito penal. En los controles de motos los buscan específicamente. Solo tenlo en cuenta antes de salir 🙏'
    }
  }
};

// Bike feature translations
export const FEATURE_TR = {
  'ABS нет':  { en: 'No ABS', de: 'Kein ABS', fr: 'Pas d\'ABS', es: 'Sin ABS' },
  'ABS':      { en: 'ABS', de: 'ABS', fr: 'ABS', es: 'ABS' },
  'Вариатор': { en: 'CVT', de: 'CVT', fr: 'CVT', es: 'CVT' },
  'Большой багажник': { en: 'Large trunk', de: 'Großer Kofferraum', fr: 'Grand coffre', es: 'Maletero grande' },
  'Внедорожный стиль': { en: 'Off-road style', de: 'Offroad-Stil', fr: 'Style tout-terrain', es: 'Estilo off-road' },
  'Спортбайк': { en: 'Sport bike', de: 'Sportbike', fr: 'Sportive', es: 'Deportiva' },
  'Нейкед':    { en: 'Naked', de: 'Naked', fr: 'Naked', es: 'Naked' },
  'Круизер':   { en: 'Cruiser', de: 'Cruiser', fr: 'Cruiser', es: 'Cruiser' },
  'Круиз':     { en: 'Cruise control', de: 'Tempomat', fr: 'Régulateur', es: 'Control crucero' },
  'Низкая посадка': { en: 'Low seat', de: 'Niedrige Sitzposition', fr: 'Selle basse', es: 'Asiento bajo' },
  'Электро-экран':  { en: 'Electric screen', de: 'Elektro-Windschild', fr: 'Pare-brise électrique', es: 'Pantalla eléctrica' },
  'Автомат':   { en: 'Automatic', de: 'Automatik', fr: 'Automatique', es: 'Automático' },
  'Кондиционер': { en: 'Air conditioning', de: 'Klimaanlage', fr: 'Climatisation', es: 'Aire acondicionado' },
  '5 мест':    { en: '5 seats', de: '5 Sitze', fr: '5 places', es: '5 asientos' },
  '6 МКПП':    { en: '6-speed manual', de: '6-Gang Schaltung', fr: '6 vitesses', es: '6 marchas' },
  'Keyless':   { en: 'Keyless', de: 'Keyless', fr: 'Keyless', es: 'Keyless' },
  'USB зарядка': { en: 'USB charging', de: 'USB-Ladung', fr: 'Charge USB', es: 'Carga USB' },
  'Traction Control': { en: 'Traction Control', de: 'Traction Control', fr: 'Traction Control', es: 'Traction Control' },
  'HSTC':      { en: 'HSTC', de: 'HSTC', fr: 'HSTC', es: 'HSTC' },
  'Ride-by-Wire': { en: 'Ride-by-Wire', de: 'Ride-by-Wire', fr: 'Ride-by-Wire', es: 'Ride-by-Wire' },
  'Assist Slipper Clutch': { en: 'Assist Slipper Clutch', de: 'Assist Slipper Clutch', fr: 'Embrayage anti-dribble', es: 'Embrague deslizante' },
  'Assist & Slipper Clutch': { en: 'Assist & Slipper Clutch', de: 'Assist & Slipper Clutch', fr: 'Embrayage anti-dribble', es: 'Embrague deslizante' },
  'Ergo-Fit':  { en: 'Ergo-Fit', de: 'Ergo-Fit', fr: 'Ergo-Fit', es: 'Ergo-Fit' },
  'TFT дисплей': { en: 'TFT display', de: 'TFT-Display', fr: 'Écran TFT', es: 'Pantalla TFT' }
};

// Translate a bike feature string
export function translateFeature(feature, lang) {
  if (lang === 'ru') return feature;
  // Check exact match
  if (FEATURE_TR[feature]) return FEATURE_TR[feature][lang] || feature;
  // Handle weight pattern "~XXX кг"
  const weightMatch = feature.match(/^~(\d+)\s*кг$/);
  if (weightMatch) return `~${weightMatch[1]} kg`;
  // Handle fuel pattern "Расход X.X л/100км"
  const fuelMatch = feature.match(/^Расход\s+([\d.]+)\s*л\/100км$/);
  if (fuelMatch) {
    const val = fuelMatch[1];
    const labels = { en: `${val} L/100km`, de: `${val} L/100km`, fr: `${val} L/100km`, es: `${val} L/100km` };
    return labels[lang] || `${val} L/100km`;
  }
  return feature;
}

// Bike category translations
export const BIKE_CAT_TR = {
  all:     { ru: 'Все', en: 'All', de: 'Alle', fr: 'Tout', es: 'Todos' },
  scooter: { ru: 'Скутеры', en: 'Scooters', de: 'Roller', fr: 'Scooters', es: 'Scooters' },
  maxi:    { ru: 'Макси', en: 'Maxi', de: 'Maxi', fr: 'Maxi', es: 'Maxi' },
  moto:    { ru: 'Мотоциклы', en: 'Motorcycles', de: 'Motorräder', fr: 'Motos', es: 'Motocicletas' },
  car:     { ru: 'Авто', en: 'Cars', de: 'Autos', fr: 'Voitures', es: 'Coches' }
};

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

  // ── Delivery districts ──
  deliveryTitle: {
    ru: 'Доставка по Пхукету', en: 'Delivery across Phuket', de: 'Lieferung auf Phuket', fr: 'Livraison à Phuket', es: 'Entrega en Phuket'
  },
  deliveryNote: {
    ru: 'Бесплатно от 3 дней аренды в Карон, Ката, Патонг',
    en: 'Free from 3-day rental in Karon, Kata, Patong',
    de: 'Kostenlos ab 3 Tagen Miete in Karon, Kata, Patong',
    fr: 'Gratuit dès 3 jours à Karon, Kata, Patong',
    es: 'Gratis desde 3 días en Karon, Kata, Patong'
  },
  districts: {
    ru: ['Патонг', 'Карон', 'Ката', 'Камала', 'Бангтао', 'Сурин', 'Раваи', 'Чалонг', 'Пхукет-таун', 'Най Харн', 'Аэропорт', 'Най Янг'],
    en: ['Patong', 'Karon', 'Kata', 'Kamala', 'Bangtao', 'Surin', 'Rawai', 'Chalong', 'Phuket Town', 'Nai Harn', 'Airport', 'Nai Yang'],
    de: ['Patong', 'Karon', 'Kata', 'Kamala', 'Bangtao', 'Surin', 'Rawai', 'Chalong', 'Phuket Town', 'Nai Harn', 'Flughafen', 'Nai Yang'],
    fr: ['Patong', 'Karon', 'Kata', 'Kamala', 'Bangtao', 'Surin', 'Rawai', 'Chalong', 'Phuket Town', 'Nai Harn', 'Aéroport', 'Nai Yang'],
    es: ['Patong', 'Karon', 'Kata', 'Kamala', 'Bangtao', 'Surin', 'Rawai', 'Chalong', 'Phuket Town', 'Nai Harn', 'Aeropuerto', 'Nai Yang']
  },

  // ── Tab bar ──
  tabHome: {
    ru: 'Главная', en: 'Home', de: 'Start', fr: 'Accueil', es: 'Inicio'
  },
  tabBikes: {
    ru: 'Байки', en: 'Bikes', de: 'Bikes', fr: 'Motos', es: 'Motos'
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
  deliveryAreas: {
    ru: [
      { name: 'Карон, Ката', note: 'Бесплатно от 3 дней' },
      { name: 'Патонг', note: 'Бесплатно от 3 дней' },
      { name: 'Камала, Сурин', note: '300 \u0E3F или бесплатно от 7 дней' },
      { name: 'Бангтао', note: '300 \u0E3F или бесплатно от 7 дней' },
      { name: 'Раваи, Най Харн', note: '300 \u0E3F или бесплатно от 7 дней' },
      { name: 'Чалонг, Пхукет-таун', note: '300 \u0E3F' },
      { name: 'Аэропорт, Най Янг', note: '500 \u0E3F' },
      { name: 'Другой район', note: 'Уточняйте' }
    ],
    en: [
      { name: 'Karon, Kata', note: 'Free from 3 days' },
      { name: 'Patong', note: 'Free from 3 days' },
      { name: 'Kamala, Surin', note: '300 \u0E3F or free from 7 days' },
      { name: 'Bangtao', note: '300 \u0E3F or free from 7 days' },
      { name: 'Rawai, Nai Harn', note: '300 \u0E3F or free from 7 days' },
      { name: 'Chalong, Phuket Town', note: '300 \u0E3F' },
      { name: 'Airport, Nai Yang', note: '500 \u0E3F' },
      { name: 'Other area', note: 'Ask us' }
    ],
    de: [
      { name: 'Karon, Kata', note: 'Kostenlos ab 3 Tagen' },
      { name: 'Patong', note: 'Kostenlos ab 3 Tagen' },
      { name: 'Kamala, Surin', note: '300 \u0E3F oder kostenlos ab 7 Tagen' },
      { name: 'Bangtao', note: '300 \u0E3F oder kostenlos ab 7 Tagen' },
      { name: 'Rawai, Nai Harn', note: '300 \u0E3F oder kostenlos ab 7 Tagen' },
      { name: 'Chalong, Phuket Town', note: '300 \u0E3F' },
      { name: 'Flughafen, Nai Yang', note: '500 \u0E3F' },
      { name: 'Anderes Gebiet', note: 'Auf Anfrage' }
    ],
    fr: [
      { name: 'Karon, Kata', note: 'Gratuit dès 3 jours' },
      { name: 'Patong', note: 'Gratuit dès 3 jours' },
      { name: 'Kamala, Surin', note: '300 \u0E3F ou gratuit dès 7 jours' },
      { name: 'Bangtao', note: '300 \u0E3F ou gratuit dès 7 jours' },
      { name: 'Rawai, Nai Harn', note: '300 \u0E3F ou gratuit dès 7 jours' },
      { name: 'Chalong, Phuket Town', note: '300 \u0E3F' },
      { name: 'Aéroport, Nai Yang', note: '500 \u0E3F' },
      { name: 'Autre zone', note: 'Nous contacter' }
    ],
    es: [
      { name: 'Karon, Kata', note: 'Gratis desde 3 días' },
      { name: 'Patong', note: 'Gratis desde 3 días' },
      { name: 'Kamala, Surin', note: '300 \u0E3F o gratis desde 7 días' },
      { name: 'Bangtao', note: '300 \u0E3F o gratis desde 7 días' },
      { name: 'Rawai, Nai Harn', note: '300 \u0E3F o gratis desde 7 días' },
      { name: 'Chalong, Phuket Town', note: '300 \u0E3F' },
      { name: 'Aeropuerto, Nai Yang', note: '500 \u0E3F' },
      { name: 'Otra zona', note: 'Consultar' }
    ]
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
  }
};

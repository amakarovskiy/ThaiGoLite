// ThaiGo Lite — Internationalization
// Supported: ru, en, de, fr, es, th

export const LANGS = [
  { code: 'ru', flag: '\u{1F1F7}\u{1F1FA}', label: 'RU', name: 'Русский' },
  { code: 'en', flag: '\u{1F1EC}\u{1F1E7}', label: 'EN', name: 'English' },
  { code: 'de', flag: '\u{1F1E9}\u{1F1EA}', label: 'DE', name: 'Deutsch' },
  { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'FR', name: 'Français' },
  { code: 'es', flag: '\u{1F1EA}\u{1F1F8}', label: 'ES', name: 'Español' },
  { code: 'th', flag: '\u{1F1F9}\u{1F1ED}', label: 'TH', name: 'ไทย' }
];

const LS_KEY = 'thaigo_lang';

export function detectLang() {
  // 1. URL parameter ?lang= (for hreflang / shared links)
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && LANGS.some(l => l.code === urlLang)) return urlLang;
  // 2. Previously saved preference
  const saved = localStorage.getItem(LS_KEY);
  if (saved && LANGS.some(l => l.code === saved)) return saved;
  // 3. Browser language
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return LANGS.some(l => l.code === nav) ? nav : 'en';
}

export function saveLang(code) {
  localStorage.setItem(LS_KEY, code);
}

export const T = {
  // ── SEO Meta ──
  seoTitle: {
    ru: 'Аренда байков Пхукет — без залога паспорта, доставка в отель | ThaiGo Rent',
    en: 'ThaiGo Lite — Bike Rental in Phuket | From 130 ฿/day',
    de: 'ThaiGo Lite — Motorradverleih auf Phuket | Ab 130 ฿/Tag',
    fr: 'ThaiGo Lite — Location de motos à Phuket | Dès 130 ฿/jour',
    es: 'ThaiGo Lite — Alquiler de motos en Phuket | Desde 130 ฿/día',
    th: 'ThaiGo Lite — เช่ามอเตอร์ไซค์ภูเก็ต | ตั้งแต่ 130 ฿/วัน'
  },
  seoDescription: {
    ru: 'Аренда байков и скутеров на Пхукете от 130 ฿/день. Без залога паспорта, доставка в отель, договор и страховка. Звоните 24/7 на русском.',
    en: 'Rent bikes and scooters in Phuket without passport deposit. Honda Scoopy from 130 ฿/day. Hotel delivery, contract and insurance.',
    de: 'Motorrad- und Rollerverleih auf Phuket ohne Reisepass-Kaution. Honda Scoopy ab 130 ฿/Tag. Hotellieferung, Vertrag und Versicherung.',
    fr: 'Location de motos et scooters à Phuket sans caution de passeport. Honda Scoopy à partir de 130 ฿/jour. Livraison à l\'hôtel, contrat et assurance.',
    es: 'Alquiler de motos y scooters en Phuket sin depósito de pasaporte. Honda Scoopy desde 130 ฿/día. Entrega en hotel, contrato y seguro.',
    th: 'เช่ามอเตอร์ไซค์และสกู๊ตเตอร์ภูเก็ต ไม่ต้องวางพาสปอร์ต Honda Scoopy ตั้งแต่ 130 ฿/วัน ส่งถึงโรงแรม สัญญาและประกัน'
  },

  // ── Hero ──
  heroTitle: {
    ru: 'Аренда байков<br>на Пхукете',
    en: 'Bike Rental<br>in Phuket',
    de: 'Motorrad-Verleih<br>auf Phuket',
    fr: 'Location de motos<br>à Phuket',
    es: 'Alquiler de motos<br>en Phuket',
    th: 'เช่ามอเตอร์ไซค์<br>ภูเก็ต'
  },
  heroSub: {
    ru: 'Договор, страховка, замена при поломке. Без скрытых платежей.',
    en: 'Contract, insurance, free replacement. No hidden fees.',
    de: 'Vertrag, Versicherung, kostenloser Ersatz. Keine versteckten Kosten.',
    fr: 'Contrat, assurance, remplacement gratuit. Sans frais cachés.',
    es: 'Contrato, seguro, reemplazo gratuito. Sin costos ocultos.',
    th: 'สัญญา ประกัน เปลี่ยนรถฟรี ไม่มีค่าใช้จ่ายแอบแฝง'
  },
  heroDelivery: {
    ru: '📍 Доставляем: Ката · Карон · Патонг · Раваи · Чалонг и весь остров',
    en: '📍 Delivery: Kata · Karon · Patong · Rawai · Chalong & island-wide',
    de: '📍 Lieferung: Kata · Karon · Patong · Rawai · Chalong & ganze Insel',
    fr: '📍 Livraison : Kata · Karon · Patong · Rawai · Chalong & toute l\'île',
    es: '📍 Entrega: Kata · Karon · Patong · Rawai · Chalong y toda la isla',
    th: '📍 จัดส่ง: กะตะ · กะรน · ป่าตอง · ราไวย์ · ฉลอง และทั่วเกาะ'
  },

  // ── Why ThaiGo ──
  whyTitle: {
    ru: 'Почему ThaiGo', en: 'Why ThaiGo', de: 'Warum ThaiGo', fr: 'Pourquoi ThaiGo', es: 'Por qué ThaiGo', th: 'ทำไม ThaiGo'
  },
  whyNoDeposit: {
    ru: 'Без залога паспорта', en: 'No passport deposit', de: 'Ohne Passkaution', fr: 'Sans caution', es: 'Sin depósito', th: 'ไม่ต้องวางพาสปอร์ต'
  },
  whyDelivery: {
    ru: 'Доставка в отель', en: 'Hotel delivery', de: 'Hotellieferung', fr: 'Livraison hôtel', es: 'Entrega al hotel', th: 'ส่งถึงโรงแรม'
  },
  whyPrice: {
    ru: 'От 130 \u0E3F/сутки', en: 'From 130 \u0E3F/day', de: 'Ab 130 \u0E3F/Tag', fr: 'Dès 130 \u0E3F/jour', es: 'Desde 130 \u0E3F/día', th: 'ตั้งแต่ 130 \u0E3F/วัน'
  },
  whySupport: {
    ru: '24/7 на русском', en: '24/7 Support', de: '24/7 Support', fr: '24/7 Support', es: '24/7 Soporte', th: 'บริการ 24/7'
  },
  whyReplace: {
    ru: 'Замена при поломке', en: 'Free replacement', de: 'Kostenloser Ersatz', fr: 'Remplacement gratuit', es: 'Reemplazo gratis', th: 'เปลี่ยนฟรีเมื่อเสีย'
  },
  whyContract: {
    ru: 'Договор + страховка', en: 'Contract + insurance', de: 'Vertrag + Versicherung', fr: 'Contrat + assurance', es: 'Contrato + seguro', th: 'สัญญา + ประกัน'
  },
  whyNoDepositSub: {
    ru: 'Берём залог деньгами, паспорт остаётся у вас',
    en: 'Cash deposit only — your passport stays with you',
    de: 'Nur Barkaution — Ihr Pass bleibt bei Ihnen',
    fr: 'Caution en espèces — votre passeport reste avec vous',
    es: 'Depósito en efectivo — tu pasaporte se queda contigo',
    th: 'วางมัดจำเงินสดเท่านั้น พาสปอร์ตอยู่กับคุณ'
  },
  whyDeliverySub: {
    ru: 'Привезём байк к вашему отелю или вилле',
    en: 'We deliver the bike to your hotel or villa',
    de: 'Wir liefern das Bike zu Ihrem Hotel oder Villa',
    fr: 'On livre le scooter à votre hôtel ou villa',
    es: 'Entregamos la moto en tu hotel o villa',
    th: 'เราส่งรถถึงโรงแรมหรือวิลล่าของคุณ'
  },
  whyPriceSub: {
    ru: 'Чем дольше аренда — тем ниже цена за день',
    en: 'Longer rental = lower daily rate',
    de: 'Längere Miete = niedrigerer Tagespreis',
    fr: 'Plus longue la location, plus bas le prix',
    es: 'Más días = precio más bajo por día',
    th: 'เช่านานยิ่งถูก'
  },
  whySupportSub: {
    ru: 'Звонок, WhatsApp или Telegram — всегда на связи',
    en: 'Call, WhatsApp, or Telegram — always available',
    de: 'Anruf, WhatsApp oder Telegram — immer erreichbar',
    fr: 'Appel, WhatsApp ou Telegram — toujours joignable',
    es: 'Llamada, WhatsApp o Telegram — siempre disponibles',
    th: 'โทร WhatsApp หรือ Telegram — พร้อมให้บริการเสมอ'
  },
  whyReplaceSub: {
    ru: 'Сломался байк — заменим бесплатно в течение дня',
    en: 'Bike broke down? Free replacement within the day',
    de: 'Bike kaputt? Kostenloser Ersatz am selben Tag',
    fr: 'Panne ? Remplacement gratuit dans la journée',
    es: '¿Moto averiada? Reemplazo gratis en el día',
    th: 'รถเสีย? เปลี่ยนฟรีภายในวัน'
  },
  whyContractSub: {
    ru: 'Официальный договор и страховка здоровья включены',
    en: 'Official contract and health insurance included',
    de: 'Offizieller Vertrag und Krankenversicherung inklusive',
    fr: 'Contrat officiel et assurance santé inclus',
    es: 'Contrato oficial y seguro de salud incluidos',
    th: 'สัญญาอย่างเป็นทางการและประกันสุขภาพรวมอยู่แล้ว'
  },
  heroSeo: {
    ru: 'Прокат скутеров и мотоциклов в Кате, Патонге, Карон, Бангтао и по всему Пхукету. Honda, Yamaha, Vespa — новые байки с регулярным обслуживанием.',
    en: 'Scooter and motorbike rental in Kata, Patong, Karon, Bangtao and across Phuket. Honda, Yamaha, Vespa — new bikes with regular maintenance.',
    de: 'Roller- und Motorradverleih in Kata, Patong, Karon, Bangtao und ganz Phuket. Honda, Yamaha, Vespa — neue Bikes mit regelmäßiger Wartung.',
    fr: 'Location de scooters et motos à Kata, Patong, Karon, Bangtao et partout à Phuket. Honda, Yamaha, Vespa — motos neuves et entretenues.',
    es: 'Alquiler de scooters y motos en Kata, Patong, Karon, Bangtao y todo Phuket. Honda, Yamaha, Vespa — motos nuevas con mantenimiento regular.',
    th: 'เช่าสกู๊ตเตอร์และมอเตอร์ไซค์ที่กะตะ ป่าตอง กะรน บางเทา และทั่วภูเก็ต Honda, Yamaha, Vespa — รถใหม่บำรุงรักษาสม่ำเสมอ'
  },
  footerSeo: {
    ru: 'ThaiGo Rent — официальная аренда байков и скутеров на Пхукете. Офис в Кате. Доставка в Патонг, Карон, Камала, Бангтао, Раваи, Чалонг, аэропорт Пхукета и другие районы острова. Honda Scoopy, Click, PCX, Yamaha Nmax, Xmax, Forza и другие модели. Работаем ежедневно 8:00–20:00, поддержка на русском языке 24/7.',
    en: 'ThaiGo Rent — official bike and scooter rental in Phuket. Office in Kata. Delivery to Patong, Karon, Kamala, Bangtao, Rawai, Chalong, Phuket Airport and other areas. Honda Scoopy, Click, PCX, Yamaha Nmax, Xmax, Forza and more. Open daily 8:00–20:00, 24/7 support.',
    de: 'ThaiGo Rent — offizieller Bike- und Rollerverleih auf Phuket. Büro in Kata. Lieferung nach Patong, Karon, Kamala, Bangtao, Rawai, Chalong, Flughafen Phuket und weitere Gebiete. Honda Scoopy, Click, PCX, Yamaha Nmax, Xmax, Forza u.a. Täglich 8:00–20:00, 24/7 Support.',
    fr: 'ThaiGo Rent — location officielle de motos et scooters à Phuket. Bureau à Kata. Livraison à Patong, Karon, Kamala, Bangtao, Rawai, Chalong, aéroport de Phuket et autres zones. Honda Scoopy, Click, PCX, Yamaha Nmax, Xmax, Forza et plus. Ouvert 8h–20h, support 24/7.',
    es: 'ThaiGo Rent — alquiler oficial de motos y scooters en Phuket. Oficina en Kata. Entrega en Patong, Karon, Kamala, Bangtao, Rawai, Chalong, aeropuerto de Phuket y más zonas. Honda Scoopy, Click, PCX, Yamaha Nmax, Xmax, Forza y más. Abierto 8:00–20:00, soporte 24/7.',
    th: 'ThaiGo Rent — เช่ามอเตอร์ไซค์และสกู๊ตเตอร์ภูเก็ตอย่างเป็นทางการ สำนักงานที่กะตะ ส่งถึงป่าตอง กะรน กมลา บางเทา ราไวย์ ฉลอง สนามบินภูเก็ต Honda Scoopy, Click, PCX, Yamaha Nmax, Xmax, Forza เปิดทุกวัน 8:00–20:00 บริการ 24/7'
  },

  // ── Popular bikes ──
  popularTitle: {
    ru: 'Популярные байки', en: 'Popular Bikes', de: 'Beliebte Bikes', fr: 'Motos populaires', es: 'Motos populares', th: 'รถยอดนิยม'
  },
  viewAll: {
    ru: 'Все \u2192', en: 'All \u2192', de: 'Alle \u2192', fr: 'Tout \u2192', es: 'Todos \u2192', th: 'ทั้งหมด \u2192'
  },

  // ── Steps (How it works) ──
  step1: { ru: '🛵 Выбери байк и напиши нам — ответим за 5–10 минут', en: '🛵 Choose a bike & message us — we reply in 5–10 min', de: '🛵 Bike wählen & schreiben — Antwort in 5–10 Min', fr: '🛵 Choisis un scooter et écris-nous — réponse en 5–10 min', es: '🛵 Elige una moto y escríbenos — respondemos en 5–10 min', th: '🛵 เลือกรถแล้วทักเรา — ตอบใน 5–10 นาที' },
  step2: { ru: '📍 Привезём к отелю за 1–2 часа — или в удобное время', en: '📍 Delivered to your hotel in 1–2 hours — or at your convenience', de: '📍 Lieferung zum Hotel in 1–2 Std — oder nach Wunsch', fr: '📍 Livré à l\'hôtel en 1–2h — ou à votre convenance', es: '📍 Entrega en tu hotel en 1–2 horas — o cuando prefieras', th: '📍 ส่งถึงโรงแรมใน 1–2 ชม. หรือตามเวลาที่สะดวก' },
  step3: { ru: '🤙 Езди, мы на связи 24/7 — замена при поломке бесплатно', en: '🤙 Ride worry-free, 24/7 support — free replacement if it breaks', de: '🤙 Fahr los, 24/7 Support — kostenloser Ersatz bei Panne', fr: '🤙 Roule tranquille, support 24/7 — remplacement gratuit en cas de panne', es: '🤙 Conduce tranquilo, soporte 24/7 — reemplazo gratis si se avería', th: '🤙 ขับสบายใจ บริการ 24/7 — เปลี่ยนรถฟรีหากเสีย' },
  stepsTitle: { ru: 'Как это работает', en: 'How it works', de: 'So funktioniert\'s', fr: 'Comment ça marche', es: 'Cómo funciona', th: 'ขั้นตอนการใช้งาน' },

  // ── Popular Bikes Block ──
  popTitle: { ru: 'Популярные байки', en: 'Popular bikes', de: 'Beliebte Bikes', fr: 'Motos populaires', es: 'Motos populares', th: 'รถยอดนิยม' },
  popAll: { ru: 'Все →', en: 'All →', de: 'Alle →', fr: 'Tout →', es: 'Todos →', th: 'ทั้งหมด →' },
  popEconomy: { ru: 'Эконом', en: 'Economy', de: 'Economy', fr: 'Économique', es: 'Económico', th: 'ประหยัด' },
  popComfort: { ru: 'Комфорт', en: 'Comfort', de: 'Komfort', fr: 'Confort', es: 'Confort', th: 'สะดวกสบาย' },
  popPremium: { ru: 'Премиум', en: 'Premium', de: 'Premium', fr: 'Premium', es: 'Premium', th: 'พรีเมียม' },
  popDays: { ru: 'дней', en: 'days', de: 'Tage', fr: 'jours', es: 'días', th: 'วัน' },
  popFrom: { ru: 'от', en: 'from', de: 'ab', fr: 'à partir de', es: 'desde', th: 'ตั้งแต่' },
  popHint: { ru: 'Чем дольше — тем дешевле', en: 'The longer — the cheaper', de: 'Je länger — desto günstiger', fr: 'Plus longtemps — moins cher', es: 'Cuanto más tiempo — más barato', th: 'ยิ่งนาน ยิ่งถูก' },
  popDiscount3: { ru: 'скидка от 3 дней', en: 'discount from 3 days', de: 'Rabatt ab 3 Tagen', fr: 'remise dès 3 jours', es: 'descuento desde 3 días', th: 'ส่วนลดตั้งแต่ 3 วัน' },
  popDiscount7: { ru: 'скидка за длительный срок', en: 'long-term discount', de: 'Langzeitrabatt', fr: 'remise longue durée', es: 'descuento larga duración', th: 'ส่วนลดระยะยาว' },
  popDiscount20: { ru: '🔥 максимальная скидка', en: '🔥 maximum discount', de: '🔥 maximaler Rabatt', fr: '🔥 remise maximale', es: '🔥 descuento máximo', th: '🔥 ส่วนลดสูงสุด' },
  popTotal: { ru: 'итого', en: 'total', de: 'gesamt', fr: 'total', es: 'total', th: 'รวม' },
  popViewAll: { ru: 'Смотреть все байки →', en: 'View all bikes →', de: 'Alle Bikes ansehen →', fr: 'Voir toutes les motos →', es: 'Ver todas las motos →', th: 'ดูรถทั้งหมด →' },

  // ── Reviews ──
  // ── Bike Picker ──
  bpTitle: { ru: 'Подбор байка', en: 'Bike Picker', de: 'Bike-Auswahl', fr: 'Choix de moto', es: 'Selector de moto', th: 'เลือกรถที่ใช่' },
  bpMenuBtn: { ru: 'Помочь выбрать байк', en: 'Help me choose a bike', de: 'Hilf mir ein Bike zu wählen', fr: 'Aidez-moi à choisir', es: 'Ayúdame a elegir moto', th: 'ช่วยเลือกรถให้หน่อย' },
  bpNext: { ru: 'Дальше →', en: 'Next →', de: 'Weiter →', fr: 'Suivant →', es: 'Siguiente →', th: 'ถัดไป →' },
  // ── Quiz Step 1: Experience ──
  quizStep1Q: { ru: 'Какой у вас опыт вождения?', en: 'What is your riding experience?', de: 'Wie ist Ihre Fahrerfahrung?', fr: 'Quelle est votre expérience ?', es: '¿Cuál es tu experiencia?', th: 'ประสบการณ์ขับขี่ของคุณ?' },
  quizStep1Hint: { ru: 'Это поможет подобрать байк подходящей мощности и устойчивости', en: 'This helps us pick a bike with the right power and stability', de: 'So finden wir das passende Bike', fr: 'Pour trouver le bon scooter', es: 'Para encontrar la moto adecuada', th: 'เพื่อเลือกรถที่เหมาะสม' },
  quizExpFirst: { ru: 'Первый раз на байке', en: 'First time on a bike', de: 'Erstes Mal auf einem Bike', fr: 'Première fois sur un scooter', es: 'Primera vez en moto', th: 'ขับครั้งแรก' },
  quizExpFirstDesc: { ru: 'Только начинаю, хочу простой и устойчивый', en: 'Just starting, want simple and stable', de: 'Fange an, will einfach und stabil', fr: 'Je débute, je veux simple et stable', es: 'Empiezo, quiero simple y estable', th: 'เพิ่งเริ่ม อยากได้ง่ายและมั่นคง' },
  quizExpSome: { ru: 'Немного катался', en: 'Ridden a bit', de: 'Etwas Erfahrung', fr: 'Un peu d\'expérience', es: 'Algo de experiencia', th: 'พอขับได้บ้าง' },
  quizExpSomeDesc: { ru: 'Езжу иногда, чувствую себя уверенно на скутере', en: 'Ride occasionally, feel confident on a scooter', de: 'Fahre gelegentlich, fühle mich sicher', fr: 'Je conduis parfois, à l\'aise sur un scooter', es: 'Conduzco a veces, me siento seguro', th: 'ขับบ้างเป็นครั้งคราว มั่นใจบนสกู๊ตเตอร์' },
  quizExpPro: { ru: 'Опытный водитель', en: 'Experienced rider', de: 'Erfahrener Fahrer', fr: 'Conducteur expérimenté', es: 'Conductor experimentado', th: 'มีประสบการณ์' },
  quizExpProDesc: { ru: 'Права, стаж, хочу что-то мощнее или спортивнее', en: 'License, experience, want something powerful', de: 'Führerschein, Erfahrung, will was Stärkeres', fr: 'Permis, expérience, envie de puissance', es: 'Carnet, experiencia, quiero algo potente', th: 'มีใบขับขี่ อยากได้แรงกว่า' },
  // ── Quiz Step 2: Trip type ──
  quizStep2Q: { ru: 'Куда планируете ездить?', en: 'Where do you plan to ride?', de: 'Wohin wollen Sie fahren?', fr: 'Où comptez-vous rouler ?', es: '¿Adónde planeas ir?', th: 'วางแผนขับไปไหน?' },
  quizStep2Hint: { ru: 'Поможет подобрать мощность и тип байка', en: 'Helps us pick the right power and type', de: 'Hilft bei der Wahl von Leistung und Typ', fr: 'Pour choisir la puissance et le type', es: 'Para elegir potencia y tipo', th: 'ช่วยเลือกกำลังและประเภท' },
  bpBeach: { ru: 'Пляж и магазины', en: 'Beach and shops', de: 'Strand und Geschäfte', fr: 'Plage et magasins', es: 'Playa y tiendas', th: 'ชายหาดและร้านค้า' },
  bpBeachDesc: { ru: 'Ката, Карон, Патонг', en: 'Kata, Karon, Patong', de: 'Kata, Karon, Patong', fr: 'Kata, Karon, Patong', es: 'Kata, Karon, Patong', th: 'กะตะ กะรน ป่าตอง' },
  bpIsland: { ru: 'Весь остров', en: 'Whole island', de: 'Ganze Insel', fr: 'Toute l\'île', es: 'Toda la isla', th: 'ทั่วเกาะ' },
  bpIslandDesc: { ru: 'Север, юг, вью-поинты, рынки', en: 'North, south, viewpoints, markets', de: 'Norden, Süden, Aussichtspunkte, Märkte', fr: 'Nord, sud, points de vue, marchés', es: 'Norte, sur, miradores, mercados', th: 'เหนือ ใต้ จุดชมวิว ตลาด' },
  bpMountain: { ru: 'Горные дороги', en: 'Mountain roads', de: 'Bergstraßen', fr: 'Routes de montagne', es: 'Carreteras de montaña', th: 'ถนนภูเขา' },
  bpMountainDesc: { ru: 'Серпантины, смотровые, адреналин', en: 'Serpentines, viewpoints, adrenaline', de: 'Serpentinen, Aussichtspunkte, Adrenalin', fr: 'Lacets, belvédères, adrénaline', es: 'Curvas, miradores, adrenalina', th: 'ทางเลี้ยว จุดชมวิว อะดรีนาลีน' },
  bpBeyond: { ru: 'За пределы Пхукета', en: 'Beyond Phuket', de: 'Über Phuket hinaus', fr: 'Au-delà de Phuket', es: 'Fuera de Phuket', th: 'นอกภูเก็ต' },
  bpBeyondDesc: { ru: 'Краби, Панга, длинные трассы', en: 'Krabi, Phang Nga, long highways', de: 'Krabi, Phang Nga, lange Autobahnen', fr: 'Krabi, Phang Nga, longues routes', es: 'Krabi, Phang Nga, carreteras largas', th: 'กระบี่ พังงา ทางยาว' },
  // ── Quiz Step 3: Duration ──
  quizStep3Q: { ru: 'Сколько дней планируете?', en: 'How many days?', de: 'Wie viele Tage?', fr: 'Combien de jours ?', es: '¿Cuántos días?', th: 'กี่วัน?' },
  quizStep3Hint: { ru: 'Влияет на итоговую цену — чем дольше, тем выгоднее', en: 'Affects the price — longer means cheaper', de: 'Beeinflusst den Preis — länger ist günstiger', fr: 'Affecte le prix — plus long = moins cher', es: 'Afecta el precio — más días, más barato', th: 'ยิ่งนาน ยิ่งถูก' },
  quizDur1: { ru: '1–2 дня', en: '1–2 days', de: '1–2 Tage', fr: '1–2 jours', es: '1–2 días', th: '1–2 วัน' },
  quizDur1Desc: { ru: 'Краткая вылазка — базовый тариф', en: 'Short trip — base rate', de: 'Kurztrip — Basistarif', fr: 'Court séjour — tarif de base', es: 'Viaje corto — tarifa base', th: 'ทริปสั้น — อัตราพื้นฐาน' },
  quizDur2: { ru: '3–6 дней', en: '3–6 days', de: '3–6 Tage', fr: '3–6 jours', es: '3–6 días', th: '3–6 วัน' },
  quizDur2Desc: { ru: 'Скидка −17% от базовой цены', en: '−17% discount from base', de: '−17% Rabatt', fr: '−17% de réduction', es: '−17% de descuento', th: 'ลด −17%' },
  quizDur3: { ru: '7–19 дней', en: '7–19 days', de: '7–19 Tage', fr: '7–19 jours', es: '7–19 días', th: '7–19 วัน' },
  quizDur3Desc: { ru: 'Скидка −25% · популярный выбор', en: '−25% discount · popular choice', de: '−25% · beliebte Wahl', fr: '−25% · choix populaire', es: '−25% · elección popular', th: 'ลด −25% · ยอดนิยม' },
  quizDur4: { ru: '20–30 дней', en: '20–30 days', de: '20–30 Tage', fr: '20–30 jours', es: '20–30 días', th: '20–30 วัน' },
  quizDur4Desc: { ru: 'Максимальная скидка −45%', en: 'Maximum discount −45%', de: 'Maximalrabatt −45%', fr: 'Réduction max −45%', es: 'Descuento máximo −45%', th: 'ลดสูงสุด −45%' },
  // ── Quiz Step 4: Priorities ──
  quizStep4Q: { ru: 'Что для вас важнее?', en: 'What matters most?', de: 'Was ist Ihnen wichtiger?', fr: 'Qu\'est-ce qui compte ?', es: '¿Qué es más importante?', th: 'อะไรสำคัญที่สุด?' },
  quizStep4Hint: { ru: 'Можно выбрать несколько вариантов', en: 'You can pick multiple options', de: 'Mehrere Optionen möglich', fr: 'Plusieurs choix possibles', es: 'Puedes elegir varios', th: 'เลือกได้หลายข้อ' },
  bpEasy: { ru: 'Лёгкость и простота', en: 'Ease and simplicity', de: 'Leichtigkeit und Einfachheit', fr: 'Légèreté et simplicité', es: 'Facilidad y sencillez', th: 'ง่ายและเบา' },
  bpEasyDesc: { ru: 'Хочу не думать о технике', en: 'Don\'t want to think about the bike', de: 'Will nicht über Technik nachdenken', fr: 'Ne pas penser à la technique', es: 'No quiero pensar en la técnica', th: 'ไม่อยากคิดเรื่องเทคนิค' },
  bpComfort: { ru: 'Комфорт в дороге', en: 'Road comfort', de: 'Fahrkomfort', fr: 'Confort de route', es: 'Comodidad en carretera', th: 'สะดวกสบายบนถนน' },
  bpComfortDesc: { ru: 'Длинные поездки без усталости', en: 'Long rides without fatigue', de: 'Lange Fahrten ohne Ermüdung', fr: 'Longs trajets sans fatigue', es: 'Viajes largos sin cansancio', th: 'ขับไกลไม่เหนื่อย' },
  bpSport: { ru: 'Драйв и мощь', en: 'Power and thrill', de: 'Power und Nervenkitzel', fr: 'Puissance et sensations', es: 'Potencia y emoción', th: 'พลังและความตื่นเต้น' },
  bpSportDesc: { ru: 'Хочу получить удовольствие от езды', en: 'Want to enjoy the ride', de: 'Will die Fahrt genießen', fr: 'Envie de plaisir de conduite', es: 'Quiero disfrutar conduciendo', th: 'อยากสนุกกับการขับ' },
  bpStyle: { ru: 'Красиво выглядит', en: 'Looks great', de: 'Sieht toll aus', fr: 'Beau design', es: 'Se ve genial', th: 'ดูดี' },
  bpStyleDesc: { ru: 'Стиль и фото важны', en: 'Style and photos matter', de: 'Stil und Fotos zählen', fr: 'Le style et les photos comptent', es: 'El estilo y las fotos importan', th: 'สไตล์และรูปถ่ายสำคัญ' },
  bpEconomy: { ru: 'Экономия', en: 'Budget', de: 'Budget', fr: 'Budget', es: 'Presupuesto', th: 'ประหยัด' },
  bpEconomyDesc: { ru: 'Главное — цена', en: 'Price is key', de: 'Der Preis zählt', fr: 'Le prix compte', es: 'El precio es clave', th: 'ราคาสำคัญ' },
  // ── Quiz Step 5: Budget ──
  quizStep5Q: { ru: 'Какой бюджет?', en: 'What\'s your budget?', de: 'Welches Budget?', fr: 'Quel budget ?', es: '¿Cuál es tu presupuesto?', th: 'งบประมาณ?' },
  quizStep5Hint: { ru: 'Поможет сузить выбор', en: 'Helps narrow down the options', de: 'Hilft die Auswahl einzugrenzen', fr: 'Pour affiner la sélection', es: 'Para reducir las opciones', th: 'ช่วยจำกัดตัวเลือก' },
  bpBeach: { ru: 'Пляж и магазины', en: 'Beach and shops', de: 'Strand und Geschäfte', fr: 'Plage et magasins', es: 'Playa y tiendas', th: 'ชายหาดและร้านค้า' },
  bpBeachDesc: { ru: 'Ката, Карон, Патонг', en: 'Kata, Karon, Patong', de: 'Kata, Karon, Patong', fr: 'Kata, Karon, Patong', es: 'Kata, Karon, Patong', th: 'กะตะ กะรน ป่าตอง' },
  bpIsland: { ru: 'Весь остров', en: 'Whole island', de: 'Ganze Insel', fr: 'Toute l\'île', es: 'Toda la isla', th: 'ทั่วเกาะ' },
  bpIslandDesc: { ru: 'Север, юг, вью-поинты, рынки', en: 'North, south, viewpoints, markets', de: 'Norden, Süden, Aussichtspunkte, Märkte', fr: 'Nord, sud, points de vue, marchés', es: 'Norte, sur, miradores, mercados', th: 'เหนือ ใต้ จุดชมวิว ตลาด' },
  bpMountain: { ru: 'Горные дороги', en: 'Mountain roads', de: 'Bergstraßen', fr: 'Routes de montagne', es: 'Carreteras de montaña', th: 'ถนนภูเขา' },
  bpMountainDesc: { ru: 'Серпантины, смотровые, адреналин', en: 'Serpentines, viewpoints, adrenaline', de: 'Serpentinen, Aussichtspunkte, Adrenalin', fr: 'Lacets, belvédères, adrénaline', es: 'Curvas, miradores, adrenalina', th: 'ทางเลี้ยว จุดชมวิว อะดรีนาลีน' },
  bpBeyond: { ru: 'За пределы Пхукета', en: 'Beyond Phuket', de: 'Über Phuket hinaus', fr: 'Au-delà de Phuket', es: 'Fuera de Phuket', th: 'นอกภูเก็ต' },
  bpBeyondDesc: { ru: 'Краби, Панга, длинные трассы', en: 'Krabi, Phang Nga, long highways', de: 'Krabi, Phang Nga, lange Autobahnen', fr: 'Krabi, Phang Nga, longues routes', es: 'Krabi, Phang Nga, carreteras largas', th: 'กระบี่ พังงา ทางยาว' },
  quizDiscountBadge: { ru: 'Скидка', en: 'Discount', de: 'Rabatt', fr: 'Réduction', es: 'Descuento', th: 'ส่วนลด' },
  bpDays: { ru: 'дней', en: 'days', de: 'Tage', fr: 'jours', es: 'días', th: 'วัน' },
  bpTotalFrom: { ru: 'Итого от', en: 'Total from', de: 'Gesamt ab', fr: 'Total à partir de', es: 'Total desde', th: 'รวมตั้งแต่' },
  bpBudgetAll: { ru: 'Все', en: 'All', de: 'Alle', fr: 'Tous', es: 'Todos', th: 'ทั้งหมด' },
  bpBudgetEconomy: { ru: 'Эконом', en: 'Economy', de: 'Economy', fr: 'Économique', es: 'Económico', th: 'ประหยัด' },
  bpBudgetComfort: { ru: 'Комфорт', en: 'Comfort', de: 'Komfort', fr: 'Confort', es: 'Confort', th: 'สะดวกสบาย' },
  bpBudgetPremium: { ru: 'Премиум', en: 'Premium', de: 'Premium', fr: 'Premium', es: 'Premium', th: 'พรีเมียม' },
  quizResultLabel: { ru: 'Подобрали идеальный вариант', en: 'Found the perfect match', de: 'Perfekte Wahl gefunden', fr: 'Option idéale trouvée', es: 'Encontramos la opción perfecta', th: 'เจอตัวเลือกที่สมบูรณ์แบบ' },
  quizResultDesc: { ru: 'Идеально под ваши ответы', en: 'Perfect for your answers', de: 'Perfekt nach Ihren Antworten', fr: 'Parfait selon vos réponses', es: 'Perfecto según tus respuestas', th: 'เหมาะกับคำตอบของคุณ' },
  quizWhyTitle: { ru: 'Почему именно этот байк', en: 'Why this bike', de: 'Warum dieses Bike', fr: 'Pourquoi ce scooter', es: 'Por qué esta moto', th: 'ทำไมรถคันนี้' },
  quizAlsoFits: { ru: 'Также подойдёт', en: 'Also fits', de: 'Passt auch', fr: 'Convient aussi', es: 'También sirve', th: 'เหมาะเช่นกัน' },
  quizFromPrice: { ru: 'от', en: 'from', de: 'ab', fr: 'à partir de', es: 'desde', th: 'ตั้งแต่' },
  quizStepOf: { ru: 'из', en: 'of', de: 'von', fr: 'sur', es: 'de', th: 'จาก' },
  quizBack: { ru: '← Назад', en: '← Back', de: '← Zurück', fr: '← Retour', es: '← Atrás', th: '← กลับ' },
  bpResultTitle: { ru: 'Мы подобрали для вас', en: 'We picked for you', de: 'Wir haben für dich ausgewählt', fr: 'Nous avons choisi pour vous', es: 'Hemos elegido para ti', th: 'เราเลือกให้คุณ' },
  bpResultSub: { ru: 'Топ-3 по вашим параметрам', en: 'Top 3 for your preferences', de: 'Top 3 nach deinen Wünschen', fr: 'Top 3 selon vos préférences', es: 'Top 3 según tus preferencias', th: 'อันดับ 3 ตามความชอบของคุณ' },
  bpBestChoice: { ru: '★ Лучший выбор', en: '★ Best choice', de: '★ Beste Wahl', fr: '★ Meilleur choix', es: '★ Mejor opción', th: '★ ตัวเลือกที่ดีที่สุด' },
  bpPerDay: { ru: '฿/день', en: '฿/day', de: '฿/Tag', fr: '฿/jour', es: '฿/día', th: '฿/วัน' },
  bpTotalFor: { ru: 'Итого за', en: 'Total for', de: 'Gesamt für', fr: 'Total pour', es: 'Total por', th: 'รวม' },
  bpDaysUnit: { ru: 'дн.', en: 'days', de: 'Tage', fr: 'jours', es: 'días', th: 'วัน' },
  bpRent: { ru: 'Арендовать', en: 'Rent', de: 'Mieten', fr: 'Louer', es: 'Alquilar', th: 'เช่า' },
  bpRestart: { ru: 'Подобрать заново', en: 'Start over', de: 'Nochmal auswählen', fr: 'Recommencer', es: 'Empezar de nuevo', th: 'เริ่มใหม่' },
  bpPromise: {
    ru: 'Результат сразу — без регистрации и SMS',
    en: 'Results instantly — no registration required',
    de: 'Ergebnis sofort — ohne Registrierung',
    fr: 'Résultat immédiat — sans inscription',
    es: 'Resultado al instante — sin registro',
    th: 'ผลลัพธ์ทันที — ไม่ต้องลงทะเบียน'
  },
  bpInsBasic: { ru: 'Базовая', en: 'Basic', de: 'Basis', fr: 'Base', es: 'Básico', th: 'พื้นฐาน' },
  bpInsBasicFree: { ru: 'бесплатно', en: 'free', de: 'kostenlos', fr: 'gratuit', es: 'gratis', th: 'ฟรี' },
  bpInsPlus: { ru: 'Страховка+', en: 'Insurance+', de: 'Versicherung+', fr: 'Assurance+', es: 'Seguro+', th: 'ประกัน+' },
  bpInsPlusManual: { ru: 'Недоступна', en: 'Not available', de: 'Nicht verfügbar', fr: 'Non disponible', es: 'No disponible', th: 'ไม่มี' },
  bpInsPerDay: { ru: '฿/день', en: '฿/day', de: '฿/Tag', fr: '฿/jour', es: '฿/día', th: '฿/วัน' },
  bpTotal: { ru: 'Итого:', en: 'Total:', de: 'Gesamt:', fr: 'Total :', es: 'Total:', th: 'รวม:' },
  bpWhatsApp: { ru: 'Написать в WhatsApp', en: 'Message on WhatsApp', de: 'Nachricht auf WhatsApp', fr: 'Écrire sur WhatsApp', es: 'Escribir en WhatsApp', th: 'ส่งข้อความ WhatsApp' },
  bpTelegram: { ru: 'Написать в Telegram', en: 'Message on Telegram', de: 'Nachricht auf Telegram', fr: 'Écrire sur Telegram', es: 'Escribir en Telegram', th: 'ส่งข้อความ Telegram' },
  badgePopular: { ru: 'Популярный', en: 'Popular', de: 'Beliebt', fr: 'Populaire', es: 'Popular', th: 'ยอดนิยม' },
  badgeBeginner: { ru: 'Для новичков', en: 'For beginners', de: 'Für Anfänger', fr: 'Pour débutants', es: 'Para principiantes', th: 'สำหรับมือใหม่' },
  bpcTitle: { ru: 'Не знаете, какой байк выбрать?', en: 'Not sure which bike to pick?', de: 'Nicht sicher, welches Bike?', fr: 'Quel scooter choisir ?', es: '¿No sabes qué moto elegir?', th: 'ไม่แน่ใจว่าจะเลือกรุ่นไหน?' },
  bpcSub: { ru: 'Ответьте на 5 вопросов — сразу покажем байк и цену', en: 'Answer 5 questions — we\'ll show you the bike and price', de: '5 Fragen beantworten — wir zeigen Bike und Preis', fr: 'Répondez à 5 questions — on montre le scooter et le prix', es: 'Responde 5 preguntas — te mostramos la moto y precio', th: 'ตอบ 5 คำถาม — เราจะแนะนำรถและราคา' },
  bpcBtn: { ru: 'Подобрать байк за 1 минуту', en: 'Find your bike in 1 min', de: 'Bike in 1 Min finden', fr: 'Trouver en 1 min', es: 'Encontrar moto en 1 min', th: 'หารถใน 1 นาที' },
  ctaWhatsapp: { ru: '\u{1F4AC} Написать в WhatsApp', en: '\u{1F4AC} Message WhatsApp', de: '\u{1F4AC} WhatsApp schreiben', fr: '\u{1F4AC} Écrire sur WhatsApp', es: '\u{1F4AC} Escribir en WhatsApp', th: '\u{1F4AC} WhatsApp' },
  ctaTelegram: { ru: '\u{1F4F1} Написать в Telegram', en: '\u{1F4F1} Message Telegram', de: '\u{1F4F1} Telegram schreiben', fr: '\u{1F4F1} Écrire sur Telegram', es: '\u{1F4F1} Escribir en Telegram', th: '\u{1F4F1} Telegram' },
  ctaReplyTime: { ru: 'Отвечаем быстро', en: 'We reply fast', de: 'Schnelle Antwort', fr: 'Réponse rapide', es: 'Respondemos rápido', th: 'ตอบเร็ว' },
  bpWaMsg: {
    ru: 'Привет! По результатам квиза выбрал: ${name}, ${days} дн., ${total} ฿${ins}',
    en: 'Hi! Based on the quiz I chose: ${name}, ${days} days, ${total} ฿${ins}',
    de: 'Hallo! Laut Quiz habe ich gewählt: ${name}, ${days} Tage, ${total} ฿${ins}',
    fr: 'Bonjour ! D\'après le quiz j\'ai choisi : ${name}, ${days} jours, ${total} ฿${ins}',
    es: '¡Hola! Según el quiz elegí: ${name}, ${days} días, ${total} ฿${ins}',
    th: 'สวัสดี! จากแบบทดสอบ เลือก: ${name}, ${days} วัน, ${total} ฿${ins}'
  },
  bpAutoType: { ru: 'Автомат', en: 'Automatic', de: 'Automatik', fr: 'Automatique', es: 'Automático', th: 'ออโต้' },
  bpManualType: { ru: 'Механика', en: 'Manual', de: 'Schaltung', fr: 'Manuelle', es: 'Manual', th: 'เกียร์ธรรมดา' },

  // ── Proof row ──
  proofNoDeposit: { ru: 'Без залога паспорта', en: 'No passport deposit', de: 'Ohne Passkaution', fr: 'Sans caution', es: 'Sin depósito', th: 'ไม่ต้องวางพาสปอร์ต' },
  proofDelivery: { ru: 'Доставка к отелю', en: 'Hotel delivery', de: 'Hotellieferung', fr: 'Livraison hôtel', es: 'Entrega al hotel', th: 'ส่งถึงโรงแรม' },
  proofInsurance: { ru: 'Договор и страховка', en: 'Contract & insurance', de: 'Vertrag & Versicherung', fr: 'Contrat & assurance', es: 'Contrato y seguro', th: 'สัญญาและประกัน' },
  proofNewBikes: { ru: 'Новые байки', en: 'New bikes', de: 'Neue Bikes', fr: 'Motos neuves', es: 'Motos nuevas', th: 'รถใหม่' },

  // ── Trust strip labels ──
  trustContract: { ru: 'Договор', en: 'Contract', de: 'Vertrag', fr: 'Contrat', es: 'Contrato', th: 'สัญญา' },
  trustNoDeposit: { ru: 'Без залога паспорта', en: 'No passport deposit', de: 'Ohne Passkaution', fr: 'Sans caution', es: 'Sin depósito', th: 'ไม่ต้องวางพาสปอร์ต' },
  trustInsurance: { ru: 'Страховка', en: 'Insurance', de: 'Versicherung', fr: 'Assurance', es: 'Seguro', th: 'ประกัน' },
  trustDelivery: { ru: 'Доставка к отелю', en: 'Hotel delivery', de: 'Hotellieferung', fr: 'Livraison', es: 'Entrega', th: 'จัดส่ง' },
  trustSupport: { ru: 'Поддержка 24/7', en: '24/7 Support', de: '24/7 Support', fr: 'Support 24/7', es: 'Soporte 24/7', th: 'บริการ 24/7' },

  // ── Deal bar ──
  dealBarLabel: { ru: 'Лучшее предложение', en: 'Best deal', de: 'Bestes Angebot', fr: 'Meilleure offre', es: 'Mejor oferta', th: 'ข้อเสนอที่ดีที่สุด' },
  dealBarDays: { ru: 'дней', en: 'days', de: 'Tage', fr: 'jours', es: 'días', th: 'วัน' },
  dealBarPerDay: { ru: '/день', en: '/day', de: '/Tag', fr: '/jour', es: '/día', th: '/วัน' },

  // ── Booking sheet new ──
  sheetRentalPeriod: { ru: 'Срок аренды:', en: 'Rental period:', de: 'Mietdauer:', fr: 'Durée:', es: 'Periodo:', th: 'ระยะเวลาเช่า:' },
  sheetDaysLabel: { ru: 'дней', en: 'days', de: 'Tage', fr: 'jours', es: 'días', th: 'วัน' },
  sheetSaving: { ru: 'экономия', en: 'savings', de: 'Ersparnis', fr: 'économie', es: 'ahorro', th: 'ประหยัด' },
  sheetInsBasicTitle: { ru: 'Страховка — включена бесплатно', en: 'Insurance — included free', de: 'Versicherung — kostenlos', fr: 'Assurance — incluse', es: 'Seguro — incluido', th: 'ประกัน — ฟรี' },
  sheetInsBasicDesc: { ru: 'Здоровье водителя и пассажира · до 30 000 ฿', en: 'Rider & passenger health · up to 30,000 ฿', de: 'Fahrer- & Beifahrer-Gesundheit · bis 30.000 ฿', fr: 'Santé conducteur & passager · jusqu\'à 30 000 ฿', es: 'Salud conductor y pasajero · hasta 30,000 ฿', th: 'สุขภาพผู้ขับขี่และผู้โดยสาร · สูงสุด 30,000 ฿' },
  sheetInsProtTitle: { ru: 'Защита байка+', en: 'Bike Protection+', de: 'Bike-Schutz+', fr: 'Protection moto+', es: 'Protección moto+', th: 'ความคุ้มครองรถ+' },
  sheetInsProtTags: {
    ru: ['Царапины', 'Вмятины', 'Падение', 'Опрокидывание'],
    en: ['Scratches', 'Dents', 'Falls', 'Tipping over'],
    de: ['Kratzer', 'Dellen', 'Stürze', 'Umkippen'],
    fr: ['Rayures', 'Bosses', 'Chutes', 'Renversement'],
    es: ['Rayones', 'Abolladuras', 'Caídas', 'Volcaduras'],
    th: ['รอยขีดข่วน', 'รอยบุบ', 'ล้ม', 'คว่ำ']
  },
  sheetTotalLabel: { ru: 'Итого', en: 'Total', de: 'Gesamt', fr: 'Total', es: 'Total', th: 'รวม' },
  sheetSavingCompare: { ru: 'Экономишь ${amount} ฿ по сравнению с ценой 1–2 дней', en: 'You save ${amount} ฿ compared to 1–2 day price', de: 'Sie sparen ${amount} ฿ im Vergleich zum 1–2 Tage-Preis', fr: 'Vous économisez ${amount} ฿ par rapport au prix 1–2 jours', es: 'Ahorras ${amount} ฿ comparado con precio de 1–2 días', th: 'ประหยัด ${amount} ฿ เทียบกับราคา 1–2 วัน' },
  sheetOrderHint: { ru: 'Мы пришлём готовый расчёт — вам только подтвердить', en: 'We\'ll send you a ready calculation — just confirm', de: 'Wir senden Ihnen die Berechnung — einfach bestätigen', fr: 'Nous vous enverrons le calcul — confirmez simplement', es: 'Le enviaremos el cálculo — solo confirme', th: 'เราจะส่งการคำนวณให้ — แค่ยืนยัน' },
  sheetNextDiscount: { ru: 'Ещё ${days} дней — и будет −${percent}% (${price} ฿/день)', en: '${days} more days for −${percent}% (${price} ฿/day)', de: 'Noch ${days} Tage für −${percent}% (${price} ฿/Tag)', fr: 'Encore ${days} jours pour −${percent}% (${price} ฿/jour)', es: '${days} días más para −${percent}% (${price} ฿/día)', th: 'อีก ${days} วัน จะได้ −${percent}% (${price} ฿/วัน)' },

  // ── Contacts new ──
  contactsOfficeBadge: { ru: 'Наш офис на Пхукете', en: 'Our office in Phuket', de: 'Unser Büro auf Phuket', fr: 'Notre bureau à Phuket', es: 'Nuestra oficina en Phuket', th: 'สำนักงานของเราในภูเก็ต' },
  contactsOfficeName: { ru: 'ThaiGo Rent', en: 'ThaiGo Rent', de: 'ThaiGo Rent', fr: 'ThaiGo Rent', es: 'ThaiGo Rent', th: 'ThaiGo Rent' },
  contactsAddrHint: { ru: 'Точный адрес пришлём при заказе', en: 'Exact address sent upon booking', de: 'Genaue Adresse bei Buchung', fr: 'Adresse exacte envoyée à la réservation', es: 'Dirección exacta al reservar', th: 'ที่อยู่แน่นอนส่งเมื่อจอง' },
  contactsBuildRoute: { ru: 'Построить маршрут в офис', en: 'Get directions to office', de: 'Route zum Büro planen', fr: 'Itinéraire vers le bureau', es: 'Ruta a la oficina', th: 'นำทางไปสำนักงาน' },
  contactsFabRoute: { ru: 'Маршрут в офис', en: 'Route to office', de: 'Route zum Büro', fr: 'Itinéraire bureau', es: 'Ruta oficina', th: 'เส้นทาง' },
  deliveryTitle: { ru: 'Доставка байка', en: 'Bike delivery', de: 'Bike-Lieferung', fr: 'Livraison moto', es: 'Entrega de moto', th: 'จัดส่งมอเตอร์ไซค์' },
  deliveryFreeTitle: { ru: 'Бесплатно от 3 дней', en: 'Free from 3 days', de: 'Kostenlos ab 3 Tagen', fr: 'Gratuit dès 3 jours', es: 'Gratis desde 3 días', th: 'ฟรีตั้งแต่ 3 วัน' },
  deliveryFreeZones: { ru: 'Ката · Карон · Патонг · Чалонг · Раваи', en: 'Kata · Karon · Patong · Chalong · Rawai', de: 'Kata · Karon · Patong · Chalong · Rawai', fr: 'Kata · Karon · Patong · Chalong · Rawai', es: 'Kata · Karon · Patong · Chalong · Rawai', th: 'กะตะ · กะรน · ป่าตอง · ฉลอง · ราไวย์' },
  deliveryPaidTitle: { ru: 'Платно 300 ฿ (бесплатно от 7 дн)', en: 'Paid 300 ฿ (free from 7 days)', de: '300 ฿ (kostenlos ab 7 Tagen)', fr: '300 ฿ (gratuit dès 7 jours)', es: '300 ฿ (gratis desde 7 días)', th: '300 ฿ (ฟรีตั้งแต่ 7 วัน)' },
  deliveryPaidZones: { ru: 'Камала · Сурин · Бангтао · Маи Кхао · весь остров', en: 'Kamala · Surin · Bang Tao · Mai Khao · whole island', de: 'Kamala · Surin · Bang Tao · Mai Khao · ganze Insel', fr: 'Kamala · Surin · Bang Tao · Mai Khao · toute l\'île', es: 'Kamala · Surin · Bang Tao · Mai Khao · toda la isla', th: 'กมลา · สุรินทร์ · บางเทา · ไม้ขาว · ทั้งเกาะ' },

  // ── Bike badges ──
  badgeHit: { ru: 'Хит', en: 'Hit', de: 'Hit', fr: 'Hit', es: 'Hit', th: 'ยอดฮิต' },
  badgeNewbie: { ru: 'Новичкам', en: 'Beginners', de: 'Anfänger', fr: 'Débutants', es: 'Principiantes', th: 'มือใหม่' },
  badgeComfort: { ru: 'Комфорт', en: 'Comfort', de: 'Komfort', fr: 'Confort', es: 'Confort', th: 'สะดวกสบาย' },
  bikeBtnTake: { ru: 'Взять', en: 'Rent', de: 'Mieten', fr: 'Louer', es: 'Alquilar', th: 'เช่า' },

  // ── Picker banner ──
  pickerBannerTitle: { ru: 'Не знаете какой выбрать?', en: 'Not sure which one?', de: 'Nicht sicher?', fr: 'Pas sûr du choix ?', es: '¿No sabes cuál elegir?', th: 'ไม่แน่ใจว่าเลือกรุ่นไหน?' },
  pickerBannerSub: { ru: 'Ответьте на 5 вопросов — сразу покажем байк и цену', en: 'Answer 5 questions — we\'ll show you the bike and price', de: '5 Fragen beantworten — wir zeigen Bike und Preis', fr: 'Répondez à 5 questions — on montre le scooter et le prix', es: 'Responde 5 preguntas — te mostramos la moto y precio', th: 'ตอบ 5 คำถาม — เราจะแนะนำรถและราคา' },
  pickerBannerBtn: { ru: 'Подобрать', en: 'Find bike', de: 'Finden', fr: 'Trouver', es: 'Buscar', th: 'ค้นหา' },

  reviewsTitle: { ru: 'Что говорят клиенты', en: 'What clients say', de: 'Was Kunden sagen', fr: 'Avis clients', es: 'Lo que dicen los clientes', th: 'ลูกค้าพูดว่าอะไร' },
  reviews: [
    {
      initials: 'М', bgColor: '#4338CA', date: { ru: 'Январь 2025', en: 'January 2025', de: 'Januar 2025', fr: 'Janvier 2025', es: 'Enero 2025', th: 'มกราคม 2025' },
      text: {
        ru: 'Взяли PCX на неделю — привезли прямо к отелю, всё чисто и заправлено. Когда поцарапали зеркало — позвонили ребятам, решили вопрос за 10 минут без скандалов. Рекомендую.',
        en: 'Rented a PCX for a week — delivered right to our hotel, clean and fueled. When we scratched the mirror, called the guys and they sorted it in 10 minutes, no drama. Highly recommend.',
        de: 'PCX für eine Woche gemietet — direkt zum Hotel geliefert, sauber und betankt. Als wir den Spiegel zerkratzten, haben die Jungs das in 10 Minuten geklärt. Empfehlenswert.',
        fr: 'Loué un PCX pour une semaine — livré à l\'hôtel, propre et plein. Quand on a rayé le rétro, les gars ont réglé ça en 10 min sans stress. Je recommande.',
        es: 'Alquilamos un PCX por una semana — lo trajeron al hotel, limpio y con tanque lleno. Cuando rayamos el espejo, lo resolvieron en 10 minutos sin drama. Recomendado.',
        th: 'เช่า PCX หนึ่งสัปดาห์ — ส่งถึงโรงแรม สะอาดเติมน้ำมันเต็ม ตอนกระจกข่วน โทรหาทีม แก้ไขใน 10 นาที ไม่มีปัญหา แนะนำเลย'
      },
      author: { ru: 'Михаил, Москва', en: 'Mikhail, Moscow', de: 'Mikhail, Moskau', fr: 'Mikhaïl, Moscou', es: 'Mikhail, Moscú', th: 'Mikhail, มอสโก' }
    },
    {
      initials: 'АД', bgColor: '#0D9488', date: { ru: 'Декабрь 2024', en: 'December 2024', de: 'Dezember 2024', fr: 'Décembre 2024', es: 'Diciembre 2024', th: 'ธันวาคม 2024' },
      text: {
        ru: 'Брали две Scoopy на 10 дней, объездили весь остров. Цены честные, договор нормальный, паспорт не забирали. Будем брать снова в следующий раз.',
        en: 'Rented two Scoopys for 10 days, explored the whole island. Fair prices, proper contract, no passport held. Will rent again next time.',
        de: 'Zwei Scoopys für 10 Tage gemietet, die ganze Insel erkundet. Faire Preise, ordentlicher Vertrag, kein Pass einbehalten. Nächstes Mal wieder.',
        fr: 'Loué deux Scoopy pour 10 jours, on a fait tout l\'île. Prix honnêtes, contrat correct, pas de passeport retenu. On reviendra.',
        es: 'Alquilamos dos Scoopy por 10 días, recorrimos toda la isla. Precios justos, contrato normal, sin retener pasaporte. Volveremos.',
        th: 'เช่า Scoopy สองคัน 10 วัน เที่ยวทั่วเกาะ ราคายุติธรรม สัญญาถูกต้อง ไม่ยึดพาสปอร์ต จะมาเช่าอีกครั้งต่อไป'
      },
      author: { ru: 'Анна и Дима, Санкт-Петербург', en: 'Anna & Dima, St. Petersburg', de: 'Anna & Dima, St. Petersburg', fr: 'Anna & Dima, Saint-Pétersbourg', es: 'Anna y Dima, San Petersburgo', th: 'Anna & Dima, เซนต์ปีเตอร์สเบิร์ก' }
    },
    {
      initials: 'Л', bgColor: '#D97706', date: { ru: 'Февраль 2025', en: 'February 2025', de: 'Februar 2025', fr: 'Février 2025', es: 'Febrero 2025', th: 'กุมภาพันธ์ 2025' },
      text: {
        ru: 'Первый раз арендовала байк вообще в жизни, очень переживала. Ребята всё объяснили, помогли выбрать модель под мой рост и опыт. Каталась без проблем всю поездку.',
        en: 'First time renting a bike ever, I was really nervous. The guys explained everything, helped me choose the right model for my height and experience. Rode the whole trip without issues.',
        de: 'Zum ersten Mal ein Bike gemietet, war sehr nervös. Die Jungs haben alles erklärt und mir das passende Modell empfohlen. Die ganze Reise problemlos gefahren.',
        fr: 'Première location de scooter de ma vie, j\'étais stressée. Les gars ont tout expliqué, m\'ont aidée à choisir le bon modèle. J\'ai roulé sans souci pendant tout le séjour.',
        es: 'Primera vez alquilando una moto en mi vida, estaba muy nerviosa. Los chicos me explicaron todo y me ayudaron a elegir el modelo adecuado. Conduje sin problemas todo el viaje.',
        th: 'เช่ามอเตอร์ไซค์ครั้งแรกในชีวิต ตื่นเต้นมาก ทีมงานอธิบายทุกอย่าง ช่วยเลือกรุ่นที่เหมาะกับส่วนสูงและประสบการณ์ ขับสนุกตลอดทริป'
      },
      author: { ru: 'Лера, Екатеринбург', en: 'Lera, Yekaterinburg', de: 'Lera, Jekaterinburg', fr: 'Lera, Iekaterinbourg', es: 'Lera, Ekaterimburgo', th: 'Lera, เยคาเตรินเบิร์ก' }
    }
  ],

  // ── Delivery districts ──
  deliveryTitle: {
    ru: 'Доставка по Пхукету', en: 'Delivery across Phuket', de: 'Lieferung auf Phuket', fr: 'Livraison à Phuket', es: 'Entrega en Phuket', th: 'บริการส่งทั่วภูเก็ต'
  },
  deliveryNote: {
    ru: 'Доставка в отель или виллу. Возврат — туда же.',
    en: 'Delivery to your hotel or villa. Return pickup included.',
    de: 'Lieferung an Ihr Hotel oder Ihre Villa. Rückgabe inklusive.',
    fr: 'Livraison à votre hôtel ou villa. Retour inclus.',
    es: 'Entrega en tu hotel o villa. Recogida de vuelta incluida.',
    th: 'ส่งถึงโรงแรมหรือวิลล่า คืนที่เดิม'
  },
  dlvAreas: [
    {
      name: { ru: 'Ката / Карон', en: 'Kata / Karon', de: 'Kata / Karon', fr: 'Kata / Karon', es: 'Kata / Karon', th: 'กะตะ / กะรน' },
      cond: { ru: 'Бесплатно от 3 дней', en: 'Free from 3 days', de: 'Kostenlos ab 3 Tagen', fr: 'Gratuit dès 3 jours', es: 'Gratis desde 3 días', th: 'ฟรีตั้งแต่ 3 วัน' },
      color: 'green'
    },
    {
      name: { ru: 'Патонг', en: 'Patong', de: 'Patong', fr: 'Patong', es: 'Patong', th: 'ป่าตอง' },
      cond: { ru: 'Бесплатно от 3 дней', en: 'Free from 3 days', de: 'Kostenlos ab 3 Tagen', fr: 'Gratuit dès 3 jours', es: 'Gratis desde 3 días', th: 'ฟรีตั้งแต่ 3 วัน' },
      color: 'green'
    },
    {
      name: { ru: 'Камала / Сурин', en: 'Kamala / Surin', de: 'Kamala / Surin', fr: 'Kamala / Surin', es: 'Kamala / Surin', th: 'กมลา / สุรินทร์' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días', th: '300 ฿ · ฟรีตั้งแต่ 7 วัน' },
      color: 'yellow'
    },
    {
      name: { ru: 'Бангтао', en: 'Bangtao', de: 'Bangtao', fr: 'Bangtao', es: 'Bangtao', th: 'บางเทา' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días', th: '300 ฿ · ฟรีตั้งแต่ 7 วัน' },
      color: 'yellow'
    },
    {
      name: { ru: 'Раваи / Най Харн', en: 'Rawai / Nai Harn', de: 'Rawai / Nai Harn', fr: 'Rawai / Nai Harn', es: 'Rawai / Nai Harn', th: 'ราไวย์ / ในหาน' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días', th: '300 ฿ · ฟรีตั้งแต่ 7 วัน' },
      color: 'yellow'
    },
    {
      name: { ru: 'Чалонг / Пхукет-таун', en: 'Chalong / Phuket Town', de: 'Chalong / Phuket Town', fr: 'Chalong / Phuket Town', es: 'Chalong / Phuket Town', th: 'ฉลอง / เมืองภูเก็ต' },
      cond: { ru: '300 ฿ · бесплатно от 7 дней', en: '300 ฿ · free from 7 days', de: '300 ฿ · kostenlos ab 7 Tagen', fr: '300 ฿ · gratuit dès 7 jours', es: '300 ฿ · gratis desde 7 días', th: '300 ฿ · ฟรีตั้งแต่ 7 วัน' },
      color: 'yellow'
    },
    {
      name: { ru: 'Аэропорт / Най Янг', en: 'Airport / Nai Yang', de: 'Flughafen / Nai Yang', fr: 'Aéroport / Nai Yang', es: 'Aeropuerto / Nai Yang', th: 'สนามบิน / ในยาง' },
      cond: { ru: '500 ฿ · бесплатно от 10 дней', en: '500 ฿ · free from 10 days', de: '500 ฿ · kostenlos ab 10 Tagen', fr: '500 ฿ · gratuit dès 10 jours', es: '500 ฿ · gratis desde 10 días', th: '500 ฿ · ฟรีตั้งแต่ 10 วัน' },
      color: 'blue'
    },
    {
      name: { ru: 'Другой район', en: 'Other area', de: 'Anderes Gebiet', fr: 'Autre quartier', es: 'Otra zona', th: 'พื้นที่อื่น' },
      cond: { ru: 'Уточняйте', en: 'Contact us', de: 'Auf Anfrage', fr: 'Nous contacter', es: 'Consúltenos', th: 'สอบถามเพิ่มเติม' },
      color: 'blue'
    }
  ],

  // ── Tab bar ──
  tabHome: {
    ru: 'Главная', en: 'Home', de: 'Start', fr: 'Accueil', es: 'Inicio', th: 'หน้าหลัก'
  },
  tabBikes: {
    ru: 'Байки', en: 'Bikes', de: 'Bikes', fr: 'Motos', es: 'Motos', th: 'รถ'
  },
  tabGuide: {
    ru: 'Гид', en: 'Guide', de: 'Guide', fr: 'Guide', es: 'Guía', th: 'ไกด์'
  },
  tabRoutes: {
    ru: 'Маршруты', en: 'Routes', de: 'Routen', fr: 'Itinéraires', es: 'Rutas', th: 'เส้นทาง'
  },
  tabContacts: {
    ru: 'Контакты', en: 'Contacts', de: 'Kontakt', fr: 'Contact', es: 'Contacto', th: 'ติดต่อ'
  },

  // ── Bike filters ──
  filterAll: {
    ru: 'Все', en: 'All', de: 'Alle', fr: 'Tout', es: 'Todos', th: 'ทั้งหมด'
  },
  filterScooter: {
    ru: 'Скутеры', en: 'Scooters', de: 'Roller', fr: 'Scooters', es: 'Scooters', th: 'สกู๊ตเตอร์'
  },
  filterMaxi: {
    ru: 'Макси', en: 'Maxi', de: 'Maxi', fr: 'Maxi', es: 'Maxi', th: 'แม็กซี่'
  },
  filterMoto: {
    ru: 'Мотоциклы', en: 'Motorcycles', de: 'Motorräder', fr: 'Motos', es: 'Motocicletas', th: 'มอเตอร์ไซค์'
  },
  filterCar: {
    ru: 'Авто', en: 'Cars', de: 'Autos', fr: 'Voitures', es: 'Coches', th: 'รถยนต์'
  },
  bikeBtnRent: {
    ru: 'Взять', en: 'Rent', de: 'Mieten', fr: 'Louer', es: 'Alquilar', th: 'เช่า'
  },

  // ── Place filters ──
  placeTop: {
    ru: 'Топ', en: 'Top', de: 'Top', fr: 'Top', es: 'Top', th: 'ยอดนิยม'
  },
  placeBeach: {
    ru: 'Пляжи', en: 'Beaches', de: 'Strände', fr: 'Plages', es: 'Playas', th: 'หาดทราย'
  },
  placeView: {
    ru: 'Смотровые', en: 'Viewpoints', de: 'Aussichten', fr: 'Panoramas', es: 'Miradores', th: 'จุดชมวิว'
  },
  placeTemple: {
    ru: 'Храмы', en: 'Temples', de: 'Tempel', fr: 'Temples', es: 'Templos', th: 'วัด'
  },
  placeNature: {
    ru: 'Природа', en: 'Nature', de: 'Natur', fr: 'Nature', es: 'Naturaleza', th: 'ธรรมชาติ'
  },
  placeMarket: {
    ru: 'Рынки', en: 'Markets', de: 'Märkte', fr: 'Marchés', es: 'Mercados', th: 'ตลาด'
  },
  placeFood: {
    ru: 'Еда', en: 'Food', de: 'Essen', fr: 'Cuisine', es: 'Comida', th: 'อาหาร'
  },
  placePhoto: {
    ru: 'Фото', en: 'Photo', de: 'Foto', fr: 'Photo', es: 'Foto', th: 'ถ่ายรูป'
  },
  placeSearchPlaceholder: {
    ru: 'Поиск места...', en: 'Search place...', de: 'Ort suchen...', fr: 'Chercher un lieu...', es: 'Buscar lugar...', th: 'ค้นหาสถานที่...'
  },

  // ── Route subtabs ──
  subtabPlaces: {
    ru: 'Места', en: 'Places', de: 'Orte', fr: 'Lieux', es: 'Lugares', th: 'สถานที่'
  },
  subtabRoute: {
    ru: 'Маршрут', en: 'Route', de: 'Route', fr: 'Itinéraire', es: 'Ruta', th: 'เส้นทาง'
  },

  // ── Route panel ──
  routeLabel: {
    ru: 'Маршрут', en: 'Route', de: 'Route', fr: 'Itinéraire', es: 'Ruta', th: 'เส้นทาง'
  },
  routeReset: {
    ru: 'Сбросить', en: 'Reset', de: 'Zurücksetzen', fr: 'Réinitialiser', es: 'Resetear', th: 'รีเซ็ต'
  },
  routeEmpty: {
    ru: 'Выбери 2+ места чтобы построить маршрут',
    en: 'Pick 2+ places to build a route',
    de: 'Wähle 2+ Orte für eine Route',
    fr: 'Choisis 2+ lieux pour créer un itinéraire',
    es: 'Elige 2+ lugares para crear una ruta',
    th: 'เลือก 2 สถานที่ขึ้นไปเพื่อสร้างเส้นทาง'
  },
  statKm: { ru: 'км', en: 'km', de: 'km', fr: 'km', es: 'km', th: 'กม.' },
  statEnRoute: { ru: 'в пути', en: 'en route', de: 'unterwegs', fr: 'en route', es: 'en ruta', th: 'ระหว่างทาง' },
  statFuel: { ru: '\u0E3F бензин', en: '\u0E3F fuel', de: '\u0E3F Benzin', fr: '\u0E3F carburant', es: '\u0E3F gasolina', th: '\u0E3F น้ำมัน' },
  costTaxiLabel: { ru: 'Такси:', en: 'Taxi:', de: 'Taxi:', fr: 'Taxi :', es: 'Taxi:', th: 'แท็กซี่:' },
  costBikeLabel: {
    ru: 'Байк: ~130 \u0E3F/день', en: 'Bike: ~130 \u0E3F/day', de: 'Bike: ~130 \u0E3F/Tag', fr: 'Moto : ~130 \u0E3F/jour', es: 'Moto: ~130 \u0E3F/día', th: 'มอเตอร์ไซค์: ~130 \u0E3F/วัน'
  },
  routeNeedBike: {
    ru: 'Для маршрута нужен байк', en: 'You need a bike for this route', de: 'Für die Route brauchst du ein Bike', fr: 'Un scooter est nécessaire', es: 'Necesitas una moto para esta ruta', th: 'ต้องมีมอเตอร์ไซค์สำหรับเส้นทางนี้'
  },
  routeNeedBikePrice: {
    ru: 'от 130 \u0E3F в день', en: 'from 130 \u0E3F/day', de: 'ab 130 \u0E3F/Tag', fr: 'dès 130 \u0E3F/jour', es: 'desde 130 \u0E3F/día', th: 'ตั้งแต่ 130 \u0E3F/วัน'
  },
  routeRentBtn: {
    ru: 'Арендовать', en: 'Rent a bike', de: 'Mieten', fr: 'Louer', es: 'Alquilar', th: 'เช่ารถ'
  },
  routeCleared: {
    ru: 'Маршрут сброшен', en: 'Route cleared', de: 'Route gelöscht', fr: 'Itinéraire réinitialisé', es: 'Ruta eliminada', th: 'ล้างเส้นทางแล้ว'
  },

  // ── Route presets & features ──
  presetsTitle: {
    ru: 'Готовые маршруты', en: 'Preset routes', de: 'Vorgefertigte Routen', fr: 'Itinéraires prédéfinis', es: 'Rutas predefinidas', th: 'เส้นทางสำเร็จรูป'
  },
  presetSouth: {
    ru: 'Юг острова', en: 'South Island', de: 'Süden', fr: 'Sud', es: 'Sur', th: 'ใต้เกาะ'
  },
  presetSunset: {
    ru: 'Закатный', en: 'Sunset Tour', de: 'Sonnenuntergang', fr: 'Coucher de soleil', es: 'Atardecer', th: 'ทัวร์พระอาทิตย์ตก'
  },
  presetNorth: {
    ru: 'Север острова', en: 'North Island', de: 'Norden', fr: 'Nord', es: 'Norte', th: 'เหนือเกาะ'
  },
  presetCulture: {
    ru: 'Культура', en: 'Culture', de: 'Kultur', fr: 'Culture', es: 'Cultura', th: 'วัฒนธรรม'
  },
  presetFood: {
    ru: 'Гастротур', en: 'Food Tour', de: 'Food-Tour', fr: 'Gastronomie', es: 'Gastronomía', th: 'ทัวร์อาหาร'
  },
  randomTitle: {
    ru: 'Случайный маршрут', en: 'Random route', de: 'Zufällige Route', fr: 'Itinéraire aléatoire', es: 'Ruta aleatoria', th: 'เส้นทางสุ่ม'
  },
  timeH: { ru: 'ч', en: 'h', de: 'h', fr: 'h', es: 'h', th: 'ชม.' },
  fullDay: { ru: 'Весь день', en: 'Full day', de: 'Ganzer Tag', fr: 'Journée', es: 'Todo el día', th: 'ทั้งวัน' },
  presetLoaded: { ru: 'Маршрут загружен', en: 'Route loaded', de: 'Route geladen', fr: 'Itinéraire chargé', es: 'Ruta cargada', th: 'โหลดเส้นทางแล้ว' },
  randomCreated: { ru: 'Маршрут создан', en: 'Route created', de: 'Route erstellt', fr: 'Itinéraire créé', es: 'Ruta creada', th: 'สร้างเส้นทางแล้ว' },
  optimize: { ru: 'Оптимизировать', en: 'Optimize', de: 'Optimieren', fr: 'Optimiser', es: 'Optimizar', th: 'ปรับปรุง' },
  routeOptimized: { ru: 'Маршрут оптимизирован', en: 'Route optimized', de: 'Route optimiert', fr: 'Itinéraire optimisé', es: 'Ruta optimizada', th: 'ปรับปรุงเส้นทางแล้ว' },
  shareRoute: { ru: 'Поделиться', en: 'Share', de: 'Teilen', fr: 'Partager', es: 'Compartir', th: 'แชร์' },
  copyLink: { ru: 'Копировать ссылку', en: 'Copy link', de: 'Link kopieren', fr: 'Copier le lien', es: 'Copiar enlace', th: 'คัดลอกลิงก์' },
  linkCopied: { ru: 'Ссылка скопирована', en: 'Link copied', de: 'Link kopiert', fr: 'Lien copié', es: 'Enlace copiado', th: 'คัดลอกลิงก์แล้ว' },
  nearbyLabel: { ru: 'Рядом:', en: 'Nearby:', de: 'In der Nähe:', fr: 'À proximité :', es: 'Cerca:', th: 'ใกล้เคียง:' },
  addBtn: { ru: 'Добавить', en: 'Add', de: 'Hinzufügen', fr: 'Ajouter', es: 'Añadir', th: 'เพิ่ม' },
  warnTraffic: { ru: 'Пробки в районе Патонга — заложи доп. время', en: 'Traffic near Patong — allow extra time', de: 'Stau bei Patong — plane extra Zeit ein', fr: 'Embouteillages près de Patong — prévoyez du temps', es: 'Tráfico cerca de Patong — deja tiempo extra', th: 'รถติดแถวป่าตอง — เผื่อเวลาเพิ่ม' },
  warnDressCode: { ru: 'Закрой плечи и колени для храма', en: 'Cover shoulders and knees for the temple', de: 'Bedecke Schultern und Knie für den Tempel', fr: 'Couvre épaules et genoux pour le temple', es: 'Cubre hombros y rodillas para el templo', th: 'ปิดไหล่และเข่าสำหรับวัด' },
  warnSerpentine: { ru: 'Серпантин — осторожно на поворотах', en: 'Winding road — careful on turns', de: 'Serpentinen — vorsichtig in Kurven', fr: 'Route sinueuse — prudence dans les virages', es: 'Carretera sinuosa — cuidado en las curvas', th: 'ถนนคดเคี้ยว — ระวังโค้ง' },
  warnLongRoute: { ru: 'Длинный маршрут — выезжай пораньше', en: 'Long route — start early', de: 'Lange Route — starte früh', fr: 'Long itinéraire — partez tôt', es: 'Ruta larga — sal temprano', th: 'เส้นทางยาว — ออกเดินทางเช้า' },

  placeAdded: {
    ru: 'добавлен', en: 'added', de: 'hinzugefügt', fr: 'ajouté', es: 'añadido', th: 'เพิ่มแล้ว'
  },
  placeRemoved: {
    ru: 'убран', en: 'removed', de: 'entfernt', fr: 'retiré', es: 'eliminado', th: 'ลบแล้ว'
  },
  maxPoints: {
    ru: 'Максимум ${n} точек', en: 'Maximum ${n} points', de: 'Maximal ${n} Punkte', fr: 'Maximum ${n} points', es: 'Máximo ${n} puntos', th: 'สูงสุด ${n} จุด'
  },
  kmFromPatong: {
    ru: '~${km} км от Патонга', en: '~${km} km from Patong', de: '~${km} km von Patong', fr: '~${km} km de Patong', es: '~${km} km de Patong', th: '~${km} กม. จากป่าตอง'
  },
  addToRoute: {
    ru: '+ В маршрут', en: '+ Add to route', de: '+ Zur Route', fr: '+ Ajouter', es: '+ Añadir a ruta', th: '+ เพิ่มเส้นทาง'
  },
  inRoute: {
    ru: '\u2713 В маршруте', en: '\u2713 In route', de: '\u2713 In Route', fr: '\u2713 Ajouté', es: '\u2713 En ruta', th: '\u2713 ในเส้นทาง'
  },

  // ── Contacts ──
  contactsTitle: {
    ru: 'Контакты', en: 'Contacts', de: 'Kontakt', fr: 'Contact', es: 'Contacto', th: 'ติดต่อ'
  },
  contactHours: {
    ru: 'Ежедневно 09:00–21:00', en: 'Daily 09:00–21:00', de: 'Täglich 09:00–21:00', fr: 'Tous les jours 9h–21h', es: 'Diario 09:00–21:00', th: 'ทุกวัน 09:00–21:00'
  },
  contactAddr: {
    ru: 'Ката, Пхукет, Таиланд', en: 'Kata, Phuket, Thailand', de: 'Kata, Phuket, Thailand', fr: 'Kata, Phuket, Thaïlande', es: 'Kata, Phuket, Tailandia', th: 'กะตะ ภูเก็ต ประเทศไทย'
  },
  contactBadge: {
    ru: 'Наш офис на Пхукете', en: 'Our office in Phuket', de: 'Unser Büro auf Phuket', fr: 'Notre bureau à Phuket', es: 'Nuestra oficina en Phuket', th: 'สำนักงานของเราในภูเก็ต'
  },
  contactRoute: {
    ru: 'Построить маршрут', en: 'Get directions', de: 'Route berechnen', fr: 'Itinéraire', es: 'Cómo llegar', th: 'เส้นทาง'
  },
  contactAddrLabel: {
    ru: 'Адрес', en: 'Address', de: 'Adresse', fr: 'Adresse', es: 'Dirección', th: 'ที่อยู่'
  },
  contactHoursLabel: {
    ru: 'Часы работы', en: 'Working hours', de: 'Öffnungszeiten', fr: 'Horaires', es: 'Horario', th: 'เวลาทำการ'
  },
  contactPhoneLabel: {
    ru: 'Телефон', en: 'Phone', de: 'Telefon', fr: 'Téléphone', es: 'Teléfono', th: 'โทรศัพท์'
  },
  contactCallBtn: {
    ru: 'Позвонить', en: 'Call', de: 'Anrufen', fr: 'Appeler', es: 'Llamar', th: 'โทร'
  },
  contactMsgLabel: {
    ru: 'Написать нам', en: 'Message us', de: 'Schreiben Sie uns', fr: 'Écrivez-nous', es: 'Escríbenos', th: 'ส่งข้อความ'
  },
  contactOpenMap: {
    ru: 'Открыть карту', en: 'Open map', de: 'Karte öffnen', fr: 'Ouvrir la carte', es: 'Abrir mapa', th: 'เปิดแผนที่'
  },
  contactMapLabel: {
    ru: 'ThaiGo Rent · Ката', en: 'ThaiGo Rent · Kata', de: 'ThaiGo Rent · Kata', fr: 'ThaiGo Rent · Kata', es: 'ThaiGo Rent · Kata', th: 'ThaiGo Rent · กะตะ'
  },
  floatingDirections: {
    ru: 'Как добраться', en: 'Get directions', de: 'Wegbeschreibung', fr: 'Itinéraire', es: 'Cómo llegar', th: 'เส้นทาง'
  },
  deliveryInfoTitle: {
    ru: 'Зоны доставки', en: 'Delivery zones', de: 'Lieferzonen', fr: 'Zones de livraison', es: 'Zonas de entrega', th: 'โซนจัดส่ง'
  },
  deliveryFreeList: {
    ru: 'Ката, Карон, Патонг', en: 'Kata, Karon, Patong', de: 'Kata, Karon, Patong', fr: 'Kata, Karon, Patong', es: 'Kata, Karon, Patong', th: 'กะตะ กะรน ป่าตอง'
  },
  deliveryPaidList: {
    ru: 'Камала, Сурин, Бангтао, Раваи, Чалонг', en: 'Kamala, Surin, Bangtao, Rawai, Chalong', de: 'Kamala, Surin, Bangtao, Rawai, Chalong', fr: 'Kamala, Surin, Bangtao, Rawai, Chalong', es: 'Kamala, Surin, Bangtao, Rawai, Chalong', th: 'กมลา สุรินทร์ บางเทา ราไวย์ ฉลอง'
  },
  fabRouteToOffice: {
    ru: 'Маршрут в офис', en: 'Route to office', de: 'Route zum Büro', fr: 'Itinéraire au bureau', es: 'Ruta a la oficina', th: 'เส้นทางไปสำนักงาน'
  },
  deliveryAreasTitle: {
    ru: 'Районы доставки', en: 'Delivery Areas', de: 'Liefergebiete', fr: 'Zones de livraison', es: 'Zonas de entrega', th: 'พื้นที่บริการส่ง'
  },

  // ── FAQ ──
  faqTitle: { ru: 'FAQ', en: 'FAQ', de: 'FAQ', fr: 'FAQ', es: 'FAQ', th: 'คำถามที่พบบ่อย' },
  faq: {
    ru: [
      { q: 'Сколько стоит аренда байка?', a: 'Honda Scoopy от 130 \u0E3F/день, Honda Click от 130 \u0E3F/день, PCX/NMAX от 250 \u0E3F/день. Чем дольше срок — тем дешевле.' },
      { q: 'Какие документы нужны?', a: 'Загранпаспорт и международные права (категория А). Залог от 2000 \u0E3F или копия паспорта.' },
      { q: 'Есть ли страховка?', a: 'Да, базовая страховка включена бесплатно. Защита байка — от 500 ฿ за период до 10 дней (~50 ฿/день при 10 дн.).' },
      { q: 'Безопасно ли ездить?', a: 'Движение левостороннее. Шлем обязателен (штраф 500 \u0E3F). Не превышайте 60 км/ч в городе.' },
      { q: 'Сколько стоит бензин?', a: '~43 \u0E3F/литр. Расход скутера — 2 л/100 км. Маршрут 50 км обойдётся в ~45 \u0E3F бензина.' },
      { q: 'Как пользоваться планировщиком?', a: 'Откройте вкладку «Маршруты», добавьте места, получите расчёт км, времени и бензина.' },
      { q: 'Нужны ли права для аренды скутера на Пхукете?', a: 'Формально полиция требует международные права категории А. На практике для скутеров до 125 cc проверяют редко, но при ДТП отсутствие прав усложняет страховой случай. Рекомендуем оформить МВУ заранее.' },
      { q: 'Можно ли арендовать байк в Патонге?', a: 'Да, мы доставляем байки в Патонг бесплатно от 3 дней аренды. Привезём прямо к отелю или вилле — звоните или пишите в WhatsApp.' },
      { q: 'Сколько стоит аренда байка на месяц на Пхукете?', a: 'Honda Scoopy — 3 900 \u0E3F/мес (130 \u0E3F/день), Honda Click — 3 900 \u0E3F/мес, PCX/NMAX — 7 500 \u0E3F/мес, Forza 350 — 16 500 \u0E3F/мес. Чем дольше срок — тем выгоднее.' },
      { q: 'Какой байк выбрать новичку?', a: 'Honda Scoopy или Yamaha Fino — лёгкие (96–99 кг), низкое сиденье, простое управление. Для уверенных — Honda Click 125i: чуть мощнее, но всё ещё комфортный.' }
    ],
    en: [
      { q: 'How much does it cost to rent a bike?', a: 'Honda Scoopy from 130 \u0E3F/day, Honda Click from 130 \u0E3F/day, PCX/NMAX from 250 \u0E3F/day. Longer rental = lower price.' },
      { q: 'What documents do I need?', a: 'Passport and international driving permit (category A). Deposit from 2000 \u0E3F or passport copy.' },
      { q: 'Is there insurance?', a: 'Yes, basic insurance is included free. Bike Protection — from 500 ฿ per period up to 10 days (~50 ฿/day for 10 days).' },
      { q: 'Is it safe to ride?', a: 'Left-hand traffic. Helmet is mandatory (500 \u0E3F fine). Don\'t exceed 60 km/h in town.' },
      { q: 'How much is fuel?', a: '~43 \u0E3F/liter. Scooter uses ~2 L/100 km. A 50 km trip costs ~45 \u0E3F in fuel.' },
      { q: 'How to use the route planner?', a: 'Open the Routes tab, add places, get distance, time, and fuel estimates.' },
      { q: 'Do I need a license to rent a scooter in Phuket?', a: 'Officially, police require an international driving permit (category A). For scooters under 125cc checks are rare, but without a license insurance claims get complicated. We recommend getting an IDP before your trip.' },
      { q: 'Can I rent a bike in Patong?', a: 'Yes, we deliver bikes to Patong for free from 3+ days rental. Right to your hotel or villa — call or message us on WhatsApp.' },
      { q: 'How much is a monthly bike rental in Phuket?', a: 'Honda Scoopy — 3,900 \u0E3F/mo (130 \u0E3F/day), Honda Click — 3,900 \u0E3F/mo, PCX/NMAX — 7,500 \u0E3F/mo, Forza 350 — 16,500 \u0E3F/mo. Longer term = better price.' },
      { q: 'Which bike is best for beginners?', a: 'Honda Scoopy or Yamaha Fino — lightweight (96–99 kg), low seat, easy handling. For more confident riders — Honda Click 125i: a bit more power but still comfortable.' }
    ],
    de: [
      { q: 'Was kostet die Miete?', a: 'Honda Scoopy ab 130 \u0E3F/Tag, Honda Click ab 130 \u0E3F/Tag, PCX/NMAX ab 250 \u0E3F/Tag. Längere Miete = günstigerer Preis.' },
      { q: 'Welche Dokumente brauche ich?', a: 'Reisepass und internationaler Führerschein (Klasse A). Kaution ab 2000 \u0E3F oder Passkopie.' },
      { q: 'Gibt es eine Versicherung?', a: 'Ja, die Basisversicherung ist kostenlos inklusive. Bike-Schutz — ab 500 ฿ pro Zeitraum bis 10 Tage (~50 ฿/Tag bei 10 Tagen).' },
      { q: 'Ist es sicher zu fahren?', a: 'Linksverkehr. Helm ist Pflicht (500 \u0E3F Strafe). Nicht über 60 km/h in der Stadt.' },
      { q: 'Was kostet Benzin?', a: '~43 \u0E3F/Liter. Roller verbraucht ~2 L/100 km. Eine 50-km-Fahrt kostet ~45 \u0E3F Benzin.' },
      { q: 'Wie nutze ich den Routenplaner?', a: 'Öffne den Tab Routen, füge Orte hinzu, erhalte Entfernung, Zeit und Benzinkosten.' },
      { q: 'Brauche ich einen Führerschein für einen Roller auf Phuket?', a: 'Offiziell verlangt die Polizei einen internationalen Führerschein (Klasse A). Bei Rollern unter 125cc wird selten kontrolliert, aber ohne Führerschein wird der Versicherungsfall kompliziert. Wir empfehlen, den IDP vorab zu beantragen.' },
      { q: 'Kann ich ein Bike in Patong mieten?', a: 'Ja, wir liefern Bikes kostenlos nach Patong ab 3 Tagen Miete. Direkt zu Ihrem Hotel oder Villa — rufen Sie an oder schreiben Sie uns auf WhatsApp.' },
      { q: 'Was kostet eine monatliche Bike-Miete auf Phuket?', a: 'Honda Scoopy — 3.900 \u0E3F/Monat (130 \u0E3F/Tag), Honda Click — 3.900 \u0E3F/Monat, PCX/NMAX — 7.500 \u0E3F/Monat, Forza 350 — 16.500 \u0E3F/Monat.' },
      { q: 'Welches Bike ist für Anfänger am besten?', a: 'Honda Scoopy oder Yamaha Fino — leicht (96–99 kg), niedriger Sitz, einfache Handhabung. Für sicherere Fahrer — Honda Click 125i.' }
    ],
    fr: [
      { q: 'Combien coûte la location ?', a: 'Honda Scoopy dès 130 \u0E3F/jour, Honda Click dès 130 \u0E3F/jour, PCX/NMAX dès 250 \u0E3F/jour. Plus longue la location, plus bas le prix.' },
      { q: 'Quels documents faut-il ?', a: 'Passeport et permis international (catégorie A). Caution à partir de 2000 \u0E3F ou copie de passeport.' },
      { q: 'Y a-t-il une assurance ?', a: 'Oui, l\'assurance de base est incluse gratuitement. Protection moto — à partir de 500 ฿ par période de 10 jours (~50 ฿/jour pour 10 jours).' },
      { q: 'Est-ce sûr de conduire ?', a: 'Conduite à gauche. Le casque est obligatoire (amende de 500 \u0E3F). Ne dépassez pas 60 km/h en ville.' },
      { q: 'Combien coûte l\'essence ?', a: '~43 \u0E3F/litre. Un scooter consomme ~2 L/100 km. Un trajet de 50 km coûte ~45 \u0E3F.' },
      { q: 'Comment utiliser le planificateur ?', a: 'Ouvrez l\'onglet Itinéraires, ajoutez des lieux, obtenez distance, temps et coût carburant.' },
      { q: 'Faut-il un permis pour louer un scooter à Phuket ?', a: 'Officiellement la police exige un permis international (catégorie A). Pour les scooters de moins de 125cc les contrôles sont rares, mais sans permis l\'assurance se complique. Nous recommandons d\'obtenir un PCI avant le voyage.' },
      { q: 'Peut-on louer un scooter à Patong ?', a: 'Oui, nous livrons gratuitement à Patong à partir de 3 jours. Directement à votre hôtel ou villa — appelez ou écrivez sur WhatsApp.' },
      { q: 'Combien coûte la location mensuelle à Phuket ?', a: 'Honda Scoopy — 3 900 \u0E3F/mois (130 \u0E3F/jour), Honda Click — 3 900 \u0E3F/mois, PCX/NMAX — 7 500 \u0E3F/mois, Forza 350 — 16 500 \u0E3F/mois.' },
      { q: 'Quel scooter pour un débutant ?', a: 'Honda Scoopy ou Yamaha Fino — légers (96–99 kg), selle basse, maniement facile. Pour les plus confiants — Honda Click 125i.' }
    ],
    es: [
      { q: '¿Cuánto cuesta alquilar una moto?', a: 'Honda Scoopy desde 130 \u0E3F/día, Honda Click desde 130 \u0E3F/día, PCX/NMAX desde 250 \u0E3F/día. Más días = precio más bajo.' },
      { q: '¿Qué documentos necesito?', a: 'Pasaporte y permiso internacional (categoría A). Depósito desde 2000 \u0E3F o copia de pasaporte.' },
      { q: '¿Hay seguro?', a: 'Sí, el seguro básico está incluido gratis. Protección de moto — desde 500 ฿ por período de 10 días (~50 ฿/día por 10 días).' },
      { q: '¿Es seguro conducir?', a: 'Tráfico por la izquierda. Casco obligatorio (multa de 500 \u0E3F). No superar 60 km/h en ciudad.' },
      { q: '¿Cuánto cuesta la gasolina?', a: '~43 \u0E3F/litro. Un scooter consume ~2 L/100 km. Un viaje de 50 km cuesta ~45 \u0E3F.' },
      { q: '¿Cómo usar el planificador de rutas?', a: 'Abre la pestaña Rutas, añade lugares y obtén distancia, tiempo y coste de combustible.' },
      { q: '¿Necesito licencia para alquilar un scooter en Phuket?', a: 'Oficialmente la policía exige permiso internacional (categoría A). Para scooters de menos de 125cc los controles son raros, pero sin licencia el seguro se complica. Recomendamos obtener el PIC antes del viaje.' },
      { q: '¿Puedo alquilar una moto en Patong?', a: 'Sí, entregamos motos en Patong gratis desde 3 días de alquiler. Directamente a tu hotel o villa — llama o escríbenos por WhatsApp.' },
      { q: '¿Cuánto cuesta alquilar una moto por mes en Phuket?', a: 'Honda Scoopy — 3.900 \u0E3F/mes (130 \u0E3F/día), Honda Click — 3.900 \u0E3F/mes, PCX/NMAX — 7.500 \u0E3F/mes, Forza 350 — 16.500 \u0E3F/mes.' },
      { q: '¿Qué moto es mejor para principiantes?', a: 'Honda Scoopy o Yamaha Fino — ligeras (96–99 kg), asiento bajo, manejo fácil. Para más confiados — Honda Click 125i.' }
    ],
    th: [
      { q: 'เช่ามอเตอร์ไซค์ราคาเท่าไหร่?', a: 'Honda Scoopy ตั้งแต่ 130 ฿/วัน, Honda Click ตั้งแต่ 130 ฿/วัน, PCX/NMAX ตั้งแต่ 250 ฿/วัน ยิ่งเช่านานยิ่งถูก' },
      { q: 'ต้องใช้เอกสารอะไรบ้าง?', a: 'พาสปอร์ตและใบขับขี่สากล (ประเภท A) มัดจำตั้งแต่ 2000 ฿ หรือสำเนาพาสปอร์ต' },
      { q: 'มีประกันไหม?', a: 'มี ประกันพื้นฐานรวมฟรี การป้องกันรถ — ตั้งแต่ 500 ฿ ต่อช่วง 10 วัน (~50 ฿/วัน สำหรับ 10 วัน)' },
      { q: 'ขับขี่ปลอดภัยไหม?', a: 'ขับซ้าย หมวกกันน็อคบังคับ (ปรับ 500 ฿) ห้ามเกิน 60 กม./ชม. ในเมือง' },
      { q: 'น้ำมันราคาเท่าไหร่?', a: '~43 ฿/ลิตร สกู๊ตเตอร์ใช้ ~2 ลิตร/100 กม. เดินทาง 50 กม. ใช้น้ำมัน ~45 ฿' },
      { q: 'ใช้แผนเส้นทางอย่างไร?', a: 'เปิดแท็บเส้นทาง เพิ่มสถานที่ ดูระยะทาง เวลา และค่าน้ำมัน' },
      { q: 'ต้องมีใบขับขี่เช่าสกู๊ตเตอร์ภูเก็ตไหม?', a: 'ตำรวจต้องการใบขับขี่สากล (ประเภท A) อย่างเป็นทางการ สกู๊ตเตอร์ต่ำกว่า 125cc ตรวจไม่บ่อย แต่ไม่มีใบขับขี่ประกันจะยุ่งยาก แนะนำทำ IDP ก่อนเดินทาง' },
      { q: 'เช่ามอเตอร์ไซค์ที่ป่าตองได้ไหม?', a: 'ได้ เราส่งรถถึงป่าตองฟรีตั้งแต่ 3 วัน ส่งถึงโรงแรมหรือวิลล่า โทรหรือส่งข้อความ WhatsApp' },
      { q: 'เช่ามอเตอร์ไซค์รายเดือนภูเก็ตราคาเท่าไหร่?', a: 'Honda Scoopy — 3,900 ฿/เดือน (130 ฿/วัน), Honda Click — 3,900 ฿/เดือน, PCX/NMAX — 7,500 ฿/เดือน, Forza 350 — 16,500 ฿/เดือน' },
      { q: 'มือใหม่ควรเลือกรถรุ่นไหน?', a: 'Honda Scoopy หรือ Yamaha Fino — เบา (96–99 กก.) เบาะต่ำ ขับง่าย สำหรับผู้มั่นใจ — Honda Click 125i' }
    ]
  },

  contactsFooter: {
    ru: 'ThaiGo Rent — аренда байков на Пхукете. Офис в Кате.',
    en: 'ThaiGo Rent — bike rental in Phuket. Office in Kata.',
    de: 'ThaiGo Rent — Motorrad-Verleih auf Phuket. Büro in Kata.',
    fr: 'ThaiGo Rent — location de motos à Phuket. Bureau à Kata.',
    es: 'ThaiGo Rent — alquiler de motos en Phuket. Oficina en Kata.',
    th: 'ThaiGo Rent — เช่ามอเตอร์ไซค์ภูเก็ต สำนักงานที่กะตะ'
  },

  // ── Booking sheet ──
  sheetTariffs: {
    ru: 'Тарифы', en: 'Rates', de: 'Tarife', fr: 'Tarifs', es: 'Tarifas', th: 'อัตราค่าเช่า'
  },
  sheetDays12: {
    ru: '1–2 дн', en: '1–2 d', de: '1–2 T', fr: '1–2 j', es: '1–2 d', th: '1–2 วัน'
  },
  sheetDays36: {
    ru: '3–6 дн', en: '3–6 d', de: '3–6 T', fr: '3–6 j', es: '3–6 d', th: '3–6 วัน'
  },
  sheetDays719: {
    ru: '7–19 дн', en: '7–19 d', de: '7–19 T', fr: '7–19 j', es: '7–19 d', th: '7–19 วัน'
  },
  sheetDays2030: {
    ru: '20–30 дн', en: '20–30 d', de: '20–30 T', fr: '20–30 j', es: '20–30 d', th: '20–30 วัน'
  },
  sheetRentalDays: {
    ru: 'Дней аренды:', en: 'Rental days:', de: 'Miettage:', fr: 'Jours de location :', es: 'Días de alquiler:', th: 'จำนวนวันเช่า:'
  },
  sheetTotal: {
    ru: 'Итого:', en: 'Total:', de: 'Gesamt:', fr: 'Total :', es: 'Total:', th: 'รวม:'
  },
  sheetSave: {
    ru: 'экономия', en: 'you save', de: 'Ersparnis', fr: 'économie', es: 'ahorro', th: 'ประหยัด'
  },

  // ── Insurance ──
  insBasic: {
    ru: 'Страховка', en: 'Insurance', de: 'Versicherung', fr: 'Assurance', es: 'Seguro', th: 'ประกัน'
  },
  insPlus: {
    ru: '\u{1F6E1} Защита байка', en: '\u{1F6E1} Bike Protection', de: '\u{1F6E1} Bike-Schutz', fr: '\u{1F6E1} Protection moto', es: '\u{1F6E1} Protección de moto', th: '\u{1F6E1} การป้องกันรถ'
  },
  insBasicTitle: {
    ru: 'Страховка (включена)', en: 'Insurance (included)', de: 'Versicherung (inkl.)', fr: 'Assurance (incluse)', es: 'Seguro (incluido)', th: 'ประกัน (รวมอยู่แล้ว)'
  },
  insBasicDesc: {
    ru: 'Здоровье водителя и пассажира. Покрытие до 30 000 ฿ на госпитализацию. Включена бесплатно.',
    en: 'Rider and passenger health coverage. Up to 30,000 ฿ hospitalization. Included free.',
    de: 'Fahrer- und Beifahrerschutz. Bis zu 30.000 ฿ Krankenhauskosten. Kostenlos inklusive.',
    fr: 'Santé du conducteur et passager. Jusqu\'à 30 000 ฿ d\'hospitalisation. Incluse gratuitement.',
    es: 'Salud del conductor y pasajero. Hasta 30.000 ฿ de hospitalización. Incluido gratis.',
    th: 'คุ้มครองสุขภาพผู้ขับและผู้โดยสาร สูงสุด 30,000 ฿ ค่ารักษาพยาบาล รวมฟรี'
  },
  insPlusTitle: {
    ru: 'Страховка+ (расширенная)', en: 'Insurance+ (extended)', de: 'Versicherung+ (erweitert)', fr: 'Assurance+ (étendue)', es: 'Seguro+ (extendido)', th: 'ประกัน+ (ขยาย)'
  },
  insPlusDesc: {
    ru: 'Не платишь за случайные царапины. Франшиза 3 000 ฿.',
    en: 'No paying for accidental scratches. Deductible 3,000 ฿.',
    de: 'Keine Zahlung für versehentliche Kratzer. Selbstbeteiligung 3.000 ฿.',
    fr: 'Pas de frais pour les rayures accidentelles. Franchise 3 000 ฿.',
    es: 'Sin pagar por arañazos accidentales. Franquicia 3.000 ฿.',
    th: 'ไม่ต้องจ่ายค่ารอยขีดข่วน แฟรนไชส์ 3,000 ฿'
  },
  insPlusExclude: {
    ru: 'Не покрывает: шины, аккумулятор, ДТП по вине третьих лиц',
    en: 'Does not cover: tires, battery, accidents caused by third parties',
    de: 'Nicht abgedeckt: Reifen, Batterie, Unfälle durch Dritte',
    fr: 'Non couvert : pneus, batterie, accidents causés par des tiers',
    es: 'No cubre: neumáticos, batería, accidentes causados por terceros',
    th: 'ไม่ครอบคลุม: ยาง แบตเตอรี่ อุบัติเหตุจากบุคคลที่สาม'
  },
  insPlusCall: {
    ru: 'При страховом случае: позвоните нам сразу — не покидайте место инцидента',
    en: 'In case of incident: call us immediately — do not leave the scene',
    de: 'Im Schadensfall: rufen Sie uns sofort an — verlassen Sie nicht den Unfallort',
    fr: 'En cas d\'incident : appelez-nous immédiatement — ne quittez pas les lieux',
    es: 'En caso de incidente: llámenos de inmediato — no abandone el lugar',
    th: 'กรณีเกิดเหตุ: โทรหาเราทันที — อย่าออกจากที่เกิดเหตุ'
  },
  insPlusPhoto: {
    ru: 'Отправьте фото байка с четырёх сторон и снимите видео инцидента',
    en: 'Send photos of the bike from four sides and record a video of the incident',
    de: 'Senden Sie Fotos des Bikes von vier Seiten und nehmen Sie ein Video des Vorfalls auf',
    fr: 'Envoyez des photos du véhicule de quatre côtés et filmez l\'incident',
    es: 'Envíe fotos de la moto desde cuatro lados y grabe un video del incidente',
    th: 'ส่งรูปรถจากสี่ด้านและถ่ายวิดีโอเหตุการณ์'
  },
  insPlusPrice: {
    ru: 'Оценка ущерба по утверждённому прайс-листу',
    en: 'Damage assessment based on the approved price list',
    de: 'Schadensbewertung gemäß genehmigter Preisliste',
    fr: 'Évaluation des dommages selon le tarif approuvé',
    es: 'Evaluación de daños según la lista de precios aprobada',
    th: 'ประเมินความเสียหายตามรายการราคาที่อนุมัติ'
  },
  insPlusPriceLabel: {
    ru: 'Стоимость:', en: 'Cost:', de: 'Kosten:', fr: 'Coût :', es: 'Coste:', th: 'ราคา:'
  },

  // ── Booking WA message ──
  waMsgBike: {
    ru: 'Хочу арендовать ${name}${dates} (${days} дн.), ${total} ฿',
    en: 'I want to rent ${name}${dates} (${days} days), ${total} ฿',
    de: 'Ich möchte ${name}${dates} (${days} Tage), ${total} ฿ mieten',
    fr: 'Je voudrais louer ${name}${dates} (${days} jours), ${total} ฿',
    es: 'Quiero alquilar ${name}${dates} (${days} días), ${total} ฿',
    th: 'ต้องการเช่า ${name}${dates} (${days} วัน), ${total} ฿'
  },
  waMsgGeneral: {
    ru: 'Привет! Хочу арендовать байк на Пхукете',
    en: 'Hi! I want to rent a bike in Phuket',
    de: 'Hallo! Ich möchte ein Bike auf Phuket mieten',
    fr: 'Bonjour ! Je voudrais louer un scooter à Phuket',
    es: '¡Hola! Quiero alquilar una moto en Phuket',
    th: 'สวัสดีครับ ต้องการเช่ามอเตอร์ไซค์ที่ภูเก็ต'
  },
  waMsgRoute: {
    ru: 'Хочу арендовать байк для маршрута: ${route} (~${km} км)',
    en: 'I want to rent a bike for route: ${route} (~${km} km)',
    de: 'Ich möchte ein Bike für die Route mieten: ${route} (~${km} km)',
    fr: 'Je voudrais louer un scooter pour l\'itinéraire : ${route} (~${km} km)',
    es: 'Quiero alquilar una moto para la ruta: ${route} (~${km} km)',
    th: 'ต้องการเช่ามอเตอร์ไซค์สำหรับเส้นทาง: ${route} (~${km} กม.)'
  },

  // ── Price prefix ──
  priceFrom: {
    ru: 'от', en: 'from', de: 'ab', fr: 'dès', es: 'desde', th: 'ตั้งแต่'
  },
  perDay: {
    ru: '/день', en: '/day', de: '/Tag', fr: '/jour', es: '/día', th: '/วัน'
  },

  // ── Guide micro-menu ──
  guideMenuRoutes: {
    ru: 'Маршруты', en: 'Routes', de: 'Routen', fr: 'Itinéraires', es: 'Rutas', th: 'เส้นทาง'
  },
  guideMenuRiderTest: {
    ru: 'Райдер-тест', en: 'Rider Test', de: 'Rider-Test', fr: 'Test Rider', es: 'Test Rider', th: 'แบบทดสอบนักขับ'
  },

  // ── Teaser card ──
  teaserTitle: {
    ru: 'Ты уверен что готов ездить на Пхукете?',
    en: 'Are you sure you\'re ready to ride in Phuket?',
    de: 'Bist du sicher, dass du auf Phuket fahren kannst?',
    fr: 'Es-tu sûr d\'être prêt à rouler à Phuket ?',
    es: '¿Estás seguro de que estás listo para conducir en Phuket?',
    th: 'พร้อมขับขี่ที่ภูเก็ตหรือยัง?'
  },
  teaserSub: {
    ru: 'Пройди Райдер-тест за 3 минуты',
    en: 'Take the Rider Test in 3 minutes',
    de: 'Mache den Rider-Test in 3 Minuten',
    fr: 'Fais le Test Rider en 3 minutes',
    es: 'Haz el Test Rider en 3 minutos',
    th: 'ทำแบบทดสอบนักขับใน 3 นาที'
  },
  teaserBtn: {
    ru: 'Начать тест', en: 'Start test', de: 'Test starten', fr: 'Commencer le test', es: 'Iniciar test', th: 'เริ่มทดสอบ'
  },

  // ── Rider Test UI ──
  riderTestTitle: {
    ru: 'Райдер-тест', en: 'Rider Test', de: 'Rider-Test', fr: 'Test Rider', es: 'Test Rider', th: 'แบบทดสอบนักขับ'
  },
  riderNext: {
    ru: 'Дальше →', en: 'Next →', de: 'Weiter →', fr: 'Suivant →', es: 'Siguiente →', th: 'ถัดไป →'
  },
  resumeTitle: {
    ru: 'Продолжить тест?', en: 'Continue test?', de: 'Test fortsetzen?', fr: 'Continuer le test ?', es: '¿Continuar el test?', th: 'ทำต่อไหม?'
  },
  resumeText: {
    ru: 'Ты остановился на вопросе ${n} из ${total}',
    en: 'You stopped at question ${n} of ${total}',
    de: 'Du warst bei Frage ${n} von ${total}',
    fr: 'Tu t\'es arrêté à la question ${n} sur ${total}',
    es: 'Te detuviste en la pregunta ${n} de ${total}',
    th: 'คุณหยุดที่คำถาม ${n} จาก ${total}'
  },
  resumeContinue: {
    ru: 'Продолжить', en: 'Continue', de: 'Fortsetzen', fr: 'Continuer', es: 'Continuar', th: 'ทำต่อ'
  },
  resumeRestart: {
    ru: 'Сначала', en: 'Restart', de: 'Neustart', fr: 'Recommencer', es: 'Reiniciar', th: 'เริ่มใหม่'
  },
  finalTitle: {
    ru: 'Ты готов к Пхукету!',
    en: 'You\'re ready for Phuket!',
    de: 'Du bist bereit für Phuket!',
    fr: 'Tu es prêt pour Phuket !',
    es: '¡Estás listo para Phuket!',
    th: 'คุณพร้อมสำหรับภูเก็ตแล้ว!'
  },
  finalText: {
    ru: 'Теперь ты знаешь то что большинство туристов узнают только после неприятной ситуации. Езди спокойно — мы всегда на связи если что-то пойдёт не так.',
    en: 'Now you know what most tourists only learn after an unpleasant situation. Ride safe — we\'re always in touch if something goes wrong.',
    de: 'Jetzt weißt du, was die meisten Touristen erst nach einer unangenehmen Situation lernen. Fahre sicher — wir sind immer erreichbar, wenn etwas schiefgeht.',
    fr: 'Maintenant tu sais ce que la plupart des touristes n\'apprennent qu\'après une mésaventure. Roule tranquille — on est toujours joignables si ça tourne mal.',
    es: 'Ahora sabes lo que la mayoría de turistas solo aprenden después de una situación desagradable. Conduce seguro — siempre estamos disponibles si algo sale mal.',
    th: 'ตอนนี้คุณรู้สิ่งที่นักท่องเที่ยวส่วนใหญ่เรียนรู้หลังจากเกิดเหตุแล้ว ขับปลอดภัย — เราพร้อมช่วยเสมอหากมีปัญหา'
  },
  finalBtn: {
    ru: 'Выбрать байк 🛵', en: 'Choose a bike 🛵', de: 'Bike wählen 🛵', fr: 'Choisir une moto 🛵', es: 'Elegir una moto 🛵', th: 'เลือกรถ 🛵'
  },
  finalShare: {
    ru: 'Поделиться результатом', en: 'Share result', de: 'Ergebnis teilen', fr: 'Partager le résultat', es: 'Compartir resultado', th: 'แชร์ผลลัพธ์'
  },
  shareTitle: {
    ru: 'Райдер-тест', en: 'Rider Test', de: 'Rider-Test', fr: 'Test Rider', es: 'Test Rider', th: 'แบบทดสอบนักขับ'
  },
  shareText: {
    ru: 'Я прошёл Райдер-тест на Пхукете! А ты готов к острову? 🛵 thaigo.rent',
    en: 'I passed the Rider Test in Phuket! Are you ready for the island? 🛵 thaigo.rent',
    de: 'Ich habe den Rider-Test auf Phuket bestanden! Bist du bereit für die Insel? 🛵 thaigo.rent',
    fr: 'J\'ai réussi le Test Rider à Phuket ! Es-tu prêt pour l\'île ? 🛵 thaigo.rent',
    es: '¡Pasé el Test Rider en Phuket! ¿Estás listo para la isla? 🛵 thaigo.rent',
    th: 'ฉันผ่านแบบทดสอบนักขับที่ภูเก็ตแล้ว! คุณพร้อมหรือยัง? 🛵 thaigo.rent'
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
    },
    th: {
      text: 'ส่งรถถึงโรงแรม แดดออก ทะเลรอ ผู้จัดการยื่นกุญแจ คุณทำอะไรก่อน?',
      answers: [
        'เซ็นสัญญาแล้วไปเลย',
        'ถ่ายวิดีโอรอบรถ — รอยขีดข่วนทั้งหมดก่อนออกเดินทาง',
        'ตรวจเบรกและกระจก'
      ],
      explanation: 'เราถ่ายวิดีโอทุกครั้งที่ส่งรถ — แนะนำให้คุณทำเหมือนกัน 30 วินาทีด้วยโทรศัพท์ ไม่มีข้อพิพาทตอนคืนรถ ทุกคนแฮปปี้ 🤝'
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
    },
    th: {
      text: 'ฝนเพิ่งตก ถนนลื่น ข้างหน้าโค้งลงเนิน รถข้างหลังบีบแตร คุณทำอะไร?',
      answers: [
        'เร่งเครื่อง — ไม่อยากขวางทาง',
        'เบรกแรงก่อนโค้ง',
        'ชะลอล่วงหน้า เข้าโค้งนุ่มนวล — ให้เขาแซง'
      ],
      explanation: 'ถนนเปียกหลังฝนเป็นสาเหตุหลักที่นักท่องเที่ยวล้มที่ภูเก็ต โดยเฉพาะนาทีแรกที่น้ำมันยังไม่ถูกล้างออก ช้า = ถึงที่หมาย 🙏'
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
    },
    th: {
      text: 'ขับไปจุดชมวิวตอนพระอาทิตย์ตก ถนนแคบชัน รถสวนมา คุณอยู่ทางไหน?',
      answers: [
        'ชิดขวา — ห่างจากขอบ',
        'อยู่กลาง — มองเห็นชัดกว่า',
        'ชิดซ้าย — เลนของฉันในการขับซ้าย'
      ],
      explanation: 'ไทยขับซ้าย เลนของคุณคือซ้าย บนถนนภูเขาสิ่งนี้สำคัญมาก ลงเนินเบรกด้วยเครื่องยนต์ ไม่ใช่มือเบรก 🏔️'
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
    },
    th: {
      text: 'ค่ำสนุกที่ป่าตอง ดื่มค็อกเทลไปหลายแก้ว ถึงโรงแรม 15 นาทีถนนคุ้นเคย คุณทำอะไร?',
      answers: [
        'ขับไป — ฉันปกติ ถนนว่าง',
        'ขับช้าๆ อย่างระมัดระวัง',
        'เรียก Grab หรือตุ๊กตุ๊ก เอารถเช้า'
      ],
      explanation: 'ไทยมีขีดจำกัดแอลกอฮอล์ แต่ถ้าเกิดอุบัติเหตุขณะดื่ม — ประกันไม่คุ้มครองเลย Grab 100 บาท นอนหลับสบายหาค่าไม่ได้ 😴'
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
    },
    th: {
      text: 'ทางเข้าป่าตอง ตำรวจโบกไม้ คุณไม่ได้ทำผิดอะไร คุณทำอย่างไร?',
      answers: [
        'จอดและอธิบายว่าฉันไม่ผิด',
        'จอด ยิ้ม แสดงเอกสารอย่างสงบ',
        'ทำเป็นไม่เห็น'
      ],
      explanation: 'กฎทองของไทย: รอยยิ้มแก้ทุกอย่าง สวัสดีครับ — บรรยากาศเปลี่ยนทันที คนไทยไม่เข้าใจการทะเลาะ — ถ้าเถียง จะแย่กว่าแม้คุณจะถูก 😊'
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
    },
    th: {
      text: 'ตุ๊กตุ๊กปาดหน้า คุณล้ม คนขับพูดภาษาไทย คุณทำอะไรก่อน?',
      answers: [
        'พูด sorry — สุภาพดี',
        'อธิบายว่าผิดที่ตุ๊กตุ๊ก',
        'ไม่พูดอะไร โทรหาร้านเช่าทันที'
      ],
      explanation: 'เราเป็นเพื่อนที่ดีที่สุดของคุณในสถานการณ์นี้ โทรหาเราก่อน — ก่อนตำรวจ ก่อนพูดคุยใดๆ เราพูดไทยและรู้วิธีจัดการ 🤙 sorry ในไทย = รับผิดทางกฎหมาย'
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
    },
    th: {
      text: 'เห็นที่จอดสะดวกริมทาง ขอบทางแดงขาว คุณทำอะไร?',
      answers: [
        'จอด — รถเล็ก ไม่เกะกะ',
        'จอดแป๊บเดียว วิ่งไปเร็วๆ',
        'หาที่จอดขอบทางขาวหรือที่จอดรถปกติ'
      ],
      explanation: 'ขอบทางแดงขาว — จะล็อกล้อด้วยเหล็ก เกิดขึ้นจริงทุกวัน อย่าพยายามถอดเอง — ตำรวจบันทึกทุกอย่าง ขอบทางขาว — จอดได้ แดงขาว — ไปต่อ 🔒'
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
    },
    th: {
      text: 'ขับรถอยู่ มี IQOS ในกระเป๋า ถูกตรวจตามปกติ เกิดอะไรขึ้น?',
      answers: [
        'ไม่เป็นไร — ของส่วนตัว',
        'ปรับเล็กน้อย จ่ายแล้วไป',
        'ปัญหาใหญ่ — ในไทยนี่เป็นความผิดอาญา'
      ],
      explanation: 'IQOS, บุหรี่ไฟฟ้า, vape — ในไทยไม่ใช่แค่ปรับแต่เป็นความผิดอาญา ตอนตรวจรถจะหาโดยเฉพาะ รู้ไว้ก่อนออกเดินทาง 🙏'
    }
  }
};

// Bike feature translations
export const FEATURE_TR = {
  'ABS нет':  { en: 'No ABS', de: 'Kein ABS', fr: 'Pas d\'ABS', es: 'Sin ABS', th: 'ไม่มี ABS' },
  'ABS':      { en: 'ABS', de: 'ABS', fr: 'ABS', es: 'ABS', th: 'ABS' },
  'Вариатор': { en: 'CVT', de: 'CVT', fr: 'CVT', es: 'CVT', th: 'CVT' },
  'Большой багажник': { en: 'Large trunk', de: 'Großer Kofferraum', fr: 'Grand coffre', es: 'Maletero grande', th: 'กระโปรงใหญ่' },
  'Внедорожный стиль': { en: 'Off-road style', de: 'Offroad-Stil', fr: 'Style tout-terrain', es: 'Estilo off-road', th: 'สไตล์ออฟโรด' },
  'Спортбайк': { en: 'Sport bike', de: 'Sportbike', fr: 'Sportive', es: 'Deportiva', th: 'สปอร์ตไบค์' },
  'Нейкед':    { en: 'Naked', de: 'Naked', fr: 'Naked', es: 'Naked', th: 'Naked' },
  'Круизер':   { en: 'Cruiser', de: 'Cruiser', fr: 'Cruiser', es: 'Cruiser', th: 'ครูเซอร์' },
  'Круиз':     { en: 'Cruise control', de: 'Tempomat', fr: 'Régulateur', es: 'Control crucero', th: 'ครูซคอนโทรล' },
  'Низкая посадка': { en: 'Low seat', de: 'Niedrige Sitzposition', fr: 'Selle basse', es: 'Asiento bajo', th: 'เบาะต่ำ' },
  'Электро-экран':  { en: 'Electric screen', de: 'Elektro-Windschild', fr: 'Pare-brise électrique', es: 'Pantalla eléctrica', th: 'กระจกไฟฟ้า' },
  'Автомат':   { en: 'Automatic', de: 'Automatik', fr: 'Automatique', es: 'Automático', th: 'ออโต้' },
  'Кондиционер': { en: 'Air conditioning', de: 'Klimaanlage', fr: 'Climatisation', es: 'Aire acondicionado', th: 'แอร์' },
  '5 мест':    { en: '5 seats', de: '5 Sitze', fr: '5 places', es: '5 asientos', th: '5 ที่นั่ง' },
  '6 МКПП':    { en: '6-speed manual', de: '6-Gang Schaltung', fr: '6 vitesses', es: '6 marchas', th: '6 เกียร์ธรรมดา' },
  'Keyless':   { en: 'Keyless', de: 'Keyless', fr: 'Keyless', es: 'Keyless', th: 'Keyless' },
  'USB зарядка': { en: 'USB charging', de: 'USB-Ladung', fr: 'Charge USB', es: 'Carga USB', th: 'ชาร์จ USB' },
  'Traction Control': { en: 'Traction Control', de: 'Traction Control', fr: 'Traction Control', es: 'Traction Control', th: 'Traction Control' },
  'HSTC':      { en: 'HSTC', de: 'HSTC', fr: 'HSTC', es: 'HSTC', th: 'HSTC' },
  'Ride-by-Wire': { en: 'Ride-by-Wire', de: 'Ride-by-Wire', fr: 'Ride-by-Wire', es: 'Ride-by-Wire', th: 'Ride-by-Wire' },
  'Assist Slipper Clutch': { en: 'Assist Slipper Clutch', de: 'Assist Slipper Clutch', fr: 'Embrayage anti-dribble', es: 'Embrague deslizante', th: 'Assist Slipper Clutch' },
  'Assist & Slipper Clutch': { en: 'Assist & Slipper Clutch', de: 'Assist & Slipper Clutch', fr: 'Embrayage anti-dribble', es: 'Embrague deslizante', th: 'Assist & Slipper Clutch' },
  'Ergo-Fit':  { en: 'Ergo-Fit', de: 'Ergo-Fit', fr: 'Ergo-Fit', es: 'Ergo-Fit', th: 'Ergo-Fit' },
  'TFT дисплей': { en: 'TFT display', de: 'TFT-Display', fr: 'Écran TFT', es: 'Pantalla TFT', th: 'จอ TFT' }
};

// Translate a bike feature string
export function translateFeature(feature, lang) {
  if (lang === 'ru') return feature;
  // Check exact match
  if (FEATURE_TR[feature]) return FEATURE_TR[feature][lang] || feature;
  // Handle weight pattern "~XXX кг"
  const weightMatch = feature.match(/^~(\d+)\s*кг$/);
  if (weightMatch) return lang === 'th' ? `~${weightMatch[1]} กก.` : `~${weightMatch[1]} kg`;
  // Handle fuel pattern "Расход X.X л/100км"
  const fuelMatch = feature.match(/^Расход\s+([\d.]+)\s*л\/100км$/);
  if (fuelMatch) {
    const val = fuelMatch[1];
    const labels = { en: `${val} L/100km`, de: `${val} L/100km`, fr: `${val} L/100km`, es: `${val} L/100km`, th: `${val} ลิตร/100กม.` };
    return labels[lang] || `${val} L/100km`;
  }
  return feature;
}

// Bike category translations
export const BIKE_CAT_TR = {
  all:     { ru: 'Все', en: 'All', de: 'Alle', fr: 'Tout', es: 'Todos', th: 'ทั้งหมด' },
  scooter: { ru: 'Скутеры', en: 'Scooters', de: 'Roller', fr: 'Scooters', es: 'Scooters', th: 'สกู๊ตเตอร์' },
  maxi:    { ru: 'Макси', en: 'Maxi', de: 'Maxi', fr: 'Maxi', es: 'Maxi', th: 'แม็กซี่' },
  moto:    { ru: 'Мотоциклы', en: 'Motorcycles', de: 'Motorräder', fr: 'Motos', es: 'Motocicletas', th: 'มอเตอร์ไซค์' },
  car:     { ru: 'Авто', en: 'Cars', de: 'Autos', fr: 'Voitures', es: 'Coches', th: 'รถยนต์' }
};

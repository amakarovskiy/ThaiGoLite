// ThaiGo Lite — Bike catalog with seasonal pricing & picker scores
// Categories: scooter | maxi | moto (cars removed, new structure)
// prices: { high: [1-2d, 3-7d, 7-19d, 20-30d], shoulder: [...], low: [...] }

export const BIKE_CATEGORIES = {
  all:     'Все',
  scooter: 'Скутеры',
  maxi:    'Макси',
  moto:    'Мотоциклы'
};

export const BIKES = [
  // ── Economy Scooters ──
  {
    id: 'scoopy-110',
    name: 'Honda Scoopy 110',
    cc: 110,
    category: 'scooter',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'economy',
    prices: {
      high:     [400, 350, 300, 250],
      shoulder: [400, 300, 250, 200],
      low:      [400, 300, 200, 130]
    },
    features: ['ABS нет', 'Вариатор', '~99 кг', 'Расход 1.8 л/100км'],
    popular: true,
    tags: ['light', 'cheap', 'girl'],
    why: { ru: 'Лёгкий, простой и самый доступный', en: 'Light, simple and most affordable', de: 'Leicht, einfach und am günstigsten', fr: 'Léger, simple et le plus abordable', es: 'Ligero, simple y el más asequible', th: 'เบา ง่าย และราคาถูกที่สุด' },
    scores: { solo: 3, couple: 1, child: 0, girl: 3, easy: 3, comfort: 1, sport: 0, style: 2, economy: 3, beach: 3, island: 1, mountain: 0, beyond: 0 }
  },
  {
    id: 'click-125',
    name: 'Honda Click 125',
    cc: 125,
    category: 'scooter',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'economy',
    prices: {
      high:     [400, 350, 300, 250],
      shoulder: [400, 300, 250, 200],
      low:      [400, 300, 200, 130]
    },
    features: ['ABS нет', 'Вариатор', '~108 кг', 'Расход 2 л/100км'],
    popular: true,
    tags: ['reliable', 'cheap'],
    why: { ru: 'Народный выбор — надёжный и экономичный', en: 'People\'s choice — reliable and economical', de: 'Volkswahl — zuverlässig und sparsam', fr: 'Choix populaire — fiable et économique', es: 'Elección popular — fiable y económico', th: 'ตัวเลือกยอดนิยม — เชื่อถือได้และประหยัด' },
    scores: { solo: 3, couple: 1, child: 0, girl: 2, easy: 3, comfort: 1, sport: 0, style: 1, economy: 3, beach: 3, island: 2, mountain: 0, beyond: 0 }
  },
  {
    id: 'lead-125',
    name: 'Honda Lead 125',
    cc: 125,
    category: 'scooter',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'economy',
    prices: {
      high:     [500, 450, 400, 300],
      shoulder: [500, 400, 300, 200],
      low:      [400, 300, 200, 130]
    },
    features: ['ABS нет', 'Вариатор', '~114 кг', 'Большой багажник'],
    popular: false,
    tags: ['trunk', 'practical'],
    why: { ru: 'Огромный багажник — идеален для покупок', en: 'Huge trunk — perfect for shopping', de: 'Riesiger Kofferraum — perfekt zum Einkaufen', fr: 'Immense coffre — parfait pour le shopping', es: 'Maletero enorme — perfecto para compras', th: 'กล่องเก็บของขนาดใหญ่ — เหมาะสำหรับช้อปปิ้ง' },
    scores: { solo: 2, couple: 1, child: 1, girl: 2, easy: 3, comfort: 2, sport: 0, style: 1, economy: 3, beach: 3, island: 2, mountain: 0, beyond: 0 }
  },
  {
    id: 'filano',
    name: 'Yamaha Filano',
    cc: 125,
    category: 'scooter',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'economy',
    prices: {
      high:     [500, 450, 400, 300],
      shoulder: [500, 400, 300, 200],
      low:      [500, 350, 250, 200]
    },
    features: ['ABS нет', 'Вариатор', '~96 кг', 'Расход 1.7 л/100км'],
    popular: false,
    tags: ['light', 'stylish', 'girl'],
    why: { ru: 'Стильный ретро-дизайн, очень лёгкий', en: 'Stylish retro design, very light', de: 'Stylisches Retro-Design, sehr leicht', fr: 'Design rétro stylé, très léger', es: 'Diseño retro con estilo, muy ligero', th: 'ดีไซน์เรโทรสวย เบามาก' },
    scores: { solo: 3, couple: 0, child: 0, girl: 3, easy: 3, comfort: 1, sport: 0, style: 3, economy: 2, beach: 3, island: 1, mountain: 0, beyond: 0 }
  },
  {
    id: 'giorno-125',
    name: 'Honda Giorno 125',
    cc: 125,
    category: 'scooter',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'economy',
    prices: {
      high:     [500, 450, 400, 300],
      shoulder: [500, 400, 300, 200],
      low:      [500, 350, 250, 200]
    },
    features: ['ABS нет', 'Вариатор', '~97 кг'],
    popular: false,
    tags: ['cute', 'girl', 'light'],
    why: { ru: 'Милый дизайн, компактный и послушный', en: 'Cute design, compact and obedient', de: 'Süßes Design, kompakt und folgsam', fr: 'Design mignon, compact et docile', es: 'Diseño bonito, compacto y dócil', th: 'ดีไซน์น่ารัก กะทัดรัด ขับง่าย' },
    scores: { solo: 3, couple: 0, child: 0, girl: 3, easy: 3, comfort: 1, sport: 0, style: 3, economy: 2, beach: 3, island: 1, mountain: 0, beyond: 0 }
  },
  {
    id: 'click-160',
    name: 'Honda Click 160',
    cc: 160,
    category: 'scooter',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'economy',
    prices: {
      high:     [500, 450, 400, 300],
      shoulder: [500, 400, 300, 200],
      low:      [500, 350, 250, 200]
    },
    features: ['ABS', 'Вариатор', '~116 кг', 'Расход 2.2 л/100км'],
    popular: true,
    tags: ['reliable', 'versatile'],
    why: { ru: 'Мощнее Click 125, с ABS — универсал', en: 'More powerful than Click 125, with ABS — all-rounder', de: 'Stärker als Click 125, mit ABS — Allrounder', fr: 'Plus puissant que le Click 125, avec ABS — polyvalent', es: 'Más potente que el Click 125, con ABS — todoterreno', th: 'แรงกว่า Click 125 มี ABS — รอบด้าน' },
    scores: { solo: 3, couple: 1, child: 0, girl: 2, easy: 2, comfort: 2, sport: 0, style: 1, economy: 2, beach: 3, island: 2, mountain: 1, beyond: 0 }
  },

  // ── Comfort Scooters ──
  {
    id: 'vespa-primavera',
    name: 'Vespa Primavera 150 ABS',
    cc: 150,
    category: 'scooter',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 450, 450, 350],
      shoulder: [600, 500, 400, 250],
      low:      [600, 500, 300, 250]
    },
    features: ['ABS', 'Вариатор', '~130 кг'],
    popular: false,
    tags: ['stylish', 'girl', 'vespa'],
    why: { ru: 'Икона стиля — итальянская классика', en: 'Style icon — Italian classic', de: 'Stil-Ikone — italienischer Klassiker', fr: 'Icône de style — classique italien', es: 'Ícono de estilo — clásico italiano', th: 'ไอคอนแห่งสไตล์ — คลาสสิกอิตาลี' },
    scores: { solo: 2, couple: 1, child: 0, girl: 3, easy: 2, comfort: 2, sport: 0, style: 3, economy: 1, beach: 3, island: 2, mountain: 0, beyond: 0 }
  },
  {
    id: 'pcx-150',
    name: 'Honda PCX 150',
    cc: 150,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'comfort',
    prices: {
      high:     [500, 450, 400, 300],
      shoulder: [500, 400, 300, 250],
      low:      [500, 350, 200, 150]
    },
    features: ['ABS', 'Вариатор', '~130 кг', 'Keyless'],
    popular: false,
    tags: ['reliable', 'comfortable'],
    why: { ru: 'Проверенный комфорт по разумной цене', en: 'Proven comfort at a reasonable price', de: 'Bewährter Komfort zum fairen Preis', fr: 'Confort éprouvé à prix raisonnable', es: 'Comodidad probada a precio razonable', th: 'ความสะดวกสบายที่คุ้มค่า' },
    scores: { solo: 3, couple: 2, child: 1, girl: 2, easy: 2, comfort: 3, sport: 0, style: 2, economy: 2, beach: 3, island: 3, mountain: 1, beyond: 1 }
  },
  {
    id: 'pcx-160',
    name: 'Honda PCX 160',
    cc: 160,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [600, 500, 400, 250],
      low:      [600, 400, 300, 250]
    },
    features: ['ABS', 'Вариатор', '~132 кг', 'Keyless', 'USB зарядка'],
    popular: true,
    tags: ['bestseller', 'comfortable', 'couple'],
    why: { ru: 'Бестселлер — комфорт для двоих на весь остров', en: 'Bestseller — comfort for two across the island', de: 'Bestseller — Komfort für zwei über die Insel', fr: 'Best-seller — confort à deux sur toute l\'île', es: 'Superventas — comodidad para dos por toda la isla', th: 'ขายดีที่สุด — สะดวกสบายสำหรับสองคนทั่วเกาะ' },
    scores: { solo: 3, couple: 3, child: 2, girl: 2, easy: 2, comfort: 3, sport: 0, style: 2, economy: 1, beach: 3, island: 3, mountain: 1, beyond: 1 }
  },
  {
    id: 'nmax-155',
    name: 'Yamaha Nmax 155',
    cc: 155,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [600, 500, 400, 250],
      low:      [600, 400, 300, 250]
    },
    features: ['ABS', 'Вариатор', '~131 кг', 'Traction Control'],
    popular: true,
    tags: ['comfortable', 'couple', 'traction'],
    why: { ru: 'Конкурент PCX с Traction Control', en: 'PCX rival with Traction Control', de: 'PCX-Rivale mit Traction Control', fr: 'Rival du PCX avec Traction Control', es: 'Rival del PCX con Traction Control', th: 'คู่แข่ง PCX พร้อม Traction Control' },
    scores: { solo: 3, couple: 3, child: 2, girl: 1, easy: 2, comfort: 3, sport: 1, style: 2, economy: 1, beach: 3, island: 3, mountain: 1, beyond: 1 }
  },
  {
    id: 'adv-160',
    name: 'Honda ADV 160 ABS',
    cc: 160,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [600, 500, 400, 250],
      low:      [600, 400, 300, 250]
    },
    features: ['ABS', 'Вариатор', '~133 кг', 'Внедорожный стиль'],
    popular: false,
    tags: ['adventure', 'offroad', 'couple'],
    why: { ru: 'Приключенческий стиль — холмы и грунтовки', en: 'Adventure style — hills and dirt roads', de: 'Adventure-Stil — Hügel und Schotterpisten', fr: 'Style aventure — collines et chemins de terre', es: 'Estilo aventura — colinas y caminos de tierra', th: 'สไตล์ผจญภัย — เนินเขาและถนนลูกรัง' },
    scores: { solo: 3, couple: 2, child: 2, girl: 1, easy: 2, comfort: 3, sport: 1, style: 2, economy: 1, beach: 2, island: 3, mountain: 3, beyond: 2 }
  },

  // ── Premium Scooters ──
  {
    id: 'xmax-300-2022',
    name: 'Yamaha Xmax 300 (2022)',
    cc: 300,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'premium',
    prices: {
      high:     [1100, 800, 700, 600],
      shoulder: [900, 700, 600, 500],
      low:      [800, 700, 500, 450]
    },
    features: ['ABS', 'Вариатор', '~179 кг', 'Traction Control', 'Keyless'],
    popular: false,
    tags: ['powerful', 'touring', 'premium'],
    why: { ru: 'Мощный макси для дальних поездок', en: 'Powerful maxi for long trips', de: 'Starker Maxi für lange Touren', fr: 'Maxi puissant pour les longs trajets', es: 'Maxi potente para viajes largos', th: 'แม็กซี่ทรงพลังสำหรับการเดินทางไกล' },
    scores: { solo: 3, couple: 3, child: 1, girl: 0, easy: 1, comfort: 3, sport: 2, style: 2, economy: 0, beach: 2, island: 3, mountain: 2, beyond: 3 }
  },
  {
    id: 'xmax-300-new',
    name: 'Yamaha Xmax 300 new',
    cc: 300,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'premium',
    prices: {
      high:     [1200, 900, 800, 700],
      shoulder: [1000, 800, 700, 600],
      low:      [900, 800, 600, 550]
    },
    features: ['ABS', 'Вариатор', '~179 кг', 'Traction Control', 'Keyless'],
    popular: false,
    tags: ['powerful', 'touring', 'premium', 'new'],
    why: { ru: 'Новая версия Xmax — топ для путешествий', en: 'New Xmax — top choice for travel', de: 'Neuer Xmax — Top-Wahl für Reisen', fr: 'Nouveau Xmax — choix top pour voyager', es: 'Nuevo Xmax — la mejor opción para viajar', th: 'Xmax ใหม่ — ตัวเลือกอันดับหนึ่งสำหรับการเดินทาง' },
    scores: { solo: 3, couple: 3, child: 1, girl: 0, easy: 1, comfort: 3, sport: 2, style: 3, economy: 0, beach: 2, island: 3, mountain: 2, beyond: 3 }
  },
  {
    id: 'forza-350-black',
    name: 'Honda Forza 350 black',
    cc: 350,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'premium',
    prices: {
      high:     [1200, 900, 800, 700],
      shoulder: [1000, 800, 700, 600],
      low:      [900, 800, 600, 550]
    },
    features: ['ABS', 'Вариатор', '~186 кг', 'HSTC', 'Электро-экран'],
    popular: false,
    tags: ['powerful', 'touring', 'premium', 'highway'],
    why: { ru: 'Флагман Honda — электро-экран и максимальный комфорт', en: 'Honda flagship — electric screen and ultimate comfort', de: 'Honda-Flaggschiff — Elektro-Windschild und maximaler Komfort', fr: 'Fleuron Honda — pare-brise électrique et confort ultime', es: 'Buque insignia Honda — pantalla eléctrica y máximo confort', th: 'เรือธง Honda — บังลมไฟฟ้าและความสะดวกสบายสูงสุด' },
    scores: { solo: 3, couple: 3, child: 1, girl: 0, easy: 1, comfort: 3, sport: 2, style: 3, economy: 0, beach: 2, island: 3, mountain: 2, beyond: 3 }
  },
  {
    id: 'forza-350-new',
    name: 'Honda Forza 350 new',
    cc: 350,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'premium',
    prices: {
      high:     [1200, 900, 800, 700],
      shoulder: [1000, 800, 700, 600],
      low:      [900, 800, 600, 550]
    },
    features: ['ABS', 'Вариатор', '~186 кг', 'HSTC', 'Электро-экран'],
    popular: false,
    tags: ['powerful', 'touring', 'premium', 'new'],
    why: { ru: 'Новейший Forza — топ автоматов на острове', en: 'Latest Forza — top automatic on the island', de: 'Neuester Forza — Top-Automatik auf der Insel', fr: 'Dernier Forza — meilleur automatique de l\'île', es: 'Último Forza — el mejor automático de la isla', th: 'Forza ใหม่ล่าสุด — ออโต้ที่ดีที่สุดบนเกาะ' },
    scores: { solo: 3, couple: 3, child: 1, girl: 0, easy: 1, comfort: 3, sport: 2, style: 3, economy: 0, beach: 2, island: 3, mountain: 2, beyond: 3 }
  },
  {
    id: 'adv-350-new',
    name: 'Honda ADV 350 new',
    cc: 350,
    category: 'maxi',
    type: 'scooter',
    transmission: 'auto',
    budgetGroup: 'premium',
    prices: {
      high:     [1200, 900, 800, 700],
      shoulder: [1000, 800, 700, 600],
      low:      [900, 800, 600, 550]
    },
    features: ['ABS', 'Вариатор', '~186 кг', 'Traction Control', 'Круиз'],
    popular: false,
    tags: ['adventure', 'touring', 'premium', 'offroad'],
    why: { ru: 'Премиум-приключение — горы и длинные трассы', en: 'Premium adventure — mountains and long highways', de: 'Premium-Abenteuer — Berge und lange Autobahnen', fr: 'Aventure premium — montagnes et longues routes', es: 'Aventura premium — montañas y carreteras largas', th: 'ผจญภัยพรีเมียม — ภูเขาและทางยาว' },
    scores: { solo: 3, couple: 3, child: 1, girl: 0, easy: 1, comfort: 3, sport: 2, style: 2, economy: 0, beach: 2, island: 3, mountain: 3, beyond: 3 }
  },

  // ── Economy Motorcycles ──
  {
    id: 'cbr-150-2021',
    name: 'Honda CBR 150 (2021)',
    cc: 150,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'economy',
    prices: {
      high:     [500, 400, 350, 300],
      shoulder: [500, 400, 300, 250],
      low:      [500, 400, 250, 200]
    },
    features: ['ABS', '6 МКПП', '~135 кг', 'Спортбайк'],
    popular: false,
    tags: ['sport', 'manual', 'entry'],
    why: { ru: 'Доступный спорт — первое знакомство с механикой', en: 'Affordable sport — first taste of manual', de: 'Erschwinglicher Sport — erster Kontakt mit Schaltung', fr: 'Sport abordable — premier contact avec la manuelle', es: 'Deporte asequible — primer contacto con manual', th: 'สปอร์ตราคาถูก — สัมผัสแรกกับเกียร์ธรรมดา' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 1, comfort: 1, sport: 2, style: 2, economy: 2, beach: 1, island: 2, mountain: 1, beyond: 1 }
  },
  {
    id: 'benelli-tnt-300',
    name: 'Benelli TNT 300',
    cc: 300,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'economy',
    prices: {
      high:     [500, 400, 350, 300],
      shoulder: [500, 400, 300, 250],
      low:      [500, 400, 300, 250]
    },
    features: ['ABS', '6 МКПП', '~198 кг', 'Нейкед'],
    popular: false,
    tags: ['naked', 'manual', 'budget'],
    why: { ru: 'Бюджетный нейкед 300cc — достаточно мощный', en: 'Budget 300cc naked — powerful enough', de: 'Budget-Naked 300cc — stark genug', fr: 'Naked 300cc économique — assez puissant', es: 'Naked 300cc económico — suficientemente potente', th: 'เนคเก็ด 300cc ราคาประหยัด — แรงเพียงพอ' },
    scores: { solo: 2, couple: 0, child: 0, girl: 0, easy: 1, comfort: 1, sport: 2, style: 1, economy: 2, beach: 1, island: 2, mountain: 1, beyond: 1 }
  },
  {
    id: 'stallions-bobber',
    name: 'Stallions Bobber 170',
    cc: 170,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'economy',
    prices: {
      high:     [500, 400, 350, 300],
      shoulder: [400, 350, 250, 200],
      low:      [350, 300, 200, 150]
    },
    features: ['ABS нет', '5 МКПП', '~140 кг', 'Круизер', 'Низкая посадка'],
    popular: false,
    tags: ['cruiser', 'style', 'photo'],
    why: { ru: 'Боббер для фото — стиль за минимальные деньги', en: 'Bobber for photos — style on a budget', de: 'Bobber für Fotos — Stil zum kleinen Preis', fr: 'Bobber pour les photos — style petit budget', es: 'Bobber para fotos — estilo a buen precio', th: 'บ็อบเบอร์สำหรับถ่ายรูป — สไตล์ในราคาย่อมเยา' },
    scores: { solo: 2, couple: 0, child: 0, girl: 0, easy: 1, comfort: 1, sport: 1, style: 3, economy: 2, beach: 2, island: 1, mountain: 0, beyond: 0 }
  },

  // ── Comfort Motorcycles ──
  {
    id: 'cbr-150-new',
    name: 'Honda CBR 150 new',
    cc: 150,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [600, 500, 400, 350],
      low:      [600, 500, 350, 300]
    },
    features: ['ABS', '6 МКПП', '~135 кг', 'Спортбайк'],
    popular: false,
    tags: ['sport', 'manual', 'new'],
    why: { ru: 'Обновлённый CBR — лёгкий и послушный спорт', en: 'Updated CBR — light and responsive sport', de: 'Aktualisierter CBR — leichter und agiler Sport', fr: 'CBR mis à jour — sportif léger et réactif', es: 'CBR actualizado — deporte ligero y ágil', th: 'CBR อัปเดต — สปอร์ตเบาและตอบสนองดี' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 1, comfort: 1, sport: 2, style: 2, economy: 1, beach: 1, island: 2, mountain: 2, beyond: 1 }
  },
  {
    id: 'cb-150',
    name: 'Honda CB 150',
    cc: 150,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [600, 500, 350, 300],
      low:      [600, 500, 350, 300]
    },
    features: ['ABS', '6 МКПП', '~130 кг', 'Нейкед'],
    popular: false,
    tags: ['naked', 'manual', 'versatile'],
    why: { ru: 'Лёгкий нейкед — удобная посадка на каждый день', en: 'Light naked — comfortable daily riding', de: 'Leichter Naked — bequemes Alltagsfahren', fr: 'Naked léger — conduite quotidienne confortable', es: 'Naked ligero — conducción diaria cómoda', th: 'เนคเก็ดเบา — ขับสบายทุกวัน' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 1, comfort: 2, sport: 1, style: 2, economy: 1, beach: 1, island: 2, mountain: 2, beyond: 1 }
  },
  {
    id: 'ktm-duke-200',
    name: 'KTM Duke 200',
    cc: 200,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [800, 500, 400, 350],
      low:      [700, 500, 350, 300]
    },
    features: ['ABS', '6 МКПП', '~148 кг', 'Нейкед', 'TFT дисплей'],
    popular: false,
    tags: ['naked', 'agile', 'fun'],
    why: { ru: 'Заводной нейкед KTM — драйв в городе', en: 'Lively KTM naked — urban thrill', de: 'Lebhafter KTM Naked — Stadtspaß', fr: 'KTM naked vif — sensation urbaine', es: 'KTM naked animado — emoción urbana', th: 'KTM เนคเก็ดสนุก — ขับในเมืองมันส์' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 1, comfort: 1, sport: 2, style: 2, economy: 1, beach: 1, island: 2, mountain: 2, beyond: 1 }
  },
  {
    id: 'xsr-155',
    name: 'Yamaha XSR 155',
    cc: 155,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [500, 400, 350, 300],
      low:      [500, 400, 300, 250]
    },
    features: ['ABS', '6 МКПП', '~134 кг', 'Нейкед'],
    popular: false,
    tags: ['retro', 'style', 'photo'],
    why: { ru: 'Ретро-нейкед Yamaha — красивый и фотогеничный', en: 'Retro Yamaha naked — beautiful and photogenic', de: 'Retro Yamaha Naked — schön und fotogen', fr: 'Yamaha naked rétro — beau et photogénique', es: 'Yamaha naked retro — bonito y fotogénico', th: 'Yamaha เนคเก็ดเรโทร — สวยและถ่ายรูปสวย' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 1, comfort: 1, sport: 1, style: 3, economy: 1, beach: 1, island: 2, mountain: 2, beyond: 1 }
  },
  {
    id: 'mt-15',
    name: 'Yamaha MT-15',
    cc: 155,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'comfort',
    prices: {
      high:     [600, 500, 450, 400],
      shoulder: [500, 400, 350, 300],
      low:      [500, 400, 300, 250]
    },
    features: ['ABS', '6 МКПП', '~138 кг', 'Нейкед'],
    popular: false,
    tags: ['naked', 'agile', 'fun'],
    why: { ru: 'Агрессивный малыш — резкий и лёгкий', en: 'Aggressive little bike — sharp and light', de: 'Aggressiver Kleiner — scharf und leicht', fr: 'Petit agressif — vif et léger', es: 'Pequeño agresivo — preciso y ligero', th: 'ตัวเล็กดุดัน — คมและเบา' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 1, comfort: 1, sport: 2, style: 2, economy: 1, beach: 1, island: 2, mountain: 2, beyond: 1 }
  },
  {
    id: 'z300',
    name: 'Kawasaki Z300',
    cc: 300,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'comfort',
    prices: {
      high:     [1000, 600, 500, 450],
      shoulder: [900, 700, 500, 400],
      low:      [900, 600, 450, 350]
    },
    features: ['ABS', '6 МКПП', '~168 кг', 'Нейкед'],
    popular: false,
    tags: ['naked', 'powerful', 'fun'],
    why: { ru: 'Kawasaki 300 — баланс мощности и управляемости', en: 'Kawasaki 300 — balance of power and handling', de: 'Kawasaki 300 — Balance aus Kraft und Handling', fr: 'Kawasaki 300 — équilibre puissance et maniabilité', es: 'Kawasaki 300 — equilibrio de potencia y manejo', th: 'Kawasaki 300 — สมดุลระหว่างพลังและการควบคุม' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 1, comfort: 2, sport: 2, style: 2, economy: 1, beach: 1, island: 3, mountain: 2, beyond: 2 }
  },

  // ── Premium Motorcycles ──
  {
    id: 'cbr-250rr',
    name: 'Honda CBR250RR',
    cc: 250,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'premium',
    prices: {
      high:     [1400, 1000, 900, 700],
      shoulder: [1300, 900, 700, 600],
      low:      [1100, 800, 700, 550]
    },
    features: ['ABS', '6 МКПП', '~168 кг', 'Ride-by-Wire'],
    popular: false,
    tags: ['sport', 'fast', 'premium'],
    why: { ru: 'Гоночный характер — Ride-by-Wire и острая управляемость', en: 'Racing character — Ride-by-Wire and sharp handling', de: 'Renncharakter — Ride-by-Wire und scharfes Handling', fr: 'Caractère course — Ride-by-Wire et direction précise', es: 'Carácter de carrera — Ride-by-Wire y manejo preciso', th: 'สไตล์แข่ง — Ride-by-Wire และการควบคุมคม' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 0, comfort: 1, sport: 3, style: 2, economy: 0, beach: 0, island: 2, mountain: 3, beyond: 2 }
  },
  {
    id: 'cbr-500r',
    name: 'Honda CBR500R',
    cc: 500,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'premium',
    prices: {
      high:     [1400, 1200, 900, 800],
      shoulder: [1400, 1000, 800, 700],
      low:      [1200, 900, 800, 600]
    },
    features: ['ABS', '6 МКПП', '~192 кг', 'Assist Slipper Clutch'],
    popular: false,
    tags: ['sport', 'powerful', 'highway'],
    why: { ru: '500cc спорт — уверенность на трассе', en: '500cc sport — highway confidence', de: '500cc Sport — Vertrauen auf der Autobahn', fr: '500cc sport — confiance sur autoroute', es: '500cc deporte — confianza en autopista', th: '500cc สปอร์ต — มั่นใจบนทางหลวง' },
    scores: { solo: 3, couple: 1, child: 0, girl: 0, easy: 0, comfort: 2, sport: 3, style: 2, economy: 0, beach: 0, island: 2, mountain: 3, beyond: 3 }
  },
  {
    id: 'rebel-500',
    name: 'Honda Rebel 500',
    cc: 500,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'premium',
    prices: {
      high:     [1400, 1000, 900, 800],
      shoulder: [1400, 1000, 800, 700],
      low:      [1200, 1000, 700, 600]
    },
    features: ['ABS', '6 МКПП', '~191 кг', 'Круизер', 'Низкая посадка'],
    popular: false,
    tags: ['cruiser', 'style', 'photo', 'highway'],
    why: { ru: 'Круизер мечты — стиль, комфорт и характер', en: 'Dream cruiser — style, comfort and character', de: 'Traum-Cruiser — Stil, Komfort und Charakter', fr: 'Cruiser de rêve — style, confort et caractère', es: 'Crucero soñado — estilo, comodidad y carácter', th: 'ครุยเซอร์ในฝัน — สไตล์ สะดวกสบาย และเสน่ห์' },
    scores: { solo: 3, couple: 1, child: 0, girl: 0, easy: 0, comfort: 2, sport: 2, style: 3, economy: 0, beach: 1, island: 3, mountain: 2, beyond: 3 }
  },
  {
    id: 'yzf-r3',
    name: 'Yamaha YZF R3',
    cc: 321,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'premium',
    prices: {
      high:     [1400, 1000, 900, 700],
      shoulder: [1400, 1000, 900, 700],
      low:      [1200, 1000, 700, 600]
    },
    features: ['ABS', '6 МКПП', '~170 кг', 'Assist Slipper Clutch'],
    popular: false,
    tags: ['sport', 'fast', 'premium'],
    why: { ru: 'Yamaha R-серия — спорт без компромиссов', en: 'Yamaha R-series — no-compromise sport', de: 'Yamaha R-Serie — Sport ohne Kompromisse', fr: 'Yamaha série R — sport sans compromis', es: 'Yamaha serie R — deporte sin compromiso', th: 'Yamaha R-series — สปอร์ตไม่ประนีประนอม' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 0, comfort: 1, sport: 3, style: 2, economy: 0, beach: 0, island: 2, mountain: 3, beyond: 2 }
  },
  {
    id: 'z400',
    name: 'Kawasaki Z400',
    cc: 400,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'premium',
    prices: {
      high:     [1300, 700, 600, 550],
      shoulder: [1100, 800, 600, 500],
      low:      [1000, 700, 550, 450]
    },
    features: ['ABS', '6 МКПП', '~167 кг', 'Assist & Slipper Clutch'],
    popular: false,
    tags: ['naked', 'powerful', 'fun'],
    why: { ru: 'Kawasaki 400 — лёгкий и мощный нейкед', en: 'Kawasaki 400 — light and powerful naked', de: 'Kawasaki 400 — leichter und starker Naked', fr: 'Kawasaki 400 — naked léger et puissant', es: 'Kawasaki 400 — naked ligero y potente', th: 'Kawasaki 400 — เนคเก็ดเบาและทรงพลัง' },
    scores: { solo: 3, couple: 0, child: 0, girl: 0, easy: 0, comfort: 2, sport: 3, style: 2, economy: 0, beach: 0, island: 3, mountain: 3, beyond: 2 }
  },
  {
    id: 'vulcan-650s',
    name: 'Kawasaki Vulcan 650S',
    cc: 650,
    category: 'moto',
    type: 'motorcycle',
    transmission: 'manual',
    budgetGroup: 'premium',
    prices: {
      high:     [1600, 1100, 1000, 900],
      shoulder: [1600, 1200, 900, 700],
      low:      [1400, 1100, 900, 700]
    },
    features: ['ABS', '6 МКПП', '~229 кг', 'Круизер', 'Ergo-Fit'],
    popular: false,
    tags: ['cruiser', 'powerful', 'highway', 'touring'],
    why: { ru: 'Тяжёлый круизер — король длинных дорог', en: 'Heavy cruiser — king of long roads', de: 'Schwerer Cruiser — König der langen Straßen', fr: 'Cruiser lourd — roi des longues routes', es: 'Crucero pesado — rey de las carreteras largas', th: 'ครุยเซอร์หนัก — ราชาแห่งถนนยาว' },
    scores: { solo: 3, couple: 1, child: 0, girl: 0, easy: 0, comfort: 3, sport: 2, style: 3, economy: 0, beach: 0, island: 2, mountain: 2, beyond: 3 }
  }
];

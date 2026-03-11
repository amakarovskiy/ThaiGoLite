// ThaiGo Lite — Bike catalog
// Categories: scooter | maxi | moto | car

export const BIKE_CATEGORIES = {
  all:     'Все',
  scooter: 'Скутеры',
  maxi:    'Макси',
  moto:    'Мотоциклы',
  car:     'Авто'
};

export const BIKES = [
  // ── Скутеры ──
  {
    id: 'scoopy-110',
    name: 'Honda Scoopy 110i',
    cc: 110,
    category: 'scooter',
    prices: { day1: 250, day3: 200, day7: 180, day14: 170, month: 4500 },
    features: ['ABS нет', 'Вариатор', '~99 кг', 'Расход 1.8 л/100км'],
    popular: true
  },
  {
    id: 'fino-125',
    name: 'Yamaha Fino 125',
    cc: 125,
    category: 'scooter',
    prices: { day1: 250, day3: 200, day7: 180, day14: 170, month: 4500 },
    features: ['ABS нет', 'Вариатор', '~96 кг', 'Расход 1.7 л/100км'],
    popular: false
  },
  {
    id: 'click-125',
    name: 'Honda Click 125i',
    cc: 125,
    category: 'scooter',
    prices: { day1: 300, day3: 250, day7: 200, day14: 180, month: 5000 },
    features: ['ABS нет', 'Вариатор', '~108 кг', 'Расход 2 л/100км'],
    popular: true
  },
  {
    id: 'click-160',
    name: 'Honda Click 160i',
    cc: 160,
    category: 'scooter',
    prices: { day1: 350, day3: 300, day7: 250, day14: 220, month: 6000 },
    features: ['ABS', 'Вариатор', '~116 кг', 'Расход 2.2 л/100км'],
    popular: true
  },
  {
    id: 'aerox-155',
    name: 'Yamaha Aerox 155',
    cc: 155,
    category: 'scooter',
    prices: { day1: 350, day3: 300, day7: 250, day14: 220, month: 6000 },
    features: ['ABS', 'Вариатор', '~125 кг', 'Расход 2.3 л/100км'],
    popular: false
  },
  {
    id: 'lead-125',
    name: 'Honda Lead 125',
    cc: 125,
    category: 'scooter',
    prices: { day1: 300, day3: 250, day7: 200, day14: 180, month: 5000 },
    features: ['ABS нет', 'Вариатор', '~114 кг', 'Большой багажник'],
    popular: false
  },

  // ── Макси-скутеры ──
  {
    id: 'pcx-160',
    name: 'Honda PCX 160',
    cc: 160,
    category: 'maxi',
    prices: { day1: 400, day3: 350, day7: 300, day14: 270, month: 7000 },
    features: ['ABS', 'Вариатор', '~132 кг', 'Keyless', 'USB зарядка'],
    popular: true
  },
  {
    id: 'nmax-155',
    name: 'Yamaha NMAX 155',
    cc: 155,
    category: 'maxi',
    prices: { day1: 400, day3: 350, day7: 300, day14: 270, month: 7000 },
    features: ['ABS', 'Вариатор', '~131 кг', 'Traction Control'],
    popular: true
  },
  {
    id: 'adv-160',
    name: 'Honda ADV 160',
    cc: 160,
    category: 'maxi',
    prices: { day1: 450, day3: 400, day7: 350, day14: 300, month: 8000 },
    features: ['ABS', 'Вариатор', '~133 кг', 'Внедорожный стиль'],
    popular: false
  },
  {
    id: 'adv-350',
    name: 'Honda ADV 350',
    cc: 350,
    category: 'maxi',
    prices: { day1: 700, day3: 600, day7: 550, day14: 500, month: 13000 },
    features: ['ABS', 'Вариатор', '~186 кг', 'Traction Control', 'Круиз'],
    popular: false
  },
  {
    id: 'xmax-300',
    name: 'Yamaha XMAX 300',
    cc: 300,
    category: 'maxi',
    prices: { day1: 600, day3: 550, day7: 500, day14: 450, month: 12000 },
    features: ['ABS', 'Вариатор', '~179 кг', 'Traction Control', 'Keyless'],
    popular: false
  },
  {
    id: 'forza-350',
    name: 'Honda Forza 350',
    cc: 350,
    category: 'maxi',
    prices: { day1: 700, day3: 650, day7: 600, day14: 550, month: 14000 },
    features: ['ABS', 'Вариатор', '~186 кг', 'HSTC', 'Электро-экран'],
    popular: false
  },

  // ── Мотоциклы ──
  {
    id: 'cbr-150r',
    name: 'Honda CBR 150R',
    cc: 150,
    category: 'moto',
    prices: { day1: 450, day3: 400, day7: 350, day14: 300, month: 8000 },
    features: ['ABS', '6 МКПП', '~135 кг', 'Спортбайк'],
    popular: false
  },
  {
    id: 'cbr-250rr',
    name: 'Honda CBR 250RR',
    cc: 250,
    category: 'moto',
    prices: { day1: 600, day3: 550, day7: 500, day14: 450, month: 12000 },
    features: ['ABS', '6 МКПП', '~168 кг', 'Ride-by-Wire'],
    popular: false
  },
  {
    id: 'cbr-500r',
    name: 'Honda CBR 500R',
    cc: 500,
    category: 'moto',
    prices: { day1: 800, day3: 700, day7: 650, day14: 600, month: 16000 },
    features: ['ABS', '6 МКПП', '~192 кг', 'Assist Slipper Clutch'],
    popular: false
  },
  {
    id: 'rebel-500',
    name: 'Honda Rebel 500',
    cc: 500,
    category: 'moto',
    prices: { day1: 800, day3: 700, day7: 650, day14: 600, month: 16000 },
    features: ['ABS', '6 МКПП', '~191 кг', 'Круизер', 'Низкая посадка'],
    popular: false
  },
  {
    id: 'z300',
    name: 'Kawasaki Z300',
    cc: 300,
    category: 'moto',
    prices: { day1: 550, day3: 500, day7: 450, day14: 400, month: 11000 },
    features: ['ABS', '6 МКПП', '~168 кг', 'Нейкед'],
    popular: false
  },
  {
    id: 'z400',
    name: 'Kawasaki Z400',
    cc: 400,
    category: 'moto',
    prices: { day1: 700, day3: 600, day7: 550, day14: 500, month: 13000 },
    features: ['ABS', '6 МКПП', '~167 кг', 'Assist & Slipper Clutch'],
    popular: false
  },
  {
    id: 'vulcan-650',
    name: 'Kawasaki Vulcan S 650',
    cc: 649,
    category: 'moto',
    prices: { day1: 900, day3: 800, day7: 750, day14: 700, month: 18000 },
    features: ['ABS', '6 МКПП', '~229 кг', 'Круизер', 'Ergo-Fit'],
    popular: false
  },
  {
    id: 'duke-390',
    name: 'KTM Duke 390',
    cc: 390,
    category: 'moto',
    prices: { day1: 700, day3: 600, day7: 550, day14: 500, month: 13000 },
    features: ['ABS', '6 МКПП', '~163 кг', 'Ride-by-Wire', 'TFT дисплей'],
    popular: false
  },

  // ── Авто ──
  {
    id: 'city-2019',
    name: 'Honda City 2019',
    cc: 1500,
    category: 'car',
    prices: { day1: 1200, day3: 1100, day7: 1000, day14: 900, month: 22000 },
    features: ['Автомат', 'Кондиционер', '5 мест', 'Расход 5.5 л/100км'],
    popular: false
  },
  {
    id: 'yaris-ativ',
    name: 'Toyota Yaris Ativ',
    cc: 1200,
    category: 'car',
    prices: { day1: 1000, day3: 900, day7: 800, day14: 750, month: 19000 },
    features: ['Автомат', 'Кондиционер', '5 мест', 'Расход 5 л/100км'],
    popular: false
  }
];

// Rider Test — question scenes and data
// Scenes are emoji-based HTML, animations via CSS classes

export const RIDER_QUESTIONS = [
  {
    id: 1,
    correct: 1, // index B
    scene: `
      <span class="s-bike">🛵</span>
      <span class="s-phone">📱</span>
      <span class="s-flash">📸</span>
      <span class="s-check">✅</span>
    `,
    sceneClass: 'scene-q1',
    phoneLink: null
  },
  {
    id: 2,
    correct: 2, // index C
    scene: `
      <span class="s-drop s-drop1">💧</span>
      <span class="s-drop s-drop2">💧</span>
      <span class="s-drop s-drop3">💧</span>
      <span class="s-bike-fast">🛵</span>
      <span class="s-crash">💥</span>
      <span class="s-bike-slow">🛵</span>
      <span class="s-check2">✅</span>
    `,
    sceneClass: 'scene-q2',
    phoneLink: null
  },
  {
    id: 3,
    correct: 2, // index C
    scene: `
      <span class="s-mt-l">⛰️</span>
      <span class="s-mt-r">⛰️</span>
      <span class="s-truck">🚛</span>
      <span class="s-bike3">🛵</span>
      <span class="s-wave1">👋</span>
      <span class="s-wave2">👋</span>
    `,
    sceneClass: 'scene-q3',
    phoneLink: null
  },
  {
    id: 4,
    correct: 2, // index C
    scene: `
      <span class="s-beer s-beer1">🍺</span>
      <span class="s-beer s-beer2">🍺</span>
      <span class="s-beer s-beer3">🍺</span>
      <span class="s-bike4">🛵</span>
      <span class="s-crash4">💥</span>
      <span class="s-moon">🌙</span>
      <span class="s-bike4b">🛵</span>
      <span class="s-person">😊</span>
      <span class="s-car4">🚗</span>
      <span class="s-check4">✅</span>
    `,
    sceneClass: 'scene-q4',
    phoneLink: null
  },
  {
    id: 5,
    correct: 1, // index B
    scene: `
      <span class="s-police">🚔</span>
      <span class="s-siren-b">🔵</span>
      <span class="s-siren-r">🔴</span>
      <span class="s-bike5">🛵</span>
      <span class="s-officer">👮</span>
      <span class="s-biker">🧑</span>
      <span class="s-wave5a">👋😊</span>
      <span class="s-wave5b">👋😊</span>
      <span class="s-check5">✅</span>
    `,
    sceneClass: 'scene-q5',
    phoneLink: null
  },
  {
    id: 6,
    correct: 2, // index C
    scene: `
      <span class="s-tuktuk">🛺</span>
      <span class="s-bike6">🛵</span>
      <span class="s-crash6">💥</span>
      <span class="s-crowd1">👥</span>
      <span class="s-crowd2">👥</span>
      <span class="s-phone6">📱</span>
      <span class="s-call6">🤙</span>
      <span class="s-check6">✅</span>
    `,
    sceneClass: 'scene-q6',
    phoneLink: '+66822545737'
  },
  {
    id: 7,
    correct: 2, // index C
    scene: `
      <span class="s-curb-r">🔴⬜🔴⬜🔴⬜🔴⬜</span>
      <span class="s-bike7">🛵</span>
      <span class="s-walker7">🚶</span>
      <span class="s-cop7">👮</span>
      <span class="s-lock7">🔒</span>
      <span class="s-money7">💸</span>
      <span class="s-curb-w">⬜⬜⬜⬜⬜⬜⬜⬜</span>
      <span class="s-palm7">🌴</span>
      <span class="s-check7">✅😊</span>
    `,
    sceneClass: 'scene-q7',
    phoneLink: null
  },
  {
    id: 8,
    correct: 2, // index C
    scene: `
      <span class="s-bike8">🛵</span>
      <span class="s-vape">💨</span>
      <span class="s-cop8">👮</span>
      <span class="s-hand8">✋</span>
      <span class="s-mag8">🔍</span>
      <span class="s-found8">😮</span>
      <span class="s-chain8">⛓️</span>
      <span class="s-shock8">😱</span>
    `,
    sceneClass: 'scene-q8',
    phoneLink: null
  }
];

export const CONFETTI_EMOJIS = ['🎉', '🛵', '🌴', '🏖️', '⭐', '🤙'];

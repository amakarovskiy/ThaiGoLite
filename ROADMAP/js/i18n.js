/* ===== Internationalization engine ===== */

var I18N = {
  _ui: {},
  _places: {},
  _lang: 'en',
  _supported: ['ru', 'en', 'fr', 'de'],

  registerUI: function (lang, strings) {
    this._ui[lang] = strings;
  },

  registerPlaces: function (lang, data) {
    this._places[lang] = data;
  }
};

/**
 * Translate UI string by key.
 * Supports interpolation: t('toast.added', { name: 'Patong' })
 * Fallback chain: current lang → English → key itself
 */
function t(key, params) {
  var val = (I18N._ui[I18N._lang] && I18N._ui[I18N._lang][key])
         || (I18N._ui['en'] && I18N._ui['en'][key])
         || key;
  if (params) {
    for (var k in params) {
      if (params.hasOwnProperty(k)) {
        val = val.split('{' + k + '}').join(params[k]);
      }
    }
  }
  return val;
}

/**
 * Translate place data field.
 * tp('patong', 'name') → translated name or null (caller uses original)
 * Fallback: current lang → English → null
 */
function tp(placeId, field) {
  var loc = I18N._places[I18N._lang] && I18N._places[I18N._lang][placeId];
  if (loc && loc[field]) return loc[field];
  var en = I18N._places['en'] && I18N._places['en'][placeId];
  if (en && en[field]) return en[field];
  return null;
}

/**
 * Detect browser language, check localStorage, URL param.
 * Default: English for unsupported languages.
 */
function detectLanguage() {
  // 1. URL parameter ?lang=en
  try {
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if (urlLang && I18N._supported.indexOf(urlLang) !== -1) return urlLang;
  } catch (e) {}

  // 2. localStorage
  var saved = localStorage.getItem('phuket_lang');
  if (saved && I18N._supported.indexOf(saved) !== -1) return saved;

  // 3. Browser language
  var nav = (navigator.language || navigator.userLanguage || '').toLowerCase().split('-')[0];
  if (I18N._supported.indexOf(nav) !== -1) return nav;

  // 4. Default to English
  return 'en';
}

/* ===== Alpine.js store integration ===== */

document.addEventListener('alpine:init', function () {
  var lang = detectLanguage();
  I18N._lang = lang;
  document.documentElement.lang = lang;

  Alpine.store('i18n', {
    lang: lang,
    _rev: 0,

    setLang: function (newLang) {
      if (I18N._supported.indexOf(newLang) === -1) return;
      I18N._lang = newLang;
      this.lang = newLang;
      this._rev++;
      localStorage.setItem('phuket_lang', newLang);
      document.documentElement.lang = newLang;
      updateMetaTags();
      updateFooterTranslations();
      // Re-notify route to refresh translated names in right panel
      if (typeof Route !== 'undefined' && Route._notify) {
        Route._notify();
      }
      // Close open popups so they refresh with new language on next open
      if (typeof leafletMap !== 'undefined' && leafletMap) {
        leafletMap.closePopup();
      }
      // Close mobile menu if open
      var mobileMenu = document.querySelector('.mobile-menu.open');
      if (mobileMenu) mobileMenu.classList.remove('open');
    }
  });
});

/* ===== Dynamic meta tags update ===== */

function updateMetaTags() {
  // Document title
  document.title = t('meta.title');

  // Meta description
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', t('meta.description'));

  // Open Graph
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', t('meta.og_title'));

  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', t('meta.og_description'));

  var ogImgAlt = document.querySelector('meta[property="og:image:alt"]');
  if (ogImgAlt) ogImgAlt.setAttribute('content', t('meta.og_image_alt'));

  // Twitter
  var twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', t('meta.twitter_description'));

  // og:locale
  var localeMap = { ru: 'ru_RU', en: 'en_US', fr: 'fr_FR', de: 'de_DE' };
  var ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', localeMap[I18N._lang] || 'en_US');

  // html lang
  document.documentElement.lang = I18N._lang;
}

/* ===== Footer translation via data-i18n attributes ===== */

function updateFooterTranslations() {
  var els = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < els.length; i++) {
    els[i].textContent = t(els[i].getAttribute('data-i18n'));
  }
}

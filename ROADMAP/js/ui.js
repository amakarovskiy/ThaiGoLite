/* ===== Toast notifications ===== */

function showToast(msg, type) {
  type = type || 'success';
  var container = document.getElementById('toasts');
  if (!container) return;
  var el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(function () {
    el.classList.add('removing');
    setTimeout(function () { el.remove(); }, 250);
  }, 3000);
}

/* ===== Rich toast (share hint) ===== */

var _shareHintShown = false;
var _routeRestoredFromURL = false;

function showShareHint() {
  if (_shareHintShown) return;
  _shareHintShown = true;

  var container = document.getElementById('toasts');
  if (!container) return;

  var el = document.createElement('div');
  el.className = 'toast-rich';
  el.style.position = 'relative';
  el.innerHTML =
    '<button class="toast-rich-close">&times;</button>' +
    '<div class="toast-rich-title">' + t('toast_rich.title') + '</div>' +
    '<div class="toast-rich-desc">' + t('toast_rich.desc') + '</div>' +
    '<div class="toast-rich-actions">' +
      '<button class="toast-rich-btn toast-rich-btn-primary">' + t('toast_rich.send') + '</button>' +
      '<button class="toast-rich-btn toast-rich-btn-secondary">' + t('toast_rich.save') + '</button>' +
    '</div>';

  function dismissToast() {
    el.classList.add('removing');
    setTimeout(function () { if (el.parentElement) el.remove(); }, 250);
  }

  el.querySelector('.toast-rich-close').addEventListener('click', dismissToast);
  el.querySelector('.toast-rich-btn-primary').addEventListener('click', function () {
    shareCompanionWA(Route.places, Route.getStats());
    dismissToast();
  });
  el.querySelector('.toast-rich-btn-secondary').addEventListener('click', function () {
    saveTripBookmark();
    dismissToast();
  });

  container.appendChild(el);

  // Auto-remove after 8 seconds
  setTimeout(function () {
    if (el.parentElement) {
      el.classList.add('removing');
      setTimeout(function () { el.remove(); }, 250);
    }
  }, 8000);
}

/* ===== Drag & Drop helper ===== */
var _dragFromIdx = -1;

function initDragDrop(panelRef) {
  var routeList = document.querySelector('.route-list');
  if (!routeList) return;

  routeList.addEventListener('dragstart', function (e) {
    var stopEl = e.target.closest('.stop');
    if (!stopEl) return;
    var stops = Array.from(routeList.querySelectorAll('.stop'));
    _dragFromIdx = stops.indexOf(stopEl);
    stopEl.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  routeList.addEventListener('dragend', function (e) {
    var stopEl = e.target.closest('.stop');
    if (stopEl) stopEl.classList.remove('dragging');
    routeList.querySelectorAll('.stop').forEach(function (s) {
      s.classList.remove('drag-over');
    });
  });

  routeList.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    var stopEl = e.target.closest('.stop');
    if (!stopEl) return;
    routeList.querySelectorAll('.stop').forEach(function (s) {
      s.classList.remove('drag-over');
    });
    stopEl.classList.add('drag-over');
  });

  routeList.addEventListener('drop', function (e) {
    e.preventDefault();
    var stopEl = e.target.closest('.stop');
    if (!stopEl) return;
    var stops = Array.from(routeList.querySelectorAll('.stop'));
    var toIdx = stops.indexOf(stopEl);
    if (_dragFromIdx >= 0 && toIdx >= 0 && _dragFromIdx !== toIdx) {
      Route.reorder(_dragFromIdx, toIdx);
    }
    routeList.querySelectorAll('.stop').forEach(function (s) {
      s.classList.remove('drag-over');
    });
    _dragFromIdx = -1;
  });
}

/* ===== Mobile bottom sheet touch handling ===== */

function initMobileSheet(panelRef) {
  if (window.innerWidth > 768) return;

  var sheet = document.getElementById('mobileSheet');
  var handle = document.getElementById('sheetHandle');
  var content = document.getElementById('sheetContent');
  if (!sheet || !handle) return;

  var startY = 0;
  var startTranslate = 0;
  var isDragging = false;
  var sheetHeight = 0;

  function getCurrentTranslateY() {
    var style = window.getComputedStyle(sheet);
    var matrix = new DOMMatrix(style.transform);
    return matrix.m42;
  }

  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startY = e.touches[0].clientY;
    startTranslate = getCurrentTranslateY();
    sheetHeight = sheet.offsetHeight;
    sheet.classList.add('sheet-dragging');
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    var deltaY = e.touches[0].clientY - startY;
    var newTranslate = startTranslate + deltaY;
    newTranslate = Math.max(0, Math.min(sheetHeight - 40, newTranslate));
    sheet.style.transform = 'translateY(' + newTranslate + 'px)';
    e.preventDefault();
  }

  function onTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    sheet.classList.remove('sheet-dragging');
    sheet.style.transform = '';

    var deltaY = e.changedTouches[0].clientY - startY;
    var threshold = 60;
    var current = panelRef.sheetState;
    var next = current;

    if (deltaY < -threshold) {
      if (current === 'collapsed') next = 'half';
      else if (current === 'half') next = 'expanded';
    } else if (deltaY > threshold) {
      if (current === 'expanded') next = 'half';
      else if (current === 'half') next = 'collapsed';
    }
    panelRef.setSheetState(next);
  }

  // Handle + tabs are both drag targets
  handle.addEventListener('touchstart', onTouchStart, { passive: true });
  var tabs = sheet.querySelector('.sheet-tabs');
  if (tabs) tabs.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd, { passive: true });

  handle.addEventListener('click', function () {
    panelRef.toggleSheet();
  });

  // Allow dragging sheet down when content is scrolled to top
  if (content) {
    content.addEventListener('touchstart', function (e) {
      if (content.scrollTop > 0) return;
      // Allow pull-down in any state (half or expanded)
      if (panelRef.sheetState === 'collapsed') return;
      var touchY = e.touches[0].clientY;
      var moved = false;
      var moveH = function (ev) {
        var dy = ev.touches[0].clientY - touchY;
        if (!moved && dy > 10) {
          moved = true;
          onTouchStart(e);
        }
        if (moved) onTouchMove(ev);
      };
      var endH = function (ev) {
        document.removeEventListener('touchmove', moveH);
        document.removeEventListener('touchend', endH);
        if (moved) onTouchEnd(ev);
      };
      document.addEventListener('touchmove', moveH, { passive: false });
      document.addEventListener('touchend', endH, { passive: true });
    }, { passive: true });
  }

  sheet.setAttribute('data-tab', 'places');
  panelRef.setSheetState('collapsed');
}

/* ===== Alpine.js panel data ===== */

function panelData() {
  return {
    search: '',
    filter: 'top',
    route: [],
    routeIdSet: {},
    stats: { km: 0, mins: 0, fuel: 0, rubFuel: 0, rubKm: 0 },
    warnings: [],
    menuOpen: false,
    shareOpen: false,
    routeName: '',
    routeRating: null,
    nearbySuggestion: null,
    taxiCost: 0,
    presetsOpen: false,
    sheetState: 'collapsed',
    sheetTab: 'places',

    /* i18n-aware translation helper — triggers Alpine reactivity on lang change */
    tt: function (key, params) {
      var _r = this.$store.i18n._rev; // access for Alpine reactivity tracking
      return t(key, params);
    },

    get filteredPlaces() {
      var self = this;
      var rIds = self.routeIdSet;
      var _langRev = self.$store.i18n._rev; // trigger re-eval on lang change
      var list = PLACES;
      if (self.filter !== 'all') {
        list = list.filter(function (p) { return placeMatchesCat(p, self.filter); });
      }
      if (self.search.trim()) {
        var q = self.search.toLowerCase().trim();
        list = list.filter(function (p) {
          var n = (tp(p.id, 'name') || p.name).toLowerCase();
          var d = (tp(p.id, 'desc') || p.desc).toLowerCase();
          return n.indexOf(q) !== -1 || d.indexOf(q) !== -1;
        });
      }
      // Stamp each place with _inRoute flag and translated fields
      return list.map(function (p) {
        return Object.assign({}, p, {
          _inRoute: !!rIds[p.id],
          name: tp(p.id, 'name') || p.name,
          desc: tp(p.id, 'desc') || p.desc,
          tips: tp(p.id, 'tips') || p.tips
        });
      });
    },

    get waLink() {
      return buildWaLink(this.route, this.stats);
    },

    get tgLink() {
      return buildTgLink(this.route, this.stats);
    },

    get googleMapsLink() {
      return buildGoogleMapsLink(this.route);
    },

    get hasThaiGo() {
      return this.route.some(function (p) { return p.cat.includes('office'); });
    },

    init() {
      var self = this;

      // Subscribe to route changes
      Route.onChange(function (data) {
        // Translate place names for route display
        self.route = data.places.map(function (p) {
          return Object.assign({}, p, {
            name: tp(p.id, 'name') || p.name,
            desc: tp(p.id, 'desc') || p.desc
          });
        });
        // Build a reactive lookup object for route IDs
        var idObj = {};
        data.places.forEach(function (p) { idObj[p.id] = true; });
        self.routeIdSet = idObj;
        self.stats = data.stats;
        self.warnings = data.warnings;
        updateURL();

        // Route name & quality
        self.routeName = generateRouteName(data.places);
        self.routeRating = data.places.length >= 2 ? getRouteRating(data.stats) : null;
        self.nearbySuggestion = findNearbyPlace(data.places);
        self.taxiCost = Math.round(data.stats.km * TAXI_RATE_PER_KM);

        // Show share hint on 3rd point (only if not from URL restore)
        if (!_routeRestoredFromURL && data.places.length === 3) {
          setTimeout(function () { showShareHint(); }, 600);
        }

        // Mobile: DON'T auto-switch to route tab (user picks places first)
      });

      // Init map after DOM ready
      this.$nextTick(function () {
        initMap();
        // Ensure Leaflet recalculates size after layout
        setTimeout(function () {
          if (leafletMap) leafletMap.invalidateSize();
        }, 100);
        // Restore route from URL
        var params = new URLSearchParams(window.location.search);
        if (params.get('route')) {
          _routeRestoredFromURL = true;
        }
        Route.initFromURL();
        // Apply initial filter
        if (Route.count > 0) {
          self.filter = 'all';
          filterMapMarkers('all');
        } else {
          filterMapMarkers('top');
        }
        // Init drag & drop
        initDragDrop(self);

        // Apply initial language to meta/footer
        updateMetaTags();
        updateFooterTranslations();

        // Initialize mobile bottom sheet
        initMobileSheet(self);

        // Handle resize
        window.addEventListener('resize', function () {
          if (typeof leafletMap !== 'undefined' && leafletMap) {
            setTimeout(function () { leafletMap.invalidateSize(); }, 100);
          }
        });
      });

      // Close popovers on click outside
      document.addEventListener('click', function (e) {
        if (self.shareOpen && !e.target.closest('.share-popover-wrap')) {
          self.shareOpen = false;
        }
        if (self.presetsOpen && !e.target.closest('.presets-wrap')) {
          self.presetsOpen = false;
        }
      });
    },

    setSheetState(state) {
      if (window.innerWidth > 768) return;
      this.sheetState = state;
      var sheet = document.getElementById('mobileSheet');
      if (!sheet) return;
      sheet.classList.remove('sheet-collapsed', 'sheet-half', 'sheet-expanded');
      sheet.classList.add('sheet-' + state);
      // Toggle floating elements visibility
      var floatS = document.querySelector('.float-search');
      var floatF = document.querySelector('.float-filters');
      if (floatS) floatS.classList.toggle('hide-float', state === 'expanded');
      if (floatF) floatF.classList.toggle('hide-float', state === 'expanded');
      setTimeout(function () {
        if (typeof leafletMap !== 'undefined' && leafletMap) leafletMap.invalidateSize();
      }, 400);
    },

    toggleSheet() {
      if (this.sheetState === 'collapsed') this.setSheetState('half');
      else if (this.sheetState === 'half') this.setSheetState('expanded');
      else this.setSheetState('collapsed');
    },

    switchTab(tab) {
      this.sheetTab = tab;
      var sheet = document.getElementById('mobileSheet');
      if (sheet) sheet.setAttribute('data-tab', tab);
      if (this.sheetState === 'collapsed') this.setSheetState('half');
    },

    setFilter(cat) {
      this.filter = cat;
      filterMapMarkers(cat);
    },

    isInRoute(id) {
      // Use reactive routeIdSet object — Alpine tracks property access on reactive objects
      return !!this.routeIdSet[id];
    },

    togglePlace(place) {
      Route.toggle(place);
    },

    removeStop(id) {
      Route.remove(id);
    },

    clearRoute() {
      Route.clear();
    },

    focusPlace(id) {
      flyToPlace(id);
    },

    shareLink() {
      copyShareLink();
    },

    toggleSharePopover() {
      this.shareOpen = !this.shareOpen;
    },

    shareToCompanionWA() {
      shareCompanionWA(this.route, this.stats);
      this.shareOpen = false;
    },

    shareToCompanionTG() {
      shareCompanionTG(this.route, this.stats);
      this.shareOpen = false;
    },

    copyLink() {
      copyShareLink();
      this.shareOpen = false;
    },

    saveTomorrow() {
      saveTripBookmark();
      this.shareOpen = false;
    },

    optimizeRoute() {
      Route.optimize();
    },

    addSuggestion() {
      if (this.nearbySuggestion) {
        Route.add(this.nearbySuggestion);
      }
    },

    startFromThaiGo() {
      var office = PLACES.find(function (p) { return p.cat.includes('office'); });
      if (office) {
        Route.addFirst(office);
      }
    },

    loadPreset(preset) {
      Route.clear();
      preset.ids.forEach(function (id) {
        var place = PLACES.find(function (p) { return p.id === id; });
        if (place) {
          Route._places.push(place);
        }
      });
      Route._notify();
      this.presetsOpen = false;
      this.filter = 'all';
      filterMapMarkers('all');
      showToast(t('toast.preset_loaded', { name: t(preset.nameKey) }));
    },

    generateRandom(mins) {
      var places = generateRandomRoute(mins);
      Route.clear();
      places.forEach(function (p) {
        Route._places.push(p);
      });
      Route._notify();
      this.filter = 'all';
      filterMapMarkers('all');
      showToast(t('toast.random_created'));
    },

    togglePresets() {
      this.presetsOpen = !this.presetsOpen;
    },

    rentBikeWA() {
      var msg = t('share.rent_msg');
      if (this.route.length >= 2) {
        msg += '\n\n' + t('share.my_route') + ': ' + this.route.map(function (p) { return p.name; }).join(' → ');
      }
      window.open('https://wa.me/66822545737?text=' + encodeURIComponent(msg), '_blank');
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    closeMenu() {
      this.menuOpen = false;
    },

    getWarning(key) {
      var icon = WARNINGS_DB[key] ? WARNINGS_DB[key].icon : '⚠️';
      return { icon: icon, text: t('warn.' + key) };
    }
  };
}

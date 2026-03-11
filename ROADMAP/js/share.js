/* ===== Share & URL state ===== */

function updateURL() {
  const ids = Route.ids;
  const url = new URL(window.location.href);
  if (ids.length > 0) {
    url.searchParams.set('route', ids.join(','));
  } else {
    url.searchParams.delete('route');
  }
  // Persist language in URL for sharing
  if (I18N._lang !== 'ru') {
    url.searchParams.set('lang', I18N._lang);
  } else {
    url.searchParams.delete('lang');
  }
  history.replaceState(null, '', url.toString());
}

function getShareURL() {
  const ids = Route.ids;
  var base = 'https://map.thaigo.rent/';
  var params = [];
  if (ids.length > 0) params.push('route=' + ids.join(','));
  if (I18N._lang !== 'ru') params.push('lang=' + I18N._lang);
  return base + (params.length > 0 ? '?' + params.join('&') : '');
}

/* ===== CTA links (for bottom buttons — to ThaiGo) ===== */

function buildWaLink(route, stats) {
  if (route.length < 2) {
    return 'https://wa.me/66822545737?text=' +
      encodeURIComponent(t('share.wa_default'));
  }
  var stops = route.map(function (s, i) {
    return (i + 1) + '. ' + (tp(s.id, 'name') || s.name);
  }).join('\n');
  var msg = t('share.wa_route', {
    stops: stops,
    km: stats.km.toFixed(1),
    time: formatTime(stats.mins),
    fuel: stats.fuel
  });
  return 'https://wa.me/66822545737?text=' + encodeURIComponent(msg);
}

function buildTgLink(route, stats) {
  if (route.length < 2) {
    return 'https://t.me/ThaiGoSale1';
  }
  var stops = route.map(function (s, i) {
    return (i + 1) + '. ' + (tp(s.id, 'name') || s.name);
  }).join('\n');
  var msg = t('share.wa_route', {
    stops: stops,
    km: stats.km.toFixed(1),
    time: formatTime(stats.mins),
    fuel: stats.fuel
  });
  return 'https://t.me/ThaiGoSale1?text=' + encodeURIComponent(msg);
}

function buildGoogleMapsLink(route) {
  if (route.length < 2) return '';
  var origin = route[0].lat + ',' + route[0].lng;
  var destination = route[route.length - 1].lat + ',' + route[route.length - 1].lng;
  var waypoints = '';
  if (route.length > 2) {
    waypoints = '&waypoints=' + route.slice(1, -1).map(function (p) {
      return p.lat + ',' + p.lng;
    }).join('|');
  }
  return 'https://www.google.com/maps/dir/?api=1&origin=' + origin +
    '&destination=' + destination + waypoints + '&travelmode=driving';
}

/* ===== Companion share (send to friend) ===== */

function buildCompanionMsg(route, stats) {
  if (route.length < 2) return '';
  var link = getShareURL();
  var stops = route.map(function (s, i) {
    return (i + 1) + '. ' + s.icon + ' ' + (tp(s.id, 'name') || s.name);
  }).join('\n');
  var msg = t('share.companion', {
    stops: stops,
    km: stats.km.toFixed(1),
    time: formatTime(stats.mins),
    fuel: stats.fuel,
    link: link
  });
  return msg;
}

function shareCompanionWA(route, stats) {
  var msg = buildCompanionMsg(route, stats);
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}

function shareCompanionTG(route, stats) {
  var msg = buildCompanionMsg(route, stats);
  window.open('https://t.me/share/url?url=' + encodeURIComponent(getShareURL()) +
    '&text=' + encodeURIComponent(msg), '_blank');
}

/* ===== Copy link ===== */

function copyShareLink() {
  var url = getShareURL();
  navigator.clipboard.writeText(url).then(function () {
    showToast(t('toast.link_copied'));
  }).catch(function () {
    // Fallback for HTTP
    var ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(t('toast.link_copied'));
    } catch (e) {
      showToast(t('toast.copy_failed'), 'error');
    }
    document.body.removeChild(ta);
  });
}

/* ===== Save trip (bookmark URL) ===== */

function saveTripBookmark() {
  var url = getShareURL();
  navigator.clipboard.writeText(url).then(function () {
    showToast(t('toast.link_saved'));
  }).catch(function () {
    showToast(t('toast.link_save_fallback', { url: url }));
  });
}

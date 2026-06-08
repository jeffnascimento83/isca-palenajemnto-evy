/* =========================================================
   Tracking — Meta Pixel + GA4
   Carrega os snippets apenas se os IDs estiverem definidos em config.js
   ========================================================= */
(function () {
  var cfg = window.EVY_CONFIG || {};

  // ---- Meta Pixel ----
  if (cfg.metaPixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', cfg.metaPixelId);
    window.fbq('track', 'PageView');
  }

  // ---- Google Analytics 4 ----
  if (cfg.ga4Id) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.ga4Id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', cfg.ga4Id);
  }

  // ---- Helper unificado ----
  window.evyTrack = function (eventName, params) {
    params = params || {};
    try { if (window.fbq) window.fbq('track', eventName, params); } catch (e) {}
    try { if (window.gtag) window.gtag('event', eventName, params); } catch (e) {}
  };
})();

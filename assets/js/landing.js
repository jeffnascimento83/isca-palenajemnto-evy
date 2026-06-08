/* =========================================================
   Landing — modal, máscara de telefone, submit, UTM
   ========================================================= */
(function () {
  var modal = document.getElementById('modal');
  var firstField = function () { return modal && modal.querySelector('input, select, textarea, button'); };
  var lastFocused = null;

  // ---- UTM passthrough ----
  function getQuery() {
    var params = new URLSearchParams(window.location.search);
    var out = {};
    params.forEach(function (v, k) { out[k] = v; });
    return out;
  }
  function utmQueryString() {
    var q = getQuery();
    var keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'];
    var pairs = [];
    keys.forEach(function (k) { if (q[k]) pairs.push(encodeURIComponent(k) + '=' + encodeURIComponent(q[k])); });
    return pairs.length ? ('?' + pairs.join('&')) : '';
  }

  // ---- Modal ----
  window.openModal = function () {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var f = firstField(); if (f) f.focus(); }, 50);
    if (window.evyTrack) window.evyTrack('Lead', { content_name: 'abriu_modal' });
  };
  window.closeModal = function () {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  };
  window.closeOuter = function (e) { if (e.target === modal) window.closeModal(); };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) window.closeModal();
  });

  // Foco trap simples
  modal && modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusables = modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // ---- Máscara de telefone BR ----
  var tel = document.getElementById('f-wpp');
  if (tel) {
    tel.addEventListener('input', function (e) {
      var v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6)      v = '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7);
      else if (v.length > 2) v = '(' + v.slice(0,2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      e.target.value = v;
    });
  }

  // Normaliza @ do Instagram
  var ig = document.getElementById('f-ig');
  if (ig) {
    ig.addEventListener('blur', function (e) {
      var v = e.target.value.trim().replace(/^@+/, '');
      if (v) e.target.value = '@' + v;
    });
  }

  // ---- Envio do lead ----
  // Substitua o corpo desta função quando definir a integração
  // (webhook, Google Forms, WhatsApp, ActiveCampaign etc.).
  async function sendLead(payload) {
    var cfg = window.EVY_CONFIG || {};
    if (!cfg.leadWebhookUrl) return true; // sem destino: apenas redireciona
    try {
      await fetch(cfg.leadWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return true;
    } catch (err) {
      console.warn('Falha ao enviar lead:', err);
      return true; // não bloqueia a UX
    }
  }

  window.handleSubmit = async function (e) {
    e.preventDefault();
    var form = e.target;
    var fd = new FormData(form);
    var payload = {};
    fd.forEach(function (v, k) { payload[k] = v; });
    payload.nome     = (document.getElementById('f-nome')    || {}).value || '';
    payload.email    = (document.getElementById('f-email')   || {}).value || '';
    payload.whatsapp = (document.getElementById('f-wpp')     || {}).value || '';
    payload.instagram= (document.getElementById('f-ig')      || {}).value || '';
    payload.desafios = (document.getElementById('f-desafios')|| {}).value || '';
    payload.faturamento = (document.getElementById('f-fat')  || {}).value || '';
    payload.utm = getQuery();
    payload.timestamp = new Date().toISOString();

    try { localStorage.setItem('evy_lead_draft', JSON.stringify(payload)); } catch (_) {}

    if (window.evyTrack) window.evyTrack('CompleteRegistration', { content_name: 'aula_planejamento' });

    var btn = form.querySelector('.form-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

    await sendLead(payload);

    var dest = (window.EVY_CONFIG && window.EVY_CONFIG.thankYouPath) || 'obrigado.html';
    window.location.href = dest + utmQueryString();
  };
})();

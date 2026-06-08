/* =========================================================
   Modo Editor (?edit=1)
   Ativa contenteditable, toolbar A/B, exportação e reset.
   ========================================================= */
(function () {
  var params = new URLSearchParams(window.location.search);
  var editMode = params.get('edit') === '1' || window.location.hash === '#edit';
  if (!editMode) return;

  // Carrega CSS do editor sob demanda
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assets/css/editor.css';
  document.head.appendChild(link);

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    document.body.classList.add('ab-mode');

    // Toolbar
    var bar = document.createElement('div');
    bar.className = 'ab-toolbar';
    bar.innerHTML =
      '<span>✦ TESTE A/B</span>' +
      '<p>Campos com borda amarela são editáveis — clique para alterar.</p>' +
      '<button class="ab-btn sec" type="button" id="ab-export">Exportar textos</button>' +
      '<button class="ab-btn" type="button" id="ab-reset">Restaurar original</button>';
    document.body.insertBefore(bar, document.body.firstChild);

    // Ativa contenteditable e badges nos elementos marcados com data-ab
    var fields = document.querySelectorAll('[data-ab]');
    fields.forEach(function (el) {
      el.classList.add('abe');
      el.setAttribute('contenteditable', 'true');
      el.dataset.orig = el.innerHTML;
      var badge = document.createElement('span');
      badge.className = 'eb';
      badge.textContent = '✎ ' + (el.getAttribute('data-ab') || el.id || 'Campo');
      el.appendChild(badge);
    });

    document.getElementById('ab-export').addEventListener('click', function () {
      var out = '=== TEXTOS – TESTE A/B ===\n\n';
      document.querySelectorAll('.abe').forEach(function (el) {
        var badge = el.querySelector('.eb');
        var label = badge ? badge.textContent.replace('✎ ', '') : el.id;
        var text = el.innerText.replace(/✎.*$/gm, '').trim();
        out += '[' + label + ']\n' + text + '\n\n';
      });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([out], { type: 'text/plain' }));
      a.download = 'ab-textos.txt';
      a.click();
    });

    document.getElementById('ab-reset').addEventListener('click', function () {
      if (!confirm('Restaurar todos os textos originais?')) return;
      document.querySelectorAll('.abe').forEach(function (el) {
        var orig = el.dataset.orig;
        if (!orig) return;
        el.innerHTML = orig;
        var badge = document.createElement('span');
        badge.className = 'eb';
        badge.textContent = '✎ ' + (el.getAttribute('data-ab') || el.id || 'Campo');
        el.appendChild(badge);
      });
    });
  });
})();

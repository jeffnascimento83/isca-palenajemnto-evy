/* =========================================================
   Evy Monteiro — Configuração global
   Centralize aqui os IDs dos pixels e o destino do formulário.
   Deixe a string vazia '' para desativar um snippet.
   ========================================================= */
window.EVY_CONFIG = {
  // Meta Pixel (Facebook/Instagram Ads) — ex: '1234567890123456'
  metaPixelId: '',

  // Google Analytics 4 — ex: 'G-XXXXXXXXXX'
  ga4Id: '',

  // Webhook do formulário (deixe vazio enquanto não tiver).
  // Quando definido, sendLead() fará POST JSON para esta URL.
  leadWebhookUrl: 'https://script.google.com/macros/s/AKfycbwUWAK1fnX3ecZe9n0zjZSyYEh1QCTdLMyRXcMKbBb3MiSlnBPJ05RlchZh8QGhZxcqNA/exec',

  // Página de destino após envio do formulário
  thankYouPath: 'obrigado.html'
};

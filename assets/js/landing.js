function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});

async function handleSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('leadForm');
  const formData = new FormData(form);
  
  const utms = new URLSearchParams(window.location.search);
  
  const params = new URLSearchParams();
  params.append('nome', formData.get('nome'));
  params.append('email', formData.get('email'));
  params.append('whatsapp', formData.get('whatsapp'));
  params.append('instagram', formData.get('instagram'));
  params.append('funcionarios', formData.get('funcionarios'));
  params.append('consciencia', formData.get('consciencia'));
  params.append('desafios', formData.get('desafios'));
  params.append('urgencia', formData.get('urgencia'));
  params.append('faturamento', formData.get('faturamento'));
  params.append('utm_source', utms.get('utm_source') || '');
  params.append('utm_medium', utms.get('utm_medium') || '');
  params.append('utm_campaign', utms.get('utm_campaign') || '');
  params.append('utm_content', utms.get('utm_content') || '');
  params.append('utm_term', utms.get('utm_term') || '');

  console.log('📤 Enviando:', params.toString());

  try {
    await fetch('https://script.google.com/macros/s/AKfycbzHPfXgptBo8kWj6xDQMj4tK82NVLy0DEGy5yCSU970Ws6FkpuSvgp8Ty7EWgb_2uEaDg/exec', {
      method: 'POST',
      body: params,
    }).catch(() => {});

    window.location.href = '/obrigado.html';
  } catch (error) {
    window.location.href = '/obrigado.html';
  }
}

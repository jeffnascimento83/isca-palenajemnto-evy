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
  
  const payload = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    whatsapp: formData.get('whatsapp'),
    instagram: formData.get('instagram'),
    funcionarios: formData.get('funcionarios'),
    consciencia: formData.get('consciencia'),
    desafios: formData.get('desafios'),
    urgencia: formData.get('urgencia'),
    faturamento: formData.get('faturamento'),
    utm_source: utms.get('utm_source') || '',
    utm_medium: utms.get('utm_medium') || '',
    utm_campaign: utms.get('utm_campaign') || '',
    utm_content: utms.get('utm_content') || '',
    utm_term: utms.get('utm_term') || ''
  };

  console.log('📤 Enviando JSON:', payload);

 try {
  await fetch('https://script.google.com/macros/s/AKfycbzHPfXgptBo8kWj6xDQMj4tK82NVLy0DEGy5yCSU970Ws6FkpuSvgp8Ty7EWgb_2uEaDg/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  }).catch(() => {});

    window.location.href = '/obrigado.html';
  } catch (error) {
    window.location.href = '/obrigado.html';
  }
}

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
    utm_source: utms.get('utm_source'),
    utm_medium: utms.get('utm_medium'),
    utm_campaign: utms.get('utm_campaign'),
    utm_content: utms.get('utm_content'),
    utm_term: utms.get('utm_term'),
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbznx2B-159OYZ40ppFeIKyuLXZTydv-Nit1e_uB31czgkUcjqb20g9Zqzk0bwpGVLRIQw/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('✅ Enviado para Google Sheets!');
    window.location.href = '/obrigado.html';
  } catch (error) {
    console.error('Erro:', error);
    window.location.href = '/obrigado.html';
  }
}

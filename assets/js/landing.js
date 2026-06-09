function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});

function getUTMParameters() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
  };
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('leadForm');
  const formData = new FormData(form);
  const utms = getUTMParameters();

  const data = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    whatsapp: formData.get('whatsapp'),
    instagram: formData.get('instagram'),
    funcionarios: formData.get('funcionarios'),
    consciencia: formData.get('consciencia'),
    desafios: formData.get('desafios'),
    urgencia: formData.get('urgencia'),
    faturamento: formData.get('faturamento'),
    utm_source: utms.utm_source,
    utm_medium: utms.utm_medium,
    utm_campaign: utms.utm_campaign,
    utm_content: utms.utm_content,
    utm_term: utms.utm_term,
  };

  try {
    const response = await fetch('https://wiseleads.byevymonteiro.com/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `Erro ${response.status}`);
    window.location.href = `/obrigado.html?lead_id=${result.leadId}`;
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    console.log('Dados enviados:', data);
    alert('Erro ao processar formulário: ' + (error.message || 'Tente novamente'));
  }
}

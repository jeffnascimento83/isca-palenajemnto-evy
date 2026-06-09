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
    isca_type: 'planejamento',
    status: 'novo_lead'
  };

  try {
    const response = await fetch('https://qwttkxhbhnjhvakfddao.supabase.co/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3dHRreGhiaG5qaHZha2ZkZGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjUzNTIsImV4cCI6MTk5NjY0MTM1Mn0.p3T4xJi3FKQKPJsKwNZLxG96MxJ4OdIGVMHHEqPDRKQ',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3dHRreGhiaG5qaHZha2ZkZGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjUzNTIsImV4cCI6MTk5NjY0MTM1Mn0.p3T4xJi3FKQKPJsKwNZLxG96MxJ4OdIGVMHHEqPDRKQ'
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || result.error || 'Erro');
    
    window.location.href = `/obrigado.html?lead_id=${result[0]?.id || 'ok'}`;
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar formulário: ' + (error.message || 'Tente novamente'));
  }
}

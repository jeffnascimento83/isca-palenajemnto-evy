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
    isca_type: 'planejamento',
    status: 'novo_lead'
  };

  console.log('📤 Enviando:', payload);

  try {
    const response = await fetch('https://qwttkxhbhnjhvakfddao.supabase.co/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3dHRreGhiaG5qaHZha2ZkZGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjUzNTIsImV4cCI6MTk5NjY0MTM1Mn0.p3T4xJi3FKQKPJsKwNZLxG96MxJ4OdIGVMHHEqPDRKQ',
      },
      body: JSON.stringify(payload),
    });

    console.log('📊 Status:', response.status);
    const result = await response.json();
    console.log('✅ Resposta:', result);

    if (response.status === 201 || response.ok) {
      console.log('🎉 Sucesso! Redirecionando...');
      window.location.href = '/obrigado.html';
    } else {
      console.error('❌ Erro:', result);
      alert('Erro: ' + (result.message || result.error || 'Desconhecido'));
    }
  } catch (error) {
    console.error('💥 Erro de rede:', error);
    alert('Erro de conexão: ' + error.message);
  }
}

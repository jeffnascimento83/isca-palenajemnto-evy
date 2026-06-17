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
    nome: formData.get('nome') || '',
    email: formData.get('email') || '',
    whatsapp: formData.get('whatsapp') || '',
    instagram: formData.get('instagram') || '',
    funcionarios: formData.get('funcionarios') || '',
    consciencia: formData.get('consciencia') || '',
    desafios: formData.get('desafios') || '',
    urgencia: formData.get('urgencia') || '',
    faturamento: formData.get('faturamento') || '',
    utm_source: utms.get('utm_source') || '',
    utm_medium: utms.get('utm_medium') || '',
    utm_campaign: utms.get('utm_campaign') || '',
    utm_content: utms.get('utm_content') || '',
    utm_term: utms.get('utm_term') || '',
    isca_type: 'planejamento',
    status: 'novo_lead'
  };

  console.log('📤 Enviando para Supabase:', payload);
  console.log('Fields captured:', {
    funcionarios: formData.get('funcionarios'),
    consciencia: formData.get('consciencia'),
    desafios: formData.get('desafios'),
    urgencia: formData.get('urgencia'),
    faturamento: formData.get('faturamento')
  });

  try {
    const response = await fetch(
      `${window.EVY_CONFIG.supabaseUrl}/rest/v1/leads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': window.EVY_CONFIG.supabaseAnonKey,
          'Authorization': `Bearer ${window.EVY_CONFIG.supabaseAnonKey}`
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Erro ao inserir lead:', error);
      throw new Error(error.message || 'Erro ao inserir lead');
    }

    console.log('✅ Lead inserido com sucesso!');
    window.location.href = '/obrigado.html';
  } catch (error) {
    console.error('❌ Erro ao enviar formulário:', error);
    alert('Ocorreu um erro ao processar sua inscrição. Tente novamente ou entre em contato conosco.');
  }
}

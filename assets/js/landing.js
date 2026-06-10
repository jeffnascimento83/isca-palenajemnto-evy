// v3 - Fixed initialization
let supabase = null;

// Espera a biblioteca Supabase carregar
window.addEventListener('load', () => {
  const { createClient } = window.supabase;
  supabase = createClient(
    'https://qwttkxhbhnjhvakfddao.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3dHRreGhiaG5qaHZha2ZkZGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjUzNTIsImV4cCI6MTk5NjY0MTM1Mn0.p3T4xJi3FKQKPJsKwNZLxG96MxJ4OdIGVMHHEqPDRKQ'
  );
  console.log('✅ Supabase inicializado');
});

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
  
  if (!supabase) {
    alert('Erro: Supabase não inicializado. Tente novamente.');
    return;
  }
  
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
    utm_source: utms.get('utm_source') || null,
    utm_medium: utms.get('utm_medium') || null,
    utm_campaign: utms.get('utm_campaign') || null,
    utm_content: utms.get('utm_content') || null,
    utm_term: utms.get('utm_term') || null,
    isca_type: 'planejamento',
    status: 'novo_lead'
  };

  console.log('📤 Enviando para Supabase:', payload);

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([payload])
      .select();

    if (error) {
      console.error('❌ Erro Supabase:', error);
      alert('Erro: ' + error.message);
      return;
    }

    console.log('✅ Lead salvo com sucesso!', data);
    window.location.href = '/obrigado.html';
  } catch (error) {
    console.error('💥 Erro ao enviar:', error);
    alert('Erro: ' + error.message);
  }
}

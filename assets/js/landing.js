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
  
  formData.append('utm_source', utms.get('utm_source') || '');
  formData.append('utm_medium', utms.get('utm_medium') || '');
  formData.append('utm_campaign', utms.get('utm_campaign') || '');
  formData.append('utm_content', utms.get('utm_content') || '');
  formData.append('utm_term', utms.get('utm_term') || '');

  try {
    await fetch('https://script.google.com/macros/s/AKfycbznx2B-159OYZ40ppFeIKyuLXZTydv-Nit1e_uB31czgkUcjqb20g9Zqzk0bwpGVLRIQw/exec', {
      method: 'POST',
      body: formData,
    }).catch(() => {});

    window.location.href = '/obrigado.html';
  } catch (error) {
    window.location.href = '/obrigado.html';
  }
}

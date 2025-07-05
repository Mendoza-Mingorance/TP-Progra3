const deleteButtons = document.querySelectorAll('.deleteBtn');
const deleteModal = document.getElementById('deleteModal');
const cancelDelete = document.getElementById('cancelDelete');
const deleteForm = document.getElementById('deleteForm');
const deleteProductIdInput = document.getElementById('deleteProductId');
const activateButtons = document.querySelectorAll('.activateBtn');
const confirmDelete = document.getElementById('confirmDelete');

deleteButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.id;
    deleteProductIdInput.value = productId; 
    deleteModal.classList.remove('hidden');
  });
});

cancelDelete.addEventListener('click', () => {
  deleteModal.classList.add('hidden');
});

deleteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const productId = deleteProductIdInput.value;

  try {
    const res = await fetch(`/admin/products/deactivate/${productId}`, {
      method: 'POST'
    });

    if (res.ok) {
      deleteModal.classList.add('hidden');
      window.location.reload();
    } else {
      console.error('Error al desactivar el producto');
    }
  } catch (err) {
    console.error('Error al enviar solicitud de desactivación', err);
  }
});

activateButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const productId = button.getAttribute('data-id');
    try {
      const res = await fetch(`/admin/products/activate/${productId}`, {
        method: 'POST'
      });
      if (res.ok) {
        window.location.reload(); 
      } else {
        console.error('Error en la respuesta de activación');
      }
    } catch (err) {
      console.error('Error al enviar solicitud de activación', err);
    }
  });
});

confirmDelete.addEventListener('click', async () => {
  const productId = deleteProductIdInput.value;

  try {
    const res = await fetch(`/admin/products/delete/${productId}`, {
      method: 'POST'
    });

    if (res.ok) {
      deleteModal.classList.add('hidden');
      window.location.reload();
    } else {
      console.error('Error al eliminar el producto');
    }
  } catch (err) {
    console.error('Error al enviar solicitud de eliminación', err);
  }
});

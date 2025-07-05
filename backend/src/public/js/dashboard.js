

const deleteButtons = document.querySelectorAll('.deleteBtn');
const deleteModal = document.getElementById('deleteModal');
const cancelDelete = document.getElementById('cancelDelete');
const deleteForm = document.getElementById('deleteForm');
const deleteProductIdInput = document.getElementById('deleteProductId');

deleteButtons.forEach((btn) => {
btn.addEventListener('click', () => {
    const productId = btn.dataset.id;
    deleteProductIdInput.value = productId;
    deleteForm.action = `/admin/delete`;
    deleteModal.classList.remove('hidden');
});
});

cancelDelete.addEventListener('click', () => {
deleteModal.classList.add('hidden');
});
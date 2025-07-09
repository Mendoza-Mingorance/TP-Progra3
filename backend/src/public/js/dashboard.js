const deleteButtons = document.querySelectorAll('.deleteBtn');
const deleteModal = document.getElementById('deleteModal');
const deleteUserModal = document.getElementById('deleteUserModal');
const cancelDelete = document.getElementById('cancelDelete');
const cancelUserDelete = document.getElementById('cancelUserDelete');
const deleteForm = document.getElementById('deleteForm');
const deleteProductIdInput = document.getElementById('deleteProductId');
const deleteUserBtns = document.querySelectorAll('.deleteUserBtn');
const deleteUserIdInput = document.getElementById('deleteUserId');

const activateButtons = document.querySelectorAll('.activateBtn');
const confirmDelete = document.getElementById('confirmDelete');
const confirmUserDelete = document.getElementById('confirmUserDelete');
const activateModal = document.getElementById('activateModal');
const cancelActivate = document.getElementById('cancelActivate');
const confirmActivate = document.getElementById('confirmActivate');
const activateProductIdInput = document.getElementById('activateProductId');

const editBtn = document.querySelectorAll('.editBtn');

const tabBtn = document.querySelectorAll('.tab-btn');
const sectionsTabs = document.querySelectorAll('.tab-content');

// Modal de eliminacion de productos

deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const productId = btn.dataset.id;
        deleteProductIdInput.value = productId;
        deleteModal.classList.remove('hidden');
    });
});

cancelDelete.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
});

deleteForm.addEventListener('submit', async e => {
    e.preventDefault();
    const productId = deleteProductIdInput.value;

    try {
        const res = await fetch(`/admin/products/deactivate/${productId}`, {
            method: 'POST',
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

confirmDelete.addEventListener('click', async () => {
    const productId = deleteProductIdInput.value;

    try {
        const res = await fetch(`/admin/products/delete/${productId}`, {
            method: 'POST',
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
// -------------------------- //

// Modal de activacion de productos

activateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const productId = btn.dataset.id;
        activateProductIdInput.value = productId;
        activateModal.classList.remove('hidden');
    });
});

cancelActivate.addEventListener('click', () => {
    activateModal.classList.add('hidden');
});

confirmActivate.addEventListener('click', async () => {
    const productId = activateProductIdInput.value;

    try {
        const res = await fetch(`/admin/products/activate/${productId}`, {
            method: 'POST',
        });

        if (res.ok) {
            activateModal.classList.add('hidden');
            window.location.reload();
        } else {
            console.error('Error al activar el producto');
        }
    } catch (err) {
        console.error('Error en solicitud de activación', err);
    }
});

// -------------------------------- //

// Modal de eliminacion de Usuarios 

deleteUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const userId = btn.dataset.id;
        
        deleteUserIdInput.value = userId;
        deleteUserModal.classList.remove('hidden');
    });
});

cancelUserDelete.addEventListener('click', () => {
    deleteUserModal.classList.add('hidden');
});

confirmUserDelete.addEventListener('click', async (e) => {
    e.preventDefault();
    const deleteUserId = deleteUserIdInput.value;
    
    try {
        const res = await fetch(`/admin/users/delete/${deleteUserId}`, {
            method: 'POST',
        });
    
        if (res.ok) { 
            deleteUserModal.classList.add('hidden');
            window.location.reload();
        } else {
            console.error('Error al eliminar el usuario');
        }
    } catch (err) {
        console.error('Error al enviar solicitud de eliminación de usuario', err);
    }
});


// -------------------------------- //


editBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const productId = btn.dataset.id;
        window.location.href = `/admin/modificaciones/?id=${productId}`;
    });
});

tabBtn.forEach(btn => {
    btn.addEventListener('click',()=>{
        tabBtn.forEach(b => b.classList.remove('activeSection'))
        sectionsTabs.forEach(s => s.classList.remove('activeSection'))

        btn.classList.add('activeSection')
        const targetId = btn.getAttribute('data-target')
        document.getElementById(targetId).classList.add('activeSection')
    });
});

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

//Filtros y paginado
const formFilter = document.querySelector('.products-section-filters');
const paginationBtn = document.querySelectorAll('.pagination-btn');
const tableChange = document.querySelector('#products-section');
const searchBar = document.querySelector('.search-bar');

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

confirmUserDelete.addEventListener('click', async e => {
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

//Vavegacion entre tablas
tabBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtn.forEach(b => b.classList.remove('activeSection'));
        sectionsTabs.forEach(s => s.classList.remove('activeSection'));

        btn.classList.add('activeSection');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('activeSection');
    });
});

//Filtros y paginado
const updateQueryPath = params => {
    const path = new URL(window.location);
    Object.keys(params).forEach(k => {
        if (params[k] !== null && params[k] !== undefined && params[k] !== '') {
            path.searchParams.set(k, params[k]);
        } else {
            path.searchParams.delete(k);
        }
    });
    window.location.href = path.toString();
};

function getQueryPath() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}
paginationBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const page = btn.dataset.page;
        const currentParams = getQueryPath();
        updateQueryPath({
            ...currentParams,
            offset: page,
        });
    });
});

searchBar.addEventListener('submit', () => {
    let valueInput = searchBar.value.toLowerCase().trim();
    console.log(valueInput);
    
    let currentParams = getQueryPath();
    console.log(currentParams);
    
    updateQueryPath({
        ...currentParams,
        name: valueInput,
        
    });
});



const form = document.getElementById('adminUserForm');
const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');

const errorModal = document.getElementById('errorModal');
const closeErrorModal = document.getElementById('closeErrorModal');
const errorMessage = document.getElementById('errorMessage');
const createUserSpan = document.querySelector('.createUserSpan');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (e) => {
e.preventDefault();
    createUserSpan.classList.add('hidden');
    loader.classList.remove('hidden');

    const formData = new FormData(form);
    const data = {
        email: formData.get('email'),
        name: formData.get('name'),
        surname: formData.get('surname'),
        password: formData.get('password'),
        role: formData.get('role')
    };
    
    try {
        const res = await fetch('/admin/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });

        if (res.ok) {
            successModal.classList.remove('hidden');
            form.reset();
        } else {
            errorModal.classList.remove('hidden'); 
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Ocurrió un error al registrar el usuario.');
    } finally {
        loader.classList.add('hidden');
        createUserSpan.classList.remove('hidden');
    }
});

closeSuccessModal.addEventListener('click', () => {
successModal.classList.add('hidden');
});

closeErrorModal.addEventListener('click', () => {
    errorModal.classList.add('hidden');
});


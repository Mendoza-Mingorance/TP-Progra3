

const form = document.getElementById('adminUserForm');
const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');

const errorModal = document.getElementById('errorModal');
const closeErrorModal = document.getElementById('closeErrorModal');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async (e) => {
e.preventDefault();

    const formData = new FormData(form);
    const data = {
        email: formData.get('email'),
        name: formData.get('name'),
        surname: formData.get('surname'),
        password: formData.get('password')
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
            const result = await res.json();
            alert(result.message); 
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Ocurrió un error al registrar el usuario.');
    }
});

closeSuccessModal.addEventListener('click', () => {
successModal.classList.add('hidden');
});

closeErrorModal.addEventListener('click', () => {
    errorModal.classList.add('hidden');
});


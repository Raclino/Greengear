document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.querySelector('button[name="action"][value="update"]');
    const deleteButton = document.querySelector('button[name="action"][value="delete"]');

    updateButton.addEventListener('click', async function() {
        // Récupérer les données du formulaire
        const formData = new FormData(document.querySelector('form'));
        const userId = window.location.pathname.split('/')[2]; // Assurez-vous que votre formulaire a un champ caché avec l'ID de l'utilisateur

        // Créer un objet à envoyer dans la requête
        const userData = {
            username: formData.get('username'),
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            email: formData.get('email'),
            role: formData.get('role')
        };

        // Envoyer la requête de mise à jour
        var response = await fetch(`http://localhost:8000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La mise à jour de l\'utilisateur a échoué');
            }
            window.location.href = `/users/${userId}`;
            return response;
        })
        .catch();
    });

    deleteButton.addEventListener('click', async function() {
        // Récupérer l'ID de l'utilisateur à supprimer
        const userId = window.location.pathname.split('/')[2]; 

        // Envoyer la requête de suppression
        var response = await fetch(`http://localhost:8000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajouter le header Authorization
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La suppression de l\'utilisateur a échoué');
            }
            window.location.href = '/backOffice';
            return response;
        })
        .catch();
    });
});

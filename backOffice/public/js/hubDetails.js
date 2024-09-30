document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.querySelector('button[name="action"][value="update"]');
    const deleteButton = document.querySelector('button[name="action"][value="delete"]');

    updateButton.addEventListener('click', async function() {
        // Récupérer les données du formulaire
        const formData = new FormData(document.querySelector('form'));
        const hubId = window.location.pathname.split('/')[2];

        // Créer un objet à envoyer dans la requête
        const hubData = {
            hub_name: formData.get('hub_name')
        };

        // Envoyer la requête de mise à jour
        var response = await fetch(`http://localhost:8000/api/hub/${hubId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(hubData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La mise à jour du jardin a échoué');
            }
            window.location.href = `/hubs/${hubId}`;
            return response;
        })
        .catch();
    });

    deleteButton.addEventListener('click', async function() {
        // Récupérer l'ID du jardin à supprimer
        const hubId = window.location.pathname.split('/')[2]; 

        // Envoyer la requête de suppression
        var response = await fetch(`http://localhost:8000/api/hub/${hubId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajouter le header Authorization
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La suppression du jardin a échoué');
            }
            window.location.href = '/backOffice';
            return response;
        })
        .catch();
    });
});

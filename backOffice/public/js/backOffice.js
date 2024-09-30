document.addEventListener('DOMContentLoaded', function() {
    // var navbarHeight = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = `${ 160}px`;
    fetchDataForSection('users', 'http://localhost:8000/api/users');
    fetchDataForSection('gardens', 'http://localhost:8000/api/gardens');
    // fetchDataForSection('plants', 'http://localhost:8000/api/plants');
    // fetchDataForSection('sensors', 'http://localhost:8000/api/sensors');
    fetchDataForSection('hub', 'http://localhost:8000/api/hub/all');
});

function fetchDataForSection(sectionName, apiUrl) {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse réseau non ok');
        }
        return response.json();
    })
    .then(data => {
        populateTable(data, `${sectionName}-table`);
    })
    .catch(error => console.error(`Erreur lors de la récupération des données pour ${sectionName}:`, error));
}

function populateTable(data, tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        
        Object.entries(item).forEach(([key, value]) => {
            const cell = document.createElement('td');
            cell.textContent = key === 'created_at' || key === 'updated_at' ? formatDate(value) : value;
            row.appendChild(cell);
        });

        row.addEventListener('click', function() {
            const itemId = item.id;
            window.location.href = `/${tableId.split('-')[0]}/${itemId}`;
        });

        tableBody.appendChild(row);
    });
}

function creerNouveauHub(){
    window.location.href = "/createHub"
}

function importerHubsDepuisCSV(){
    console.log( "Importation à fair !" )
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
    };
    return date.toLocaleDateString('fr-FR', options).replace(',', ' à');
}

function searchInTable(inputElement, sectionId) {
    var filter, table, tr, td, i, txtValue;
    filter = inputElement.value.toUpperCase();
    table = document.getElementById(`${sectionId}-table`);
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        let rowMatches = false;
        td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    rowMatches = true;
                    break;
                }
            }
        }
        tr[i].style.display = rowMatches ? "" : "none";
    }
}

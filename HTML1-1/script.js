// Globālie mainīgie datu glabāšanai
let vielas = [];
let inventars = [];
let users = [];

// Datu ielāde no JSON failiem
async function loadJSON() {
    try {
        // Ielādē vielas
        const vielasResponse = await fetch('vielas.json');
        vielas = await vielasResponse.json();

        // Ielādē inventāru
        const inventarsResponse = await fetch('inventars.json');
        inventars = await inventarsResponse.json();

        // Ielādē lietotājus
        const usersResponse = await fetch('users.json');
        const usersData = await usersResponse.json();
        users = usersData.users;

        // Parādīt visus datus sākotnēji
        renderTable([...vielas, ...inventars, ...users]);
    } catch (error) {
        console.error('Kļūda, ielādējot JSON failus:', error);
    }
}

// Tabulas ģenerēšana
function renderTable(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = ''; // Notīra tabulu

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id || '-'}</td>
            <td>${item.nosaukums || item.vards || '-'}</td>
            <td>${item.tips || item.loma || '-'}</td>
            <td>${item.apakstips || '-'}</td>
            <td>${item.skaits || '-'}</td>
            <td>${item.daudzums ? item.daudzums + ' ' + item.mervienibas : '-'}</td>
            <td>${item.komentari || item.Komentāri || '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Filtrēšanas funkcija
function filterData(type) {
    if (type === 'vielas') {
        renderTable(vielas);
    } else if (type === 'inventars') {
        renderTable(inventars);
    } else if (type === 'users') {
        renderTable(users);
    } else {
        renderTable([...vielas, ...inventars, ...users]); // Apvieno visus sarakstus
    }
}

// Kad lapa ir ielādēta, ielādēt JSON datus
window.onload = loadJSON;

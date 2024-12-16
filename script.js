// =========================
// DATU GLABĀŠANAI
// =========================
// Šie tukšie masīvi ir paredzēti datu glabāšanai no ielādētajiem JSON failiem.
// Tie būs pieejami globāli, lai datus varētu izmantot jebkurā funkcijā.
let vielas = [];
let inventars = [];
let users = [];

// =========================
// DATU IELĀDE
// =========================
/**
 * Funkcija, kas ielādē datus no JSON failiem, izmantojot `fetch`.
 * Ielādētie dati tiek saglabāti iepriekš definētajos globālajos masīvos.
 */
async function loadJSON() {
    try {
        // Nosūta HTTP pieprasījumu, lai ielādētu vielu datus no 'vielas.json'.
        // `fetch` izmanto, lai iegūtu faila saturu.
        const vielasResponse = await fetch('vielas.json');
        // Iegūto JSON datu pārvēršana JavaScript objektos, lai tos varētu izmantot programmā.
        vielas = await vielasResponse.json();
        console.log('Vielas dati:', vielas); // Izvada vielu datus konsolē diagnostikai.

        // Nosūta pieprasījumu, lai ielādētu inventāra datus no 'inventars.json'.
        const inventarsResponse = await fetch('inventars.json');
        // Iegūto JSON datu pārvēršana JavaScript objektos.
        inventars = await inventarsResponse.json();
        console.log('Inventāra dati:', inventars); // Izvada inventāra datus konsolē.

        // Nosūta pieprasījumu, lai ielādētu lietotāju datus no 'users.json'.
        const usersResponse = await fetch('users.json');
        // Pārvērš JSON saturu un piekļūst masīvam ar lietotājiem.
        const usersData = await usersResponse.json();
        users = usersData.users; // Saglabā lietotājus globālajā mainīgajā.
        console.log('Lietotāju dati:', users); // Izvada lietotāju datus konsolē.

        // Parāda visus datus tabulā pēc ielādes.
        // Funkcija `renderTable` apvieno visus datus un tos attēlo HTML tabulā.
        renderTable([...vielas, ...inventars, ...users]);
    } catch (error) {
        // Ja rodas kļūda (piemēram, fails nav pieejams), tā tiek izvadīta konsolē,
        // lai palīdzētu izstrādātājam saprast problēmu.
        console.error('Kļūda, ielādējot JSON failus:', error);
    }
}

// =========================
// TABULAS ĢENERĒŠANA
// =========================
/**
 * Funkcija, kas ģenerē tabulas rindas, pamatojoties uz nodotajiem datiem.
 * Tā attīra esošo tabulu un aizpilda to ar jauniem datiem.
 * @param {Array} data - Masīvs ar datiem, kas jāattēlo tabulā.
 */
function renderTable(data) {
    // Atrod HTML elementu <tbody>, kurā tiks ievietotas tabulas rindas.
    const tbody = document.querySelector('.data-table tbody');
	// Šī rinda atrod HTML elementu ar klasi `data-table` un <tbody>.
	// Tas ir nepieciešams, lai varētu pievienot vai noņemt tabulas rindas.
	// Ja šo rindu izlaiž, nevar aizpildīt tabulu ar datiem.
	
    // Notīra esošo tabulas saturu, lai nepieļautu datu dublēšanos.
    tbody.innerHTML = '';

    // Iterē (apstrādā) cauri katram masīva elementam.
    data.forEach(item => {
        // Izveido jaunu tabulas rindu (<tr>).
        const tr = document.createElement('tr');

        // Aizpilda tabulas rindu ar HTML šūnām (<td>) un datiem no objekta.
        // Piemēram, `item.id || '-'` nozīmē: ja `id` nav pieejams, tad rādīt '-'.
        tr.innerHTML = `
            <td>${item.id || '-'}</td> 
            <td>${item.nosaukums || item.vards || '-'}</td> 
            <td>${item.tips || item.loma || '-'}</td> 
            <td>${item.apakstips || '-'}</td>
            <td>${item.skaits || '-'}</td> 
            <td>${item.daudzums ? item.daudzums + ' ' + item.mervienibas : '-'}</td> 
            <td>${item.komentari || item.Komentāri || '-'}</td> 
        `;
				
        // Pievieno šo rindu tabulas ķermenim (<tbody>), lai to parādītu lietotājam.
        tbody.appendChild(tr);
    });

    // Izvada ziņojumu konsolē, lai apstiprinātu, ka tabula ir atjaunināta.
    console.log('Tabula atjaunināta ar datiem:', data);
}

// =========================
// FILTRĒŠANAS FUNKCIJA
// =========================
/**
 * Funkcija, kas filtrē datus pēc veida un ģenerē tabulu ar attiecīgajiem datiem.
 * @param {string} type - Filtra veids ('vielas', 'inventars', 'users' vai 'all').
 */
function filterData(type) {
    console.log('Aktivizēts filtrs:', type); // Izvada konsolē, kurš filtrs tika aktivizēts.

    // Pārbauda, kurš filtrs ir izvēlēts, un attiecīgi izsauc `renderTable`.
    if (type === 'vielas') {
        renderTable(vielas); // Parāda tabulā tikai vielas.
    } else if (type === 'inventars') {
        renderTable(inventars); // Parāda tabulā tikai inventāru.
    } else if (type === 'users') {
        renderTable(users); // Parāda tabulā tikai lietotājus.
    } else {
        renderTable([...vielas, ...inventars, ...users]); // Parāda visus datus.
    }
}

// =========================
// LAPAS IELĀDE
// =========================
/**
 * Kad lapa ir ielādēta, ielādē datus un piesaista filtrēšanas funkcijas pogām.
 */
window.onload = function () {
    // Ielādē JSON datus un parāda sākotnējo tabulu.
    loadJSON();

    // Piesaista funkcijas filtrēšanas pogām, izmantojot `id`:
    document.getElementById('showAll').onclick = () => filterData('all'); // Parāda visus datus.
    document.getElementById('showVielas').onclick = () => filterData('vielas'); // Parāda tikai vielas.
    document.getElementById('showInventars').onclick = () => filterData('inventars'); // Parāda tikai inventāru.
};

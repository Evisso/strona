// Lista wykładowców
const wykladowcy = ['Kańczurzewska', 'Gajda', 'Gleska', 'Robercik', 'Tomasz', 'Leśnik', 'Płuciennik', 'Kiwer', 'Kolwicz', 'Oleksik',
    'Derda', 'Piosik', 'Jagódka', 'Blandzi', 'Ziemkowska', 'Głuchy', 'Kasprzyk', 'Pietracho', 'Szyszka', 'Jankowska',
    'Gielniak', 'Walczak', 'Dębicka', 'Karolczak', 'Graczkowski xd', 'Morańda', 'Krawiecki', 'Prokop', 'Wiczyński',
    'Szczerbowski', 'Roman', 'Kasińska'];

let wybranaOsoba = null;  // Przechowuje klikniętego wykładowcę
let przypisaniWykladowcy = [];  // Lista przypisanych wykładowców

// Funkcja dodająca wykładowców na ekran
function wyswietlWykladowcow() {
    const listaElement = document.getElementById('wykladowcy-lista');
    listaElement.innerHTML = ''; // Czyszczenie listy przed ponownym wyświetleniem
    
    wykladowcy.forEach(wykladowca => {
        if (!przypisaniWykladowcy.includes(wykladowca)) {  // Sprawdzenie, czy wykładowca nie jest już przypisany
            const element = document.createElement('div');
            element.classList.add('wykladowca');
            element.textContent = wykladowca;
            element.addEventListener('click', () => wybierzWykladowce(wykladowca));
            listaElement.appendChild(element);
        }
    });
}

// Funkcja wybierająca wykładowcę
function wybierzWykladowce(wykladowca) {
    wybranaOsoba = wykladowca;
}

// Funkcja dodająca wykładowcę do komórki tabeli
function dodajOsobeDoKomorki(komorka) {
    if (wybranaOsoba && !przypisaniWykladowcy.includes(wybranaOsoba)) {
        if (!komorka.textContent) {
            komorka.textContent = wybranaOsoba;
            przypisaniWykladowcy.push(wybranaOsoba);  // Dodanie wykładowcy do listy przypisanych
        } else {
            komorka.textContent += ', ' + wybranaOsoba;
            przypisaniWykladowcy.push(wybranaOsoba);  // Dodanie wykładowcy do listy przypisanych
        }
        wybranaOsoba = null;  // Resetowanie wyboru osoby
        wyswietlWykladowcow();  // Odświeżenie listy wykładowców
    }
}

// Zapisanie stanu tabeli w localStorage
function zapiszPostepy() {
    const tabela = {};
    document.querySelectorAll('td').forEach(komorka => {
        const key = `${komorka.dataset.row}-${komorka.dataset.col}`;
        tabela[key] = komorka.textContent;
    });
    localStorage.setItem('tabela', JSON.stringify(tabela));
    localStorage.setItem('przypisaniWykladowcy', JSON.stringify(przypisaniWykladowcy));  // Zapis przypisanych wykładowców
    alert('Postępy zapisane!');  // Komunikat pojawi się tylko po zapisaniu postępów
}

// Załadowanie zapisanych postępów z localStorage
function zaladujPostepy() {
    const tabela = JSON.parse(localStorage.getItem('tabela'));
    const zapisaniWykladowcy = JSON.parse(localStorage.getItem('przypisaniWykladowcy'));
    
    if (zapisaniWykladowcy) {
        przypisaniWykladowcy = zapisaniWykladowcy;
    }

    if (tabela) {
        document.querySelectorAll('td').forEach(komorka => {
            const key = `${komorka.dataset.row}-${komorka.dataset.col}`;
            komorka.textContent = tabela[key] || '';
        });
    }
    wyswietlWykladowcow();  // Wyświetlenie dostępnych wykładowców po załadowaniu postępów
}

// Resetowanie tabeli
function resetujPostepy() {
    document.querySelectorAll('td').forEach(komorka => {
        komorka.textContent = '';
    });
    przypisaniWykladowcy = [];  // Zresetowanie przypisanych wykładowców
    localStorage.removeItem('tabela');
    localStorage.removeItem('przypisaniWykladowcy');  // Usunięcie zapisanych wykładowców
    wyswietlWykladowcow();  // Odświeżenie listy wykładowców
    alert('Tabela zresetowana!');
}

// Dodawanie event listenerów do komórek tabeli
document.querySelectorAll('td').forEach(komorka => {
    komorka.addEventListener('click', () => dodajOsobeDoKomorki(komorka));
});

// Obsługa przycisków zapisywania i resetowania
document.getElementById('zapisz-btn').addEventListener('click', zapiszPostepy);
document.getElementById('resetuj-btn').addEventListener('click', resetujPostepy);

// Wyświetlenie wykładowców na starcie
zaladujPostepy();

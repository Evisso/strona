// script.js

// Lista wykładowców
const wykladowcy = ['Kańczurzewska', 'Gajda', 'Gleska', 'Robercik', 'Tomasz', 'Leśnik', 'Płuciennik', 'Kiwer', 'Kolwicz', 'Oleksik',
    'Derda', 'Piosik', 'Jagódka', 'Blandzi', 'Ziemkowska', 'Głuchy', 'Kasprzyk', 'Pietracho', 'Szyszka', 'Jankowska',
    'Gielniak', 'Walczak', 'Dębicka', 'Karolczak', 'Graczkowski xd', 'Morańda', 'Krawiecki', 'Prokop', 'Wiczyński',
    'Szczerbowski', 'Roman', 'Kasińska'];

let wybranaOsoba = null;  // Przechowuje klikniętego wykładowcę
let resztaWykladowcow = wykladowcy.slice(4);  // Reszta wykładowców

// Funkcja dodająca wykładowców na ekran
function wyswietlWykladowcow() {
    const listaElement = document.getElementById('wykladowcy-lista');
    const widoczni = wykladowcy.slice(0, 4);
    
    widoczni.forEach(wykladowca => {
        const element = document.createElement('div');
        element.classList.add('wykladowca');
        element.textContent = wykladowca;
        element.addEventListener('click', () => wybierzWykladowce(wykladowca, element));
        listaElement.appendChild(element);
    });
}

// Funkcja wybierająca wykładowcę
function wybierzWykladowce(wykladowca, element) {
    wybranaOsoba = wykladowca;
    element.remove();  // Usunięcie osoby z listy po kliknięciu

    if (resztaWykladowcow.length > 0) {
        const nastepnaOsoba = resztaWykladowcow.shift();
        const listaElement = document.getElementById('wykladowcy-lista');
        const nowyElement = document.createElement('div');
        nowyElement.classList.add('wykladowca');
        nowyElement.textContent = nastepnaOsoba;
        nowyElement.addEventListener('click', () => wybierzWykladowce(nastepnaOsoba, nowyElement));
        listaElement.appendChild(nowyElement);
    }
}

// Funkcja dodająca wykładowcę do komórki tabeli
function dodajOsobeDoKomorki(komorka) {
    if (wybranaOsoba) {
        if (!komorka.textContent) {
            komorka.textContent = wybranaOsoba;
        } else {
            komorka.textContent += ', ' + wybranaOsoba;
        }
        wybranaOsoba = null;  // Resetowanie wyboru osoby
    }
}

// Zapisanie stanu tabeli w localStorage
function zapiszPostepy() {
    const tabela = {};
    document.querySelectorAll('td').forEach(komorka => {
        const key = ${komorka.dataset.row}-${komorka.dataset.col};
        tabela[key] = komorka.textContent;
    });
    localStorage.setItem('tabela', JSON.stringify(tabela));
    alert('Postępy zapisane!');
}

// Załadowanie zapisanych postępów z localStorage
function zaladujPostepy() {
    const tabela = JSON.parse(localStorage.getItem('tabela'));
    if (tabela) {
        document.querySelectorAll('td').forEach(komorka => {
            const key = ${komorka.dataset.row}-${komorka.dataset.col};
            komorka.textContent = tabela[key] || '';
        });
    }
}

// Resetowanie tabeli
function resetujPostepy() {
    document.querySelectorAll('td').forEach(komorka => {
        komorka.textContent = '';
    });
    localStorage.removeItem('tabela');
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
wyswietlWykladowcow();

// Załaduj zapisane postępy, jeśli są dostępne
zaladujPostepy();

// script.js

// Lista wykładowców
let wykladowcy = ['Kańczurzewska', 'Gajda', 'Gleska', 'Robercik', 'Tomasz', 'Leśnik', 'Płuciennik', 'Kiwer', 'Kolwicz', 'Oleksik',
    'Derda', 'Piosik', 'Jagódka', 'Blandzi', 'Ziemkowska', 'Głuchy', 'Kasprzyk', 'Pietracho', 'Szyszka', 'Jankowska',
    'Gielniak', 'Walczak', 'Dębicka', 'Karolczak', 'Graczkowski xd', 'Morańda', 'Krawiecki', 'Prokop', 'Wiczyński',
    'Szczerbowski', 'Roman', 'Kasińska'];

let wybranaOsoba = null;  // Przechowuje klikniętego wykładowcę
let resztaWykladowcow = [];

// Funkcja inicjalizująca listę wykładowców
function inicjalizujWykladowcow() {
    // Sprawdź, czy w localStorage jest lista pozostałych wykładowców
    const zapisaniWykladowcy = JSON.parse(localStorage.getItem('resztaWykladowcow'));
    if (zapisaniWykladowcy && zapisaniWykladowcy.length > 0) {
        resztaWykladowcow = zapisaniWykladowcy;
    } else {
        resztaWykladowcow = wykladowcy.slice(4);  // Reszta wykładowców
    }
}

// Funkcja dodająca wykładowców na ekran
function wyswietlWykladowcow() {
    const listaElement = document.getElementById('wykladowcy-lista');
    listaElement.innerHTML = '';  // Wyczyść listę przed dodaniem

    // Pobierz czterech pierwszych wykładowców
    const widoczni = [];
    const zapisaniWidoczni = JSON.parse(localStorage.getItem('widoczniWykladowcy'));
    if (zapisaniWidoczni && zapisaniWidoczni.length > 0) {
        widoczni.push(...zapisaniWidoczni);
    } else {
        widoczni.push(...wykladowcy.slice(0, 4));
    }

    widoczni.forEach(wykladowca => {
        const element = document.createElement('div');
        element.classList.add('wykladowca');
        element.textContent = wykladowca;
        element.addEventListener('click', () => wybierzWykladowce(wykladowca, element));
        listaElement.appendChild(element);
    });

    // Zapisz widocznych wykładowców w localStorage
    localStorage.setItem('widoczniWykladowcy', JSON.stringify(widoczni));
}

// Funkcja wybierająca wykładowcę
function wybierzWykladowce(wykladowca, element) {
    wybranaOsoba = wykladowca;
    element.remove();  // Usunięcie osoby z listy po kliknięciu

    // Aktualizuj listę widocznych wykładowców
    const widoczni = Array.from(document.querySelectorAll('.wykladowca')).map(el => el.textContent);
    localStorage.setItem('widoczniWykladowcy', JSON.stringify(widoczni));

    if (resztaWykladowcow.length > 0) {
        const nastepnaOsoba = resztaWykladowcow.shift();
        const listaElement = document.getElementById('wykladowcy-lista');
        const nowyElement = document.createElement('div');
        nowyElement.classList.add('wykladowca');
        nowyElement.textContent = nastepnaOsoba;
        nowyElement.addEventListener('click', () => wybierzWykladowce(nastepnaOsoba, nowyElement));
        listaElement.appendChild(nowyElement);

        // Aktualizuj listę widocznych wykładowców
        widoczni.push(nastepnaOsoba);
        localStorage.setItem('widoczniWykladowcy', JSON.stringify(widoczni));
    }

    // Zapisz aktualną resztę wykładowców w localStorage
    localStorage.setItem('resztaWykladowcow', JSON.stringify(resztaWykladowcow));

    // Zapisz wybraną osobę w localStorage
    localStorage.setItem('wybranaOsoba', wybranaOsoba);
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
        localStorage.removeItem('wybranaOsoba');  // Usuń wybraną osobę z localStorage
        // Zapisz stan tabeli
        zapiszPostepy();
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
    // Zapisz resztę wykładowców i widocznych
    localStorage.setItem('resztaWykladowcow', JSON.stringify(resztaWykladowcow));
    const widoczni = Array.from(document.querySelectorAll('.wykladowca')).map(el => el.textContent);
    localStorage.setItem('widoczniWykladowcy', JSON.stringify(widoczni));
    alert('Postępy zapisane!');
}

// Załadowanie zapisanych postępów z localStorage
function zaladujPostepy() {
    const tabela = JSON.parse(localStorage.getItem('tabela'));
    if (tabela) {
        document.querySelectorAll('td').forEach(komorka => {
            const key = `${komorka.dataset.row}-${komorka.dataset.col}`;
            komorka.textContent = tabela[key] || '';
        });
    }
    // Załaduj resztę wykładowców
    inicjalizujWykladowcow();
    // Załaduj widocznych wykładowców
    wyswietlWykladowcow();
    // Załaduj wybraną osobę, jeśli istnieje
    wybranaOsoba = localStorage.getItem('wybranaOsoba');
}

// Resetowanie tabeli
function resetujPostepy() {
    document.querySelectorAll('td').forEach(komorka => {
        komorka.textContent = '';
    });
    localStorage.removeItem('tabela');
    localStorage.removeItem('resztaWykladowcow');
    localStorage.removeItem('widoczniWykladowcy');
    localStorage.removeItem('wybranaOsoba');
    // Zresetuj listę wykładowców do początkowego stanu
    resztaWykladowcow = wykladowcy.slice(4);
    wyswietlWykladowcow();
    alert('Tabela zresetowana!');
}

// Dodawanie event listenerów do komórek tabeli
document.querySelectorAll('td').forEach(komorka => {
    komorka.addEventListener('click', () => dodajOsobeDoKomorki(komorka));
});

// Obsługa przycisków zapisywania i resetowania
document.getElementById('zapisz-btn').addEventListener('click', zapiszPostepy);
document.getElementById('resetuj-btn').addEventListener('click', resetujPostepy);

// Załaduj zapisane postępy, jeśli są dostępne
zaladujPostepy();

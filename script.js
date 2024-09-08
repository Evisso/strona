// Lista wykładowców
let wykladowcy = ['Kańczurzewska', 'Gajda', 'Gleska', 'Robercik', 'Tomasz', 'Leśnik', 'Płuciennik', 'Kiwer', 'Kolwicz', 'Oleksik',
    'Derda', 'Piosik', 'Jagódka', 'Blandzi', 'Ziemkowska', 'Głuchy', 'Kasprzyk', 'Pietracho', 'Szyszka', 'Jankowska',
    'Gielniak', 'Walczak', 'Dębicka', 'Karolczak', 'Graczkowski xd', 'Morańda', 'Krawiecki', 'Prokop', 'Wiczyński',
    'Szczerbowski', 'Roman', 'Kasińska'];

let wybranaOsoba = null;  // Przechowuje klikniętego wykładowcę
let resztaWykladowcow = [];  // Reszta wykładowców

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

    resztaWykladowcow = wykladowcy.slice(4); // Aktualizujemy resztę wykładowców
}

// Funkcja wybierająca wykładowcę
function wybierzWykladowce(wykladowca, element) {
    wybranaOsoba = wykladowca;
    element.remove();  // Usunięcie osoby z listy po kliknięciu

    // Usuwamy wykładowcę z głównej listy
    wykladowcy = wykladowcy.filter(item => item !== wykladowca);

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
    const przypisaniWykladowcy = new Set();

    document.querySelectorAll('td').forEach(komorka => {
        const key = `${komorka.dataset.row}-${komorka.dataset.col}`;
        tabela[key] = komorka.textContent;

        // Dodajemy wykładowców z komórki do zestawu przypisanych wykładowców
        if (komorka.textContent) {
            komorka.textContent.split(', ').forEach(wykladowca => {
                przypisaniWykladowcy.add(wykladowca);
            });
        }
    });

    // Zapisujemy stan tabeli i przypisanych wykładowców w localStorage
    localStorage.setItem('tabela', JSON.stringify(tabela));
    localStorage.setItem('przypisaniWykladowcy', JSON.stringify([...przypisaniWykladowcy]));
    alert('Postępy zapisane!');
}

// Załadowanie zapisanych postępów z localStorage
function zaladujPostepy() {
    const tabela = JSON.parse(localStorage.getItem('tabela'));
    const przypisaniWykladowcy = JSON.parse(localStorage.getItem('przypisaniWykladowcy')) || [];

    if (tabela) {
        document.querySelectorAll('td').forEach(komorka => {
            const key = `${komorka.dataset.row}-${komorka.dataset.col}`;
            komorka.textContent = tabela[key] || '';
        });
    }

    // Aktualizujemy listę dostępnych wykładowców
    if (przypisaniWykladowcy.length > 0) {
        wykladowcy = wykladowcy.filter(wykladowca => !przypisaniWykladowcy.includes(wykladowca));
    }
}

// Resetowanie tabeli
function resetujPostepy() {
    document.querySelectorAll('td').forEach(komorka => {
        komorka.textContent = '';
    });
    localStorage.removeItem('tabela');
    localStorage.removeItem('przypisaniWykladowcy');
    alert('Tabela zresetowana!');

    // Resetujemy listę wykładowców do pierwotnej
    wykladowcy = ['Kańczurzewska', 'Gajda', 'Gleska', 'Robercik', 'Tomasz', 'Leśnik', 'Płuciennik', 'Kiwer', 'Kolwicz', 'Oleksik',
        'Derda', 'Piosik', 'Jagódka', 'Blandzi', 'Ziemkowska', 'Głuchy', 'Kasprzyk', 'Pietracho', 'Szyszka', 'Jankowska',
        'Gielniak', 'Walczak', 'Dębicka', 'Karolczak', 'Graczkowski xd', 'Morańda', 'Krawiecki', 'Prokop', 'Wiczyński',
        'Szczerbowski', 'Roman', 'Kasińska'];

    resztaWykladowcow = wykladowcy.slice(4);

    // Oczyszczamy i ponownie wyświetlamy listę wykładowców
    const listaElement = document.getElementById('wykladowcy-lista');
    listaElement.innerHTML = '';
    wyswietlWykladowcow();
}

// Dodawanie event listenerów do komórek tabeli
document.querySelectorAll('td').forEach(komorka => {
    komorka.addEventListener('click', () => dodajOsobeDoKomorki(komorka));
});

// Obsługa przycisków zapisywania i resetowania
document.getElementById('zapisz-btn').addEventListener('click', zapiszPostepy);
document.getElementById('resetuj-btn').addEventListener('click', resetujPostepy);

// Wyświetlenie wykładowców na starcie
zaladujPostepy();  // Najpierw ładujemy zapisane postępy
wyswietlWykladowcow();  // Następnie wyświetlamy aktualną listę wykładowców

// Lista wykładowców
const wykladowcy = ['Kańczurzewska', 'Gajda', 'Gleska', 'Robercik', 'Tomasz', 'Leśnik', 'Płuciennik', 'Kiwer', 'Kolwicz', 'Oleksik',
    'Derda', 'Piosik', 'Jagódka', 'Blandzi', 'Ziemkowska', 'Głuchy', 'Kasprzyk', 'Pietracho', 'Szyszka', 'Jankowska',
    'Gielniak', 'Walczak', 'Dębicka', 'Karolczak', 'Graczkowski xd', 'Morańda', 'Krawiecki', 'Prokop', 'Wiczyński',
    'Szczerbowski', 'Roman', 'Kasińska'];

let wybranaOsoba = null;  // Przechowuje klikniętego wykładowcę
let przypisaniWykladowcy = [];  // Lista przypisanych wykładowców
let resztaWykladowcow = wykladowcy.slice(4);  // Reszta wykładowców poza początkowymi 4

// Funkcja dodająca wykładowców na ekran
function wyswietlWykladowcow() {
    const listaElement = document.getElementById('wykladowcy-lista');
    listaElement.innerHTML = ''; // Czyszczenie listy przed ponownym wyświetleniem
    
    // Wyświetl tylko 4 pierwszych nieprzypisanych wykładowców
    const widoczniWykladowcy = wykladowcy.filter(wykladowca => !przypisaniWykladowcy.includes(wykladowca)).slice(0, 4);

    widoczniWykladowcy.forEach(wykladowca => {
        const element = document.createElement('div');
        element.classList.add('wykladowca');
        element.textContent = wykladowca;
        element.addEventListener('click', () => wybierzWykladowce(wykladowca, element));
        listaElement.appendChild(element);
    });
}

// Funkcja blokująca innych wykładowców
function zablokujWykladowcow() {
    const wykładowcyElements = document.querySelectorAll('.wykladowca');
    wykładowcyElements.forEach(element => {
        // Jeśli element nie ma klasy 'wybrany', blokujemy go
        if (!element.classList.contains('wybrany')) {
            element.classList.add('zablokowany');  // Dodanie klasy 'zablokowany' do elementu
            element.style.pointerEvents = 'none';  // Zablokowanie możliwości kliknięcia
        }
    });
}

// Funkcja odblokowująca wykładowców
function odblokujWykladowcow() {
    const wykładowcyElements = document.querySelectorAll('.wykladowca');
    wykładowcyElements.forEach(element => {
        element.classList.remove('zablokowany');  // Usunięcie klasy 'zablokowany'
        element.style.pointerEvents = 'auto';  // Przywrócenie możliwości kliknięcia
    });
}

// Funkcja wybierająca wykładowcę
function wybierzWykladowce(wykladowca, element) {
    if (wybranaOsoba) {
        return;  // Jeżeli jest już wybrany wykładowca, nic nie rób
    }
    wybranaOsoba = wykladowca;

    // Dodaj klasę 'wybrany' do klikniętego wykładowcy
    element.classList.add('wybrany');
    zablokujWykladowcow();  // Zablokowanie innych wykładowców

    // Pozostawienie klikniętego wykładowcy aktywnego
    element.style.pointerEvents = 'auto';  
}

// Funkcja dodająca wykładowcę do komórki tabeli
function dodajOsobeDoKomorki(komorka) {
    if (wybranaOsoba && !przypisaniWykladowcy.includes(wybranaOsoba)) {
        if (!komorka.textContent) {
            komorka.textContent = wybranaOsoba;
        } else {
            komorka.textContent += ', ' + wybranaOsoba;
        }
        przypisaniWykladowcy.push(wybranaOsoba);  // Dodanie wykładowcy do listy przypisanych
        wybranaOsoba = null;  // Resetowanie wyboru osoby
        odblokujWykladowcow();  // Odblokowanie innych wykładowców
        wyswietlWykladowcow();  // Ponowne wyświetlenie wykładowców
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
    localStorage.setItem('resztaWykladowcow', JSON.stringify(resztaWykladowcow));  // Zapisanie reszty wykładowców
    alert('Postępy zapisane!');  // Komunikat pojawi się tylko po zapisaniu postępów
}

// Załadowanie zapisanych postępów z localStorage
function zaladujPostepy() {
    const tabela = JSON.parse(localStorage.getItem('tabela'));
    const zapisaniWykladowcy = JSON.parse(localStorage.getItem('przypisaniWykladowcy'));
    const zapisaniResztaWykladowcow = JSON.parse(localStorage.getItem('resztaWykladowcow'));

    if (zapisaniWykladowcy) {
        przypisaniWykladowcy = zapisaniWykladowcy;
    }
    
    if (zapisaniResztaWykladowcow) {
        resztaWykladowcow = zapisaniResztaWykladowcow;
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
    resztaWykladowcow = wykladowcy.slice(4);  // Zresetowanie reszty wykładowców
    localStorage.removeItem('tabela');
    localStorage.removeItem('przypisaniWykladowcy');
    localStorage.removeItem('resztaWykladowcow');  // Usunięcie zapisanej reszty wykładowców
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

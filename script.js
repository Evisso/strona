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
    
    // Wyświetl nieprzypisanych wykładowców
    const widoczniWykladowcy = wykladowcy.filter(wykladowca => !przypisaniWykladowcy.includes(wykladowca));

    widoczniWykladowcy.forEach(wykladowca => {
        const element = document.createElement('div');
        element.classList.add('wykladowca');
        element.textContent = wykladowca;
        element.addEventListener('click', () => wybierzWykladowce(wykladowca, element));
        listaElement.appendChild(element);
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
        wyswietlWykladowcow();  // Ponowne wyświetlenie wykładowców
    }
}

// Funkcja usuwająca wybrane nazwisko z komórki i dodająca je z powrotem do listy dostępnych wykładowców
function usunNazwiskoZKomorki(komorka, nazwisko) {
    // Usuń nazwisko z komórki
    let nazwiska = komorka.textContent.split(', ').filter(n => n !== nazwisko);
    komorka.textContent = nazwiska.join(', ');

    // Usuń nazwisko z listy przypisanych i zaktualizuj listę wykładowców
    przypisaniWykladowcy = przypisaniWykladowcy.filter(wykladowca => wykładowca !== nazwisko);
    wyswietlWykladowcow();  // Odświeżenie listy dostępnych wykładowców
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
    localStorage.removeItem('przypisaniWykladowcy');
    wyswietlWykladowcow();  // Odświeżenie listy wykładowców
    alert('Tabela zresetowana!');
}

// Dodawanie event listenerów do komórek tabeli
document.querySelectorAll('td').forEach(komorka => {
    komorka.addEventListener('click', () => {
        if (wybranaOsoba) {
            dodajOsobeDoKomorki(komorka);
        } else {
            // Usuń wykładowcę po kliknięciu w jego nazwisko w komórce
            const nazwiska = komorka.textContent.split(', ');
            nazwiska.forEach(nazwisko => {
                komorka.addEventListener('click', () => usunNazwiskoZKomorki(komorka, nazwisko));
            });
        }
    });
});

// Obsługa przycisków zapisywania i resetowania
document.getElementById('zapisz-btn').addEventListener('click', zapiszPostepy);
document.getElementById('resetuj-btn').addEventListener('click', resetujPostepy);

// Wyświetlenie wykładowców na starcie
zaladujPostepy();

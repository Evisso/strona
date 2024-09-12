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

// Funkcja usuwająca wykładowcę z komórki
function usunOsobeZKomorki(komorka) {
    if (komorka.textContent) {
        const wykładowcyWKlodce = komorka.textContent.split(', ');  // Lista przypisanych wykładowców w komórce
        const wykladowcaDoUsuniecia = wykładowcyWKlodce.pop();  // Usunięcie ostatniego wykładowcy

        // Zaktualizowanie zawartości komórki
        if (wykładowcyWKlodce.length > 0) {
            komorka.textContent = wykładowcyWKlodce.join(', ');
        } else {
            komorka.textContent = '';
        }

        // Usuń wykładowcę z przypisanych i dodaj go z powrotem do listy dostępnych
        przypisaniWykladowcy = przypisaniWykladowcy.filter(wykl => wyk !== wykladowcaDoUsuniecia);
        resztaWykladowcow.push(wykladowcaDoUsuniecia);
        wyswietlWykladowcow();  // Ponownie wyświetl wykładowców na liście
    }
}

// Funkcja dodająca lub usuwająca wykładowcę z komórki
function dodajLubUsunOsobeZKomorki(komorka) {
    if (wybranaOsoba && !przypisaniWykladowcy.includes(wybranaOsoba)) {
        // Dodawanie wykładowcy do komórki
        if (!komorka.textContent) {
            komorka.textContent = wybranaOsoba;
        } else {
            komorka.textContent += ', ' + wybranaOsoba;
        }
        przypisaniWykladowcy.push(wybranaOsoba);  // Dodanie wykładowcy do listy przypisanych
        wybranaOsoba = null;  // Resetowanie wyboru osoby
        odblokujWykladowcow();  // Odblokowanie innych wykładowców
        wyswietlWykladowcow();  // Ponowne wyświetlenie wykładowców
    } else if (!wybranaOsoba && komorka.textContent) {
        // Usunięcie wykładowcy po kliknięciu na przypisaną komórkę
        usunOsobeZKomorki(komorka);
    }
}

// Dodawanie event listenerów do komórek tabeli (obsługuje dodawanie i usuwanie)
document.querySelectorAll('td').forEach(komorka => {
    komorka.addEventListener('click', () => dodajLubUsunOsobeZKomorki(komorka));
});

// Event dla przycisku resetowania
document.getElementById('resetuj-btn').addEventListener('click', () => {
    przypisaniWykladowcy = [];  // Wyczyszczenie przypisanych wykładowców
    wybranaOsoba = null;  // Resetowanie wyboru osoby
    document.querySelectorAll('td').forEach(komorka => komorka.textContent = '');  // Wyczyszczenie komórek tabeli
    wyswietlWykladowcow();  // Ponowne wyświetlenie wykładowców
});

// Inicjalizacja listy wykładowców
wyswietlWykladowcow();

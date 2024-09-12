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

        // Usuń wykładowcę z przypisanych
        przypisaniWykladowcy = przypisaniWykladowcy.filter(wykl => wyk !== wykladowcaDoUsuniecia);
        wyswietlWykladowcow();  // Ponownie wyświetl wykładowców na liście
    }
}

// Funkcja dodająca lub usuwająca wykładowcę z komórki
function dodajLub

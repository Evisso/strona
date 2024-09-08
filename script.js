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

// Dodawanie event listenerów do komórek tabeli
document.querySelectorAll('td').forEach(komorka => {
    komorka.addEventListener('click', () => dodajOsobeDoKomorki(komorka));
});

// Wyświetlenie wykładowców na starcie
wyswietlWykladowcow();

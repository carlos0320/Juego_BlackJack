// El jugador debe alcanzar los 21 puntos sin pasarse

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']
let misCartas = [];

const revolverCartas = (decks) => {

    let aleatorios = [];
    aleatorios[0] = Math.floor(Math.random() * (decks.length));
    let cartas = [];

    //creamos una lista de numeros aleatorios sin repetirse
    for (let i = 1; i < decks.length; i++) {

        aleatorios[i] = Math.floor(Math.random() * (decks.length));
        for (let j = 0; j < i; j++) {

            if (aleatorios[i] === aleatorios[j]) {
                i--;
            }
        }
    }

    for (let i = 0; i < decks.length; i++) {
        cartas[i] = decks[aleatorios[i]];

    }
    return cartas;
}
const crearDeck = () => {


    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    deck = revolverCartas(deck);
}

const pedircarta = () => {

    const carta = deck.pop();

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    return carta


}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    const puntos = (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        parseInt(valor);

    return puntos;
}

crearDeck();
console.log(deck);
let cartaEscogida = pedircarta();

console.log(cartaEscogida);
console.log(deck);

const valor = valorCarta('KS');
console.log(valor);
const miModulo = (() => {
    'use strict'
    // El jugador debe alcanzar los 21 puntos sin pasarse

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];


    let puntosJugador = 0;

    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
        puntosHTML = document.querySelectorAll('small'),
        imgCartasJuga = document.querySelector('#jugador-cartas'),
        imgCartasCompu = document.querySelector('#computadora-cartas'),
        btnParar = document.querySelector('#btnParar'),
        btnNuevo = document.querySelector('#btnNuevo'),
        divCartasJugadores = document.querySelectorAll('.divCartas');

    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {

        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {

            puntosJugadores[i] = 0;
            puntosHTML[i].innerText = 0;
            divCartasJugadores[i].innerHTML = '';
        }



        btnPedir.disabled = false;
        btnParar.disabled = false;
    }

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

        deck = [];

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

        return revolverCartas(deck);
    }

    const pedircarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        const puntos = (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            parseInt(valor);

        return puntos;
    }

    // Turno: 0 = primer jugador y el ultimo será la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        imgCartasCompu.appendChild(imgCarta);
        divCartasJugadores[turno].appendChild(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Empate =´(')
            } else if (puntosMinimos > 21) {
                alert(`Computadora gana`)
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana')
            } else {
                alert('computadora gana')
            }

        }, 100)

    }


    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
            const carta = pedircarta();
            // puntosComputadora += valorCarta(carta);
            // puntosHTML[1].innerText = puntosComputadora;

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            // const imgCarta = document.createElement('img');
            // imgCarta.src = `./assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // imgCartasCompu.appendChild(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))

        determinarGanador();

    }


    //Eventos
    btnPedir.addEventListener('click', function() {


        const carta = pedircarta()
        puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        // const imgCarta = document.createElement('img');
        // imgCarta.src = `./assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // imgCartasJuga.appendChild(imgCarta);

        if (puntosJugador > 21) {

            console.warn('Lo siento mucho, perdiste =(');
            btnPedir.disabled = true;
            btnParar.disabled = true;
            turnoComputadora(puntosJugador)

        } else if (puntosJugador === 21) {

            console.warn('21, Genial!, ganaste!');
            btn.disabled = true;
            btnParar.disabled = true;
            turnoComputadora(puntosJugador)

        }


    });

    btnParar.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnParar.disabled = true;

        turnoComputadora(puntosJugador)


    })

    btnNuevo.addEventListener('click', () => {

        console.clear();
        inicializarJuego();


        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        // imgCartasCompu.innerHTML = '';
        // imgCartasJuga.innerHTML = '';
        // btnPedir.disabled = false;
        // btnParar.disabled = false;


    })

    return {
        nuevoJuego: inicializarJuego
    }

})();
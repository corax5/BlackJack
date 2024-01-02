
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosjugadores = [];

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    //Esta función inicializa el juego.
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    //esta funcion crea una nueva baraja
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
        return _.shuffle(deck);

    }


    //Funcion permite pedir carta.
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
    const valor = valorCarta(pedirCarta());

    //turno: 0 = primer jugador y el ultimo sera la computadora.

    const acumularPuntos = (carta, turno) => {

        puntosjugadores[turno] = puntosjugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosjugadores[turno];
        return puntosjugadores[turno];
    }
    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugadores[turno].append(imgCarta)

    }



    /// turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            acumularPuntos(carta, puntosjugadores.length - 1);
            crearCarta(carta, puntosjugadores.length - 1)

            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`
            // imgCarta.classList.add('carta')
            // divCartasComputadora.append(imgCarta)

            if (puntosMinimos > 21) {
                break;
            }

        } while (puntosComputadora < puntosMinimos && (puntosMinimos <= 21))

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('¡Empate!')
            } else if (puntosMinimos > 21) {
                alert('¡Gana la casa!')
            } else if (puntosComputadora > 21) {
                alert('Has ganado')
            } else if (puntosComputadora > puntosJugador) {
                alert('¡Gana la casa!')
            }
        }, 30);

    }


    //Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);


        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21 Genial!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    })

    btnNuevoJuego.addEventListener('click', () => {

        console.clear();
        iniciarJuego();
        //deck = [];
        //deck = crearDeck();

        //puntosJugador = 0;
        //puntosComputadora = 0;

        //puntosHtml[0].innerText = 0;
        //puntosHtml[1].innerText = 0;

        //divCartasComputadora.innerHTML = '';
        //divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;

    })
    return {
        nuevoJuego: inicializarJuego
    };

})();



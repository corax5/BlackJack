
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computador-cartas');
    const puntosHtml = document.querySelectorAll('small');

    //esta funcion crea una nueva baraja
    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }


        deck = _.shuffle(deck);
        return deck;
    }


    crearDeck();

    //Funcion permite pedir carta.
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        const carta = deck.pop();
        return carta
    }

    //pedirCarta();
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
    const valor = valorCarta(pedirCarta());

    /// turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add('carta')
            divCartasComputadora.append(imgCarta)

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

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;


        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta)

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
        deck = [];
        deck = crearDeck();
        console.clear();
        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;

    })


})();



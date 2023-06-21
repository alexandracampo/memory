// Define variables
const cardValues = ['./images/foto2.JPG', './images/foto4.JPG', './images/foto5.JPG', './images/foto6.JPG', './images/foto7.JPG', './images/foto8.JPG', './images/foto9.JPG', './images/foto10.JPG', './images/foto11.JPG', './images/foto12.JPG'];

//Generamos un duplicado de las cartas y las randomizamos:
const randomisedElements = ([].concat(cardValues, cardValues.slice())).sort(() => Math.random() - 0.5);

const matchedCards = [];
let flippedCards = [];

// Creamos tablero de juego:
const game = document.querySelector('.game');


//Función efecto confeti:
const generateConfetti = () => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  const randomInRange = (min, max) => { return Math.random() * (max - min) + min; };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

// Definimos la función que verifica el match de las tarjetas:
const checkMatch = () => {
  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
    flippedCards.forEach(card => {
      matchedCards.push(card);
      card.removeEventListener('click', flipCard);
    });

    // Limpiar el array de las tarjetas giradas:
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      generateConfetti();
    }

  } else {
    //Oculta la imagen para continuar con el juego:
    flippedCards.forEach(card => card.setAttribute('src', './images/interrogante.jpg'));
    //Limpia targetas giradas:
    flippedCards = [];
  }
};


// Definimos la función de voltear la tarjeta:
function flipCard() {
  console.log(this);
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.setAttribute('src', this.dataset.value);
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Creamos función para generar la tarjeta:
const cardGenerator = (cardValue) => {
  const card = document.createElement('img');

  card.classList.add('card');
  card.dataset.value = cardValue;
  card.setAttribute('src', './images/interrogante.jpg');
  card.addEventListener('click', flipCard, card);

  // Añadimos tarjeta al tablero y añadimos el handleClick:
  game.appendChild(card);
};

// Usamos forEach para "iterar" sobre cada elemento del array sin necesidad de usar un bucle for:
randomisedElements.forEach((picture) => {
  cardGenerator(picture);
});




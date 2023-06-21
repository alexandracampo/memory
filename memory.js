// Define variables
let cardValues = ['./images/foto2.JPG', './images/foto4.JPG', './images/foto5.JPG', './images/foto6.JPG', './images/foto7.JPG', './images/foto8.JPG', './images/foto9.JPG', './images/foto10.JPG', './images/foto11.JPG', './images/foto12.JPG'];

let cards = [];
let flippedCards = [];
let matchedCards = [];


// Creamos el método para generar la tarjeta:
const cardGenerator = (cardValue) => {
  const card = document.createElement('img');
  card.classList.add('card');
  card.dataset.value = cardValue;
  card.setAttribute('src', './images/interrogante.jpg');
  console.log(cardValue)

  return card;
};

// Creamos tablero de juego:
const game = document.querySelector('.game');
for (let i = 0; i < cardValues.length; i++) {
  //
  cards.push(cardGenerator(cardValues[i]));
  cards.push(cardGenerator(cardValues[i]));
}

// Barajar cartas:
cards.sort(() => Math.random() - 0.5);

// Add cards to game board
cards.forEach(card => {
  game.appendChild(card);
  card.addEventListener('click', flipCard);
});

// Definimos la función de voltear la tarjeta:
function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.setAttribute('src', this.dataset.value);
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

//Función efecto confeti:
function generateConfetti() {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

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
}

// Definimos la función que verifica el match de las tarjetas:
function checkMatch() {
  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
    flippedCards.forEach(card => {
      matchedCards.push(card);
      card.removeEventListener('click', flipCard);
    });
    flippedCards = [];
    if (matchedCards.length === cards.length) {

      generateConfetti();

    }

  } else {
    flippedCards.forEach(card => card.setAttribute('src', './images/interrogante.jpg'));
    flippedCards = [];
  }
}



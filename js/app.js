/*
 * Create a list that holds all of your cards
 */
// Creates the html list of all the cards

let allCards = [
  "fa-dollar-sign",
  "fa-dollar-sign",
  "fa-ruble-sign",
  "fa-ruble-sign",
  "fa-euro-sign",
  "fa-euro-sign",
  "fa-pound-sign",
  "fa-pound-sign",
  "fa-yen-sign",
  "fa-yen-sign",
  "fa-won-sign",
  "fa-won-sign",
  "fa-rupee-sign",
  "fa-rupee-sign",
  "fa-lira-sign",
  "fa-lira-sign"
];

let generateCard = cart =>
  `<li class="card" data-card=${cart}><i class="fas ${cart}"></i></li>`;

let initGame = () => {
  let deck = document.querySelector(".deck");
  let genCard = shuffle(allCards).map(item => generateCard(item));
  deck.innerHTML = genCard.join("");
};

initGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cards = document.querySelectorAll(".card");
let openCards = [];
let moves = 0;
let moveCounter = document.querySelector(".moves");

cards.forEach(card => {
  card.addEventListener("click", event => {
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      openCards.push(card);
      card.classList.add("open", "show");
      if (openCards.length == 2) {
        // Keep the matched cards opened and disabled
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add("match");
          openCards[0].classList.remove("open");
          openCards[0].classList.remove("show");

          openCards[1].classList.add("match");
          openCards[1].classList.remove("open");
          openCards[1].classList.remove("show");

          openCards = [];
        }
        // Hide the cards if cards are not match
        setTimeout(() => {
          openCards.forEach(item => {
            item.classList.remove("open", "show");
          });
          openCards = [];
        }, 1000);
      }
    }
    moves++;
    moveCounter.innerText = moves;
  });
});

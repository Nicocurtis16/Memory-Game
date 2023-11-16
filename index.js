let currentTheme = "numbers";
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerInterval;
let startTime;
let moveCount = 0;
const startBtn = document.getElementById("start-btn");
const setup = document.querySelector(".Homepage");
const soloPlay = document.querySelector(".solo-play");
const grid4x41 = document.querySelector(".grid-4x4");
const grid6x61 = document.querySelector(".grid-6x6");
const cards = document.querySelectorAll(".card");

cards.forEach((card) => card.addEventListener("click", flipCard));

const setupPage = () => {
  startBtn.addEventListener("click", () => {
    const checkedInput = document.querySelectorAll(
      'input[type="radio"]:checked'
    );

    const numberTheme = Array.from(checkedInput).some(
      (radio) => radio.id === "numbers"
    );
    const iconTheme = Array.from(checkedInput).some(
      // Change IconTheme to iconTheme
      (radio) => radio.id === "icons"
    );
    const isOnePlayer = Array.from(checkedInput).some(
      (radio) => radio.value === "1"
    );
    const isTwoPlayer = Array.from(checkedInput).some(
      (radio) => radio.value === "2"
    );
    const isThreePlayer = Array.from(checkedInput).some(
      (radio) => radio.value === "3"
    );
    const isFourPlayer = Array.from(checkedInput).some(
      (radio) => radio.value === "4"
    );
    const is4x4grid = Array.from(checkedInput).some(
      (radio) => radio.id === "4x4"
    );
    const is6x6grid = Array.from(checkedInput).some(
      (radio) => radio.id === "6x6"
    );

    if (numberTheme && isOnePlayer && is4x4grid) {
      setup.style.display = "none";
      grid6x61.style.display = "none";
      soloPlay.style.display = "flex";
      generateGrid(grid4x4, 4);
      checkGameCompletion(); // Check for game completion after generating the 4x4 grid
    } else if (iconTheme && isOnePlayer && is4x4grid) {
      // Change IconTheme to iconTheme
      currentTheme = "icons";
      setup.style.display = "none";
      grid6x61.style.display = "none";
      soloPlay.style.display = "flex";
      generateGrid(grid4x4, 4);
      checkGameCompletion(); // Check for game completion after generating the 4x4 grid
    } else if (numberTheme && isOnePlayer && is6x6grid) {
      setup.style.display = "none";
      grid4x41.style.display = "none";
      soloPlay.style.display = "flex";
      generateGrid(grid6x6, 6);
      checkGameCompletion(); // Check for game completion after generating the 6x6 grid
    } else {
      console.log("okay");
    }
  });
};

setupPage();

const grid6x6 = document.querySelector(".grid-6x6");
const grid4x4 = document.querySelector(".grid-4x4");

// ...

function generateGrid(grid, gridSize) {
  grid.innerHTML = "";

  const totalPairs = (gridSize * gridSize) / 2;
  let elements;

  if (currentTheme === "numbers") {
    // Generate numbers from 1 to totalPairs
    elements = Array.from({ length: totalPairs }, (_, index) => index + 1);
  } else {
    // Create an array of Font Awesome icons you want to use
    elements = [
      "fa-heart",
      "fa-star",
      "fa-bolt",
      "fa-smile",
      "fa-flag",
      "fa-bell",
      "fa-gem",
      "fa-moon",
      "fa-plane",
      "fa-key",
      "fa-sun",
      "fa-cloud",
      "fa-tree",
      "fa-trash",
      "fa-car",
      "fa-anchor",
      "fa-coffee",
      "fa-camera",
    ];
  }

  // Shuffle the elements to randomize their positions in the grid
  shuffleArray(elements);

  const pairs = elements.slice(0, totalPairs);
  const cardElements = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Create an icon element and add the appropriate content or class
    const icon = document.createElement("i");
    if (currentTheme === "numbers") {
      icon.textContent = pairs[i % totalPairs];
    } else {
      icon.classList.add("fas", pairs[i % totalPairs]);
    }

    card.appendChild(icon);
    card.setAttribute("data-card", pairs[i % totalPairs]);

    cardElements.push(card);
  }

  // Shuffle the card elements to randomize their positions in the grid
  shuffleArray(cardElements);

  cardElements.forEach((card) => {
    grid.appendChild(card);
    card.addEventListener("click", flipCard);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function checkGameCompletion() {
  const matchedCards = document.querySelectorAll(".card.matched");
  console.log("Matched cards count:", matchedCards.length);

  const totalCards = grid4x4.style.display === "grid" ? 16 : 36; // Check which grid is currently displayed

  if (matchedCards.length === totalCards) {
    // All pairs are matched, stop the timer
    console.log("Timer stopped");
    clearInterval(timerInterval);
    popup(moveCount);
  }
}
function popup(moveCount) {
  const popup = document.getElementById("myPopup");
  const popupTitle = document.getElementById("popuptitle");
  const timeElapsed = document.getElementById("poptxt2");
  const movesTaken = document.getElementById("poptxt3");

  // Set the time and move count in the popup
  timeElapsed.textContent =
    document.querySelector(".moves-count-1").textContent;
  movesTaken.textContent = `${moveCount} Moves`; // Display the moveCount

  // Display the popup
  popup.style.visibility = "visible";
}

function flipCard() {
  console.log("Flip card function called");

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // Start the timer when the first card is flipped
    hasFlippedCard = true;
    firstCard = this;
    startTimer(); // Start the timer
  } else {
    // Increment move count and update the display
    moveCount++;
    document.querySelector(".moves-count").textContent = moveCount;

    // Second card is flipped
    secondCard = this;
    checkForMatch();
  }
}
function startTimer() {
  if (timerInterval) {
    return; // Timer has already started, don't start it again
  }
  startTime = new Date().getTime(); // Record the start time
  timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
}

function checkForMatch() {
  console.log("CheckMated card function called");

  if (firstCard.dataset.card === secondCard.dataset.card) {
    matchCards();
  } else {
    unflipCards();
  }
}

const totalPairs = cards.length / 2;

function matchCards() {
  console.log("Matching cards function");
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetBoard();

  // Check if the game is completed and do something
  checkGameCompletion();
}
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = new Date(currentTime - startTime);
  let minutes = elapsedTime.getUTCMinutes();
  let seconds = elapsedTime.getUTCSeconds();

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.querySelector(
    ".moves-count-1"
  ).textContent = `${minutes}:${seconds}`;
}
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  // Reset board-related variables
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function resetGame() {
  // Reset the game to its initial state
  moveCount = 0;
  document.querySelector(".moves-count").textContent = moveCount;
  document.querySelector(".moves-count-1").textContent = "0:00"; // Reset the timer text

  // Stop the timer if it's running
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Flip back any flipped cards
  cards.forEach((card) => {
    card.classList.remove("flip", "matched");
  });

  // Reset the board
  resetBoard();

  // Shuffle the cards
  shuffleCards();

  // Hide the popup
  const popup = document.getElementById("myPopup");
  popup.style.visibility = "hidden";
}

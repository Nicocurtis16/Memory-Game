// Variables to keep track of game state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCount = 0; // Initialize the move count
let timerInterval; // Timer interval variable
let startTime; // Start time for the timer
let timeStart = false;

// Add event listeners for the cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // Start the timer when the first card is flipped
    hasFlippedCard = true;
    firstCard = this;
    if (!timeStart) {
      startTimer(); // Start the timer
      timeStart = true;
    }
  } else {
    // Increment move count and update the display
    moveCount++;
    document.querySelector(".moves-count").textContent = moveCount;

    // Second card is flipped
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    matchCards();
  } else {
    unflipCards();
  }
}
const totalPairs = cards.length / 2;

function matchCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  // Check if all pairs are matched
  const matchedCards = document.querySelectorAll(".card.matched");
  if (matchedCards.length === totalPairs) {
    // All pairs are matched, stop the timer
    clearInterval(timerInterval);

    // Show the popup
    const popup = document.getElementById("myPopup");
    const popupTitle = document.getElementById("popuptitle");
    const timeElapsed = document.getElementById("poptxt2");
    const movesTaken = document.getElementById("poptxt3");

    // Set the time and move count in the popup
    timeElapsed.textContent =
      document.querySelector(".moves-count-1").textContent;
    movesTaken.textContent = `${moveCount} Moves`;

    // Display the popup
    popup.style.visibility = "visible";
  }

  resetBoard();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
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
  [hasFlippedCard, lockBoard, firstCard, secondCard] = [
    false,
    false,
    null,
    null,
  ];
}
function startTimer() {
  startTime = new Date().getTime(); // Record the start time
  timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
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

// Add event listeners for theme selection, number of prayers, and grid size labels
const themeLabels = document.querySelectorAll('label[for^="theme-"]');
const prayersLabels = document.querySelectorAll('label[for^="prayers-"]');
const gridSizeLabels = document.querySelectorAll('label[for^="grid-"]');
const startButton = document.getElementById("start");
const landingPage = document.querySelector(".landingpage");
const soloPage = document.querySelector(".solo1");
const grid4x4 = document.querySelector(".grid-4x4");
const grid6x6 = document.querySelector(".grid-6x6");

themeLabels.forEach((label) => {
  label.addEventListener("click", () => {
    themeLabels.forEach((otherLabel) => {
      otherLabel.classList.remove("selected");
    });
    label.classList.add("selected");
  });
});

prayersLabels.forEach((label) => {
  label.addEventListener("click", () => {
    prayersLabels.forEach((otherLabel) => {
      otherLabel.classList.remove("selected");
    });
    label.classList.add("selected");
  });
});

gridSizeLabels.forEach((label) => {
  label.addEventListener("click", () => {
    gridSizeLabels.forEach((otherLabel) => {
      otherLabel.classList.remove("selected");
    });
    label.classList.add("selected");

    const selectedGridSize = label.innerText;

    if (selectedGridSize === "4x4") {
      grid4x4.style.display = "grid";
      grid6x6.style.display = "none";
      generateGrid(grid4x4, 4); // Generate and populate the 4x4 grid
    } else if (selectedGridSize === "6x6") {
      grid4x4.style.display = "none";
      grid6x6.style.display = "grid";
      generateGrid(grid6x6, 6); // Generate and populate the 6x6 grid
    }
  });
});

function generateGrid(grid, gridSize) {
  grid.innerHTML = "";

  const totalPairs = (gridSize * gridSize) / 2;
  const numbers = Array.from({ length: totalPairs }, (_, index) => index + 1);
  const pairs = [...numbers, ...numbers];

  // Shuffle the pairs to randomize their positions in the grid
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  for (let i = 0; i < gridSize * gridSize; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = pairs[i];
    card.setAttribute("data-card", pairs[i]);
    grid.appendChild(card);

    card.addEventListener("click", flipCard);
  }
}

// Shuffle the cards when the page loads
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

// Add start button click event listener
startButton.addEventListener("click", () => {
  const selectedGridSizeLabel = document.querySelector(
    'label[for^="grid-"].selected'
  );

  if (selectedGridSizeLabel) {
    const selectedGridSize = selectedGridSizeLabel.innerText;
    const gridSize = parseInt(selectedGridSize);

    generateGrid(gridSize);
  }

  landingPage.style.display = "none";
  soloPage.classList.remove("hidden");
});

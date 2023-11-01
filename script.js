// Variables to keep track of game state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCount = 0; // Initialize the move count
let timerInterval; // Timer interval variable
let startTime; // Start time for the timer
let timeStart = false;
let currentTheme = "icons"; // Default theme is icons

// Add event listeners for the cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => card.addEventListener("click", flipCard));

// Add event listener for the theme radio buttons
const themeNumbersRadio = document.querySelector("#theme-numbers");
const themeIconsRadio = document.querySelector("#theme-icons");

themeNumbersRadio.addEventListener("change", () => {
  currentTheme = "numbers";
  generateGrid(grid4x4, 4); // Regenerate the 4x4 grid based on the current theme
  generateGrid(grid6x6, 6); // Regenerate the 6x6 grid based on the current theme
});

themeIconsRadio.addEventListener("change", () => {
  currentTheme = "icons";
  generateGrid(grid4x4, 4); // Regenerate the 4x4 grid based on the current theme
  generateGrid(grid6x6, 6); // Regenerate the 6x6 grid based on the current theme
});

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
  console.log("Matching cards function");
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  // Check if all pairs are matched
  const matchedCards = document.querySelectorAll(".card.matched");
  console.log("Matched cards count:", matchedCards.length);

  if (matchedCards.length === totalPairs) {
    // All pairs are matched, stop the timer
    clearInterval(timerInterval);
    console.log("Timer stopped");
  }

  resetBoard();

  // Show the popup after resetting the board
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

  // Check if the game is completed and do something
  if (matchedCards.length === cards.length) {
    // The game is completed. You can add your code here.
    // For example, display a message, play a sound, etc.
  }
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
  let icons;

  if (currentTheme === "numbers") {
    // Generate numbers from 1 to totalPairs
    icons = Array.from({ length: totalPairs }, (_, index) => index + 1);
  } else {
    // Create an array of Font Awesome icons you want to use
    icons = [
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
      "fa-apple",
      "fa-car",
      "fa-anchor",
      "fa-coffee",
      "fa-camera",
    ];
  }

  // Shuffle the icons to randomize their positions in the grid
  shuffleArray(icons);

  const pairs = icons.slice(0, totalPairs);
  const cardElements = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Create an icon element and add the Font Awesome class to it
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
  const selectedPrayers = document.querySelector(
    'input[name="prayers"]:checked'
  );

  if (selectedGridSizeLabel) {
    const selectedGridSize = parseInt(selectedGridSizeLabel.innerText);
    generateGrid(selectedGridSize);
  }

  if (selectedPrayers) {
    const prayers = selectedPrayers.value;
    // Use the selected number of prayers in your game logic
  }

  landingPage.style.display = "none";
  soloPage.classList.remove("hidden");
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

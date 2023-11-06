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
  console.log("Flip card function called"); // Add this line

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

    if (allCardsAreFlipped()) {
      clearInterval(timerInterval);
      popup(moveCount);
    }
  }
}

function checkForMatch() {
  console.log("CheckMated card function called"); // Add this line

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
    console.log("Timer stopped");
  }

  resetBoard();

  // Check if the game is completed and do something
  if (matchedCards.length === cards.length) {
    // Show the popup after resetting the board
    // The game is completed. You can add your code here.
    // For example, display a message, play a sound, etc.
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

function allCardsAreFlipped() {
  const cards = document.querySelectorAll(".card");
  for (const card of cards) {
    if (!card.classList.contains("matched")) {
      return false;
    }
  }
  return true;
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
const mutipleprayerContainer = document.querySelector(
  ".mutipleprayer-container"
); // Container for "mutipleprayer" sections

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
      otherLabel.classListremove("selected");
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
  });
});

startButton.addEventListener("click", () => {
  const selectedTheme = document.querySelector('input[name="theme"]:checked');
  const selectedPrayers = document.querySelector(
    'input[name="prayers"]:checked'
  );
  const selectedGridSize = document.querySelector('input[name="grid"]:checked');

  if (
    selectedTheme &&
    selectedPrayers &&
    selectedGridSize &&
    (parseInt(selectedPrayers.value) > 1 || selectedTheme.value === "Numbers")
  ) {
    // Check if the selected theme is "Numbers" or more than 1 prayer is selected
    generateGrid(selectedGridSize.value);
    landingPage.style.display = "none";
    soloPage.classList.remove("hidden");
    mutipleprayerContainer.style.display = "block"; // Display the ".mutipleprayer" sections
  } else {
    // Show an error message or handle the case where the conditions are not met
    // For example: alert("Please select appropriate options.");
  }
});
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

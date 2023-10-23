const themeLabels = document.querySelectorAll('label[for^="theme-"]');

themeLabels.forEach((label) => {
  label.addEventListener("click", () => {
    // Remove the "selected" class from all labels
    themeLabels.forEach((otherLabel) => {
      otherLabel.classList.remove("selected");
    });
    // Add the "selected" class to the clicked label
    label.classList.add("selected");
  });
});
const prayersLabels = document.querySelectorAll('label[for^="prayers-"]');

prayersLabels.forEach((label) => {
  label.addEventListener("click", () => {
    // Remove the "selected" class from all labels
    prayersLabels.forEach((otherLabel) => {
      otherLabel.classList.remove("selected");
    });
    // Add the "selected" class to the clicked label
    label.classList.add("selected");
  });
});
const gridSizeLabels = document.querySelectorAll('label[for^="grid-"]');

gridSizeLabels.forEach((label) => {
  label.addEventListener("click", () => {
    // Remove the "selected" class from all labels
    gridSizeLabels.forEach((otherLabel) => {
      otherLabel.classList.remove("selected");
    });
    // Add the "selected" class to the clicked label
    label.classList.add("selected");
  });
});

// Switching from one class to another

const startButton = document.getElementById("start");
const landingPage = document.querySelector(".landingpage");
const soloPage = document.querySelector(".solo1");

startButton.addEventListener("click", () => {
  // Check if the conditions are met
  const themeNumbers = document.getElementById("theme-numbers").checked;
  const prayers1 = document.getElementById("prayers-1").checked;
  const grid4x4 = document.getElementById("grid-4x4").checked;

  if (themeNumbers && prayers1 && grid4x4) {
    // Conditions met, hide landingpage, show solo1
    landingPage.classList.add("hidden");
    soloPage.classList.remove("hidden");
  }
});

const grid = document.querySelector(".grid");
const numbers = [
  "1",
  "1",
  "2",
  "2",
  "3",
  "3",
  "4",
  "4",
  "5",
  "5",
  "6",
  "6",
  "7",
  "7",
  "8",
  "8",
];
const shuffledNumbers = shuffleArray(numbers);

const timeCountText = document.querySelector(".moves-count-1");
const movesCountText = document.querySelector(".moves-count");
const popup = document.getElementById("myPopup");
const popupTitle = document.getElementById("popuptitle");
const popupTimeText = document.getElementById("poptxt2");
const popupMovesText = document.getElementById("poptxt3");
const restartButton = document.getElementById("btn11");

let startTime = 0;
let timerInterval;
let moves = 0;
let pairs = 0;

// Create the grid dynamically
shuffledNumbers.forEach((number) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = number;
  circle.dataset.matched = "false"; // To keep track of matched pairs

  circle.addEventListener("click", () => {
    if (circle.dataset.matched === "false") {
      circle.style.backgroundColor = "#BCCED9"; // Set background color to green when selected
      circle.style.color = "#F2F2F2"; // Show the number
      circle.dataset.matched = "true";
      checkForMatch();
      moves++;
      movesCountText.textContent = Math.floor(moves / 2);

      if (moves === 1) {
        startTime = new Date().getTime(); // Start counting time after the first move
        timerInterval = setInterval(updateTime, 1000);
      }
    }
  });

  grid.appendChild(circle);
});

let firstSelection = null;
let secondSelection = null;

function checkForMatch() {
  const selectedCircles = Array.from(
    document.querySelectorAll('.circle[data-matched="true"]')
  );
  if (selectedCircles.length === shuffledNumbers.length) {
    clearInterval(timerInterval);
    displayPopup();
  } else if (selectedCircles.length === 2) {
    const [circle1, circle2] = selectedCircles;
    if (circle1.textContent === circle2.textContent) {
      // You have a match, set background color to a different color to indicate a matched pair
      circle1.style.backgroundColor = "#FDA214";
      circle2.style.backgroundColor = "#FDA214";
      circle1.dataset.matched = "matched";
      circle2.dataset.matched = "matched";
      pairs++;
    }
  }
}

function updateTime() {
  const currentTime = new Date().getTime();
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  timeCountText.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function displayPopup() {
  popupTitle.textContent = "You did it!";
  popupTimeText.textContent = timeCountText.textContent;
  popupMovesText.textContent = movesCountText.textContent + " Moves";
  popup.style.display = "block";
}

// Event listener for the "Restart" button
restartButton.addEventListener("click", () => {
  // Clear the grid
  grid.innerHTML = "";

  // Reset game variables
  moves = 0;
  pairs = 0;
  startTime = 0;
  clearInterval(timerInterval);
  timeCountText.textContent = "0:00";
  movesCountText.textContent = "0";

  // Re-shuffle numbers and re-create the grid
  shuffledNumbers = shuffleArray(numbers);
  shuffledNumbers.forEach((number) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = number;
    circle.dataset.matched = "false";
    circle.addEventListener("click", () => {
      if (circle.dataset.matched === "false") {
        circle.style.backgroundColor = "#BCCED9";
        circle.style.color = "#F2F2F2";
        circle.dataset.matched = "true";
        checkForMatch();
        moves++;
        movesCountText.textContent = Math.floor(moves / 2);
        if (moves === 1) {
          startTime = new Date().getTime();
          timerInterval = setInterval(updateTime, 1000);
        }
      }
    });
    grid.appendChild(circle);
  });

  // Hide the popup
  popup.style.display = "none";
});

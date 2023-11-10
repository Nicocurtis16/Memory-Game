// Get references to the radio buttons and the "Start Game" button
const themeNumbersRadio = document.querySelector("#theme-numbers");
const themeIconsRadio = document.querySelector("#theme-icons");
const prayers2Radio = document.querySelector("#prayers-2");
const prayers3Radio = document.querySelector("#prayers-3");
const prayers4Radio = document.querySelector("#prayers-4");
const grid4x4Radio = document.querySelector("#grid-4x4");
const grid6x6Radio = document.querySelector("#grid-6x6");
const startButton = document.getElementById("start");
const mutipleprayerSection = document.querySelector(".mutipleprayer");
const landingpage = document.querySelector(".landingpage");

let selectedTheme = null;
let selectedPrayers = null;
let selectedGrid = null;

// Function to check if all conditions are met and display the "mutipleprayer" section
function checkConditionsAndDisplay() {
  if (selectedTheme && selectedPrayers && selectedGrid) {
    // All conditions are met, display the "mutipleprayer" section
    mutipleprayerSection.style.display = "block";
    landingpage.style.display = "none"; // Hide the landing page
  }
}

// Add event listeners for theme selection
themeNumbersRadio.addEventListener("change", () => {
  selectedTheme = themeNumbersRadio.checked ? themeNumbersRadio : null;
  checkConditionsAndDisplay();
});

themeIconsRadio.addEventListener("change", () => {
  selectedTheme = themeIconsRadio.checked ? themeIconsRadio : null;
  checkConditionsAndDisplay();
});

// Add event listeners for the number of prayers selection
prayers2Radio.addEventListener("change", () => {
  selectedPrayers = prayers2Radio.checked ? prayers2Radio : null;
  checkConditionsAndDisplay();
});

prayers3Radio.addEventListener("change", () => {
  selectedPrayers = prayers3Radio.checked ? prayers3Radio : null;
  checkConditionsAndDisplay();
});

prayers4Radio.addEventListener("change", () => {
  selectedPrayers = prayers4Radio.checked ? prayers4Radio : null;
  checkConditionsAndDisplay();
});

// Add event listener for grid size selection
grid4x4Radio.addEventListener("change", () => {
  selectedGrid = grid4x4Radio.checked ? grid4x4Radio : null;
  checkConditionsAndDisplay();
});

grid6x6Radio.addEventListener("change", () => {
  selectedGrid = grid6x6Radio.checked ? grid6x6Radio : null;
  checkConditionsAndDisplay();
});

// Add event listener for the "Start Game" button
startButton.addEventListener("click", () => {
  // When the "Start Game" button is clicked, check the conditions one more time
  checkConditionsAndDisplay();
});

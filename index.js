const startBtn = document.getElementById("start");

const checkedInput = document.querySelectorAll('input[type = "radio"]:checked');
const numberTheme = [...checkedInput].some((radio) => {
  radio.value === "4";
});

const setupPage = () => {
  startBtn.addEventListener("click", () => {
    console.log(checkedInput);
    if (numberTheme.value === "4") {
      console.log(numberTheme);
    } else {
      console.log("gggg");
    }
  });
};

setupPage();
